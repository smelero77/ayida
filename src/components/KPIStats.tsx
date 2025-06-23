import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';

// Aceternity UI effects
const BackgroundGradient = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-zetika-green/10 opacity-20 blur-[100px]" />
      {children}
    </div>
  );
};

const KPIStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('kpi-stats');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 5200,
      suffix: 'M€',
      label: 'disponibles ahora',
      description: 'Presupuesto total de ayudas activas',
      color: 'from-zetika-green to-green-400'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      value: 846,
      suffix: '',
      label: 'convocatorias activas',
      description: 'Oportunidades de financiación abiertas',
      color: 'from-zetika-blue to-blue-400'
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      value: 137,
      suffix: '',
      label: 'cierran esta semana',
      description: 'Últimos días para presentar solicitudes',
      color: 'from-orange-500 to-red-400'
    }
  ];

  return (
    <section id="kpi-stats" className="py-16 relative overflow-hidden">
      <BackgroundGradient>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-sora font-bold text-3xl sm:text-4xl text-white mb-4">
              Ayudas disponibles <span className="text-zetika-green">ahora mismo</span>
            </h2>
            <p className="font-inter text-lg text-gray-300 max-w-2xl mx-auto">
              Datos actualizados en tiempo real desde la Base de Datos Nacional de Subvenciones
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/10 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-white/10">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                  
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-6 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white">{stat.icon}</span>
                  </div>

                  {/* Main statistic */}
                  <div className="text-center mb-4 relative z-10">
                    <div className="font-sora font-bold text-4xl sm:text-5xl text-white mb-2">
                      {isVisible ? (
                        <>
                          +<CountUp end={stat.value} duration={2} separator="." />
                          <span className="text-zetika-green">{stat.suffix}</span>
                        </>
                      ) : (
                        `+${stat.value}${stat.suffix}`
                      )}
                    </div>
                    <h3 className="font-inter font-semibold text-lg text-white">
                      {stat.label}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-inter text-sm text-gray-300 text-center leading-relaxed relative z-10">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last update indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
              <div className="w-2 h-2 bg-zetika-green rounded-full animate-pulse"></div>
              <span className="font-inter text-sm text-gray-300">
                Última actualización: hace 12 minutos
              </span>
            </div>
          </motion.div>
        </div>
      </BackgroundGradient>
    </section>
  );
};

export default KPIStats;
