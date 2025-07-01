import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormData } from '../subsidy-profile-form';

interface NeedsInterestsStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

// Tipos para los datos de la base de datos
interface NecesidadCliente {
  id: number;
  nombre_i18n: Record<string, string>;
}

interface AmbitoInteres {
  id: number;
  nombre_i18n: Record<string, string>;
}

export function NeedsInterestsStep({ formData, updateFormData }: NeedsInterestsStepProps) {
  const [necesidades, setNecesidades] = useState<NecesidadCliente[]>([]);
  const [ambitos, setAmbitos] = useState<AmbitoInteres[]>([]);
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
        const mockNecesidades: NecesidadCliente[] = [
          { id: 1, nombre_i18n: { es: 'Financiación para I+D+i', en: 'R&D&i Funding' } },
          { id: 2, nombre_i18n: { es: 'Digitalización empresarial', en: 'Business Digitalization' } },
          { id: 3, nombre_i18n: { es: 'Formación de empleados', en: 'Employee Training' } },
          { id: 4, nombre_i18n: { es: 'Expansión internacional', en: 'International Expansion' } },
          { id: 5, nombre_i18n: { es: 'Sostenibilidad ambiental', en: 'Environmental Sustainability' } },
          { id: 6, nombre_i18n: { es: 'Eficiencia energética', en: 'Energy Efficiency' } }
        ];

        const mockAmbitos: AmbitoInteres[] = [
          { id: 1, nombre_i18n: { es: 'Innovación tecnológica', en: 'Technological Innovation' } },
          { id: 2, nombre_i18n: { es: 'Energías renovables', en: 'Renewable Energy' } },
          { id: 3, nombre_i18n: { es: 'Economía circular', en: 'Circular Economy' } },
          { id: 4, nombre_i18n: { es: 'Transformación digital', en: 'Digital Transformation' } },
          { id: 5, nombre_i18n: { es: 'Desarrollo rural', en: 'Rural Development' } },
          { id: 6, nombre_i18n: { es: 'Industria 4.0', en: 'Industry 4.0' } }
        ];

        setNecesidades(mockNecesidades);
        setAmbitos(mockAmbitos);
      } catch (error) {
        console.error('Error cargando datos de catálogos:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadCatalogData();
  }, []);

  const handleNecesidadChange = (necesidadId: number, checked: boolean) => {
    const newNecesidades = checked
      ? [...formData.necesidades, necesidadId]
      : formData.necesidades.filter(id => id !== necesidadId);
    updateFormData({ necesidades: newNecesidades });
  };

  const handleAmbitoChange = (ambitoId: number, checked: boolean) => {
    const newAmbitos = checked
      ? [...formData.ambitos, ambitoId]
      : formData.ambitos.filter(id => id !== ambitoId);
    updateFormData({ ambitos: newAmbitos });
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
        Selecciona tus necesidades de apoyo y áreas de interés. Esto nos permitirá recomendarte las subvenciones más relevantes para tus objetivos.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Necesidades de Apoyo <span className="text-destructive">*</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Selecciona al menos una necesidad que tengas actualmente
            </p>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {necesidades.map((necesidad) => (
              <div key={necesidad.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`necesidad-${necesidad.id}`}
                  checked={formData.necesidades.includes(necesidad.id)}
                  onCheckedChange={(checked) => 
                    handleNecesidadChange(necesidad.id, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`necesidad-${necesidad.id}`} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {getDisplayValue(necesidad.nombre_i18n)}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Ámbitos de Interés <span className="text-destructive">*</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Selecciona al menos un ámbito de tu interés
            </p>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {ambitos.map((ambito) => (
              <div key={ambito.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`ambito-${ambito.id}`}
                  checked={formData.ambitos.includes(ambito.id)}
                  onCheckedChange={(checked) => 
                    handleAmbitoChange(ambito.id, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`ambito-${ambito.id}`} 
                  className="text-sm font-normal cursor-pointer"
                >
                  {getDisplayValue(ambito.nombre_i18n)}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Consejo</h4>
        <p className="text-sm text-blue-800">
          Cuantas más necesidades y ámbitos selecciones que realmente te interesen, 
          mejores serán nuestras recomendaciones de subvenciones. No te preocupes por seleccionar muchas opciones.
        </p>
      </div>
    </div>
  );
} 