import { inngest } from "./client";
import { dbETL as db } from "~/server/db";
import { logger } from "~/server/lib/logger";
import { metrics } from "~/server/lib/metrics";
import { SNPSAP_API_BASE_URL } from "~/server/lib/constants";
import { loadCatalogCache, loadExistingConvocatoriasCache } from "~/server/services/cache";
import {
  getConvocatoriaDetalle,
  processAndSaveDetalle,
  getConvocatoriaStatus,
  updateConvocatoriaCache,
  getConvocatoriasPage,
} from "~/server/services/convocatorias";
import { fetchAndStoreDocument } from "~/server/services/storage";

const PORTAL = process.env.SNPSAP_PORTAL ?? "GE";
const PAGE_SIZE = 200;

// Función de ayuda para dividir un array en lotes (chunks)
function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

/**
 * FUNCIÓN 1: El Lanzador
 * Busca todas las convocatorias y crea eventos por lotes, añadiendo metadatos.
 */
export const createConvocatoriaJobs = inngest.createFunction(
  {
    id: "create-convocatoria-jobs",
    name: "Crear Lotes de Jobs de Convocatorias",
  },
  { event: "app/convocatorias.sync.requested" },
  async ({ step, logger, event }) => {
    logger.info("🚀 Iniciando sincronización de convocatorias...");

    await step.run("load-caches", async () => {
      await loadCatalogCache();
      await loadExistingConvocatoriasCache();
    });

    const allItemsToProcess: { bdns: string; titulo: string }[] = [];
    let currentPage = 0;
    let isLastPage = false;

    while (!isLastPage) {
      const data = await step.run(`fetch-page-${currentPage}`, async () => {
        return await getConvocatoriasPage(currentPage, PAGE_SIZE, 'inngest-create-jobs', event.id || 'unknown');
      });

      const items = data.content || [];
      for (const item of items) {
        if (!item.numeroConvocatoria || !item.id) continue;
        
        const { hasChanged } = getConvocatoriaStatus(item as any);
        if (hasChanged) {
          allItemsToProcess.push({
            bdns: item.numeroConvocatoria!,
            titulo: item.descripcion || '',
          });
        }
      }
      isLastPage = data.last ?? true;
      currentPage++;
    }

    if (allItemsToProcess.length === 0) {
      logger.info("✅ No se encontraron convocatorias nuevas para procesar.");
      return { message: "No new items to process." };
    }

    // --- LÓGICA DE BATCHING Y METADATOS ---
    const BATCH_SIZE = 20; // Tamaño de lote seguro para el plan gratuito
    const batches = chunk(allItemsToProcess, BATCH_SIZE);

    // Añade metadatos a cada evento de lote
    const batchEvents = batches.map((batch, batchIndex) => {
        const convocatoriasWithMetadata = batch.map((convo, itemIndex) => ({
            ...convo,
            run_index: (batchIndex * BATCH_SIZE) + itemIndex + 1,
        }));

        return {
            name: "app/convocatoria.process.batch", // Nuevo evento para lotes
            data: {
                batch_index: batchIndex + 1,
                total_batches: batches.length,
                total_convocatorias: allItemsToProcess.length,
                convocatorias: convocatoriasWithMetadata,
            },
        };
    });

    logger.info(`📊 Sincronización configurada: ${batchEvents.length} lotes, ${allItemsToProcess.length} convocatorias`);
    
    if (batchEvents.length > 0) {
        await step.sendEvent("fan-out-convocatoria-batches", batchEvents);
    }

    return { totalConvocatorias: allItemsToProcess.length, totalLotes: batchEvents.length };
  }
);

/**
 * FUNCIÓN 2: Procesador de Lotes de Convocatorias
 * Procesa un lote de convocatorias con concurrencia controlada.
 */
export const processConvocatoriaBatch = inngest.createFunction(
  {
    id: "process-convocatoria-batch",
    name: "Procesar Lote de Convocatorias",
    concurrency: {
      limit: 2, // Mantenemos la concurrencia baja como se recomendó anteriormente
    },
    retries: 3,
  },
  { event: "app/convocatoria.process.batch" },
  async ({ event, step, logger }) => {
    const { convocatorias, batch_index, total_batches, total_convocatorias } = event.data;
    logger.info(`📦 Procesando lote ${batch_index}/${total_batches} (${convocatorias.length} convocatorias)`);

    // 1. Array para acumular todos los eventos de documentos del lote
    const allDocEvents: Array<{
      name: string;
      data: {
        bdns: string;
        docId: number;
      };
    }> = [];

    for (const convo of convocatorias) {
      // 2. Ejecutar el procesamiento de cada item y OBTENER el resultado
      const result = await step.run(`process-item-${convo.bdns}`, async () => {
        if (!convo.bdns) {
          throw new Error(`BDNS no válido para convocatoria: ${convo.titulo}`);
        }
        
        const detalle = await getConvocatoriaDetalle(convo.bdns, 'inngest-batch', event.id || 'unknown');
        if (!detalle) {
          // Si no hay detalle, retornamos un objeto vacío para evitar errores
          return { documentos: [], bdns: convo.bdns };
        }

        const { hash, documentos } = await processAndSaveDetalle(detalle, 'inngest-batch', event.id || 'unknown');
        updateConvocatoriaCache(detalle, hash);

        // Retornamos los datos necesarios para el siguiente paso
        return { documentos, bdns: detalle.codigoBDNS || convo.bdns };
      });

      // 3. Construir los eventos a partir del resultado y añadirlos al array
      if (result && result.documentos.length > 0) {
        const docEvents = result.documentos.map((doc: any) => ({
          name: "app/document.process.storage",
          data: {
            bdns: result.bdns,
            docId: doc.id,
          },
        }));
        allDocEvents.push(...docEvents);
      }
    }

    // 4. Enviar TODOS los eventos de documentos del lote en un solo paso, FUERA del bucle
    if (allDocEvents.length > 0) {
      await step.sendEvent("fan-out-all-documents-for-batch", allDocEvents);
    }

    logger.info(`✅ Lote ${batch_index}/${total_batches} completado`);
    return { processedCount: convocatorias.length, documentsEnqueued: allDocEvents.length };
  }
);

/**
 * FUNCIÓN 3: Procesador de Almacenamiento de Documentos
 * (Mantiene su concurrencia ya que también accede a la BD)
 */
export const processDocumentStorage = inngest.createFunction(
  { 
    id: "process-document-storage", 
    name: "Almacenar Documento PDF", 
    retries: 4, 
    concurrency: { limit: 5 } 
  },
  { event: "app/document.process.storage" },
  async ({ event, step, logger }) => {
    const { bdns, docId } = event.data;
    if (!bdns || !docId) {
        throw new Error("BDNS o docId no proporcionados en el evento");
    }
    
    // Asegurar que bdns sea un string válido
    const bdnsString = String(bdns);
    
    const { storagePath, publicUrl } = await step.run("fetch-and-store", () => 
        fetchAndStoreDocument(bdnsString, Number(docId))
    );
    
    await step.run("update-db-record", () => 
        db.documento.updateMany({
            where: { idOficial: Number(docId) },
            data: { storagePath, storageUrl: publicUrl },
        })
    );
    
    logger.info(`📄 Documento ${docId} almacenado`);
    return { docId, storagePath };
  }
); 