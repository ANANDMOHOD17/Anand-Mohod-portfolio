'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ProcessStep {
  id: string;
  number: string;
  name: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 'idea',
    number: '01',
    name: 'IDEA',
    description: 'Initial concept and project vision.',
  },
  {
    id: 'research',
    number: '02',
    name: 'RESEARCH',
    description: 'Research technologies, users, data, and existing solutions.',
  },
  {
    id: 'problem',
    number: '03',
    name: 'PROBLEM',
    description: 'Clearly define the real-world problem and requirements.',
  },
  {
    id: 'design',
    number: '04',
    name: 'DESIGN',
    description: 'Plan architecture, UI/UX, data flow, and solution structure.',
  },
  {
    id: 'build',
    number: '05',
    name: 'BUILD',
    description: 'Develop the actual application and core functionality.',
  },
  {
    id: 'test',
    number: '06',
    name: 'TEST',
    description: 'Test functionality, usability, edge cases, and performance.',
  },
  {
    id: 'deploy',
    number: '07',
    name: 'DEPLOY',
    description: 'Deploy the working project and make it accessible.',
  },
  {
    id: 'iterate',
    number: '08',
    name: 'ITERATE',
    description: 'Improve the project using feedback, testing, and new requirements.',
  },
];

export default function ProcessSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 },
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
    <section
      id="process"
      aria-labelledby="process-title"
      className="process-section py-24 md:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mb-14 md:mb-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest text-[#7F8496] dark:text-[#A7A9B7] border border-[#272733] bg-[#111116]/80 mb-4 shadow-sm backdrop-blur-sm uppercase">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#6366F1] shadow-[0_0_8px_rgba(99,102,241,0.5)] shrink-0"
              aria-hidden="true"
            />
            <span>HOW I BUILD</span>
          </div>

          {/* Large Two-Line Heading */}
          <h2
            id="process-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            <span className="block">FROM IDEA</span>
            <span className="block mt-1 sm:mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-white dark:to-[#A5B4FC]/80">
              TO ITERATION.
            </span>
          </h2>

          {/* Underline Divider */}
          <div
            className="w-12 h-0.5 mt-4 rounded-full bg-gradient-to-r from-[#6366F1] to-[#818CF8]"
            aria-hidden="true"
          />

          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-[#8B8F9F] max-w-2xl font-normal leading-relaxed">
            A structured, engineering-first development lifecycle translating concepts into resilient, scalable systems.
          </p>
        </div>

        {/* ── Desktop & Tablet Connected Horizontal Timeline (>=768px) ── */}
        <div className="hidden md:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative pt-6 pb-8"
          >
            {/* Horizontal Connecting Line */}
            <div
              className="absolute top-[35px] left-[5%] right-[5%] h-[2px] bg-[#272733] dark:bg-[#272733] -z-0"
              aria-hidden="true"
            />

            {/* Steps Row */}
            <div className="grid grid-cols-8 gap-2 relative z-10" role="list">
              {processSteps.map((step, idx) => {
                const isHovered = activeStep === idx;

                return (
                  <motion.div
                    key={step.id}
                    variants={itemVariants}
                    role="listitem"
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                    tabIndex={0}
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                    onFocus={() => setActiveStep(idx)}
                    onBlur={() => setActiveStep(null)}
                    aria-label={`${step.number} ${step.name}: ${step.description}`}
                  >
                    {/* Node Container */}
                    <div className="h-6 flex items-center justify-center relative mb-4">
                      {/* Node Dot */}
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                          isHovered
                            ? 'scale-125 bg-[#818CF8] shadow-[0_0_16px_rgba(129,140,248,0.55)]'
                            : 'bg-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Step Label */}
                    <span
                      className={`text-xs sm:text-sm font-bold tracking-wider transition-colors duration-200 uppercase ${
                        isHovered
                          ? 'text-slate-900 dark:text-[#F5F5F7]'
                          : 'text-slate-600 dark:text-[#7F8496]'
                      }`}
                    >
                      {step.name}
                    </span>

                    {/* Step Number */}
                    <span className="text-[10px] font-mono text-slate-400 dark:text-[#525260] mt-1">
                      {step.number}
                    </span>

                    {/* Hover/Focus Tooltip */}
                    <div
                      className={`absolute top-full mt-3 w-48 p-3 rounded-xl bg-[#111116] border border-[#272733] shadow-xl text-left pointer-events-none transition-all duration-200 z-30 ${
                        isHovered
                          ? 'opacity-100 translate-y-0 visible'
                          : 'opacity-0 translate-y-1 invisible'
                      }`}
                      aria-hidden="true"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-[#272733]/60">
                        <span className="text-[10px] font-mono font-bold text-[#818CF8]">{step.number}</span>
                        <span className="text-[10px] font-bold text-[#F5F5F7] tracking-wider">{step.name}</span>
                      </div>
                      <p className="text-xs text-[#A7A9B7] leading-snug">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Active Detail Display Bar for subtle persistent reading */}
          <div className="mt-8 pt-4 border-t border-[#272733]/40 min-h-[48px] flex items-center justify-center text-center">
            {activeStep !== null ? (
              <p className="text-sm text-[#A7A9B7] transition-all duration-200">
                <span className="font-mono font-semibold text-[#818CF8] mr-2">
                  {processSteps[activeStep].number} / {processSteps[activeStep].name}:
                </span>
                {processSteps[activeStep].description}
              </p>
            ) : (
              <p className="text-xs text-[#525260] font-mono">
                Hover or focus on any stage to inspect methodology details.
              </p>
            )}
          </div>
        </div>

        {/* ── Mobile Connected Vertical Timeline (<768px) ── */}
        <div className="block md:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            className="relative pl-6 space-y-6"
            role="list"
          >
            {/* Vertical Connecting Line */}
            <div
              className="absolute top-3 bottom-3 left-[11px] w-[2px] bg-[#272733] dark:bg-[#272733]"
              aria-hidden="true"
            />

            {processSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                role="listitem"
                className="relative flex items-start gap-4 group"
              >
                {/* Node Dot */}
                <div
                  className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#6366F1] shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#818CF8]"
                  aria-hidden="true"
                />

                {/* Content Card */}
                <div className="flex-1 p-3.5 rounded-xl bg-[#111116]/60 border border-[#272733] transition-colors duration-200 group-hover:border-[#3A3A4A]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono font-semibold text-[#818CF8]">
                      {step.number}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-[#F5F5F7] tracking-wider uppercase">
                      {step.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#A7A9B7] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
