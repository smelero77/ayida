"use client";

import {
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";

export default function Header() {
  const navItems = [
    { name: "Plataforma", link: "#features" },
    { name: "Categorías", link: "#categories" },
    { name: "Servicios", link: "#services" },
    { name: "Testimonios", link: "#testimonials" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detectar si está scrolleado
      setIsScrolled(currentScrollY > 50);
      
      // Ocultar/mostrar navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Ocultar al bajar
      } else {
        setIsVisible(true); // Mostrar al subir
      }
      
      setLastScrollY(currentScrollY);
      
      // Detectar sección activa
      const sections = ['hero', 'features', 'categories', 'testimonials', 'services'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Renderizado estático durante SSR
  if (!mounted) {
    return (
      <div className="fixed inset-x-0 top-0 z-50">
        <NavBody isScrolled={false}>
          <NavbarLogo isScrolled={false} />
          <NavItems items={navItems} isScrolled={false} activeSection="" />
          <div className="hidden md:flex items-center gap-4">
            <NavbarButton variant="secondary" isScrolled={false}>Acceder</NavbarButton>
            <NavbarButton variant="primary" isScrolled={false}>Explorar Gratis</NavbarButton>
          </div>
          <MobileNavToggle
            isOpen={false}
            onClick={() => {}}
            isScrolled={false}
          />
        </NavBody>
      </div>
    );
  }

  return (
    <div className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${!isVisible ? 'transform -translate-y-full' : ''}`}>
      {/* Desktop Navigation */}
      <NavBody isScrolled={isScrolled}>
        <NavbarLogo isScrolled={isScrolled} />
        <NavItems items={navItems} isScrolled={isScrolled} activeSection={activeSection} />
        <div className="hidden md:flex items-center gap-4">
          <NavbarButton variant="secondary" isScrolled={isScrolled}>Acceder</NavbarButton>
          <NavbarButton variant="primary" isScrolled={isScrolled}>Explorar Gratis</NavbarButton>
        </div>
        <MobileNavToggle
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isScrolled={isScrolled}
        />
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <MobileNavHeader>
          <NavbarLogo isScrolled={isScrolled} />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(false)}
            isScrolled={isScrolled}
          />
        </MobileNavHeader>

        <MobileNavMenu activeSection={activeSection}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-2xl font-sora font-medium text-white hover:text-[#4ADE80] transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </MobileNavMenu>

        <div className="p-6 border-t border-gray-600">
          <div className="space-y-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="secondary"
              className="w-full text-center"
              isScrolled={isScrolled}
            >
              Acceder
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full text-center"
              isScrolled={isScrolled}
            >
              Explorar Gratis
            </NavbarButton>
          </div>
        </div>
      </MobileNav>
    </div>
  );
}
