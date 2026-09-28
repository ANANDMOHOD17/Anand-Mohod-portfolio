'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

// ─── Category filter tab definitions ────────────────────────────────────────
const categories: { label: SkillCategory; icon: React.ReactNode }[] = [
  { label: 'Programming',      icon: <Code2    className="w-3.5 h-3.5" /> },
  { label: 'Web Technologies', icon: <Layers   className="w-3.5 h-3.5" /> },
  { label: 'Database',         icon: <Database className="w-3.5 h-3.5" /> },
  { label: 'Frameworks / AI',  icon: <Sparkles className="w-3.5 h-3.5" /> },
  { label: 'Tools / Platforms',icon: <Wrench   className="w-3.5 h-3.5" /> },
];

// ─── Icon resolver (unchanged from original) ────────────────────────────────
function getSkillIcon(iconName: string) {
  switch (iconName) {
    case 'Terminal':     return <Terminal     className="w-5 h-5" />;
    case 'Cpu':          return <Cpu          className="w-5 h-5" />;
    case 'Code2':        return <Code2        className="w-5 h-5" />;
    case 'Coffee':       return <Coffee       className="w-5 h-5" />;
    case 'Layout':       return <Layout       className="w-5 h-5" />;
    case 'Palette':      return <Palette      className="w-5 h-5" />;
    case 'FileCode':     return <FileCode     className="w-5 h-5" />;
    case 'Atom':         return <Atom         className="w-5 h-5" />;
    case 'Database':     return <Database     className="w-5 h-5" />;
    case 'Zap':          return <Zap          className="w-5 h-5" />;
    case 'Brain':        return <Brain        className="w-5 h-5" />;
    case 'GitBranch':    return <GitBranch    className="w-5 h-5" />;
    case 'Github':       return <Github       className="w-5 h-5" />;
    case 'MonitorCheck': return <MonitorCheck className="w-5 h-5" />;
    case 'Server':       return <Server       className="w-5 h-5" />;
    default:             return <Code2        className="w-5 h-5" />;
  }
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');

  const filteredSkills =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02"
          label="Skills"
          title="Technical Competencies & Toolchain"
          description="A comprehensive, structured directory of programming languages, full-stack frameworks, databases, and engineering tools."
        />

        {/* ── Category Filter Tabs ── */}
        <div className="flex items-center justify-start gap-2 mb-8 pb-3 border-b border-slate-200 dark:border-white/10 overflow-x-auto scrollbar-none">
          {/* All */}
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 ${
              selectedCategory === 'All'
                ? 'text-accent'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>All ({skillsData.length})</span>
            {selectedCategory === 'All' && (
              <motion.div
                layoutId="activeCategoryTab"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Per-category tabs */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setSelectedCategory(cat.label)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 ${
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
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Skill Cards Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-[#27272F]
                           bg-white/80 dark:bg-[#111116]
                           hover:border-[#6366F1]/50 hover:bg-white dark:hover:bg-[#16161D]
                           hover:-translate-y-1 hover:shadow-md
                           transition-all duration-300
                           flex flex-col items-start gap-3"
              >
                {/* Icon container — neutral in idle state, accent tint on hover via parent group */}
                <div
                  className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10
                             flex items-center justify-center text-[#8B8F9F] shrink-0"
                  aria-hidden="true"
                >
                  {getSkillIcon(skill.iconName)}
                </div>

                {/* Name + Category */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] leading-tight">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#7F8496] mt-0.5 block">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
