'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Server,
  Brain,
  Database,
  ArrowRight,
  Activity,
  Layers,
  CheckCircle,
} from 'lucide-react';

interface Stage {
  id: string;
  number: string;
  name: string;
  tech: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  specs: string[];
  color: string;
}

const STAGES: Stage[] = [
  {
    id: 'client',
    number: '01',
    name: 'Geospatial Client',
    tech: 'React 18 + Mapbox GL',
    icon: Monitor,
    description: 'Dynamic vector tile rendering with interactive climate risk choropleth maps.',
    specs: ['60 FPS WebGL Map', 'GeoJSON Layers', 'Responsive Sliders'],
    color: '#6366f1', // Indigo
  },
  {
    id: 'api',
    number: '02',
    name: 'Async REST Gateway',
    tech: 'FastAPI + Pydantic',
    icon: Server,
    description: 'High-throughput asynchronous endpoints with query validation and response caching.',
    specs: ['< 45ms Latency', 'Pydantic V2', 'CORS & Rate Limiting'],
    color: '#818cf8', // Indigo light
  },
  {
    id: 'ml',
    number: '03',
    name: 'Inference Engine',
    tech: 'TensorFlow + NumPy',
    icon: Brain,
    description: 'Trained climate anomaly detection & multi-parameter regression models.',
    specs: ['LSTM Regressor', 'Feature Normalizer', 'Batch Inference'],
    color: '#4f46e5', // Indigo dark
  },
  {
    id: 'data',
    number: '04',
    name: 'Data Feed Layer',
    tech: 'NASA POWER + IMD Data',
    icon: Database,
    description: 'Historical climate metrics, precipitation records, and solar radiation feeds.',
    specs: ['NASA POWER API', 'IMD Historical Sync', 'Automated ETL'],
    color: '#10b981', // Emerald
  },
];

export function ArchitectureFlow() {
  const [activeStage, setActiveStage] = useState<string>('client');

  const currentStageData = STAGES.find((s) => s.id === activeStage) || STAGES[0];

  return (
    <div className="relative rounded-2xl glass-panel p-5 sm:p-7 border border-white/15 overflow-hidden shadow-2xl">
      {/* Background Accent Conduits Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
              Interactive System Architecture
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            AI Climate Twin India • End-to-End Pipeline
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Active Pipeline</span>
        </div>
      </div>

      {/* 4 Pipeline Stages (Interactive Nodes & Glowing Connectors) */}
      <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;

          return (
            <div key={stage.id} className="relative flex flex-col">
              <button
                type="button"
                onClick={() => setActiveStage(stage.id)}
                className={`relative w-full text-left p-4 rounded-xl border transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'bg-graphite-900/95 border-accent shadow-[0_0_30px_rgba(99,102,241,0.25)] scale-[1.02]'
                    : 'bg-graphite-950/60 border-white/10 hover:border-white/25 hover:bg-graphite-900/60'
                }`}
              >
                {/* Node Status Indicator */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    STAGE {stage.number}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      backgroundColor: isActive ? stage.color : '#64748b',
                      boxShadow: isActive ? `0 0 10px ${stage.color}` : 'none',
                    }}
                  />
                </div>

                {/* Node Icon & Name */}
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors shrink-0"
                    style={{
                      backgroundColor: `${stage.color}15`,
                      borderColor: `${stage.color}40`,
                      color: stage.color,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white leading-tight">
                      {stage.name}
                    </h5>
                    <span className="text-[11px] font-mono text-indigo-300/90 block mt-0.5">
                      {stage.tech}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-1">
                  {stage.description}
                </p>
              </button>

              {/* Connecting Chevron on Desktop */}
              {index < STAGES.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-slate-600">
                  <ArrowRight className="w-4 h-4 text-accent/50" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Stage Detail HUD */}
      <motion.div
        key={currentStageData.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-2 p-4 sm:p-5 rounded-xl bg-graphite-900/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {currentStageData.name} Specifications
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentStageData.description}
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {currentStageData.specs.map((spec, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
            >
              <CheckCircle className="w-3 h-3 text-accent" />
              <span>{spec}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ArchitectureFlow;
