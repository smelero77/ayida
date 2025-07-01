"use client"

import { SimpleLayout } from "@/components-shadboard/layout/simple-layout"
import { Search, Filter, Download, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Tipos para los datos del perfil
interface UsuarioPerfil {
  id: number
  nombre_perfil: string
  nombre_empresa?: string
  tamanoEmpresa?: {
    id: number
    nombre_i18n: Record<string, string>
  }
  sector?: {
    id: number
    nombre_i18n: Record<string, string>
  }
  ubicacion?: {
    id: number
    provincia_i18n: Record<string, string>
    comAutonoma_i18n: Record<string, string>
  }
  necesidades: Array<{
    necesidad: {
      id: number
      nombre_i18n: Record<string, string>
    }
  }>
  ambitosInteres: Array<{
    ambito: {
      id: number
      nombre_i18n: Record<string, string>
    }
  }>
}

interface CatalogData {
  tamanosEmpresa: Array<{
    id: number
    nombre_i18n: Record<string, string>
  }>
  sectores: Array<{
    id: number
    nombre_i18n: Record<string, string>
  }>
  ubicaciones: Array<{
    id: number
    provincia_i18n: Record<string, string>
    comAutonoma_i18n: Record<string, string>
  }>
  necesidades: Array<{
    id: number
    nombre_i18n: Record<string, string>
  }>
  ambitos: Array<{
    id: number
    nombre_i18n: Record<string, string>
  }>
}

interface SearchFilters {
  palabrasClave: string
  tamanoEmpresaId?: number
  sectorId?: number
  ubicacionId?: number
  necesidadIds: number[]
  ambitoIds: number[]
  estado: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

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

function getDisplayValue(i18nField: Record<string, string> | undefined): string {
  if (!i18nField) return 'Sin especificar'
  return i18nField.es ?? i18nField.en ?? Object.values(i18nField)[0] ?? 'Sin especificar'
}

function BusquedaContent() {
  const { toast } = useToast()
  const [perfiles, setPerfiles] = useState<UsuarioPerfil[]>([])
  const [catalogData, setCatalogData] = useState<CatalogData | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null)
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    palabrasClave: '',
    necesidadIds: [],
    ambitoIds: [],
    estado: 'todos'
  })
  const [loadingProfiles, setLoadingProfiles] = useState(true)
  const [loadingCatalog, setLoadingCatalog] = useState(true)

  // Cargar perfiles del usuario
  useEffect(() => {
    const loadPerfiles = async () => {
      try {
        const response = await fetch('/api/perfiles')
        const result = await response.json() as ApiResponse<UsuarioPerfil[]>
        
        if (result.success && result.data) {
          setPerfiles(result.data)
        }
      } catch (error) {
        console.error('Error cargando perfiles:', error)
        toast("No se pudieron cargar los perfiles")
      } finally {
        setLoadingProfiles(false)
      }
    }

    void loadPerfiles()
  }, [])

  // Cargar datos de catálogo
  useEffect(() => {
    const loadCatalogData = async () => {
      try {
        const response = await fetch('/api/catalogos')
        const result = await response.json() as ApiResponse<CatalogData>
        
        if (result.success && result.data) {
          setCatalogData(result.data)
        }
      } catch (error) {
        console.error('Error cargando catálogos:', error)
        toast("No se pudieron cargar los catálogos")
      } finally {
        setLoadingCatalog(false)
      }
    }

    void loadCatalogData()
  }, [])

  // Aplicar datos del perfil seleccionado a los filtros
  const applyProfileToFilters = (profileId: number) => {
    const perfil = perfiles.find(p => p.id === profileId)
    if (!perfil) return

    setSearchFilters({
      ...searchFilters,
      tamanoEmpresaId: perfil.tamanoEmpresa?.id,
      sectorId: perfil.sector?.id,
      ubicacionId: perfil.ubicacion?.id,
      necesidadIds: perfil.necesidades.map(n => n.necesidad.id),
      ambitoIds: perfil.ambitosInteres.map(a => a.ambito.id)
    })

    toast(`Se han cargado los filtros del perfil "${perfil.nombre_perfil}"`)
  }

  const handleProfileChange = (profileId: string) => {
    if (profileId === "none") {
      setSelectedProfile(null)
      return
    }
    
    const id = parseInt(profileId)
    setSelectedProfile(id)
    applyProfileToFilters(id)
  }

  const updateFilter = (key: keyof SearchFilters, value: SearchFilters[keyof SearchFilters]) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    // TODO: Implementar la búsqueda real con los filtros
    console.log('Filtros de búsqueda:', searchFilters)
    toast("Se ha ejecutado la búsqueda con los filtros seleccionados")
  }

  if (loadingProfiles || loadingCatalog) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Cargando datos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Búsqueda Avanzada</h1>
        <p className="text-muted-foreground">Encuentra convocatorias específicas usando tus datos de perfil</p>
      </div>
      
      {/* Selector de perfil */}
      {perfiles.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Cargar Datos de Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Seleccionar perfil para aplicar filtros:</Label>
                <Select value={selectedProfile?.toString() ?? "none"} onValueChange={handleProfileChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un perfil..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No usar perfil</SelectItem>
                    {perfiles.map((perfil) => (
                      <SelectItem key={perfil.id} value={perfil.id.toString()}>
                        {perfil.nombre_perfil} {perfil.nombre_empresa && `(${perfil.nombre_empresa})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedProfile && (
                <div className="space-y-1">
                  <Label>Datos del perfil seleccionado:</Label>
                  <div className="text-sm text-muted-foreground">
                    {(() => {
                      const perfil = perfiles.find(p => p.id === selectedProfile)
                      if (!perfil) return null
                      return (
                        <div className="space-y-1">
                          <div>Tamaño: {getDisplayValue(perfil.tamanoEmpresa?.nombre_i18n)}</div>
                          <div>Sector: {getDisplayValue(perfil.sector?.nombre_i18n)}</div>
                          <div>Ubicación: {getDisplayValue(perfil.ubicacion?.provincia_i18n)}</div>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Filtros de búsqueda */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Palabras clave */}
          <div className="space-y-2">
            <Label>Palabras clave</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar convocatorias..." 
                className="pl-10"
                value={searchFilters.palabrasClave}
                onChange={(e) => updateFilter('palabrasClave', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tamaño de empresa */}
            <div className="space-y-2">
              <Label>Tamaño de empresa</Label>
              <Select 
                value={searchFilters.tamanoEmpresaId?.toString() ?? ""} 
                onValueChange={(value) => updateFilter('tamanoEmpresaId', value ? parseInt(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los tamaños" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los tamaños</SelectItem>
                  {catalogData?.tamanosEmpresa.map((tamano) => (
                    <SelectItem key={tamano.id} value={tamano.id.toString()}>
                      {getDisplayValue(tamano.nombre_i18n)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sector */}
            <div className="space-y-2">
              <Label>Sector</Label>
              <Select 
                value={searchFilters.sectorId?.toString() ?? ""} 
                onValueChange={(value) => updateFilter('sectorId', value ? parseInt(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los sectores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los sectores</SelectItem>
                  {catalogData?.sectores.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id.toString()}>
                      {getDisplayValue(sector.nombre_i18n)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select 
                value={searchFilters.estado} 
                onValueChange={(value) => updateFilter('estado', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="activa">Activa</SelectItem>
                  <SelectItem value="cerrada">Cerrada</SelectItem>
                  <SelectItem value="proximamente">Próximamente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSearch} className="gap-2">
              <Search className="h-4 w-4" />
              Buscar convocatorias
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Resultados */}
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Resultados</h2>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Convocatoria {i + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Descripción de la convocatoria con detalles importantes...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600 font-medium">Activa</span>
                  <Button size="sm" variant="outline">Ver detalles</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BusquedaPage() {
  return (
    <SimpleLayout dictionary={mockDictionary}>
      <BusquedaContent />
    </SimpleLayout>
  )
} 