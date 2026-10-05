'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassButton from '@/components/ui/GlassButton';
import { profileData } from '@/data/profile';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Award,
  GraduationCap,
  Code2,
  FolderGit2,
  Compass,
  Briefcase,
  FileText,
  Clock,
  Globe,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const technicalSkills = [
  { category: 'Programming', skills: 'Python, C, C++, Java' },
  { category: 'Web Technologies', skills: 'HTML, CSS, JavaScript, React' },
  { category: 'Database', skills: 'MySQL' },
  { category: 'Frameworks / AI', skills: 'FastAPI, TensorFlow' },
  { category: 'Tools / Platforms', skills: 'Git, GitHub, VS Code, Mapbox' },
];

const projects = [
  {
    title: 'Voting Portal',
    year: '2025',
    bullet:
      'Web-based student voting portal with user and administrator functions to manage voting, vote records and results, built on practical database concepts.',
  },
  {
    title: 'Rentogo',
    year: '2026',
    bullet:
      'Rental platform for discovering homes and rooms, with structured property listings and interfaces for browsing and viewing property details.',
  },
  {
    title: 'Smart Store Management System',
    year: '2026',
    bullet:
      'Store management application for organizing products, inventory and customer records, applying database concepts to store, retrieve and manage data.',
  },
  {
    title: 'AI Climate Twin India — Climate Risk Prediction Platform',
    year: '2026',
    bullet:
      'Full-stack platform predicting rainfall, heatwave and flood risk using IMD, NASA POWER, ERA5 and ISRO datasets; TensorFlow models, FastAPI backend, React frontend and Mapbox geospatial visualization; owned from data sourcing to deployment.',
  },
  {
    title: 'KrushiScan',
    year: '2026',
    bullet:
      'Agriculture-focused digital platform providing crop information, farming guidance, market information and important alerts through a simple, accessible interface for farmers.',
  },
  {
    title: 'Kabadiwala Connect (SIH26229)',
    year: '2026',
    bullet:
      'Formal–informal recycling chain platform connecting households, waste collectors and authorized recyclers, with a pickup marketplace featuring transparent pricing, digital payments, collector identity and traceability; prepared a 6-slide pitch deck for the Smart India Hackathon 2026 Software Edition evaluation round.',
  },
];

const certifications = [
  { name: 'IBM SkillsBuild', program: 'Technical Certification' },
  { name: 'ISRO', program: 'Space Technology Program' },
  { name: 'OpenAI', program: 'AI Development Certification' },
  { name: 'TCS', program: 'Professional Certification' },
  { name: 'Deloitte', program: 'Career Readiness Program' },
  { name: 'Google Ads', program: 'Platform Certification' },
  { name: 'AI Bootcamp', program: 'Applied AI Certification' },
  { name: 'Multiple Programs', program: 'Hackathon & Entrepreneurship Program Certificates (15+ total)' },
];

