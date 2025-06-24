"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const plans = [
  {
    name: "Básico",
    price: "29",
    period: "/mes",
    description: "Perfecto para pequeñas empresas que están empezando",
    features: [
      "Hasta 5 usuarios",
      "Búsqueda básica",
      "Soporte por email",
      "5GB de almacenamiento"
    ],
    buttonText: "Comenzar",
    popular: false,
    color: "blue"
  },
  {
    name: "Profesional",
    price: "79",
    period: "/mes",
    description: "Ideal para empresas en crecimiento",
    features: [
      "Hasta 25 usuarios",
      "Búsqueda avanzada",
      "Soporte prioritario",
      "50GB de almacenamiento",
      "Dashboard de analytics"
    ],
    buttonText: "Comenzar",
    popular: true,
    color: "green"
  },
  {
    name: "Empresa",
    price: "199",
    period: "/mes",
    description: "Para grandes organizaciones",
    features: [
      "Usuarios ilimitados",
      "Búsqueda con IA",
      "Soporte 24/7",
      "Almacenamiento ilimitado",
      "Integraciones personalizadas"
    ],
    buttonText: "Contactar Ventas",
    popular: false,
    color: "purple"
  }
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
        >
          <Badge variant="secondary" className="mb-4">Precios</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Precios simples y{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              transparentes
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Elige el plan que mejor se adapte a tu equipo y necesidades
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className="group relative"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02,
                y: -5
              }}
            >
              <Card className={`relative overflow-hidden border-2 transition-all duration-300 ${
                plan.popular 
                  ? 'border-[#4ADE80] shadow-xl shadow-[#4ADE80]/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                {/* Popular badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Badge className="bg-[#4ADE80] text-white px-4 py-1 text-sm font-semibold">
                      Más Popular
                    </Badge>
                  </motion.div>
                )}

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${plan.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-2xl font-normal text-gray-500">€</span>
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-lg text-gray-500">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 + featureIndex * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button 
                      className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-[#4ADE80] hover:bg-[#22C55E] text-white shadow-lg hover:shadow-xl'
                          : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 text-center"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>14 días de prueba gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Cancelar cuando quieras</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Sin tarjeta de crédito</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
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
        className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
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
    </section>
  );
} 