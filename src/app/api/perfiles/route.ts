/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextResponse } from "next/server"
import { db } from "~/server/db"
import { auth } from "~/server/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
  }

  try {
    const perfiles = await db.usuarioPerfil.findMany({
      where: {
        userId: session.user.id
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
      },
      orderBy: {
        fecha_creacion: 'desc'
      }
    })

    return NextResponse.json({ success: true, data: perfiles })
  } catch (error: unknown) {
    console.error("Error obteniendo perfiles:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
} 