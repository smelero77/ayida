# Sistema de Toast - Ayida Portal

## Descripción

El sistema de toast implementado en Ayida Portal proporciona una forma estándar y consistente de mostrar notificaciones al usuario. Utiliza **HeroUI** como base con **estilos personalizados** y está integrado en toda la aplicación.

## Características

- ✅ **Mensajes estándar**: Funciones predefinidas para tipos comunes de mensajes
- ✅ **Mensajes personalizados**: Soporte para mensajes personalizados
- ✅ **Estilos personalizados**: Sistema de estilos basado en HeroUI con `tailwind-variants`
- ✅ **Integración automática**: Incluido en el layout principal
- ✅ **Tipos de mensajes**: Success, Error, Info, Warning, Loading
- ✅ **Mensajes en español**: Todos los mensajes estándar están en español
- ✅ **Colores diferenciados**: Cada tipo de mensaje tiene su propio color
- ✅ **Iconos visuales**: Iconos específicos para cada tipo de mensaje
- ✅ **Animaciones suaves**: Transiciones y animaciones fluidas
- ✅ **Responsive**: Adaptado para móviles y escritorio
- ✅ **Variantes de estilo**: flat, solid, bordered
- ✅ **Sistema de colores**: default, primary, secondary, success, warning, danger
- ✅ **Radios personalizables**: none, sm, md, lg, full
- ✅ **Sombras configurables**: none, sm, md, lg
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

import { ToastProvider as HeroToastProvider } from "@heroui/react"

export function ToastProvider() {
  return (
    <HeroToastProvider
      placement="top-right"
      maxVisibleToasts={3}
      toastProps={{
        variant: "flat",
        radius: "md",
        shadow: "md",
      }}
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
  color: "success", // "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  variant: "flat", // "solid" | "bordered" | "flat"
  radius: "md", // "none" | "sm" | "md" | "lg" | "full"
  shadow: "md", // "none" | "sm" | "md" | "lg"
  timeout: 5000, // tiempo en milisegundos
  hideIcon: false, // ocultar icono
  closeIcon: <X className="h-4 w-4" />, // icono personalizado
});
```

## Estilos Personalizados

El sistema utiliza estilos personalizados basados en HeroUI definidos en `src/lib/toast-styles.ts`:

### Variantes Disponibles

```typescript
// Variantes de estilo
variant: "flat" | "solid" | "bordered"

// Colores
color: "default" | "primary" | "secondary" | "success" | "warning" | "danger"

// Radios
radius: "none" | "sm" | "md" | "lg" | "full"

// Sombras
shadow: "none" | "sm" | "md" | "lg"

// Tamaños
size: "sm" | "md" | "lg"
```

### Ejemplos de Estilos

```typescript
// Toast plano con color de éxito
showToast.custom({
  title: "Éxito",
  description: "Operación completada",
  color: "success",
  variant: "flat",
  radius: "md",
  shadow: "md",
})

// Toast sólido con color primario
showToast.custom({
  title: "Información",
  description: "Mensaje importante",
  color: "primary",
  variant: "solid",
  radius: "lg",
  shadow: "lg",
})

