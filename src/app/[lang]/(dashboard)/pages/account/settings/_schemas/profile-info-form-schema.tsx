import { z } from "zod"

import { formatFileSize } from "@/lib/utils"

import { MAX_AVATAR_SIZE } from "../../constants"

export const fomratedAvatarSize = formatFileSize(MAX_AVATAR_SIZE)

export const ProfileInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First Name must contain at least 2 characters." })
    .max(50, { message: "First Name must contain at most 50 characters." }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last Name must contain at least 2 characters." })
    .max(50, { message: "Last Name must contain at most 50 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .trim(),
  phoneNumber: z
    .string()
    .min(9, { message: "El teléfono debe tener al menos 9 dígitos." })
    .max(15, { message: "El teléfono debe tener como máximo 15 dígitos." }),
  province: z.string().min(2, { message: "Selecciona una provincia." }),
  city: z.string().min(2, { message: "La ciudad debe tener al menos 2 caracteres." }),
  address: z
    .string()
    .trim()
    .min(2, { message: "Address must contain at least 2 characters." })
    .max(100, { message: "Address must contain at most 100 characters." }),
  postalCode: z
    .string()
    .min(5, { message: "El código postal debe tener 5 dígitos." })
    .max(5, { message: "El código postal debe tener 5 dígitos." }),
  language: z.string(),
  avatar: z
    .instanceof(File)
    .refine((avatar) => avatar.size <= MAX_AVATAR_SIZE, {
      message: `Avatar must be ${fomratedAvatarSize} or less.`,
    })
    .optional(),
})
