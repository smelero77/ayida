/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "~/server/db"
import { auth } from "~/server/auth"

// Esquema de validación (simplificado). Se pueden añadir más campos/validaciones.
const bodySchema = z.object({
  nombre_perfil: z.string().min(2),
  nombre_empresa: z.string().optional(),
  nif_cif: z.string().min(8).max(15),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
  // Paso 3
  tamanoEmpresaId: z.number().optional(),
  sectorId: z.number().optional(),
  cofinanciacion_disp: z.boolean().optional(),
  disponible_socios: z.boolean().optional(),
  // Paso 4
  necesidades: z.array(z.number()).optional(),
  ambitos: z.array(z.number()).optional(),
  plazos: z.array(
    z.object({
      plazoId: z.number(),
      cumple: z.boolean(),
    })
  ).optional(),
})

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
  }

  try {
    const json = await request.json()
    const data = bodySchema.parse(json)

    // Verificar unicidad NIF/CIF
    if (data.nif_cif) {
      const exists = await db.usuarioPerfil.findFirst({ where: { nif_cif: data.nif_cif } })
      if (exists) {
        return NextResponse.json({ success: false, error: "NIF/CIF ya existe" }, { status: 400 })
      }
    }

    // Validar que los IDs de foreign keys existen
    const validationErrors: string[] = []

    if (data.tamanoEmpresaId) {
      const tamanoExists = await db.tamanoEmpresa.findUnique({ where: { id: data.tamanoEmpresaId } })
      if (!tamanoExists) {
        validationErrors.push(`El tamaño de empresa con ID ${data.tamanoEmpresaId} no existe`)
      }
    }

    if (data.sectorId) {
      const sectorExists = await db.sectorEmpresa.findUnique({ where: { id: data.sectorId } })
      if (!sectorExists) {
        validationErrors.push(`El sector con ID ${data.sectorId} no existe`)
      }
    }

    if (data.necesidades?.length) {
      for (const necesidadId of data.necesidades) {
        const necesidadExists = await db.necesidadCliente.findUnique({ where: { id: necesidadId } })
        if (!necesidadExists) {
          validationErrors.push(`La necesidad con ID ${necesidadId} no existe`)
        }
      }
    }

    if (data.ambitos?.length) {
      for (const ambitoId of data.ambitos) {
        const ambitoExists = await db.ambitoInteres.findUnique({ where: { id: ambitoId } })
        if (!ambitoExists) {
          validationErrors.push(`El ámbito con ID ${ambitoId} no existe`)
        }
      }
    }

    if (data.plazos?.length) {
      for (const plazo of data.plazos) {
        const plazoExists = await db.plazoCarga.findUnique({ where: { id: plazo.plazoId } })
        if (!plazoExists) {
          validationErrors.push(`El plazo con ID ${plazo.plazoId} no existe`)
        }
      }
    }

    // Si hay errores de validación, retornarlos
    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        success: false, 
        error: "Errores de validación", 
        details: validationErrors 
      }, { status: 400 })
    }

    const result = await db.$transaction(async (tx) => {
      // Crear UsuarioPerfil - solo incluir campos que no son null/undefined
      const perfilData: {
        userId: string;
        nombre_perfil: string;
        nif_cif: string;
        nombre_empresa?: string;
        direccion?: string;
        telefono?: string;
        email?: string;
        tamanoEmpresaId?: number;
        sectorId?: number;
        cofinanciacion_disp?: boolean;
        disponible_socios?: boolean;
      } = {
        userId: session.user.id,
        nombre_perfil: data.nombre_perfil,
        nif_cif: data.nif_cif,
      }

      // Agregar campos opcionales solo si tienen valor
      if (data.nombre_empresa) perfilData.nombre_empresa = data.nombre_empresa
      if (data.direccion) perfilData.direccion = data.direccion
      if (data.telefono) perfilData.telefono = data.telefono
      if (data.email) perfilData.email = data.email
      if (data.tamanoEmpresaId) perfilData.tamanoEmpresaId = data.tamanoEmpresaId
      if (data.sectorId) perfilData.sectorId = data.sectorId
      if (data.cofinanciacion_disp !== undefined) perfilData.cofinanciacion_disp = data.cofinanciacion_disp
      if (data.disponible_socios !== undefined) perfilData.disponible_socios = data.disponible_socios

      const perfil = await tx.usuarioPerfil.create({
        data: perfilData,
      })

      // Necesidades
      if (data.necesidades?.length) {
        await tx.usuarioPerfilNecesidad.createMany({
          data: data.necesidades.map((necesidadId) => ({
            usuarioPerfilId: perfil.id,
            necesidadId,
          })),
        })
      }

      // Ámbitos de interés
      if (data.ambitos?.length) {
        await tx.usuarioPerfilAmbito.createMany({
          data: data.ambitos.map((ambitoId) => ({
            usuarioPerfilId: perfil.id,
            ambitoId,
            interesado: true,
          })),
        })
      }

      // Plazos carga
      if (data.plazos?.length) {
        await tx.usuarioPerfilPlazoCarga.createMany({
          data: data.plazos.map((p) => ({
            usuarioPerfilId: perfil.id,
            plazoId: p.plazoId,
            cumple: p.cumple,
          })),
        })
      }

      return perfil
    })

    return NextResponse.json({ success: true, id: result.id })
  } catch (error: unknown) {
    console.error("API perfiles/create error", error)
    
    // Manejar errores específicos de Prisma
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'P2003') {
        return NextResponse.json({ 
          success: false, 
          error: "Error de referencia en base de datos. Verifica que todos los datos de catálogo estén correctos.",
          code: error.code
        }, { status: 400 })
      }
    }
    
    const message = error instanceof Error ? error.message : "Error inesperado"
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
} 