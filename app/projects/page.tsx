'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { projectsData } from '@/data/projects';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';

const categories = ['All', 'Web Development', 'Full Stack', 'AI / ML', 'Database'] as const;
type FilterCategory = (typeof categories)[number];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCategory === 'All') return true;
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
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <SectionHeading
          number="INDEX"
          label="PROJECTS"
          title="All Engineering Projects"
          description="A complete directory of software systems, web platforms, and machine learning architectures I have built."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-accent/15 text-accent border border-accent/40 shadow-sm'
                  : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <GlassCard
                  className="p-6 h-full flex flex-col justify-between hover:border-accent/40 transition-all group"
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
                      <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <span className="block text-xs font-normal text-slate-400 mt-1 font-mono">
                          {project.subtitle}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-white transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        aria-label={`Source code for ${project.title}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
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
