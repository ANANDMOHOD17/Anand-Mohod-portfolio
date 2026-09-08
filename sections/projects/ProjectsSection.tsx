'use client';

import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { projectsData } from '@/data/projects';
import { ArrowUpRight, Github, Sparkles } from 'lucide-react';

export default function ProjectsSection() {
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  const secondaryProjects = projectsData.filter((p) => p.slug !== featuredProject.slug);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            number="03"
            label="Projects"
            title="Featured Engineering Projects"
            description="Handcrafted applications, system tools, and web architectures solving tangible problems."
            className="mb-0 md:mb-0"
          />

          <Link href="/projects">
            <GlassButton variant="secondary" size="md">
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </GlassButton>
          </Link>
        </div>

        {/* 1. Prominent Featured Project */}
        {featuredProject && (
          <div className="mb-16">
            <GlassCard
              className="border-white/15 bg-graphite-900/90 hover:border-accent/40 transition-all p-6 md:p-8 lg:p-10"
              tilt={true}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Project Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold text-accent bg-accent/10 border border-accent/30">
                      <Sparkles className="w-3 h-3" />
                      FEATURED PROJECT
                    </span>
                    {featuredProject.year && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-accent/90 bg-accent/5 border border-accent/20">
                        {featuredProject.year}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      {featuredProject.status}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {featuredProject.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                      {featuredProject.title}
                    </h3>
                    {featuredProject.subtitle && (
                      <p className="text-sm sm:text-base font-mono text-accent/80 mt-1">
                        {featuredProject.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {featuredProject.shortDescription}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 bg-white/5 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link href={`/projects/${featuredProject.slug}`}>
                      <GlassButton variant="primary" size="md">
                        <span>Read Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </GlassButton>
                    </Link>

                    {featuredProject.githubUrl && (
                      <GlassButton
                        variant="secondary"
                        size="md"
                        asLink
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 text-slate-400" />
                        <span>Source Code</span>
                      </GlassButton>
                    )}
                  </div>
                </div>

                {/* Right: Technical Mockup / Visual Card */}
                <div className="lg:col-span-5 relative">
                  <div className="relative aspect-[4/3] rounded-xl bg-graphite-950/90 border border-white/10 overflow-hidden flex flex-col justify-between p-6 shadow-inner">
                    {/* Top bar mockup */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {featuredProject.slug}.system
                      </span>
                    </div>

                    {/* Architecture schematic indicator */}
                    {featuredProject.architecture ? (
                      <div className="py-4 space-y-2.5">
                        {featuredProject.architecture.components.map((comp, idx) => (
                          <React.Fragment key={comp.name}>
                            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-xs text-slate-300 flex items-center justify-between">
                              <span className="truncate pr-2">{comp.name}</span>
                              <span className="text-accent text-[10px] shrink-0">{comp.role}</span>
                            </div>
                            {idx < featuredProject.architecture!.components.length - 1 && (
                              <div className="w-[1px] h-2.5 bg-accent/40 mx-auto" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 space-y-3">
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-xs text-slate-300 flex items-center justify-between">
                          <span>Client Application</span>
                          <span className="text-accent text-[10px]">React SPA</span>
                        </div>
                        <div className="w-[1px] h-4 bg-accent/40 mx-auto" />
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-xs text-slate-300 flex items-center justify-between">
                          <span>REST API Middleware</span>
                          <span className="text-accent text-[10px]">FastAPI / Python</span>
                        </div>
                        <div className="w-[1px] h-4 bg-accent/40 mx-auto" />
                        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-xs text-slate-300 flex items-center justify-between">
                          <span>Intelligence Store</span>
                          <span className="text-accent text-[10px]">TensorFlow Models</span>
                        </div>
                      </div>
                    )}

                    <div className="text-[11px] font-mono text-slate-500 text-center">
                      Full-Stack Architecture Verified
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* 2. Additional Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryProjects.map((project) => (
            <GlassCard
              key={project.slug}
              className="p-6 md:p-7 flex flex-col justify-between hover:border-white/20 transition-all group"
              tilt={true}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-500 truncate">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    {project.year && (
                      <span className="text-xs font-mono text-accent/80">
                        {project.year}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10">
                      {project.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  {project.subtitle && (
                    <span className="block text-xs font-normal text-slate-400 mt-1 font-mono">
                      {project.subtitle}
                    </span>
                  )}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-white transition-colors"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors p-1"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
