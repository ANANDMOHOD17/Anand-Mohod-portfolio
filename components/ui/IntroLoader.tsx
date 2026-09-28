'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    }, 1150);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('am_portfolio_intro_seen', 'true');
    setLoading(false);
  };

  if (!mounted || !loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
          onClick={handleComplete}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite-950 cursor-pointer select-none"
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Monogram Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-20 h-20 rounded-2xl bg-white/[0.04] border border-accent/40 flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.2)]"
            >
              <span className="font-mono text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-accent">
                AM
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-ping" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent" />
            </motion.div>

            {/* Subtext and Progress Line */}
            <div className="w-48 flex flex-col items-center gap-2">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.95, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-accent to-cyan-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]"
                />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">
                Click anywhere to skip
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
