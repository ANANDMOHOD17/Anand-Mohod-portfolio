'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { profileData } from '@/data/profile';
import GlassButton from '@/components/ui/GlassButton';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Achievements', href: '/#achievements' },
  { name: 'Certificates', href: '/#certificates' },
  { name: 'Journey', href: '/#journey' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '';

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

    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'certificates', 'journey', 'contact'];
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
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`glass-panel rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'shadow-glass-md bg-graphite-900/80' : 'bg-graphite-900/50'
            }`}
            aria-label="Main Navigation"
          >
            {/* Monogram + Brand */}
            <Link
              href="/"
              onClick={handleBrandClick}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg p-1"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/15 bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-accent transition-colors group-hover:border-accent/50 shadow-glass-sm flex-shrink-0">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  fill
                  sizes="32px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide text-white group-hover:text-accent transition-colors">
                  {profileData.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
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
                        ? 'text-accent bg-accent/10 border border-accent/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Actions: Resume CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link href="/resume" className="hidden sm:inline-flex">
                <GlassButton variant="secondary" size="sm">
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Resume</span>
                </GlassButton>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Liquid Glass Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden"
          >
            <div className="glass-panel rounded-2xl p-6 shadow-glass-lg border border-white/15 bg-graphite-950/95 backdrop-blur-xl">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/#home"
                  onClick={(e) => handleNavClick(e, '/#home')}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                  <Link
                    href="/resume"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-accent/10 border border-accent/30 text-sm font-semibold text-accent"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      View Resume
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
