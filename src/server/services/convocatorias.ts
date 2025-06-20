import { dbETL as db } from '~/server/db';
import { logger } from '~/server/lib/logger';
import { metrics } from '~/server/lib/metrics';
import { SNPSAP_API_BASE_URL } from '~/server/lib/constants';
import { computeContentHash } from '~/server/utils/hash';
import { fetchAndStoreDocument } from '~/server/services/storage';
import {
  getCachedFinalidad,
  getCachedReglamento,
  getCachedTiposBeneficiario,
  getCachedInstrumentos,
  getCachedRegiones,
  getCachedFondos,
  getCachedSectores,
  existingConvocatoriasCache,
} from './cache';

const PORTAL = process.env.SNPSAP_PORTAL ?? 'GE';

/**
 * Obtiene el detalle completo de una convocatoria usando su código BDNS.
 */
export async function getConvocatoriaDetalle(bdns: string, jobName: string, runId: string): Promise<any | null> {
    const url = new URL(`${SNPSAP_API_BASE_URL}/convocatorias`);
    url.searchParams.append('numConv', bdns);
    url.searchParams.append('vpd', PORTAL);

    const logMeta = { jobName, runId, catalogName: 'Convocatorias', bdns };
    logger.info(`Pidiendo detalle para BDNS: ${bdns}`, logMeta);
    metrics.increment('etl.items.fetched');

    try {
        const response = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } });
        if (!response.ok) {
            logger.warn(`No se pudo obtener el detalle para BDNS ${bdns}`, { ...logMeta, status: response.status });
            metrics.increment('etl.items.errors');
            return null;
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data[0] : data;

    } catch (error: unknown) {
        logger.error(`Excepción de red al obtener detalle para BDNS ${bdns}`, error as Error, logMeta);
        metrics.increment('etl.items.errors');
        return null;
    }
}

/**
 * Guarda el detalle de una convocatoria y todas sus relaciones en la base de datos.
 * Retorna los documentos procesados para que puedan ser almacenados posteriormente.
 */
