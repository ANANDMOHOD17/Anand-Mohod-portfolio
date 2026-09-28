'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { achievementsData } from '@/data/achievements';
import { Trophy, Award, Users, Code, ArrowUpRight, Calendar, Building2, Sparkles } from 'lucide-react';

// ─── Category icon map — all icons converted to indigo/blue accent ────────────
const categoryIcons: Record<string, React.ReactNode> = {
  'Competition / Entrepreneurship': <Trophy  className="w-4 h-4 text-[#818CF8]" />,
  'Technical Competition':          <Code    className="w-4 h-4 text-[#818CF8]" />,
  'Hackathon':                      <Trophy  className="w-4 h-4 text-[#818CF8]" />,
  'Leadership / Academic':          <Users   className="w-4 h-4 text-[#818CF8]" />,
  Competition:                      <Trophy  className="w-4 h-4 text-[#818CF8]" />,
  Academic:                         <Award   className="w-4 h-4 text-[#818CF8]" />,
  Leadership:                       <Users   className="w-4 h-4 text-[#818CF8]" />,
  Technical:                        <Code    className="w-4 h-4 text-[#818CF8]" />,
};

export default function AchievementsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="achievements" className="py-24 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          label="Achievements"
          title="Honors & Academic Milestones"
          description="Competitive hackathons, academic recognition, and student leadership responsibilities."
        />

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 border-l-2 border-slate-200 dark:border-white/10 space-y-12 ml-2 sm:ml-4">
          {achievementsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node — neutral idle, accent on group-hover */}
              <div className="absolute -left-[35px] sm:-left-[51px] md:-left-[59px] top-2 w-10 h-10 rounded-xl bg-white dark:bg-[#111116] border-2 border-[#30303A] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[#6366F1]/50 group-hover:shadow-[0_0_16px_rgba(99,102,241,0.15)] transition-all duration-300">
                <Trophy className="w-4 h-4 text-[#8B8F9F] group-hover:text-[#818CF8] transition-colors" />
              </div>

              {/* Achievement Card — neutral idle, hover glow on interaction */}
              <GlassCard
                className="p-6 sm:p-7 border-slate-200 dark:border-[#27272F] bg-white/80 dark:bg-[#111116] shadow-glass-sm hover:border-[#6366F1]/40 hover:shadow-[0_12px_30px_rgba(99,102,241,0.08)] transition-all duration-300"
                tilt={true}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                  {/* Organization row — neutral */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                    <Building2 className="w-3.5 h-3.5 text-[#8B8F9F]" />
                    <span className="font-semibold uppercase tracking-wider text-slate-700 dark:text-[#B5B7C3]">
                      {item.organization}
                    </span>
                  </div>

                  {/* Date + Category badges — muted neutral, not purple */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-[#9A9DAC] font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-[#30303A]">
                      <Calendar className="w-3 h-3 text-[#8B8F9F]" />
                      <span>{item.date}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#9A9DAC] bg-white/[0.03] border border-[#2A2A36] font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  {/* Title hover → lavender instead of amber */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-[#A5B4FC] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.role && (
                    <span className="text-xs font-mono text-[#9A9DAC] font-medium mt-0.5 block">
                      Role: {item.role}
                    </span>
                  )}
                </div>

                <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>

                {item.relatedProjectSlug && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-end">
                    <Link
                      href={`/projects/${item.relatedProjectSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#818CF8] hover:text-[#A5B4FC] hover:underline font-mono font-semibold transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-[#818CF8]" />
                      <span>Explore Related Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
