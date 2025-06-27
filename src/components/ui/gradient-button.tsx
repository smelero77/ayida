import React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  href,
}) => {
  const baseStyles = "relative overflow-hidden rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base",
    md: "px-6 py-2 text-sm sm:px-8 sm:py-3 sm:text-base",
    lg: "px-6 py-3 text-sm sm:px-8 sm:py-3 sm:text-base md:px-10 md:py-4 md:text-lg",
  };

  const variantStyles = {
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
    secondary: cn(
      "border-2 border-white text-white bg-transparent",
      "hover:bg-white hover:text-blue-600",
      "before:absolute before:inset-0 before:rounded-full",
      "before:bg-white before:opacity-0 hover:before:opacity-100",
      "before:transition-opacity before:duration-300"
    ),
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
}; 