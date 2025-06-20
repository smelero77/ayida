# Integración de Inngest en Ayida Portal

## Descripción General

Inngest es una plataforma de jobs asíncronos que permite ejecutar tareas en segundo plano de manera confiable y escalable. Esta integración reemplaza la ejecución directa de jobs con un sistema de eventos asíncronos.

## Arquitectura

### Componentes Principales

1. **Cliente de Inngest** (`src/inngest/client.ts`)
   - Configuración del cliente de Inngest
   - ID único del proyecto: `ayida-portal`

2. **Funciones de Inngest** (`src/inngest/functions.ts`)
   - `createConvocatoriaJobs`: Sincronización masiva de convocatorias
   - `processConvocatoriaDetail`: Procesamiento de convocatoria individual
   - `processDocumentStorage`: Almacenamiento de documentos

3. **API Handler** (`src/app/api/inngest/route.ts`)
   - Endpoint que Inngest usa para comunicarse con la aplicación
   - Registra todas las funciones disponibles

4. **Servicio de Inngest** (`src/server/services/inngest.ts`)
   - Métodos para enviar eventos a Inngest
   - Abstracción para el envío de eventos

## Eventos Disponibles

### 1. Sincronización Masiva de Convocatorias
```typescript
// Evento: convocatorias/sync.requested
{
  name: "convocatorias/sync.requested",
  data: {
    runId: string,
    timestamp: string
  }
}
```

**Uso:**
```typescript
import { InngestService } from '~/server/services/inngest';

await InngestService.triggerConvocatoriasSync();
```

### 2. Procesamiento de Convocatoria Individual
```typescript
// Evento: convocatorias/detail.requested
{
  name: "convocatorias/detail.requested",
  data: {
    bdns: string,
    runId: string,
    timestamp: string
  }
}
```

**Uso:**
```typescript
import { InngestService } from '~/server/services/inngest';

await InngestService.triggerConvocatoriaDetail("123456");
```

### 3. Almacenamiento de Documentos
```typescript
// Evento: documents/storage.requested
{
  name: "documents/storage.requested",
  data: {
    bdns: string,
    documentId: string,
    runId: string,
    timestamp: string
  }
}
```

**Uso:**
```typescript
import { InngestService } from '~/server/services/inngest';

await InngestService.triggerDocumentStorage("123456", "doc-789");
```

## Rutas de API Actualizadas

### 1. Sincronización Masiva
- **Ruta:** `POST /api/batch/sync-convocatorias`
- **Comportamiento:** Envía evento a Inngest en lugar de ejecutar directamente
- **Respuesta:** Confirmación de que el job fue encolado

### 2. Convocatoria Individual (Nueva)
- **Ruta:** `POST /api/batch/sync-convocatoria-individual`
- **Body:** `{ "bdns": "123456" }`
- **Comportamiento:** Envía evento para procesar convocatoria específica

## Ventajas de la Integración

### 1. **Confiabilidad**
- Reintentos automáticos en caso de fallo
- Persistencia de jobs en caso de reinicio del servidor
- Manejo de errores robusto

### 2. **Escalabilidad**
- Procesamiento paralelo de jobs
- Cola de trabajos para evitar sobrecarga
- Monitoreo y métricas integradas

### 3. **Observabilidad**
- Dashboard de Inngest para monitorear jobs
- Logs detallados de cada ejecución
- Métricas de rendimiento

### 4. **Desacoplamiento**
- Los jobs se ejecutan de forma asíncrona
- Las APIs responden inmediatamente
- Mejor experiencia de usuario

## Configuración del Entorno

### Variables de Entorno Requeridas
```bash
# Clave secreta para autorizar jobs
CRON_SECRET=your-secret-key

# Configuración de Inngest (opcional, usa valores por defecto en desarrollo)
INNGEST_EVENT_KEY=your-event-key
INNGEST_SIGNING_KEY=your-signing-key
```

### Desarrollo Local
1. Inngest funciona automáticamente en desarrollo
2. Los jobs se ejecutan localmente
3. No se requiere configuración adicional

### Producción
1. Configurar Inngest Cloud o self-hosted
2. Establecer variables de entorno
3. Configurar webhooks si es necesario

## Monitoreo y Debugging

### Dashboard de Inngest
- Acceder al dashboard de Inngest para ver jobs en tiempo real
- Revisar logs de ejecución
- Analizar métricas de rendimiento

### Logs Locales
- Los logs se mantienen en el sistema existente
- Compatibilidad con Pino y métricas actuales
- Información de jobName y runId para correlación

### Métricas
- Las métricas existentes se mantienen
- Nuevas métricas de Inngest disponibles
- Correlación entre sistemas de métricas

## Migración de Jobs Existentes

### Jobs Migrados
- ✅ Sincronización masiva de convocatorias
- ✅ Procesamiento de convocatoria individual
- ✅ Almacenamiento de documentos

### Jobs Pendientes de Migración
- Sincronización de catálogos básicos
- Sincronización de ayudas de estado
- Sincronización de concesiones
- Sincronización de grandes beneficiarios
- Sincronización de minimis
- Sincronización de órganos
- Sincronización de partidos políticos
- Sincronización de planes estratégicos
- Sincronización de regiones
- Sincronización de sanciones

## Próximos Pasos

1. **Migrar jobs restantes** a Inngest
2. **Configurar monitoreo** en producción
3. **Optimizar configuración** según métricas
4. **Implementar retry policies** personalizadas
5. **Añadir validación** de eventos

## Troubleshooting

### Problemas Comunes

1. **Jobs no se ejecutan**
   - Verificar que la ruta `/api/inngest` esté accesible
   - Revisar logs de Inngest
   - Confirmar que las funciones estén registradas

2. **Errores de autorización**
   - Verificar `CRON_SECRET` en variables de entorno
   - Confirmar headers de autorización en requests

3. **Jobs fallan**
   - Revisar logs detallados en dashboard de Inngest
   - Verificar conectividad con APIs externas
   - Confirmar configuración de base de datos

### Recursos Útiles
- [Documentación oficial de Inngest](https://www.inngest.com/docs)
- [Guía de Next.js con Inngest](https://www.inngest.com/docs/frameworks/nextjs)
- [Dashboard de Inngest](https://cloud.inngest.com) 