"use client";
import { useState, useEffect } from 'react';

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

export default function SpainMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [currentEvent, setCurrentEvent] = useState<MapEvent | null>(null);
  const [eventHistory, setEventHistory] = useState<MapEvent[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mapEvents.length);
      const randomEvent = mapEvents[randomIndex];
      if (randomEvent) {
        setCurrentEvent(randomEvent);
        setEventHistory(prev => [randomEvent, ...prev.slice(0, 4)]);
        
        // Mostrar evento por 3 segundos
        setTimeout(() => {
          setCurrentEvent(null);
        }, 3000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted]);

  const handleRegionClick = (regionId: string) => {
    setActiveRegion(regionId);
    // Aquí podrías filtrar convocatorias por región
    console.log(`Filtrar convocatorias para: ${regionId}`);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'apertura': return '#4ADE80';
      case 'concesion': return '#22C55E';
      case 'solicitud': return '#16A34A';
      default: return '#4ADE80';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'apertura': return '📢';
      case 'concesion': return '✅';
      case 'solicitud': return '📝';
      default: return '📢';
    }
  };

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
                
                {/* Regiones */}
                {regions.map((region) => (
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
                    
                    {/* Puntos animados */}
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
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="1;0.5;1"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}
                
                {/* Evento actual */}
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
                              dur="1s"
                              repeatCount="indefinite"
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

          {/* Panel de actividad */}
          <div className="space-y-6">
            {/* Evento actual */}
            {currentEvent && (
              <div className="bg-gradient-to-r from-[#4ADE80]/10 to-[#22C55E]/10 p-6 rounded-2xl border border-[#4ADE80]/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{getEventIcon(currentEvent.type)}</span>
                  <div>
                    <div className="font-sora font-semibold text-[#1E2A38] capitalize">
                      {currentEvent.type}
                    </div>
                    <div className="font-inter text-sm text-[#6B7280]">
                      {currentEvent.region}
                    </div>
                  </div>
                </div>
                <div className="font-inter text-[#1E2A38] mb-2">
                  {currentEvent.title}
                </div>
                {currentEvent.amount && (
                  <div className="font-sora font-bold text-[#4ADE80]">
                    {currentEvent.amount}
                  </div>
                )}
              </div>
            )}

            {/* Historial de eventos */}
            <div>
              <h3 className="font-sora font-semibold text-[#1E2A38] mb-4">
                Actividad reciente
              </h3>
              <div className="space-y-3">
                {eventHistory.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]"
                    style={{ opacity: 1 - (index * 0.2) }}
                  >
                    <span className="text-lg">{getEventIcon(event.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-inter text-sm text-[#1E2A38] truncate">
                        {event.title}
                      </div>
                      <div className="font-inter text-xs text-[#6B7280]">
                        {event.region} • Hace {index + 1} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E5E7EB]">
              <h3 className="font-sora font-semibold text-[#1E2A38] mb-4">
                Últimas 24h
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-inter text-[#6B7280]">Nuevas convocatorias</span>
                  <span className="font-sora font-bold text-[#4ADE80]">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter text-[#6B7280]">Ayudas concedidas</span>
                  <span className="font-sora font-bold text-[#22C55E]">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter text-[#6B7280]">Solicitudes</span>
                  <span className="font-sora font-bold text-[#16A34A]">189</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
