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
  Mail
} from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEmailTest, setShowEmailTest] = useState(false);

  const stats = [
    {
      title: "Convocatorias Activas",
      value: "1,247",
      change: "+12.5%",
      changeType: "positive",
      icon: Search,
      color: "text-blue-600"
    },
    {
      title: "Alertas Nuevas",
      value: "23",
      change: "+8.2%",
      changeType: "positive",
      icon: Bell,
      color: "text-green-600"
    },
    {
      title: "Tasa de Éxito",
      value: "89.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Usuarios Activos",
      value: "2,847",
      change: "+15.3%",
      changeType: "positive",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      title: "Nueva convocatoria publicada",
      description: "Subvención para empresas tecnológicas",
      time: "Hace 2 horas",
      type: "convocatoria"
    },
    {
      title: "Alerta personalizada activada",
      description: "Coincidencia encontrada para tu perfil",
      time: "Hace 4 horas",
      type: "alerta"
    },
    {
      title: "Solicitud enviada",
      description: "Proyecto de innovación digital",
      time: "Hace 1 día",
      type: "solicitud"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowEmailTest(!showEmailTest)}
              className="hidden sm:flex"
            >
              <Mail className="w-4 h-4 mr-2" />
              Probar Email
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Bell className="w-4 h-4 mr-2" />
              Notificaciones
            </Button>
            <Button size="sm">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="p-4 space-y-2">
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md">
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              <Search className="w-5 h-5 mr-3" />
              Convocatorias
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              <Bell className="w-5 h-5 mr-3" />
              Alertas
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              <Target className="w-5 h-5 mr-3" />
              Proyectos
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              <Users className="w-5 h-5 mr-3" />
              Usuarios
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
              <DollarSign className="w-5 h-5 mr-3" />
              Financiación
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Email Test Section */}
          {showEmailTest && (
            <div className="mb-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Prueba del Servicio de Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EmailTest />
                </CardContent>
              </Card>
              
              <EmailDebug />
            </div>
          )}

          <ResponsiveContainer>
            {/* Stats Grid */}
            <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 4 }} gap="lg" className="mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm sm:text-base text-gray-600 font-medium">{stat.title}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} vs mes anterior
                        </p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ResponsiveGrid>

            {/* Charts and Activities Grid */}
            <ResponsiveGrid cols={{ mobile: 1, tablet: 1, desktop: 2 }} gap="lg" className="mb-8">
              {/* Chart Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Tendencias de Convocatorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 sm:h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <PieChart className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-sm">Gráfico de tendencias</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Activity className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ResponsiveGrid>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveGrid cols={{ mobile: 2, tablet: 3, desktop: 4 }} gap="md">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Search className="w-6 h-6" />
                    <span className="text-sm">Buscar Convocatorias</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Bell className="w-6 h-6" />
                    <span className="text-sm">Configurar Alertas</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Calendar className="w-6 h-6" />
                    <span className="text-sm">Ver Calendario</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Target className="w-6 h-6" />
                    <span className="text-sm">Nuevo Proyecto</span>
                  </Button>
                </ResponsiveGrid>
              </CardContent>
            </Card>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
} 