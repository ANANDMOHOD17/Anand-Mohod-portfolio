'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Code, Download } from 'lucide-react';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { certificatesData } from '@/data/certificates';
import { achievementsData } from '@/data/achievements';
import { skillsData } from '@/data/skills';
import GlassButton from '@/components/ui/GlassButton';
import HeroProfileCard from '@/components/ui/HeroProfileCard';
import StatCounter from '@/components/ui/StatCounter';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const basePath = process.env.NODE_ENV === 'production' ? '/Anand-Mohod-portfolio' : '';
  const resumePdfPath = `${basePath}/resume/Anand_Mohod_Resume.pdf`;

  // Calculated facts directly from real data
  const projectCount = projectsData.length;
  const certCount = certificatesData.length;
  const achievementCount = achievementsData.length;
  const techCount = skillsData.length;

  return (
    <section
      id="home"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-subtle"
    >
      {/* Subtle ambient lighting glows (Static under reduced motion) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 0.15 }
            : {
                scale: [1, 1.1, 1],
                opacity: [0.12, 0.2, 0.12],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/20 blur-[130px] pointer-events-none -z-10"
      />
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 0.1 }
            : {
                scale: [1.1, 1, 1.1],
                opacity: [0.08, 0.16, 0.08],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 11,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-sky-500/15 blur-[120px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & Identity */}
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

            {/* Hero Name: Accent/gradient highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                ANAND <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-sky-400 to-cyan-300">
                  MOHOD
                </span>
              </h1>
            </motion.div>

            {/* Professional Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-medium text-accent"
            >
              <Code className="w-5 h-5 text-accent" />
              <span>{profileData.title}</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              &ldquo;{profileData.tagline}&rdquo;
            </motion.p>

            {/* CTAs with clear hierarchy (Primary, Secondary, Tertiary) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {/* Primary CTA */}
              <GlassButton
                variant="primary"
                size="lg"
                asLink
                href="#projects"
              >
                <span>VIEW MY WORK</span>
                <ArrowDown className="w-4 h-4" />
              </GlassButton>

              {/* Secondary CTA */}
              <a
                href={resumePdfPath}
                download="Anand_Mohod_Resume.pdf"
                className="inline-flex"
              >
                <GlassButton
                  variant="secondary"
                  size="lg"
                >
                  <Download className="w-4 h-4 text-accent" />
                  <span>DOWNLOAD RESUME</span>
                </GlassButton>
              </a>

              {/* Tertiary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </a>
            </motion.div>

            {/* Visual proof blocks: 4 Animated Stat Chips */}
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

          {/* Right Column: Hero Profile Card Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroProfileCard />
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


