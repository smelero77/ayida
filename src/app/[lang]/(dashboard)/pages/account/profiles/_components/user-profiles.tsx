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

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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
  console.log("UserProfiles se está renderizando, lang:", lang);
  const dict = accountSettingsProfilesDictionary[lang]

  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProfile, setEditingProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [draggedProfile, setDraggedProfile] = useState<UserProfile | null>(null)
  const [loadingProfiles, setLoadingProfiles] = useState(true)

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
    console.log("Montando UserProfiles, llamando a loadProfiles");
    void loadProfiles()
  }, [])

  const loadProfiles = async () => {
    setLoadingProfiles(true)
    try {
      const response = await fetch("/api/perfiles")
      const result = await response.json()
      console.log("Respuesta de /api/perfiles:", result)
      
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
      toast("No se pudieron cargar los perfiles")
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
    setProfileData(null)
    resetForm()
    setIsModalOpen(true)
  }

  const [profileData, setProfileData] = useState<any>(null)
  const [loadingProfileData, setLoadingProfileData] = useState(false)

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
      toast("No se pudieron cargar los datos del perfil")
    } finally {
      setLoadingProfileData(false)
    }
    return null
  }

  const openEditModal = async (p: UserProfile) => {
    console.log("Abriendo modal para perfil:", p);
    setEditingProfile(p)
    
    // Cargar datos completos del perfil primero
    const fullProfileData = await loadProfileData(p.id)
    console.log("Datos del perfil cargados:", fullProfileData)
    if (fullProfileData) {
      setProfileData(fullProfileData)
      // Abrir el modal solo después de cargar los datos
      setIsModalOpen(true)
    } else {
      toast("Error al cargar los datos del perfil")
    }
  }

  const handleSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      await new Promise((res) => setTimeout(res, 400))
      if (editingProfile) {
        setProfiles((prev) => prev.map((p) => (p.id === editingProfile.id ? ({ ...p, ...data } as UserProfile) : p)))
        toast(dict.editProfile)
      } else {
        setProfiles((prev) => [...prev, { id: Date.now().toString(), ...data }])
        toast(dict.createProfile)
      }
      setIsModalOpen(false)
      resetForm()
    } catch (err) {
      toast("Error al guardar el perfil")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id))
    toast(dict.actions.delete)
  }

  // Drag & drop helpers
  const handleDragStart = (e: React.DragEvent, p: UserProfile) => {
    setDraggedProfile(p)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", p.id)
  }
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }
  const handleDrop = (e: React.DragEvent, target: UserProfile) => {
    e.preventDefault()
    if (!draggedProfile || draggedProfile.id === target.id) return
    setProfiles((prev) => {
      const newArr = [...prev]
      const draggedIdx = newArr.findIndex((p) => p.id === draggedProfile.id)
      const targetIdx = newArr.findIndex((p) => p.id === target.id)
      const [removed] = newArr.splice(draggedIdx, 1)
      if (removed) {
        newArr.splice(targetIdx, 0, removed)
      }
      return newArr
    })
    setDraggedProfile(null)
  }
  const handleDragEnd = () => setDraggedProfile(null)

  const getStatusBadge = (s: "active" | "inactive") => (
    <Badge variant={s === "active" ? "default" : "secondary"}>{dict.status[s]}</Badge>
  )
  const getRoleBadge = (r: "admin" | "editor" | "viewer") => {
    const variant = r === "admin" ? "destructive" : r === "editor" ? "default" : "secondary"
    return <Badge variant={variant}>{dict.roles[r]}</Badge>
  }
  const getEntityTypeBadge = (e: UserProfile["entityType"]) => <Badge variant="outline">{dict.entityTypes[e as keyof typeof dict.entityTypes]}</Badge>

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{dict.title}</h1>
          <p className="text-sm text-muted-foreground">{dict.breadcrumb}</p>
        </div>
        <Button onClick={openCreateModal} className="self-start sm:self-auto">
          <Plus className="mr-2 h-4 w-4" />
          {dict.addProfile}
        </Button>
      </div>

      {loadingProfiles ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground text-center">Cargando perfiles...</p>
          </CardContent>
        </Card>
      ) : profiles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">{dict.noProfiles}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {profiles.map((p) => {
            console.log("Renderizando perfil:", p);
            return (
              <Card
                key={p.id}
                className={`hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing relative ${
                  draggedProfile?.id === p.id ? "opacity-50 scale-95" : ""
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, p)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, p)}
                onDragEnd={handleDragEnd}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={p.avatar} alt={p.name} />
                        <AvatarFallback>{p.name.split(" ").map((n) => n[0]).join("").toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">@{p.username}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(p)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteProfile(p.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{p.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{p.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{dict.entityTypes[p.entityType as keyof typeof dict.entityTypes]}</span>
                  </div>
                  {p.municipality && (
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{p.municipality}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {getRoleBadge(p.role)}
                    {getStatusBadge(p.status)}
                    {getEntityTypeBadge(p.entityType)}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">{dict.form.provinces}: </span>
                    <span>
                      {p.provinces
                        .map((pr) => spanishProvinces.find((sp) => sp.value === pr)?.label)
                        .filter(Boolean)
                        .join(", ")}
                    </span>
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
            )
          })}
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
                plazos: profileData.plazosCarga?.map((p: any) => p.plazoId) || [],
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
              toast(editingProfile ? "Perfil actualizado correctamente" : "Perfil creado correctamente")
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