"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

// Importar los componentes de pasos
import { BasicInfoStep } from "./steps/basic-info-step"
import { LocationSectorStep } from "./steps/location-sector-step"
import { NeedsInterestsStep } from "./steps/needs-interests-step"
import { CapacitiesStep } from "./steps/capacities-step"

// Importar el tipo FormData del subsidy-profile-form
import type { FormData } from "./subsidy-profile-form"

interface ProfileWizardProps {
  dictionary?: Record<string, unknown>
  onSuccess?: () => void
  onCancel?: () => void
  initialData?: Partial<FormData>
  isEditing?: boolean
  profileId?: string
}

type StepType = 1 | 2 | 3 | 4

const initialFormData: FormData = {
  // Paso 1: Información básica
  nombre_perfil: "",
  nombre_empresa: "",
  nif_cif: "",
  email: "",
  telefono: "",
  direccion: "",
  cofinanciacion_disp: false,
  disponible_socios: false,
  
  // Paso 2: Ubicación y sector
  tamanoEmpresaId: undefined,
  sectorId: undefined,
  ubicacionId: undefined,
  
  // Paso 3: Necesidades e intereses
  necesidades: [],
  ambitos: [],
  
  // Paso 4: Capacidades
  plazos: [],
}

export function ProfileWizard({ dictionary, onSuccess, onCancel, initialData, isEditing = false, profileId }: ProfileWizardProps) {
  const [step, setStep] = useState<StepType>(1)
  const [formData, setFormData] = useState<FormData>(() => ({
    ...initialFormData,
    ...initialData
  }))
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Actualizar formData cuando cambie initialData
  useEffect(() => {
    console.log("ProfileWizard - initialData recibido:", initialData)
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }))
    }
  }, [initialData])

  function updateFormData(updates: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  function next() {
    setStep((prev) => (prev < 4 ? ((prev + 1) as StepType) : prev))
  }

  function prev() {
    setStep((prev) => (prev > 1 ? ((prev - 1) as StepType) : prev))
  }

  // Validaciones por paso
  function isStepValid(stepNumber: StepType): boolean {
    switch (stepNumber) {
      case 1:
        return !!(formData.nombre_perfil && formData.nif_cif)
      case 2:
        return !!(formData.tamanoEmpresaId && formData.sectorId && formData.ubicacionId)
      case 3:
        return formData.necesidades.length > 0 && formData.ambitos.length > 0
      case 4:
        return true // Este paso es opcional
      default:
        return false
    }
  }

  function canGoNext(): boolean {
    return isStepValid(step)
  }

  async function handleSubmit() {
    if (!isStepValid(1) || !isStepValid(2) || !isStepValid(3)) {
      toast("Por favor completa todos los campos obligatorios")
      return
    }

    setIsSubmitting(true)
    try {
      const url = isEditing ? `/api/perfiles/${profileId}` : "/api/perfiles/create"
      const method = isEditing ? "PUT" : "POST"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      const result = await res.json()
      
      if (res.ok) {
        toast(isEditing ? "Perfil actualizado con éxito" : "Perfil creado con éxito")
        onSuccess?.()
      } else {
        toast(result.error ?? `Error al ${isEditing ? "actualizar" : "crear"} el perfil`)
      }
    } catch (error) {
      console.error(error)
      toast("Error al conectar con el servidor")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Configuración de pasos
  const steps = [
    {
      title: "Información Básica",
      subtitle: "Paso 1 de 4",
      component: <BasicInfoStep formData={formData} updateFormData={updateFormData} />
    },
    {
      title: "Ubicación y Sector",
      subtitle: "Paso 2 de 4",
      component: <LocationSectorStep formData={formData} updateFormData={updateFormData} />
    },
    {
      title: "Necesidades e Intereses",
      subtitle: "Paso 3 de 4",
      component: <NeedsInterestsStep formData={formData} updateFormData={updateFormData} />
    },
    {
      title: "Capacidades Administrativas",
      subtitle: "Paso 4 de 4",
      component: <CapacitiesStep formData={formData} updateFormData={updateFormData} />
    }
  ]

  const currentStep = steps[step - 1]!

  return (
    <div className="space-y-6">
      {/* Header del paso */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{currentStep.title}</h2>
          <span className="text-sm text-muted-foreground">{currentStep.subtitle}</span>
        </div>
        
        {/* Indicador de progreso */}
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full ${
                index < step
                  ? "bg-green-500"
                  : index === step - 1
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Contenido del paso actual */}
      <div className="min-h-[400px]">
        {currentStep.component}
      </div>

      {/* Navegación */}
      <div className="flex justify-between pt-4 border-t">
        <Button 
          variant="secondary" 
          onClick={step === 1 ? onCancel : prev}
          disabled={isSubmitting}
        >
          {step === 1 ? "Cancelar" : "Anterior"}
        </Button>
        
        {step < 4 ? (
          <Button 
            onClick={next}
            disabled={!canGoNext() || isSubmitting}
          >
            Siguiente
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creando perfil..." : "Finalizar"}
          </Button>
        )}
      </div>

      {/* Mensaje de validación */}
      {step < 4 && !canGoNext() && (
        <div className="text-sm text-muted-foreground mt-2">
          {step === 1 && "Por favor completa el nombre del perfil y NIF/CIF"}
          {step === 2 && "Por favor selecciona tamaño, sector y ubicación"}
          {step === 3 && "Por favor selecciona al menos una necesidad y un ámbito"}
        </div>
      )}
    </div>
  )
} 