// Toast con borde y color de advertencia
showToast.custom({
  title: "Advertencia",
  description: "Ten cuidado",
  color: "warning",
  variant: "bordered",
  radius: "md",
  shadow: "sm",
})
```

## Tipos de Toast Disponibles

### 1. **Success (Éxito)**
- **Color**: Verde
- **Icono**: CheckCircle
- **Uso**: Confirmar operaciones exitosas

### 2. **Error (Error)**
- **Color**: Rojo
- **Icono**: AlertCircle
- **Uso**: Mostrar errores y problemas

### 3. **Info (Información)**
- **Color**: Azul
- **Icono**: Info
- **Uso**: Mostrar información importante

### 4. **Warning (Advertencia)**
- **Color**: Amarillo/Naranja
- **Icono**: AlertTriangle
- **Uso**: Mostrar advertencias y precauciones

### 5. **Loading (Carga)**
- **Color**: Gris
- **Icono**: Spinner
- **Uso**: Mostrar estados de carga
- **Timeout**: 0 (no se cierra automáticamente)

## Mensajes Estándar

El sistema incluye mensajes predefinidos para evitar hardcodeo:

### Autenticación (`toastMessages.auth`)
```typescript
toastMessages.auth.loginSuccess           // "Inicio de sesión exitoso"
toastMessages.auth.loginError             // "Error al iniciar sesión"
toastMessages.auth.loginInvalidCredentials // "Credenciales incorrectas. Verifica tu email y contraseña."
toastMessages.auth.loginConnectionError   // "Error de conexión. Inténtalo de nuevo."
toastMessages.auth.logoutSuccess          // "Sesión cerrada correctamente"
toastMessages.auth.registerSuccess        // "Registro exitoso"
toastMessages.auth.registerError          // "Error en el registro"
toastMessages.auth.registerCreateAccountError // "Error al crear la cuenta"
toastMessages.auth.autoLoginError         // "Error al iniciar sesión automáticamente. Por favor, inicia sesión manualmente."
toastMessages.auth.googleSignInError      // "Error al iniciar sesión con Google"
toastMessages.auth.googleSignUpError      // "Error al registrarse con Google"
```

### Operaciones CRUD (`toastMessages.crud`)
```typescript
toastMessages.crud.createSuccess          // "Elemento creado correctamente"
toastMessages.crud.createError            // "Error al crear el elemento"
toastMessages.crud.updateSuccess          // "Elemento actualizado correctamente"
toastMessages.crud.updateError            // "Error al actualizar el elemento"
toastMessages.crud.deleteSuccess          // "Elemento eliminado correctamente"
toastMessages.crud.deleteError            // "Error al eliminar el elemento"
toastMessages.crud.loadError              // "Error al cargar los datos"
```

### Formularios (`toastMessages.form`)
```typescript
toastMessages.form.validationError        // "Por favor, revisa los campos marcados"
toastMessages.form.saveSuccess            // "Datos guardados correctamente"
toastMessages.form.saveError              // "Error al guardar los datos"
```

### Archivos (`toastMessages.file`)
```typescript
toastMessages.file.uploadSuccess          // "Archivo subido correctamente"
toastMessages.file.uploadError            // "Error al subir el archivo"
toastMessages.file.downloadSuccess        // "Descarga iniciada"
toastMessages.file.downloadError          // "Error al descargar el archivo"
```

### Convocatorias (`toastMessages.convocatorias`)
```typescript
toastMessages.convocatorias.syncSuccess   // "Sincronización completada"
toastMessages.convocatorias.syncError     // "Error en la sincronización"
toastMessages.convocatorias.searchSuccess // "Búsqueda completada"
toastMessages.convocatorias.searchError   // "Error en la búsqueda"
```

### Errores Generales (`toastMessages.general`)
```typescript
toastMessages.general.connectionError     // "Error de conexión. Inténtalo de nuevo."
toastMessages.general.unexpectedError     // "Ha ocurrido un error inesperado."
toastMessages.general.networkError        // "Error de red. Verifica tu conexión."
```

## Uso Básico

### Importar el sistema
```typescript
import { useShowToast, toastMessages } from "@/lib/toast";
```

### Usar mensajes estándar
```typescript
function MyComponent() {
  const showToast = useShowToast();

  const handleLogin = async () => {
    try {
      await login();
      showToast.success(toastMessages.auth.loginSuccess);
    } catch (error) {
      showToast.error(toastMessages.auth.loginError);
    }
  };

  return <button onClick={handleLogin}>Iniciar Sesión</button>;
}
```

### Usar mensajes personalizados
```typescript
function MyComponent() {
  const showToast = useShowToast();

  const handleOperation = () => {
    showToast.success("Operación completada");
    showToast.error("Error en la operación", "Detalles del error");
    showToast.info("Nueva actualización disponible");
    showToast.warning("Esta acción no se puede deshacer");
    showToast.loading("Procesando datos...");
  };

  return <button onClick={handleOperation}>Ejecutar</button>;
}
```

## Implementación en Formularios

### Ejemplo con React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { useShowToast, toastMessages } from "@/lib/toast";

function MyForm() {
  const { handleSubmit, formState: { errors } } = useForm();
  const showToast = useShowToast();

  const onSubmit = async (data: any) => {
    try {
      // Validar formulario
      if (Object.keys(errors).length > 0) {
        showToast.error(toastMessages.form.validationError);
        return;
      }

      // Lógica del formulario
      await saveData(data);
      showToast.success(toastMessages.form.saveSuccess);
    } catch (error) {
      showToast.error(toastMessages.form.saveError, error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
    </form>
  );
}
```

