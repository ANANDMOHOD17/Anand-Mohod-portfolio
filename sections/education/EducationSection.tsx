'use client';

import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { educationData } from '@/data/education';
import { GraduationCap, BookOpen, Layers, Award, School, CheckCircle2 } from 'lucide-react';

export default function EducationSection() {
  const primaryEdu = educationData.find((edu) => edu.isPrimary) || educationData[0];
  const secondaryEduList = educationData.filter((edu) => !edu.isPrimary);

  return (
    <section id="education" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="07"
          label="Education"
          title="Academic Background & Foundation"
          description="Formal academic education in Computer Engineering, computer science principles, mathematics, and software design."
        />

        <div className="space-y-6 max-w-5xl">
          {/* Primary Current Education: B.Tech */}
          <GlassCard className="p-6 sm:p-8 border-slate-200/90 dark:border-white/15 shadow-glass-md hover:border-accent/40 transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex-shrink-0 shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide text-accent bg-accent/10 border border-accent/30">
                      CURRENT DEGREE
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      {primaryEdu.score}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
                    {primaryEdu.degree}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium mt-1">
                    {primaryEdu.institution}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:items-end flex-shrink-0">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 w-fit">
                  {primaryEdu.duration}
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {primaryEdu.status}
                </span>
              </div>
            </div>

            {primaryEdu.coursework && primaryEdu.focusAreas && (
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Coursework */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span className="font-semibold">Key Coursework</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    {primaryEdu.coursework.map((course) => (
                      <li key={course} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span className="truncate">{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary Focus Areas */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5">
                    <Layers className="w-4 h-4 text-accent" />
                    <span className="font-semibold">Specialization & Focus</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {primaryEdu.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:border-accent/40 transition-colors"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </GlassCard>

          {/* Secondary Education: HSC & SSC Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {secondaryEduList.map((edu, idx) => (
              <GlassCard
                key={edu.id}
                className="p-6 border-slate-200/80 dark:border-white/10 hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                      <School className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      Education 0{idx + 2}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {edu.institution}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">Academic Score:</span>
                  <span className="text-accent font-semibold px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    {edu.score}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
