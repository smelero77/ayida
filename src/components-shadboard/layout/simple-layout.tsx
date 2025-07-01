"use client"

import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components-shadboard/ui/sidebar"
import { SettingsProvider } from "@/contexts-shadboard/settings-context"
import { SidebarSimple } from "./sidebar-simple"
import { VerticalLayoutHeader } from "./vertical-layout/vertical-layout-header"
import type { DictionaryType } from "@/lib-shadboard/get-dictionary"

interface SimpleLayoutProps {
  children: ReactNode
  dictionary: DictionaryType
}

export function SimpleLayout({ children, dictionary }: SimpleLayoutProps) {
  return (
    <SettingsProvider locale="en">
      <SidebarProvider>
        <SidebarSimple />
        <SidebarInset>
          <VerticalLayoutHeader dictionary={dictionary} />
          <main className="min-h-[calc(100vh-3.5rem)] bg-background">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </SettingsProvider>
  )
} 