export async function processAndSaveDetalle(detalle: any, jobName: string, runId: string): Promise<{ hash: string; documentos: any[] }> {
    const logMeta = { jobName, runId, catalogName: 'Convocatorias', convocatoriaId: detalle.id };
    const startItem = Date.now();
    
    // Calcular el hash del contenido
    const newHash = computeContentHash(detalle);
    let documentosProcesados: any[] = [];
    
    // La transacción tiene un timeout de 120 segundos para manejar operaciones complejas
    await db.$transaction(async (tx) => {
        // Usar cache en lugar de consultas a BD
        const finalidad = detalle.descripcionFinalidad ? getCachedFinalidad(detalle.descripcionFinalidad) : null;
        const reglamento = detalle.reglamento?.autorizacion ? getCachedReglamento(detalle.reglamento.autorizacion) : null;

        // PASO 1: Crear o actualizar la convocatoria principal
        const convocatoria = await tx.convocatoria.upsert({
            where: { idOficial: detalle.id },
            update: {
                titulo: detalle.descripcion,
                tituloCooficial: detalle.descripcionLeng,
                descripcion: detalle.descripcionBasesReguladoras,
                presupuestoTotal: detalle.presupuestoTotal,
                urlBasesReguladoras: detalle.urlBasesReguladoras,
                sedeElectronica: detalle.sedeElectronica,
                fechaPublicacion: new Date(detalle.fechaPublicacion ?? detalle.fechaRecepcion),
                fechaInicioSolicitud: detalle.fechaInicioSolicitud ? new Date(detalle.fechaInicioSolicitud) : null,
                fechaFinSolicitud: detalle.fechaFinSolicitud ? new Date(detalle.fechaFinSolicitud) : null,
                plazoAbierto: detalle.abierto,
                mrr: detalle.mrr,
                finalidadId: finalidad?.idOficial,
                reglamentoId: reglamento?.idOficial,
                tipoConvocatoria: detalle.tipoConvocatoria,
                descripcionBasesReguladoras: detalle.descripcionBasesReguladoras,
                sePublicaDiarioOficial: detalle.sePublicaDiarioOficial,
                textInicioSolicitud: detalle.textInicio,
                ayudaEstadoSANumber: detalle.ayudaEstado,
                ayudaEstadoUrl: detalle.urlAyudaEstado,
            },
            create: {
                idOficial: detalle.id,
                codigoBDNS: detalle.codigoBDNS,
                titulo: detalle.descripcion,
                tituloCooficial: detalle.descripcionLeng,
                descripcion: detalle.descripcionBasesReguladoras,
                presupuestoTotal: detalle.presupuestoTotal,
                urlBasesReguladoras: detalle.urlBasesReguladoras,
                sedeElectronica: detalle.sedeElectronica,
                fechaPublicacion: new Date(detalle.fechaPublicacion ?? detalle.fechaRecepcion),
                fechaInicioSolicitud: detalle.fechaInicioSolicitud ? new Date(detalle.fechaInicioSolicitud) : null,
                fechaFinSolicitud: detalle.fechaFinSolicitud ? new Date(detalle.fechaFinSolicitud) : null,
                plazoAbierto: detalle.abierto,
                mrr: detalle.mrr,
                finalidadId: finalidad?.idOficial,
                reglamentoId: reglamento?.idOficial,
                tipoConvocatoria: detalle.tipoConvocatoria,
                descripcionBasesReguladoras: detalle.descripcionBasesReguladoras,
                sePublicaDiarioOficial: detalle.sePublicaDiarioOficial,
                textInicioSolicitud: detalle.textInicio,
                ayudaEstadoSANumber: detalle.ayudaEstado,
                ayudaEstadoUrl: detalle.urlAyudaEstado,
            },
        });

        // PASO 2: Sincronizar relaciones anidadas (1 a N) - Borrar y crear
        if (detalle.documentos?.length > 0) {
            await tx.documento.deleteMany({ where: { convocatoriaId: convocatoria.id } });
            await tx.documento.createMany({
                data: detalle.documentos.map((doc: any) => ({
                    idOficial: doc.id,
                    nombreFic: doc.nombreFic,
                    descripcion: doc.descripcion,
                    longitud: doc.long,
                    fechaMod: doc.datMod ? new Date(doc.datMod) : null,
                    fechaPublic: doc.datPublicacion ? new Date(doc.datPublicacion) : null,
                    convocatoriaId: convocatoria.id,
                })),
                skipDuplicates: true,
            });

            // Guardar los documentos procesados para retornarlos
            documentosProcesados = detalle.documentos;
        }
        if (detalle.anuncios?.length > 0) {
            await tx.anuncio.deleteMany({ where: { convocatoriaId: convocatoria.id } });
            await tx.anuncio.createMany({
                data: detalle.anuncios.map((an: any) => ({
                    numAnuncio: an.numAnuncio,
                    titulo: an.titulo,
                    tituloLeng: an.tituloLeng,
                    texto: an.texto,
                    url: an.url,
                    cve: an.cve,
                    desDiarioOficial: an.desDiarioOficial,
                    fechaPublicacion: an.datPublicacion ? new Date(an.datPublicacion) : null,
                    convocatoriaId: convocatoria.id,
                })),
                skipDuplicates: true,
            });
        }
        if (detalle.objetivos?.length > 0) {
            await tx.objetivo.deleteMany({ where: { convocatoriaId: convocatoria.id } });
            await tx.objetivo.createMany({
                data: detalle.objetivos.map((obj: any) => ({
                    descripcion: obj.descripcion,
                    convocatoriaId: convocatoria.id,
                })),
                skipDuplicates: true,
            });
        }

        // PASO 3: Enlazar relaciones muchos a muchos usando cache
        const tiposBeneficiarioIds = getCachedTiposBeneficiario((detalle.tiposBeneficiarios || []).map((t: any) => t.id).filter(Boolean));
        const instrumentosIds = getCachedInstrumentos((detalle.instrumentos || []).map((i: any) => i.id).filter(Boolean));
        const regionesIds = getCachedRegiones((detalle.regiones || []).map((r: any) => r.id).filter(Boolean));
        const fondosIds = getCachedFondos((detalle.fondos || []).map((f: any) => f.descripcion));
        const sectoresIds = getCachedSectores((detalle.sectores || []).map((s: any) => s.codigo).filter(Boolean));
        
        await tx.convocatoria.update({
            where: { id: convocatoria.id },
            data: {
                tiposBeneficiario: { set: tiposBeneficiarioIds },
                instrumentosAyuda: { set: instrumentosIds },
                regionesDeImpacto: { set: regionesIds },
                fondosEuropeos: { set: fondosIds },
                sectoresEconomicos: { set: sectoresIds },
            },
        });

        // Actualizar el hash del contenido y la fecha de sincronización
        await tx.convocatoria.update({
            where: { idOficial: detalle.id },
            data: {
                contentHash: newHash,
                lastSyncedAt: new Date(),
            },
        });
    }, {
      timeout: 120000, // 120 segundos (aumentado de 60)
    });
    
    const duration = Date.now() - startItem;
    metrics.histogram('etl.items.processed.duration_ms', duration);
    logger.info('Convocatoria procesada exitosamente', { ...logMeta, durationMs: duration, documentosCount: documentosProcesados.length });

    return { hash: newHash, documentos: documentosProcesados };
}

