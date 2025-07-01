# Sistema de Toast - Ayida Portal

## Descripción

El sistema de toast implementado en Ayida Portal proporciona una forma estándar y consistente de mostrar notificaciones al usuario. Utiliza **Sonner** como base, una librería moderna y ligera compatible con el T3 Stack, y está integrado en toda la aplicación.

## Características

- ✅ **Mensajes estándar**: Funciones predefinidas para tipos comunes de mensajes
- ✅ **Mensajes personalizados**: Soporte para mensajes personalizados
- ✅ **Compatibilidad T3**: Totalmente compatible con T3 Stack
- ✅ **Integración automática**: Incluido en el layout principal
- ✅ **Tipos de mensajes**: Success, Error, Info, Warning, Loading
- ✅ **Mensajes en español**: Todos los mensajes estándar están en español
- ✅ **Colores diferenciados**: Cada tipo de mensaje tiene su propio color
- ✅ **Iconos visuales**: Iconos específicos para cada tipo de mensaje
- ✅ **Animaciones suaves**: Transiciones y animaciones fluidas
- ✅ **Responsive**: Adaptado para móviles y escritorio
- ✅ **Acciones personalizadas**: Soporte para botones de acción en toasts
- ✅ **Duración configurable**: Tiempo de duración personalizable por toast
- ✅ **Mensajes tipificados**: Sistema completo de mensajes estándar para evitar hardcodeo
- ✅ **Hook personalizado**: Uso correcto del hook `useShowToast` para evitar duplicaciones

## Configuración

El sistema de toast está configurado en `src/app/layout.tsx` usando un componente cliente separado:

```tsx
import { ToastProvider } from "~/components/ui/toast-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <TRPCReactProvider>
            {children}
            <ToastProvider />
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
```

El componente `ToastProvider` está definido en `src/components/ui/toast-provider.tsx`:

```tsx
"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={5000}
      expand={true}
      visibleToasts={3}
    />
  )
}
```

## Uso Correcto del Hook

### Importar y usar el hook

```typescript
import { useShowToast } from "@/lib/toast";

function MyComponent() {
  const showToast = useShowToast();

  const handleSuccess = () => {
    showToast.success("¡Éxito!", "Operación completada");
  };

  const handleError = () => {
    showToast.error("Error", "Algo salió mal");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Éxito</button>
      <button onClick={handleError}>Error</button>
    </div>
  );
}
```

### Métodos disponibles

```typescript
const showToast = useShowToast();

// Toast de éxito
showToast.success("Título", "Descripción opcional");

// Toast de error
showToast.error("Título", "Descripción opcional");

// Toast de información
showToast.info("Título", "Descripción opcional");

// Toast de advertencia
showToast.warning("Título", "Descripción opcional");

// Toast de carga (sin timeout automático)
showToast.loading("Título", "Descripción opcional");

// Toast personalizado
showToast.custom({
  title: "Título personalizado",
  description: "Descripción personalizada",
  type: "success", // "success" | "error" | "info" | "warning" | "loading"
  duration: 5000, // tiempo en milisegundos
  action: {
    label: "Acción",
    onClick: () => console.log("Acción ejecutada")
  }
});
```

## Configuración de Sonner

### Opciones del Toaster

```typescript
<Toaster
  position="top-right"        // Posición: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center"
  richColors={true}           // Colores ricos y modernos
  closeButton={true}          // Mostrar botón de cerrar
  duration={5000}             // Duración por defecto en ms
  expand={true}               // Expandir toasts automáticamente
  visibleToasts={3}           // Máximo número de toasts visibles
  theme="light"               // Tema: "light" | "dark" | "system"
  toastOptions={{
    style: { background: '#363636' },
  }}
/>
```

### Opciones por Toast

```typescript
toast.success("Título", {
  description: "Descripción",
  duration: 5000,             // Duración específica
  action: {                   // Botón de acción
    label: "Deshacer",
    onClick: () => console.log("Deshacer")
  },
  cancel: {                   // Botón de cancelar
    label: "Cancelar"
  },
  onDismiss: () => {          // Callback al cerrar
    console.log("Toast cerrado")
  }
});
```

