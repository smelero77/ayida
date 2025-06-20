import { inngest } from "~/inngest/client";
import { logger } from "~/server/lib/logger";

/**
 * Servicio para enviar eventos a Inngest
 */
export class InngestService {
  /**
   * Envía un evento para procesar el detalle de una convocatoria específica
   * (Este método se mantiene para compatibilidad con llamadas manuales)
   */
  static async triggerConvocatoriaDetail(bdns: string, runId?: string) {
    try {
      await inngest.send({
        name: "app/convocatoria.process.detail",
        data: {
          bdns,
          runId: runId || crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
      });
      logger.info("Evento de procesamiento de detalle enviado a Inngest", { bdns, runId });
    } catch (error: any) {
      logger.error("Error enviando evento de detalle a Inngest", error, { bdns });
      throw error;
    }
  }

  /**
   * Envía un evento para procesar el almacenamiento de un documento
   * (Este método se mantiene para compatibilidad con llamadas manuales)
   */
  static async triggerDocumentStorage(bdns: string, documentId: string, runId?: string) {
    try {
      await inngest.send({
        name: "app/document.process.storage",
        data: {
          bdns,
          docId: documentId,
          runId: runId || crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
      });
      logger.info("Evento de almacenamiento de documento enviado a Inngest", { bdns, documentId, runId });
    } catch (error: any) {
      logger.error("Error enviando evento de almacenamiento a Inngest", error, { bdns, documentId });
      throw error;
    }
  }
} 