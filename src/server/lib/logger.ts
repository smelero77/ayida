import { BETTERSTACK_INGEST_URL } from '~/server/lib/constants';

/**
 * Función base y privada para enviar cualquier tipo de log a Better Stack.
 * @param logData - Un objeto JSON con los datos del log.
 */
async function sendLog(logData: object) {
  // Si la variable de entorno con el token no está configurada,
  // mostramos el log en la consola local y no intentamos enviarlo.
  // Esto es útil para el desarrollo local sin necesidad de configurar el token.
  if (!process.env.BETTERSTACK_SOURCE_TOKEN) {
    console.log("LOG (modo desarrollo):", JSON.stringify(logData, null, 2));
    return;
  }

  try {
    // Realizamos la petición a la API de Better Stack.
    // No usamos 'await' en el fetch para no bloquear la ejecución de nuestra aplicación.
    // Es una operación de "disparar y olvidar" (fire and forget).
    fetch(BETTERSTACK_INGEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BETTERSTACK_SOURCE_TOKEN}`,
      },
      // Convertimos nuestro objeto de log a un string JSON.
      // Añadimos la fecha actual en formato estándar ISO 8601,
      // que Better Stack reconocerá automáticamente como el timestamp del evento.
      body: JSON.stringify({
        ...logData,
        dt: new Date().toISOString(),
      }),
    });
  } catch (e) {
    // Si por alguna razón el envío del log falla (ej: problema de red),
    // lo capturamos y lo mostramos en la consola del servidor para no detener la aplicación.
    console.error('Error al enviar log a Better Stack:', e);
  }
}

/**
 * Objeto 'logger' exportado para ser utilizado en toda la aplicación.
 * Proporciona métodos específicos para cada tipo de log, asegurando una estructura consistente.
 */
export const logger = {
  /**
   * Para registrar eventos informativos de progreso o éxito.
   * @param message - El mensaje principal del log.
   * @param metadata - Un objeto con cualquier dato estructurado adicional.
   */
  info: (message: string, metadata: object = {}) => {
    sendLog({ level: 'info', message, ...metadata });
  },

  /**
   * Para registrar advertencias o situaciones inesperadas que no son errores críticos.
   * @param message - El mensaje de la advertencia.
   * @param metadata - Datos adicionales.
   */
  warn: (message: string, metadata: object = {}) => {
    sendLog({ level: 'warn', message, ...metadata });
  },

  /**
   * Para registrar errores.
   * @param message - Un mensaje descriptivo del error.
   * @param error - El objeto Error capturado en un bloque catch.
   * @param metadata - Contexto adicional sobre dónde y por qué ocurrió el error.
   */
  error: (message: string, error: Error, metadata: object = {}) => {
    sendLog({
      level: 'error',
      message,
      // Adjuntamos un objeto estructurado con los detalles del error.
      // Esto es muy potente para depurar en Better Stack.
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      ...metadata,
    });
  },

  /**
   * Para registrar eventos de negocio específicos (ej: un usuario se registra).
   * @param eventName - El nombre del evento (ej: 'user_signup').
   * @param metadata - Datos asociados al evento (ej: { userId: '123' }).
   */
  event: (eventName: string, metadata: object = {}) => {
    sendLog({ level: 'info', event: eventName, ...metadata });
  },
}; 