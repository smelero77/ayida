import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, Quote, User, Building, Award, TrendingUp } from 'lucide-react';

// Aceternity UI effects
const BackgroundGradient = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zetika-green/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-zetika-green/5 via-transparent to-blue-500/5 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      {children}
    </div>
  );
};

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "María González",
      position: "CEO",
      company: "TechStart Solutions",
      avatar: "MG",
      rating: 5,
      text: "Zian nos ha permitido acceder a subvenciones que ni sabíamos que existían. Hemos conseguido financiación para 3 proyectos de I+D+i en menos de 6 meses.",
      amount: "€120,000",
      category: "I+D+i"
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      position: "Director de Innovación",
      company: "Green Energy Corp",
      avatar: "CR",
      rating: 5,
      text: "La IA de Zian es impresionante. Nos notifica automáticamente cuando hay nuevas ayudas que encajan con nuestro perfil. Es como tener un consultor 24/7.",
      amount: "€85,000",
      category: "Sostenibilidad"
    },
    {
      id: 3,
      name: "Ana Martínez",
      position: "Fundadora",
      company: "Digital Health Hub",
      avatar: "AM",
      rating: 5,
      text: "Antes perdíamos horas buscando ayudas. Ahora con Zian tenemos todo centralizado y la documentación se genera automáticamente. Increíble.",
      amount: "€200,000",
      category: "Digitalización"
    },
    {
      id: 4,
      name: "Javier López",
      position: "CTO",
      company: "AI Robotics",
      avatar: "JL",
      rating: 5,
      text: "El seguimiento inteligente de Zian nos ha ayudado a gestionar múltiples convocatorias simultáneamente. La tasa de éxito ha aumentado un 300%.",
      amount: "€150,000",
      category: "Tecnología"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section className="py-24 relative overflow-hidden">
      <BackgroundGradient>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-zetika-green/10 border border-zetika-green/20 rounded-full px-6 py-2 mb-6 backdrop-blur-xl"
            >
              <Award className="w-4 h-4 text-zetika-green" />
              <span className="font-inter text-sm text-zetika-green font-medium">TESTIMONIOS REALES</span>
            </motion.div>

            <h2 className="font-sora font-bold text-5xl md:text-7xl text-white mb-6">
              Empresas que{' '}
              <span className="bg-gradient-to-r from-zetika-green via-green-400 to-emerald-400 bg-clip-text text-transparent">
                confían en Zian
              </span>
            </h2>
            <p className="font-inter text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Más de{' '}
              <span className="text-zetika-green font-bold">500 empresas</span>
              {' '}han conseguido financiación gracias a nuestra tecnología
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: TrendingUp, value: "€2.5M+", label: "Financiación conseguida" },
              { icon: Building, value: "500+", label: "Empresas atendidas" },
              { icon: Award, value: "95%", label: "Tasa de éxito" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-zetika-green/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-zetika-green" />
                </div>
                <div className="font-sora font-bold text-3xl text-white mb-2">{stat.value}</div>
                <div className="font-inter text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Review Card */}
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={activeReview}
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-zetika-green/5 via-transparent to-blue-500/5 rounded-3xl"></div>
              
              {/* Quote icon */}
              <div className="absolute top-8 right-8 opacity-20">
                <Quote className="w-16 h-16 text-zetika-green" />
              </div>

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  {reviews[activeReview] && [...Array(reviews[activeReview].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                  <span className="ml-2 px-3 py-1 bg-zetika-green/20 text-zetika-green text-sm font-medium rounded-full border border-zetika-green/30">
                    {reviews[activeReview]?.category}
                  </span>
                </div>

                {/* Review text */}
                <blockquote className="font-inter text-xl md:text-2xl text-white leading-relaxed mb-8">
                  "{reviews[activeReview]?.text}"
                </blockquote>

                {/* Amount achieved */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-zetika-green/20 to-emerald-500/20 border border-zetika-green/30 rounded-full px-6 py-3">
                    <TrendingUp className="w-5 h-5 text-zetika-green" />
                    <span className="font-sora font-bold text-zetika-green">
                      {reviews[activeReview]?.amount} conseguidos
                    </span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-zetika-green to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="font-sora font-bold text-white text-lg">
                      {reviews[activeReview]?.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-sora font-bold text-lg text-white">
                      {reviews[activeReview]?.name}
                    </div>
                    <div className="font-inter text-gray-300">
                      {reviews[activeReview]?.position}
                    </div>
                    <div className="font-inter text-zetika-green text-sm">
                      {reviews[activeReview]?.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Review indicators */}
            <div className="flex justify-center mt-8 gap-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeReview
                      ? 'bg-zetika-green scale-125 shadow-lg shadow-zetika-green/50'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Secondary reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {reviews.slice(0, 3).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                onClick={() => setActiveReview(index)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-zetika-green/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                    <span className="font-sora font-bold text-zetika-green text-sm">
                      {review.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-sora font-semibold text-white text-sm">
                      {review.name}
                    </div>
                    <div className="font-inter text-gray-400 text-xs">
                      {review.company}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="font-inter text-gray-300 text-sm leading-relaxed mb-3 line-clamp-3">
                  {review.text}
                </p>

                <div className="text-zetika-green font-semibold text-sm">
                  {review.amount} conseguidos
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </BackgroundGradient>
    </section>
  );
};

export default Reviews;
