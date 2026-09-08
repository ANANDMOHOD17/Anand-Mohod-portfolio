'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { profileData } from '@/data/profile';

export default function HeroProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect touch device to disable mouse parallax on mobile
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouch();
  }, []);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for creamy-smooth damping
  const springConfig = { damping: 25, stiffness: 160 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform mouse coordinates into subtle tilt degrees (±6 degrees max)
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  // Transform mouse coordinates into glare/reflection position
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse position from center (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice && !prefersReducedMotion) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative flex items-center justify-center w-full py-4 select-none"
    >
      {/* Gentle Floating Motion Wrapper */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={
          prefersReducedMotion
            ? { y: 0 }
            : { y: [-5, 5, -5] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                repeat: Infinity,
                duration: 5.5,
                ease: 'easeInOut',
              }
        }
        style={{
          rotateX: isTouchDevice || prefersReducedMotion ? 0 : rotateX,
          rotateY: isTouchDevice || prefersReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={
          prefersReducedMotion
            ? undefined
            : { scale: 1.02 }
        }
        className="relative w-[280px] sm:w-[320px] md:w-[340px] max-w-full rounded-3xl p-3 sm:p-3.5 border border-white/15 bg-graphite-900/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(56,189,248,0.08)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_35px_rgba(56,189,248,0.18)] hover:border-accent/40 group"
      >
        {/* Profile Card Main Body */}
        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-graphite-950 border border-white/10 shadow-inner">
          {/* Profile Photo */}
          <Image
            src={profileData.avatar}
            alt={profileData.name}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 340px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />

          {/* Liquid Glass Bottom Gradient for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent pointer-events-none" />

          {/* Dynamic / Ambient Glass Specular Reflection */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-75"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)',
              }}
            />
          )}

          {/* Moving soft glass reflection sheen */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: 'easeInOut',
                repeatDelay: 3,
              }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 pointer-events-none"
            />
          )}

          {/* Active Status Badge (Top-Right) */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-graphite-950/85 border border-white/15 backdrop-blur-md flex items-center gap-1.5 text-xs font-mono text-slate-200 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium tracking-wide text-[11px]">Active</span>
          </div>

          {/* Profile Name and Professional Subtitle (Bottom) */}
          <div className="absolute bottom-3.5 left-4 right-4 text-left pointer-events-none">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md">
              Anand Mohod
            </h2>
            <p className="text-xs sm:text-sm text-accent font-mono mt-0.5 font-medium tracking-wide drop-shadow-sm">
              Computer Engineering Student
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
