"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Search, 
  Bell, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users,
  Target,
  Award
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: Search,
    title: "Búsqueda Inteligente",
    description: "Algoritmos avanzados que encuentran las subvenciones más relevantes para tu proyecto específico.",
    color: "blue"
  },
  {
    icon: Bell,
    title: "Alertas Personalizadas",
    description: "Recibe notificaciones en tiempo real cuando se publiquen convocatorias que coincidan con tus criterios.",
    color: "purple"
  },
  {
    icon: TrendingUp,
    title: "Análisis de Tendencias",
    description: "Visualiza patrones y tendencias en las subvenciones para tomar decisiones estratégicas.",
    color: "green"
  },
  {
    icon: Shield,
    title: "Verificación Automática",
    description: "Sistema automático que verifica la elegibilidad y requisitos de cada convocatoria.",
    color: "orange"
  },
  {
    icon: Zap,
    title: "Procesamiento Rápido",
    description: "Acceso instantáneo a miles de convocatorias con búsquedas que se completan en segundos.",
    color: "red"
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Conecta con otros emprendedores y comparte experiencias sobre subvenciones.",
    color: "indigo"
  }
];

const colorClasses = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  indigo: "bg-indigo-500"
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
            ¿Por qué elegir{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              zétika.app?
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 px-4 sm:px-6 leading-relaxed">
            Herramientas avanzadas diseñadas para maximizar tus posibilidades de éxito
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="group relative"
              variants={fadeInUp}
            >
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full">
                {/* Icon */}
                <div className={`${colorClasses[feature.color as keyof typeof colorClasses]} w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 lg:mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-1 sm:mb-2 lg:mb-3">99.9%</div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-600">Precisión</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-1 sm:mb-2 lg:mb-3">24/7</div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-600">Disponibilidad</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-1 sm:mb-2 lg:mb-3">50K+</div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-600">Convocatorias</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 mb-1 sm:mb-2 lg:mb-3">10K+</div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-600">Usuarios</div>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-5 sm:left-10 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl"
        style={{ willChange: 'transform' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-5 sm:right-10 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl"
        style={{ willChange: 'transform' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
} 