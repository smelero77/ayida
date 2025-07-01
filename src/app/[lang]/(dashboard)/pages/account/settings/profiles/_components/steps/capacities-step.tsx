import React from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FormData } from "../subsidy-profile-form"

interface CapacitiesStepProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

// Mock data
const mockTimeframes = [
  { id: 1, nombre_i18n: { es: "Preparación de memorias técnicas" } },
  { id: 2, nombre_i18n: { es: "Gestión económico-administrativa" } },
  { id: 3, nombre_i18n: { es: "Justificación económica" } },
  { id: 4, nombre_i18n: { es: "Seguimiento de proyectos" } },
]

function getDisplayValue(obj: any): string {
  return obj?.es ?? obj?.en ?? Object.values(obj ?? {})[0] ?? "—"
}

export function CapacitiesStep({ formData, updateFormData }: CapacitiesStepProps) {
  const toggleTimeframe = (id: number, checked: boolean) => {
    const newTimeframes = checked 
      ? [...formData.plazos, { plazoId: id, cumple: true }]
      : formData.plazos.filter((p) => p.plazoId !== id)
    updateFormData({ plazos: newTimeframes })
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Este paso es opcional. Indica qué capacidades administrativas tienes disponibles para la gestión de subvenciones.
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Capacidades Administrativas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Selecciona las áreas en las que tu empresa tiene experiencia o capacidades internas:
          </p>
          {mockTimeframes.map((timeframe) => (
            <div key={timeframe.id} className="flex items-center space-x-2">
              <Checkbox
                id={`timeframe-${timeframe.id}`}
                                 checked={formData.plazos.some(p => p.plazoId === timeframe.id)}
                onCheckedChange={(checked) => toggleTimeframe(timeframe.id, !!checked)}
              />
              <Label 
                htmlFor={`timeframe-${timeframe.id}`} 
                className="text-sm font-normal cursor-pointer"
              >
                {getDisplayValue(timeframe.nombre_i18n)}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground">
        <strong>Nota:</strong> Esta información nos ayuda a recomendarte subvenciones que se ajusten a tus capacidades administrativas actuales.
      </div>
    </div>
  )
} 