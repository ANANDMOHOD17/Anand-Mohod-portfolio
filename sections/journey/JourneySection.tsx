'use client';

import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { journeyData } from '@/data/journey';
import { GitCommit, Sparkles } from 'lucide-react';

export default function JourneySection() {
  return (
    <section id="journey" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06"
          label="Journey"
          title="Engineering Progression & Growth"
          description="The progression of my technical capabilities from engineering foundations to full-stack development, AI, and real-world solutions."
        />

        {/* Timeline Container */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
          {journeyData.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-graphite-950 border-2 border-accent group-hover:bg-accent transition-colors flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-accent group-hover:bg-graphite-950" />
              </div>

              {/* Period Badge */}
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono text-accent bg-accent/10 border border-accent/20 mb-2">
                {item.period}
              </span>

              <GlassCard className="p-6 border-white/10 hover:border-white/20 transition-all">
                <h3 className={`text-lg sm:text-xl font-bold text-white ${item.subtitle ? 'mb-1' : 'mb-3'}`}>
                  {item.title}
                </h3>
                {item.subtitle && (
                  <span className="text-xs font-mono text-slate-400 block mb-3">
                    {item.subtitle}
                  </span>
                )}

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Skills Acquired */}
                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mr-2">
                    Key Competencies:
                  </span>
                  {item.skillsAcquired.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-white/5 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
