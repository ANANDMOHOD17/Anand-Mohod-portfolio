'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { profileData } from '@/data/profile';
import GlassButton from '@/components/ui/GlassButton';
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
        targetEl.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
        setActiveSection(targetId);
      }
    }
    setMobileMenuOpen(false);
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.history.pushState(null, '', window.location.pathname);
      setActiveSection('home');
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
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id);
        }
      }
    };

    const timeoutId = setTimeout(handleHashNavigation, 150);
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Track active section with IntersectionObserver and scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection('contact');
      } else if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (!isHomePage) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'certificates', 'journey', 'education', 'contact'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const primary = visible.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          if (primary.target.id) {
            setActiveSection(primary.target.id);
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

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
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`glass-panel rounded-2xl px-3.5 sm:px-5 py-2.5 flex items-center justify-between transition-all duration-300 border border-slate-200/80 dark:border-white/10 ${
              isScrolled
                ? 'shadow-glass-md bg-white/90 dark:bg-graphite-900/85 backdrop-blur-xl'
                : 'bg-white/70 dark:bg-graphite-900/50 backdrop-blur-md'
            }`}
            aria-label="Main Navigation"
          >
            {/* Monogram + Brand */}
            <Link
              href="/"
              onClick={handleBrandClick}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-300 dark:border-white/15 bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-accent transition-colors group-hover:border-accent/60 shadow-sm flex-shrink-0">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  fill
                  sizes="32px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                  {profileData.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline-block">
                  Comp. Engineering
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('/#', '');
                const isActive = pathname === '/' && activeSection === sectionId;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                      isActive
                        ? 'text-accent bg-accent/15 border border-accent/30 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions: Theme Toggle, Resume CTA (Always visible!), and Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* Resume CTA - Always reachable on desktop and mobile */}
              <Link href="/resume" className="inline-flex">
                <GlassButton variant="secondary" size="sm" className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs">
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span className="font-semibold">Resume</span>
                </GlassButton>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
            className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl"
          >
            {/* Top drawer bar with close button */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200/20 dark:border-white/10">
              <Link
                href="/"
                onClick={handleBrandClick}
                className="flex items-center gap-2.5"
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    fill
                    sizes="32px"
                    className="object-cover object-top"
                  />
                </div>
                <span className="font-bold text-white text-sm">{profileData.name}</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-white hover:bg-white/10 border border-white/10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable large tap target links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/#home"
                  onClick={(e) => handleNavClick(e, '/#home')}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <span>Home</span>
                  <span className="text-xs font-mono text-accent">00</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-accent">{link.number}</span>
                  </Link>
                ))}
              </div>

              {/* Action Buttons in Drawer Bottom */}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="/resume"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm shadow-lg shadow-accent/25"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>View Curriculum Vitae</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-400 font-mono">
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

