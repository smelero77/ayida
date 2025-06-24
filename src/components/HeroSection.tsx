"use client";

import { Button } from './ui/button';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  // Renderizado estático durante SSR
  if (!mounted) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-white px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido principal */}
            <div>
              <h1 className="font-sora font-bold text-[3rem] leading-tight text-[#1E2A38] mb-6">
                La plataforma tecnológica más completa para 
                <span className="text-[#4ADE80]"> subvenciones</span> en España
              </h1>
              
              <p className="font-inter text-[1.25rem] text-[#6B7280] mb-8 leading-relaxed">
                Más de 47.000 ayudas públicas al alcance de tu mano. 
                Busca, gestiona y solicita con tecnología de vanguardia e inteligencia artificial.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button className="bg-[#4ADE80] hover:bg-green-500 text-white px-8 py-4 text-lg font-inter font-medium">
                  Explorar Plataforma
                </Button>
                <Button variant="outline" className="border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50 px-8 py-4 text-lg font-inter font-medium">
                  Ver Demo
                </Button>
              </div>

              {/* Métricas estáticas */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="font-sora font-bold text-[2rem] md:text-[3rem] text-[#1E2A38] mb-2">47K+</div>
                  <div className="font-inter text-[#6B7280] text-sm">Ayudas Disponibles</div>
                </div>
                <div className="text-center">
                  <div className="font-sora font-bold text-[2rem] md:text-[3rem] text-[#1E2A38] mb-2">10K+</div>
                  <div className="font-inter text-[#6B7280] text-sm">Usuarios Activos</div>
                </div>
                <div className="text-center">
                  <div className="font-sora font-bold text-[2rem] md:text-[3rem] text-[#1E2A38] mb-2">95%</div>
                  <div className="font-inter text-[#6B7280] text-sm">Tasa de Éxito</div>
                </div>
              </div>
            </div>

            {/* Avatar estático */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#4ADE80]/20 to-[#22C55E]/20 rounded-full blur-xl opacity-75"></div>
                <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-[#4ADE80] to-[#22C55E] p-2">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <div className="w-64 h-64 bg-gradient-to-br from-[#1E2A38] to-[#374151] rounded-full flex items-center justify-center">
                      <div className="text-6xl">🤖</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="font-sora font-medium text-[#1E2A38] mb-1">Zian IA</p>
                  <p className="font-inter text-sm text-[#6B7280]">Tu asistente inteligente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-white px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido principal */}
          <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-sora font-bold text-[3rem] leading-tight text-[#1E2A38] mb-6">
              La plataforma tecnológica más completa para 
              <span className="text-[#4ADE80]"> subvenciones</span> en España
            </h1>
            
            <p className="font-inter text-[1.25rem] text-[#6B7280] mb-8 leading-relaxed">
              Más de 47.000 ayudas públicas al alcance de tu mano. 
              Busca, gestiona y solicita con tecnología de vanguardia e inteligencia artificial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="bg-[#4ADE80] hover:bg-green-500 text-white px-8 py-4 text-lg font-inter font-medium transition-all duration-200 hover:scale-[1.02] ripple-effect">
                Explorar Plataforma
              </Button>
              <Button variant="outline" className="border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50 px-8 py-4 text-lg font-inter font-medium">
                Ver Demo
              </Button>
            </div>

            {/* Métricas animadas */}
            <MetricsSection />
          </div>

          {/* Avatar de Zian */}
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ZianAvatar />
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const [counters, setCounters] = useState([0, 0, 0]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [mounted, setMounted] = useState(false);

  const metrics = [
    { value: 47000, label: "Ayudas Disponibles", suffix: "+" },
    { value: 10000, label: "Usuarios Activos", suffix: "+" },
    { value: 95, label: "Tasa de Éxito", suffix: "%" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !isAnimated) {
          setIsAnimated(true);
          // Animar contadores con stagger
          metrics.forEach((metric, index) => {
            setTimeout(() => {
              animateCounter(index, metric.value);
            }, index * 200);
          });
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('metrics');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [isAnimated, mounted]);

  const animateCounter = (index: number, targetValue: number) => {
    const duration = 2000;
    const steps = 60;
    const stepValue = targetValue / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentValue = Math.min(stepValue * currentStep, targetValue);
      
      setCounters(prev => {
        const newCounters = [...prev];
        newCounters[index] = Math.floor(currentValue);
        return newCounters;
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
  };

  if (!mounted) {
    return (
      <div className="grid grid-cols-3 gap-8">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="font-sora font-bold text-[2rem] md:text-[3rem] text-[#1E2A38] mb-2">
              {metric.value.toLocaleString()}{metric.suffix}
            </div>
            <div className="font-inter text-[#6B7280] text-sm">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div id="metrics" className="grid grid-cols-3 gap-8">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`text-center transition-all duration-800 ${isAnimated ? 'animate-count-up' : 'opacity-0'}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="font-sora font-bold text-[2rem] md:text-[3rem] text-[#1E2A38] mb-2">
            {counters[index].toLocaleString()}{metric.suffix}
          </div>
          <div className="font-inter text-[#6B7280] text-sm">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ZianAvatar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#4ADE80]/20 to-[#22C55E]/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Avatar container */}
      <div className={`relative w-80 h-80 rounded-full bg-gradient-to-br from-[#4ADE80] to-[#22C55E] p-2 transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
          {/* Avatar de Zian - Puedes reemplazar esto con una imagen real */}
          <div className="w-64 h-64 bg-gradient-to-br from-[#1E2A38] to-[#374151] rounded-full flex items-center justify-center">
            <div className="text-6xl">🤖</div>
          </div>
        </div>
        
        {/* Floating elements */}
        <FloatingElements />
      </div>
      
      {/* Texto del avatar */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="font-sora font-medium text-[#1E2A38] mb-1">Zian IA</p>
        <p className="font-inter text-sm text-[#6B7280]">Tu asistente inteligente</p>
      </div>
    </div>
  );
}

function FloatingElements() {
  return (
    <>
      {/* Elementos flotantes */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-[#4ADE80] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-8 left-4 w-6 h-6 bg-[#22C55E] rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 left-2 w-4 h-4 bg-[#4ADE80] rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
    </>
  );
}
