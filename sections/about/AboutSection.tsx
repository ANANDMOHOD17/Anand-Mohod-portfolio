'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AboutHeading from './AboutHeading';
import { profileData } from '@/data/profile';
import { Cpu, Lightbulb, CheckCircle2 } from 'lucide-react';
import { TRANSITION_EASE } from '@/lib/motion';

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isPreRevealed, setIsPreRevealed] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handleReveal = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail?.id || detail.id === 'about') {
        setIsPreRevealed(true);
      }
    };
    if (sectionRef.current?.classList.contains('is-visible')) {
      setIsPreRevealed(true);
    }
    window.addEventListener('reveal-section', handleReveal);
    return () => window.removeEventListener('reveal-section', handleReveal);
  }, []);

  const textVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 16 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion || isPreRevealed ? 0 : custom * 0.06,
      },
    }),
  };

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutHeading
          number="01"
          label="About"
          description="A look into my background, computational interests, and drive to build impactful software."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Editorial Text with Masked Staggered Scroll Reveals */}
          <div className="lg:col-span-7 space-y-6 text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
            <motion.p
              custom={0}
              variants={textVariants}
              initial={isPreRevealed ? 'visible' : 'hidden'}
              whileInView="visible"
              animate={isPreRevealed ? 'visible' : undefined}
              viewport={{ once: true, margin: '0px 0px -10% 0px', amount: 0.1 }}
              className="text-xl md:text-2xl font-semibold text-[var(--text)] leading-relaxed"
            >
              {profileData.about.lead}
            </motion.p>

            {profileData.about.paragraphs.map((para, index) => (
              <motion.p
                key={index}
                custom={index + 1}
                variants={textVariants}
                initial={isPreRevealed ? 'visible' : 'hidden'}
                whileInView="visible"
                animate={isPreRevealed ? 'visible' : undefined}
                viewport={{ once: true, margin: '0px 0px -10% 0px', amount: 0.1 }}
                className="text-[var(--text-muted)] font-normal leading-relaxed"
              >
                {para}
              </motion.p>
            ))}

            {/* Core Values / Philosophy */}
            <motion.div
              custom={profileData.about.paragraphs.length + 1}
              variants={textVariants}
              initial={isPreRevealed ? 'visible' : 'hidden'}
              whileInView="visible"
              animate={isPreRevealed ? 'visible' : undefined}
              viewport={{ once: true, margin: '0px 0px -10% 0px', amount: 0.1 }}
              className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="border-l-2 border-[var(--accent)] pl-4 py-2 bg-[var(--bg-subtle)] rounded-r-xl p-3 border border-[var(--border)] shadow-[var(--shadow-sm)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                  <h4 className="text-[var(--text)] font-bold text-sm">Systematic Problem Solving</h4>
                </div>
                <p className="text-[var(--text-muted)] text-xs mt-1 leading-normal pl-6">
                  Deconstructing complex problems down to core data structures and algorithmic efficiency.
                </p>
              </div>
              <div className="border-l-2 border-[var(--accent-2)] pl-4 py-2 bg-[var(--bg-subtle)] rounded-r-xl p-3 border border-[var(--border)] shadow-[var(--shadow-sm)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                  <h4 className="text-[var(--text)] font-bold text-sm">Pragmatic Execution</h4>
                </div>
                <p className="text-[var(--text-muted)] text-xs mt-1 leading-normal pl-6">
                  Writing clean, readable code and testing edge cases rather than over-engineering abstractions.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile Snapshot */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            {/* Profile Snapshot Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel w-full rounded-2xl p-6 border border-[var(--border)] bg-[var(--bg-elevated)] space-y-5 shadow-[var(--shadow-sm)]"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
                <Cpu className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text)] font-semibold">
                  Profile Snapshot
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-4">
                {profileData.about.highlights.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <dt className="text-xs text-[var(--text-faint)] font-mono">{item.label}</dt>
                    <dd className="text-sm font-semibold text-[var(--text)] mt-0.5">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs text-[var(--accent)] font-medium">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Seeking software &amp; full-stack internship opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
