import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  number: string;
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  number,
  label,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl',
        className
      )}
    >
      {/* Section index and label */}
      <div
        className={cn(
          'inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono tracking-wider text-accent border border-accent/20 bg-accent/5 mb-4',
          align === 'center' && 'justify-center'
        )}
      >
        <span className="text-accent/60">{number}</span>
        <span>//</span>
        <span className="uppercase">{label}</span>
      </div>

      {/* Main Section Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>

      {/* Optional Editorial Subtitle */}
      {description && (
        <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
