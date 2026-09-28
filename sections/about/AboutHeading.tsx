'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AboutHeadingProps {
  number?: string;
  label?: string;
  description?: string;
}

export default function AboutHeading({
  number = '01',
  label = 'About',
  description = 'A look into my background, computational interests, and drive to build impactful software.',
}: AboutHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // IntersectionObserver: Triggers animation once when section heading enters viewport
  useEffect(() => {
    if (prefersReducedMotion) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect(); // Play only once per page load
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const isAnimated = hasAnimated && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className={cn(
        'section-heading mb-12 md:mb-16 max-w-2xl',
        isAnimated && 'section-heading--active',
        prefersReducedMotion && 'section-heading--reduced-motion'
      )}
    >
      {/* 1. Pill Label "01 / ABOUT" - matching Skills pill structure with accent dot */}
      <div className="section-heading__label inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider text-accent border border-accent/30 bg-accent/10 mb-4 shadow-sm backdrop-blur-sm">
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0"
          aria-hidden="true"
        />
        <span className="font-semibold text-accent">{number}</span>
        <span className="text-accent/60">/</span>
        <span className="uppercase font-medium tracking-wide">{label}</span>
      </div>

      {/* 2. Main Title: "WHO IS ANAND?" - Slide-up + fade-in + gradient color sweep. 
             word-spacing is applied inline to guarantee natural separation between all words.
             The three words are plain text inside the gradient span so spacing is always rendered. */}
      <h2
        className="section-heading__title about-heading-title font-extrabold tracking-tight text-slate-900 dark:text-white"
        aria-label="WHO IS ANAND?"
      >
        <span className="section-heading__line-wrapper block overflow-hidden">
          {/* We use TWO child spans:
              1. "WHO IS" — inherits the parent gradient white-to-indigo
              2. "ANAND?" — the dedicated accent span with its own deeper indigo gradient
              A zero-width non-joiner + explicit space character between them guarantees visual separation
              that is not affected by background-clip: text */}
          <span
            className="section-heading__line section-heading__line-1"
            style={{ wordSpacing: '0.18em' }}
          >
            {'WHO IS '}
            <span className="about-heading__accent font-extrabold tracking-tight">
              {'ANAND?'}
            </span>
          </span>
        </span>
      </h2>

      {/* 3. Underline Accent Divider - draws from left to right after title reveal */}
      <div
        className="section-heading__divider section-heading__divider--about h-0.5 mt-4 rounded-full mr-auto"
        aria-hidden="true"
      />

      {/* 4. Subtitle Editorial Description */}
      {description && (
        <p className="section-heading__subtitle mt-3.5 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
