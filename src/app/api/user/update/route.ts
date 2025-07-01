import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "~/server/db"
import { auth } from "~/server/auth"
import { supabase } from "~/server/lib/supabase"
import { randomUUID } from "crypto"

const bodySchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(9).max(15),
  province: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().min(5).max(5),
  language: z.string(),
  avatar: z.string().optional(), // base64 o url
})

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 })
    }

    const json = await request.json()
    const data = bodySchema.parse(json)

    let imageUrl: string | undefined

    if (data.avatar) {
      // expected format data:image/png;base64,XXXXX
      const [header, base64] = data.avatar.split(",")
      const mimeMatch = header.match(/data:(.*);base64/)
      const mimeType = mimeMatch ? mimeMatch[1] : "image/png"
      const fileExt = mimeType.split("/")[1] ?? "png"
      const fileName = `${session.user.id}-${randomUUID()}.${fileExt}`

      const buffer = Buffer.from(base64, "base64")

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, buffer, {
          contentType: mimeType,
          upsert: true,
        })

      if (uploadError) {
        console.error("Error uploading avatar", uploadError)
        return NextResponse.json({ success: false, error: "Error subiendo la imagen" }, { status: 500 })
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName)

      imageUrl = publicUrlData?.publicUrl
    }

    await db.user.update({
      where: { id: session.user.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        province: data.province,
        city: data.city,
        address: data.address,
        postalCode: data.postalCode,
        language: data.language,
        ...(imageUrl ? { image: imageUrl } : {}),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error("API user/update error", error)
    const message = error instanceof Error ? error.message : "Error inesperado"
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
} 