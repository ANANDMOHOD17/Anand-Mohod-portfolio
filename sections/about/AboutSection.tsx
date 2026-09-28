'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { profileData } from '@/data/profile';
import { Cpu, Lightbulb, CheckCircle2 } from 'lucide-react';
import HeroProfileCard from '@/components/ui/HeroProfileCard';
import { TRANSITION_EASE } from '@/lib/motion';

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: TRANSITION_EASE.smoothOut,
        delay: prefersReducedMotion ? 0 : custom * 0.1,
      },
    }),
  };

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="01"
          label="About"
          title="Engineering Foundations & Practical Software Craft"
          description="A look into my background, computational interests, and drive to build impactful software."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Editorial Text with Masked Staggered Scroll Reveals */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
            <motion.p
              custom={0}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white leading-relaxed"
            >
              {profileData.about.lead}
            </motion.p>

            {profileData.about.paragraphs.map((para, index) => (
              <motion.p
                key={index}
                custom={index + 1}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="text-slate-600 dark:text-slate-400 font-normal leading-relaxed"
              >
                {para}
              </motion.p>
            ))}

            {/* Core Values / Philosophy */}
            <motion.div
              custom={profileData.about.paragraphs.length + 1}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="border-l-2 border-accent pl-4 py-2 bg-slate-50/60 dark:bg-white/[0.02] rounded-r-xl p-3 border border-slate-200/50 dark:border-white/5 shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">Systematic Problem Solving</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-normal pl-6">
                  Deconstructing complex problems down to core data structures and algorithmic efficiency.
                </p>
              </div>
              <div className="border-l-2 border-accent/60 pl-4 py-2 bg-slate-50/60 dark:bg-white/[0.02] rounded-r-xl p-3 border border-slate-200/50 dark:border-white/5 shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent/80" />
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">Pragmatic Execution</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-normal pl-6">
                  Writing clean, readable code and testing edge cases rather than over-engineering abstractions.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Tilt Profile Card & Profile Snapshot */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            {/* 3D Tilt Profile Card */}
            <HeroProfileCard />

            {/* Profile Snapshot Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel w-full rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-5 shadow-glass-sm"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
                <Cpu className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold">
                  Profile Snapshot
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-4">
                {profileData.about.highlights.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <dt className="text-xs text-slate-500 dark:text-slate-400 font-mono">{item.label}</dt>
                    <dd className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs text-accent font-medium">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Seeking software & full-stack internship opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
