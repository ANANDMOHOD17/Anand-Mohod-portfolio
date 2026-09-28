import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '@/data/projects';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Sparkles, BookOpen, Layers, Cpu, Award } from 'lucide-react';
import type { Metadata } from 'next';

interface CaseStudyProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: CaseStudyProps): Metadata {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: 'Project Not Found | Anand Mohod',
    };
  }
  return {
    title: `${project.title} | Case Study by Anand Mohod`,
    description: project.shortDescription,
  };
}

export default function ProjectCaseStudyPage({ params }: CaseStudyProps) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const contributionsList = project.contributions && project.contributions.length > 0
    ? project.contributions
    : project.challenges || [];

  const tocItems = [
    { id: 'overview', label: '01. Overview' },
    { id: 'tech-stack', label: '02. Tech Stack' },
    { id: 'features', label: '03. Key Features' },
    ...(project.architecture ? [{ id: 'architecture', label: '04. Architecture' }] : []),
    ...(contributionsList.length > 0
      ? [{ id: 'contributions', label: project.architecture ? '05. Key Contributions' : '04. Key Contributions' }]
      : []),
    { id: 'learnings', label: project.architecture ? (contributionsList.length > 0 ? '06. Engineering Learnings' : '05. Engineering Learnings') : (contributionsList.length > 0 ? '05. Engineering Learnings' : '04. Engineering Learnings') },
  ];

  return (
    <div className="pt-32 pb-24 md:py-36 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Projects</span>
        </Link>

        {/* Header Area */}
        <header className="space-y-6 mb-12 border-b border-slate-200 dark:border-white/10 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono text-accent bg-accent/10 border border-accent/30 font-semibold">
              {project.category}
            </span>
            {project.year && (
              <span className="px-3 py-1 rounded-full text-xs font-mono text-accent bg-accent/5 border border-accent/20">
                {project.year}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-medium">
              Status: {project.status}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-amber-500 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 font-medium">
                <Sparkles className="w-3 h-3" />
                Featured Work
              </span>
            )}
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-base sm:text-lg font-mono text-accent font-medium mt-2">
                {project.subtitle}
              </p>
            )}
          </div>

          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {project.shortDescription}
          </p>

          {/* Action Links - only rendered if real URLs exist */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.githubUrl && (
                <GlassButton
                  variant="primary"
                  size="md"
                  asLink
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                  <span>View Source on GitHub</span>
                </GlassButton>
              )}

              {project.liveUrl && (
                <GlassButton
                  variant="secondary"
                  size="md"
                  asLink
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 text-accent" />
                  <span>Live Deployment</span>
                </GlassButton>
              )}
            </div>
          )}
        </header>

        {/* Two-Column Grid: Main Content + Sticky Mini Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Case Study Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section id="overview" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-accent font-mono text-sm">01.</span>
                Project Overview
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                {project.fullDescription}
              </p>
            </section>

            {/* Technologies Used */}
            <section id="tech-stack" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-accent font-mono text-sm">02.</span>
                Tech Stack & Toolchain
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Key Features */}
            <section id="features" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-accent font-mono text-sm">03.</span>
                Key Capabilities & Features
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Architecture Breakdown (if present) */}
            {project.architecture && (
              <section id="architecture" className="scroll-mt-32 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-accent font-mono text-sm">04.</span>
                  System Architecture
                </h2>
                <GlassCard className="p-6 border-slate-200 dark:border-white/10 bg-white/80 dark:bg-graphite-900/80 space-y-4" tilt={false}>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {project.architecture.summary}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {project.architecture.components.map((c, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1">
                        <span className="text-xs font-mono text-accent font-bold block">
                          {c.name}
                        </span>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                          {c.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </section>
            )}

            {/* What I Did / Key Contributions */}
            {contributionsList.length > 0 && (
              <section id="contributions" className="scroll-mt-32 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-accent font-mono text-sm">
                    {project.architecture ? '05.' : '04.'}
                  </span>
                  What I Did & Key Contributions
                </h2>
                <div className="space-y-3">
                  {contributionsList.map((item, idx) => (
                    <GlassCard key={idx} className="p-4 border-slate-200 dark:border-white/5 bg-slate-50/70 dark:bg-graphite-900/60" tilt={false}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </section>
            )}

            {/* What I Learned */}
            <section id="learnings" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-accent font-mono text-sm">
                  {project.architecture ? (contributionsList.length > 0 ? '06.' : '05.') : (contributionsList.length > 0 ? '05.' : '04.')}
                </span>
                What I Learned & Engineering Takeaways
              </h2>
              <ul className="space-y-3">
                {project.learnings.map((learning, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky Mini Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-4 bg-white/70 dark:bg-graphite-900/70 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
                <BookOpen className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold">
                  Table of Contents
                </span>
              </div>

              <nav className="flex flex-col space-y-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <Link
                  href="/projects"
                  className="flex items-center gap-2 text-xs font-mono text-accent hover:underline font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Browse All Projects</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-accent font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline font-mono transition-colors font-semibold"
          >
            <span>Discuss This Project</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
