'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

export default function StatCounter({
  value,
  suffix = '+',
  label,
  sublabel,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    if (!isInView) return;

    let start = 0;
    const duration = 1200; // ms
    const stepTime = 30; // ms
    const totalSteps = duration / stepTime;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-accent/40 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
    >
      <div className="flex items-baseline gap-0.5">
        <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-accent">
          {count}
        </span>
        <span className="text-lg sm:text-xl font-bold font-mono text-accent/80">
          {suffix}
        </span>
      </div>
      <div className="mt-1">
        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 block leading-tight">
          {label}
        </span>
        {sublabel && (
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 block">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
