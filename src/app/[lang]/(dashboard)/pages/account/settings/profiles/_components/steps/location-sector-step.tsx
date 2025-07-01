import React from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormData } from "../subsidy-profile-form"

interface LocationSectorStepProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

// Mock data
const mockCompanySizes = [
  { id: 1, nombre_i18n: { es: "Autónomo" } },
  { id: 2, nombre_i18n: { es: "Microempresa (1-10 empleados)" } },
  { id: 3, nombre_i18n: { es: "Pequeña empresa (11-50 empleados)" } },
  { id: 4, nombre_i18n: { es: "Mediana empresa (51-250 empleados)" } },
  { id: 5, nombre_i18n: { es: "Gran empresa (+250 empleados)" } },
]

const mockSectors = [
  { id: 1, nombre_i18n: { es: "Tecnología" } },
  { id: 2, nombre_i18n: { es: "Comercio" } },
  { id: 3, nombre_i18n: { es: "Servicios" } },
  { id: 4, nombre_i18n: { es: "Manufactura" } },
  { id: 5, nombre_i18n: { es: "Agricultura" } },
]

const mockLocations = [
  { id: 1, provincia_i18n: { es: "Madrid" }, comAutonoma_i18n: { es: "Comunidad de Madrid" } },
  { id: 2, provincia_i18n: { es: "Barcelona" }, comAutonoma_i18n: { es: "Cataluña" } },
  { id: 3, provincia_i18n: { es: "Valencia" }, comAutonoma_i18n: { es: "Comunidad Valenciana" } },
]

function getDisplayValue(obj: any): string {
  return obj?.es ?? obj?.en ?? Object.values(obj ?? {})[0] ?? "—"
}

export function LocationSectorStep({ formData, updateFormData }: LocationSectorStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Proporciona información sobre el tamaño, sector y ubicación de tu empresa para encontrar las subvenciones más adecuadas.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Tamaño de Empresa <span className="text-destructive">*</span></Label>
          <Select 
            value={formData.tamanoEmpresaId?.toString() ?? ""} 
            onValueChange={(v) => updateFormData({ tamanoEmpresaId: Number(v) })}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Seleccionar tamaño..." />
            </SelectTrigger>
            <SelectContent>
              {mockCompanySizes.map((size) => (
                <SelectItem key={size.id} value={size.id.toString()}>
                  {getDisplayValue(size.nombre_i18n)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sector de Actividad <span className="text-destructive">*</span></Label>
          <Select 
            value={formData.sectorId?.toString() ?? ""} 
            onValueChange={(v) => updateFormData({ sectorId: Number(v) })}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Seleccionar sector..." />
            </SelectTrigger>
            <SelectContent>
              {mockSectors.map((sector) => (
                <SelectItem key={sector.id} value={sector.id.toString()}>
                  {getDisplayValue(sector.nombre_i18n)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Ubicación Principal <span className="text-destructive">*</span></Label>
          <Select 
            value={formData.ubicacionId?.toString() ?? ""} 
            onValueChange={(v) => updateFormData({ ubicacionId: Number(v) })}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Seleccionar ubicación..." />
            </SelectTrigger>
            <SelectContent>
              {mockLocations.map((location) => (
                <SelectItem key={location.id} value={location.id.toString()}>
                  {getDisplayValue(location.provincia_i18n)}, {getDisplayValue(location.comAutonoma_i18n)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
} 