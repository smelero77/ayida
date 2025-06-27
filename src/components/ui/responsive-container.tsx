import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full'
};

const paddingClasses = {
  none: '',
  sm: 'px-2 sm:px-4',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-12',
  xl: 'px-8 sm:px-12 lg:px-16'
};

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  maxWidth = '7xl',
  padding = 'md',
  center = true
}) => {
  return (
    <div className={cn(
      'w-full',
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      center && 'mx-auto',
      className
    )}>
      {children}
    </div>
  );
};

interface ResponsiveSectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: string;
}

export const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({
  children,
  className,
  padding = 'lg',
  background
}) => {
  const paddingYClasses = {
    none: '',
    sm: 'py-4 sm:py-6',
    md: 'py-8 sm:py-12',
    lg: 'py-12 sm:py-16 lg:py-20',
    xl: 'py-16 sm:py-20 lg:py-24'
  };

  return (
    <section className={cn(
      'w-full',
      paddingYClasses[padding],
      background,
      className
    )}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </section>
  );
};

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md'
}) => {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6 sm:gap-8',
    lg: 'gap-8 sm:gap-10',
    xl: 'gap-10 sm:gap-12'
  };

  const gridColsClasses = [
    `grid-cols-${cols.mobile || 1}`,
    cols.tablet ? `md:grid-cols-${cols.tablet}` : '',
    cols.desktop ? `lg:grid-cols-${cols.desktop}` : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={cn(
      'grid',
      gridColsClasses,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  weight?: string;
  color?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  className,
  size = { mobile: 'base', tablet: 'lg', desktop: 'xl' },
  weight = 'normal',
  color = 'current'
}) => {
  const sizeClasses = [
    `text-${size.mobile || 'base'}`,
    size.tablet ? `sm:text-${size.tablet}` : '',
    size.desktop ? `lg:text-${size.desktop}` : ''
  ].filter(Boolean).join(' ');

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  return (
    <div className={cn(
      sizeClasses,
      weightClasses[weight as keyof typeof weightClasses] || weightClasses.normal,
      `text-${color}`,
      className
    )}>
      {children}
    </div>
  );
}; 