"use client"

import { useSettings } from "@/hooks-shadboard/use-settings"

export function useRadius() {
  const { settings } = useSettings()

  return settings.radius
}
