'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export default function GlassButton({
  children,
  variant = 'secondary',
  size = 'md',
  asLink = false,
  href,
  target,
  rel,
  className,
  ...props
}: GlassButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Subtle magnetic pull: max 3px
    setOffset({ x: x * 0.12, y: y * 0.12 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary: 'glass-button-primary font-semibold',
    secondary: 'glass-button',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent',
  };

  const motionProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: offset.x, y: offset.y },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', damping: 20, stiffness: 350, mass: 0.5 },
  };

  if (asLink && href) {
    return (
      <motion.a
        ref={btnRef as any}
        href={href}
        target={target}
        rel={rel}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...(motionProps as any)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={btnRef as any}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...(motionProps as any)}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
