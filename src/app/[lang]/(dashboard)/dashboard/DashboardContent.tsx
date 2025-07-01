"use client";

import { useState } from "react";
import { ResponsiveContainer, ResponsiveGrid } from "@/components/ui/responsive-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmailTest } from "@/components/ui/email-test";
import { EmailDebug } from "@/components/ui/email-debug";
import { 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Mail,
  Menu,
  X,
  Download,
  Plus,
  Settings,
  User,
  ChevronDown,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEmailTest, setShowEmailTest] = useState(false);

  const stats = [
    {
      title: "Convocatorias Activas",
      value: "1,247",
      change: "+12.5%",
      changeType: "positive",
      icon: Search,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Alertas Nuevas",
      value: "23",
      change: "+8.2%",
      changeType: "positive",
      icon: Bell,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Tasa de Éxito",
      value: "89.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Usuarios Activos",
      value: "2,847",
      change: "+15.3%",
      changeType: "positive",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentActivities = [
    {
      title: "Nueva convocatoria publicada",
      description: "Subvención para empresas tecnológicas",
      time: "Hace 2 horas",
      type: "convocatoria",
      avatar: "CN"
    },
    {
      title: "Alerta personalizada activada",
      description: "Coincidencia encontrada para tu perfil",
      time: "Hace 4 horas",
      type: "alerta",
      avatar: "AL"
    },
    {
      title: "Solicitud enviada",
      description: "Proyecto de innovación digital",
      time: "Hace 1 día",
      type: "solicitud",
      avatar: "SE"
    }
  ];

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, active: true },
    { name: "Convocatorias", icon: Search },
    { name: "Alertas", icon: Bell },
    { name: "Proyectos", icon: Target },
    { name: "Usuarios", icon: Users },
    { name: "Financiación", icon: DollarSign },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <SidebarTrigger />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Convocatorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Convocatorias Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +5.2% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,567</div>
            <p className="text-xs text-muted-foreground">
              +12.3% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,432</div>
            <p className="text-xs text-muted-foreground">
              +8.7% desde el mes pasado
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Convocatorias Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aquí se mostrarán las convocatorias más recientes...
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aquí se mostrará la actividad reciente...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 