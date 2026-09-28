'use client';

import React, { useState, useCallback } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import Toast from '@/components/ui/Toast';
import MagneticButton from '@/components/ui/MagneticButton';
import { profileData } from '@/data/profile';
import { Phone, Mail, Linkedin, Github, ArrowUpRight, Copy, Check } from 'lucide-react';

interface ContactMethod {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  subtext: string;
  external: boolean;
  copyable?: boolean;
  copyValue?: string;
}

export default function ContactSection() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const toastTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const copiedTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 2500);
  }, []);

  const handleCopy = async (
    e: React.MouseEvent,
    copyValue: string,
    label: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopiedLabel(label);
      showToast(`${label} copied to clipboard!`);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setCopiedLabel(null), 2000);
    } catch {
      // Fallback: open href via parent anchor
    }
  };

  const contactMethods: ContactMethod[] = [
    {
      label: 'PHONE',
      value: profileData.contact.phone.display,
      href: profileData.contact.phone.value,
      icon: <Phone className="w-6 h-6 text-[#8B8F9F]" />,
      subtext: 'Tap to call directly',
      external: false,
      copyable: true,
      copyValue: profileData.contact.phone.display,
    },
    {
      label: 'EMAIL',
      value: profileData.contact.email.display,
      href: profileData.contact.email.value,
      icon: <Mail className="w-6 h-6 text-[#8B8F9F]" />,
      subtext: 'Inquiries & collaboration',
      external: false,
      copyable: true,
      copyValue: profileData.contact.email.display,
    },
    {
      label: 'LINKEDIN',
      value: profileData.contact.linkedin.display,
      href: profileData.contact.linkedin.url,
      icon: <Linkedin className="w-6 h-6 text-[#8B8F9F]" />,
      subtext: 'Professional network',
      external: true,
      copyable: true,
      copyValue: profileData.contact.linkedin.url,
    },
    {
      label: 'GITHUB',
      value: profileData.contact.github.display,
      href: profileData.contact.github.url,
      icon: <Github className="w-6 h-6 text-[#8B8F9F]" />,
      subtext: 'Code repositories & activity',
      external: true,
      copyable: true,
      copyValue: profileData.contact.github.url,
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="09"
          label="Contact"
          title="Let's Connect"
          description="Have a project, internship opportunity, or technical question? Reach out through any of the verified channels below — one click copies any detail."
          align="center"
        />

        {/* 4 Magnetic Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {contactMethods.map((method) => {
            const isCopied = copiedLabel === method.label;

            return (
              <MagneticButton key={method.label} strength={0.15} className="w-full h-full">
                <a
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
                >
                  <GlassCard
                    className="p-6 h-full flex flex-col justify-between hover:border-accent/50 transition-all duration-300 shadow-glass-sm hover:shadow-[0_15px_35px_rgba(99,102,241,0.12)]"
                    tilt={true}
                  >
                    <div>
                      {/* Icon container — neutral idle, accent on hover */}
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-[#2E2E3A] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#6366F1]/40 transition-transform">
                        {method.icon}
                      </div>

                      <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-500 block uppercase mb-1">
                        {method.label}
                      </span>

                      <h3
                        className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-accent transition-colors break-all leading-snug"
                        title={method.value}
                      >
                        {method.value}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        {method.subtext}
                      </p>
                    </div>

                    {/* Card footer: Open link + 1-click Copy */}
                    <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 dark:text-slate-500 group-hover:text-accent transition-colors flex items-center gap-1">
                        {method.external ? 'Open' : 'Connect'}
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>

                      {/* Copy button */}
                      {method.copyable && method.copyValue && (
                        <button
                          type="button"
                          onClick={(e) =>
                            handleCopy(e, method.copyValue!, method.label)
                          }
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] transition-all border ${
                            isCopied
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                              : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-accent hover:border-accent/40'
                          }`}
                          aria-label={`Copy ${method.label}`}
                          title={`Copy ${method.label}`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </GlassCard>
                </a>
              </MagneticButton>
            );
          })}
        </div>
      </div>

      {/* Toast notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </section>
  );
}
