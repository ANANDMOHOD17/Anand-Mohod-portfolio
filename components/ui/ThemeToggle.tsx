'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const applyTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const meta = document.getElementById('theme-color-meta');
    if (meta) {
      meta.setAttribute('content', newTheme === 'dark' ? '#05060a' : '#f1ece4');
    }
  };

  useEffect(() => {
    setMounted(true);
    let currentTheme: 'dark' | 'light' = 'dark';
    try {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (saved === 'dark' || saved === 'light') {
        currentTheme = saved;
      } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = systemPrefersDark ? 'dark' : 'light';
      }
    } catch (_) {}

    applyTheme(currentTheme);

    // Listen for system changes if user hasn't set manual override in localStorage
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem('theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      } catch (_) {}
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme: 'dark' | 'light' = theme === 'dark' ? 'light' : 'dark';
    
    try {
      localStorage.setItem('theme', nextTheme);
    } catch (_) {}

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Optional upgrade: View Transitions API circular reveal
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !prefersReducedMotion
    ) {
      const rect = buttonRef.current?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : 0;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        applyTheme(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: nextTheme === 'dark' ? [...clipPath].reverse() : clipPath,
          },
          {
            duration: 350,
            easing: 'ease-in-out',
            pseudoElement: nextTheme === 'dark' ? '::view-transition-old(root)' : '::view-transition-new(root)',
          }
        );
      });
    } else {
      applyTheme(nextTheme);
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Switch theme"
        className={`nav-theme-toggle opacity-60 ${className}`}
      >
        <Moon className="w-4 h-4 text-[var(--accent)]" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`nav-theme-toggle ${className}`}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center pointer-events-none">
        {/* Sun icon with rotate + fade */}
        <Sun
          className={`w-4 h-4 text-[#F5C542] absolute transition-all duration-300 ease-out transform ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
          aria-hidden={!isDark}
        />
        {/* Moon icon with rotate + fade */}
        <Moon
          className={`w-4 h-4 text-[var(--accent)] absolute transition-all duration-300 ease-out transform ${
            !isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50 pointer-events-none'
          }`}
          aria-hidden={isDark}
        />
      </div>
    </button>
  );
}
