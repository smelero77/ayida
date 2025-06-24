"use client";
import { Store, GraduationCap, FileBarChart, Plug } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
          Servicios <span className="text-zetika-green">profesionales</span>
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Más allá de la búsqueda: servicios especializados para maximizar tu éxito
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="text-center p-8 rounded-xl bg-slate-900/50 hover:bg-slate-800/70 transition-all duration-300 border border-slate-700/50 hover:border-zetika-green/30">
              <div className="w-16 h-16 bg-zetika-green/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>
              <button className="text-zetika-green font-medium hover:text-green-400 transition-colors">
                Saber más →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Marketplace FANDIT",
    description: "Conecta con gestores especializados en subvenciones para obtener ayuda experta y personalizada.",
    icon: <Store className="w-8 h-8 text-zetika-green" />,
  },
  {
    title: "Formación y Asesoramiento",
    description: "Servicios de consultoría, capacitación sobre herramientas y estrategias de subvenciones.",
    icon: <GraduationCap className="w-8 h-8 text-zetika-green" />,
  },
  {
    title: "Estudios a Medida",
    description: "Informes y análisis personalizados para tu sector, región o tipo de proyecto específico.",
    icon: <FileBarChart className="w-8 h-8 text-zetika-green" />,
  },
  {
    title: "API e Integraciones",
    description: "Adapta nuestra tecnología a tus necesidades específicas con buscadores personalizados.",
    icon: <Plug className="w-8 h-8 text-zetika-green" />,
  },
]; 