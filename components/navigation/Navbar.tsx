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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection for homepage
      if (pathname === '/') {
        const sections = ['contact', 'journey', 'certificates', 'achievements', 'projects', 'skills', 'about', 'home'];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
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
