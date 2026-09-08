'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor follow
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Disable on touch devices and if user prefers reduced motion
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (touch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, textarea, select, .interactive-hover');
        setIsPointer(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Subtle outer magnetic ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent/40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? (isPointer ? 0.8 : 0.3) : 0,
        }}
        animate={{
          width: isPointer ? 36 : 22,
          height: isPointer ? 36 : 22,
          borderColor: isPointer ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isPointer ? 'rgba(56, 189, 248, 0.05)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </div>
  );
}
