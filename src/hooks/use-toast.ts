"use client"

import { useToast as useHeroToast } from "@heroui/react"

export function useToast() {
  const { toast } = useHeroToast()
  return { toast }
} 