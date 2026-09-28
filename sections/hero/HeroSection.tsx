'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Code, Download, Sparkles } from 'lucide-react';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { certificatesData } from '@/data/certificates';
import { achievementsData } from '@/data/achievements';
import { skillsData } from '@/data/skills';
import GlassButton from '@/components/ui/GlassButton';
import StatCounter from '@/components/ui/StatCounter';
import MagneticButton from '@/components/ui/MagneticButton';
import { TRANSITION_EASE } from '@/lib/motion';

// Dynamic import of 3D Hero Scene with SSR disabled
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] sm:h-[440px] flex items-center justify-center">
      <div className="w-40 h-40 rounded-full border border-cyan-500/20 animate-pulse bg-cyan-950/10" />
    </div>
  ),
});

const ROLES = [
  'Computer Engineering Student',
  'Python & Full-Stack Developer',
  'AI & Machine Learning Enthusiast',
];

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const basePath = process.env.NODE_ENV === 'production' ? '/Anand-Mohod-portfolio' : '';
  const resumePdfPath = `${basePath}/resume/Anand_Mohod_Resume.pdf`;

  // Typewriter / rotating role index
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Verified facts directly from real data
  const projectCount = projectsData.length;
  const certCount = certificatesData.length;
  const achievementCount = achievementsData.length;
  const techCount = skillsData.length;

  const letterVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: TRANSITION_EASE.smoothOut,
        delay: 0.15 + i * 0.04,
      },
    }),
  };

  const firstName = 'ANAND';
  const lastName = 'MOHOD';

  return (
    <section
      id="home"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-subtle"
    >
      {/* Ambient background glow fields */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography, Identity & Split-Text */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            {/* "Open to Internships" badge with soft pulse */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono tracking-wide text-emerald-400 w-fit backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                Open to Internships • 2024–2028
              </span>
            </motion.div>

            {/* Split-Text Animated Headline */}
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                {/* ANAND */}
                <span className="inline-flex overflow-hidden">
                  {firstName.split('').map((char, index) => (
                    <motion.span
                      key={`first-${index}`}
                      custom={index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <br />
                {/* MOHOD with neon gradient */}
                <span className="inline-flex overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-accent via-sky-400 to-cyan-300">
                  {lastName.split('').map((char, index) => (
                    <motion.span
                      key={`last-${index}`}
                      custom={index + firstName.length}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Dynamic Rotating Role Line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-medium text-accent h-8"
            >
              <Code className="w-5 h-5 text-accent shrink-0" />
              <span className="font-mono text-base sm:text-xl text-slate-800 dark:text-slate-200">
                {ROLES[currentRoleIndex]}
              </span>
            </motion.div>

            {/* Profile Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              &ldquo;{profileData.tagline}&rdquo;
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {/* Primary CTA */}
              <MagneticButton strength={0.25}>
                <GlassButton
                  variant="primary"
                  size="lg"
                  asLink
                  href="#projects"
                >
                  <span>VIEW MY WORK</span>
                  <ArrowDown className="w-4 h-4" />
                </GlassButton>
              </MagneticButton>

              {/* Secondary CTA */}
              <MagneticButton strength={0.25}>
                <a
                  href={resumePdfPath}
                  download="Anand_Mohod_Resume.pdf"
                  className="inline-flex"
                >
                  <GlassButton variant="secondary" size="lg">
                    <Download className="w-4 h-4 text-accent" />
                    <span>DOWNLOAD RESUME</span>
                  </GlassButton>
                </a>
              </MagneticButton>

              {/* Tertiary CTA */}
              <MagneticButton strength={0.25}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  <span>Contact Me</span>
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </a>
              </MagneticButton>
            </motion.div>

            {/* Real 4 Stat Counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              <StatCounter
                value={projectCount}
                suffix="+"
                label="Projects"
                sublabel="Engineered"
              />
              <StatCounter
                value={certCount}
                suffix="+"
                label="Certificates"
                sublabel="Verified"
              />
              <StatCounter
                value={achievementCount}
                suffix="+"
                label="Hackathons"
                sublabel="& Honors"
              />
              <StatCounter
                value={techCount}
                suffix="+"
                label="Technologies"
                sublabel="Core Stack"
              />
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Centerpiece */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full relative">
              <HeroScene />
              {/* Interactive Cue Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-graphite-900/80 border border-white/10 backdrop-blur-md flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 pointer-events-none shadow-md">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-spin-slow" />
                <span>3D Interactive Core • Hover & Tilt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-mono">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 hover:text-accent transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="tracking-wider uppercase text-[10px]">SCROLL TO EXPLORE</span>
          <div className="w-4 h-7 rounded-full border border-slate-300 dark:border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1 h-1 rounded-full bg-accent"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