### Ejemplo con Operaciones CRUD

```typescript
import { useShowToast, toastMessages } from "@/lib/toast";

function MyComponent() {
  const showToast = useShowToast();

  const createItem = async (data: any) => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        showToast.success(toastMessages.crud.createSuccess);
        return result;
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      showToast.error(toastMessages.crud.createError, error.message);
      throw error;
    }
  };

  return <button onClick={() => createItem({})}>Crear</button>;
}
```

## Toast Personalizado

### Crear toast con configuración personalizada
```typescript
import { useShowToast } from "@/lib/toast";
import { X } from "lucide-react";

function MyComponent() {
  const showToast = useShowToast();

  const handleCustomToast = () => {
    showToast.custom({
      title: "Toast Personalizado",
      description: "Este es un toast con configuración personalizada",
      color: "success",
      variant: "flat",
      radius: "lg",
      shadow: "lg",
      timeout: 5000,
      hideIcon: false,
      closeIcon: <X className="h-4 w-4" />,
    });
  };

  return <button onClick={handleCustomToast}>Toast Personalizado</button>;
}
```

### Diferentes variantes de estilo

```typescript
function MyComponent() {
  const showToast = useShowToast();

  const handleVariants = () => {
    // Variante sólida
    showToast.custom({
      title: "Toast Sólido",
      description: "Fondo completamente coloreado",
      color: "primary",
      variant: "solid",
      radius: "md",
      shadow: "md",
    });

    // Variante con borde
    showToast.custom({
      title: "Toast con Borde",
      description: "Solo borde coloreado",
      color: "warning",
      variant: "bordered",
      radius: "md",
      shadow: "sm",
    });

    // Variante plana (por defecto)
    showToast.custom({
      title: "Toast Plano",
      description: "Fondo suave con borde",
      color: "success",
      variant: "flat",
      radius: "lg",
      shadow: "lg",
    });
  };

  return <button onClick={handleVariants}>Mostrar Variantes</button>;
}
```

## Personalización

### Personalizar estilos

Los estilos del toast se pueden personalizar editando el `ToastProvider` en `src/components/ui/toast-provider.tsx`:

```tsx
<HeroToastProvider
  placement="top-right"
  maxVisibleToasts={3}
  toastProps={{
    variant: "flat",
    radius: "md",
    shadow: "md",
    classNames: {
      base: "border-0 shadow-lg",
      title: "font-semibold",
      description: "text-sm opacity-90",
    },
  }}
/>
```

### Modificar estilos base

Los estilos base están definidos en `src/lib/toast-styles.ts` y se pueden modificar para cambiar la apariencia global de todos los toasts.

## Estructura de Archivos

```
src/
├── app/
│   └── layout.tsx              # Configuración del ToastProvider
├── components/ui/
│   ├── toast-examples.tsx      # Componente de ejemplos
│   └── toast-provider.tsx      # Componente cliente del ToastProvider
├── hooks/
│   └── use-toast.ts            # Hook personalizado
├── lib/
│   ├── toast.ts                # Hook useShowToast y mensajes estándar
│   ├── toast-styles.ts         # Estilos personalizados de HeroUI
│   └── utils/
│       ├── tv.ts               # Utilidad tailwind-variants
│       ├── color-variants.ts   # Variantes de colores
│       └── index.ts            # Exportaciones
```

## Mejores Prácticas

