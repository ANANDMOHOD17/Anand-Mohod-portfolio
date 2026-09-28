'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  number: string;
  label: string;
  title: string | string[];
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  number,
  label,
  title,
  titleLine1,
  titleLine2,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
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
          observer.disconnect(); // Never replay once triggered
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

  // Determine lines for 2-line title structure
  let lines: string[] = [];
  if (titleLine1 && titleLine2) {
    lines = [titleLine1, titleLine2];
  } else if (Array.isArray(title)) {
    lines = title;
  } else if (typeof title === 'string') {
    if (title.includes('\n')) {
      lines = title.split('\n');
    } else if (title.includes(' & ')) {
      const parts = title.split(' & ');
      lines = [`${parts[0]} &`, parts.slice(1).join(' & ')];
    } else if (title === 'Featured Engineering Projects') {
      lines = ['Featured', 'Engineering Projects'];
    } else if (title === 'Curriculum Vitae & Summary') {
      lines = ['Curriculum Vitae &', 'Summary'];
    } else {
      lines = [title];
    }
  }

  const isCentered = align === 'center';
  const isAnimated = hasAnimated && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className={cn(
        'section-heading mb-12 md:mb-16',
        isCentered ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl',
        isAnimated && 'section-heading--active',
        prefersReducedMotion && 'section-heading--reduced-motion',
        className
      )}
    >
      {/* 1. Pill Label */}
      <div
        className={cn(
          'section-heading__label inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider text-accent border border-accent/30 bg-accent/10 mb-4 shadow-sm backdrop-blur-sm',
          isCentered && 'justify-center'
        )}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0"
          aria-hidden="true"
        />
        <span className="font-semibold text-accent">{number}</span>
        <span className="text-accent/60">/</span>
        <span className="uppercase font-medium tracking-wide">{label}</span>
      </div>

      {/* 2. Title (Per-Line Slide + Blur + Color Sweep) */}
      <h2
        className={cn(
          'section-heading__title text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]',
          isCentered ? 'text-center' : 'text-left'
        )}
      >
        {lines.map((line, idx) => (
          <span
            key={`heading-line-${idx}`}
            className={cn(
              'section-heading__line-wrapper block overflow-hidden',
              idx > 0 && 'mt-1 sm:mt-1.5'
            )}
          >
            <span
              className={cn(
                'section-heading__line inline-block',
                idx === 0 ? 'section-heading__line-1' : 'section-heading__line-2'
              )}
            >
              {line}
            </span>
          </span>
        ))}
      </h2>

      {/* 3. Subtle Underline Accent Divider */}
      <div
        className={cn(
          'section-heading__divider h-0.5 mt-4 rounded-full',
          isCentered ? 'mx-auto' : 'mr-auto'
        )}
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
