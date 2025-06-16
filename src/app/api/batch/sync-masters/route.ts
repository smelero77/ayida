// ~/pages/api/sync-masters.ts

import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { logger } from '~/server/lib/logger';
import { SNPSAP_API_BASE_URL } from '~/server/lib/constants';

// Este parámetro identifica tu portal en la API SNPSAP.
// Puedes llevarlo a tu .env como SNPSAP_PORTAL.
const PORTAL = process.env.SNPSAP_PORTAL ?? 'GE';

/**
 * Sincroniza un catálogo simple (id + descripcion).
 */
async function syncSimpleCatalog(
  jobName: string,
  catalogName: string,
  endpoint: string,
  model: any
) {
  const logMeta = { jobName, catalogName, endpoint };
  logger.info(`Iniciando sincronización: ${catalogName}`, logMeta);

  let processed = 0;
  let errors = 0;

  try {
    // 1) Llamada con ?vpd=GE y header Accept
    const url = `${SNPSAP_API_BASE_URL}${endpoint}?vpd=${encodeURIComponent(PORTAL)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    // 2) Si viene 204, devolvemos array vacío
    const items: { id: any; descripcion: string }[] =
      response.status === 204
        ? []
        : await response.json();

    // 3) Procesamos el array (puede ser vacío)
    for (const item of items) {
      try {
        await model.upsert({
          where: { idOficial: item.id },
          update: { descripcion: item.descripcion },
          create: { idOficial: item.id, descripcion: item.descripcion },
        });
        processed++;
      } catch (e: any) {
        errors++;
        logger.error(`Error procesando item en '${catalogName}'`, e, {
          ...logMeta,
          itemId: item.id,
        });
      }
    }

    logger.info(`Sincronización de '${catalogName}' finalizada.`, {
      ...logMeta,
      processed,
      errors,
    });
  } catch (error: any) {
    errors++;
    logger.error(
      `Fallo crítico en la sincronización de '${catalogName}'`,
      error,
      { ...logMeta, isCritical: true }
    );
  }

  return { processed, errors };
}

/**
 * Sincroniza el catálogo jerárquico de Regiones.
 */
async function syncRegiones(jobName: string) {
  const logMeta = { jobName, catalogName: 'Regiones' };
  logger.info("Iniciando sincronización: Regiones", logMeta);

  let processed = 0;
  let errors = 0;

  type ApiRegionNode = {
    id: number;
    descripcion: string;
    children?: ApiRegionNode[];
  };

  async function processNode(node: ApiRegionNode) {
    try {
      await db.region.upsert({
        where: { idOficial: node.id },
        update: { nombre: node.descripcion },
        create: { idOficial: node.id, nombre: node.descripcion },
      });
      processed++;

      if (node.children) {
        for (const child of node.children) {
          await processNode(child);
        }
      }
    } catch (e: any) {
      errors++;
      logger.error(`Error procesando región`, e, {
        ...logMeta,
        regionId: node.id,
        regionName: node.descripcion,
      });
    }
  }

  try {
    const url = `${SNPSAP_API_BASE_URL}/regiones?vpd=${encodeURIComponent(PORTAL)}`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });

    const regionTree: ApiRegionNode[] =
      response.status === 204
        ? []
        : await response.json();

    for (const rootNode of regionTree) {
      await processNode(rootNode);
    }

    logger.info(`Sincronización de 'Regiones' finalizada.`, {
      ...logMeta,
      processed,
      errors,
    });
  } catch (error: any) {
    errors++;
    logger.error(
      `Fallo crítico en la sincronización de 'Regiones'`,
      error,
      { ...logMeta, isCritical: true }
    );
  }

  return { processed, errors };
}

export async function POST(req: Request) {
  // 1) Autorización
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobName = 'sync-masters';
  const startTime = Date.now();
  logger.info('Job started', { jobName });

  const finalStats = { totalProcessed: 0, totalErrors: 0 };

  try {
    // 2) Llamadas secuenciales a cada catálogo
    const finalidadesStats = await syncSimpleCatalog(
      jobName,
      'Finalidades',
      '/finalidades',
      db.finalidad
    );
    finalStats.totalProcessed += finalidadesStats.processed;
    finalStats.totalErrors += finalidadesStats.errors;

    const instrumentosStats = await syncSimpleCatalog(
      jobName,
      'Instrumentos de Ayuda',
      '/instrumentos',
      db.instrumentoAyuda
    );
    finalStats.totalProcessed += instrumentosStats.processed;
    finalStats.totalErrors += instrumentosStats.errors;

    const tiposBeneficiarioStats = await syncSimpleCatalog(
      jobName,
      'Tipos de Beneficiario',
      '/beneficiarios',
      db.tipoBeneficiario
    );
    finalStats.totalProcessed += tiposBeneficiarioStats.processed;
    finalStats.totalErrors += tiposBeneficiarioStats.errors;

    const regionesStats = await syncRegiones(jobName);
    finalStats.totalProcessed += regionesStats.processed;
    finalStats.totalErrors += regionesStats.errors;

    // …más catálogos si es preciso

    // 3) Resultado final del job
    const durationMs = Date.now() - startTime;
    if (finalStats.totalErrors > 0) {
      logger.warn('Job finished with some errors', {
        jobName,
        stats: finalStats,
        durationMs,
      });
    } else {
      logger.info('Job finished successfully', {
        jobName,
        stats: finalStats,
        durationMs,
      });
    }

    return NextResponse.json({ success: true, stats: finalStats });
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    logger.error('Job failed catastrophically', error, {
      jobName,
      stats: finalStats,
      durationMs,
    });
    return NextResponse.json(
      { success: false, error: 'Job failed' },
      { status: 500 }
    );
  }
}
