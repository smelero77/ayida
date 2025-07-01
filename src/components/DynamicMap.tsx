import { motion } from 'framer-motion';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import SpainMap from './SpainMap';

const DynamicMap = React.memo(() => {
  const [notifications, setNotifications] = useState<Array<{ id: number; region: string; amount: string; type: string }>>([]);

  // Memoize static data to avoid recreating on each render
  const regions = useMemo(() => ['Madrid', 'Cataluña', 'Andalucía', 'Valencia', 'País Vasco', 'Navarra', 'Galicia', 'Castilla y León'], []);
  const types = useMemo(() => ['I+D+i', 'Digitalización', 'Sostenibilidad', 'Emprendimiento', 'Formación'], []);
  const amounts = useMemo(() => ['2.5M€', '1.8M€', '3.2M€', '900K€', '1.5M€', '4.1M€'], []);

  // Memoize the notification generator function
  const generateNotification = useCallback(() => {
    return {
      id: Date.now(),
      region: regions[Math.floor(Math.random() * regions.length)] ?? 'Madrid',
      amount: amounts[Math.floor(Math.random() * amounts.length)] ?? '1M€',
      type: types[Math.floor(Math.random() * types.length)] ?? 'I+D+i'
    };
  }, [regions, amounts, types]);

  // Simulate real-time notifications - reduced frequency to improve performance
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = generateNotification();

      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, 3);
        return updated;
      });
    }, 8000); // Increased from 4000ms to 8000ms to reduce CPU usage

    return () => clearInterval(interval);
  }, [generateNotification]);

  const handleRegionClick = useCallback((regionName: string) => {
    window.location.href = `/convocatorias?region=${regionName.toLowerCase()}`;
  }, []);

  // Memoize the notification items to prevent unnecessary re-renders
  const notificationItems = useMemo(() => 
    notifications.map((notification, index) => (
      <motion.div
        key={notification.id}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-zetika-green to-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-inter font-semibold text-white">Zian ha detectado una ayuda</span>
              <span className="px-2 py-1 bg-zetika-green/20 text-zetika-green text-xs font-medium rounded-full border border-zetika-green/30">
                NUEVA
              </span>
            </div>
            <p className="font-inter text-sm text-gray-300 mb-3">
              <span className="font-medium text-zetika-green">{notification.type}</span> en{' '}
              <span className="font-medium text-white">{notification.region}</span>
              {' '}por valor de{' '}
              <span className="font-bold text-zetika-green">{notification.amount}</span>
            </p>
            <button 
              onClick={() => handleRegionClick(notification.region)}
              className="flex items-center gap-1 text-zetika-green hover:text-white transition-colors text-sm font-medium group"
            >
              Ver detalles
              <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    )), [notifications, handleRegionClick]);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zetika-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

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
            <span className="font-inter text-sm text-zetika-green font-medium">COBERTURA NACIONAL</span>
          </motion.div>

          <h2 className="font-sora font-bold text-4xl md:text-6xl text-white mb-6 bg-gradient-to-r from-white via-zetika-green to-white bg-clip-text text-transparent">
            Ayudas por{' '}
            <span className="bg-gradient-to-r from-zetika-green to-green-400 bg-clip-text text-transparent">
              toda España
            </span>
          </h2>
          <p className="font-inter text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Zian monitoriza convocatorias en todas las comunidades autónomas con{' '}
            <span className="text-zetika-green font-medium">tecnología avanzada</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <SpainMap />
            
            <div className="flex items-center justify-center mt-6 gap-2 text-sm text-gray-300">
              <MapPin className="w-4 h-4 text-zetika-green" />
              <span className="font-inter">Haz clic en cualquier región para ver sus convocatorias</span>
            </div>
          </motion.div>

          {/* Real-time notifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-zetika-green rounded-full animate-pulse"></div>
              <h3 className="font-sora font-bold text-xl text-white">Actividad en tiempo real</h3>
            </div>

            {notificationItems}

            {notifications.length === 0 && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-zetika-blue/20 to-zetika-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-zetika-green" />
                </div>
                <p className="font-inter text-gray-300">
                  Conectando con el sistema de monitorización...
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

DynamicMap.displayName = 'DynamicMap';

export default DynamicMap;
