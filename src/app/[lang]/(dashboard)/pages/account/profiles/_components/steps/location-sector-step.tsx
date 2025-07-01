import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FormData } from '../subsidy-profile-form';

interface LocationSectorStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

// Tipos para los datos de la base de datos
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

export function LocationSectorStep({ formData, updateFormData }: LocationSectorStepProps) {
  const [companySizes, setCompanySizes] = useState<TamanoEmpresa[]>([]);
  const [sectors, setSectors] = useState<SectorEmpresa[]>([]);
  const [locations, setLocations] = useState<Ubicacion[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener el valor de display en el idioma correcto
  const getDisplayValue = (i18nField: Record<string, string>) => {
    if (!i18nField) return 'Sin especificar';
    return i18nField.es ?? i18nField.en ?? Object.values(i18nField)[0] ?? 'Sin especificar';
  };

  // Cargar datos de catálogos al montar el componente
  useEffect(() => {
    const loadCatalogData = async () => {
      try {
        // Por ahora usamos datos mock, pero esto se conectará a las APIs reales
        const mockCompanySizes: TamanoEmpresa[] = [
          { id: 1, nombre_i18n: { es: 'Microempresa', en: 'Microenterprise' } },
          { id: 2, nombre_i18n: { es: 'Pequeña empresa', en: 'Small company' } },
          { id: 3, nombre_i18n: { es: 'Mediana empresa', en: 'Medium company' } },
          { id: 4, nombre_i18n: { es: 'Gran empresa', en: 'Large company' } }
        ];

        const mockSectors: SectorEmpresa[] = [
          { id: 1, nombre_i18n: { es: 'Tecnología', en: 'Technology' } },
          { id: 2, nombre_i18n: { es: 'Energía renovable', en: 'Renewable energy' } },
          { id: 3, nombre_i18n: { es: 'Agricultura', en: 'Agriculture' } },
          { id: 4, nombre_i18n: { es: 'Manufactura', en: 'Manufacturing' } },
          { id: 5, nombre_i18n: { es: 'Servicios', en: 'Services' } }
        ];

        const mockLocations: Ubicacion[] = [
          { 
            id: 1, 
            provincia_i18n: { es: 'Madrid', en: 'Madrid' }, 
            comAutonoma_i18n: { es: 'Comunidad de Madrid', en: 'Madrid Community' } 
          },
          { 
            id: 2, 
            provincia_i18n: { es: 'Barcelona', en: 'Barcelona' }, 
            comAutonoma_i18n: { es: 'Cataluña', en: 'Catalonia' } 
          },
          { 
            id: 3, 
            provincia_i18n: { es: 'Valencia', en: 'Valencia' }, 
            comAutonoma_i18n: { es: 'Comunidad Valenciana', en: 'Valencia Community' } 
          },
          { 
            id: 4, 
            provincia_i18n: { es: 'Sevilla', en: 'Seville' }, 
            comAutonoma_i18n: { es: 'Andalucía', en: 'Andalusia' } 
          }
        ];

        setCompanySizes(mockCompanySizes);
        setSectors(mockSectors);
        setLocations(mockLocations);
      } catch (error) {
        console.error('Error cargando datos de catálogos:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadCatalogData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground mb-4">
          Cargando catálogos...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Define la ubicación y sector de actividad de tu entidad. Esta información es clave para encontrar subvenciones específicas de tu región y sector.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tamano">
            Tamaño de la Entidad <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.tamanoEmpresaId?.toString() ?? ''}
            onValueChange={(value) => updateFormData({ tamanoEmpresaId: parseInt(value) })}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Selecciona el tamaño..." />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map((tamano) => (
                <SelectItem key={tamano.id} value={tamano.id.toString()}>
                  {getDisplayValue(tamano.nombre_i18n)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            El tamaño de tu empresa determina qué ayudas específicas puedes solicitar
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sector">
            Sector Principal de Actividad <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.sectorId?.toString() ?? ''}
            onValueChange={(value) => updateFormData({ sectorId: parseInt(value) })}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Selecciona el sector..." />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector.id} value={sector.id.toString()}>
                  {getDisplayValue(sector.nombre_i18n)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Tu sector de actividad principal según clasificación oficial
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="ubicacion">
            Ubicación Principal <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.ubicacionId?.toString() ?? ''}
            onValueChange={(value) => updateFormData({ ubicacionId: parseInt(value) })}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Selecciona la ubicación..." />
            </SelectTrigger>
            <SelectContent>
              {locations.map((ubicacion) => (
                <SelectItem key={ubicacion.id} value={ubicacion.id.toString()}>
                  {getDisplayValue(ubicacion.provincia_i18n)}, {getDisplayValue(ubicacion.comAutonoma_i18n)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            La ubicación determina las subvenciones autonómicas y locales disponibles
          </p>
        </div>
      </div>
    </div>
  );
} 