'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Code } from 'lucide-react';
import { profileData } from '@/data/profile';
import GlassButton from '@/components/ui/GlassButton';
import HeroProfileCard from '@/components/ui/HeroProfileCard';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-slate-800/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & Identity */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            {/* Small uppercase tracked label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono tracking-widest text-slate-300 w-fit backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>HELLO, I&apos;M</span>
            </motion.div>

            {/* Hero Name: Large, bold, highly visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                ANAND <br />
                <span className="text-slate-200">MOHOD</span>
              </h1>
            </motion.div>

            {/* Professional Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-medium text-accent"
            >
              <Code className="w-5 h-5 text-accent/80" />
              <span>{profileData.title}</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-400 max-w-xl font-normal leading-relaxed"
            >
              &ldquo;{profileData.tagline}&rdquo;
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <GlassButton
                variant="primary"
                size="lg"
                asLink
                href="#projects"
              >
                <span>VIEW MY WORK</span>
                <ArrowDown className="w-4 h-4" />
              </GlassButton>

              <GlassButton
                variant="secondary"
                size="lg"
                asLink
                href="#contact"
              >
                <span>CONTACT ME</span>
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </GlassButton>
            </motion.div>

            {/* Academic badge / Tech indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono"
            >
              <div>
                <span className="text-slate-300 font-semibold block text-sm">Status</span>
                <span>B.Tech (2024–2028) • Seeking Internship</span>
              </div>
              <div className="hidden sm:block w-[1px] h-6 bg-white/10" />
              <div>
                <span className="text-slate-300 font-semibold block text-sm">Core Stack</span>
                <span>Python • React • FastAPI • MySQL</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Profile Card Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroProfileCard />
          </div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-500 text-xs font-mono">
        <span>SCROLL TO EXPLORE</span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full bg-accent"
          />
        </div>
      </div>
    </section>
  );
}

