"use client"

import { Button } from "@heroui/react"
import { useShowToast } from "@/lib/toast"

export function ToastExamples() {
  const showToast = useShowToast()

  const handleSuccessToast = () => {
    showToast.success("¡Éxito!", "La operación se completó correctamente")
  }

  const handleErrorToast = () => {
    showToast.error("Error", "Algo salió mal. Inténtalo de nuevo.")
  }

  const handleInfoToast = () => {
    showToast.info("Información", "Aquí tienes información importante")
  }

  const handleWarningToast = () => {
    showToast.warning("Advertencia", "Ten cuidado con esta acción")
  }

  const handleLoadingToast = () => {
    showToast.loading("Cargando...", "Procesando datos")
    setTimeout(() => {
      showToast.success("Completado", "Los datos se procesaron correctamente")
    }, 3000)
  }

  const handleCustomFlatToast = () => {
    showToast.custom({
      title: "Toast Personalizado",
      description: "Este es un toast con variante flat",
      color: "primary",
      variant: "flat",
      radius: "md",
      shadow: "md",
    })
  }

  const handleCustomBorderedToast = () => {
    showToast.custom({
      title: "Toast con Borde",
      description: "Este es un toast con variante bordered",
      color: "success",
      variant: "bordered",
      radius: "lg",
      shadow: "lg",
    })
  }

  const handleCustomSolidToast = () => {
    showToast.custom({
      title: "Toast Sólido",
      description: "Este es un toast con variante solid",
      color: "danger",
      variant: "solid",
      radius: "md",
      shadow: "md",
    })
  }

  const handleMultipleToasts = () => {
    showToast.success("Primer toast", "Este es el primer mensaje")
    setTimeout(() => {
      showToast.info("Segundo toast", "Este es el segundo mensaje")
    }, 500)
    setTimeout(() => {
      showToast.warning("Tercer toast", "Este es el tercer mensaje")
    }, 1000)
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ejemplos de Toast</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button 
          color="success" 
          variant="flat" 
          onPress={handleSuccessToast}
        >
          Toast de Éxito
        </Button>
        
        <Button 
          color="danger" 
          variant="flat" 
          onPress={handleErrorToast}
        >
          Toast de Error
        </Button>
        
        <Button 
          color="primary" 
          variant="flat" 
          onPress={handleInfoToast}
        >
          Toast de Info
        </Button>
        
        <Button 
          color="warning" 
          variant="flat" 
          onPress={handleWarningToast}
        >
          Toast de Advertencia
        </Button>
        
        <Button 
          color="default" 
          variant="flat" 
          onPress={handleLoadingToast}
        >
          Toast de Carga
        </Button>
        
        <Button 
          color="secondary" 
          variant="flat" 
          onPress={handleMultipleToasts}
        >
          Múltiples Toasts
        </Button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Variantes Personalizadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            color="primary" 
            variant="bordered" 
            onPress={handleCustomFlatToast}
          >
            Flat Toast
          </Button>
          
          <Button 
            color="success" 
            variant="bordered" 
            onPress={handleCustomBorderedToast}
          >
            Bordered Toast
          </Button>
          
          <Button 
            color="danger" 
            variant="bordered" 
            onPress={handleCustomSolidToast}
          >
            Solid Toast
          </Button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Notas:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Los toasts aparecen en la esquina superior derecha</li>
          <li>• Máximo 3 toasts visibles simultáneamente</li>
          <li>• Los toasts tienen fondos sólidos (no transparentes)</li>
          <li>• Cada variante tiene colores específicos</li>
          <li>• Los toasts se cierran automáticamente o al hacer clic</li>
        </ul>
      </div>
    </div>
  )
} 