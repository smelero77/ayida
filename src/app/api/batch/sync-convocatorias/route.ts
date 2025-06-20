import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { logger } from '~/server/lib/logger';
import { metrics } from '~/server/lib/metrics';
import { SNPSAP_API_BASE_URL } from '~/server/lib/constants';
import { loadCatalogCache, loadExistingConvocatoriasCache } from '~/server/services/cache';
import {
  getConvocatoriaDetalle,
  processAndSaveDetalle,
  getConvocatoriaStatus,
  updateConvocatoriaCache,
} from '~/server/services/convocatorias';

const PORTAL = process.env.SNPSAP_PORTAL ?? 'GE';
const PAGE_SIZE = 200;

/**
 * Función principal que orquesta la carga masiva de convocatorias.
 */
async function syncAllConvocatorias(jobName: string, runId: string) {
    const logMeta = { jobName, runId, catalogName: 'Convocatorias' };
    logger.info('Iniciando sincronización masiva y detallada de Convocatorias', logMeta);
    metrics.increment('etl.jobs.started');

    try {
        // PASO 0: Cargar caches (catálogos y convocatorias existentes)
        logger.info('Cargando caches de catálogos...', logMeta);
        await loadCatalogCache();
        logger.info('Caches de catálogos cargados exitosamente', logMeta);
        
        logger.info('Cargando cache de convocatorias existentes...', logMeta);
        await loadExistingConvocatoriasCache();
        logger.info('Cache de convocatorias existentes cargado exitosamente', logMeta);
    } catch (error: any) {
        logger.error('Error cargando caches', error, logMeta);
        throw new Error(`Error cargando caches: ${error.message}`);
    }

    const BATCH_SIZE = 10; // Aumentado de 5 a 50 para máxima paralelización
    let totalProcessed = 0;
    let totalErrors = 0;
    let totalSkipped = 0;
    let currentPage = 0;
    let isLastPage = false;
    let totalPagesFailed = 0;

    const startAll = Date.now();

    while (!isLastPage) {
        const pageMeta = { ...logMeta, page: currentPage };
        logger.info(`Pidiendo página ${currentPage} de la lista...`, pageMeta);
        metrics.increment('etl.pages.fetched');

        const listUrl = new URL(`${SNPSAP_API_BASE_URL}/convocatorias/busqueda`);
        listUrl.searchParams.append('vpd', PORTAL);
        listUrl.searchParams.append('page', String(currentPage));
        listUrl.searchParams.append('pageSize', String(PAGE_SIZE));
        listUrl.searchParams.append('order', 'fechaRecepcion'); // Ordenamos por fecha para obtener las más recientes primero
        listUrl.searchParams.append('direccion', 'desc');

        let response;
        try {
            response = await fetch(listUrl.toString(), { headers: { 'Accept': 'application/json' } });
            if (!response.ok) {
                totalErrors++;
                totalPagesFailed++;
                logger.warn('Fallo fetching página de convocatorias', { ...pageMeta, status: response.status });
                metrics.increment('etl.pages.failed');
                break;
            }
        } catch (error: any) {
            totalErrors++;
            totalPagesFailed++;
            logger.error('Error de red al fetch convocatorias', error, pageMeta);
            metrics.increment('etl.pages.failed');
            break;
        }

        const data = await response.json();
        const items = data.content || [];
        isLastPage = data.last ?? true;

        logger.info('Página de convocatorias recibida', { ...pageMeta, count: items.length });
        metrics.gauge('etl.pages.item_count', items.length);

        // Procesar convocatorias en lotes paralelos
        for (let i = 0; i < items.length; i += BATCH_SIZE) {
            const batch = items.slice(i, i + BATCH_SIZE);
            const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
            
            logger.info(`Procesando lote ${batchNumber}: ${batch.length} convocatorias`, { ...pageMeta, batchNumber, batchSize: batch.length });
            
            // Procesar este lote en paralelo
            const batchPromises = batch.map(async (item: any) => {
                const itemMeta = { ...pageMeta, bdns: item.numeroConvocatoria };
                const startItem = Date.now();
                
                try {
                    if (!item.numeroConvocatoria) {
                        logger.warn('Saltando convocatoria sin código BDNS', itemMeta);
                        return { success: false, error: 'Sin código BDNS' };
                    }

                    const detalle = await getConvocatoriaDetalle(item.numeroConvocatoria, jobName, runId);
                    if (!detalle) {
                        logger.warn(`No se pudo obtener detalle para BDNS ${item.numeroConvocatoria}`, itemMeta);
                        return { success: false, error: 'No se obtuvo detalle' };
                    }

                    // 1) Detectar si ha cambiado
                    const { hasChanged, skipReason } = getConvocatoriaStatus(detalle);
                    if (!hasChanged) {
                        metrics.increment('etl.items.skipped');
                        logger.info('Saltando convocatoria sin cambios', { 
                            bdns: item.numeroConvocatoria,
                            skipReason 
                        });
                        return { success: true, bdns: item.numeroConvocatoria, skipped: true, skipReason };
                    }

                    // 2) Procesar sólo si cambió
                    const processedHash = await processAndSaveDetalle(detalle, jobName, runId);
                    updateConvocatoriaCache(detalle.id, processedHash);
                    
                    const duration = Date.now() - startItem;
                    metrics.histogram('etl.items.processed.duration_ms', duration);
                    logger.info('Convocatoria procesada exitosamente', { ...itemMeta, durationMs: duration });
                    
                    return { success: true, bdns: item.numeroConvocatoria, processedHash };
                } catch (error: any) {
                    const duration = Date.now() - startItem;
                    logger.error('Error procesando convocatoria', error, { ...itemMeta, durationMs: duration });
                    return { success: false, error: error.message, bdns: item.numeroConvocatoria };
                }
            });

            // Esperar a que termine este lote antes de continuar
            const batchResults = await Promise.allSettled(batchPromises);
            
            // Contar resultados
            const successful = batchResults.filter(r => 
                r.status === 'fulfilled' && r.value.success && !r.value.skipped
            ).length;
            const skipped = batchResults.filter(r => 
                r.status === 'fulfilled' && r.value.success && r.value.skipped
            ).length;
            const failed = batchResults.filter(r => 
                r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)
            ).length;
            
            totalProcessed += successful;
            totalSkipped += skipped;
            totalErrors += failed;
            
            logger.info(`Lote ${batchNumber} completado: ${successful}/${batch.length} exitosas, ${skipped} saltadas, ${failed} fallidas`, { 
                ...pageMeta, batchNumber, successful, skipped, failed 
            });
        }

        currentPage++;
    }

    const totalDuration = Date.now() - startAll;
    logger.info('Sincronización de Convocatorias finalizada', { 
        jobName, runId, totalProcessed, totalSkipped, totalErrors, totalPagesFailed, durationMs: totalDuration 
    });
    metrics.increment('etl.jobs.completed');
    metrics.increment('etl.pages.failed', totalPagesFailed);
    metrics.increment('etl.items.processed', totalProcessed);
    metrics.increment('etl.items.skipped', totalSkipped);
    metrics.increment('etl.items.errors', totalErrors);
    metrics.histogram('etl.jobs.duration_ms', totalDuration);

    return { processed: totalProcessed, skipped: totalSkipped, errors: totalErrors };
}

export async function POST(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jobName = 'sync-convocatorias';
    const runId = crypto.randomUUID();
    metrics.increment('etl.jobs.invoked');
    const startTime = Date.now();
    logger.info('Job Convocatorias Invocado', { jobName, runId });

    try {
        const stats = await syncAllConvocatorias(jobName, runId);
        const durationMs = Date.now() - startTime;
        metrics.histogram('etl.jobs.total_duration_ms', durationMs);
        logger.info('Job Convocatorias Completado', { jobName, runId, ...stats, durationMs });
        return NextResponse.json({ success: stats.errors === 0, stats });
    } catch (error: any) {
        const durationMs = Date.now() - startTime;
        metrics.increment('etl.jobs.fatal_errors');
        
        // Log detallado del error
        logger.error('Job Convocatorias Falló Catástroficamente', error, { 
            jobName, 
            runId, 
            durationMs 
        });
        
        return NextResponse.json({ 
            success: false, 
            error: error.message || 'Job failed',
            details: {
                name: error.name,
                stack: error.stack?.split('\n').slice(0, 5) // Primeras 5 líneas del stack
            }
        }, { status: 500 });
    }
}