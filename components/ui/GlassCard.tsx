'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  specular?: boolean;
}

export default function GlassCard({
  children,
  className,
  tilt = true,
  specular = true,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y, active: true });

    if (tilt) {
      // Subtle tilt: max 4 degrees
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      setRotate({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 220,
        mass: 0.6,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'glass-panel rounded-xl overflow-hidden relative transition-colors duration-300',
        className
      )}
      {...(props as any)}
    >
      {/* Dynamic specular light reflection */}
      {specular && mousePos.active && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), transparent 70%)`,
          }}
        />
      )}

      {/* Subtle top rim light */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-20 h-full">{children}</div>
    </motion.div>
  );
}
