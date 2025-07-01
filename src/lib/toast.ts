"use client"

import { toast } from "sonner"

// Hook personalizado que usa Sonner
export function useShowToast() {
  return {
    success: (title: string, description?: string) => {
      toast.success(title, {
        description,
        duration: 5000,
      })
    },

    error: (title: string, description?: string) => {
      toast.error(title, {
        description,
        duration: 7000,
      })
    },

    info: (title: string, description?: string) => {
      toast.info(title, {
        description,
        duration: 5000,
      })
    },

    warning: (title: string, description?: string) => {
      toast.warning(title, {
        description,
        duration: 6000,
      })
    },

    loading: (title: string, description?: string) => {
      return toast.loading(title, {
        description,
        duration: Infinity,
      })
    },

    custom: (options: {
      title: string
      description?: string
      type?: "success" | "error" | "info" | "warning" | "loading"
      duration?: number
      action?: {
        label: string
        onClick: () => void
      }
    }) => {
      const toastOptions = {
        description: options.description,
        duration: options.duration ?? 5000,
        action: options.action,
      }

      switch (options.type) {
        case "success":
          return toast.success(options.title, toastOptions)
        case "error":
          return toast.error(options.title, toastOptions)
        case "info":
          return toast.info(options.title, toastOptions)
        case "warning":
          return toast.warning(options.title, toastOptions)
        case "loading":
          return toast.loading(options.title, toastOptions)
        default:
          return toast(options.title, toastOptions)
      }
    }
  }
}

// Mensajes estándar para operaciones comunes
export const toastMessages = {
  // Autenticación
  auth: {
    loginSuccess: "Inicio de sesión exitoso",
    loginError: "Error al iniciar sesión",
    loginInvalidCredentials: "Credenciales incorrectas. Verifica tu email y contraseña.",
    loginConnectionError: "Error de conexión. Inténtalo de nuevo.",
    logoutSuccess: "Sesión cerrada correctamente",
    registerSuccess: "Registro exitoso",
    registerError: "Error en el registro",
    registerCreateAccountError: "Error al crear la cuenta",
    autoLoginError: "Error al iniciar sesión automáticamente. Por favor, inicia sesión manualmente.",
    googleSignInError: "Error al iniciar sesión con Google",
    googleSignUpError: "Error al registrarse con Google",
  },

  // Operaciones CRUD
  crud: {
    createSuccess: "Elemento creado correctamente",
    createError: "Error al crear el elemento",
    updateSuccess: "Elemento actualizado correctamente",
    updateError: "Error al actualizar el elemento",
    deleteSuccess: "Elemento eliminado correctamente",
    deleteError: "Error al eliminar el elemento",
    loadError: "Error al cargar los datos",
  },

  // Formularios
  form: {
    validationError: "Por favor, revisa los campos marcados",
    saveSuccess: "Datos guardados correctamente",
    saveError: "Error al guardar los datos",
  },

  // Archivos
  file: {
    uploadSuccess: "Archivo subido correctamente",
    uploadError: "Error al subir el archivo",
    downloadSuccess: "Descarga iniciada",
    downloadError: "Error al descargar el archivo",
  },

  // Convocatorias
  convocatorias: {
    syncSuccess: "Sincronización completada",
    syncError: "Error en la sincronización",
    searchSuccess: "Búsqueda completada",
    searchError: "Error en la búsqueda",
  },

  // Errores generales
  general: {
    connectionError: "Error de conexión. Inténtalo de nuevo.",
    unexpectedError: "Ha ocurrido un error inesperado.",
    networkError: "Error de red. Verifica tu conexión.",
  },
} 