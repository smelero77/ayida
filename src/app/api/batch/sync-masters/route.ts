import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '~/server/db';
import { logger } from '~/server/lib/logger';
import { metrics } from '~/server/lib/metrics';
import { SNPSAP_API_BASE_URL } from '~/server/lib/constants';

const PORTAL = process.env.SNPSAP_PORTAL ?? 'GE';

// NOTA: Las siguientes funciones han sido movidas a procesos separados:
// - syncSimpleCatalog -> sync-catalogos-basicos
// - syncOrganos -> sync-organos  
// - syncRegiones -> sync-regiones
// - syncGrandesBeneficiarios -> sync-grandes-beneficiarios

export async function POST(req: Request) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobName = 'sync-masters';
  const runId = crypto.randomUUID();
  metrics.increment('etl.jobs.invoked');
  const startTime = Date.now();
  logger.info('Job Masters Invocado', { jobName, runId });

  const finalStats = { totalProcessed: 0, totalErrors: 0 };

  try {
    // NOTA: Este proceso ya no incluye las funciones movidas a procesos separados
    // Para sincronizar catálogos básicos, regiones, órganos y grandes beneficiarios,
    // usa los endpoints separados correspondientes.
    
    logger.info('Job Masters Completado (sin tareas)', { jobName, runId, stats: finalStats, durationMs: 0 });
    return NextResponse.json({ 
      success: true, 
      stats: finalStats,
      message: 'Este proceso ha sido separado en endpoints independientes. Usa: sync-catalogos-basicos, sync-regiones, sync-organos, sync-grandes-beneficiarios'
    });
  } catch (error: unknown) {
    const durationMs = Date.now() - startTime;
    metrics.increment('etl.jobs.fatal_errors');
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorObj = error instanceof Error ? error : new Error(errorMessage);
    logger.error('Job Masters Falló Catástroficamente', errorObj, { jobName, runId, durationMs });
    return NextResponse.json({ success: false, error: 'Job failed' }, { status: 500 });
  }
}