"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  isScrolled?: boolean;
  isVisible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  isScrolled?: boolean;
  activeSection?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  );
};

export const NavBody = ({ children, className, isScrolled }: NavBodyProps) => {
  return (
    <div className={cn(
      "w-full transition-all duration-300",
      isScrolled 
        ? "bg-[rgba(30,42,56,0.8)] backdrop-blur-md shadow-lg" 
        : "bg-transparent",
      className
    )}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export const NavItems = ({ items, className, isScrolled, activeSection }: NavItemsProps) => {
  return (
    <nav className={cn("hidden md:flex items-center space-x-8", className)}>
      {items.map((item, index) => {
        const sectionId = item.link.replace('#', '');
        const isActive = activeSection === sectionId;
        
        return (
          <a
            key={index}
            href={item.link}
            className={cn(
              "relative py-2 transition-all duration-200 font-inter",
              isScrolled ? "text-white" : "text-white",
              isActive && "text-[#4ADE80]"
            )}
          >
            {item.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4ADE80] transition-all duration-200"></span>
            )}
          </a>
        );
      })}
    </nav>
  );
};

export const MobileNav = ({ children, className, isOpen, onClose }: MobileNavProps) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <div className={cn(
        "fixed inset-0 bg-[#1E2A38] z-50 transform transition-transform duration-300 md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full",
        className
      )}>
        <div className="flex flex-col h-full">
          {children}
        </div>
      </div>
    </>
  );
};

export const MobileNavHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-600">
      {children}
    </div>
  );
};

export const MobileNavToggle = ({ 
  isOpen, 
  onClick,
  isScrolled 
}: { 
  isOpen: boolean; 
  onClick: () => void;
  isScrolled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "md:hidden p-2 transition-colors duration-200",
        isScrolled ? "text-white" : "text-white"
      )}
      aria-label="Toggle menu"
    >
      {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
    </button>
  );
};

export const MobileNavMenu = ({ 
  children,
  activeSection 
}: { 
  children: React.ReactNode;
  activeSection?: string;
}) => {
  return (
    <nav className="flex-1 px-6 py-8">
      <div className="space-y-6">
        {children}
      </div>
    </nav>
  );
};

export const NavbarLogo = ({ isScrolled }: { isScrolled?: boolean }) => {
  return (
    <a
      href="#hero"
      className="flex items-center space-x-2"
    >
      <div className="w-8 h-8 bg-[#4ADE80] rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-[#1E2A38]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <span className={cn(
        "font-sora font-bold text-xl transition-colors duration-200",
        isScrolled ? "text-white" : "text-white"
      )}>
        ZÉTIKA
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  isScrolled,
  onClick,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  isScrolled?: boolean;
  onClick?: () => void;
  [key: string]: any;
}) => {
  const baseStyles = "px-6 py-2 rounded-lg font-inter font-medium transition-all duration-200 relative overflow-hidden ripple-effect";
  
  const variantStyles = {
    primary: "bg-[#4ADE80] text-white hover:bg-[#22C55E] hover:scale-[1.02]",
    secondary: cn(
      "border transition-colors duration-200",
      isScrolled 
        ? "border-white text-white hover:bg-white/10" 
        : "border-white text-white hover:bg-white/10"
    ),
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}; 