"use client"

import React, { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// ---------------------- Tipos y datos ---------------------------
export interface FormData {
  // Paso 1
  nombre_perfil: string
  nombre_empresa: string
  nif_cif: string
  email: string
  telefono: string
  direccion: string
  // Paso 2
  tamanoEmpresaId?: number
  sectorId?: number
  ubicacionId?: number
  cofinanciacion_disp: boolean
  disponible_socios: boolean
  // Paso 3
  necesidades: number[]
  ambitos: number[]
  // Paso 4
  plazos: number[]
}

const initialData: FormData = {
  nombre_perfil: "",
  nombre_empresa: "",
  nif_cif: "",
  email: "",
  telefono: "",
  direccion: "",
  tamanoEmpresaId: undefined,
  sectorId: undefined,
  ubicacionId: undefined,
  cofinanciacion_disp: false,
  disponible_socios: false,
  necesidades: [],
  ambitos: [],
  plazos: [],
}

// Mock data for selects
const mockCompanySizes = [
  { id: 1, nombre_i18n: { es: "Microempresa" } },
  { id: 2, nombre_i18n: { es: "Pequeña empresa" } },
  { id: 3, nombre_i18n: { es: "Mediana empresa" } },
  { id: 4, nombre_i18n: { es: "Gran empresa" } },
]
const mockSectors = [
  { id: 1, nombre_i18n: { es: "Tecnología" } },
  { id: 2, nombre_i18n: { es: "Energía" } },
]
const mockLocations = [
  { id: 1, provincia_i18n: { es: "Madrid" }, comAutonoma_i18n: { es: "Comunidad de Madrid" } },
  { id: 2, provincia_i18n: { es: "Barcelona" }, comAutonoma_i18n: { es: "Cataluña" } },
]
const mockNecesidades = [
  { id: 1, nombre_i18n: { es: "Financiación I+D+i" } },
  { id: 2, nombre_i18n: { es: "Digitalización" } },
]
const mockAmbitos = [
  { id: 1, nombre_i18n: { es: "Innovación" } },
  { id: 2, nombre_i18n: { es: "Energía" } },
]
const mockPlazos = [
  { id: 1, nombre_i18n: { es: "Memorias técnicas" } },
  { id: 2, nombre_i18n: { es: "Justificación económica" } },
]

function getDisplayValue(obj: any) {
  return obj?.es ?? obj?.en ?? Object.values(obj ?? {})[0] ?? "—"
}

// ---------------------- Paso 1 ---------------------------
function BasicInfoStep({ formData, update }: { formData: FormData; update: (u: Partial<FormData>) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nombre_perfil">
            Nombre del Perfil <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nombre_perfil"
            value={formData.nombre_perfil}
            onChange={(e) => update({ nombre_perfil: e.target.value })}
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nombre_empresa">Nombre Legal</Label>
          <Input id="nombre_empresa" value={formData.nombre_empresa} onChange={(e) => update({ nombre_empresa: e.target.value })} className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nif_cif">
            NIF/CIF <span className="text-destructive">*</span>
          </Label>
          <Input id="nif_cif" value={formData.nif_cif} onChange={(e) => update({ nif_cif: e.target.value.toUpperCase() })} className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo</Label>
          <Input id="email" type="email" value={formData.email} onChange={(e) => update({ email: e.target.value })} className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input id="telefono" value={formData.telefono} onChange={(e) => update({ telefono: e.target.value })} className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input id="direccion" value={formData.direccion} onChange={(e) => update({ direccion: e.target.value })} className="h-10" />
        </div>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h4 className="font-medium">Capacidades de Colaboración</h4>
          <div className="flex items-center justify-between">
            <Label htmlFor="cofin">Capacidad de Cofinanciación</Label>
            <Switch id="cofin" checked={formData.cofinanciacion_disp} onCheckedChange={(v) => update({ cofinanciacion_disp: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="socios">Disponible para socios UE</Label>
            <Switch id="socios" checked={formData.disponible_socios} onCheckedChange={(v) => update({ disponible_socios: v })} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ---------------------- Paso 2 ---------------------------
function LocationSectorStep({ formData, update }: { formData: FormData; update: (u: Partial<FormData>) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label>Tamaño Empresa *</Label>
        <Select value={formData.tamanoEmpresaId?.toString() ?? ""} onValueChange={(v) => update({ tamanoEmpresaId: Number(v) })}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Seleccionar tamaño..." />
          </SelectTrigger>
          <SelectContent>
            {mockCompanySizes.map((t) => (
              <SelectItem key={t.id} value={t.id.toString()}>{getDisplayValue(t.nombre_i18n)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Sector *</Label>
        <Select value={formData.sectorId?.toString() ?? ""} onValueChange={(v) => update({ sectorId: Number(v) })}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Seleccionar sector..." />
          </SelectTrigger>
          <SelectContent>
            {mockSectors.map((s) => (
              <SelectItem key={s.id} value={s.id.toString()}>{getDisplayValue(s.nombre_i18n)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Ubicación *</Label>
        <Select value={formData.ubicacionId?.toString() ?? ""} onValueChange={(v) => update({ ubicacionId: Number(v) })}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Seleccionar ubicación..." />
          </SelectTrigger>
          <SelectContent>
            {mockLocations.map((l) => (
              <SelectItem key={l.id} value={l.id.toString()}>
                {getDisplayValue(l.provincia_i18n)}, {getDisplayValue(l.comAutonoma_i18n)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// ---------------------- Paso 3 ---------------------------
function NeedsInterestsStep({ formData, update }: { formData: FormData; update: (u: Partial<FormData>) => void }) {
  const toggleNecesidad = (id: number, checked: boolean) => {
    update({ necesidades: checked ? [...formData.necesidades, id] : formData.necesidades.filter((n) => n !== id) })
  }
  const toggleAmbito = (id: number, checked: boolean) => {
    update({ ambitos: checked ? [...formData.ambitos, id] : formData.ambitos.filter((a) => a !== id) })
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Necesidades *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-72 overflow-y-auto">
          {mockNecesidades.map((n) => (
            <div key={n.id} className="flex items-center space-x-2">
              <Checkbox id={`nec-${n.id}`} checked={formData.necesidades.includes(n.id)} onCheckedChange={(c) => toggleNecesidad(n.id, c as boolean)} />
              <Label htmlFor={`nec-${n.id}`}>{getDisplayValue(n.nombre_i18n)}</Label>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ámbitos *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-72 overflow-y-auto">
          {mockAmbitos.map((a) => (
            <div key={a.id} className="flex items-center space-x-2">
              <Checkbox id={`amb-${a.id}`} checked={formData.ambitos.includes(a.id)} onCheckedChange={(c) => toggleAmbito(a.id, c as boolean)} />
              <Label htmlFor={`amb-${a.id}`}>{getDisplayValue(a.nombre_i18n)}</Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// ---------------------- Paso 4 ---------------------------
function CapacitiesStep({ formData, update }: { formData: FormData; update: (u: Partial<FormData>) => void }) {
  const togglePlazo = (id: number, checked: boolean) => {
    update({ plazos: checked ? [...formData.plazos, id] : formData.plazos.filter((p) => p !== id) })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Capacidades Administrativas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {mockPlazos.map((p) => (
          <div key={p.id} className="flex items-center space-x-2">
            <Checkbox id={`pl-${p.id}`} checked={formData.plazos.includes(p.id)} onCheckedChange={(c) => togglePlazo(p.id, c as boolean)} />
            <Label htmlFor={`pl-${p.id}`}>{getDisplayValue(p.nombre_i18n)}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// ----------------------------------------------------------------
interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SubsidyProfileForm({ open, onOpenChange }: Props) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialData)
  const [saving, setSaving] = useState(false)

  const update = (updates: Partial<FormData>) => setFormData((prev) => ({ ...prev, ...updates }))

  const steps = [
    {
      title: "Información básica",
      content: <BasicInfoStep formData={formData} update={update} />,
    },
    { title: "Ubicación y Sector", content: <LocationSectorStep formData={formData} update={update} /> },
    { title: "Necesidades e Intereses", content: <NeedsInterestsStep formData={formData} update={update} /> },
    { title: "Capacidades", content: <CapacitiesStep formData={formData} update={update} /> },
  ]

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/perfiles/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
      const json = await res.json()
      if (json.success) {
        toast("Perfil creado correctamente")
        onOpenChange(false)
      } else {
        toast(json.error || "Error")
      }
    } catch (e) {
      toast("Error inesperado")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{steps[step].title}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">{steps[step].content}</div>
        <div className="flex justify-between pt-4">
          <Button variant="secondary" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0 || saving}>
            Anterior
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} disabled={saving}>
              Siguiente
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? "Guardando..." : "Finalizar"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 