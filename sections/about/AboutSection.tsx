'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { profileData } from '@/data/profile';
import { Terminal, Cpu, Lightbulb, Compass } from 'lucide-react';

export default function AboutSection() {
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
          {/* Main Editorial Text (Not trapped in multiple cards) */}
          <div className="lg:col-span-8 space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
              {profileData.about.lead}
            </p>

            {profileData.about.paragraphs.map((para, index) => (
              <p key={index} className="text-slate-400 font-normal">
                {para}
              </p>
            ))}

            {/* Core Values / Philosophy */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-2 border-accent/40 pl-4 py-1">
                <h4 className="text-white font-semibold text-sm">Systematic Problem Solving</h4>
                <p className="text-slate-400 text-xs mt-1 leading-normal">
                  Deconstructing complex problems down to core data structures and algorithmic efficiency.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="text-white font-semibold text-sm">Pragmatic Execution</h4>
                <p className="text-slate-400 text-xs mt-1 leading-normal">
                  Writing clean, readable code and testing edge cases rather than over-engineering abstractions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Portrait & Structured Highlights Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Portrait Card */}
            <div className="glass-panel rounded-2xl p-3 border border-white/15 shadow-glass-md group transition-all duration-300 hover:border-accent/30">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-graphite-900">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 350px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/90 via-graphite-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block text-sm">Anand Mohod</span>
                    <span className="text-[11px] text-slate-300 font-mono">Computer Engineering</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Snapshot */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                <Cpu className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Profile Snapshot
                </span>
              </div>

              <dl className="space-y-4">
                {profileData.about.highlights.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <dt className="text-xs text-slate-500 font-mono">{item.label}</dt>
                    <dd className="text-sm font-medium text-slate-200 mt-0.5">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-accent">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Always seeking challenging technical opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
