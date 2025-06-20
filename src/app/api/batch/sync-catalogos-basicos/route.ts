import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '~/server/db';
import { logger } from '~/server/lib/logger';
import { metrics } from '~/server/lib/metrics';
import { SNPSAP_API_BASE_URL } from '~/server/lib/constants';

const PORTAL = process.env.SNPSAP_PORTAL ?? 'GE';

/**
 * Sincroniza un catálogo simple (id + descripcion).
 */
async function syncSimpleCatalog(jobName: string, runId: string, catalogName: string, endpoint: string, model: any) {
  const logMeta = { jobName, runId, catalogName, endpoint };
  logger.info(`Iniciando sincronización: ${catalogName}`, logMeta);
  metrics.increment('etl.jobs.started');

  let processed = 0;
  let errors = 0;
  const startAll = Date.now();

  try {
    const url = `${SNPSAP_API_BASE_URL}${endpoint}?vpd=${encodeURIComponent(PORTAL)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    const items: { id: any; descripcion: string }[] =
      response.status === 204 ? [] : await response.json();

    for (const item of items) {
      const itemMeta = { ...logMeta, itemId: item.id };
      const startItem = Date.now();
      try {
        await model.upsert({
          where: { idOficial: item.id },
          update: { descripcion: item.descripcion },
          create: { idOficial: item.id, descripcion: item.descripcion },
        });
        processed++;
        metrics.increment('etl.items.processed');
        const duration = Date.now() - startItem;
        metrics.histogram('etl.items.processed.duration_ms', duration);
        logger.info(`Item procesado en '${catalogName}'`, { ...itemMeta, durationMs: duration });
      } catch (e: unknown) {
        errors++;
        metrics.increment('etl.items.errors');
        const errorMessage = e instanceof Error ? e.message : String(e);
        const error = e instanceof Error ? e : new Error(errorMessage);
        logger.error(`Error procesando item en '${catalogName}'`, error, itemMeta);
      }
    }
    const totalDuration = Date.now() - startAll;
    logger.info(`Sincronización de '${catalogName}' finalizada`, { ...logMeta, processed, errors, durationMs: totalDuration });
    metrics.increment('etl.jobs.completed');
    metrics.increment('etl.items.processed', processed);
    metrics.increment('etl.items.errors', errors);
    metrics.histogram('etl.jobs.duration_ms', totalDuration);
  } catch (error: unknown) {
    errors++;
    metrics.increment('etl.jobs.fatal_errors');
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorObj = error instanceof Error ? error : new Error(errorMessage);
    logger.error(`Fallo crítico en la sincronización de '${catalogName}'`, errorObj, logMeta);
  }
  return { processed, errors };
}

export async function POST(req: Request) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobName = 'sync-catalogos-basicos';
  const runId = crypto.randomUUID();
  metrics.increment('etl.jobs.invoked');
  const startTime = Date.now();
  logger.info('Job Catálogos Básicos Invocado', { jobName, runId });

  const finalStats = { totalProcessed: 0, totalErrors: 0 };

  try {
    const syncTasks = [
      syncSimpleCatalog(jobName, runId, 'Finalidades', '/finalidades', db.finalidad),
      syncSimpleCatalog(jobName, runId, 'Instrumentos de Ayuda', '/instrumentos', db.instrumentoAyuda),
      syncSimpleCatalog(jobName, runId, 'Tipos de Beneficiario', '/beneficiarios', db.tipoBeneficiario),
      syncSimpleCatalog(jobName, runId, 'Actividades (Sectores)', '/actividades', db.actividad),
      syncSimpleCatalog(jobName, runId, 'Reglamentos UE', '/reglamentos', db.reglamentoUE),
      syncSimpleCatalog(jobName, runId, 'Sectores de Productos', '/sectores', db.sectorProducto),
      syncSimpleCatalog(jobName, runId, 'Catalogo de Objetivos', '/objetivos', db.catalogoObjetivo),
    ];

    const results = await Promise.all(syncTasks);

    for (const stats of results) {
        finalStats.totalProcessed += stats.processed;
        finalStats.totalErrors += stats.errors;
    }

    const durationMs = Date.now() - startTime;
    metrics.histogram('etl.jobs.total_duration_ms', durationMs);
    logger.info('Job Catálogos Básicos Completado', { jobName, runId, stats: finalStats, durationMs });
    return NextResponse.json({ success: true, stats: finalStats });
  } catch (error: unknown) {
    const durationMs = Date.now() - startTime;
    metrics.increment('etl.jobs.fatal_errors');
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorObj = error instanceof Error ? error : new Error(errorMessage);
    logger.error('Job Catálogos Básicos Falló Catástroficamente', errorObj, { jobName, runId, durationMs });
    return NextResponse.json({ success: false, error: 'Job failed' }, { status: 500 });
  }
} 