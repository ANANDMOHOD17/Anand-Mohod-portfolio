import React from 'react';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Background ambient glow */}
      <div className="absolute w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <GlassCard className="p-8 sm:p-12 text-center max-w-lg border-white/10 relative z-10" tilt={false}>
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mx-auto mb-6">
          <Compass className="w-8 h-8 animate-[spin_10s_linear_infinite]" />
        </div>

        <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
          ERROR 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          This page doesn&apos;t exist.
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          The requested path could not be located or may have moved. Return to the homepage to continue exploring the portfolio.
        </p>

        <Link href="/">
          <GlassButton variant="primary" size="md">
            <ArrowLeft className="w-4 h-4" />
            <span>Back Home</span>
          </GlassButton>
        </Link>
      </GlassCard>
    </div>
  );
}