1. **Usa el hook useShowToast**: Siempre usa el hook dentro de componentes React
2. **Usa mensajes estándar**: Siempre que sea posible, usa los mensajes predefinidos en `toastMessages`
3. **Evita hardcodeo**: No escribas mensajes directamente en el código, usa el sistema tipificado
4. **Mantén consistencia**: Usa el mismo tipo de mensaje para situaciones similares
5. **Sé específico**: Proporciona descripciones útiles cuando sea necesario
6. **No abuses**: No muestres toasts para información trivial
7. **Maneja errores**: Siempre muestra toasts de error cuando algo falla
8. **Feedback inmediato**: Muestra toasts de éxito para confirmar acciones importantes
9. **Usa categorías**: Organiza los mensajes por categorías (auth, crud, form, etc.)

## Ejemplos de Uso en el Proyecto

### Autenticación
```typescript
function LoginComponent() {
  const showToast = useShowToast();

  const handleLogin = async () => {
    try {
      await login();
      showToast.success(toastMessages.auth.loginSuccess);
    } catch (error) {
      if (error.code === 'INVALID_CREDENTIALS') {
        showToast.error(toastMessages.auth.loginInvalidCredentials);
      } else {
        showToast.error(toastMessages.auth.loginConnectionError);
      }
    }
  };

  return <button onClick={handleLogin}>Iniciar Sesión</button>;
}
```

### Operaciones CRUD
```typescript
function ItemManager() {
  const showToast = useShowToast();

  const createItem = async (data: any) => {
    try {
      await api.createItem(data);
      showToast.success(toastMessages.crud.createSuccess);
    } catch (error) {
      showToast.error(toastMessages.crud.createError);
    }
  };

  const updateItem = async (id: string, data: any) => {
    try {
      await api.updateItem(id, data);
      showToast.success(toastMessages.crud.updateSuccess);
    } catch (error) {
      showToast.error(toastMessages.crud.updateError);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await api.deleteItem(id);
      showToast.success(toastMessages.crud.deleteSuccess);
    } catch (error) {
      showToast.error(toastMessages.crud.deleteError);
    }
  };

  return (
    <div>
      <button onClick={() => createItem({})}>Crear</button>
      <button onClick={() => updateItem("1", {})}>Actualizar</button>
      <button onClick={() => deleteItem("1")}>Eliminar</button>
    </div>
  );
}
```

### Formularios
```typescript
function MyForm() {
  const { handleSubmit, formState: { errors } } = useForm();
  const showToast = useShowToast();

  const onSubmit = async (data: any) => {
    try {
      if (Object.keys(errors).length > 0) {
        showToast.error(toastMessages.form.validationError);
        return;
      }

      await saveData(data);
      showToast.success(toastMessages.form.saveSuccess);
    } catch (error) {
      showToast.error(toastMessages.form.saveError, error.message);
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* campos */}</form>;
}
```

### Archivos
```typescript
function FileUploader() {
  const showToast = useShowToast();

  const uploadFile = async (file: File) => {
    try {
      await upload(file);
      showToast.success(toastMessages.file.uploadSuccess);
    } catch (error) {
      showToast.error(toastMessages.file.uploadError);
    }
  };

  return <input type="file" onChange={(e) => uploadFile(e.target.files[0])} />;
}
```

### Convocatorias
```typescript
function ConvocatoriasManager() {
  const showToast = useShowToast();

  const syncConvocatorias = async () => {
    try {
      await sync();
      showToast.success(toastMessages.convocatorias.syncSuccess);
    } catch (error) {
      showToast.error(toastMessages.convocatorias.syncError);
    }
  };

  return <button onClick={syncConvocatorias}>Sincronizar</button>;
}
```

## Solución de Problemas

### El toast no aparece
1. Verifica que el `ToastProvider` esté configurado en el layout
2. Asegúrate de usar el hook `useShowToast` dentro de un componente React
3. Verifica que no haya errores en la consola

### Toasts duplicados
1. Asegúrate de usar el hook `useShowToast` en lugar de funciones globales
2. Verifica que no estés llamando la función múltiples veces en el mismo evento
3. Usa `useCallback` para funciones que se pasan como props

### Estilos no se aplican
1. Verifica que los estilos estén definidos en `toast-styles.ts`
2. Asegúrate de que las variantes de color y estilo sean correctas
3. Verifica que Tailwind CSS esté configurado correctamente 