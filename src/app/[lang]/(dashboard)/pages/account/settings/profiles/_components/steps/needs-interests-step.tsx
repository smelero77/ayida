import React from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FormData } from "../subsidy-profile-form"

interface NeedsInterestsStepProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

// Mock data
const mockNeeds = [
  { id: 1, nombre_i18n: { es: "Financiar innovación y desarrollo" } },
  { id: 2, nombre_i18n: { es: "Expansión internacional" } },
  { id: 3, nombre_i18n: { es: "Mejora de la competitividad" } },
  { id: 4, nombre_i18n: { es: "Digitalización" } },
  { id: 5, nombre_i18n: { es: "Sostenibilidad y medio ambiente" } },
]

const mockInterests = [
  { id: 1, nombre_i18n: { es: "Provincial" } },
  { id: 2, nombre_i18n: { es: "Autonómico" } },
  { id: 3, nombre_i18n: { es: "Nacional" } },
  { id: 4, nombre_i18n: { es: "Europeo" } },
]

function getDisplayValue(obj: any): string {
  return obj?.es ?? obj?.en ?? Object.values(obj ?? {})[0] ?? "—"
}

export function NeedsInterestsStep({ formData, updateFormData }: NeedsInterestsStepProps) {
  const toggleNeed = (id: number, checked: boolean) => {
    const newNeeds = checked 
      ? [...formData.necesidades, id]
      : formData.necesidades.filter((n) => n !== id)
    updateFormData({ necesidades: newNeeds })
  }

  const toggleInterest = (id: number, checked: boolean) => {
    const newInterests = checked 
      ? [...formData.ambitos, id]
      : formData.ambitos.filter((a) => a !== id)
    updateFormData({ ambitos: newInterests })
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Selecciona tus necesidades de financiación y los ámbitos geográficos de tu interés.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Necesidades de Financiación <span className="text-destructive">*</span></CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockNeeds.map((need) => (
              <div key={need.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`need-${need.id}`}
                  checked={formData.necesidades.includes(need.id)}
                  onCheckedChange={(checked) => toggleNeed(need.id, !!checked)}
                />
                <Label 
                  htmlFor={`need-${need.id}`} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {getDisplayValue(need.nombre_i18n)}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ámbitos de Interés <span className="text-destructive">*</span></CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockInterests.map((interest) => (
              <div key={interest.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`interest-${interest.id}`}
                  checked={formData.ambitos.includes(interest.id)}
                  onCheckedChange={(checked) => toggleInterest(interest.id, !!checked)}
                />
                <Label 
                  htmlFor={`interest-${interest.id}`} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {getDisplayValue(interest.nombre_i18n)}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 