"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import { GradientButton } from "@/components/ui/gradient-button";
import { Logo } from "@/components/ui/logo";
import { TextWithUnderline } from "@/components/ui/TextWithUnderline";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const textRef = useRef<HTMLSpanElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState('95%');

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const containerWidth = textRef.current.parentElement?.offsetWidth || 0;
      const percentage = (textWidth / containerWidth) * 100 * 0.8; // 80% del ancho del texto
      setUnderlineWidth(`${percentage}%`);
    }
  }, []);

  // Fallback si el cálculo no funciona
  const finalWidth = underlineWidth === '95%' ? '80%' : underlineWidth;

  return (
    <div
      className={cn(
        "min-h-screen bg-[rgb(255,245,244)] relative flex flex-col w-full items-center overflow-hidden pt-20 sm:pt-24 lg:pt-28"
      )}
    >
      <div className="relative z-10 container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 lg:space-y-8 text-center">
          <h1 className="font-rubik text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-0 sm:mb-4 lg:mb-6" style={{ 
            color: 'rgb(0, 22, 46)',
            marginTop: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            textAlign: 'center',
            display: 'block',
            position: 'relative',
            zIndex: 1
          }}>
            <span className="block sm:hidden mb-1">No es magia. Es tu agente.</span>
            <span className="block sm:hidden mb-1">Y viene a cambiar.</span>
            <span className="hidden sm:block">No es magia. Es tu Agente.</span>
          </h1>
          
          {/* Texto con subrayado para móvil */}
          <div className="sm:hidden">
            <span className="relative block w-full mb-1">
              <span
                className="relative z-10 font-rubik text-2xl font-bold leading-tight text-center w-full block"
                style={{ position: 'relative', display: 'block', width: '100%' }}
              >
                las reglas del
              </span>
              <span
                className="absolute left-0 right-0 bottom-1 h-[0.7em] z-0"
                style={{
                  backgroundImage: "url('/images/commons/underline.svg')",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                  width: '100%',
                  height: '0.7em',
                  display: 'block',
                }}
              />
            </span>
            <span className="relative block w-full mb-1">
              <span
                className="relative z-10 font-rubik text-2xl font-bold leading-tight text-center w-full block"
                style={{ position: 'relative', display: 'block', width: '100%' }}
              >
                juego.
              </span>
              <span
                className="absolute bottom-1 h-[0.7em] z-0"
                style={{
                  backgroundImage: "url('/images/commons/underline.svg')",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                  width: '6.5em',
                  height: '0.7em',
                  display: 'block',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
            </span>
          </div>
          
          {/* Texto con subrayado para tablet y desktop */}
          <span className="relative block w-full mb-4 sm:mb-6 lg:mb-8 hidden sm:block">
            <span
              ref={textRef}
              className="relative z-10 font-rubik text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-center w-full block"
              style={{ position: 'relative', display: 'block', width: '100%' }}
            >
              Y viene a cambiar las reglas del juego.
            </span>
            <span
              className="absolute bottom-1 h-[1.1em] z-0"
              style={{
                backgroundImage: "url('/images/commons/underline.svg')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: finalWidth,
                height: '1.1em',
                display: 'block',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </span>
          
          <p className="max-w-[600px] text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl mx-auto px-4 sm:px-6 leading-relaxed" style={{
            fontFamily: 'Inter, sans-serif'
          }}>
            ZÉTIKA busca, filtra y predice las ayudas que mejor encajan contigo. Sin esfuerzo. Sin perder tiempo.
          </p>
          
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 min-[400px]:flex-row justify-center w-full max-w-md sm:max-w-lg lg:max-w-none">
            <GradientButton size="lg" variant="primary" className="sm:w-auto mx-auto touch-target">
              Comenzar Gratis
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </GradientButton>
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-center mt-4 sm:mt-6 lg:mt-8 pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl lg:max-w-7xl">
          <Image
            src="/dashboard-new.webp"
            alt="Dashboard preview"
            width={1600}
            height={800}
            className="rounded-xl sm:rounded-2xl shadow-xl border object-contain w-full h-auto aspect-[2/1]"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          />
        </div>
      </div>
    </div>
  );
} 