const careerInterests = [
  'Python Development',
  'Software Development',
  'Web Development',
  'Full-Stack Development',
];

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<'document' | 'pdf'>('document');
  const basePath = process.env.NODE_ENV === 'production' ? '/Anand-Mohod-portfolio' : '';
  const resumePdfPath = `${basePath}/resume/Anand_Mohod_Resume.pdf`;
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
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('document')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'document'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive View
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'pdf'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                PDF Preview
              </button>
            </div>

            <a
              href={resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <GlassButton variant="secondary" size="sm" className="w-full sm:w-auto">
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
                <span className="hidden sm:inline">Open PDF</span>
              </GlassButton>
            </a>

            <a
              href={resumePdfPath}
              download={resumeDownloadName}
              className="flex-1 sm:flex-none"
            >
              <GlassButton variant="primary" size="sm" className="w-full sm:w-auto">
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </GlassButton>
            </a>
          </div>
        </div>

        <SectionHeading
          number="DOCUMENT"
          label="CURRICULUM VITAE"
          title="Resume / CV"
          description="Official single-page curriculum vitae detailing software engineering competencies, verified projects, academic background, and credentials."
        />

        {/* View Switch: PDF Frame or Structured Document Sheet */}
        {activeTab === 'pdf' ? (
          <div className="glass-panel rounded-2xl border border-white/15 bg-graphite-900/95 shadow-glass-lg p-3 sm:p-4 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <FileText className="w-3.5 h-3.5 text-accent" />
                Anand_Mohod_Resume.pdf (1 Page)
              </span>
              <a
                href={resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1"
              >
                Full screen <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <iframe
              src={resumePdfPath}
              title="Anand Mohod Resume PDF"
              className="w-full h-[850px] md:h-[1050px] rounded-xl border border-white/10 bg-white"
            />
          </div>
        ) : (
          /* Structured Resume Document Sheet */
          <div className="glass-panel rounded-2xl border border-white/15 bg-graphite-900/95 shadow-glass-lg p-6 sm:p-10 md:p-12 space-y-9 relative overflow-hidden">
            {/* Header */}
            <div className="border-b border-white/10 pb-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
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
                    Anand S. Mohod
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
                  href={profileData.contact.phone.value}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>+91 7028393036</span>
                </a>
                <a
                  href={profileData.contact.email.value}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <span>officialanandmohod@gmail.com</span>
                </a>
                <a
                  href="https://linkedin.com/in/anand-mohod-ab2a88428"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  <span>linkedin.com/in/anand-mohod-ab2a88428</span>
                </a>
                <a
                  href="https://github.com/ANANDMOHOD17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  <span>github.com/ANANDMOHOD17</span>
                </a>
              </div>
            </div>

            {/* 1. PROFESSIONAL SUMMARY */}
            <div className="space-y-2.5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold border-b border-accent/20 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Computer Engineering student (B.Tech) with hands-on experience in Python, software
                development, databases, AI and full-stack project development. Built practical
                applications across voting, rental, retail, agriculture, climate-risk prediction and
                recycling domains, taking projects from concept and data sourcing through
                implementation and deployment. Seeking an internship to apply technical skills and gain
                industry experience.
              </p>
            </div>

            {/* 2. EDUCATION */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  EDUCATION
                </h2>
              </div>
              <div className="space-y-3 text-xs">
                {/* College */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-white">
                      Jagadambha College of Engineering & Technology, Yavatmal
                    </h3>
                    <span className="font-mono text-accent text-xs">2024–2028</span>
                  </div>
                  <p className="text-slate-300">
                    B.Tech – Computer Engineering | 3rd Year, 5th Semester |{' '}
                    <span className="text-accent font-medium">CGPA: 7.9 (2nd Year)</span>
                  </p>
                </div>

                {/* HSC & SSC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
                    <span className="font-semibold text-white">HSC – Rural Institute, Amravati</span>
                    <p className="text-slate-300 font-mono text-[11px]">
                      12th Percentage:{' '}
                      <span className="text-accent font-medium">60.33%</span>
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
                    <span className="font-semibold text-white">SSC – Shri Ganeshdas Rathi Vidyalaya, Amravati</span>
                    <p className="text-slate-300 font-mono text-[11px]">
                      10th Percentage:{' '}
                      <span className="text-accent font-medium">73.60%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. TECHNICAL SKILLS */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
                <Code2 className="w-3.5 h-3.5 text-accent" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  TECHNICAL SKILLS
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {technicalSkills.map((item, index) => (
                  <div
                    key={item.category}
                    className={`p-3 rounded-lg bg-white/5 border border-white/5 ${
                      index === technicalSkills.length - 1 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <span className="text-slate-400 font-semibold block mb-0.5">
                      {item.category}:
                    </span>
                    <span className="text-slate-100 font-medium">{item.skills}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. PROJECTS */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
                <FolderGit2 className="w-3.5 h-3.5 text-accent" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  PROJECTS
                </h2>
              </div>
              <div className="space-y-3.5">
                {projects.map((proj) => (
                  <div
                    key={proj.title}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {proj.title}
                      </h3>
                      <span className="font-mono text-accent text-xs">{proj.year}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <span className="text-accent select-none mt-0.5">•</span>
                      <p>{proj.bullet}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. CERTIFICATIONS & PROGRAMS */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
                <Award className="w-3.5 h-3.5 text-accent" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  CERTIFICATIONS & PROGRAMS
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-start gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-semibold">{cert.name}</strong> –{' '}
                      {cert.program}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. CAREER INTERESTS */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
                <Compass className="w-3.5 h-3.5 text-accent" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  CAREER INTERESTS
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {careerInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-medium font-mono"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* 7. ADDITIONAL INFORMATION */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-accent/20 pb-1">
                <Briefcase className="w-3.5 h-3.5 text-accent" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  ADDITIONAL INFORMATION
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
                  <span className="text-slate-400 font-semibold block">Internship Availability:</span>
                  <span className="text-slate-100">Open to paid or unpaid opportunities</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
                  <span className="text-slate-400 font-semibold block">Work Preference:</span>
                  <span className="text-slate-100 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-accent" /> Remote or Offline
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-0.5">
                  <span className="text-slate-400 font-semibold block">Duration:</span>
                  <span className="text-slate-100 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-accent" /> Flexible (1–6 months)
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Download Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified Single-Page PDF Asset
              </span>
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
                  className="text-accent hover:underline flex items-center gap-1.5 font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF (Direct)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
