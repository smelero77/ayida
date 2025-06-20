import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '~/server/db';
import { logger } from '~/server/lib/logger';
import { metrics } from '~/server/lib/metrics';
import { SNPSAP_API_BASE_URL } from '~/server/lib/constants';

const PORTAL = process.env.SNPSAP_PORTAL ?? 'GE';

/**
 * Sincroniza los Grandes Beneficiarios.
 */
async function syncGrandesBeneficiarios(jobName: string, runId: string) {
    const catalogName = 'GrandesBeneficiarios';
    const logMeta = { jobName, runId, catalogName };
    logger.info(`Iniciando sincronización: ${catalogName}`, logMeta);
    metrics.increment('etl.jobs.started');
  
    let totalProcessed = 0;
    let totalErrors = 0;
    const startAll = Date.now();
  
    try {
      const aniosResponse = await fetch(`${SNPSAP_API_BASE_URL}/grandesbeneficiarios/anios`, { headers: { 'Accept': 'application/json' } });
      if (!aniosResponse.ok) throw new Error('No se pudieron obtener los años de los grandes beneficiarios');
      const anios: { id: number }[] = await aniosResponse.json();
  
      for (const anio of anios) {
        logger.info(`Sincronizando grandes beneficiarios para el año ${anio.id}`, logMeta);
        let currentPage = 0;
        let isLastPage = false;
        
        while (!isLastPage) {
          const pageMeta = { ...logMeta, anio: anio.id, page: currentPage };
          logger.info(`Pidiendo página ${currentPage} para año ${anio.id}...`, pageMeta);
          metrics.increment('etl.pages.fetched');

          const url = new URL(`${SNPSAP_API_BASE_URL}/grandesbeneficiarios/busqueda`);
          url.searchParams.append('page', String(currentPage));
          url.searchParams.append('pageSize', '200');
          url.searchParams.append('anios', String(anio.id));
  
          let response;
          try {
            response = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } });
            if (!response.ok) {
              totalErrors++;
              logger.warn('Fallo fetching página de grandes beneficiarios', { ...pageMeta, status: response.status });
              metrics.increment('etl.pages.failed');
              break;
            }
          } catch (error: unknown) {
            totalErrors++;
            const errorMessage = error instanceof Error ? error.message : String(error);
            const errorObj = error instanceof Error ? error : new Error(errorMessage);
            logger.error('Error de red al fetch grandes beneficiarios', errorObj, pageMeta);
            metrics.increment('etl.pages.failed');
            break;
          }

          const data = await response.json();
          const items = data.content || [];
          isLastPage = data.last ?? true;

          logger.info('Página de grandes beneficiarios recibida', { ...pageMeta, count: items.length });
          metrics.gauge('etl.pages.item_count', items.length);
  
          for (const item of items) {
            const itemMeta = { ...pageMeta, itemId: item.idPersona };
            const startItem = Date.now();
            try {
              const nifMatch = item.beneficiario.match(/^([A-Z0-9]+)\s/);
              const nifCif = nifMatch ? nifMatch[1] : null;
              const nombre = nifCif ? item.beneficiario.substring(nifCif.length).trim() : item.beneficiario;
  
              await db.beneficiario.upsert({
                where: { idOficial: item.idPersona },
                update: { nombre, nifCif },
                create: { idOficial: item.idPersona, nombre, nifCif },
              });
              
              await db.granBeneficiario.upsert({
                where: { beneficiarioId_ejercicio: { beneficiarioId: item.idPersona, ejercicio: item.ejercicio } },
                update: { ayudaTotal: item.ayudaETotal },
                create: {
                  ejercicio: item.ejercicio,
                  ayudaTotal: item.ayudaETotal,
                  beneficiarioId: item.idPersona,
                },
              });
              totalProcessed++;
              metrics.increment('etl.items.processed');
              const duration = Date.now() - startItem;
              metrics.histogram('etl.items.processed.duration_ms', duration);
              logger.info('Gran beneficiario procesado exitosamente', { ...itemMeta, durationMs: duration });
            } catch (e: unknown) {
              totalErrors++;
              metrics.increment('etl.items.errors');
              const errorMessage = e instanceof Error ? e.message : String(e);
              const error = e instanceof Error ? e : new Error(errorMessage);
              logger.error('Error procesando gran beneficiario item', error, itemMeta);
            }
          }
  
          isLastPage = data.last ?? true;
          currentPage++;
        }
      }
      const totalDuration = Date.now() - startAll;
      logger.info(`Sincronización de '${catalogName}' finalizada`, { ...logMeta, processed: totalProcessed, errors: totalErrors, durationMs: totalDuration });
      metrics.increment('etl.jobs.completed');
      metrics.increment('etl.items.processed', totalProcessed);
      metrics.increment('etl.items.errors', totalErrors);
      metrics.histogram('etl.jobs.duration_ms', totalDuration);
    } catch(error: unknown) {
      totalErrors++;
      metrics.increment('etl.jobs.fatal_errors');
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorObj = error instanceof Error ? error : new Error(errorMessage);
      logger.error(`Fallo crítico en la sincronización de '${catalogName}'`, errorObj, logMeta);
    }
  
    return { processed: totalProcessed, errors: totalErrors };
}

export async function POST(req: Request) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobName = 'sync-grandes-beneficiarios';
  const runId = crypto.randomUUID();
  metrics.increment('etl.jobs.invoked');
  const startTime = Date.now();
  logger.info('Job Grandes Beneficiarios Invocado', { jobName, runId });

  try {
    const stats = await syncGrandesBeneficiarios(jobName, runId);

    const durationMs = Date.now() - startTime;
    metrics.histogram('etl.jobs.total_duration_ms', durationMs);
    logger.info('Job Grandes Beneficiarios Completado', { jobName, runId, stats, durationMs });
    return NextResponse.json({ success: true, stats });
  } catch (error: unknown) {
    const durationMs = Date.now() - startTime;
    metrics.increment('etl.jobs.fatal_errors');
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorObj = error instanceof Error ? error : new Error(errorMessage);
    logger.error('Job Grandes Beneficiarios Falló Catástroficamente', errorObj, { jobName, runId, durationMs });
    return NextResponse.json({ success: false, error: 'Job failed' }, { status: 500 });
  }
} 