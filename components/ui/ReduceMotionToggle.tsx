'use client';

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function ReduceMotionToggle() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('am_reduce_motion');
    const prefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isReduced = saved !== null ? saved === 'true' : prefers;

    setReducedMotion(isReduced);
    if (isReduced) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, []);

  const toggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    localStorage.setItem('am_reduce_motion', String(next));

    if (next) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleReducedMotion}
      aria-label={reducedMotion ? 'Enable animations and motion effects' : 'Reduce motion and animations'}
      title={reducedMotion ? 'Motion: Reduced (Click to enable)' : 'Motion: On (Click to reduce)'}
      className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium glass-card border border-white/10 dark:border-white/10 text-slate-400 hover:text-white transition-all duration-200 hover:border-accent/40 shadow-lg backdrop-blur-md focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
    >
      {reducedMotion ? (
        <>
          <EyeOff className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] text-amber-300">Motion: Reduced</span>
        </>
      ) : (
        <>
          <Eye className="w-3.5 h-3.5 text-accent" />
          <span className="text-[11px]">Motion: On</span>
        </>
      )}
    </button>
  );
}

export default ReduceMotionToggle;
