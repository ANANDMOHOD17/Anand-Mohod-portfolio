'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { profileData } from '@/data/profile';
import { FileText, Download, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ResumeSection() {
  const basePath = process.env.NODE_ENV === 'production' ? '/Anand-Mohod-portfolio' : '';
  const resumePdfPath = `${basePath}/resume/Anand_Mohod_Resume.pdf`;

  return (
    <section id="resume" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="08"
          label="Resume"
          title="Curriculum Vitae & Summary"
          description="A concise summary of my academic profile, engineering competencies, and project history ready for review."
        />

        <GlassCard className="p-8 md:p-12 border-white/10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-accent/30 bg-graphite-900 flex-shrink-0 shadow-glass-md">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Anand Mohod — Resume / CV
                </h3>
                <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
                  Structured overview featuring technical stack, computer engineering coursework, completed projects, and verified credentials.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                  <span>Format: PDF</span>
                  <span>•</span>
                  <span>Updated for 2026</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassButton variant="secondary" size="md" className="w-full sm:w-auto">
                  <span>View PDF</span>
                  <ExternalLink className="w-4 h-4 text-accent" />
                </GlassButton>
              </a>

              <a
                href={resumePdfPath}
                download="Anand_Mohod_Resume.pdf"
              >
                <GlassButton variant="primary" size="md" className="w-full sm:w-auto">
                  <span>Download Resume</span>
                  <Download className="w-4 h-4" />
                </GlassButton>
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
