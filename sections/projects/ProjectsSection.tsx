'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { projectsData } from '@/data/projects';
import { ArrowUpRight, Github, Sparkles, ExternalLink, ArrowRight, Server, Brain, Monitor, Database } from 'lucide-react';

const projectFilters = ['All', 'AI / ML', 'Web', 'Hackathon'] as const;
type ProjectFilter = (typeof projectFilters)[number];

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('All');

  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];

  const filteredSecondary = projectsData
    .filter((p) => p.slug !== featuredProject.slug)
    .filter((p) => {
      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'AI / ML') return p.category.includes('AI') || p.category.includes('Machine Learning');
      if (selectedFilter === 'Web') return p.category.includes('Web') || p.category.includes('Database');
      if (selectedFilter === 'Hackathon') return p.category.includes('Hackathon') || p.status.includes('Hackathon');
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

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {projectFilters.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isSelected
                    ? 'bg-accent/15 text-accent border border-accent/40 shadow-sm'
                    : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
                }`}
              >
                {filter === 'All' ? `All Projects (${projectsData.length})` : filter}
              </button>
            );
          })}
        </div>

        {/* 1. Prominent Flagship Featured Project (AI Climate Twin India) */}
        {isFlagshipMatching && (
          <div className="mb-14">
            <GlassCard
              className="border-slate-200 dark:border-white/15 bg-white/90 dark:bg-graphite-900/90 shadow-glass-md hover:border-accent/40 transition-all p-6 md:p-8 lg:p-10"
              tilt={true}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Project Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold text-accent bg-accent/10 border border-accent/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      FLAGSHIP ARCHITECTURE
                    </span>
                    {featuredProject.year && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-accent bg-accent/5 border border-accent/20">
                        {featuredProject.year}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      {featuredProject.status}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {featuredProject.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {featuredProject.title}
                    </h3>
                    {featuredProject.subtitle && (
                      <p className="text-sm sm:text-base font-mono text-accent font-medium mt-1">
                        {featuredProject.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                    {featuredProject.shortDescription}
                  </p>

                  {/* Tech Stack Chips (max 4 + count) */}
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
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono text-accent bg-accent/10 border border-accent/25">
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

                    {/* Reserved spaces for real URLs without inventing links */}
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
                        <ExternalLink className="w-4 h-4 text-accent" />
                        <span>Live Demo</span>
                      </GlassButton>
                    )}
                  </div>
                </div>

                {/* Right: Clean Visual Architecture Flow Diagram */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl bg-slate-900 dark:bg-graphite-950 border border-slate-700 dark:border-white/10 p-5 sm:p-6 shadow-inner text-white">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="text-[11px] text-accent">Architecture Topology</span>
                    </div>

                    {/* Flowchart Nodes */}
                    <div className="py-4 space-y-3">
                      {/* Node 1: Client */}
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-sky-500/10 text-accent">
                            <Monitor className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold block text-white">Client Interface</span>
                            <span className="text-[10px] text-slate-400">React.js & Mapbox Geospatial</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent/15 text-accent border border-accent/30">
                          UI Layer
                        </span>
                      </div>

                      {/* Connection Flow Arrow */}
                      <div className="flex items-center justify-center gap-1 text-slate-500 py-0.5">
                        <div className="w-0.5 h-3 bg-accent/40" />
                      </div>

                      {/* Node 2: FastAPI */}
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Server className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold block text-white">API Server</span>
                            <span className="text-[10px] text-slate-400">FastAPI Asynchronous Backend</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          REST API
                        </span>
                      </div>

                      {/* Connection Flow Arrow */}
                      <div className="flex items-center justify-center gap-1 text-slate-500 py-0.5">
                        <div className="w-0.5 h-3 bg-accent/40" />
                      </div>

                      {/* Node 3: TensorFlow & Datasets */}
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                            <Brain className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold block text-white">ML Inference Engine</span>
                            <span className="text-[10px] text-slate-400">TensorFlow + IMD, NASA, ERA5, ISRO</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/15 text-purple-400 border border-purple-500/30">
                          AI Engine
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400 text-center flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>End-to-End Pipeline Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* 2. Additional Project Cards Responsive Grid (3 / 2 / 1 columns) */}
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
                  className="p-6 md:p-7 h-full flex flex-col justify-between hover:border-accent/40 transition-all group border-slate-200 dark:border-white/10 bg-white/80 dark:bg-graphite-900/80"
                  tilt={true}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        {project.year && (
                          <span className="text-xs font-mono text-accent font-semibold">
                            {project.year}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors leading-tight">
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

                    {/* Tech Chips (max 4 plus count) */}
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
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono text-accent bg-accent/10 border border-accent/20">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Space reserved for Live Demo & GitHub links (hidden if null) */}
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-accent p-1"
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

