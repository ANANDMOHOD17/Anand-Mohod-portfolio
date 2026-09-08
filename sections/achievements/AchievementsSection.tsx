'use client';

import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { achievementsData } from '@/data/achievements';
import { Trophy, Award, Users, Code, ArrowUpRight } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Competition / Entrepreneurship': <Trophy className="w-4 h-4 text-accent" />,
  'Technical Competition': <Code className="w-4 h-4 text-sky-400" />,
  'Hackathon': <Trophy className="w-4 h-4 text-accent" />,
  'Leadership / Academic': <Users className="w-4 h-4 text-emerald-400" />,
  Competition: <Trophy className="w-4 h-4 text-accent" />,
  Academic: <Award className="w-4 h-4 text-amber-400" />,
  Leadership: <Users className="w-4 h-4 text-emerald-400" />,
  Technical: <Code className="w-4 h-4 text-sky-400" />,
};

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          label="Achievements"
          title="Honors & Academic Milestones"
          description="Competitive hackathons, academic recognition, and student leadership responsibilities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.map((item) => (
            <GlassCard
              key={item.id}
              className="p-6 border-white/10 hover:border-white/20 transition-all"
              tilt={false}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {categoryIcons[item.category] || <Trophy className="w-4 h-4 text-accent" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                      {item.organization}
                    </span>
                    <span className="text-xs font-mono text-accent">
                      {item.date}{item.role ? ` • ${item.role}` : ''}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10">
                  {item.category}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>

              {item.relatedProjectSlug && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <Link
                    href={`/projects/${item.relatedProjectSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-white font-mono transition-colors"
                  >
                    <span>View Related Project</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
