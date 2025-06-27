import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  color?: "green" | "pink" | "blue" | "white";
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  color = "green",
  className,
  onClick,
  href,
  disabled = false,
  fullWidth = false,
}) => {
  const baseStyles = "relative overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-lg",
    md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-lg",
    lg: "px-6 py-2.5 text-sm sm:px-8 sm:py-4 sm:text-lg rounded-xl",
  };

  const colorStyles = {
    green: {
      primary: "bg-[#4ADE80] text-white hover:bg-[#22C55E] hover:scale-[1.02] shadow-lg",
      secondary: "border-2 border-[#4ADE80] text-[#4ADE80] hover:bg-[#4ADE80] hover:text-white",
      outline: "border border-[#4ADE80] text-[#4ADE80] hover:bg-[#4ADE80] hover:text-white",
      ghost: "text-[#4ADE80] hover:bg-[#4ADE80]/10",
    },
    pink: {
      primary: cn(
        "text-white shadow-lg",
        "before:absolute before:inset-0 before:rounded-full",
        "before:bg-[radial-gradient(circle_at_25%_-79%,#ff5c72_0%,#ff415a_36%)]",
        "hover:before:opacity-90",
        "after:absolute after:inset-0 after:rounded-full",
        "after:bg-gradient-to-b after:from-white/20 after:to-transparent",
        "after:opacity-0 hover:after:opacity-100",
        "after:transition-opacity after:duration-300"
      ),
      secondary: "border-2 border-[#ff415a] text-[#ff415a] hover:bg-[#ff415a] hover:text-white",
      outline: "border border-[#ff415a] text-[#ff415a] hover:bg-[#ff415a] hover:text-white",
      ghost: "text-[#ff415a] hover:bg-[#ff415a]/10",
    },
    blue: {
      primary: "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] shadow-lg",
      secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      ghost: "text-blue-600 hover:bg-blue-600/10",
    },
    white: {
      primary: "bg-white text-gray-900 hover:bg-gray-100 hover:scale-[1.02] shadow-lg",
      secondary: "border-2 border-white text-white hover:bg-white hover:text-gray-900",
      outline: "border border-white text-white hover:bg-white hover:text-gray-900",
      ghost: "text-white hover:bg-white/10",
    },
  };

  const variantStyles = {
    primary: "rounded-full",
    secondary: "rounded-full",
    outline: "rounded-lg",
    ghost: "rounded-lg",
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        sizeStyles[size],
        colorStyles[color][variant],
        variantStyles[variant],
        fullWidth && "w-full",
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
};
