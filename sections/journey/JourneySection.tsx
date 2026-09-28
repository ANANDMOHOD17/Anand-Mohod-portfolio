'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { journeyData } from '@/data/journey';
import { Sparkles, ArrowDownRight, ArrowDownLeft, ArrowDown } from 'lucide-react';

export default function JourneySection() {
  const prefersReducedMotion = useReducedMotion();

  // Clean period string: extracts "2024–2025" from "01 — 2024–2025"
  const getCleanPeriod = (period: string) => {
    return period.replace(/^0\d\s*—\s*/, '');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <section id="journey" aria-labelledby="journey-title" className="journey-section py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06"
          label="Journey"
          title="Engineering Progression & Growth"
          description="The progression of my technical capabilities from foundational engineering concepts to full-stack engineering, AI systems, and real-world solutions."
        />

        {/* ── Desktop Asymmetric 2-Column Engineering Growth Map (lg+ / >= 1024px) ── */}
        <div className="hidden lg:block relative mt-12">
          {/* Subtle background circuit watermark */}
          <div className="absolute inset-0 pointer-events-none -z-10 opacity-30" aria-hidden="true">
            <div className="w-full h-full bg-[radial-gradient(#272733_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-6 relative"
          >
            {/* ROW 1: Milestone 1 (Left: 2024–2025) */}
            <div className="grid grid-cols-12 gap-8 items-center">
              <motion.div variants={cardVariants} className="col-span-6">
                <MilestoneCard item={journeyData[0]} period={getCleanPeriod(journeyData[0].period)} stepNum="01" isPresent={false} />
              </motion.div>
              <div className="col-span-6 flex items-center justify-start pl-4" aria-hidden="true">
                <div className="flex items-center gap-3 text-xs font-mono text-[#525260]">
                  <div className="w-12 h-[1px] bg-[#272733]" />
                  <span>PHASE 01 // FOUNDATION</span>
                </div>
              </div>
            </div>

            {/* Connector 1 -> 2 (Left to Right downward flow) */}
            <div className="grid grid-cols-12 gap-8 h-14 relative" aria-hidden="true">
              <div className="col-span-12 relative flex items-center justify-center">
                <div className="absolute left-[25%] right-[25%] top-1/2 h-[1px] bg-gradient-to-r from-[#272733] via-[#6366F1]/50 to-[#272733]" />
                <div className="z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-[#111116] border border-[#272733] text-[11px] font-mono text-[#8B8F9F]">
                  <ArrowDownRight className="w-3.5 h-3.5 text-[#818CF8]" />
                  <span>PROGRESSION</span>
                </div>
              </div>
            </div>

            {/* ROW 2: Milestone 2 (Right: 2025–2026) */}
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-6 flex items-center justify-end pr-4" aria-hidden="true">
                <div className="flex items-center gap-3 text-xs font-mono text-[#525260]">
                  <span>PHASE 02 // DEVELOPMENT</span>
                  <div className="w-12 h-[1px] bg-[#272733]" />
                </div>
              </div>
              <motion.div variants={cardVariants} className="col-span-6">
                <MilestoneCard item={journeyData[1]} period={getCleanPeriod(journeyData[1].period)} stepNum="02" isPresent={false} />
              </motion.div>
            </div>

            {/* Connector 2 -> 3 (Right to Left downward flow) */}
            <div className="grid grid-cols-12 gap-8 h-14 relative" aria-hidden="true">
              <div className="col-span-12 relative flex items-center justify-center">
                <div className="absolute left-[25%] right-[25%] top-1/2 h-[1px] bg-gradient-to-r from-[#272733] via-[#6366F1]/50 to-[#272733]" />
                <div className="z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-[#111116] border border-[#272733] text-[11px] font-mono text-[#8B8F9F]">
                  <ArrowDownLeft className="w-3.5 h-3.5 text-[#818CF8]" />
                  <span>EXPANSION</span>
                </div>
              </div>
            </div>

            {/* ROW 3: Milestone 3 (Left: 2026) */}
            <div className="grid grid-cols-12 gap-8 items-center">
              <motion.div variants={cardVariants} className="col-span-6">
                <MilestoneCard item={journeyData[2]} period={getCleanPeriod(journeyData[2].period)} stepNum="03" isPresent={false} />
              </motion.div>
              <div className="col-span-6 flex items-center justify-start pl-4" aria-hidden="true">
                <div className="flex items-center gap-3 text-xs font-mono text-[#525260]">
                  <div className="w-12 h-[1px] bg-[#272733]" />
                  <span>PHASE 03 // SPECIALIZATION</span>
                </div>
              </div>
            </div>

            {/* Connector 3 -> 4 (Left to Right downward flow to Present) */}
            <div className="grid grid-cols-12 gap-8 h-14 relative" aria-hidden="true">
              <div className="col-span-12 relative flex items-center justify-center">
                <div className="absolute left-[25%] right-[25%] top-1/2 h-[1px] bg-gradient-to-r from-[#272733] via-[#6366F1] to-[#272733]" />
                <div className="z-10 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111116] border border-[#6366F1]/40 text-[11px] font-mono text-[#A5B4FC] shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#818CF8]" />
                  <span>CURRENT HORIZON</span>
                </div>
              </div>
            </div>

            {/* ROW 4: Milestone 4 (Right: PRESENT) */}
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-6 flex items-center justify-end pr-4" aria-hidden="true">
                <div className="flex items-center gap-3 text-xs font-mono text-[#818CF8]/80">
                  <span>ACTIVE DEPLOYMENT</span>
                  <div className="w-12 h-[1px] bg-[#6366F1]/50" />
                </div>
              </div>
              <motion.div variants={cardVariants} className="col-span-6">
                <MilestoneCard item={journeyData[3]} period={getCleanPeriod(journeyData[3].period)} stepNum="04" isPresent={true} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Tablet & Mobile Vertical Engineering Timeline (< 1024px) ── */}
        <div className="block lg:hidden relative mt-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="relative pl-6 sm:pl-8 space-y-8"
          >
            {/* Continuous Vertical Rail */}
            <div
              className="absolute top-4 bottom-4 left-[11px] sm:left-[15px] w-[2px] bg-gradient-to-b from-[#272733] via-[#3F3F52] to-[#6366F1]/60"
              aria-hidden="true"
            />

            {journeyData.map((item, index) => {
              const isPresent = index === journeyData.length - 1;
              const period = getCleanPeriod(item.period);
              const stepNum = `0${index + 1}`;

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="relative group"
                >
                  {/* Vertical Rail Node */}
                  <div
                    className={`absolute -left-[20px] sm:-left-[24px] top-4 w-3 h-3 rounded-full transition-all duration-300 ${
                      isPresent
                        ? 'bg-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.6)] ring-4 ring-[#6366F1]/20'
                        : 'bg-[#1E1E26] border border-[#3A3A46] group-hover:border-[#6366F1] group-hover:bg-[#6366F1]'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Card Component */}
                  <MilestoneCard
                    item={item}
                    period={period}
                    stepNum={stepNum}
                    isPresent={isPresent}
                  />

                  {/* Downward indicator between cards on mobile */}
                  {!isPresent && (
                    <div className="flex justify-center pt-3 pb-1 opacity-40" aria-hidden="true">
                      <ArrowDown className="w-3.5 h-3.5 text-[#7F8496]" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Sub-component: Individual Milestone Card ────────────────────────────────
interface MilestoneCardProps {
  item: (typeof journeyData)[0];
  period: string;
  stepNum: string;
  isPresent: boolean;
}

function MilestoneCard({ item, period, stepNum, isPresent }: MilestoneCardProps) {
  return (
    <article
      className={`relative p-6 sm:p-7 rounded-2xl transition-all duration-300 ease-out group ${
        isPresent
          ? 'bg-[#111116] border border-[#6366F1]/45 shadow-[0_0_30px_rgba(99,102,241,0.08)] hover:border-[#6366F1]/70 hover:-translate-y-1'
          : 'bg-[#111116] border border-[#272733] hover:border-[#3F3F52] hover:-translate-y-1 shadow-sm'
      }`}
    >
      {/* Corner Technical Indicators */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-40 group-hover:opacity-80 transition-opacity" aria-hidden="true">
        <span className="w-1 h-1 rounded-full bg-[#7F8496]" />
        <span className="w-1 h-1 rounded-full bg-[#7F8496]" />
      </div>

      {/* Header: Period & Status */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#818CF8] bg-white/[0.04] border border-[#272733] px-2.5 py-1 rounded-lg">
            {period}
          </span>
          <span className="text-[11px] font-mono text-[#525260]">
            // {stepNum}
          </span>
        </div>

        {isPresent ? (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#A5B4FC] bg-[#6366F1]/10 border border-[#6366F1]/30 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#818CF8] animate-pulse" />
            Current Focus
          </span>
        ) : (
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7F8496]">
            Completed
          </span>
        )}
      </div>

      {/* Milestone Title */}
      <h3 className="text-lg sm:text-xl font-extrabold text-[#F5F5F7] tracking-tight leading-snug mb-3 group-hover:text-white transition-colors">
        {item.title}
      </h3>

      {/* Milestone Description */}
      <p className="text-xs sm:text-sm text-[#A7A9B7] leading-relaxed mb-5 font-normal">
        {item.description}
      </p>

      {/* Competencies & Toolchain Footer */}
      <div className="pt-4 border-t border-[#272733]/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7F8496]">
            Competencies & Tooling:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {item.skillsAcquired.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[#CBD5E1] bg-[#16161E] border border-[#272733] transition-colors group-hover:border-[#3A3A46]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
