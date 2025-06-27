# Componentes de Pricing - Documentación

## Estructura Modular

Los componentes de pricing han sido refactorizados para seguir las mejores prácticas de T3 y ser más escalables y mantenibles.

### Archivos Principales

#### 1. Tipos (`src/types/pricing.ts`)
- `PricingPlan`: Interface principal para los planes de pricing
- `OptionalAddOn`: Interface para los add-ons opcionales
- `PricingCardProps`: Props para el componente PricingCard
- `DecorativeGraphicProps`: Props para el componente DecorativeGraphic

#### 2. Configuración (`src/config/pricing-plans.ts`)
- `pricingPlans`: Array con la configuración de todos los planes
- `pricingBenefits`: Lista de beneficios mostrados en el header
- `annualDiscount`: Texto del descuento anual

#### 3. Componentes UI (`src/components/ui/`)

##### `decorative-graphic.tsx`
- Renderiza gráficos decorativos únicos para cada plan
- Usa gradientes y sombras CSS para efectos visuales
- Diferentes colores y formas según el plan (pro, business, enterprise)

##### `pricing-card.tsx`
- Tarjeta individual de pricing con todos los elementos
- Maneja la lógica de botones, features y add-ons
- Responsive y accesible

##### `pricing-section.tsx`
- Componente principal que orquesta toda la sección
- Incluye el toggle de billing anual/mensual
- Renderiza todas las tarjetas de pricing

#### 4. Exportaciones (`src/components/ui/pricing/index.ts`)
- Punto central de exportación para todos los componentes
- Facilita las importaciones en otros archivos

### Características

#### Escalabilidad
- Separación clara entre datos (config) y presentación (componentes)
- Tipos TypeScript para mejor mantenibilidad
- Componentes modulares y reutilizables

#### Accesibilidad
- Uso de iconos informativos para features especiales
- Estructura semántica correcta
- Contraste adecuado en todos los elementos

#### Responsive Design
- Grid adaptativo para diferentes tamaños de pantalla
- Toggle de billing que se adapta a móviles
- Tipografía escalable

#### Interactividad
- Toggle funcional entre billing mensual/anual
- Hover effects en botones y tarjetas
- Animaciones suaves y transiciones

### Uso

```tsx
import { PricingSection } from "@/components/ui/pricing";

// En tu componente
<PricingSection />
```

### Personalización

Para modificar los planes de pricing, edita `src/config/pricing-plans.ts`:

```tsx
export const pricingPlans: PricingPlan[] = [
  {
    id: "nuevo-plan",
    name: "Nuevo Plan",
    price: "$299",
    // ... resto de configuración
  }
];
```

### Beneficios de la Nueva Estructura

1. **Mantenibilidad**: Cambios centralizados en archivos de configuración
2. **Reutilización**: Componentes modulares que se pueden usar en otros contextos
3. **Tipado**: TypeScript completo para prevenir errores
4. **Performance**: Componentes optimizados y lazy-loading ready
5. **Testing**: Estructura que facilita el testing unitario 