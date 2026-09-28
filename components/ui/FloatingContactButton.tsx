'use client';

import React, { useState } from 'react';
import { profileData } from '@/data/profile';
import { MessageCircle, X, Phone, Mail, Linkedin, Github } from 'lucide-react';

interface ContactOption {
  label: string;
  icon: React.ReactNode;
  href: string;
  external: boolean;
}

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const options: ContactOption[] = [
    {
      label: 'Phone',
      icon: <Phone className="w-4 h-4" />,
      href: profileData.contact.phone.value,
      external: false,
    },
    {
      label: 'Email',
      icon: <Mail className="w-4 h-4" />,
      href: profileData.contact.email.value,
      external: false,
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      href: profileData.contact.linkedin.url,
      external: true,
    },
    {
      label: 'GitHub',
      icon: <Github className="w-4 h-4" />,
      href: profileData.contact.github.url,
      external: true,
    },
  ];

  return (
    <>
      {/* Backdrop for closing the menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating button group — visible only on mobile/tablet */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 lg:hidden">
        {/* Contact sub-options */}
        {isOpen && (
          <div className="flex flex-col items-end gap-2">
            {options.map((opt) => (
              <a
                key={opt.label}
                href={opt.href}
                target={opt.external ? '_blank' : undefined}
                rel={opt.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-graphite-900 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-xs font-mono font-medium shadow-lg hover:border-accent/50 hover:text-accent transition-all"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-accent">{opt.icon}</span>
                <span>{opt.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Main FAB toggle button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
          aria-expanded={isOpen}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent border ${
            isOpen
              ? 'bg-graphite-950 dark:bg-white/10 border-white/20 text-white rotate-90'
              : 'bg-accent text-graphite-950 border-accent hover:scale-105'
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
}
