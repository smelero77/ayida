import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, Shield } from 'lucide-react';

// Aceternity UI effects
const BackgroundGradient = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative h-full w-full bg-slate-950 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-zetika-blue via-slate-900 to-zetika-green/20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-zetika-green/20 opacity-20 blur-[100px]" />
      {children}
    </div>
  );
};

const SparklesCore = ({ 
  id, 
  background = "transparent", 
  minSize = 0.4, 
  maxSize = 1, 
  particleDensity = 100,
  className = "",
  particleColor = "#10b981"
}: {
  id: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <svg
        className={`w-full h-full ${className}`}
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sparkles" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={particleColor} stopOpacity="1" />
            <stop offset="100%" stopColor={particleColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        {[...Array(particleDensity)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 1000}
            cy={Math.random() * 1000}
            r={Math.random() * (maxSize - minSize) + minSize}
            fill="url(#sparkles)"
            className="animate-pulse"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const TextGenerateEffect = ({ 
  words, 
  className = "" 
}: { 
  words: string; 
  className?: string;
}) => {
  return (
    <div className={className}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-sora font-bold text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-tight"
      >
        {words.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

const HeroSection = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Automático"
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Personalizado"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Confiable"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <BackgroundGradient>
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#10b981"
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16">
          <div className="text-center max-w-5xl mx-auto">
            {/* Features badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center gap-4 mb-8 flex-wrap"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 shadow-lg"
                >
                  <span className="text-zetika-green">{feature.icon}</span>
                  <span className="font-inter font-medium text-white text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Main headline with Aceternity effect */}
            <TextGenerateEffect
              words="ZÉTIKA. La plataforma que encuentra por ti las ayudas públicas."
              className="mb-6"
            />

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-inter text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Mientras tú vives, <span className="font-semibold text-zetika-green">Zian</span> busca, filtra y te avisa.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-zetika-green to-emerald-400 text-white font-sora font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-3 backdrop-blur-sm border border-white/20"
              >
                Descubre tus ayudas ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-zetika-green rounded-full animate-pulse"></div>
                <span className="font-inter">Datos oficiales BDNS</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-zetika-green rounded-full animate-pulse"></div>
                <span className="font-inter">Actualización diaria</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-zetika-green rounded-full animate-pulse"></div>
                <span className="font-inter">100% gratuito</span>
              </div>
            </motion.div>
          </div>
        </div>
      </BackgroundGradient>
    </section>
  );
};

export default HeroSection;
