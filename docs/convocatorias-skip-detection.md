# Detección de Convocatorias Saltadas

## ¿Cómo saber si una convocatoria se ha saltado?

El sistema ahora distingue entre diferentes tipos de "skips" para proporcionar mejor trazabilidad:

### 1. **Convocatoria nueva sin cambios**
- **Caso**: Es la primera vez que se ve la convocatoria
- **Log**: `"Saltando convocatoria: nueva convocatoria"`
- **Métrica**: `etl.items.skipped`
- **Campo adicional**: `skipReason: 'nueva convocatoria'`

### 2. **Convocatoria existente sin cambios**
- **Caso**: La convocatoria ya existe en BD y no ha cambiado
- **Log**: `"Saltando convocatoria: sin cambios"`
- **Métrica**: `etl.items.skipped`
- **Campo adicional**: `skipReason: 'sin cambios'`

### 3. **Convocatoria con cambios**
- **Caso**: La convocatoria ha cambiado (nueva o existente)
- **Acción**: Se procesa normalmente
- **Métrica**: `etl.items.processed`

## Funciones disponibles para verificación

### `getConvocatoriaStatus(detalle)`
Retorna información completa sobre el estado de una convocatoria:

```typescript
const status = getConvocatoriaStatus(detalle);
// {
//   exists: boolean,        // ¿Existe en el cache?
//   hasChanged: boolean,    // ¿Ha cambiado?
//   storedHash: string,     // Hash almacenado
//   currentHash: string,    // Hash actual
//   skipReason?: string     // Razón del skip (si aplica)
// }
```

### `convocatoriaExistsInCache(detalle)`
Verifica si la convocatoria existe en el cache (ya ha sido procesada antes).

### `hasConvocatoriaChanged(detalle)`
Verifica si la convocatoria ha cambiado comparando hashes.

## Ejemplo de uso

```typescript
const detalle = await getConvocatoriaDetalle(bdns, jobName, runId);
if (detalle) {
    const status = getConvocatoriaStatus(detalle);
    
    if (!status.hasChanged) {
        // Se salta la convocatoria
        logger.info(`Saltando convocatoria: ${status.skipReason}`, {
            bdns,
            exists: status.exists,
            skipReason: status.skipReason
        });
        metrics.increment('etl.items.skipped');
        return { success: true, bdns, skipped: true, skipReason: status.skipReason };
    }
    
    // Procesar la convocatoria
    const processedHash = await processAndSaveDetalle(detalle, jobName, runId);
    updateConvocatoriaCache(detalle, processedHash);
}
```

## Logs de ejemplo

### Convocatoria nueva sin cambios:
```
[INFO] Saltando convocatoria: nueva convocatoria {
  "bdns": "123456",
  "exists": false,
  "skipReason": "nueva convocatoria"
}
```

### Convocatoria existente sin cambios:
```
[INFO] Saltando convocatoria: sin cambios {
  "bdns": "789012",
  "exists": true,
  "skipReason": "sin cambios"
}
```

### Convocatoria procesada:
```
[INFO] Convocatoria procesada exitosamente {
  "bdns": "345678",
  "durationMs": 1250
}
```

## Métricas disponibles

- `etl.items.skipped` - Total de convocatorias saltadas
- `etl.items.processed` - Total de convocatorias procesadas
- `etl.items.errors` - Total de errores
- `etl.items.fetched` - Total de convocatorias obtenidas de la API

## Estadísticas del job

Al final de cada ejecución, se retornan estadísticas detalladas:

```typescript
{
  processed: 150,    // Convocatorias procesadas
  skipped: 45,       // Convocatorias saltadas
  errors: 2          // Errores
}
``` 