import React from 'react';
import { Button } from './button';
import { ArrowRight, Download, Star } from 'lucide-react';

// Componente de ejemplos para mostrar todas las variantes del Button
export const ButtonExamples = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Componente Button Genérico</h2>
        <p className="text-gray-600 mb-6">
          Un componente reutilizable que maneja diferentes variantes, colores y tamaños.
        </p>
      </div>

      {/* Variantes de Color */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Colores Disponibles</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" color="green">Verde Primario</Button>
          <Button variant="primary" color="pink">Rosa Primario</Button>
          <Button variant="primary" color="blue">Azul Primario</Button>
          <Button variant="primary" color="white">Blanco Primario</Button>
        </div>
      </div>

      {/* Variantes de Estilo */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Variantes de Estilo</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" color="pink">Primary</Button>
          <Button variant="secondary" color="pink">Secondary</Button>
          <Button variant="outline" color="pink">Outline</Button>
          <Button variant="ghost" color="pink">Ghost</Button>
        </div>
      </div>

      {/* Tamaños */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Tamaños</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" color="pink" size="sm">Pequeño</Button>
          <Button variant="primary" color="pink" size="md">Mediano</Button>
          <Button variant="primary" color="pink" size="lg">Grande</Button>
        </div>
      </div>

      {/* Con Iconos */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Con Iconos</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" color="pink" size="md">
            Comenzar Gratis
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" color="blue" size="md">
            <Download className="w-4 h-4" />
            Descargar
          </Button>
          <Button variant="ghost" color="green" size="sm">
            <Star className="w-4 h-4" />
            Favorito
          </Button>
        </div>
      </div>

      {/* Ancho Completo */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Ancho Completo</h3>
        <div className="max-w-md space-y-3">
          <Button variant="primary" color="pink" fullWidth>
            Botón de Ancho Completo
          </Button>
          <Button variant="outline" color="blue" fullWidth>
            Otro Botón Completo
          </Button>
        </div>
      </div>

      {/* Estados */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Estados</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" color="pink">Normal</Button>
          <Button variant="primary" color="pink" disabled>
            Deshabilitado
          </Button>
        </div>
      </div>

      {/* Ejemplos de Uso Real */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Ejemplos de Uso Real</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Header de Navegación</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" color="white">
                Acceder
              </Button>
              <Button variant="primary" size="sm" color="pink">
                Explorar Gratis
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Call to Action</h4>
            <div className="flex gap-2">
              <Button variant="primary" size="lg" color="pink">
                Comenzar Gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="lg" color="pink">
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Código de Ejemplo */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Código de Ejemplo</h3>
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// Botón básico
<Button variant="primary" color="pink" size="md">
  Explorar Gratis
</Button>

// Con icono
<Button variant="primary" color="pink" size="md">
  Comenzar Gratis
  <ArrowRight className="w-4 h-4" />
</Button>

// Ancho completo
<Button variant="primary" color="pink" fullWidth>
  Botón Completo
</Button>

// Deshabilitado
<Button variant="primary" color="pink" disabled>
  Deshabilitado
</Button>`}
        </pre>
      </div>
    </div>
  );
}; 