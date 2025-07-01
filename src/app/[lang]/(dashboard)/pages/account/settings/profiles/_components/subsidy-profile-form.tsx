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

// Tipos para los datos de la base de datos
interface NecesidadCliente {
  id: number;
  nombre_i18n: Record<string, string>;
}

interface AmbitoInteres {
  id: number;
  nombre_i18n: Record<string, string>;
}

interface PlazoCarga {
  id: number;
  nombre_i18n: Record<string, string>;
}

interface TamanoEmpresa {
  id: number;
  nombre_i18n: Record<string, string>;
}

interface SectorEmpresa {
  id: number;
  nombre_i18n: Record<string, string>;
}

interface Ubicacion {
  id: number;
  provincia_i18n: Record<string, string>;
  comAutonoma_i18n: Record<string, string>;
}

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
  plazos: { plazoId: number; cumple: boolean }[]
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

// Datos mock para los selectors
const mockCompanySizes: TamanoEmpresa[] = [
  { id: 1, nombre_i18n: { es: "Autónomo", en: "Self-employed" } },
  { id: 2, nombre_i18n: { es: "Microempresa (1-10 empleados)", en: "Microenterprise (1-10 employees)" } },
  { id: 3, nombre_i18n: { es: "Pequeña empresa (11-50 empleados)", en: "Small enterprise (11-50 employees)" } },
  { id: 4, nombre_i18n: { es: "Mediana empresa (51-250 empleados)", en: "Medium enterprise (51-250 employees)" } },
  { id: 5, nombre_i18n: { es: "Gran empresa (+250 empleados)", en: "Large enterprise (+250 employees)" } },
]

const mockSectors: SectorEmpresa[] = [
  { id: 1, nombre_i18n: { es: "Tecnología", en: "Technology" } },
  { id: 2, nombre_i18n: { es: "Comercio", en: "Commerce" } },
  { id: 3, nombre_i18n: { es: "Servicios", en: "Services" } },
  { id: 4, nombre_i18n: { es: "Manufactura", en: "Manufacturing" } },
  { id: 5, nombre_i18n: { es: "Agricultura", en: "Agriculture" } },
]

const mockLocations: Ubicacion[] = [
  { id: 1, provincia_i18n: { es: "Madrid", en: "Madrid" }, comAutonoma_i18n: { es: "Comunidad de Madrid", en: "Community of Madrid" } },
  { id: 2, provincia_i18n: { es: "Barcelona", en: "Barcelona" }, comAutonoma_i18n: { es: "Cataluña", en: "Catalonia" } },
  { id: 3, provincia_i18n: { es: "Valencia", en: "Valencia" }, comAutonoma_i18n: { es: "Comunidad Valenciana", en: "Valencian Community" } },
]

const mockNeeds: NecesidadCliente[] = [
  { id: 1, nombre_i18n: { es: "Financiar innovación y desarrollo", en: "Fund innovation and development" } },
  { id: 2, nombre_i18n: { es: "Expansión internacional", en: "International expansion" } },
  { id: 3, nombre_i18n: { es: "Mejora de la competitividad", en: "Competitiveness improvement" } },
  { id: 4, nombre_i18n: { es: "Digitalización", en: "Digitalization" } },
]

const mockInterests: AmbitoInteres[] = [
  { id: 1, nombre_i18n: { es: "Provincial", en: "Provincial" } },
  { id: 2, nombre_i18n: { es: "Autonómico", en: "Regional" } },
  { id: 3, nombre_i18n: { es: "Nacional", en: "National" } },
  { id: 4, nombre_i18n: { es: "Europeo", en: "European" } },
]

const mockTimeframes: PlazoCarga[] = [
  { id: 1, nombre_i18n: { es: "Hasta 1 mes para gestión", en: "Up to 1 month for management" } },
  { id: 2, nombre_i18n: { es: "Hasta 3 meses para gestión", en: "Up to 3 months for management" } },
  { id: 3, nombre_i18n: { es: "Más de 3 meses para gestión", en: "More than 3 months for management" } },
]

function getDisplayValue(i18nObj: Record<string, string>, lang = "es"): string {
  return i18nObj[lang] || i18nObj.es || Object.values(i18nObj)[0] || ""
}

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
      content: <div>Paso básico placeholder</div>,
    },
    { title: "Ubicación y Sector", content: <div>Paso ubicación placeholder</div> },
    { title: "Necesidades e Intereses", content: <div>Paso necesidades placeholder</div> },
    { title: "Capacidades", content: <div>Paso capacidades placeholder</div> },
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