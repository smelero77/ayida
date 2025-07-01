"use client"

import { Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components-shadboard/ui/sidebar"
import { ToggleMobileSidebar } from "../toggle-mobile-sidebar"

export function VerticalLayoutHeaderSimple() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-sidebar-border">
      <div className="container flex h-14 justify-between items-center gap-4">
        <ToggleMobileSidebar />
        <div className="grow flex justify-end gap-2">
          <SidebarTrigger className="hidden lg:flex lg:me-auto">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
          
          {/* Notificaciones */}
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Usuario */}
          <Button variant="ghost" size="sm" className="p-2">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
} 