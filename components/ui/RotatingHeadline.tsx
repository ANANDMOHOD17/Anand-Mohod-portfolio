'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface WordPair {
  line1: string;
  line2: string;
}

export const HERO_WORD_PAIRS: WordPair[] = [
  { line1: 'FULL-STACK', line2: 'DEVELOPER' },
  { line1: 'PYTHON', line2: 'DEVELOPER' },
  { line1: 'AI', line2: 'ENTHUSIAST' },
  { line1: 'PROBLEM', line2: 'SOLVER' },
  { line1: 'HACKATHON', line2: 'BUILDER' },
  { line1: 'IDEA TO', line2: 'IMPACT' },
];

// Resting duration: each word pair stays completely calm and readable for 2.8s
const DISPLAY_DURATION = 2800;

// Full wipe duration budget: Line 1 + Line 2 stagger (~90ms) + buffer = 560ms
const WIPE_DURATION = 560;

type TransitionPhase = 'idle' | 'wiping';

export default function RotatingHeadline() {
  const prefersReducedMotion = useReducedMotion();
  const [displayIndex, setDisplayIndex] = useState(0); // currently visible pair
  const [enterIndex, setEnterIndex] = useState<number | null>(null); // incoming pair
  const [phase, setPhase] = useState<TransitionPhase>('idle');

  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const triggerWipe = useCallback(() => {
    const nextIndex = (displayIndex + 1) % HERO_WORD_PAIRS.length;
    setEnterIndex(nextIndex);
    setPhase('wiping');

    // Complete the wipe: switch the displayed pair to next and return to idle
    timerRef.current = setTimeout(() => {
      setDisplayIndex(nextIndex);
      setEnterIndex(null);
      setPhase('idle');
    }, WIPE_DURATION);
  }, [displayIndex]);

  // Main cycling timer — respects visibility and tab activity
  useEffect(() => {
    let scheduleTimer: NodeJS.Timeout | null = null;

    const schedule = () => {
      scheduleTimer = setTimeout(() => {
        if (
          isVisibleRef.current &&
          typeof document !== 'undefined' &&
          document.visibilityState === 'visible'
        ) {
          triggerWipe();
        } else {
          schedule(); // retry when visible
        }
      }, DISPLAY_DURATION);
    };

    schedule();

    const handleVisibilityChange = () => {
      // Checked dynamically by schedule tick
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver: pauses cycling when hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (scheduleTimer) clearTimeout(scheduleTimer);
      clearTimers();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [triggerWipe, clearTimers, prefersReducedMotion]);

  const displayPair = HERO_WORD_PAIRS[displayIndex];
  const enterPair = enterIndex !== null ? HERO_WORD_PAIRS[enterIndex] : null;
  const isWiping = phase === 'wiping';

  // Screen reader accessible static full summary
  const ariaLabel =
    'Anand Mohod — ' +
    HERO_WORD_PAIRS.map((p) => `${p.line1} ${p.line2}`).join(', ');

  // Class helper for outgoing word
  const exitClass = (line: 1 | 2) => {
    if (!isWiping) return '';
    if (prefersReducedMotion) return 'hero-mask-fade-out';
    return line === 1 ? 'hero-mask-exit-line1' : 'hero-mask-exit-line2';
  };

  // Class helper for incoming word
  const enterClass = (line: 1 | 2) => {
    if (prefersReducedMotion) return 'hero-mask-fade-in';
    return line === 1 ? 'hero-mask-enter-line1' : 'hero-mask-enter-line2';
  };

  return (
    <div
      ref={containerRef}
      className="hero-mask-title flex flex-col space-y-2 select-none"
      aria-label={ariaLabel}
    >
      {/* ── Static Label ── fixed at all times, never animates ─────────── */}
      <div className="hero-mask-static-label flex items-center gap-2 mb-1">
        <span className="font-mono text-xs sm:text-sm tracking-wider text-slate-400 uppercase">
          HI, I&apos;M
        </span>
        <span className="font-bold text-xs sm:text-sm tracking-wider text-slate-900 dark:text-white uppercase underline decoration-accent decoration-2 underline-offset-4">
          ANAND
        </span>
        {/* Subtle accent dot indicator */}
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full bg-accent transition-all duration-300 ${
            isWiping ? 'opacity-100 scale-125' : 'opacity-60 scale-100'
          }`}
          aria-hidden="true"
        />
      </div>

      {/*
        ── Curtain Wipe / Mask Stage ─────────────────────────────────────────
        Uses clip-path: inset() curtain wipe with glowing travel edge bar
      */}
      <div className="hero-mask-stage" aria-hidden="true">

        {/* ── LINE 1 (Bold White) ─────────────────────────────────────── */}
        <div className="hero-mask-row hero-mask-line1 mb-1">
          {/* Outgoing Word */}
          {isWiping ? (
            <span
              key={`exit-l1-${displayIndex}`}
              className={`hero-mask-text ${exitClass(1)}`}
            >
              {displayPair.line1}
            </span>
          ) : (
            <span
              key={`rest-l1-${displayIndex}`}
              className="hero-mask-text hero-mask-rest"
            >
              {displayPair.line1}
            </span>
          )}

          {/* Incoming Word (Layered over during wipe) */}
          {isWiping && enterPair && (
            <span
              key={`enter-l1-${enterIndex}`}
              className={`hero-mask-text ${enterClass(1)}`}
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {enterPair.line1}
            </span>
          )}

          {/* Glowing Wipe Edge Accent Line */}
          {isWiping && !prefersReducedMotion && (
            <span className="hero-mask-edge hero-mask-edge-line1" />
          )}
        </div>

        {/* ── LINE 2 (Gradient Fill) ─────────────────────────────────── */}
        <div className="hero-mask-row hero-mask-line2">
          {/* Outgoing Word */}
          {isWiping ? (
            <span
              key={`exit-l2-${displayIndex}`}
              className={`hero-mask-text ${exitClass(2)}`}
            >
              {displayPair.line2}
            </span>
          ) : (
            <span
              key={`rest-l2-${displayIndex}`}
              className="hero-mask-text hero-mask-rest"
            >
              {displayPair.line2}
            </span>
          )}

          {/* Incoming Word */}
          {isWiping && enterPair && (
            <span
              key={`enter-l2-${enterIndex}`}
              className={`hero-mask-text ${enterClass(2)}`}
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {enterPair.line2}
            </span>
          )}

          {/* Glowing Wipe Edge Accent Line (Staggered) */}
          {isWiping && !prefersReducedMotion && (
            <span className="hero-mask-edge hero-mask-edge-line2" />
          )}
        </div>
      </div>
    </div>
  );
}
