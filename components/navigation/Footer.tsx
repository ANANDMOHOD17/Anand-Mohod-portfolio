import React from 'react';
import Link from 'next/link';
import { profileData } from '@/data/profile';
import { Phone, Mail, Linkedin, Github, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-graphite-950/80 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Identity & Status */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center font-mono text-xs font-bold text-accent">
                AM
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                {profileData.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {profileData.title} focused on building practical, reliable software systems and exploring modern web architectures.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Internships & Projects
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#about" className="text-slate-400 hover:text-white transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-slate-400 hover:text-white transition-colors">
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-white transition-colors">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-slate-400 hover:text-white transition-colors">
                  Certificates
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-slate-400 hover:text-white transition-colors">
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Strict 4 Contact Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={profileData.contact.phone.value}
                  className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>{profileData.contact.phone.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.email.value}
                  className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>{profileData.contact.email.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-slate-500" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-500" />
                  <span>GitHub Profile</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {profileData.name}. All rights reserved. Crafted with Next.js & React.</p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
