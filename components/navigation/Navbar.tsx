'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { profileData } from '@/data/profile';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { name: 'About', href: '/#about', number: '01' },
  { name: 'Skills', href: '/#skills', number: '02' },
  { name: 'Projects', href: '/#projects', number: '03' },
  { name: 'Achievements', href: '/#achievements', number: '04' },
  { name: 'Certificates', href: '/#certificates', number: '05' },
  { name: 'Journey', href: '/#journey', number: '06' },
  { name: 'Education', href: '/#education', number: '07' },
  { name: 'Contact', href: '/#contact', number: '09' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '';

  // Active link crossfade state (old pill fades out, new pill fades in over ~260ms)
  const [fadingSection, setFadingSection] = useState<string | null>(null);
  const prevSectionRef = useRef(activeSection);

  useEffect(() => {
    if (activeSection !== prevSectionRef.current) {
      setFadingSection(prevSectionRef.current);
      prevSectionRef.current = activeSection;
      const timer = setTimeout(() => {
        setFadingSection(null);
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const linksContainerRef = useRef<HTMLDivElement>(null);

  // Programmatic scroll lock state & timeout
  const isProgrammaticScrollRef = useRef(false);
  const scrollEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const releaseScrollLock = useCallback(() => {
    if (isProgrammaticScrollRef.current) {
      isProgrammaticScrollRef.current = false;
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
        scrollEndTimeoutRef.current = null;
      }
    }
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Release programmatic scroll lock when the scroll ends
  useEffect(() => {
    const handleScrollEnd = () => {
      releaseScrollLock();
    };

    window.addEventListener('scrollend', handleScrollEnd, { passive: true });
    return () => {
      window.removeEventListener('scrollend', handleScrollEnd);
    };
  }, [releaseScrollLock]);

  // Immediately reveal target section and adjacent neighbors (never show an empty viewport)
  const revealSectionAndNeighbors = (targetEl: HTMLElement) => {
    targetEl.classList.add('is-visible');
    targetEl.querySelectorAll('.section-heading').forEach((h) => h.classList.add('section-heading--active'));

    const prev = targetEl.previousElementSibling as HTMLElement | null;
    const next = targetEl.nextElementSibling as HTMLElement | null;
    if (prev) {
      prev.classList.add('is-visible');
      prev.querySelectorAll('.section-heading').forEach((h) => h.classList.add('section-heading--active'));
    }
    if (next) {
      next.classList.add('is-visible');
      next.querySelectorAll('.section-heading').forEach((h) => h.classList.add('section-heading--active'));
    }

    // Broadcast pre-reveal event to all components
    window.dispatchEvent(new CustomEvent('reveal-section', { detail: { id: targetEl.id } }));
  };

  // Handle smooth navigation clicks reliably on desktop & mobile
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (isHomePage && href.includes('#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        // 1. Immediately set clicked link as active
        setActiveSection(targetId);

        // 2. Set programmatic scroll lock so intermediate sections don't override active pill
        isProgrammaticScrollRef.current = true;
        if (scrollEndTimeoutRef.current) {
          clearTimeout(scrollEndTimeoutRef.current);
        }
        scrollEndTimeoutRef.current = setTimeout(releaseScrollLock, 700);

        // 3. Notify any scroll providers to coordinate smoothly
        window.dispatchEvent(new CustomEvent('programmatic-scroll-start'));

        // 4. Pre-reveal destination section and its neighbors
        revealSectionAndNeighbors(targetEl);

        // 5. Native smooth scroll with CSS scroll-margin-top offset
        targetEl.scrollIntoView({ behavior: 'smooth' });

        // 6. Sync URL hash with replaceState to prevent extra jumps
        window.history.replaceState(null, '', `#${targetId}`);
      }
    }
    setMobileMenuOpen(false);
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      setActiveSection('home');
      isProgrammaticScrollRef.current = true;
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
      scrollEndTimeoutRef.current = setTimeout(releaseScrollLock, 700);

      window.dispatchEvent(new CustomEvent('programmatic-scroll-start'));

      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.history.replaceState(null, '', window.location.pathname);
    }
    setMobileMenuOpen(false);
  };

  // Direct URL hash navigation on mount or hash change
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          revealSectionAndNeighbors(element);
          setActiveSection(id);
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const timeoutId = setTimeout(handleHashNavigation, 100);
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Track active section with ONE IntersectionObserver (rootMargin: "-40% 0px -55% 0px")
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isProgrammaticScrollRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Handle top-of-page check (Home / Hero)
      if (scrollY < 80) {
        setActiveSection('home');
        return;
      }

      // Handle bottom-of-page check (Contact section)
      if (windowHeight + scrollY >= scrollHeight - 60) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (!isHomePage) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const sectionElements = document.querySelectorAll('section[id]');
    if (sectionElements.length === 0) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // ONE IntersectionObserver configured to detect whichever section is crossing ~40% of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (scrollY < 80) {
          setActiveSection('home');
          return;
        }

        if (windowHeight + scrollY >= scrollHeight - 60) {
          setActiveSection('contact');
          return;
        }

        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-2.5 sm:py-3' : 'py-4 sm:py-5'
        }`}
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="target-navbar flex items-center justify-between"
            aria-label="Main Navigation"
          >
            {/* Monogram + Brand */}
            <Link
              href="/"
              onClick={handleBrandClick}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg p-1"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-center font-mono text-xs font-bold text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]/60 shadow-sm flex-shrink-0">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  fill
                  sizes="32px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {profileData.name}
                </span>
                <span className="text-[10px] text-[var(--text-faint)] font-mono hidden sm:inline-block">
                  Comp. Engineering
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (padded pills with active crossfade) */}
            <div
              ref={linksContainerRef}
              className="hidden lg:flex items-center gap-1.5 xl:gap-2 relative"
            >
              {navLinks.map((link) => {
                const sectionId = link.href.replace('/#', '');
                const isActive = pathname === '/' && activeSection === sectionId;
                const isFading = pathname === '/' && fadingSection === sectionId;

                return (
                  <Link
                    key={link.name}
                    ref={(el) => {
                      navLinkRefs.current[sectionId] = el;
                    }}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      'nav-pill-link',
                      isActive && 'nav-pill-link--active',
                      isFading && 'nav-pill-link--fading'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions: Theme Toggle, Resume CTA, and Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* Resume CTA (pill button) */}
              <Link
                href="/resume"
                className="nav-resume-btn"
                aria-label="View Resume"
              >
                <FileText className="w-4 h-4 nav-resume-icon" />
                <span>Resume</span>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] border border-[var(--border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-Screen Mobile Slide-In Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[var(--bg-elevated)]/95 text-[var(--text)] backdrop-blur-2xl"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Top drawer bar with close button */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <Link
                href="/"
                onClick={handleBrandClick}
                className="flex items-center gap-2.5"
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--bg-subtle)]">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    fill
                    sizes="32px"
                    className="object-cover object-top"
                  />
                </div>
                <span className="font-bold text-[var(--text)] text-sm">{profileData.name}</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-[var(--text)] hover:bg-[var(--accent-soft)] border border-[var(--border)]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable tap target links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/#home"
                  onClick={(e) => handleNavClick(e, '/#home')}
                  className={cn(
                    'nav-pill-link w-full justify-between py-3.5 px-4 text-base font-semibold rounded-xl',
                    activeSection === 'home' && 'nav-pill-link--active'
                  )}
                >
                  <span>Home</span>
                  <span className="text-xs font-mono text-[var(--accent)]">00</span>
                </Link>
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('/#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        'nav-pill-link w-full justify-between py-3.5 px-4 text-base font-semibold rounded-xl',
                        isActive && 'nav-pill-link--active'
                      )}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs font-mono text-[var(--accent)]">{link.number}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Action Buttons in Drawer Bottom */}
              <div className="pt-6 border-t border-[var(--border)] flex flex-col gap-3">
                <Link
                  href="/resume"
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-resume-btn w-full justify-between h-[46px] px-5 rounded-xl text-sm"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 nav-resume-icon" />
                    <span>View Resume</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between px-2 pt-2 text-xs text-[var(--text-muted)] font-mono">
                  <span>Theme Preference</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