/**
 * Verifica si una convocatoria ha cambiado comparando su hash actual con el almacenado.
 */
export function hasConvocatoriaChanged(detalle: any): boolean {
    const newHash = computeContentHash(detalle);
    const oldHash = existingConvocatoriasCache.get(Number(detalle.id)) || '';
    return oldHash !== newHash;
}

/**
 * Verifica si una convocatoria existe en el cache (ya ha sido procesada antes).
 */
export function convocatoriaExistsInCache(detalle: any): boolean {
    return existingConvocatoriasCache.has(Number(detalle.id));
}

/**
 * Obtiene el hash almacenado de una convocatoria (retorna string vacío si no existe).
 */
export function getStoredConvocatoriaHash(detalle: any): string {
    return existingConvocatoriasCache.get(Number(detalle.id)) || '';
}

/**
 * Actualiza el cache local con el nuevo hash de una convocatoria procesada.
 */
export function updateConvocatoriaCache(detalle: any, processedHash: string): void {
    existingConvocatoriasCache.set(Number(detalle.id), processedHash);
}

/**
 * Obtiene información detallada sobre el estado de una convocatoria.
 */
export function getConvocatoriaStatus(detalle: any): {
    exists: boolean;
    hasChanged: boolean;
    storedHash: string;
    currentHash: string;
    skipReason?: string;
} {
    const exists = existingConvocatoriasCache.has(Number(detalle.id));
    const storedHash = existingConvocatoriasCache.get(Number(detalle.id)) || '';
    const currentHash = computeContentHash(detalle);
    const hasChanged = storedHash !== currentHash;
    
    let skipReason: string | undefined;
    if (!hasChanged) {
        skipReason = exists ? 'sin cambios' : 'nueva convocatoria';
    }
    
    return {
        exists,
        hasChanged,
        storedHash,
        currentHash,
        skipReason
    };
}

/**
 * Obtiene una página de la lista de convocatorias.
 */
export async function getConvocatoriasPage(page: number, pageSize: number, jobName: string, runId: string): Promise<any> {
    const url = new URL(`${SNPSAP_API_BASE_URL}/convocatorias/busqueda`);
    url.searchParams.append("vpd", PORTAL);
    url.searchParams.append("page", String(page));
    url.searchParams.append("pageSize", String(pageSize));
    url.searchParams.append("order", "fechaRecepcion");
    url.searchParams.append("direccion", "desc");
    
    // Filtro para convocatorias desde junio de 2025
    url.searchParams.append("fechaDesde", "01/06/2025");

    const logMeta = { jobName, runId, catalogName: 'Convocatorias', page, pageSize, fechaDesde: "01/06/2025" };
    logger.info(`Pidiendo página ${page} de convocatorias (desde 01/06/2025)...`, logMeta);
    metrics.increment('etl.pages.fetched');

    try {
        const response = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } });
        if (!response.ok) {
            logger.warn(`Fallo fetching página ${page} de convocatorias`, { ...logMeta, status: response.status });
            metrics.increment('etl.pages.failed');
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        logger.info(`Página ${page} de convocatorias recibida`, { ...logMeta, count: data.content?.length || 0 });
        metrics.gauge('etl.pages.item_count', data.content?.length || 0);
        
        return data;

    } catch (error: unknown) {
        logger.error(`Excepción de red al obtener página ${page} de convocatorias`, error as Error, logMeta);
        metrics.increment('etl.pages.failed');
        throw error;
    }
} 