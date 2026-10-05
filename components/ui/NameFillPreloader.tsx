'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

/**
 * ============================================================================
 * BRAND & PRELOADER CONFIGURATION (EASY TO CUSTOMIZE)
 * ============================================================================
 */
export const PRELOADER_CONFIG = {
  // Brand identity
  name: 'ANAND MOHOD',
  heroHeadline: 'DIGITAL SOLUTIONS',

  // Curated color palette
  brandColors: {
    background: '#050505',
    primaryText: '#F5F5F7',
    mutedText: '#8A8A93',
    accent: '#8F8FD6',
    accentGlow: 'rgba(143, 143, 214, 0.45)',
    outlineStroke: 'rgba(138, 138, 147, 0.35)',
  },

  // Monospace corner & status labels
  labels: {
    topLeft: 'INITIALIZING SYSTEM',
    topRight: 'PORTFOLIO 2026',
    topCenter: 'FULL-STACK & AI-DRIVEN APPLICATIONS',
    statusSteps: [
      { threshold: 0, text: 'LOADING ASSETS' },
      { threshold: 25, text: 'COMPILING IDEAS' },
      { threshold: 60, text: 'BUILDING INTERFACE' },
      { threshold: 90, text: 'READY' },
    ],
  },

  // Timing controls (in milliseconds)
  minDurationMs: 2400, // Organic duration (~2.4s)
  initialBlackDelayMs: 300, // Brief initial delay before liquid starts (~0.3s)
  curtainDurationMs: 900, // Horizontal split transition duration (~0.9s)
};

export interface NameFillPreloaderProps {
  name?: string;
  onComplete?: () => void;
  enableSessionSkip?: boolean;
}

/**
 * Single Odometer Digit Column (0-9)
 * Uses pure CSS transforms for silky 60fps vertical rolling
 */
