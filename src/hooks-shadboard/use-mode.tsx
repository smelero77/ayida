"use client"

import { useMedia } from "react-use"

import { useSettings } from "@/hooks-shadboard/use-settings"

export function useMode() {
  const { settings } = useSettings()

  const systemTheme = useMedia("(prefers-color-scheme: dark)", false)

  if (settings.mode === "system") {
    return systemTheme ? "dark" : "light"
  }

  return settings.mode
}
