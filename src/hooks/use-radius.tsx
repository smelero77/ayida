"use client"

import { useSettings } from "@/hooks/use-settings"

export function useRadius() {
  const { settings } = useSettings()

  return settings.radius
} 