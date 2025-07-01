/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { NextResponse } from "next/server"
import { db } from "~/server/db"
import { auth } from "~/server/auth"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
  }

  try {
    const profileId = parseInt(params.id)
    if (isNaN(profileId)) {
      return NextResponse.json({ success: false, error: "ID de perfil inválido" }, { status: 400 })
    }

    const perfil = await db.usuarioPerfil.findFirst({
      where: {
        id: profileId,
        userId: session.user.id // Asegurar que el perfil pertenece al usuario
      },
      include: {
        tamanoEmpresa: true,
        sector: true,
        ubicacion: true,
        necesidades: {
          include: {
            necesidad: true
          }
        },
        ambitosInteres: {
          include: {
            ambito: true
          }
        },
        plazosCarga: {
          include: {
            plazo: true
          }
        }
      }
    })

    if (!perfil) {
      return NextResponse.json({ success: false, error: "Perfil no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: perfil })
  } catch (error: unknown) {
    console.error("Error obteniendo perfil:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
  }

  try {
    const profileId = parseInt(params.id)
    if (isNaN(profileId)) {
      return NextResponse.json({ success: false, error: "ID de perfil inválido" }, { status: 400 })
    }

    const data = await request.json()

    // Verificar que el perfil pertenece al usuario
    const existingProfile = await db.usuarioPerfil.findFirst({
      where: {
        id: profileId,
        userId: session.user.id
      }
    })

    if (!existingProfile) {
      return NextResponse.json({ success: false, error: "Perfil no encontrado" }, { status: 404 })
    }

    const result = await db.$transaction(async (tx) => {
      // Actualizar datos básicos del perfil
      const perfilData: any = {
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
      if (data.ubicacionId) perfilData.ubicacionId = data.ubicacionId
      if (data.cofinanciacion_disp !== undefined) perfilData.cofinanciacion_disp = data.cofinanciacion_disp
      if (data.disponible_socios !== undefined) perfilData.disponible_socios = data.disponible_socios

      const perfil = await tx.usuarioPerfil.update({
        where: { id: profileId },
        data: perfilData,
      })

      // Eliminar relaciones existentes
      await tx.usuarioPerfilNecesidad.deleteMany({ where: { usuarioPerfilId: profileId } })
      await tx.usuarioPerfilAmbito.deleteMany({ where: { usuarioPerfilId: profileId } })
      await tx.usuarioPerfilPlazoCarga.deleteMany({ where: { usuarioPerfilId: profileId } })

      // Recrear necesidades
      if (data.necesidades?.length) {
        await tx.usuarioPerfilNecesidad.createMany({
          data: data.necesidades.map((necesidadId: number) => ({
            usuarioPerfilId: profileId,
            necesidadId,
          })),
        })
      }

      // Recrear ámbitos de interés
      if (data.ambitos?.length) {
        await tx.usuarioPerfilAmbito.createMany({
          data: data.ambitos.map((ambitoId: number) => ({
            usuarioPerfilId: profileId,
            ambitoId,
            interesado: true,
          })),
        })
      }

      // Recrear plazos
      if (data.plazos?.length) {
        await tx.usuarioPerfilPlazoCarga.createMany({
          data: data.plazos.map((plazo: { plazoId: number; cumple: boolean }) => ({
            usuarioPerfilId: profileId,
            plazoId: plazo.plazoId,
            cumple: plazo.cumple,
          })),
        })
      }

      return perfil
    })

    return NextResponse.json({ success: true, data: result })
  } catch (error: unknown) {
    console.error("Error actualizando perfil:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
} 