## Tipos de Toast Disponibles

### 1. **Success (Éxito)**
- **Color**: Verde
- **Icono**: CheckCircle
- **Uso**: Confirmar operaciones exitosas

### 2. **Error (Error)**
- **Color**: Rojo
- **Icono**: XCircle
- **Uso**: Mostrar errores y problemas

### 3. **Info (Información)**
- **Color**: Azul
- **Icono**: Info
- **Uso**: Proporcionar información general

### 4. **Warning (Advertencia)**
- **Color**: Amarillo/Naranja
- **Icono**: AlertTriangle
- **Uso**: Advertencias y precauciones

### 5. **Loading (Carga)**
- **Color**: Gris
- **Icono**: Loader
- **Uso**: Operaciones en progreso

## Ventajas de Sonner

### ✅ **Compatibilidad T3 Stack**
- No hay conflictos con las dependencias de T3
- Funciona perfectamente con Next.js, TypeScript y tRPC

### ✅ **Rendimiento**
- Librería ligera (~3KB gzipped)
- Sin dependencias pesadas
- Animaciones optimizadas

### ✅ **Funcionalidades Avanzadas**
- Soporte para acciones personalizadas
- Temas claro/oscuro
- Posicionamiento flexible
- Animaciones suaves

### ✅ **Desarrollo**
- API simple e intuitiva
- TypeScript nativo
- Excelente documentación

## Migración desde HeroUI

### Cambios realizados:

1. **Eliminado**: `@heroui/react` y dependencias relacionadas
2. **Agregado**: `sonner` como nueva librería de toast
3. **Actualizado**: `ToastProvider` para usar Sonner
4. **Simplificado**: Hook `useShowToast` con API más simple
5. **Eliminado**: Archivo `toast-styles.ts` (ya no necesario)

### Beneficios de la migración:

- ✅ **Compatibilidad total** con T3 Stack
- ✅ **Mejor rendimiento** y menor tamaño de bundle
- ✅ **API más simple** y fácil de usar
- ✅ **Menos dependencias** y conflictos
- ✅ **Mejor soporte** para TypeScript

## Ejemplos de Uso

### Toast básico
```typescript
showToast.success("¡Operación exitosa!");
```

### Toast con descripción
```typescript
showToast.error("Error de conexión", "No se pudo conectar al servidor");
```

### Toast con acción
```typescript
showToast.custom({
  title: "Archivo eliminado",
  description: "El archivo se eliminó correctamente",
  type: "success",
  action: {
    label: "Deshacer",
    onClick: () => restoreFile()
  }
});
```

### Toast de carga
```typescript
const loadingToast = showToast.loading("Procesando...", "Subiendo archivo");
// ... operación asíncrona
loadingToast.dismiss();
showToast.success("¡Archivo subido!");
```

## Mensajes Estándar

El sistema incluye mensajes predefinidos para operaciones comunes:

```typescript
import { toastMessages } from "@/lib/toast";

// Autenticación
showToast.success(toastMessages.auth.loginSuccess);
showToast.error(toastMessages.auth.loginError);

// CRUD
showToast.success(toastMessages.crud.createSuccess);
showToast.error(toastMessages.crud.createError);

// Formularios
showToast.error(toastMessages.form.validationError);
showToast.success(toastMessages.form.saveSuccess);
```

## Troubleshooting

### Problema: Los toasts no aparecen
**Solución**: Verificar que `ToastProvider` esté incluido en el layout principal.

### Problema: Errores de TypeScript
**Solución**: Asegurar que `sonner` esté instalado correctamente: `npm install sonner`

### Problema: Estilos no aplicados
**Solución**: Sonner incluye sus propios estilos, no requiere configuración adicional.

### Problema: Toasts transparentes
**Solución**: Sonner maneja automáticamente los fondos, no hay problemas de transparencia. 