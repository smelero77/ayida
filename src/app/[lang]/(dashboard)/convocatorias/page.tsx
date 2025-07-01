import { SimpleLayout } from "@/components-shadboard/layout/simple-layout"

// Mock dictionary para Shadboard
const mockDictionary = {
  navigation: {
    dashboard: "Dashboard",
    analytics: "Analytics",
    crm: "CRM",
    ecommerce: "eCommerce",
    notifications: {
      notifications: "Notificaciones",
      dismissAll: "Descartar todo",
      seeAllNotifications: "Ver todas las notificaciones"
    },
    userNav: {
      profile: "Perfil",
      settings: "Configuración",
      signOut: "Cerrar sesión"
    },
    mode: {
      mode: "Modo",
      light: "Claro",
      dark: "Oscuro",
      system: "Sistema"
    }
  },
  label: {
    new: "Nuevo",
    soon: "Pronto"
  }
}

function ConvocatoriasContent() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Convocatorias</h1>
        <p className="text-muted-foreground">Gestiona todas las convocatorias disponibles</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Ayudas para PYMES</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Convocatoria para ayudas a pequeñas y medianas empresas
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600 font-medium">Activa</span>
            <span className="text-sm text-muted-foreground">Hasta 31/12/2024</span>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Innovación Tecnológica</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Subvenciones para proyectos de innovación tecnológica
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600 font-medium">Activa</span>
            <span className="text-sm text-muted-foreground">Hasta 15/01/2025</span>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-2">Energías Renovables</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ayudas para instalación de energías renovables
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-600 font-medium">Próximamente</span>
            <span className="text-sm text-muted-foreground">Desde 01/02/2025</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConvocatoriasPage() {
  return (
    <SimpleLayout dictionary={mockDictionary}>
      <ConvocatoriasContent />
    </SimpleLayout>
  )
} 