import { serve } from "inngest/next";
import { inngest } from "~/inngest/client";

// Importar las funciones correctas, incluyendo la nueva de lotes
import {
  createConvocatoriaJobs,
  processConvocatoriaBatch, // La nueva función de lotes
  processDocumentStorage
} from "~/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    // Lista de funciones actualizada para Inngest
    createConvocatoriaJobs,
    processConvocatoriaBatch, // Reemplaza a la antigua 'processConvocatoriaDetail'
    processDocumentStorage,
  ],
}); 