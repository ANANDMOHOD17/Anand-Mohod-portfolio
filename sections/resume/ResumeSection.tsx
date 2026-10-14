'use client';

import React from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import MagneticButton from '@/components/ui/MagneticButton';
import { profileData } from '@/data/profile';
import { FileText, Download, ExternalLink, CheckCircle2, Code2, Layers } from 'lucide-react';

const skills = [
  { group: 'Programming', items: 'Python, C, C++, Java' },
  { group: 'Web Technologies', items: 'HTML, CSS, JavaScript, React' },
  { group: 'Database', items: 'MySQL' },
  { group: 'Frameworks / AI', items: 'FastAPI, TensorFlow' },
  { group: 'Tools / Platforms', items: 'Git, GitHub, VS Code, Mapbox' },
];

const highlights = [
  '6 practical applications across climate-risk AI, recycling, rental, and store management',
  '15+ technical program & hackathon certificates (IBM, ISRO, OpenAI, TCS, Deloitte, Google Ads)',
  'Internship availability: Open to paid/unpaid roles | Remote or Offline (1–6 months)',
  'Specialized in Python Development, Software Development & Full-Stack Development',
];

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
          description="A concise overview of academic profile, engineering competencies, projects, and credentials — ready for immediate review or download."
        />

        {/* Resume Card */}
        <div style={{ perspective: 1000 }}>
          <GlassCard
            className="p-6 sm:p-8 md:p-10 border border-[var(--border)] bg-[var(--bg-elevated)] max-w-4xl shadow-[var(--shadow-md)] hover:border-[var(--accent)]/40 transition-all"
            tilt={true}
          >
            {/* Header: Profile + Magnetic CTA buttons */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-7 border-b border-[var(--border)]">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[var(--border-strong)] bg-[var(--bg-subtle)] flex-shrink-0 shadow-[var(--shadow-sm)]">
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] tracking-tight">
                      Anand S. Mohod — Resume / CV
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
                    Python Developer | Software Developer
                  </p>
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-faint)] pt-0.5">
                    <span className="flex items-center gap-1.5 text-[var(--accent)]">
                      <FileText className="w-3.5 h-3.5" />
                      PDF Format
                    </span>
                    <span>·</span>
                    <span>Updated for 2026</span>
                  </div>
                </div>
              </div>

              {/* Magnetic CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
                <MagneticButton strength={0.2}>
                  <a
                    href={resumePdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GlassButton variant="secondary" size="md" className="w-full sm:w-auto">
                      <ExternalLink className="w-4 h-4 text-[var(--accent)]" />
                      <span>View PDF</span>
                    </GlassButton>
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.2}>
                  <a
                    href={resumePdfPath}
                    download="Anand_Mohod_Resume.pdf"
                  >
                    <GlassButton variant="primary" size="md" className="w-full sm:w-auto">
                      <Download className="w-4 h-4" />
                      <span>Download Resume</span>
                    </GlassButton>
                  </a>
                </MagneticButton>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="pt-6 pb-5 border-b border-[var(--border)]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-faint)] mb-3">
                <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="font-semibold">Profile Highlights</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Skills Grid */}
            <div className="pt-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-faint)] mb-3">
                <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="font-semibold">Technical Competencies</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {skills.map((s) => (
                  <div
                    key={s.group}
                    className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-xs hover:border-[var(--accent)]/30 transition-colors"
                  >
                    <span className="text-[var(--text-faint)] font-semibold font-mono block mb-1">
                      {s.group}:
                    </span>
                    <span className="text-[var(--text)]">{s.items}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
