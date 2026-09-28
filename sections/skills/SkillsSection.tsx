'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { skillsData } from '@/data/skills';
import { SkillCategory } from '@/types';
import {
  Code2,
  Layers,
  Database,
  Sparkles,
  Wrench,
  Terminal,
  Cpu,
  Coffee,
  Layout,
  Palette,
  FileCode,
  Atom,
  Zap,
  Brain,
  GitBranch,
  Github,
  MonitorCheck,
  Server,
  ChevronDown,
  Briefcase,
  Globe2,
  Grid3X3,
} from 'lucide-react';

const SkillsOrbit = dynamic(() => import('@/components/3d/SkillsOrbit'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] flex items-center justify-center">
      <div className="w-36 h-36 rounded-full border border-cyan-500/20 animate-pulse bg-cyan-950/10" />
    </div>
  ),
});

const categories: { label: SkillCategory; icon: React.ReactNode }[] = [
  { label: 'Programming', icon: <Code2 className="w-3.5 h-3.5" /> },
  { label: 'Web Technologies', icon: <Layers className="w-3.5 h-3.5" /> },
  { label: 'Database', icon: <Database className="w-3.5 h-3.5" /> },
  { label: 'Frameworks / AI', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { label: 'Tools / Platforms', icon: <Wrench className="w-3.5 h-3.5" /> },
];

function getSkillIcon(iconName: string) {
  switch (iconName) {
    case 'Terminal':
      return <Terminal className="w-4 h-4" />;
    case 'Cpu':
      return <Cpu className="w-4 h-4" />;
    case 'Code2':
      return <Code2 className="w-4 h-4" />;
    case 'Coffee':
      return <Coffee className="w-4 h-4" />;
    case 'Layout':
      return <Layout className="w-4 h-4" />;
    case 'Palette':
      return <Palette className="w-4 h-4" />;
    case 'FileCode':
      return <FileCode className="w-4 h-4" />;
    case 'Atom':
      return <Atom className="w-4 h-4" />;
    case 'Database':
      return <Database className="w-4 h-4" />;
    case 'Zap':
      return <Zap className="w-4 h-4" />;
    case 'Brain':
      return <Brain className="w-4 h-4" />;
    case 'GitBranch':
      return <GitBranch className="w-4 h-4" />;
    case 'Github':
      return <Github className="w-4 h-4" />;
    case 'MonitorCheck':
      return <MonitorCheck className="w-4 h-4" />;
    case 'Server':
      return <Server className="w-4 h-4" />;
    default:
      return <Code2 className="w-4 h-4" />;
  }
}

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  const filteredSkills =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((s) => s.category === selectedCategory);

  const toggleSkillExpand = (name: string) => {
    setExpandedSkill((prev) => (prev === name ? null : name));
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02"
          label="Skills"
          title="Technical Competencies & Toolchain"
          description="An interactive 3D orbit and structured directory of languages, frameworks, databases, and developer tools."
        />

        {/* View Mode Toggle & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-3 border-b border-slate-200 dark:border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === 'All'
                  ? 'text-accent'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>All ({skillsData.length})</span>
              {selectedCategory === 'All' && (
                <motion.div
                  layoutId="activeCategoryTab"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isSelected
                      ? 'text-accent'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher: 3D Orbit vs 2D Grid */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-graphite-900 p-1 rounded-xl border border-slate-200 dark:border-white/10 w-fit self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === '3d'
                  ? 'bg-accent text-slate-950 font-bold shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>3D Orbit</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent text-slate-950 font-bold shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* 3D Orbit View */}
        {viewMode === '3d' && (
          <div className="mb-10">
            <SkillsOrbit activeCategory={selectedCategory} />
          </div>
        )}

        {/* Compact 2D Grid View (Shown either when selected or as responsive listing) */}
        {(viewMode === 'grid' || typeof window === 'undefined') && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredSkills.map((skill) => {
                const isExpanded = expandedSkill === skill.name;

                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`glass-panel rounded-2xl p-4 sm:p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      isExpanded
                        ? 'border-accent shadow-accent-glow bg-white dark:bg-graphite-800/90'
                        : 'border-slate-200 dark:border-white/10 hover:border-accent/40 bg-white/80 dark:bg-graphite-900/80'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 shadow-sm">
                          {getSkillIcon(skill.iconName)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                            {skill.name}
                          </h3>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5 block">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSkillExpand(skill.name)}
                        className="p-1 rounded-lg text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors focus:outline-none"
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${skill.name}`}
                        title={isExpanded ? 'Hide details' : 'Show details'}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-accent' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Badges Row: "Used in N projects" */}
                    <div className="mt-3.5 flex items-center justify-between gap-2 pt-3 border-t border-slate-200/60 dark:border-white/5 text-[11px] font-mono">
                      {skill.relatedProjects.length > 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent font-semibold">
                          <Briefcase className="w-3 h-3" />
                          <span>
                            Used in {skill.relatedProjects.length}{' '}
                            {skill.relatedProjects.length === 1 ? 'Project' : 'Projects'}
                          </span>
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">
                          Core Competency
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleSkillExpand(skill.name)}
                        className="text-[11px] text-accent font-semibold hover:underline"
                      >
                        {isExpanded ? 'Less' : 'Details'}
                      </button>
                    </div>

                    {/* Expandable Description Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 pt-3 border-t border-slate-200/50 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {skill.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
