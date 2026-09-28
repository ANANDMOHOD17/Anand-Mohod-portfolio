'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { achievementsData } from '@/data/achievements';
import { Trophy, Award, Users, Code, ArrowUpRight, Calendar, Building2, Sparkles } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Competition / Entrepreneurship': <Trophy className="w-4 h-4 text-amber-400" />,
  'Technical Competition': <Code className="w-4 h-4 text-amber-400" />,
  'Hackathon': <Trophy className="w-4 h-4 text-amber-400" />,
  'Leadership / Academic': <Users className="w-4 h-4 text-amber-400" />,
  Competition: <Trophy className="w-4 h-4 text-amber-400" />,
  Academic: <Award className="w-4 h-4 text-amber-400" />,
  Leadership: <Users className="w-4 h-4 text-amber-400" />,
  Technical: <Code className="w-4 h-4 text-amber-400" />,
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
              {/* Timeline Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] md:-left-[59px] top-2 w-10 h-10 rounded-xl bg-white dark:bg-[#111116] border-2 border-amber-500/40 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-300">
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>

              {/* Achievement Card */}
              <GlassCard
                className="p-6 sm:p-7 border-slate-200 dark:border-[#27272F] bg-white/80 dark:bg-[#111116] shadow-glass-sm hover:border-amber-500/40 hover:shadow-[0_15px_35px_rgba(245,158,11,0.12)] transition-all duration-300"
                tilt={true}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#94A3B8]">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold uppercase tracking-wider text-slate-700 dark:text-[#CBD5E1]">
                      {item.organization}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{item.date}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-amber-300/90 bg-amber-500/10 border border-amber-500/20 font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-amber-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.role && (
                    <span className="text-xs font-mono text-amber-400/90 font-medium mt-0.5 block">
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
                      className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 hover:underline font-mono font-semibold transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
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
