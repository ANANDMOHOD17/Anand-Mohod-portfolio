'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { projectsData } from '@/data/projects';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const categories = ['Web Development', 'Full Stack', 'AI / ML', 'Database'] as const;
type FilterCategory = (typeof categories)[number];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('Web Development');

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCategory === 'Web Development') return p.category.includes('Web Development');
    if (selectedCategory === 'Full Stack') return p.category.includes('Full Stack');
    if (selectedCategory === 'AI / ML') return p.category.includes('AI') || p.category.includes('Machine Learning');
    if (selectedCategory === 'Database') return p.category.includes('Database');
    return true;
  });

  return (
    <div className="pt-32 pb-24 md:py-36 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <SectionHeading
          number="INDEX"
          label="PROJECTS"
          title="Engineering Projects Directory"
          description="A complete directory of software systems, web platforms, and machine learning architectures I have built."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-accent/15 text-accent border border-accent/40 shadow-sm'
                  : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid — Image First */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <GlassCard
                  className="h-full flex flex-col overflow-hidden hover:border-accent/40 transition-all group border-slate-200 dark:border-white/10 bg-white/80 dark:bg-graphite-900/80"
                  tilt={true}
                >
                  {/* Project Preview Image — shown ABOVE all text */}
                  {project.image && (
                    <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-graphite-950 flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title} project`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading={idx < 3 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
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
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors leading-tight">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <span className="block text-xs font-normal text-slate-500 dark:text-slate-400 mt-1 font-mono">
                            {project.subtitle}
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-accent bg-accent/10 border border-accent/20">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline transition-colors"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-2.5">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                            aria-label={`View ${project.title} source code on GitHub`}
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
    </div>
  );
}
