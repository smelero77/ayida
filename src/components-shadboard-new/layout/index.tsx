"use client"

import type { DictionaryType } from "@/lib-shadboard-new/get-dictionary"
import type { ReactNode } from "react"

import { useIsVertical } from "@/hooks-shadboard-new/use-is-vertical"
import { Customizer } from "./customizer"
import { HorizontalLayout } from "./horizontal-layout"
import { VerticalLayout } from "./vertical-layout"
import { Toaster } from "@/components-shadboard-new/ui/sonner"

export function Layout({
  children,
  dictionary,
}: {
  children: ReactNode
  dictionary: DictionaryType
}) {
  const isVertical = useIsVertical()

  return (
    <>
      <Customizer />
      {/* If the layout is vertical, render a vertical layout; otherwise, render a horizontal layout */}
      {isVertical ? (
        <VerticalLayout dictionary={dictionary}>{children}</VerticalLayout>
      ) : (
        <HorizontalLayout dictionary={dictionary}>{children}</HorizontalLayout>
      )}
      <Toaster />
    </>
  )
}
