"use client"

import { Button } from "@/components/ui/button"
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

  const handleCustomToast = () => {
    showToast.custom({
      title: "Toast Personalizado",
      description: "Este es un toast personalizado con Sonner",
      type: "success",
      duration: 8000,
    })
  }

  const handleToastWithAction = () => {
    showToast.custom({
      title: "Acción requerida",
      description: "¿Quieres continuar con esta acción?",
      type: "warning",
      action: {
        label: "Continuar",
        onClick: () => showToast.success("¡Acción completada!")
      }
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ejemplos de Toast con Sonner</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button 
          variant="primary"
          color="green"
          onClick={handleSuccessToast}
        >
          Toast de Éxito
        </Button>
        
        <Button 
          variant="primary"
          color="pink"
          onClick={handleErrorToast}
        >
          Toast de Error
        </Button>
        
        <Button 
          variant="primary"
          color="blue"
          onClick={handleInfoToast}
        >
          Toast de Info
        </Button>
        
        <Button 
          variant="outline"
          color="green"
          onClick={handleWarningToast}
        >
          Toast de Advertencia
        </Button>
        
        <Button 
          variant="secondary"
          color="blue"
          onClick={handleLoadingToast}
        >
          Toast de Carga
        </Button>
        
        <Button 
          variant="outline"
          color="pink"
          onClick={handleMultipleToasts}
        >
          Múltiples Toasts
        </Button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Toasts Avanzados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline"
            color="blue"
            onClick={handleCustomToast}
          >
            Toast Personalizado
          </Button>
          
          <Button 
            variant="outline"
            color="pink"
            onClick={handleToastWithAction}
          >
            Toast con Acción
          </Button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Características de Sonner:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Los toasts aparecen en la esquina superior derecha</li>
          <li>• Máximo 3 toasts visibles simultáneamente</li>
          <li>• Colores ricos y animaciones suaves</li>
          <li>• Soporte para acciones personalizadas</li>
          <li>• Botón de cerrar incluido</li>
          <li>• Duración configurable por toast</li>
          <li>• Compatible con T3 Stack</li>
        </ul>
      </div>
    </div>
  )
} 