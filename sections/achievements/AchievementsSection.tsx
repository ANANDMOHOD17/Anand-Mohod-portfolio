'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { achievementsData } from '@/data/achievements';
import { Trophy, Award, Users, Code, ArrowUpRight, Calendar, Building2, Sparkles } from 'lucide-react';

// ─── Category icon map — all icons converted to accent token ────────────
const categoryIcons: Record<string, React.ReactNode> = {
  'Competition / Entrepreneurship': <Trophy className="w-5 h-5 text-[var(--accent)]" />,
  'Technical Competition':          <Code   className="w-5 h-5 text-[var(--accent)]" />,
  'Hackathon':                      <Trophy className="w-5 h-5 text-[var(--accent)]" />,
  'Leadership / Academic':          <Users  className="w-5 h-5 text-[var(--accent)]" />,
  Competition:                      <Trophy className="w-5 h-5 text-[var(--accent)]" />,
  Academic:                         <Award  className="w-5 h-5 text-[var(--accent)]" />,
  Leadership:                       <Users  className="w-5 h-5 text-[var(--accent)]" />,
  Technical:                        <Code   className="w-5 h-5 text-[var(--accent)]" />,
};

export default function AchievementsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isPreRevealed, setIsPreRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Pre-reveal listener when programmatic nav scrolls to #achievements
  useEffect(() => {
    const handleReveal = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail?.id || detail.id === 'achievements') {
        setIsPreRevealed(true);
      }
    };

    if (sectionRef.current?.classList.contains('is-visible')) {
      setIsPreRevealed(true);
    }

    window.addEventListener('reveal-section', handleReveal);
    return () => window.removeEventListener('reveal-section', handleReveal);
  }, []);

  const cardVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 16 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion || isPreRevealed ? 0 : index * 0.06,
      },
    }),
  };

  return (
    <section id="achievements" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          label="Achievements"
          title="Honors & Academic Milestones"
          description="Competitive hackathons, academic recognition, and student leadership responsibilities."
        />

        {/* Timeline Container — robust two-column flex layout preventing node clipping or overlap */}
        <div className="relative max-w-4xl">
          {achievementsData.map((item, index) => {
            const isLast = index === achievementsData.length - 1;
            const categoryIcon = categoryIcons[item.category] || (
              <Trophy className="w-5 h-5 text-[var(--accent)]" />
            );

            return (
              <motion.div
                key={item.id}
                custom={index}
                initial={isPreRevealed ? 'visible' : 'hidden'}
                whileInView="visible"
                animate={isPreRevealed ? 'visible' : undefined}
                viewport={{ once: true, margin: '0px 0px -10% 0px', amount: 0.1 }}
                variants={cardVariants}
                className={`relative flex items-start gap-4 sm:gap-6 group will-change-[opacity,transform] ${
                  isLast ? '' : 'pb-8 sm:pb-10'
                }`}
              >
                {/* Left Rail Column: Node + Connecting Vertical Line */}
                <div className="w-11 sm:w-12 flex flex-col items-center shrink-0 self-stretch relative">
                  {/* Continuous Vertical Rail connecting to the next milestone */}
                  {!isLast && (
                    <div
                      className="absolute top-6 -bottom-2 w-[2px] bg-gradient-to-b from-[var(--border-strong)] via-[var(--border)] to-[var(--border-strong)]"
                      aria-hidden="true"
                    />
                  )}

                  {/* Timeline Node Box */}
                  <div className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[var(--surface)] border-2 border-[var(--border-strong)] flex items-center justify-center shadow-[var(--shadow-sm)] group-hover:scale-105 group-hover:border-[var(--accent)] group-hover:shadow-[var(--shadow-md)] transition-all duration-300 shrink-0">
                    {categoryIcon}
                  </div>
                </div>

                {/* Right Column: Achievement Card */}
                <div className="flex-1 min-w-0">
                  <GlassCard
                    className="p-6 sm:p-7 border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)] hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-md)] transition-all duration-300"
                    tilt={true}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                      {/* Organization row — neutral */}
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-faint)]">
                        <Building2 className="w-3.5 h-3.5 text-[var(--text-faint)]" />
                        <span className="font-semibold uppercase tracking-wider text-[var(--text)]">
                          {item.organization}
                        </span>
                      </div>

                      {/* Date + Category badges — muted neutral */}
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-[var(--text-muted)] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)]">
                          <Calendar className="w-3 h-3 text-[var(--text-faint)]" />
                          <span>{item.date}</span>
                        </span>
                        <span className="btn-outline px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      {item.role && (
                        <span className="text-xs font-mono text-[var(--text-faint)] font-medium mt-0.5 block">
                          Role: {item.role}
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {item.relatedProjectSlug && (
                      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-end">
                        <Link
                          href={`/projects/${item.relatedProjectSlug}`}
                          className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] hover:text-[var(--accent-2)] hover:underline font-mono font-semibold transition-colors"
                        >
                          <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                          <span>Explore Related Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
