'use client';

import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { profileData } from '@/data/profile';
import { Phone, Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const contactMethods = [
    {
      label: 'PHONE',
      value: profileData.contact.phone.display,
      href: profileData.contact.phone.value,
      icon: <Phone className="w-6 h-6 text-accent" />,
      subtext: 'Direct Phone & Call',
      external: false,
    },
    {
      label: 'EMAIL',
      value: profileData.contact.email.display,
      href: profileData.contact.email.value,
      icon: <Mail className="w-6 h-6 text-accent" />,
      subtext: 'Inquiries & Collaboration',
      external: false,
    },
    {
      label: 'LINKEDIN',
      value: profileData.contact.linkedin.display,
      href: profileData.contact.linkedin.url,
      icon: <Linkedin className="w-6 h-6 text-accent" />,
      subtext: 'Professional Network',
      external: true,
    },
    {
      label: 'GITHUB',
      value: profileData.contact.github.display,
      href: profileData.contact.github.url,
      icon: <Github className="w-6 h-6 text-accent" />,
      subtext: 'Code Repositories & Activity',
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="09"
          label="Contact"
          title="Let's Connect"
          description="Have a project, engineering opportunity, or technical question? Reach out through any of the four verified channels below."
          align="center"
        />

        {/* Strictly ONLY the 4 required contact options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              target={method.external ? '_blank' : undefined}
              rel={method.external ? 'noopener noreferrer' : undefined}
              className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
            >
              <GlassCard
                className="p-6 h-full flex flex-col justify-between hover:border-accent/50 hover:bg-graphite-850/90 transition-all duration-300"
                tilt={true}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-accent/40 transition-transform">
                    {method.icon}
                  </div>

                  <span className="text-[11px] font-mono tracking-wider text-slate-500 block uppercase">
                    {method.label}
                  </span>

                  <h3
                    className="text-sm sm:text-base font-bold text-white mt-1 group-hover:text-accent transition-colors break-words leading-snug"
                    title={method.value}
                  >
                    {method.value}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2">
                    {method.subtext}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-accent transition-colors">
                  <span>Connect</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </GlassCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
