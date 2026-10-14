'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '@/types';
import {
  X,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
  AlertCircle,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

interface CertificateViewerProps {
  certificate: Certificate | null;
  certificates?: Certificate[];
  onClose: () => void;
  onNavigate?: (certificate: Certificate) => void;
}

export default function CertificateViewer({
  certificate,
  certificates = [],
  onClose,
  onNavigate,
}: CertificateViewerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigation indices
  const list = useMemo(
    () => (certificates.length > 0 ? certificates : certificate ? [certificate] : []),
    [certificates, certificate]
  );
  const currentIndex = certificate ? list.findIndex((c) => c.id === certificate.id) : -1;
  const currentCert = currentIndex >= 0 ? list[currentIndex] : certificate;

  // Image loading / fallback states
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [usingPdfFallback, setUsingPdfFallback] = useState(false);
  const [isRenderingPdf, setIsRenderingPdf] = useState(false);
  const [copiedDownload, setCopiedDownload] = useState(false);

  // Zoom and Pan states
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // DOM Refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ y: number; time: number } | null>(null);

  // Prefetch helper
  const prefetch = useCallback((url?: string) => {
    if (!url || typeof window === 'undefined') return;
    const img = new Image();
    img.src = getAssetPath(url);
  }, []);

  // Reset image / zoom states when current certificate changes
  useEffect(() => {
    setImageLoaded(false);
    setHasError(false);
    setUsingPdfFallback(false);
    setIsRenderingPdf(false);
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });

    if (currentCert && list.length > 1) {
      const nextIndex = (currentIndex + 1) % list.length;
      const prevIndex = (currentIndex - 1 + list.length) % list.length;
      prefetch(list[nextIndex]?.preview);
      prefetch(list[prevIndex]?.preview);
    }
  }, [currentCert, currentIndex, list, prefetch]);

  // Lock body scroll, pause Lenis, and disable site navbar interaction while modal is open
  useEffect(() => {
    if (!currentCert) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // 1. Notify Lenis smooth scroll to pause
    window.dispatchEvent(new CustomEvent('programmatic-scroll-start'));

    // 2. Lock body scroll with scrollbar compensation
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 3. Disable pointer events on site header while modal is open
    const siteHeader = document.querySelector('header');
    if (siteHeader) {
      siteHeader.style.pointerEvents = 'none';
    }

    // 4. Initial focus on close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      if (siteHeader) {
        siteHeader.style.pointerEvents = '';
      }
      // Resume Lenis smooth scroll
      window.dispatchEvent(new CustomEvent('scrollend'));

      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [currentCert]);

  // Handle PDF.js Canvas Fallback dynamically if preview fails or doesn't exist
  useEffect(() => {
    if (!currentCert || !usingPdfFallback || !currentCert.pdfUrl || typeof window === 'undefined') return;

    let isMounted = true;
    setIsRenderingPdf(true);

    const renderPdfCanvas = async () => {
      try {
        let pdfjs = (window as unknown as { pdfjsLib?: any }).pdfjsLib;
        if (!pdfjs) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load PDF.js'));
            document.head.appendChild(script);
          });
          pdfjs = (window as unknown as { pdfjsLib?: any }).pdfjsLib;
        }

        if (!pdfjs) throw new Error('PDF.js library unavailable');
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const loadingTask = pdfjs.getDocument(getAssetPath(currentCert.pdfUrl!));
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const viewportUnscaled = page.getViewport({ scale: 1 });
        const targetWidth = Math.min(window.innerWidth * 0.9, 1200);
        const scale = targetWidth / viewportUnscaled.width;
        const viewport = page.getViewport({ scale });

        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(viewport.width * dpr);
        canvas.height = Math.round(viewport.height * dpr);
        canvas.style.width = `${Math.round(viewport.width)}px`;
        canvas.style.height = `${Math.round(viewport.height)}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;

        if (isMounted) {
          setIsRenderingPdf(false);
          setImageLoaded(true);
        }
      } catch (err) {
        console.error('Failed to render PDF to canvas fallback:', err);
        if (isMounted) {
          setIsRenderingPdf(false);
          setHasError(true);
        }
      }
    };

    renderPdfCanvas();

    return () => {
      isMounted = false;
    };
  }, [currentCert, usingPdfFallback]);

  // Navigate next / prev
  const handlePrev = useCallback(() => {
    if (list.length <= 1 || !onNavigate) return;
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    onNavigate(list[prevIndex]);
  }, [currentIndex, list, onNavigate]);

  const handleNext = useCallback(() => {
    if (list.length <= 1 || !onNavigate) return;
    const nextIndex = (currentIndex + 1) % list.length;
    onNavigate(list[nextIndex]);
  }, [currentIndex, list, onNavigate]);

  // Keyboard Navigation & Focus Trap
  useEffect(() => {
    if (!currentCert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        handleNext();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [currentCert, handleNext, handlePrev, onClose]);

  // Zoom toggle
  const toggleZoom = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setPan({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
    }
  };

  // Mouse pan drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setPan({
      x: dragStartRef.current.panX + deltaX,
      y: dragStartRef.current.panY + deltaY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile Swipe Down to Close
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && !isZoomed) {
      touchStartRef.current = {
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || isZoomed) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartRef.current.y;
    const timeDelta = Date.now() - touchStartRef.current.time;

    // Trigger close on downward swipe (> 75px in under 400ms)
    if (deltaY > 75 && timeDelta < 400) {
      onClose();
    }
    touchStartRef.current = null;
  };

  if (!mounted || !currentCert) return null;

  const previewSource = currentCert.preview
    ? getAssetPath(currentCert.preview)
    : currentCert.image
    ? getAssetPath(currentCert.image)
    : '';
  const pdfSource = currentCert.pdfUrl
    ? getAssetPath(currentCert.pdfUrl)
    : currentCert.preview
    ? getAssetPath(currentCert.preview)
    : '';

  const modalContent = (
    <AnimatePresence>
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-dialog-title"
        aria-describedby="cert-dialog-subtitle"
        className="fixed inset-0 select-none overflow-hidden flex flex-col justify-between"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 99999,
          overscrollBehavior: 'contain',
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Full-Screen Immersive Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDragging) {
              e.stopPropagation();
              onClose();
            }
          }}
          className="absolute inset-0 bg-[#05060a]/96 dark:bg-[#05060a]/96 backdrop-blur-xl"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            opacity: 0.96,
          }}
        />

        {/* Top Loading Progress Bar */}
        {(!imageLoaded || isRenderingPdf) && !hasError && (
          <div className="absolute top-0 left-0 right-0 h-1 z-30 overflow-hidden bg-[var(--border)]">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="h-full w-1/3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
            />
          </div>
        )}

        {/* 1. SLIM TOP BAR (Sticky flex item, ~60-64px, safe-area aware) */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="relative z-20 w-full flex-shrink-0 min-h-[58px] sm:min-h-[64px] border-b border-[var(--border)] bg-[var(--bg-elevated)]/90 backdrop-blur-md flex items-center justify-between gap-3 sm:gap-4"
          style={{
            paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))',
            paddingRight: 'max(1rem, env(safe-area-inset-right, 1rem))',
            paddingBottom: '0.75rem',
            paddingLeft: 'max(1rem, env(safe-area-inset-left, 1rem))',
          }}
        >
          {/* LEFT: Title & Mono Subtitle */}
          <div className="flex-1 min-w-0 pr-1">
            <h2
              id="cert-dialog-title"
              className="text-xs sm:text-sm md:text-base font-semibold text-[var(--text)] tracking-tight truncate leading-tight"
              title={currentCert.name}
            >
              {currentCert.name}
            </h2>
            <p
              id="cert-dialog-subtitle"
              className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] truncate mt-0.5"
            >
              <span className="font-medium text-[var(--accent)]">{currentCert.issuer}</span>
              <span className="mx-1 sm:mx-1.5 opacity-40">·</span>
              <span>ID: {currentCert.credentialId || currentCert.id}</span>
              <span className="mx-1 sm:mx-1.5 opacity-40 hidden xs:inline">·</span>
              <span className="hidden xs:inline">Issued {currentCert.date}</span>
            </p>
          </div>

          {/* RIGHT: Actions ([VERIFY ↗], [DOWNLOAD PDF], [✕]) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* Zoom Toggle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              className="btn-outline hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
              aria-label={isZoomed ? 'Reset zoom to 1x' : 'Zoom in 1.6x'}
              title={isZoomed ? 'Reset zoom (1x)' : 'Zoom in (1.6x)'}
            >
              {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              <span>{isZoomed ? '1.0x' : '1.6x'}</span>
            </button>

            {/* Verify Button (if verification URL exists) */}
            {currentCert.verificationUrl && (
              <a
                href={currentCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)] hover:bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-mono font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] min-h-[36px]"
                title="Verify authentic credential at issuer portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 hidden xs:inline" />
                <span>Verify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Download PDF Button */}
            {pdfSource && (
              <a
                href={pdfSource}
                download
                onClick={(e) => {
                  e.stopPropagation();
                  setCopiedDownload(true);
                  setTimeout(() => setCopiedDownload(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-[var(--accent-contrast)] hover:opacity-95 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 min-h-[36px]"
                title="Download original certificate document"
              >
                {copiedDownload ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">
                  {copiedDownload ? 'Downloading...' : 'Download PDF'}
                </span>
                <span className="sm:hidden">PDF</span>
              </a>
            )}

            {/* Round 36px Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="btn-outline w-9 h-9 min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center shadow-sm"
              aria-label="Close certificate viewer (Esc)"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.header>

        {/* 2. CENTER STAGE (Document Canvas / Preview) */}
        <div
          className="relative flex-1 min-h-0 w-full flex items-center justify-center overflow-auto"
          style={{
            paddingTop: '1rem',
            paddingRight: 'max(1rem, env(safe-area-inset-right, 1rem))',
            paddingBottom: '0.75rem',
            paddingLeft: 'max(1rem, env(safe-area-inset-left, 1rem))',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDragging) {
              e.stopPropagation();
              onClose();
            }
          }}
        >
          {/* Framed Certificate Document Wrapper */}
          <motion.div
            key={currentCert.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{
              opacity: 1,
              scale: isZoomed ? 1.6 : 1,
              y: isZoomed ? pan.y : 0,
              x: isZoomed ? pan.x : 0,
            }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 320,
              mass: 0.9,
            }}
            onMouseDown={handleMouseDown}
            onClick={(e) => {
              e.stopPropagation();
              if (!isDragging) {
                toggleZoom();
              }
            }}
            className={`relative max-w-full max-h-full flex items-center justify-center rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-md)] overflow-hidden transition-shadow ${
              isZoomed
                ? isDragging
                  ? 'cursor-grabbing'
                  : 'cursor-grab'
                : 'cursor-zoom-in'
            }`}
            style={{
              touchAction: isZoomed ? 'none' : 'pan-y',
            }}
          >
            {/* Aspect Ratio Skeleton Shimmer while loading */}
            {(!imageLoaded || isRenderingPdf) && !hasError && (
              <div
                className="w-full flex items-center justify-center bg-[var(--bg-subtle)] animate-pulse"
                style={{
                  width: 'min(90vw, 1050px)',
                  height: 'calc(min(90vw, 1050px) / 1.35)',
                  maxHeight: 'calc(100dvh - 160px)',
                }}
              >
                <div className="flex flex-col items-center gap-3 text-[var(--text-faint)]">
                  <FileText className="w-10 h-10 animate-bounce opacity-40 text-[var(--accent)]" />
                  <span className="text-xs font-mono uppercase tracking-wider">
                    {isRenderingPdf ? 'Rendering PDF Page...' : 'Loading Certificate...'}
                  </span>
                </div>
              </div>
            )}

            {/* Primary High-Resolution Pre-rendered Preview Image */}
            {previewSource && !usingPdfFallback && !hasError && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewSource}
                alt={currentCert.name}
                loading="eager"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  if (currentCert.pdfUrl) {
                    setUsingPdfFallback(true);
                  } else {
                    setHasError(true);
                  }
                }}
                className={`max-w-full max-h-[calc(100dvh-150px)] object-contain rounded-xl sm:rounded-2xl transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
                draggable={false}
              />
            )}

            {/* Fallback 1: Dynamic Hi-DPI PDF.js Canvas */}
            {usingPdfFallback && !hasError && (
              <canvas
                ref={canvasRef}
                className={`max-w-full max-h-[calc(100dvh-150px)] object-contain rounded-xl sm:rounded-2xl transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}

            {/* Fallback 2: Clean Error State with Direct PDF Link */}
            {hasError && (
              <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-4">
                <AlertCircle className="w-12 h-12 text-[var(--text-faint)] mx-auto opacity-60" />
                <h3 className="text-base font-semibold text-[var(--text)]">
                  Preview Unavailable
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  The pre-rendered preview could not be loaded in your browser session. You can open or download the original credential document directly.
                </p>
                {pdfSource && (
                  <div className="pt-2">
                    <a
                      href={pdfSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)] text-xs font-mono font-medium hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Open Original Document</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Floating Left Arrow (Desktop & Tablet) */}
          {list.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="btn-outline hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center shadow-lg backdrop-blur-md"
              aria-label="Previous certificate (ArrowLeft)"
              title="Previous certificate (←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Floating Right Arrow (Desktop & Tablet) */}
          {list.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="btn-outline hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center shadow-lg backdrop-blur-md"
              aria-label="Next certificate (ArrowRight)"
              title="Next certificate (→)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 3. SLIM BOTTOM FOOTER BAR (Pagination & Mobile Controls) */}
        {list.length > 1 && (
          <motion.footer
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="relative z-20 w-full flex-shrink-0 flex items-center justify-center gap-3 border-t border-[var(--border)] bg-[var(--bg-elevated)]/80 backdrop-blur-md"
            style={{
              paddingTop: '0.5rem',
              paddingRight: 'max(1rem, env(safe-area-inset-right, 1rem))',
              paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom, 0.625rem))',
              paddingLeft: 'max(1rem, env(safe-area-inset-left, 1rem))',
            }}
          >
            {/* Mobile Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="btn-outline md:hidden p-2 rounded-full min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Counter Pill "03 / 09" */}
            <div className="px-3.5 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/90 backdrop-blur-md text-[var(--text-muted)] font-mono text-xs shadow-sm flex items-center gap-2">
              <span className="font-semibold text-[var(--accent)]">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="opacity-40">/</span>
              <span>{String(list.length).padStart(2, '0')}</span>
            </div>

            {/* Mobile Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="btn-outline md:hidden p-2 rounded-full min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Next certificate"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.footer>
        )}
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
