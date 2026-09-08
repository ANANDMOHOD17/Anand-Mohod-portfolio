'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassButton from '@/components/ui/GlassButton';
import { profileData } from '@/data/profile';
import { educationData } from '@/data/education';
import { projectsData } from '@/data/projects';
import { achievementsData } from '@/data/achievements';
import { certificatesData } from '@/data/certificates';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Award,
  Trophy,
  GraduationCap,
  Code2,
  FolderGit2,
  UserCheck,
} from 'lucide-react';

export default function ResumePage() {
  const resumePdfPath = '/resume/Anand_Mohod_Resume.pdf';
  const resumeDownloadName = 'Anand_Mohod_Resume.pdf';

  return (
    <div className="pt-32 pb-24 md:py-36 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Link
            href="/#resume"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <GlassButton variant="secondary" size="sm" className="w-full sm:w-auto">
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
                <span>View PDF</span>
              </GlassButton>
            </a>

            <a
              href={resumePdfPath}
              download={resumeDownloadName}
              className="flex-1 sm:flex-none"
            >
              <GlassButton variant="primary" size="sm" className="w-full sm:w-auto">
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </GlassButton>
            </a>
          </div>
        </div>

        <SectionHeading
          number="DOCUMENT"
          label="CURRICULUM VITAE"
          title="Resume / CV"
          description="A complete academic and technical curriculum vitae detailing core computer engineering competencies, verified projects, and achievements."
        />

        {/* Structured Resume Document Preview Sheet */}
        <div className="glass-panel rounded-2xl border border-white/15 bg-graphite-900/95 shadow-glass-lg p-6 sm:p-10 md:p-12 space-y-10 relative overflow-hidden">
          {/* Header */}
          <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-accent/40 bg-graphite-950 flex-shrink-0 shadow-glass-md">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  ANAND S. MOHOD
                </h1>
                <p className="text-sm sm:text-base text-accent font-medium mt-0.5">
                  Python Developer | Software Developer
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Amravati, Maharashtra</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <a
                href={profileData.contact.email.value}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>{profileData.contact.email.display}</span>
              </a>
              <a
                href={profileData.contact.phone.value}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>{profileData.contact.phone.display}</span>
              </a>
              <a
                href={profileData.contact.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
                <span>{profileData.contact.linkedin.display}</span>
              </a>
              <a
                href={profileData.contact.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
                <span>{profileData.contact.github.display}</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold border-b border-accent/20 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Computer Engineering undergraduate (B.Tech) with practical experience in Python,
              software development, relational databases, AI, and full-stack web applications.
              Demonstrated ability to take projects from concept, data sourcing, and architecture
              to deployment across civic, environmental, and commercial domains. Seeking an
              internship to contribute technical problem-solving and gain industry experience.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
              <Code2 className="w-3.5 h-3.5 text-accent" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Technical Skills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 font-semibold block mb-1">Programming Languages:</span>
                <span className="text-slate-200">Python, C, C++, Java</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 font-semibold block mb-1">Web Technologies:</span>
                <span className="text-slate-200">HTML5, CSS3, JavaScript, React</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 font-semibold block mb-1">Frameworks & AI:</span>
                <span className="text-slate-200">FastAPI, TensorFlow</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 font-semibold block mb-1">Databases:</span>
                <span className="text-slate-200">MySQL</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 sm:col-span-2">
                <span className="text-slate-400 font-semibold block mb-1">Tools & Platforms:</span>
                <span className="text-slate-200">Git, GitHub, VS Code, Mapbox</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Education
              </h2>
            </div>
            <div className="space-y-4">
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pb-3 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {edu.degree} {edu.field && !edu.degree.includes(edu.field) ? `— ${edu.field}` : ''}
                    </h3>
                    <p className="text-xs text-slate-300">{edu.institution}</p>
                  </div>
                  <div className="text-xs font-mono text-slate-400 sm:text-right flex flex-col items-start sm:items-end">
                    {edu.duration && <span>{edu.duration}</span>}
                    {edu.status && <span className="text-emerald-400 text-[11px]">{edu.status}</span>}
                    {edu.score && <span className="text-accent text-[11px] font-medium">{edu.score}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
              <FolderGit2 className="w-3.5 h-3.5 text-accent" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Projects
              </h2>
            </div>
            <div className="space-y-6">
              {projectsData.map((proj) => (
                <div key={proj.slug} className="space-y-1.5 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-white">
                      {proj.title} {proj.year ? `| ${proj.year}` : ''}
                    </h3>
                    <span className="text-[11px] font-mono text-accent">
                      {proj.technologies.join(' • ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.shortDescription}
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                    {proj.features.slice(0, 2).map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Programs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
              <Award className="w-3.5 h-3.5 text-accent" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Certifications & Programs
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="font-medium text-white">• IBM SkillsBuild</span> — Technical Certification
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="font-medium text-white">• ISRO</span> — Space Technology Program
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="font-medium text-white">• OpenAI</span> — AI Development Certification
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="font-medium text-white">• TCS</span> — Professional Certification
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="font-medium text-white">• Deloitte</span> — Career Readiness Program
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="font-medium text-white">• Google Ads</span> — Platform Certification
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="font-medium text-white">• AI Bootcamp</span> — Applied AI Certification
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="font-medium text-white">• Multiple Programs</span> — 15+ Total Hackathon & Entrepreneurship Certificates
              </div>
            </div>
          </div>

          {/* Achievements / Honors */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
              <Trophy className="w-3.5 h-3.5 text-accent" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Achievements & Honors
              </h2>
            </div>
            <div className="space-y-3">
              {achievementsData.map((ach) => (
                <div key={ach.id} className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-white text-sm">
                      {ach.title} ({ach.date})
                    </span>
                    <span className="text-[11px] font-mono text-accent">
                      {ach.role} • {ach.organization}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Experience */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
              <UserCheck className="w-3.5 h-3.5 text-accent" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Leadership & Experience
              </h2>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-bold text-white text-sm">
                  Event Coordinator & Discipline Committee Member
                </h3>
                <span className="font-mono text-accent text-[11px]">
                  Startup Carnival | 2026
                </span>
              </div>
              <p className="text-slate-400 font-mono text-[11px]">
                Jagdamba College of Engineering and Technology, Yavatmal
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pt-1">
                <li>Coordinated campus venue planning and event decoration for student startup exhibits.</li>
                <li>Managed discipline operations and protocol enforcement throughout the symposium.</li>
                <li>Awarded official Certificate of Participation for leadership and organizational contributions.</li>
              </ul>
            </div>
          </div>

          {/* Bottom Download Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
            <span>Asset: {resumePdfPath}</span>
            <div className="flex items-center gap-3">
              <a
                href={resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-accent flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Raw PDF</span>
              </a>
              <span className="text-slate-600">•</span>
              <a
                href={resumePdfPath}
                download={resumeDownloadName}
                className="text-accent hover:underline flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official Copy</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
