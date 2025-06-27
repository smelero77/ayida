"use client"

import { addToast } from "@heroui/react"

// Hook personalizado que usa el toast de HeroUI correctamente
export function useShowToast() {
  return {
    success: (title: string, description?: string) => {
      addToast({
        title,
        description,
        color: "success",
        variant: "flat",
        radius: "md",
        shadow: "md",
        timeout: 5000,
      })
    },

    error: (title: string, description?: string) => {
      addToast({
        title,
        description,
        color: "danger",
        variant: "flat",
        radius: "md",
        shadow: "md",
        timeout: 7000,
      })
    },

    info: (title: string, description?: string) => {
      addToast({
        title,
        description,
        color: "primary",
        variant: "flat",
        radius: "md",
        shadow: "md",
        timeout: 5000,
      })
    },

    warning: (title: string, description?: string) => {
      addToast({
        title,
        description,
        color: "warning",
        variant: "flat",
        radius: "md",
        shadow: "md",
        timeout: 6000,
      })
    },

    loading: (title: string, description?: string) => {
      return addToast({
        title,
        description,
        color: "default",
        variant: "flat",
        radius: "md",
        shadow: "md",
        timeout: 0,
      })
    },

    custom: (options: {
      title: string
      description?: string
      color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
      variant?: "solid" | "bordered" | "flat"
      radius?: "none" | "sm" | "md" | "lg" | "full"
      shadow?: "none" | "sm" | "md" | "lg"
      timeout?: number
      hideIcon?: boolean
      closeIcon?: React.ReactNode
    }) => {
      return addToast({
        title: options.title,
        description: options.description,
        color: options.color || "default",
        variant: options.variant || "flat",
        radius: options.radius || "md",
        shadow: options.shadow || "md",
        timeout: options.timeout || 5000,
        hideIcon: options.hideIcon || false,
        closeIcon: options.closeIcon,
      })
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