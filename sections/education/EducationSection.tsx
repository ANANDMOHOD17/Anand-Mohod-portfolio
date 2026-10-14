'use client';

import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { educationData } from '@/data/education';
import { GraduationCap, BookOpen, Layers, School, CheckCircle2 } from 'lucide-react';

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
          <GlassCard className="p-6 sm:p-8 border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-md)] hover:border-[var(--accent)]/40 transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent)] flex-shrink-0 shadow-[var(--shadow-sm)]">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide text-[var(--accent)] bg-[var(--accent-soft)] border border-[var(--accent)]/30">
                      CURRENT DEGREE
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold text-[var(--success)] bg-[var(--success)]/10 border border-[var(--success)]/20">
                      {primaryEdu.score}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mt-2 tracking-tight">
                    {primaryEdu.degree}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-muted)] font-medium mt-1">
                    {primaryEdu.institution}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:items-end flex-shrink-0">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold text-[var(--text)] bg-[var(--bg-subtle)] border border-[var(--border)] w-fit">
                  {primaryEdu.duration}
                </span>
                <span className="text-xs font-mono text-[var(--success)] font-medium mt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                  {primaryEdu.status}
                </span>
              </div>
            </div>

            {primaryEdu.coursework && primaryEdu.focusAreas && (
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Coursework */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-faint)] mb-3.5">
                    <BookOpen className="w-4 h-4 text-[var(--accent)]" />
                    <span className="font-semibold">Key Coursework</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text)]">
                    {primaryEdu.coursework.map((course) => (
                      <li key={course} className="flex items-center gap-2 p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
                        <span className="truncate">{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary Focus Areas */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-faint)] mb-3.5">
                    <Layers className="w-4 h-4 text-[var(--accent)]" />
                    <span className="font-semibold">Specialization & Focus</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {primaryEdu.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="btn-outline px-3 py-1.5 rounded-xl text-xs font-mono font-medium shadow-[var(--shadow-sm)]"
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
                className="p-6 border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)] hover:border-[var(--accent)]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--accent)]">
                      <School className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-faint)] px-2.5 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)]">
                      Education 0{idx + 2}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-[var(--text)]">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {edu.institution}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-faint)]">Academic Score:</span>
                  <span className="text-[var(--accent)] font-semibold px-2 py-0.5 rounded bg-[var(--accent-soft)] border border-[var(--accent)]/20">
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
