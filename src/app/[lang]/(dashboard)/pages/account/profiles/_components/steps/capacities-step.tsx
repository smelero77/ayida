import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormData } from '../subsidy-profile-form';

interface CapacitiesStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

// Tipos para los datos de la base de datos
interface PlazoCarga {
  id: number;
  nombre_i18n: Record<string, string>;
}

export function CapacitiesStep({ formData, updateFormData }: CapacitiesStepProps) {
  const [plazos, setPlazos] = useState<PlazoCarga[]>([]);
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
        const mockPlazos: PlazoCarga[] = [
          { id: 1, nombre_i18n: { es: 'Gestión de documentación básica', en: 'Basic Documentation Management' } },
          { id: 2, nombre_i18n: { es: 'Elaboración de memorias técnicas', en: 'Technical Report Writing' } },
          { id: 3, nombre_i18n: { es: 'Justificación económica de proyectos', en: 'Economic Project Justification' } },
          { id: 4, nombre_i18n: { es: 'Seguimiento y reporting', en: 'Follow-up and Reporting' } },
          { id: 5, nombre_i18n: { es: 'Gestión de consorcios europeos', en: 'European Consortium Management' } }
        ];

        setPlazos(mockPlazos);
      } catch (error) {
        console.error('Error cargando datos de catálogos:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadCatalogData();
  }, []);

  const handlePlazoChange = (plazoId: number, checked: boolean) => {
    const newPlazos = checked
      ? [...formData.plazos, plazoId]
      : formData.plazos.filter(id => id !== plazoId);
    updateFormData({ plazos: newPlazos });
  };

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
        Este paso es opcional. Indica tus capacidades de gestión administrativa para recibir recomendaciones más precisas sobre el tiempo y recursos necesarios para cada subvención.
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Capacidades de Gestión Administrativa</CardTitle>
          <p className="text-sm text-muted-foreground">
            Selecciona las capacidades con las que cuentas actualmente (opcional)
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {plazos.map((plazo) => (
            <div key={plazo.id} className="flex items-center space-x-2">
              <Checkbox
                id={`plazo-${plazo.id}`}
                checked={formData.plazos.includes(plazo.id)}
                onCheckedChange={(checked) => 
                  handlePlazoChange(plazo.id, checked as boolean)
                }
              />
              <Label 
                htmlFor={`plazo-${plazo.id}`} 
                className="text-sm font-normal cursor-pointer"
              >
                {getDisplayValue(plazo.nombre_i18n)}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">✅ Casi terminamos</h4>
        <p className="text-sm text-green-800">
          Has completado todos los datos principales de tu perfil. 
          Las capacidades de gestión que selecciones nos ayudarán a recomendarte subvenciones 
          que se ajusten a tus recursos administrativos disponibles.
        </p>
      </div>
    </div>
  );
} 