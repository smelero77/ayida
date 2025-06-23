
import { motion } from 'framer-motion';
import { ExternalLink, Shield, Database, Mail } from 'lucide-react';

const Footer = () => {
  const legalLinks = [
    { name: 'Política de Privacidad', href: '/privacidad' },
    { name: 'Términos de Uso', href: '/terminos' },
    { name: 'Aviso Legal', href: '/aviso-legal' },
    { name: 'Cookies', href: '/cookies' }
  ];

  const resourceLinks = [
    { name: 'Convocatorias', href: '/convocatorias' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Ayuda', href: '/ayuda' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <footer className="bg-zetika-blue text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-zetika-green rounded-lg flex items-center justify-center">
                <span className="text-zetika-blue font-sora font-bold text-sm">Z</span>
              </div>
              <span className="font-sora font-bold text-xl">ZÉTIKA</span>
            </div>
            
            <p className="font-inter text-gray-300 mb-6 leading-relaxed max-w-md">
              La plataforma que automatiza la búsqueda de ayudas públicas. 
              Mientras tú te centras en tu proyecto, Zian encuentra las mejores oportunidades de financiación.
            </p>

            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-zetika-green" />
                <span className="font-inter font-semibold text-sm">Fuente oficial de datos</span>
              </div>
              <p className="font-inter text-xs text-gray-300 leading-relaxed">
                Todos los datos provienen de la Base de Datos Nacional de Subvenciones (BDNS) 
                del Ministerio de Hacienda y Función Pública. ZÉTIKA procesa automáticamente 
                esta información oficial para ofrecerte las ayudas más relevantes.
              </p>
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-sora font-semibold text-lg mb-4">Recursos</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-inter text-gray-300 hover:text-zetika-green transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-sora font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-inter text-gray-300 hover:text-zetika-green transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact */}
            <div className="mt-8">
              <h4 className="font-sora font-semibold text-sm mb-3 text-zetika-green">Contacto</h4>
              <a
                href="mailto:hola@zetika.es"
                className="font-inter text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                hola@zetika.es
              </a>
            </div>
          </motion.div>
        </div>

        {/* Data usage notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-8 mb-8"
        >
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-zetika-green flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-inter font-semibold text-sm mb-2">Uso responsable de datos públicos</h4>
                <p className="font-inter text-xs text-gray-300 leading-relaxed">
                  ZÉTIKA utiliza exclusivamente datos públicos y oficiales de la BDNS para proporcionar información sobre ayudas y subvenciones. 
                  No almacenamos datos personales sin consentimiento y cumplimos estrictamente con la normativa de protección de datos (RGPD). 
                  La información mostrada tiene carácter informativo y recomendamos verificar siempre los datos en las fuentes oficiales antes de realizar cualquier solicitud.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t border-white/20"
        >
          <p className="font-inter text-sm text-gray-300">
            © {new Date().getFullYear()} ZÉTIKA. Todos los derechos reservados.
            <span className="mx-2">•</span>
            Datos oficiales de la Base de Datos Nacional de Subvenciones (BDNS)
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
