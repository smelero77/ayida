"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Region {
  id: string;
  name: string;
  path: string;
  center: { x: number; y: number };
  ayudas: number;
}

interface MapEvent {
  type: 'apertura' | 'concesion' | 'solicitud';
  region: string;
  title: string;
  amount?: string;
}

const regions: Region[] = [
  {
    id: 'madrid',
    name: 'Madrid',
    path: 'M300,180 L320,180 L320,200 L300,200 Z',
    center: { x: 310, y: 190 },
    ayudas: 1247
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    path: 'M380,150 L400,150 L400,170 L380,170 Z',
    center: { x: 390, y: 160 },
    ayudas: 892
  },
  {
    id: 'sevilla',
    name: 'Sevilla',
    path: 'M250,280 L270,280 L270,300 L250,300 Z',
    center: { x: 260, y: 290 },
    ayudas: 634
  },
  {
    id: 'valencia',
    name: 'Valencia',
    path: 'M350,200 L370,200 L370,220 L350,220 Z',
    center: { x: 360, y: 210 },
    ayudas: 567
  },
  {
    id: 'bilbao',
    name: 'Bilbao',
    path: 'M280,100 L300,100 L300,120 L280,120 Z',
    center: { x: 290, y: 110 },
    ayudas: 423
  },
];

const mapEvents: MapEvent[] = [
  { type: 'apertura', region: 'Madrid', title: 'Nueva convocatoria I+D+i', amount: '2.5M€' },
  { type: 'concesion', region: 'Barcelona', title: 'Concedida ayuda digitalización', amount: '150K€' },
  { type: 'solicitud', region: 'Valencia', title: 'Solicitud energías renovables' },
  { type: 'apertura', region: 'Sevilla', title: 'Ayuda emprendimiento rural', amount: '500K€' },
  { type: 'concesion', region: 'Bilbao', title: 'Proyecto industria 4.0', amount: '1.2M€' },
];

