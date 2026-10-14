'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
} from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { cn, getAssetPath } from '@/lib/utils';

// ============================================================================
// 📁 PROJECT DATA SCHEMA & REPOSITORY
// ----------------------------------------------------------------------------
// To add, edit, or remove projects, simply modify this array.
// The carousel counter ("X / Y"), active centering, badges, and controls
// automatically reflect the contents of this array.
// ============================================================================
export interface PortfolioProject {
  index: string;
  badge: string;
  year: string;
  event: string;
  status: string;
  code?: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  role: string;
  image?: string;
  caseStudyUrl: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
}

export const selectedProjectsData: PortfolioProject[] = [
  {
    index: '01',
    badge: 'AI / ML · CLIMATE TECH',
    year: '2026',
    event: 'Geospatial Climate Platform',
    status: 'Deployed Prototype',
    code: 'ACTI-26',
    title: 'AI Climate Twin India',
    subtitle: 'Climate Risk Prediction Platform',
    description:
      'Full-stack climate risk prediction platform forecasting rainfall, heatwave, and flood risks across India using deep learning on IMD, NASA POWER, ERA5, and ISRO datasets with asynchronous FastAPI APIs and interactive Mapbox layers.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'React.js', 'Mapbox', 'ERA5', 'ISRO Datasets'],
    role: 'Lead ML & Full-Stack Engineer — Sourced satellite and meteorological datasets, trained TensorFlow prediction models, built backend APIs, and developed Mapbox geospatial visual layers.',
    image: '/images/projects/ai-climate-twin-india.webp',
    caseStudyUrl: '/projects/ai-climate-twin-india',
    liveUrl: null,
    githubUrl: null,
  },
  {
    index: '02',
    badge: 'SMART INDIA HACKATHON · SOFTWARE',
    year: '2026',
    event: 'Smart India Hackathon (SIH 2026)',
    status: 'Hackathon Prototype',
    code: 'SIH26229',
    title: 'Kabadiwala Connect',
    subtitle: 'Formal–Informal Recycling Marketplace',
    description:
      'Digital platform formalizing the recycling supply chain between households, local waste collectors, and authorized recycling facilities through transparent pickup pricing, digital payment workflows, and material traceability.',
    tags: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'SQL', 'REST APIs'],
    role: 'System Architect & Team Lead — Formulated marketplace workflow, prepared 6-slide solution pitch deck for SIH evaluation, and designed digital pickup scheduling architecture.',
    image: '/images/projects/kabadiwala-connect.webp',
    caseStudyUrl: '/projects/kabadiwala-connect',
    liveUrl: null,
    githubUrl: null,
  },
  {
    index: '03',
    badge: 'AGRITECH · DIGITAL ADVISORY',
    year: '2026',
    event: 'Agriculture Technology Platform',
    status: 'Completed',
    code: 'KSC-26',
    title: 'KrushiScan',
    subtitle: 'Smart Agriculture Guidance & Advisory Platform',
    description:
      'Domain-focused agricultural digital platform delivering localized crop advisories, mandi market price intelligence, urgent weather notifications, and farming best practices through an accessible user-friendly interface.',
    tags: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'REST APIs', 'CSS3'],
    role: 'Full-Stack Developer — Built accessible mobile-first interfaces, structured agricultural information architecture, and implemented real-time advisory alert feeds.',
    image: '/images/projects/krushiscan.webp',
    caseStudyUrl: '/projects/krushiscan',
    liveUrl: null,
    githubUrl: null,
  },
  {
    index: '04',
    badge: 'WEB PLATFORM · REAL ESTATE',
    year: '2026',
    event: 'Rental Discovery Engine',
    status: 'Completed',
    code: 'RTG-26',
    title: 'Rentogo',
    subtitle: 'Rental Property & Room Discovery Platform',
    description:
      'Marketplace-style rental discovery platform simplifying how tenants explore verified homes and rooms through structured property specifications, multi-parameter filtering, and responsive detail views.',
    tags: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'HTML5', 'CSS3'],
    role: 'Frontend & UI Developer — Engineered responsive listing views, property detail presentation, and reusable modular UI components for rental discovery.',
    image: '/images/projects/rentogo.webp',
    caseStudyUrl: '/projects/rentogo',
    liveUrl: null,
    githubUrl: null,
  },
  {
    index: '05',
    badge: 'DATABASE · ENTERPRISE SOFTWARE',
    year: '2026',
    event: 'Retail Management Software',
    status: 'Completed',
    code: 'SMS-26',
    title: 'Smart Store Management System',
    subtitle: 'Inventory Control & Customer Billing Suite',
    description:
      'Database-driven management application providing real-time store inventory tracking, automated replenishment alerts, customer records, and structured transactional SQL operations solving retail administration needs.',
    tags: ['SQL', 'Node.js', 'JavaScript', 'HTML5', 'CSS3'],
    role: 'Database & Backend Developer — Designed normalized relational schema, programmed transactional CRUD operations, and optimized store data retrieval.',
    image: '/images/projects/smart-store-management.webp',
    caseStudyUrl: '/projects/smart-store-management',
    liveUrl: null,
    githubUrl: null,
  },
  {
    index: '06',
    badge: 'WEB APPLICATION · DATABASE',
    year: '2025',
    event: 'Campus Governance System',
    status: 'Completed',
    code: 'VP-25',
    title: 'Voting Portal',
    subtitle: 'Secure Digital Student Voting & Results Engine',
    description:
      'Web-based voting application built to digitize and audit student elections with strict role-based user/admin access control, tamper-resistant ballot logging, and instant result tabulation.',
    tags: ['Node.js', 'Express.js', 'SQL', 'JavaScript', 'HTML5', 'CSS3'],
    role: 'Full-Stack Developer — Built student voting workflow, administrative election dashboard, and relational database operations for secure vote records.',
    image: '/images/projects/voting-portal.webp',
    caseStudyUrl: '/projects/voting-portal',
    liveUrl: null,
    githubUrl: null,
  },
];

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidePadding, setSidePadding] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Drag-to-scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const totalProjects = selectedProjectsData.length;

  // IntersectionObserver to handle smooth fade-up on scroll into view (pre-reveal)
  useEffect(() => {
    const handleReveal = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail?.id || detail.id === 'projects') {
        setIsVisible(true);
      }
    };

    if (sectionRef.current?.classList.contains('is-visible')) {
      setIsVisible(true);
    }
    window.addEventListener('reveal-section', handleReveal);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('reveal-section', handleReveal);
    };
  }, []);

  // Compute horizontal side padding to center active card on all screen widths
  const updatePadding = useCallback(() => {
    if (!carouselRef.current) return;
    const containerWidth = carouselRef.current.clientWidth;
    const sampleCard = cardRefs.current[0];
    if (sampleCard) {
      const cardWidth = sampleCard.clientWidth;
      const padding = Math.max(16, (containerWidth - cardWidth) / 2);
      setSidePadding(padding);
    }
  }, []);

  useEffect(() => {
    updatePadding();
    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updatePadding, 100);
    };
    window.addEventListener('resize', debouncedResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [updatePadding]);

  // Smooth scroll to a target card
  const scrollToIndex = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(totalProjects - 1, index));
    const container = carouselRef.current;
    const targetCard = cardRefs.current[clampedIndex];
    if (!container || !targetCard) return;

    const containerWidth = container.clientWidth;
    const cardLeft = targetCard.offsetLeft;
    const cardWidth = targetCard.offsetWidth;
    const targetScrollLeft = cardLeft - (containerWidth - cardWidth) / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth',
    });
    setCurrentIndex(clampedIndex);
  }, [totalProjects]);

  // Listen for scroll events to update counter & active card index
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      cancelAnimationFrame(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = requestAnimationFrame(() => {
      const container = carouselRef.current;
      if (!container) return;

      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      if (closestIndex !== currentIndex) {
        setCurrentIndex(closestIndex);
      }
    });
  }, [currentIndex]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Respond when user has focused within the section or active document
      if (
        sectionRef.current &&
        (sectionRef.current.contains(document.activeElement) ||
          document.activeElement === document.body)
      ) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          scrollToIndex(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          scrollToIndex(currentIndex + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, scrollToIndex]);

  // Mouse Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = carouselRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const container = carouselRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[var(--bg)] text-[var(--text)] overflow-hidden selection:bg-[var(--accent)]/30 selection:text-[var(--accent-contrast)]"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent-2)]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-[var(--accent)]/5 blur-[120px] pointer-events-none rounded-full" />

      {/* SECTION HEADER CONTAINER */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Left: Monospace Label & 3-line Headline */}
          <div className="space-y-3">
            <div className="font-mono text-xs sm:text-sm tracking-[0.24em] uppercase text-[var(--text-faint)] flex items-center gap-2">
              <span className="font-bold text-[var(--text)]">04</span>
              <span className="text-[var(--text-faint)]">/</span>
              <span>SELECTED WORK</span>
            </div>

            <h2
              className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.92] uppercase"
              style={{ fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              <span className="block overflow-hidden">
                <span
                  className={cn(
                    'projects-heading__line projects-heading__line-1 inline-block',
                    (isVisible || prefersReducedMotion) && 'projects-heading__line--active'
                  )}
                >
                  IDEAS
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={cn(
                    'projects-heading__line projects-heading__line-2 inline-block',
                    (isVisible || prefersReducedMotion) && 'projects-heading__line--active'
                  )}
                >
                  INTO
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={cn(
                    'projects-heading__line projects-heading__line-3 inline-block',
                    (isVisible || prefersReducedMotion) && 'projects-heading__line--active'
                  )}
                >
                  REALITY.
                </span>
              </span>
            </h2>
          </div>

          {/* Right: Circular Navigation Buttons & Counter */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end pb-2">
            <button
              type="button"
              onClick={() => scrollToIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Previous project"
              className="btn-outline w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[var(--shadow-sm)]"
            >
              <ChevronLeft className="w-5 h-5 text-current" />
            </button>

            {/* Counter: "2 / 7" style */}
            <div className="font-mono text-sm sm:text-base tracking-widest text-[var(--text-faint)] min-w-[4rem] text-center select-none">
              <span className="font-bold text-[var(--text)] text-base sm:text-lg">{currentIndex + 1}</span>
              <span className="text-[var(--text-faint)] mx-1.5">/</span>
              <span>{totalProjects}</span>
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(currentIndex + 1)}
              disabled={currentIndex === totalProjects - 1}
              aria-label="Next project"
              className="btn-outline w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[var(--shadow-sm)]"
            >
              <ChevronRight className="w-5 h-5 text-current" />
            </button>
          </div>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL CONTAINER */}
      <div
        className={`w-full transition-all duration-700 delay-150 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div
          ref={carouselRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected Projects Carousel"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="flex items-center gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 select-none cursor-grab active:cursor-grabbing outline-none no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            paddingLeft: sidePadding > 0 ? `${sidePadding}px` : 'calc(50vw - min(480px, 45vw))',
            paddingRight: sidePadding > 0 ? `${sidePadding}px` : 'calc(50vw - min(480px, 45vw))',
          }}
        >
          {selectedProjectsData.map((project, idx) => {
            const isActive = idx === currentIndex;
            const cardTotalStr = totalProjects < 10 ? `0${totalProjects}` : `${totalProjects}`;
            const cardIndexStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <div
                key={project.title + project.year}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`Project ${idx + 1} of ${totalProjects}: ${project.title}`}
                onClick={() => {
                  if (!hasDraggedRef.current && !isActive) {
                    scrollToIndex(idx);
                  }
                }}
                className={`relative shrink-0 snap-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none motion-reduce:transform-none ${
                  isActive
                    ? 'scale-100 opacity-100 z-10'
                    : 'scale-[0.92] md:scale-[0.94] opacity-80 md:opacity-85 hover:opacity-95 z-0 cursor-pointer'
                } w-[88vw] sm:w-[82vw] md:w-[860px] lg:w-[940px] xl:w-[980px]`}
              >
                {/* CARD CONTAINER */}
                <div className="group/card relative rounded-3xl border border-[var(--border)] hover:border-[var(--accent)]/40 bg-[var(--bg-elevated)] shadow-[var(--shadow-md)] overflow-hidden transition-all duration-500">
                  <div className="flex flex-col lg:flex-row min-h-[520px]">
                    {/* ========================================================= */}
                    {/* LEFT PANEL (Visual — 42%) */}
                    {/* ========================================================= */}
                    <div className="w-full lg:w-[42%] flex flex-col justify-between p-6 sm:p-7 md:p-8 bg-[var(--bg-subtle)] relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[var(--border)]">
                      {/* Subtle ambient gradient mesh & glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,var(--accent-soft),transparent_65%)] pointer-events-none" />
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

                      {/* Top Header inside Visual Panel */}
                      <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
                        <span className="font-mono text-[11px] text-[var(--text-faint)] tracking-wider font-medium">
                          {cardIndexStr} / {cardTotalStr}
                        </span>

                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent-soft)] backdrop-blur-md">
                          {project.badge}
                        </span>
                      </div>

                      {/* Center Mock UI Illustration / Glass-morphism Frame */}
                      <div className="relative z-10 my-auto py-2 group/frame">
                        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/11] rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)] backdrop-blur-xl transition-transform duration-500 ease-out group-hover/card:scale-[1.02]">
                          {/* Mock Browser/Device Header */}
                          <div className="h-6 w-full bg-[var(--bg-subtle)] border-b border-[var(--border)] px-3 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                            </div>
                            <div className="h-3.5 px-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-[9px] font-mono text-[var(--text-faint)]">
                              {project.code ? project.code : 'portfolio.preview'}
                            </div>
                            <Layers className="w-3 h-3 text-[var(--text-faint)]" />
                          </div>

                          {/* Screenshot with glassmorphism overlays */}
                          <div className="relative w-full h-[calc(100%-24px)] overflow-hidden bg-[var(--bg-subtle)]">
                            {project.image ? (
                              <Image
                                src={getAssetPath(project.image)}
                                alt={`Mock interface preview for ${project.title}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-105"
                                priority={idx === 0}
                              />
                            ) : (
                              /* Stylized SVG Mock UI Illustration if no image */
                              <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center bg-[var(--bg-subtle)]">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] border border-[var(--border)] flex items-center justify-center mb-3 text-[var(--accent)]">
                                  <Layers className="w-6 h-6 text-[var(--accent)]" />
                                </div>
                                <div className="w-3/4 h-2 bg-[var(--border)] rounded-full mb-2" />
                                <div className="w-1/2 h-2 bg-[var(--accent-soft)] rounded-full" />
                              </div>
                            )}

                            {/* Stylized Glass Telemetry Chip Overlay */}
                            <div className="absolute top-2.5 right-2.5 rounded-md bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border)] px-2 py-0.5 text-[9px] font-mono text-[var(--accent)] flex items-center gap-1.5 shadow-[var(--shadow-sm)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                              <span>Live Engine</span>
                            </div>

                            {/* Soft bottom vignette overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/30 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom-left: Title & small muted subtitle */}
                      <div className="relative z-10 pt-4 mt-auto">
                        <h4 className="text-lg sm:text-xl font-bold text-[var(--text)] leading-tight line-clamp-2">
                          {project.title}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1 font-mono">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* RIGHT PANEL (Content — 58%) */}
                    {/* ========================================================= */}
                    <div className="w-full lg:w-[58%] flex flex-col justify-between p-6 sm:p-8 md:p-10 bg-[var(--bg-elevated)]">
                      <div className="space-y-4">
                        {/* Meta row: bold year · event/type · status · code */}
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                          <span className="font-bold text-[var(--text)] text-xs">{project.year}</span>
                          <span className="text-[var(--border-strong)]">·</span>
                          <span className="uppercase tracking-wider">{project.event}</span>
                          <span className="text-[var(--border-strong)]">·</span>
                          <span className="text-[var(--success)] font-medium inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                            {project.status}
                          </span>
                          {project.code && (
                            <>
                              <span className="text-[var(--border-strong)]">·</span>
                              <span className="text-[var(--accent)] font-semibold">{project.code}</span>
                            </>
                          )}
                        </div>

                        {/* Large bold project title */}
                        <div>
                          <h3
                            className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--text)] tracking-tight leading-tight"
                            style={{ fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                          >
                            {project.title}
                          </h3>

                          {/* One-line subtitle (medium weight, light grey) */}
                          <p className="text-sm sm:text-[15px] font-medium text-[var(--text-muted)] leading-snug line-clamp-1 mt-1.5">
                            {project.subtitle}
                          </p>
                        </div>

                        {/* 2–3 line description in muted grey, comfortable line-height */}
                        <p className="text-sm sm:text-[15px] text-[var(--text-muted)] leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tech / keyword pills */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="btn-outline rounded-full px-3 py-1 text-xs font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Role description */}
                        <div className="text-xs sm:text-sm leading-relaxed border-t border-[var(--border)] pt-4">
                          <span className="font-semibold text-[var(--text)]">Role: </span>
                          <span className="text-[var(--text-muted)]">{project.role}</span>
                        </div>
                      </div>

                      {/* Action buttons row */}
                      <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-3">
                        {/* Primary Button: View case study */}
                        <Link
                          href={project.caseStudyUrl}
                          className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] shadow-[var(--shadow-sm)] dark:shadow-[0_4px_20px_rgba(91,75,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] dark:hover:shadow-[0_6px_28px_rgba(91,75,255,0.45)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
                        >
                          <span>View case study</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>

                        {/* Secondary Button: Live Demo (if available) */}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-mono"
                            aria-label={`Open live demo of ${project.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}

                        {/* Secondary Button: GitHub (if available) */}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-mono"
                            aria-label={`View GitHub repository of ${project.title}`}
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle bottom archive exploration link */}
      <div className="mt-10 sm:mt-12 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors py-2 px-5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg-elevated)] hover:bg-[var(--accent-soft)] shadow-[var(--shadow-sm)]"
        >
          <span>Browse All Projects Archive ({totalProjects})</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
        </Link>
      </div>
    </section>
  );
}
