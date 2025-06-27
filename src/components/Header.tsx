"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/ui/nav-item";
import MobileDrawer from "@/components/ui/mobile-drawer";
import { Menu } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: 'Plataforma',
      hasDropdown: true,
      megaMenuImage: {
        src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
        alt: 'Gestión de Convocatorias',
        title: 'Explora más de 150 herramientas de gestión',
        description: 'Descubre comparaciones completas de precios y encuentra la solución perfecta para tus necesidades de gestión de convocatorias.',
        buttonText: 'Descubrir más',
        buttonHref: '#compare'
      },
      dropdownItems: [
        { 
          title: 'Blog', 
          href: '#', 
          description: 'Lee historias sobre el fortalecimiento del poder social.',
          icon: 'blog'
        },
        { 
          title: 'Newsletter', 
          href: '#', 
          description: 'Mantente actualizado con noticias de convocatorias.',
          icon: 'content'
        },
        { 
          title: 'Casos de estudio', 
          href: '#', 
          description: 'Descubre experiencias de clientes.',
          icon: 'case-studies'
        },
      ]
    },
    {
      title: 'Soluciones',
      hasDropdown: true,
      megaMenuImage: {
        src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
        alt: 'Soluciones Empresariales',
        title: 'Soluciones Empresariales de Gestión',
        description: 'Herramientas poderosas diseñadas para grandes organizaciones y gestión de nivel empresarial.',
        buttonText: 'Saber más',
        buttonHref: '#enterprise'
      },
      dropdownItems: [
        { 
          title: 'Centro de ayuda', 
          href: '#', 
          description: 'Obtén soporte y encuentra respuestas.',
          icon: 'help'
        },
        { 
          title: 'Alternativa a Hootsuite', 
          href: '#', 
          description: 'Descubre mejores alternativas.',
          icon: 'enterprise'
        },
        { 
          title: 'Alternativa a Buffer', 
          href: '#', 
          description: 'Compara con las características de Buffer.',
          icon: 'agency'
        },
        { 
          title: 'Alternativa a Sprout Social', 
          href: '#', 
          description: 'Ve cómo nos comparamos con Sprout.',
          icon: 'creator'
        },
      ]
    },
    {
      title: 'Recursos',
      hasDropdown: true,
      megaMenuImage: {
        src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
        alt: 'Recursos de Aprendizaje',
        title: 'Centro de Aprendizaje y Recursos',
        description: 'Accede a webinars, guías y contenido educativo para dominar la gestión de convocatorias.',
        buttonText: 'Explorar recursos',
        buttonHref: '#resources'
      },
      dropdownItems: [
        { 
          title: 'Blog', 
          href: '#', 
          description: 'Últimas tendencias e insights.',
          icon: 'blog'
        },
        { 
          title: 'Webinars', 
          href: '#', 
          description: 'Únete a sesiones de entrenamiento en vivo.',
          icon: 'webinars'
        },
        { 
          title: 'Casos de Estudio', 
          href: '#', 
          description: 'Historias de éxito de clientes.',
          icon: 'case-studies'
        },
        { 
          title: 'Centro de Ayuda', 
          href: '#', 
          description: 'Obtén soporte cuando lo necesites.',
          icon: 'help'
        },
      ]
    },
    { title: 'Precios', href: '#' },
  ];

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detectar si está scrolleado
      setIsScrolled(currentScrollY > 50);
      
      // Ocultar/mostrar navbar con efecto de rebote
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false); // Ocultar al bajar (después de 10px)
      } else {
        setIsVisible(true); // Mostrar al subir con efecto de rebote
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Renderizado estático durante SSR
  if (!mounted) {
    return (
      <div className={`fixed top-0 left-0 right-0 z-[101] min-h-[67px] transition-all duration-300 ease-linear lg:h-[104px] lg:py-0 lg:px-0`}>
        <div className="w-full transition-all duration-300 bg-transparent p-0 m-0">
          {/* Layout para móvil */}
          <div className="lg:hidden flex w-full items-start justify-between px-4 pt-4 pb-2">
            {/* Logo alineado arriba a la izquierda */}
            <div className="flex items-center">
              <Logo isScrolled={false} />
            </div>
            {/* Hamburguesa alineada a la derecha */}
            <div>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-black font-black hover:text-[#4ADE80] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4ADE80] transition-colors duration-200 touch-target"
              >
                <Menu className="block h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            </div>
          </div>
          
          {/* Layout para desktop */}
          <div className="hidden lg:flex w-full items-center justify-center px-4 lg:px-6 py-4 lg:py-7">
            {/* Bloque izquierdo: logo + menú */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Logo isScrolled={false} />
              </div>
              <div className="hidden lg:block">
                <div className="flex items-baseline space-x-5">
                  {navigationItems.map((item, index) => (
                    <NavItem 
                      key={index}
                      title={item.title}
                      href={item.href}
                      hasDropdown={item.hasDropdown}
                      dropdownItems={item.dropdownItems}
                      megaMenuImage={item.megaMenuImage}
                      isActive={false}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Bloque derecho: botones */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="/signin" 
                className="font-rubik font-medium text-base lg:text-[15px] text-[rgb(255,65,90)] hover:text-[rgb(255,65,90)]/70 transition-colors duration-200"
              >
                Acceder
              </a>
              <Button variant="primary" size="sm" color="pink">
                Explorar Gratis
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 z-[101] min-h-[67px] lg:h-[104px] lg:py-0 lg:px-0`}
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-104px)',
          transition: isVisible 
            ? 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' // Efecto de rebote al aparecer
            : 'transform 0.3s ease-in-out' // Transición suave al ocultar
        }}
      >
        <div 
          className={`w-full transition-all duration-500 ${isScrolled ? 'bg-[rgb(255,245,244)] backdrop-blur-md' : 'bg-transparent'} p-0 m-0`} 
          style={{
            margin: 0,
            padding: 0,
            boxShadow: isScrolled ? '0 2px 8px 0 rgba(30,42,56,0.06)' : 'none'
          }}
        >
          {/* Layout para móvil y tablet */}
          <div className="lg:hidden flex w-full items-start justify-between px-4 sm:px-6 pt-4 pb-2">
            {/* Logo alineado arriba a la izquierda */}
            <div className="flex items-center">
              <Logo isScrolled={isScrolled} />
            </div>
            {/* Hamburguesa alineada a la derecha */}
            <div>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 sm:p-3 rounded-md text-black font-black hover:text-[#4ADE80] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4ADE80] transition-colors duration-200 touch-target"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="block h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            </div>
          </div>
          
          {/* Layout para desktop */}
          <div className="hidden lg:flex w-full items-center justify-center px-4 lg:px-6 pt-4 lg:pt-7 pb-2 lg:pb-4">
            {/* Bloque izquierdo: logo + menú */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Logo isScrolled={isScrolled} />
              </div>
              <div className="hidden lg:block">
                <div className="flex items-baseline space-x-5">
                  {navigationItems.map((item, index) => (
                    <NavItem 
                      key={index}
                      title={item.title}
                      href={item.href}
                      hasDropdown={item.hasDropdown}
                      dropdownItems={item.dropdownItems}
                      megaMenuImage={item.megaMenuImage}
                      isActive={false}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Bloque derecho: botones */}
            <div className="hidden lg:flex items-center gap-3 ml-36">
              <a 
                href="/signin" 
                className="font-rubik font-medium text-base lg:text-[15px] text-[rgb(255,65,90)] hover:text-[rgb(255,65,90)]/70 transition-colors duration-200"
              >
                Acceder
              </a>
              <Button variant="primary" size="sm" color="pink">
                Explorar Gratis
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer 
        navigationItems={navigationItems}
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
