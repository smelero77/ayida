"use client"

import { createContext, useCallback, useEffect, useState } from "react"
import { useCookie } from "react-use"

import type { LocaleType, SettingsType } from "@/types"
import type { ReactNode } from "react"

export const defaultSettings: SettingsType = {
  theme: "zinc",
  mode: "system",
  radius: 0.5,
  layout: "vertical",
  locale: "en",
}

export const SettingsContext = createContext<
  | {
      settings: SettingsType
      updateSettings: (newSettings: SettingsType) => void
      resetSettings: () => void
    }
  | undefined
>(undefined)

export function SettingsProvider({
  locale,
  children,
}: {
  locale: LocaleType
  children: ReactNode
}) {
  const [storedSettings, setStoredSettings, deleteStoredSettings] =
    useCookie("settings")
  const [settings, setSettings] = useState<SettingsType | null>(null)

  useEffect(() => {
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings) as SettingsType
        setSettings(parsedSettings)
      } catch (error) {
        console.error("Error parsing stored settings:", error)
        setSettings({ ...defaultSettings, locale })
      }
    } else {
      setSettings({ ...defaultSettings, locale })
    }
  }, [storedSettings, locale])

  const updateSettings = useCallback(
    (newSettings: SettingsType) => {
      setStoredSettings(JSON.stringify(newSettings))
      setSettings(newSettings)
    },
    [setStoredSettings]
  )

  const resetSettings = useCallback(() => {
    deleteStoredSettings()
    setSettings(defaultSettings)
  }, [deleteStoredSettings])

  // Render children only when settings are ready
  if (!settings) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  )
} 