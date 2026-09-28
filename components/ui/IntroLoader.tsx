'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem('am_portfolio_intro_seen');

    if (prefersReducedMotion || hasSeenIntro) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      handleComplete();
    }, 1350);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('am_portfolio_intro_seen', 'true');
    setLoading(false);
  };

  // Subtle Particle Convergence Canvas
  useEffect(() => {
    if (!loading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const centerX = width / 2;
    const centerY = height / 2;

    const particleCount = 60;
    const particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 80;
      return {
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        originX: centerX + Math.cos(angle) * dist,
        originY: centerY + Math.sin(angle) * dist,
        targetX: centerX + (Math.random() - 0.5) * 60,
        targetY: centerY + (Math.random() - 0.5) * 60,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? '#6366f1' : '#818cf8',
        progress: 0,
        speed: 0.02 + Math.random() * 0.03,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotating wireframe circle
      const time = performance.now() * 0.002;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.stroke();

      // Outer accent ring
      ctx.rotate(-time * 1.5);
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, 68, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Converging particles
      for (const p of particles) {
        p.progress = Math.min(1, p.progress + p.speed);
        // Ease out quad
        const ease = 1 - (1 - p.progress) * (1 - p.progress);
        p.x = p.originX + (p.targetX - p.originX) * ease;
        p.y = p.originY + (p.targetY - p.originY) * ease;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8 * (1 - p.progress * 0.3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [loading]);

  if (!mounted || !loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
          onClick={handleComplete}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite-950 cursor-pointer select-none"
          role="status"
          aria-label="Loading portfolio"
        >
          {/* Ambient center glow */}
          <div className="absolute w-72 h-72 rounded-full bg-accent/10 blur-[90px] pointer-events-none" />

          <div className="relative flex flex-col items-center gap-6">
            {/* Subtle Particle Canvas & Monogram */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />

              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-20 h-20 rounded-2xl bg-white/[0.04] border border-accent/40 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.25)] backdrop-blur-md"
              >
                <span className="font-mono text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-indigo-300">
                  AM
                </span>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-ping" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent" />
              </motion.div>
            </div>

            {/* Subtext and Progress Line */}
            <div className="w-52 flex flex-col items-center gap-2.5">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.15, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-accent via-indigo-400 to-indigo-300 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                />
              </div>
              <div className="flex items-center justify-between w-full text-[10px] font-mono text-slate-500 tracking-wider">
                <span>INITIALIZING</span>
                <span className="uppercase text-accent/80 hover:text-accent">
                  SKIP ➔
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
