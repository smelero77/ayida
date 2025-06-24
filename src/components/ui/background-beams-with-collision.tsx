"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

export const BackgroundBeamsWithCollision = ({
  className,
}: {
  className?: string;
}) => {
  const beams = [
    { initialX: 100, translateX: 100, duration: 5, delay: 0 },
    { initialX: 300, translateX: 300, duration: 7, delay: 1 },
    { initialX: 500, translateX: 500, duration: 6, delay: 2 },
    { initialX: 700, translateX: 700, duration: 8, delay: 3 },
  ];

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex flex-col w-full justify-center overflow-hidden",
        className
      )}
    >
      {beams.map((beam, index) => (
        <motion.div
          key={index}
          className="absolute left-0 top-0 m-auto h-20 w-1 rounded-full bg-gradient-to-t from-blue-500 via-purple-500 to-transparent shadow-lg shadow-blue-500/50"
          animate={{
            translateY: ["-100px", "800px"],
            translateX: [beam.initialX + "px", beam.translateX + "px"],
          }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: beam.delay,
          }}
        />
      ))}

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
}; 