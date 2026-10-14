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
      className="p-3.5 sm:p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent)]/40 hover:-translate-y-0.5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
    >
      <div className="flex items-baseline gap-0.5">
        <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-[var(--accent)]">
          {count}
        </span>
        <span className="text-lg sm:text-xl font-bold font-mono text-[var(--accent)]/80">
          {suffix}
        </span>
      </div>
      <div className="mt-1">
        <span className="text-xs sm:text-sm font-semibold text-[var(--text)] block leading-tight">
          {label}
        </span>
        {sublabel && (
          <span className="text-[10px] font-mono text-[var(--text-faint)] mt-0.5 block">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
