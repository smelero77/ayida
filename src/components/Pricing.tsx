
import { motion } from 'framer-motion';
import { Check, Zap, Star, Crown } from 'lucide-react';
import { Button } from './ui/button';

const Pricing = () => {
  const plans = [
    {
      name: 'Gratis',
      price: '0',
      period: '/mes',
      icon: Zap,
      description: 'Perfecto para empezar a explorar',
      features: [
        'Acceso al buscador',
        'Vista previa de ayudas',
        'Mapa y estadísticas'
      ],
      buttonText: 'Comenzar gratis',
      popular: false,
      gradient: 'from-gray-400 to-gray-600'
    },
    {
      name: 'PRO',
      price: '9',
      period: '/mes',
      icon: Star,
      description: 'Para profesionales que buscan eficiencia',
      features: [
        'Alertas automáticas por perfil',
        'Favoritos',
        'Seguimiento inteligente de Zian',
        'Todo lo incluido en Gratis'
      ],
      buttonText: 'Empezar PRO',
      popular: true,
      gradient: 'from-zetika-green to-green-400'
    },
    {
      name: 'PREMIUM',
      price: '29',
      period: '/mes',
      icon: Crown,
      description: 'Máximo nivel de automatización y soporte',
      features: [
        'Documentos preconfigurados',
        'Priorización en Zian',
        'Consultoría personalizada',
        'Todo lo incluido en PRO'
      ],
      buttonText: 'Ir a PREMIUM',
      popular: false,
      gradient: 'from-zetika-blue to-blue-600'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-zetika-blue to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zetika-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

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
            className="inline-flex items-center gap-2 bg-zetika-green/20 border border-zetika-green/30 rounded-full px-6 py-2 mb-6"
          >
            <div className="w-2 h-2 bg-zetika-green rounded-full animate-pulse"></div>
            <span className="font-inter text-sm text-zetika-green font-medium">PLANES Y PRECIOS</span>
          </motion.div>
          
          <h2 className="font-sora font-bold text-4xl md:text-6xl text-white mb-6 bg-gradient-to-r from-white via-zetika-green to-white bg-clip-text text-transparent">
            Elige tu nivel de{' '}
            <span className="bg-gradient-to-r from-zetika-green to-green-400 bg-clip-text text-transparent">
              automatización
            </span>
          </h2>
          <p className="font-inter text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Desde explorar gratis hasta automatización completa con IA. 
            <span className="text-zetika-green font-medium"> Zian trabaja por ti</span> mientras tú te centras en lo importante.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative group ${plan.popular ? 'md:-mt-8' : ''}`}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-zetika-green to-green-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg border border-zetika-green/20">
                      🚀 MÁS POPULAR
                    </div>
                  </div>
                )}

                <div className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 group-hover:border-white/20 ${plan.popular ? 'bg-white/10' : ''}`}>
                  {/* Plan header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-sora font-bold text-2xl text-white">{plan.name}</h3>
                      <p className="font-inter text-sm text-gray-400">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sora font-bold text-5xl text-white">{plan.price}€</span>
                      <span className="font-inter text-lg text-gray-400">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-zetika-green/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-zetika-green" />
                        </div>
                        <span className="font-inter text-gray-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-3 font-inter font-semibold text-base transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-zetika-green to-green-400 hover:from-green-400 hover:to-zetika-green text-white shadow-lg hover:shadow-zetika-green/25'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="font-inter text-gray-300 mb-4">
            ¿Necesitas algo más específico?{' '}
            <span className="text-zetika-green font-medium">Hablemos</span>
          </p>
          <Button variant="outline" className="border-zetika-green/30 text-zetika-green hover:bg-zetika-green/10">
            Contactar con el equipo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
