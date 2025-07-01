"use client"

import React, { useState, useEffect } from "react"
import {
  Plus,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  GripVertical,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useShowToast } from "@/lib/toast"

import {
  profileFormSchema,
  type ProfileFormData,
  type UserProfile,
  spanishProvinces,
  entityTypes,
  activitySectors,
  interestAreas,
  companySizes,
  budgetRanges,
} from "@/schemas/profiles-form-schema"
import { accountSettingsProfilesDictionary } from "@/dictionaries/account-settings-profiles"
import { ProfileWizard } from "./profile-wizard"

interface UserProfilesProps {
  lang: "es" | "en" | "ar"
}

// MultiSelect inner component
const MultiSelect: React.FC<{
  value: string[]
  onValueChange: (v: string[]) => void
  options: { value: string; label: string }[]
  placeholder: string
}> = ({ value, onValueChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOption = (opt: string) => {
    const newVal = value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]
    onValueChange(newVal)
  }

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean)

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        className="w-full justify-between h-10 px-3"
        onClick={() => setIsOpen((p) => !p)}
      >
        <span className={selectedLabels.length === 0 ? "text-muted-foreground" : ""}>
          {selectedLabels.length === 0
            ? placeholder
            : selectedLabels.length > 2
            ? `${selectedLabels.length} seleccionadas`
            : selectedLabels.join(", ")}
        </span>
      </Button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md max-h-60 overflow-auto">
          {options.map((o) => (
            <div
              key={o.value}
              className="flex items-center space-x-2 px-3 py-2 hover:bg-muted cursor-pointer"
              onClick={() => toggleOption(o.value)}
            >
              <input
                type="checkbox"
                checked={value.includes(o.value)}
                readOnly
                className="h-4 w-4"
              />
              <label className="text-sm cursor-pointer">{o.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function UserProfiles({ lang }: UserProfilesProps) {
  const dict = accountSettingsProfilesDictionary[lang]
  const showToast = useShowToast()

  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProfile, setEditingProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [draggedProfile, setDraggedProfile] = useState<UserProfile | null>(null)
  const [loadingProfiles, setLoadingProfiles] = useState(true)
  const [profileData, setProfileData] = useState<any>(null)
  const [loadingProfileData, setLoadingProfileData] = useState(false)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      avatar: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      provinces: [],
      municipality: "",
      entityType: "empresa_privada",
      activitySectors: [],
      companySize: "pequena",
      interestAreas: [],
      budgetRange: "hasta_10k",
      role: "viewer",
      status: "active",
    },
  })

  // Cargar perfiles al montar el componente
  useEffect(() => {
    void loadProfiles()
  }, [])

  const loadProfiles = async () => {
    setLoadingProfiles(true)
    try {
      const response = await fetch("/api/perfiles")
      const result = await response.json() as { success: boolean; data?: Array<{
        id: number
        nombre_perfil?: string
        nombre_empresa?: string
        email?: string
        telefono?: string
      }> }
      
      if (result.success && result.data) {
        // Convertir los perfiles de la BD al formato esperado por el componente
        const convertedProfiles: UserProfile[] = result.data.map((perfil) => ({
          id: perfil.id.toString(),
          name: perfil.nombre_perfil ?? perfil.nombre_empresa ?? "Sin nombre",
          username: perfil.nombre_empresa ?? perfil.nombre_perfil ?? "Sin usuario",
          email: perfil.email ?? "",
          phone: perfil.telefono ?? "",
          avatar: "",
          provinces: [], // TODO: Mapear desde ubicacion
          municipality: "",
          entityType: "empresa_privada" as const,
          activitySectors: [],
          companySize: "pequena" as const,
          interestAreas: [],
          budgetRange: "hasta_10k" as const,
          role: "viewer" as const,
          status: "active" as const,
        }))
        setProfiles(convertedProfiles)
      }
    } catch (error) {
      console.error("Error cargando perfiles:", error)
      showToast.error("No se pudieron cargar los perfiles")
    } finally {
      setLoadingProfiles(false)
    }
  }

  const resetForm = () =>
    form.reset({
      avatar: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      provinces: [],
      municipality: "",
      entityType: "empresa_privada",
      activitySectors: [],
      companySize: "pequena",
      interestAreas: [],
      budgetRange: "hasta_10k",
      role: "viewer",
      status: "active",
    })

  const openCreateModal = () => {
    setEditingProfile(null)
    resetForm()
    setIsModalOpen(true)
  }

  const loadProfileData = async (profileId: string) => {
    setLoadingProfileData(true)
    try {
      const response = await fetch(`/api/perfiles/${profileId}`)
      const result = await response.json()
      
      if (result.success && result.data) {
        return result.data
      }
    } catch (error) {
      console.error("Error cargando datos del perfil:", error)
      showToast.error("No se pudieron cargar los datos del perfil")
    } finally {
      setLoadingProfileData(false)
    }
    return null
  }

  const openEditModal = async (p: UserProfile) => {
    console.log("Abriendo modal para perfil:", p)
    setEditingProfile(p)
    
    // Cargar datos completos del perfil primero
    const fullProfileData = await loadProfileData(p.id)
    console.log("Datos del perfil cargados:", fullProfileData)
    if (fullProfileData) {
      setProfileData(fullProfileData)
      // Abrir el modal solo después de cargar los datos
      setIsModalOpen(true)
    } else {
      showToast.error("Error al cargar los datos del perfil")
    }
  }

  const handleSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      if (editingProfile) {
        setProfiles((prev) => prev.map((p) => (p.id === editingProfile.id ? { ...data, id: editingProfile.id } : p)))
        showToast.success("Perfil actualizado correctamente")
      } else {
        setProfiles((prev) => [...prev, { ...data, id: String(Date.now()) }])
        showToast.success("Perfil creado correctamente")
      }
      setIsModalOpen(false)
    } catch (error) {
      showToast.error("Error al guardar el perfil")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id))
    showToast.success("Perfil eliminado correctamente")
  }

  const handleDragStart = (e: React.DragEvent, p: UserProfile) => {
    setDraggedProfile(p)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, target: UserProfile) => {
    e.preventDefault()
    if (!draggedProfile || draggedProfile.id === target.id) return

    setProfiles((prev) => {
      const dragIndex = prev.findIndex((p) => p.id === draggedProfile.id)
      const dropIndex = prev.findIndex((p) => p.id === target.id)
      const newProfiles = [...prev]
      const [draggedItem] = newProfiles.splice(dragIndex, 1)
      newProfiles.splice(dropIndex, 0, draggedItem!)
      return newProfiles
    })
    setDraggedProfile(null)
  }

  const handleDragEnd = () => setDraggedProfile(null)

  const getStatusBadge = (s: "active" | "inactive") => (
    <Badge variant={s === "active" ? "default" : "secondary"}>{dict.status[s]}</Badge>
  )

  const getRoleBadge = (r: "admin" | "editor" | "viewer") => {
    const colors = { admin: "destructive", editor: "default", viewer: "secondary" } as const
    return <Badge variant={colors[r]}>{dict.roles[r]}</Badge>
  }

  const getEntityTypeBadge = (e: UserProfile["entityType"]) => <Badge variant="outline">{dict.entityTypes[e as keyof typeof dict.entityTypes]}</Badge>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{dict.title}</h1>
          <p className="text-muted-foreground">{dict.breadcrumb}</p>
        </div>
        <Button onClick={openCreateModal} className="gap-2">
          <Plus className="h-4 w-4" />
          {dict.addProfile}
        </Button>
      </div>

      {/* Content */}
      {loadingProfiles ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Cargando perfiles...</div>
        </div>
      ) : profiles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">{dict.noProfiles}</h3>
            <Button onClick={openCreateModal} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              {dict.createProfile}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((p) => (
            <Card
              key={p.id}
              className="transition-shadow hover:shadow-md cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, p)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, p)}
              onDragEnd={handleDragEnd}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={p.avatar} alt={p.name} />
                    <AvatarFallback>{p.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{p.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">@{p.username}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(p)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteProfile(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs">{p.email || "Sin email"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs">{p.phone || "Sin teléfono"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs">{getEntityTypeBadge(p.entityType)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs">
                    {p.provinces.length > 0 ? p.provinces.slice(0, 2).join(", ") + (p.provinces.length > 2 ? "..." : "") : "Sin provincias"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  {getStatusBadge(p.status)}
                  {getRoleBadge(p.role)}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">{dict.form.activitySectors}: </span>
                  <span>
                    {p.activitySectors
                      .map((s) => activitySectors.find((as) => as.value === s)?.label)
                      .filter(Boolean)
                      .slice(0, 2)
                      .join(", ")}
                    {p.activitySectors.length > 2 && ` +${p.activitySectors.length - 2}`}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProfile ? dict.editProfile : dict.createProfile}</DialogTitle>
          </DialogHeader>

          <ProfileWizard
            dictionary={dict}
            initialData={(() => {
              if (!profileData) return undefined
              const mappedData = {
                nombre_perfil: profileData.nombre_perfil || "",
                nombre_empresa: profileData.nombre_empresa || "",
                nif_cif: profileData.nif_cif || "",
                email: profileData.email || "",
                telefono: profileData.telefono || "",
                direccion: profileData.direccion || "",
                tamanoEmpresaId: profileData.tamanoEmpresaId,
                sectorId: profileData.sectorId,
                ubicacionId: profileData.ubicacionId,
                cofinanciacion_disp: profileData.cofinanciacion_disp || false,
                disponible_socios: profileData.disponible_socios || false,
                necesidades: profileData.necesidades?.map((n: any) => n.necesidadId) || [],
                ambitos: profileData.ambitosInteres?.map((a: any) => a.ambitoId) || [],
                plazos: profileData.plazosCarga?.map((p: any) => ({
                  plazoId: p.plazoId,
                  cumple: p.cumple
                })) || [],
              }
              console.log("Datos mapeados para ProfileWizard:", mappedData)
              return mappedData
            })()}
            isEditing={!!editingProfile}
            profileId={editingProfile?.id}
            onSuccess={() => {
              setIsModalOpen(false)
              setProfileData(null)
              // Recargar la lista de perfiles
              void loadProfiles()
            }}
            onCancel={() => {
              setIsModalOpen(false)
              setProfileData(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
} 