const SpainMap = React.memo(() => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [currentEvent, setCurrentEvent] = useState<MapEvent | null>(null);
  const [eventHistory, setEventHistory] = useState<MapEvent[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize event colors and icons to avoid recalculating
  const getEventColor = useCallback((type: string) => {
    switch (type) {
      case 'apertura': return '#4ADE80';
      case 'concesion': return '#22C55E';
      case 'solicitud': return '#16A34A';
      default: return '#4ADE80';
    }
  }, []);

  const getEventIcon = useCallback((type: string) => {
    switch (type) {
      case 'apertura': return '📢';
      case 'concesion': return '✅';
      case 'solicitud': return '📝';
      default: return '📢';
    }
  }, []);

  // Memoize region click handler
  const handleRegionClick = useCallback((regionId: string) => {
    setActiveRegion(regionId);
    // Aquí podrías filtrar convocatorias por región
    console.log(`Filtrar convocatorias para: ${regionId}`);
  }, []);

  // Optimized event generation with reduced frequency
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mapEvents.length);
      const randomEvent = mapEvents[randomIndex];
      if (randomEvent) {
        setCurrentEvent(randomEvent);
        setEventHistory(prev => [randomEvent, ...prev.slice(0, 4)]);
        
        // Mostrar evento por 3 segundos
        const timeout = setTimeout(() => {
          setCurrentEvent(null);
        }, 3000);

        return () => clearTimeout(timeout);
      }
    }, 10000); // Increased from 4000ms to 10000ms to reduce CPU usage

    return () => clearInterval(interval);
  }, [mounted]);

  // Memoize regions to prevent unnecessary re-renders
  const regionElements = useMemo(() => regions.map((region) => (
    <g key={region.id}>
      <path
        d={region.path}
        fill={activeRegion === region.id ? '#4ADE80' : '#E2E8F0'}
        stroke="#94A3B8"
        strokeWidth="1"
        className="cursor-pointer transition-all duration-300 hover:fill-[#4ADE80]/70"
        onClick={() => handleRegionClick(region.id)}
        onMouseEnter={() => setHoveredRegion(region.id)}
        onMouseLeave={() => setHoveredRegion(null)}
      />
      
      {/* Optimized animated dots */}
      <circle
        cx={region.center.x}
        cy={region.center.y}
        r="4"
        fill="#4ADE80"
        className="animate-pulse"
      >
        <animate
          attributeName="r"
          values="4;8;4"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )), [regions, activeRegion, handleRegionClick]);

  // Memoize event history items
  const eventHistoryItems = useMemo(() => eventHistory.map((event, index) => (
    <div
      key={`${event.region}-${event.type}-${index}`}
      className="flex items-start gap-3 p-3 bg-white/10 rounded-lg border border-white/20"
    >
      <div 
        className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
        style={{ backgroundColor: getEventColor(event.type) }}
      ></div>
      <div className="flex-1 min-w-0">
        <p className="font-inter text-sm text-white truncate">
          {getEventIcon(event.type)} {event.title}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p className="font-inter text-xs text-[#4ADE80]">{event.region}</p>
          {event.amount && (
            <p className="font-inter text-xs text-gray-300 font-medium">{event.amount}</p>
          )}
        </div>
      </div>
    </div>
  )), [eventHistory, getEventColor, getEventIcon]);

  // Renderizado estático durante SSR
  if (!mounted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-sora font-bold text-3xl md:text-4xl text-[#1E2A38] mb-6">
              Actividad en Tiempo Real
            </h2>
            <p className="font-inter text-xl text-[#6B7280] max-w-3xl mx-auto">
              Observa cómo se mueven las oportunidades de financiación por toda España
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Mapa estático */}
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-2xl p-8">
                <svg viewBox="0 0 600 500" className="w-full h-auto">
                  {/* Contorno simplificado de España */}
                  <path
                    d="M50 200 L150 180 L250 160 L350 170 L450 180 L500 200 L520 250 L500 300 L480 350 L450 400 L400 430 L350 450 L300 460 L250 450 L200 440 L150 420 L100 400 L80 350 L60 300 L50 250 Z"
                    fill="#E2E8F0"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                  />
                  
                  {/* Puntos de regiones */}
                  {regions.map((region) => (
                    <g key={region.id}>
                      <circle
                        cx={region.center.x}
                        cy={region.center.y}
                        r="8"
                        fill="#4ADE80"
                        className="opacity-80"
                      />
                      <circle
                        cx={region.center.x}
                        cy={region.center.y}
                        r="4"
                        fill="white"
                      />
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Panel de actividad estático */}
            <div className="bg-gradient-to-br from-[#1E2A38] to-[#374151] rounded-2xl p-6 text-white">
              <h3 className="font-sora font-semibold text-xl mb-6">Actividad Reciente</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-[#4ADE80] rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="font-inter text-sm">Nueva convocatoria abierta en Madrid</p>
                    <p className="font-inter text-xs text-gray-300">Hace unos momentos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-sora font-bold text-[2.5rem] text-[#1E2A38] mb-4">
            Actividad en <span className="text-[#4ADE80]">tiempo real</span>
          </h2>
          <p className="font-inter text-[1.25rem] text-[#6B7280] max-w-3xl mx-auto">
            Observa cómo se abren, conceden y solicitan ayudas en toda España cada minuto
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Mapa */}
          <div className="lg:col-span-2">
            <div className="relative bg-[#F8FAFC] rounded-2xl p-8 border border-[#E5E7EB]">
              <svg
                viewBox="0 0 500 400"
                className="w-full h-auto"
                style={{ maxHeight: '400px' }}
              >
                {/* Fondo del mapa */}
                <rect width="500" height="400" fill="#F1F5F9" rx="8" />
                
                {/* Regiones optimizadas */}
                {regionElements}
                
                {/* Evento actual optimizado */}
                {currentEvent && (
                  <g>
                    {regions
                      .filter(r => r.name === currentEvent.region)
                      .map(region => (
                        <g key={`event-${region.id}`}>
                          <circle
                            cx={region.center.x}
                            cy={region.center.y}
                            r="12"
                            fill={getEventColor(currentEvent.type)}
                            opacity="0.8"
                          >
                            <animate
                              attributeName="r"
                              values="12;20;12"
                              dur="2s"
                              repeatCount="3"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.8;0.3;0.8"
                              dur="2s"
                              repeatCount="3"
                            />
                          </circle>
                        </g>
                      ))}
                  </g>
                )}
              </svg>
              
              {/* Tooltip */}
              {hoveredRegion && (
                <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-[#E5E7EB]">
                  <div className="font-sora font-semibold text-[#1E2A38] mb-1">
                    {regions.find(r => r.id === hoveredRegion)?.name}
                  </div>
                  <div className="font-inter text-sm text-[#6B7280]">
                    {regions.find(r => r.id === hoveredRegion)?.ayudas} ayudas disponibles
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel de actividad optimizado */}
          <div className="bg-gradient-to-br from-[#1E2A38] to-[#374151] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-[#4ADE80] rounded-full animate-pulse"></div>
              <h3 className="font-sora font-semibold text-xl">Actividad Reciente</h3>
            </div>
            
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {eventHistoryItems}
              
              {eventHistory.length === 0 && (
                <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-[#4ADE80] rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="font-inter text-sm">Monitorizando actividad...</p>
                    <p className="font-inter text-xs text-gray-300">Conectando con fuentes de datos</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

SpainMap.displayName = 'SpainMap';

export default SpainMap;
