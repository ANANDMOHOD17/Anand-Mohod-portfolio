'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { profileData } from '@/data/profile';
import { Phone, Mail, Linkedin, Github, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '';

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
      }
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-graphite-950/80 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Identity & Status */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center font-mono text-xs font-bold text-accent">
                AM
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                {profileData.name}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              {profileData.title} focused on building practical, reliable software systems
              and exploring modern full-stack and AI architectures.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Internships & Projects
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-4 font-semibold">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/#about', label: 'About Me' },
                { href: '/#skills', label: 'Technical Skills' },
                { href: '/projects', label: 'Projects & Case Studies' },
                { href: '/certificates', label: 'Certificates' },
                { href: '/resume', label: 'Resume' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-4 font-semibold">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={profileData.contact.phone.value}
                  className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  <span>{profileData.contact.phone.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.email.value}
                  className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  <span className="break-all">{profileData.contact.email.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-accent transition-colors"
                >
                  <Github className="w-4 h-4 text-accent/60 flex-shrink-0" />
                  <span>GitHub Profile</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/70 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>
            © {currentYear}{' '}
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              {profileData.name}
            </span>
            . Crafted with Next.js & React.
          </p>
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-white transition-colors group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
}
