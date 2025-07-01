import { NextResponse } from "next/server"
import { db } from "~/server/db"

export async function GET() {
  try {
    // Obtener todos los datos de catálogo en paralelo
    const [
      tamanosEmpresa,
      sectores,
      ubicaciones,
      necesidades,
      ambitos,
      plazos
    ] = await Promise.all([
      db.tamanoEmpresa.findMany({
        orderBy: { id: 'asc' }
      }),
      db.sectorEmpresa.findMany({
        orderBy: { id: 'asc' }
      }),
      db.ubicacion.findMany({
        orderBy: { id: 'asc' }
      }),
      db.necesidadCliente.findMany({
        orderBy: { id: 'asc' }
      }),
      db.ambitoInteres.findMany({
        orderBy: { id: 'asc' }
      }),
      db.plazoCarga.findMany({
        orderBy: { id: 'asc' }
      })
    ])

    return NextResponse.json({
      success: true,
      data: {
        tamanosEmpresa,
        sectores,
        ubicaciones,
        necesidades,
        ambitos,
        plazos
      }
    })
  } catch (error) {
    console.error("Error obteniendo catálogos:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener los catálogos" },
      { status: 500 }
    )
  }
} 