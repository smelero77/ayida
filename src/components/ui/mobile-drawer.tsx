import { useState } from 'react';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { Button } from './button';

interface MobileDrawerProps {
  navigationItems: any[];
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ navigationItems, isOpen, onClose }: MobileDrawerProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className={`
        fixed top-0 right-0 h-full w-80 sm:w-96 bg-white z-50 shadow-2xl
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Menú</h2>
            <button
              onClick={onClose}
              className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200 touch-target"
              aria-label="Cerrar menú"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-80px)] scroll-smooth-mobile">
          <div className="p-4 sm:p-6 space-y-2">
            {navigationItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div 
                  className="flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer touch-target"
                  onClick={() => item.hasDropdown ? toggleExpanded(index) : undefined}
                >
                  <span className="font-medium text-gray-900 text-base sm:text-lg">{item.title}</span>
                  {item.hasDropdown && (
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform duration-200 ${
                        expandedItems.includes(index) ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
                
                {item.hasDropdown && expandedItems.includes(index) && (
                  <div className="ml-4 space-y-1 animate-slide-down">
                    {item.dropdownItems?.map((subItem: any, subIndex: number) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className="block p-3 sm:p-4 hover:bg-blue-50 rounded-lg transition-colors duration-200 touch-target"
                        onClick={onClose}
                      >
                        <div className="font-medium text-sm sm:text-base text-gray-900 hover:text-blue-600">
                          {subItem.title}
                        </div>
                        {subItem.description && (
                          <div className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                            {subItem.description}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 sm:p-6 border-t border-gray-100 space-y-3 mt-6">
            <a 
              href="/es/signin" 
              className="block w-full text-center font-rubik font-medium text-base lg:text-[15px] text-[rgb(255,65,90)] hover:text-[rgb(255,65,90)]/70 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Acceder
            </a>
            <Button 
              variant="primary" 
              size="md" 
              color="pink" 
              fullWidth 
              onClick={onClose}
              className="touch-target"
            >
              Explorar Gratis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer; 