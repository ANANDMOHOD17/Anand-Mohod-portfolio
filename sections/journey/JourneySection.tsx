'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { journeyData } from '@/data/journey';
import { Sparkles, CheckCircle2, Compass, ArrowRight } from 'lucide-react';

export default function JourneySection() {
  const [activeStep, setActiveStep] = useState<number>(journeyData.length - 1); // default to present

  return (
    <section id="journey" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06"
          label="Journey"
          title="Engineering Progression & Growth"
          description="The progression of my technical capabilities from foundational engineering concepts to full-stack engineering, AI systems, and real-world solutions."
        />

        {/* Desktop Interactive Stepper & Timeline (md and up) */}
        <div className="hidden lg:block space-y-8">
          {/* Progress Bar & Step Buttons */}
          <div className="relative">
            {/* Background connecting track */}
            <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-slate-200 dark:bg-white/10 rounded-full" />
            {/* Active filled line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-gradient-to-r from-accent/70 via-accent to-accent-light rounded-full"
              initial={false}
              animate={{
                width: `${(activeStep / (journeyData.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />

            {/* Stepper Nodes */}
            <div className="relative flex justify-between items-center">
              {journeyData.map((item, index) => {
                const isActive = activeStep === index;
                const isPassed = index <= activeStep;
                const isPresent = index === journeyData.length - 1;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className="group relative flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
                    aria-label={`View Milestone ${index + 1}: ${item.title}`}
                  >
                    {/* Node circle */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all border-2 ${
                        isActive
                          ? 'bg-accent text-graphite-950 border-accent shadow-glow-sm scale-110'
                          : isPassed
                          ? 'bg-slate-900 text-accent border-accent/80 dark:bg-graphite-900'
                          : 'bg-white text-slate-400 border-slate-300 dark:bg-graphite-900 dark:border-white/20'
                      }`}
                    >
                      {isPresent ? (
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      ) : isPassed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        `0${index + 1}`
                      )}
                    </motion.div>

                    {/* Step Label below node */}
                    <div className="absolute top-14 text-center w-40 -translate-x-1/2 left-1/2">
                      <span
                        className={`text-[11px] font-mono block transition-colors ${
                          isActive
                            ? 'text-accent font-semibold'
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                        }`}
                      >
                        {item.period.replace(/^0\d\s*—\s*/, '')}
                      </span>
                      {isPresent && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-500 uppercase tracking-wider mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                          Current Focus
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Card Detail Box (with smooth tab transition) */}
          <div className="pt-20">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-8 border-slate-200/80 dark:border-white/10 hover:border-accent/40 transition-all shadow-glass-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-accent bg-accent/10 border border-accent/20">
                        {journeyData[activeStep].period}
                      </span>
                      {activeStep === journeyData.length - 1 && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                          Active Development
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {journeyData[activeStep].title}
                    </h3>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                      disabled={activeStep === 0}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => setActiveStep((prev) => Math.min(journeyData.length - 1, prev + 1))}
                      disabled={activeStep === journeyData.length - 1}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed my-6 max-w-4xl">
                  {journeyData[activeStep].description}
                </p>

                {/* Key Competencies Chips */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                    Competencies & Tooling Mastered:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {journeyData[activeStep].skillsAcquired.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg text-xs font-mono font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (< lg) */}
        <div className="lg:hidden relative border-l-2 border-slate-200 dark:border-white/10 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-8">
          {journeyData.map((item, index) => {
            const isPresent = index === journeyData.length - 1;

            return (
              <div key={index} className="relative group">
                {/* Timeline Bullet Node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors flex items-center justify-center ${
                    isPresent
                      ? 'bg-accent border-accent shadow-glow-sm'
                      : 'bg-white dark:bg-graphite-950 border-accent/80'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPresent ? 'bg-graphite-950 animate-ping' : 'bg-accent'
                    }`}
                  />
                </div>

                {/* Period Badge */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono text-accent bg-accent/10 border border-accent/20">
                    {item.period}
                  </span>
                  {isPresent && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Current
                    </span>
                  )}
                </div>

                <GlassCard className="p-5 sm:p-6 border-slate-200/80 dark:border-white/10 hover:border-accent/40 transition-all">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Skills Acquired */}
                  <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mr-1 block w-full mb-1">
                      Key Competencies:
                    </span>
                    {item.skillsAcquired.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
