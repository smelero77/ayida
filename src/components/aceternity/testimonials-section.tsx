"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    name: "María García",
    role: "CEO, TechStart",
    content: "Ayida Portal revolucionó nuestra búsqueda de financiación. Encontramos 3 subvenciones perfectas para nuestro proyecto de IA en solo una semana.",
    rating: 5,
    avatar: "MG"
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Innovación, GreenEnergy",
    content: "La precisión de las búsquedas es increíble. Nos ahorró semanas de trabajo manual y nos permitió enfocarnos en lo importante: nuestro negocio.",
    rating: 5,
    avatar: "CR"
  },
  {
    name: "Ana Martínez",
    role: "Fundadora, BioTech Solutions",
    content: "Las alertas personalizadas nos mantienen siempre al día. Nunca más nos perderemos una oportunidad importante de financiación.",
    rating: 5,
    avatar: "AM"
  },
  {
    name: "David López",
    role: "CTO, DigitalFactory",
    content: "La interfaz es intuitiva y las funcionalidades avanzadas nos dan una ventaja competitiva real en el mercado.",
    rating: 5,
    avatar: "DL"
  },
  {
    name: "Laura Fernández",
    role: "Directora de Proyectos, EcoInnovate",
    content: "Gracias a Ayida Portal conseguimos financiación para 5 proyectos diferentes. Es una herramienta indispensable para cualquier empresa.",
    rating: 5,
    avatar: "LF"
  },
  {
    name: "Roberto Sánchez",
    role: "CEO, SmartManufacturing",
    content: "El análisis de tendencias nos ayudó a identificar las mejores oportunidades del mercado. ROI increíble en muy poco tiempo.",
    rating: 5,
    avatar: "RS"
  }
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              usuarios
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Miles de empresas confían en Ayida Portal para encontrar las mejores oportunidades de financiación
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="group relative"
              initial={{ opacity: 0, y: 20, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200 relative overflow-hidden">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              4.9/5 de más de 10,000 usuarios
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/3 left-5 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-5 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
} 