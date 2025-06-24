"use client";

import { Search, Bot, BarChart3, Tag, TrendingUp, Bell } from "lucide-react";

export default function FeatureGrid() {
  return (
    <section id="features" className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <h2 className="font-sora font-bold text-[2.5rem] text-[#1E2A38] text-center mb-4">
          Tecnología de vanguardia para <span className="text-[#4ADE80]">subvenciones</span>
        </h2>
        <p className="font-inter text-[1.25rem] text-[#6B7280] text-center mb-16 max-w-3xl mx-auto">
          Una plataforma completa con herramientas profesionales, inteligencia artificial y más de 47.000 ayudas actualizadas
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-md hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#4ADE80]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-sora font-semibold text-[1.5rem] text-[#1E2A38] mb-4">
                {feature.title}
              </h3>
              <p className="font-inter text-[#111827] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Buscador Avanzado",
    description: "Encuentra entre +47.000 ayudas con filtros inteligentes por sector, tipo, región y más criterios específicos.",
    icon: <Search className="w-7 h-7 text-[#4ADE80]" />,
  },
  {
    title: "Asistente IA",
    description: "Inteligencia artificial especializada que responde todas tus preguntas sobre subvenciones en España.",
    icon: <Bot className="w-7 h-7 text-[#4ADE80]" />,
  },
  {
    title: "ERP de Subvenciones",
    description: "Sistema completo para gestores: organiza, planifica y ejecuta solicitudes de manera eficiente.",
    icon: <BarChart3 className="w-7 h-7 text-[#4ADE80]" />,
  },
  {
    title: "Marca Blanca",
    description: "Buscador personalizado con tu marca para empleados y clientes. Solución white-label completa.",
    icon: <Tag className="w-7 h-7 text-[#4ADE80]" />,
  },
  {
    title: "CRM de Análisis",
    description: "Gestiona y analiza tus clientes dentro de la plataforma para ofrecer servicios personalizados.",
    icon: <TrendingUp className="w-7 h-7 text-[#4ADE80]" />,
  },
  {
    title: "Alertas Inteligentes",
    description: "Notificaciones automáticas y resúmenes personalizados de nuevas ayudas según tus criterios.",
    icon: <Bell className="w-7 h-7 text-[#4ADE80]" />,
  },
];