
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Region {
  id: string;
  name: string;
  grants: number;
  path: string;
  centerX: number;
  centerY: number;
}

const SpainMap = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const regions: Region[] = [
    {
      id: 'madrid',
      name: 'Madrid',
      grants: 89,
      path: 'M300,250 L320,240 L340,250 L350,270 L340,290 L320,300 L300,290 L290,270 Z',
      centerX: 320,
      centerY: 270
    },
    {
      id: 'cataluna',
      name: 'Cataluña',
      grants: 76,
      path: 'M380,180 L420,170 L450,180 L460,210 L450,240 L420,250 L380,240 L370,210 Z',
      centerX: 415,
      centerY: 210
    },
    {
      id: 'andalucia',
      name: 'Andalucía',
      grants: 92,
      path: 'M200,380 L280,370 L360,380 L370,420 L360,460 L280,470 L200,460 L190,420 Z',
      centerX: 280,
      centerY: 420
    },
    {
      id: 'valencia',
      name: 'Valencia',
      grants: 54,
      path: 'M360,240 L400,230 L420,260 L410,300 L380,310 L360,280 Z',
      centerX: 390,
      centerY: 270
    },
    {
      id: 'pais-vasco',
      name: 'País Vasco',
      grants: 43,
      path: 'M180,120 L220,110 L240,130 L230,150 L200,160 L180,140 Z',
      centerX: 210,
      centerY: 135
    },
    {
      id: 'galicia',
      name: 'Galicia',
      grants: 38,
      path: 'M80,140 L120,130 L140,150 L130,180 L100,190 L80,170 Z',
      centerX: 110,
      centerY: 160
    },
    {
      id: 'navarra',
      name: 'Navarra',
      grants: 28,
      path: 'M240,130 L270,120 L290,140 L280,160 L250,170 L240,150 Z',
      centerX: 265,
      centerY: 145
    },
    {
      id: 'castilla-leon',
      name: 'Castilla y León',
      grants: 45,
      path: 'M160,180 L260,170 L300,200 L290,230 L200,240 L160,210 Z',
      centerX: 230,
      centerY: 205
    }
  ];

  const handleRegionClick = (regionName: string) => {
    window.location.href = `/convocatorias?region=${regionName.toLowerCase()}`;
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-900/20 to-blue-900/20 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-zetika-green/5 via-transparent to-zetika-blue/5"></div>
      
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}
      >
        {/* Spain outline */}
        <path
          d="M50,180 Q80,120 140,110 Q200,100 280,105 Q360,110 420,130 Q460,150 480,200 Q490,250 470,300 Q450,350 400,400 Q350,450 280,460 Q200,470 140,450 Q80,430 50,380 Q30,330 40,280 Q45,230 50,180 Z"
          fill="rgba(59, 130, 246, 0.1)"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          className="animate-pulse"
        />
        
        {/* Regions */}
        {regions.map((region, index) => (
          <motion.g key={region.id}>
            <motion.path
              d={region.path}
              fill={activeRegion === region.id ? '#10b981' : '#3b82f6'}
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-300"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.1, filter: 'brightness(1.2)' }}
              onMouseEnter={() => setActiveRegion(region.id)}
              onMouseLeave={() => setActiveRegion(null)}
              onClick={() => handleRegionClick(region.name)}
              style={{
                filter: activeRegion === region.id 
                  ? 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.8))' 
                  : 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))'
              }}
            />
            
            {/* Animated dots */}
            <motion.circle
              cx={region.centerX}
              cy={region.centerY}
              r="3"
              fill="white"
              className="animate-pulse"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.8 }}
            />
          </motion.g>
        ))}
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + i * 50}
            cy={100 + Math.sin(i) * 100}
            r="1"
            fill="rgba(59, 130, 246, 0.6)"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </svg>
      
      {/* Tooltip */}
      {activeRegion && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-white"
        >
          <div className="font-sora font-bold text-lg text-zetika-green">
            {regions.find(r => r.id === activeRegion)?.name}
          </div>
          <div className="text-sm text-gray-300">
            {regions.find(r => r.id === activeRegion)?.grants} ayudas activas
          </div>
          <div className="text-xs text-zetika-green/80 mt-1">
            Click para ver detalles
          </div>
        </motion.div>
      )}
      
      {/* Tech overlay */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-zetika-green">
        <div className="w-2 h-2 bg-zetika-green rounded-full animate-pulse"></div>
        <span className="text-sm font-inter">Mapa interactivo de España</span>
      </div>
    </div>
  );
};

export default SpainMap;
