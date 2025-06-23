
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Convocatorias', href: '/convocatorias' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl' 
          : 'bg-white/10 backdrop-blur-xl border border-white/20'
      } rounded-2xl`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-zetika-green to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-zetika-green/25">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-zetika-green to-emerald-400 rounded-xl blur opacity-50 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-sora font-bold text-xl text-white">ZÉTIKA</span>
                <span className="font-inter text-xs text-zetika-green/80 -mt-1">AI-Powered</span>
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="relative px-4 py-2 font-inter font-medium text-white/80 hover:text-white transition-all duration-300 group rounded-lg"
              >
                {item.name}
                <span className="absolute inset-0 bg-gradient-to-r from-zetika-green/20 to-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-zetika-green to-emerald-400 transition-all duration-300 group-hover:w-6"></span>
              </motion.a>
            ))}
            
            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="ml-4 px-6 py-2 bg-gradient-to-r from-zetika-green to-emerald-400 text-white font-inter font-semibold rounded-xl hover:shadow-lg hover:shadow-zetika-green/25 transition-all duration-300 hover:scale-105"
            >
              Empezar Gratis
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-zetika-green transition-colors rounded-lg bg-white/10 backdrop-blur-xl"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-white/10 mt-4"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-4 py-3 font-inter font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-zetika-green to-emerald-400 text-white font-inter font-semibold rounded-xl text-center"
              >
                Empezar Gratis
              </motion.button>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-zetika-green/40 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -20, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: '50%'
            }}
          />
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
