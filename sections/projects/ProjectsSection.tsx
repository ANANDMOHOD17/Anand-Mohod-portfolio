'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { projectsData } from '@/data/projects';
import { ArrowUpRight, Github, Sparkles, ExternalLink, Activity } from 'lucide-react';
import ArchitectureFlow3D from '@/components/3d/ArchitectureFlow3D';

const projectFilters = ['All', 'AI / ML', 'Web', 'Hackathon'] as const;
type ProjectFilter = (typeof projectFilters)[number];

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('All');

  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];

  const filteredSecondary = projectsData
    .filter((p) => p.slug !== featuredProject.slug)
    .filter((p) => {
      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'AI / ML')
        return p.category.includes('AI') || p.category.includes('Machine Learning');
      if (selectedFilter === 'Web')
        return p.category.includes('Web') || p.category.includes('Database');
      if (selectedFilter === 'Hackathon')
        return p.category.includes('Hackathon') || p.status.includes('Hackathon');
      return true;
    });

  const isFlagshipMatching = selectedFilter === 'All' || selectedFilter === 'AI / ML';

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <SectionHeading
            number="03"
            label="Projects"
            title="Featured Engineering Projects"
            description="Handcrafted applications, system tools, and web architectures solving tangible real-world problems."
            className="mb-0 md:mb-0"
          />

          <Link href="/projects">
            <GlassButton variant="secondary" size="md">
              <span>View All ({projectsData.length})</span>
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </GlassButton>
          </Link>
        </div>

        {/* Filter Bar with Animated Active State */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {projectFilters.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isSelected
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-400/40 shadow-sm'
                    : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
                }`}
              >
                <span>{filter === 'All' ? `All Projects (${projectsData.length})` : filter}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 1. Flagship Featured Project (AI Climate Twin India) with 3D Architecture Pipeline */}
        {isFlagshipMatching && (
          <div className="mb-14 space-y-8">
            <GlassCard
              className="border-slate-200 dark:border-white/15 bg-white/90 dark:bg-graphite-900/90 shadow-glass-md hover:border-cyan-400/40 transition-all p-6 md:p-8 lg:p-10"
              tilt={true}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Project Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-400/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      FLAGSHIP ARCHITECTURE
                    </span>
                    {featuredProject.year && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-400 bg-cyan-500/5 border border-cyan-400/20">
                        {featuredProject.year}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      {featuredProject.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {featuredProject.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {featuredProject.title}
                    </h3>
                    {featuredProject.subtitle && (
                      <p className="text-sm sm:text-base font-mono text-cyan-400 font-medium mt-1">
                        {featuredProject.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                    {featuredProject.shortDescription}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featuredProject.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {featuredProject.technologies.length > 5 && (
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-400/25">
                        +{featuredProject.technologies.length - 5} More
                      </span>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link href={`/projects/${featuredProject.slug}`}>
                      <GlassButton variant="primary" size="md">
                        <span>Read Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </GlassButton>
                    </Link>

                    {/* Reserved spaces for real URLs */}
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

                    {featuredProject.liveUrl && (
                      <GlassButton
                        variant="secondary"
                        size="md"
                        asLink
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 text-cyan-400" />
                        <span>Live Demo</span>
                      </GlassButton>
                    )}
                  </div>
                </div>

                {/* Right: Flagship Interactive Architecture Pipeline */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden bg-graphite-950 border border-white/10 p-5 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10 text-xs font-mono text-cyan-400">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      <span>End-to-End System Pipeline</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                        <span className="text-white font-bold">1. React + Mapbox GL</span>
                        <span className="text-[10px] text-cyan-300">Geospatial UI</span>
                      </div>
                      <div className="w-0.5 h-2.5 bg-cyan-400/50 mx-auto" />
                      <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between">
                        <span className="text-white font-bold">2. FastAPI Backend</span>
                        <span className="text-[10px] text-sky-300">&lt; 45ms Async API</span>
                      </div>
                      <div className="w-0.5 h-2.5 bg-cyan-400/50 mx-auto" />
                      <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-between">
                        <span className="text-white font-bold">3. TensorFlow Engine</span>
                        <span className="text-[10px] text-violet-300">LSTM Regression</span>
                      </div>
                      <div className="w-0.5 h-2.5 bg-cyan-400/50 mx-auto" />
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                        <span className="text-white font-bold">4. NASA & IMD Feeds</span>
                        <span className="text-[10px] text-emerald-300">Historical ETL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Interactive Architecture Flow Explorer */}
            <ArchitectureFlow3D />
          </div>
        )}

        {/* 2. Additional Project Cards with 3D Depth & Tilt */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSecondary.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <GlassCard
                  className="p-6 md:p-7 h-full flex flex-col justify-between hover:border-cyan-400/40 transition-all group border-slate-200 dark:border-white/10 bg-white/80 dark:bg-graphite-900/80 shadow-glass-sm hover:shadow-[0_15px_35px_rgba(56,189,248,0.12)]"
                  tilt={true}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        {project.year && (
                          <span className="text-xs font-mono text-cyan-400 font-semibold">
                            {project.year}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors leading-tight">
                        {project.title}
                      </h4>
                      {project.subtitle && (
                        <span className="block text-xs font-normal text-slate-500 dark:text-slate-400 mt-1 font-mono">
                          {project.subtitle}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-400/20">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Space reserved for Live Demo & GitHub links */}
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-cyan-400 p-1"
                          aria-label={`View live demo of ${project.title}`}
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-white p-1"
                          aria-label={`View ${project.title} on GitHub`}
                          title="Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
