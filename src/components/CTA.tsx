"use client";
import { Button } from './ui/button';

export default function CTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            ¿Listo para encontrar tu <span className="text-zetika-green">subvención ideal</span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Únete a más de 10.000 empresas que ya utilizan ZÉTIKA para encontrar 
            financiación entre las +47.000 ayudas disponibles.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Para Emprendedores</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">Búsqueda gratuita y alertas personalizadas</p>
              <Button className="bg-zetika-green text-slate-900 hover:bg-green-400 w-full" size="sm">
                Empezar Gratis
              </Button>
            </div>
            
            <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-zetika-green/30 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-zetika-green text-slate-900 px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                  MÁS POPULAR
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Para Empresas</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">ERP, marca blanca y herramientas avanzadas</p>
              <Button className="bg-zetika-green text-slate-900 hover:bg-green-400 w-full" size="sm">
                Ver Demo
              </Button>
            </div>
            
            <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Para Gestores</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">Marketplace y herramientas profesionales</p>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full" size="sm">
                Acceder a Pro
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              ¿Necesitas algo específico? 
              <button className="text-zetika-green hover:text-green-400 ml-1 font-medium">
                Contacta con nuestro equipo
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 