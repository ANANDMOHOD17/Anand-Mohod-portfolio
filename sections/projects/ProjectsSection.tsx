'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { projectsData } from '@/data/projects';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const projectFilters = ['AI / ML', 'Web', 'Hackathon'] as const;
type ProjectFilter = (typeof projectFilters)[number];

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('AI / ML');

  const filteredProjects = projectsData.filter((p) => {
    if (selectedFilter === 'AI / ML')
      return p.category.includes('AI') || p.category.includes('Machine Learning');
    if (selectedFilter === 'Web')
      return p.category.includes('Web') || p.category.includes('Database');
    if (selectedFilter === 'Hackathon')
      return p.category.includes('Hackathon') || p.status.includes('Hackathon');
    return true;
  });

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
              <span>Browse Archive ({projectsData.length})</span>
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </GlassButton>
          </Link>
        </div>

        {/* Filter Bar with Animated Active State — Individual categories only */}
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
                    ? 'text-accent bg-accent/10 border border-accent/40 shadow-sm'
                    : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
                }`}
              >
                <span>{filter}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Individual Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
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
                  className="h-full flex flex-col overflow-hidden hover:border-[#6366F1] transition-all group border-slate-200 dark:border-[#27272F] bg-white/80 dark:bg-[#111116] hover:bg-white dark:hover:bg-[#16161D] shadow-glass-sm hover:shadow-[0_15px_35px_rgba(99,102,241,0.12)]"
                  tilt={true}
                >
                  {/* Project Preview Image — shown ABOVE all text */}
                  {project.image && (
                    <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-[#0A0A0F] flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title} project`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Card Body: category → title → description → tech → actions */}
                  <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-slate-500 dark:text-[#94A3B8] truncate">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          {project.featured && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-accent bg-accent/10 border border-accent/30 font-semibold">
                              Featured
                            </span>
                          )}
                          {project.year && (
                            <span className="text-xs font-mono text-[#6366F1] font-semibold">
                              {project.year}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-600 dark:text-[#94A3B8] bg-slate-100 dark:bg-[#16162A] border border-slate-200 dark:border-[#35356A]">
                            {project.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-accent transition-colors leading-tight">
                          {project.title}
                        </h4>
                        {project.subtitle && (
                          <span className="block text-xs font-normal text-slate-500 dark:text-[#94A3B8] mt-1 font-mono">
                            {project.subtitle}
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600 dark:text-[#CBD5E1] text-sm leading-relaxed line-clamp-3">
                        {project.shortDescription}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-700 dark:text-[#818CF8] bg-slate-100 dark:bg-[#16162A] border border-slate-200 dark:border-[#35356A]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[#818CF8] bg-[#16162A] border border-[#35356A]">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline transition-colors"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      {/* Real Live Demo & GitHub links */}
                      <div className="flex items-center gap-2.5">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                            aria-label={`View source code of ${project.title} on GitHub`}
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:text-accent-hover transition-colors font-medium"
                            aria-label={`Open live demo of ${project.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
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
