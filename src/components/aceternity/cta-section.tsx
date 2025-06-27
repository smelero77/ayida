"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, Shield } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { GradientButton } from "@/components/ui/gradient-button";

export default function CTASection() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-10 left-10 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 bg-white/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 bg-white/10 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            ¿Listo para transformar tu{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              financiación?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 lg:mb-12 max-w-2xl mx-auto px-4 sm:px-6 leading-relaxed"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Únete a miles de empresas que ya están aprovechando las mejores oportunidades de financiación
          </motion.p>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="flex items-center gap-2 sm:gap-3 text-white"
              variants={fadeInUp}
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-300 flex-shrink-0" />
              <span className="text-sm sm:text-base lg:text-lg">Acceso a 50,000+ convocatorias</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 sm:gap-3 text-white"
              variants={fadeInUp}
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-300 flex-shrink-0" />
              <span className="text-sm sm:text-base lg:text-lg">Búsquedas en tiempo real</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 sm:gap-3 text-white"
              variants={fadeInUp}
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-300 flex-shrink-0" />
              <span className="text-sm sm:text-base lg:text-lg">Verificación automática</span>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center mb-6 sm:mb-8 lg:mb-12"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <GradientButton size="lg" variant="primary" className="w-full sm:w-auto touch-target">
              Comenzar Gratis
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </GradientButton>
            <GradientButton size="lg" variant="secondary" className="w-full sm:w-auto touch-target">
              Ver Demo
            </GradientButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-8 text-blue-100 text-xs sm:text-sm lg:text-base"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Cancelación gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Soporte 24/7</span>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 lg:pt-8 border-t border-white/20"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 1 }}
          >
            <p className="text-blue-100 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base">Confían en nosotros:</p>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-8 opacity-60">
              <div className="text-white font-semibold text-xs sm:text-sm lg:text-lg">TechStart</div>
              <div className="text-white font-semibold text-xs sm:text-sm lg:text-lg">GreenEnergy</div>
              <div className="text-white font-semibold text-xs sm:text-sm lg:text-lg">BioTech Solutions</div>
              <div className="text-white font-semibold text-xs sm:text-sm lg:text-lg">DigitalFactory</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 