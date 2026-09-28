'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { achievementsData } from '@/data/achievements';
import { Trophy, Award, Users, Code, ArrowUpRight, Calendar, Building2 } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Competition / Entrepreneurship': <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
  'Technical Competition': <Code className="w-4 h-4 text-accent" />,
  'Hackathon': <Trophy className="w-4 h-4 text-accent" />,
  'Leadership / Academic': <Users className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
  Competition: <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
  Academic: <Award className="w-4 h-4 text-purple-500 dark:text-purple-400" />,
  Leadership: <Users className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
  Technical: <Code className="w-4 h-4 text-accent" />,
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

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 border-l-2 border-slate-200 dark:border-white/10 space-y-10 ml-2 sm:ml-4">
          {achievementsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Icon Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] md:-left-[59px] top-1.5 w-10 h-10 rounded-xl bg-white dark:bg-graphite-950 border-2 border-slate-300 dark:border-accent flex items-center justify-center shadow-md group-hover:scale-110 group-hover:border-accent transition-all duration-300">
                {categoryIcons[item.category] || <Trophy className="w-4 h-4 text-accent" />}
              </div>

              {/* Achievement Card */}
              <GlassCard
                className="p-6 border-slate-200 dark:border-white/10 bg-white/80 dark:bg-graphite-900/80 shadow-sm hover:border-accent/40 transition-all duration-300"
                tilt={false}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Building2 className="w-3.5 h-3.5 text-accent" />
                    <span className="font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {item.organization}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-accent font-semibold px-2 py-0.5 rounded-full bg-accent/10 border border-accent/25">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.role && (
                    <span className="text-xs font-mono text-accent font-medium mt-0.5 block">
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
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-mono font-semibold transition-colors"
                    >
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
