/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { ChangeEvent } from "react"
import type { ProfileInfoFormType, UserType } from "../../../types"

import { ProfileInfoSchema } from "../../_schemas/profile-info-form-schema"

import { cn, getInitials } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, ButtonLoading, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useShowToast } from "@/lib/toast"
import { useCurrentUser } from "@/hooks/use-current-user"

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ProfileInfoForm({ user, dictionary }: { user: UserType; dictionary: any }) {
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(
    user?.avatar
  )

  const u = user as any

  const form = useForm<ProfileInfoFormType>({
    resolver: zodResolver(ProfileInfoSchema),
    values: {
      firstName: u.firstName ?? "",
      lastName: u.lastName ?? "",
      email: u.email ?? "",
      phoneNumber: u.phoneNumber ?? "",
      province: u.province ?? "",
      city: u.city ?? "",
      address: u.address ?? "",
      postalCode: u.postalCode ?? "",
      language: u.language ?? "",
      avatar: undefined,
    },
  })

  const { isSubmitting, isDirty } = form.formState
  const isDisabled = isSubmitting || !isDirty // Disable button if form is unchanged or submitting

  const showToast = useShowToast()
  const { refetch } = useCurrentUser()

  async function onSubmit(data: ProfileInfoFormType) {
    try {
      let avatarBase64: string | undefined

      if (data.avatar) {
        avatarBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(data.avatar as File)
        })
      }

      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, avatar: avatarBase64 }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Error al guardar los datos")
      }

      showToast.success("Datos guardados correctamente")
      form.reset({ ...data, avatar: undefined })
      refetch()
    } catch (error: any) {
      console.error(error)
      showToast.error("Error", error.message)
    }
  }

  function handleResetForm() {
    form.reset() // Reset the form to the initial state
    setPhotoPreview(user?.avatar) // Reset photoPreview to the initial state
  }

  function handleUploadPhoto(e: ChangeEvent<HTMLInputElement>) {
    // Get the selected file from the file input
    const file = e.target.files?.[0]

    if (file) {
      // Generate a temporary URL for the uploaded image for preview purposes
      const imageUrl = URL.createObjectURL(file)

      setPhotoPreview(imageUrl)
      form.setValue("avatar", file, { shouldDirty: true })
      form.trigger("avatar") // Trigger validation for the "avatar" field
    }
  }

  function handleRemovePhoto() {
    form.resetField("avatar")
    setPhotoPreview(undefined)
    form.setDirty(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
        <div className="flex items-center gap-x-4">
          <Avatar className="size-22">
            <AvatarImage src={photoPreview ?? ""} alt="Profile Avatar" />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "cursor-pointer w-full"
                    )}
                  >
                    Upload Photo
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadPhoto}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={handleRemovePhoto}
            >
              Remove Photo
            </Button>
          </div>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="612345678"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provincia</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona provincia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {[
                      "Álava","Albacete","Alicante","Almería","Asturias","Ávila","Badajoz","Barcelona","Burgos","Cáceres","Cádiz","Cantabria","Castellón","Ciudad Real","Córdoba","La Coruña","Cuenca","Gerona","Granada","Guadalajara","Guipúzcoa","Huelva","Huesca","Islas Baleares","Jaén","León","Lérida","Lugo","Madrid","Málaga","Murcia","Navarra","Orense","Palencia","Las Palmas","Pontevedra","La Rioja","Salamanca","Segovia","Sevilla","Soria","Tarragona","Santa Cruz de Tenerife","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza",
                    ].map((prov) => (
                      <SelectItem key={prov} value={prov}>
                        {prov}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Ciudad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Calle Ejemplo 123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código postal</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="28080" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lengua</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona lengua" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      { code: "es", label: "Castellano" },
                      { code: "ca", label: "Català" },
                      { code: "eu", label: "Euskera" },
                      { code: "gl", label: "Galego" },
                      { code: "va", label: "Valencià" },
                    ].map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-x-2 mt-2">
          <ButtonLoading
            isLoading={isSubmitting}
            className="w-fit"
            disabled={isDisabled}
          >
            Guardar
          </ButtonLoading>
          <Button
            type="reset"
            variant="secondary"
            className="w-fit"
            disabled={isDisabled}
            onClick={handleResetForm}
          >
            Restablecer
          </Button>
        </div>
      </form>
    </Form>
  )
}