const OdometerColumn = React.memo(({ value }: { value: number }) => {
  return (
    <div
      className="inline-block relative overflow-hidden h-[1em] w-[0.62em] align-baseline select-none"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}
    >
      <div
        className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform"
        style={{
          transform: `translateY(-${Math.max(0, Math.min(9, value)) * 10}%)`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <span
            key={digit}
            className="h-[1em] flex items-center justify-center font-extrabold text-[#F5F5F7] leading-none"
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
});

OdometerColumn.displayName = 'OdometerColumn';

export default function NameFillPreloader({
  name = PRELOADER_CONFIG.name,
  onComplete,
  enableSessionSkip = false,
}: NameFillPreloaderProps) {
  // ── State Management ──────────────────────────────────────────────────────
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  const animationFrameRef = useRef<number | null>(null);
  const isCompleteRef = useRef<boolean>(false);

  // ── Reduced Motion Check ──────────────────────────────────────────────────
  const checkReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // ── Handle Completion & Handoff ───────────────────────────────────────────
  const triggerExitSequence = useCallback(() => {
    if (isCompleteRef.current) return;
    isCompleteRef.current = true;

    // 1. Flash the name fully lit at 100%
    setIsFlashing(true);

    // 2. Start curtain split after a brief flash apex (~260ms)
    setTimeout(() => {
      setIsExiting(true);

      // Unhide the portfolio content right as the curtain panels start splitting
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('is-loading');
        document.body.classList.remove('is-loading');
      }

      // Dispatch custom event for hero section or other listeners
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('portfolio-loader-complete'));
      }
    }, 250);

    // 3. Cleanly unmount preloader once curtain panels slide completely offscreen (~0.9s)
    setTimeout(() => {
      setIsMounted(false);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
      if (enableSessionSkip && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('portfolio_preloader_seen', 'true');
      }
      onComplete?.();
    }, 250 + PRELOADER_CONFIG.curtainDurationMs + 50);
  }, [enableSessionSkip, onComplete]);

  // ── Organic Progress Loop ─────────────────────────────────────────────────
  useEffect(() => {
    let isActive = true;

    // Lock body scroll immediately
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    const prefersReducedMotion = checkReducedMotion();

    // Session storage skip check (if enabled)
    if (enableSessionSkip && typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('portfolio_preloader_seen') === 'true') {
        setProgress(100);
        triggerExitSequence();
        return;
      }
    }

    if (prefersReducedMotion) {
      setShowContent(true);
      setProgress(100);
      setTimeout(() => {
        if (isActive) triggerExitSequence();
      }, 250);
      return;
    }

    // Phase 1: Pure black screen for brief initial delay (~0.3s)
    const initialTimer = setTimeout(() => {
      if (!isActive) return;
      setShowContent(true);
      setIsBreathing(true);

      // Phase 2: Organic Non-linear Loading Loop
      const startTime = performance.now();
      const minDuration = PRELOADER_CONFIG.minDurationMs;
      let assetsLoaded = false;

      // Monitor actual asset readiness
      if (typeof document !== 'undefined') {
        if (document.readyState === 'complete') {
          assetsLoaded = true;
        } else {
          window.addEventListener(
            'load',
            () => {
              assetsLoaded = true;
            },
            { once: true }
          );
        }
        if (document.fonts?.ready) {
          document.fonts.ready.then(() => {
            assetsLoaded = true;
          });
        }
      }

      const updateProgress = (currentTime: number) => {
        if (!isActive) return;
        const elapsed = currentTime - startTime;
        const normalizedTime = Math.min(1, elapsed / minDuration);

        let targetProgress = 0;

        /**
         * Organic progression curve:
         * - 0 to 45%: Fast start
         * - 45 to 70%: Steady progression
         * - ~70%: Brief plateau/stall (verifying assets)
         * - 72 to 100%: Swift finish to 100%
         */
        if (normalizedTime < 0.3) {
          targetProgress = (normalizedTime / 0.3) * 45;
        } else if (normalizedTime < 0.6) {
          targetProgress = 45 + ((normalizedTime - 0.3) / 0.3) * 23;
        } else if (normalizedTime < 0.78) {
          const stallProgress = 68 + ((normalizedTime - 0.6) / 0.18) * 3;
          targetProgress = assetsLoaded ? stallProgress + 1 : stallProgress;
        } else {
          targetProgress = 71 + ((normalizedTime - 0.78) / 0.22) * 29;
        }

        const nextProgress = Math.min(100, Math.round(targetProgress));
        setProgress(nextProgress);

        if (nextProgress >= 100) {
          triggerExitSequence();
        } else {
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }, PRELOADER_CONFIG.initialBlackDelayMs);

    // Fail-safe watchdog timer: Never let the screen hang for more than 3.8s
    const safetyWatchdog = setTimeout(() => {
      if (isActive && !isCompleteRef.current) {
        setShowContent(true);
        setProgress(100);
        triggerExitSequence();
      }
    }, 3800);

    return () => {
      isActive = false;
      clearTimeout(initialTimer);
      clearTimeout(safetyWatchdog);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [checkReducedMotion, enableSessionSkip, triggerExitSequence]);

  // ── Mouse Cursor Follow Glow ──────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ── Dynamic Status Label Calculation ──────────────────────────────────────
  const currentStatus = useMemo(() => {
    const steps = PRELOADER_CONFIG.labels.statusSteps;
    let label = steps[0].text;
    for (const step of steps) {
      if (progress >= step.threshold) {
        label = step.text;
      }
    }
    return label;
  }, [progress]);

  // ── Counter Digit Calculations (0 to 100) ─────────────────────────────────
  const hundreds = Math.floor(progress / 100);
  const tens = Math.floor((progress % 100) / 10);
  const ones = progress % 10;

  // Split name for optimal responsive wrapping across mobile to 4K
  const safeName = name || PRELOADER_CONFIG.name;
  const nameParts = useMemo(() => safeName.trim().split(/\s+/), [safeName]);

  if (!isMounted) return null;

  return (
    <div
      id="portfolio-preloader-root"
      onClick={() => triggerExitSequence()}
      className="fixed inset-0 z-[99999] select-none overflow-hidden cursor-pointer"
      role="status"
      aria-label="Loading portfolio. Click anywhere to skip."
    >
      {/* ── Film Grain Noise Overlay ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-screen z-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ── Interactive Cursor Follow Lavender Glow ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-10"
        style={{
          opacity: showContent && !isExiting ? 1 : 0,
          background:
            mousePos.x >= 0
              ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(143, 143, 214, 0.08), transparent 70%)`
              : 'none',
        }}
      />

      {/*
        ── CURTAIN PANEL 1: TOP HALF (0 to 50vh) ─────────────────────────────
        Slides UP (-100%) with cubic-bezier(0.76, 0, 0.24, 1) upon reaching 100%
      */}
      <div
        className="absolute top-0 left-0 right-0 h-[50vh] bg-[#050505] will-change-transform z-20 pointer-events-none"
        style={{
          transform: isExiting ? 'translateY(-100%)' : 'translateY(0%)',
          transition: `transform ${PRELOADER_CONFIG.curtainDurationMs}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      >
        {/* Horizontal Seam Flare Line (Bottom edge of top panel) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8F8FD6]/70 to-transparent transition-opacity duration-300"
          style={{ opacity: isFlashing || isExiting ? 1 : 0 }}
        />
      </div>

      {/*
        ── CURTAIN PANEL 2: BOTTOM HALF (50vh to 100vh) ──────────────────────
        Slides DOWN (100%) with cubic-bezier(0.76, 0, 0.24, 1) upon reaching 100%
      */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[#050505] will-change-transform z-20 pointer-events-none"
        style={{
          transform: isExiting ? 'translateY(100%)' : 'translateY(0%)',
          transition: `transform ${PRELOADER_CONFIG.curtainDurationMs}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      >
        {/* Horizontal Seam Flare Line (Top edge of bottom panel) */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8F8FD6]/70 to-transparent transition-opacity duration-300"
          style={{ opacity: isFlashing || isExiting ? 1 : 0 }}
        />
      </div>

      {/*
        ── FOREGROUND PRELOADER CONTENT ───────────────────────────────────────
        Contains Name Fill, Rolling Odometer, Corner Monospace Labels
      */}
      <div
        className="relative z-30 w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: showContent && !isExiting ? 1 : 0,
        }}
      >
        {/* ── TOP CORNER LABELS ────────────────────────────────────────────── */}
        <div className="w-full flex items-center justify-between">
          {/* Top Left: Initializing System + Blinking Lavender Dot */}
          <div className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs text-[#8A8A93] tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8F8FD6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8F8FD6]" />
            </span>
            <span>{PRELOADER_CONFIG.labels.topLeft}</span>
          </div>

          {/* Top Center: Subtitle Tagline */}
          <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] text-[#8A8A93]/70 uppercase text-center whitespace-nowrap">
            {PRELOADER_CONFIG.labels.topCenter}
          </div>

          {/* Top Right: Portfolio Year */}
          <div className="font-mono text-[11px] sm:text-xs text-[#8A8A93] tracking-widest uppercase">
            <span>{PRELOADER_CONFIG.labels.topRight}</span>
            <span className="ml-3 text-[10px] text-[#8A8A93]/50 hover:text-[#8F8FD6] cursor-pointer hidden md:inline">
              [SKIP ➔]
            </span>
          </div>
        </div>

        {/*
          ── CENTER: THE HUGE "NAME FILL" + CENTERED ROLLING COUNTER ──────────
          Outline text base with bottom-to-top liquid gradient rising fill,
          followed by centered rolling percentage counter directly below.
        */}
        <div className="w-full flex flex-col items-center justify-center my-auto py-8">
          <div
            className="relative inline-flex flex-col items-center justify-center font-grotesk font-black uppercase text-center select-none"
            style={{
              fontSize: 'clamp(2.75rem, 11.5vw, 11rem)',
              lineHeight: 0.88,
            }}
          >
            {/* Ambient Backlight Glow behind Name */}
            <div
              className="absolute inset-0 rounded-full blur-[90px] pointer-events-none transition-opacity duration-500 -z-10"
              style={{
                background: 'rgba(143, 143, 214, 0.12)',
                opacity: progress > 15 ? 1 : 0,
              }}
            />

            {/* LAYER 1: Outline-Only Text (1px stroke, low opacity) */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-x-[0.26em] select-none text-center"
              style={{
                WebkitTextStroke: `1px ${PRELOADER_CONFIG.brandColors.outlineStroke}`,
                color: 'transparent',
                letterSpacing: isBreathing ? '-0.015em' : '-0.035em',
                transition: 'letter-spacing 3.5s ease-in-out',
              }}
            >
              {nameParts.map((part, idx) => (
                <span key={`outline-${idx}`} className="inline-block whitespace-nowrap">
                  {part}
                </span>
              ))}
            </div>

            {/* LAYER 2: Liquid Gradient Rising Fill (0% to 100% bottom to top) */}
            <div
              className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center gap-x-[0.26em] select-none text-center pointer-events-none"
              style={{
                background: 'linear-gradient(to top, #8F8FD6 0%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                clipPath: `inset(${100 - progress}% 0 0 0)`,
                WebkitClipPath: `inset(${100 - progress}% 0 0 0)`,
                filter: isFlashing
                  ? 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 70px rgba(143, 143, 214, 0.9)) brightness(1.6)'
                  : 'drop-shadow(0 0 16px rgba(143, 143, 214, 0.5))',
                letterSpacing: isBreathing ? '-0.015em' : '-0.035em',
                transition: 'letter-spacing 3.5s ease-in-out, filter 0.25s ease',
              }}
            >
              {nameParts.map((part, idx) => (
                <span key={`fill-${idx}`} className="inline-block whitespace-nowrap">
                  {part}
                </span>
              ))}
            </div>

            {/* Faint Lavender Glow Line at the Liquid Fill Edge */}
            <div
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                bottom: `${progress}%`,
                height: '2px',
                opacity: progress > 1 && progress < 99 ? 0.9 : 0,
                background:
                  'linear-gradient(90deg, transparent 5%, rgba(143, 143, 214, 0.7) 20%, #FFFFFF 50%, rgba(143, 143, 214, 0.7) 80%, transparent 95%)',
                boxShadow:
                  '0 0 16px rgba(143, 143, 214, 0.9), 0 0 32px rgba(143, 143, 214, 0.5)',
                transform: 'translateY(50%)',
                transition: 'opacity 0.2s ease',
              }}
            />
          </div>

          {/* ── CENTERED ROLLING PERCENTAGE COUNTER BELOW THE NAME ─────────── */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center select-none">
            <div className="flex items-baseline font-grotesk font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-[#F5F5F7] tabular-nums">
              {/* Hundreds digit (rolls to 1 when reaching 100) */}
              <div
                className="overflow-hidden transition-all duration-300 ease-out inline-flex align-baseline"
                style={{
                  width: progress >= 100 ? '0.62em' : '0px',
                  opacity: progress >= 100 ? 1 : 0,
                }}
              >
                <div className="h-[1em] overflow-hidden inline-flex items-center justify-center">
                  <span className="h-[1em] flex items-center justify-center font-extrabold text-[#F5F5F7] leading-none">
                    1
                  </span>
                </div>
              </div>

              {/* Tens Column */}
              <OdometerColumn value={tens} />

              {/* Ones Column */}
              <OdometerColumn value={ones} />

              {/* Accent % Symbol */}
              <span className="text-lg sm:text-xl lg:text-2xl font-mono font-bold text-[#8F8FD6] ml-1.5 self-start mt-1">
                %
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F8FD6] animate-pulse" />
              <span className="font-mono text-[10px] text-[#8A8A93] tracking-widest uppercase">
                SYSTEM INTEGRITY
              </span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM ROW: STATUS & PROTOCOL TELEMETRY ──────────────────────── */}
        <div className="w-full flex items-end justify-between">
          {/* Bottom Left: Protocol Label */}
          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm text-[#8A8A93] tracking-wider uppercase">
              <span className="text-[#8F8FD6] mr-2">SYS //</span>
              <span className="text-[#F5F5F7] font-semibold">SYNCHRONIZING</span>
            </span>
            <span className="font-mono text-[10px] text-[#8A8A93]/60 tracking-widest uppercase mt-1">
              CORE PROTOCOL
            </span>
          </div>

          {/* Bottom Right: Dynamic Status Line */}
          <div className="flex flex-col items-end">
            <div className="font-mono text-xs sm:text-sm text-[#8A8A93] tracking-wider uppercase flex items-center gap-2">
              <span className="text-[#8F8FD6] font-semibold">STAGE //</span>
              <span
                key={currentStatus}
                className="text-[#F5F5F7] font-bold animate-fade-in inline-block min-w-[130px] sm:min-w-[170px] text-right"
              >
                {currentStatus}
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#8A8A93]/60 tracking-widest uppercase mt-1">
              ACTIVE SEQUENCE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
