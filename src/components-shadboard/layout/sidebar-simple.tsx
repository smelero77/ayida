"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, FileText, Users, BarChart3, Settings } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarWrapper,
  useSidebar,
} from "@/components-shadboard/ui/sidebar"

// Datos de navegación adaptados para el proyecto de convocatorias
const navigationData = [
  {
    title: "Principal",
    items: [
      {
        title: "Convocatorias",
        href: "/convocatorias",
        icon: FileText,
      },
      {
        title: "Búsqueda",
        href: "/busqueda",
        icon: Search,
      },
    ],
  },
  {
    title: "Gestión",
    items: [
      {
        title: "Usuarios",
        href: "/usuarios",
        icon: Users,
      },
      {
        title: "Estadísticas",
        href: "/estadisticas",
        icon: BarChart3,
      },
      {
        title: "Configuración",
        href: "/configuracion",
        icon: Settings,
      },
    ],
  },
]

export function SidebarSimple() {
  const pathname = usePathname()
  const { openMobile, setOpenMobile } = useSidebar()

  const renderMenuItem = (item: any) => {
    const Icon = item.icon
    const isActive = pathname === item.href

    return (
      <SidebarMenuButton
        isActive={isActive}
        onClick={() => setOpenMobile(!openMobile)}
        asChild
      >
        <Link href={item.href}>
          <Icon className="h-4 w-4" />
          <span>{item.title}</span>
          {item.label && <Badge variant="secondary">{item.label}</Badge>}
        </Link>
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarWrapper>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground font-bold p-2 pb-0 mb-2"
          onClick={() => setOpenMobile(!openMobile)}
        >
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <span>Ayida Portal</span>
        </Link>
      </SidebarHeader>
      <ScrollArea>
        <SidebarContent className="gap-0">
          {navigationData.map((nav) => (
            <SidebarGroup key={nav.title}>
              <SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      {renderMenuItem(item)}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </ScrollArea>
    </SidebarWrapper>
  )
} 