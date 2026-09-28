'use client';

import React, { useEffect, useRef, useState } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*@';

interface ScrambleLetterProps {
  finalChar: string;
  isTriggered: boolean;
  delayMs: number;
  isReducedMotion: boolean;
}

function ScrambleLetter({
  finalChar,
  isTriggered,
  delayMs,
  isReducedMotion,
}: ScrambleLetterProps) {
  const [displayChar, setDisplayChar] = useState(finalChar);
  const [isRevealed, setIsRevealed] = useState(isReducedMotion);

  useEffect(() => {
    if (isReducedMotion) {
      setDisplayChar(finalChar);
      setIsRevealed(true);
      return;
    }

    if (!isTriggered) return;

    let iteration = 0;
    const maxIterations = finalChar === '?' ? 3 : 4;
    let intervalId: NodeJS.Timeout | null = null;

    const timeoutId = setTimeout(() => {
      setIsRevealed(true);
      
      intervalId = setInterval(() => {
        if (iteration >= maxIterations) {
          setDisplayChar(finalChar);
          if (intervalId) clearInterval(intervalId);
        } else {
          setDisplayChar(
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          );
          iteration++;
        }
      }, 45);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTriggered, delayMs, finalChar, isReducedMotion]);

  if (isReducedMotion) {
    return <span>{finalChar}</span>;
  }

  return (
    <span
      aria-hidden="true"
      className="inline-block transition-all duration-400 ease-out font-mono font-bold"
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translateY(0)' : 'translateY(14px)',
        filter: isRevealed ? 'blur(0px)' : 'blur(4px)',
        transitionDuration: '400ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {displayChar}
    </span>
  );
}

interface NormalLetterProps {
  char: string;
  isTriggered: boolean;
  delayMs: number;
  isReducedMotion: boolean;
}

function NormalLetter({
  char,
  isTriggered,
  delayMs,
  isReducedMotion,
}: NormalLetterProps) {
  const [isRevealed, setIsRevealed] = useState(isReducedMotion);

  useEffect(() => {
    if (isReducedMotion) {
      setIsRevealed(true);
      return;
    }

    if (!isTriggered) return;

    const timeoutId = setTimeout(() => {
      setIsRevealed(true);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [isTriggered, delayMs, isReducedMotion]);

  if (isReducedMotion) {
    return <span>{char === ' ' ? '\u00A0' : char}</span>;
  }

  if (char === ' ') {
    return <span className="inline-block" aria-hidden="true">&nbsp;</span>;
  }

  return (
    <span
      aria-hidden="true"
      className="inline-block transition-all duration-400 ease-out"
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translateY(0)' : 'translateY(14px)',
        filter: isRevealed ? 'blur(0px)' : 'blur(4px)',
        transitionDuration: '400ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {char}
    </span>
  );
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [shimmerActive, setShimmerActive] = useState(false);
  const [lineActive, setLineActive] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setIsTriggered(true);
      setShimmerActive(false);
      setLineActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTriggered(true);
            observer.disconnect(); // Play only once per page load
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isReducedMotion || !isTriggered) return;

    // After letters finish revealing (~900ms), start the shimmer and underline animation
    const shimmerTimer = setTimeout(() => {
      setShimmerActive(true);
    }, 950);

    const lineTimer = setTimeout(() => {
      setLineActive(true);
    }, 1050);

    return () => {
      clearTimeout(shimmerTimer);
      clearTimeout(lineTimer);
    };
  }, [isTriggered, isReducedMotion]);

  const prefixLetters = 'WHO IS '.split('');
  const highlightLetters = 'ANAND?'.split('');

  return (
    <div
      ref={containerRef}
      className="about-heading-root mb-12 md:mb-16 max-w-2xl"
    >
      {/* 01 / ABOUT Label - fades in first */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider text-accent border border-accent/30 bg-accent/10 mb-4 shadow-sm transition-all duration-500 ease-out"
        style={{
          opacity: isReducedMotion || isTriggered ? 1 : 0,
          transform: isReducedMotion || isTriggered ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        <span className="font-semibold text-accent">{number}</span>
        <span className="text-accent/60">/</span>
        <span className="uppercase font-medium">{label}</span>
      </div>

      {/* Main Section Title: "WHO IS ANAND?" */}
      <h2
        className="about-title font-extrabold tracking-tight text-slate-900 dark:text-white flex flex-wrap items-baseline gap-x-3 gap-y-1"
        style={{
          fontSize: 'clamp(2rem, 5vw + 0.5rem, 3.25rem)',
          lineHeight: '1.15',
        }}
        aria-label="Who is Anand?"
      >
        {/* Normal text: "WHO IS" */}
        <span className="inline-flex whitespace-pre">
          {prefixLetters.map((char, index) => (
            <NormalLetter
              key={`prefix-${index}`}
              char={char}
              isTriggered={isTriggered}
              delayMs={120 + index * 50}
              isReducedMotion={isReducedMotion}
            />
          ))}
        </span>

        {/* Highlighted text: "ANAND?" with glitch/scramble + subtle gradient shimmer */}
        <span
          className={`about-anand-highlight inline-flex font-mono font-extrabold tracking-tight ${
            shimmerActive ? 'about-anand-shimmer' : 'text-accent'
          }`}
        >
          {highlightLetters.map((char, index) => (
            <ScrambleLetter
              key={`highlight-${index}`}
              finalChar={char}
              isTriggered={isTriggered}
              delayMs={450 + index * 55}
              isReducedMotion={isReducedMotion}
            />
          ))}
        </span>
      </h2>

      {/* Thin accent-colored underline that draws from left to right */}
      <div className="mt-3 relative h-[3px] w-full max-w-[140px] overflow-hidden rounded-full bg-slate-200/40 dark:bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-accent via-indigo-400 to-accent rounded-full transition-all duration-700 ease-out"
          style={{
            width: isReducedMotion || lineActive ? '100%' : '0%',
            opacity: isReducedMotion || lineActive ? 1 : 0,
          }}
        />
      </div>

      {/* Editorial Subtitle */}
      {description && (
        <p
          className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal transition-opacity duration-600 ease-out"
          style={{
            opacity: isReducedMotion || isTriggered ? 1 : 0,
            transitionDelay: isReducedMotion ? '0ms' : '600ms',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
