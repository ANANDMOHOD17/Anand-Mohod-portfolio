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
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02"
          label="Skills"
          title="Technical Competencies & Toolchain"
          description="A structured index of programming languages, web technologies, databases, frameworks, and developer tools."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
              selectedCategory === 'All'
                ? 'bg-accent/15 text-accent border border-accent/40 shadow-sm'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Technologies ({skillsData.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setSelectedCategory(cat.label)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
                selectedCategory === cat.label
                  ? 'bg-accent/15 text-accent border border-accent/40 shadow-sm'
                  : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill === skill.name;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveSkill(isSelected ? null : skill.name)}
                  className={`glass-panel rounded-xl p-5 border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-accent/60 bg-graphite-800/90 shadow-accent-glow'
                      : 'border-white/10 hover:border-white/20 hover:bg-graphite-850/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        {skill.category}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">
                        {skill.name}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                      {getSkillIcon(skill.iconName)}
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Related Projects Indicator */}
                  {skill.relatedProjects.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Applied In:</span>
                      <span className="text-accent/80 font-medium">
                        {skill.relatedProjects.length} {skill.relatedProjects.length === 1 ? 'Project' : 'Projects'}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

