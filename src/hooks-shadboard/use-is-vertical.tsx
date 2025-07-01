"use client"

import { useSettings } from "@/hooks-shadboard/use-settings"

export function useIsVertical() {
  const { settings } = useSettings()

  return settings.layout === "vertical"
}
