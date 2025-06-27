import type { DecorativeGraphicProps } from "@/types/pricing";

const DecorativeGraphic = ({ planId }: DecorativeGraphicProps) => {
  const getGraphicElements = () => {
    switch (planId) {
      case "pro":
        return (
          <div className="relative w-16 h-16">
            {/* Main circle with enhanced gradient and volume */}
            <div 
              className="absolute top-0 left-0 w-12 h-12 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #FDE68A 0%, #FCD34D 50%, #F59E0B 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(245,158,11,0.3), 0 4px 12px rgba(245,158,11,0.25)'
              }}
            ></div>
            
            {/* Secondary circle with volume */}
            <div 
              className="absolute top-2 right-0 w-8 h-8 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #FDA4AF 0%, #F472B6 50%, #EC4899 100%)',
                boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(236,72,153,0.3), 0 3px 8px rgba(236,72,153,0.2)'
              }}
            ></div>
            
            {/* Small accent circle */}
            <div 
              className="absolute bottom-0 left-2 w-4 h-4 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #7DD3FC 0%, #38BDF8 50%, #06B6D4 100%)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(6,182,212,0.3), 0 2px 6px rgba(6,182,212,0.2)'
              }}
            ></div>
            
            {/* Geometric shape with gradient */}
            <div 
              className="absolute top-1 left-8 w-3 h-6 transform rotate-45"
              style={{ 
                background: 'linear-gradient(135deg, #FDA4AF 0%, #F472B6 50%, #EC4899 100%)', 
                borderRadius: '2px',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 4px rgba(236,72,153,0.15)'
              }}
            ></div>
          </div>
        );
      case "business":
        return (
          <div className="relative w-16 h-16">
            {/* Main circle with enhanced gradient */}
            <div 
              className="absolute top-0 left-0 w-12 h-12 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #FDA4AF 0%, #F472B6 50%, #EC4899 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(236,72,153,0.3), 0 4px 12px rgba(236,72,153,0.25)'
              }}
            ></div>
            
            {/* Secondary circle */}
            <div 
              className="absolute top-2 right-0 w-8 h-8 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #7DD3FC 0%, #38BDF8 50%, #06B6D4 100%)',
                boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(6,182,212,0.3), 0 3px 8px rgba(6,182,212,0.2)'
              }}
            ></div>
            
            {/* Small accent circle */}
            <div 
              className="absolute bottom-0 left-2 w-4 h-4 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #FDE68A 0%, #FCD34D 50%, #F59E0B 100%)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(245,158,11,0.3), 0 2px 6px rgba(245,158,11,0.2)'
              }}
            ></div>
            
            {/* Geometric shape */}
            <div 
              className="absolute top-1 left-8 w-3 h-6 transform rotate-45"
              style={{ 
                background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 50%, #06B6D4 100%)', 
                borderRadius: '2px',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 4px rgba(6,182,212,0.15)'
              }}
            ></div>
          </div>
        );
      case "enterprise":
        return (
          <div className="relative w-16 h-16">
            {/* Main circle with enhanced gradient */}
            <div 
              className="absolute top-0 left-0 w-12 h-12 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #7DD3FC 0%, #38BDF8 50%, #06B6D4 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(6,182,212,0.3), 0 4px 12px rgba(6,182,212,0.25)'
              }}
            ></div>
            
            {/* Secondary circle */}
            <div 
              className="absolute top-2 right-0 w-8 h-8 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #86EFAC 0%, #34D399 50%, #10B981 100%)',
                boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(16,185,129,0.3), 0 3px 8px rgba(16,185,129,0.2)'
              }}
            ></div>
            
            {/* Small accent circle */}
            <div 
              className="absolute bottom-0 left-2 w-4 h-4 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, #FDE68A 0%, #FCD34D 50%, #F59E0B 100%)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(245,158,11,0.3), 0 2px 6px rgba(245,158,11,0.2)'
              }}
            ></div>
            
            {/* Geometric shape */}
            <div 
              className="absolute top-1 left-8 w-3 h-6 transform rotate-45"
              style={{ 
                background: 'linear-gradient(135deg, #86EFAC 0%, #34D399 50%, #10B981 100%)', 
                borderRadius: '2px',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 4px rgba(16,185,129,0.15)'
              }}
            ></div>
          </div>
        );
      default:
        return null;
    }
  };

  return getGraphicElements();
};

export default DecorativeGraphic; 