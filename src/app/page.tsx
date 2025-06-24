"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,
  BarChart3,
  Star,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Search,
  TrendingUp,
  Home,
  DollarSign,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { FloatingNav } from "@/components/floating-navbar"
import HeroSection from "@/components/aceternity/hero-section"

const navItems = [
  {
    name: "Inicio",
    link: "#home",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Caracteristicas",
    link: "#features",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    name: "Testimonios",
    link: "#testimonials",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    name: "Precios",
    link: "#pricing",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    name: "Contacto",
    link: "#contact",
    icon: <Users className="h-4 w-4" />,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav navItems={navItems} />

      <main className="pt-16">
        <section id="home">
          <HeroSection />
        </section>

        <section id="features" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Caracteristicas</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Todo lo que necesitas para gestionar ayudas publicas
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubre lo que nuestros clientes dicen sobre ZETIKA
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg">
                    "ZETIKA ha revolucionado como gestionamos las ayudas publicas. Hemos visto un 40% de aumento en 
                    nuestras solicitudes aprobadas desde que lo implementamos."
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold">Maria Garcia</div>
                    <div className="text-sm text-muted-foreground">CEO, TechCorp Espana</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg">
                    "Las funciones de busqueda son increibles. Lo que antes nos llevaba horas ahora es automatico. 
                    Un cambio total!"
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold">Carlos Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Director de Operaciones, StartupXYZ</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg">
                    "Soporte excepcional e interfaz intuitiva. Nuestro equipo estuvo funcionando en poco tiempo."
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold">Ana Martinez</div>
                    <div className="text-sm text-muted-foreground">Directora de Proyectos, DesignStudio</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Precios</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Precios simples y transparentes</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Elige el plan que mejor se adapte a tu equipo
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Basico</CardTitle>
                  <CardDescription>Perfecto para pequenas empresas que estan empezando</CardDescription>
                  <div className="text-3xl font-bold">
                    €29<span className="text-lg font-normal text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Hasta 5 usuarios
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Busqueda basica
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Soporte por email
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      5GB de almacenamiento
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Comenzar
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-[#4ADE80]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Profesional</CardTitle>
                    <Badge className="bg-[#4ADE80] text-white">Mas Popular</Badge>
                  </div>
                  <CardDescription>Ideal para empresas en crecimiento</CardDescription>
                  <div className="text-3xl font-bold">
                    €79<span className="text-lg font-normal text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Hasta 25 usuarios
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Busqueda avanzada
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Soporte prioritario
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      50GB de almacenamiento
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Dashboard de analytics
                    </li>
                  </ul>
                  <Button className="w-full bg-[#4ADE80] hover:bg-[#22C55E]">Comenzar</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Empresa</CardTitle>
                  <CardDescription>Para grandes organizaciones</CardDescription>
                  <div className="text-3xl font-bold">
                    €199<span className="text-lg font-normal text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Usuarios ilimitados
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Busqueda con IA
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Soporte 24/7
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Almacenamiento ilimitado
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Integraciones personalizadas
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Contactar Ventas
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Listo para optimizar tu busqueda de ayudas?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Unete a miles de empresas que han transformado su gestion de ayudas publicas con ZETIKA
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="h-12 px-8 bg-[#4ADE80] hover:bg-[#22C55E]">
                  Comenzar Prueba Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 bg-white text-black">
                  Programar Demo
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  14 dias de prueba gratis
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Cancelar cuando quieras
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Configuracion en minutos
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t bg-muted/50">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4ADE80]">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ZETIKA</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Optimiza tu busqueda de ayudas publicas y maximiza tus oportunidades de financiacion con nuestra plataforma inteligente.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                    Caracteristicas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                    Integraciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-[#4ADE80]">
                    Prensa
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">hola@zetika.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">+34 900 123 456</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">Madrid, Espana</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ZETIKA. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 text-xs text-muted-foreground mt-4 sm:mt-0">
              <Link href="#" className="hover:text-[#4ADE80]">
                Politica de Privacidad
              </Link>
              <Link href="#" className="hover:text-[#4ADE80]">
                Terminos de Servicio
              </Link>
              <Link href="#" className="hover:text-[#4ADE80]">
                Politica de Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
