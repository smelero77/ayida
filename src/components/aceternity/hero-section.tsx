"use client";
import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

// Carga dinámica del componente de haces animados
const AnimatedBeams = dynamic(
  () => import('@/components/ui/animated-beams'),
  { 
    ssr: false, // Desactiva el renderizado en servidor para este componente
    loading: () => (
      // Fallback mientras se carga la animación
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800" />
    )
  }
);

export default function HeroSection() {
  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex flex-col w-full justify-center overflow-hidden"
      )}
    >
      {/* Componente animado cargado dinámicamente */}
      <AnimatedBeams />

      <div className="relative z-10 container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge variant="secondary" className="w-fit mx-auto">
            Nuevo: Portal de Ayudas Publicas
          </Badge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Descubre y Gestiona Ayudas Publicas de Forma Inteligente
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
            ZETIKA te conecta con todas las convocatorias y ayudas publicas disponibles. 
            Optimiza tu busqueda, automatiza el seguimiento y maximiza tus oportunidades de financiacion.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button size="lg" className="h-12 px-8 bg-[#4ADE80] hover:bg-[#22C55E]">
              Comenzar Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 bg-white text-black">
              Ver Demo
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              14 dias gratis
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Sin tarjeta de credito
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-8 pb-8">
        <div className="w-full max-w-7xl px-4">
          <Image
            src="/dashboard-new.webp"
            alt="Dashboard preview"
            width={1600}
            height={800}
            className="rounded-xl shadow-xl border object-contain w-full h-auto aspect-[2/1]"
            priority
          />
        </div>
      </div>
    </div>
  );
} 