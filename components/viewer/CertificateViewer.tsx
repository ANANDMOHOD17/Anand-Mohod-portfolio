'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '@/types';
import { X, ExternalLink, Calendar, Award, Hash, ShieldCheck, FileText, Download } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';

interface CertificateViewerProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateViewer({ certificate, onClose }: CertificateViewerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Dark Liquid Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-graphite-950/85 backdrop-blur-xl transition-all"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl glass-panel rounded-2xl border border-white/20 bg-graphite-900/95 shadow-glass-lg overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-graphite-950/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Verified Credential Document
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close certificate viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            {/* Embedded Certificate Document Preview (Image or PDF) */}
            {(certificate.image || certificate.pdfUrl) && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
                    <FileText className="w-4 h-4" />
                    <span>Certificate Document Preview</span>
                  </div>
                  <a
                    href={certificate.pdfUrl || certificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline"
                  >
                    <span>Open original document</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="relative w-full rounded-xl overflow-hidden border border-white/15 bg-graphite-950 shadow-inner flex items-center justify-center p-2 sm:p-4">
                  {certificate.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-2xl transition-transform hover:scale-[1.01]"
                    />
                  ) : certificate.pdfUrl ? (
                    <div className="w-full h-[360px] sm:h-[460px]">
                      <iframe
                        src={`${certificate.pdfUrl}#toolbar=0&navpanes=0`}
                        title={certificate.name}
                        className="w-full h-full border-0 rounded-lg"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Visual Credential Card Header */}
            <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-graphite-950 to-graphite-850 border border-white/10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
              
              <Award className="w-10 h-10 text-accent mx-auto mb-3" />
              <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-1">
                Certificate of Achievement / Completion
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {certificate.name}
              </h2>
              <p className="text-sm text-slate-300 mt-1.5 font-medium">
                Issued by {certificate.issuer}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Issue Date</span>
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  {certificate.date}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Hash className="w-3.5 h-3.5" />
                  <span>Credential ID</span>
                </div>
                <div className="text-sm font-semibold text-white mt-1 font-mono break-all">
                  {certificate.credentialId || 'Verified Record'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Award className="w-3.5 h-3.5" />
                  <span>Category</span>
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  {certificate.category}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Syllabus & Competencies Covered
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {certificate.description}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-white/10 bg-graphite-950/70 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-slate-500">
              ID: {certificate.id}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {(certificate.pdfUrl || certificate.image) && (
                <a
                  href={certificate.pdfUrl || certificate.image}
                  download
                  className="inline-block"
                >
                  <GlassButton variant="secondary" size="sm">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Certificate</span>
                  </GlassButton>
                </a>
              )}

              {certificate.verificationUrl && (
                <GlassButton
                  variant="primary"
                  size="sm"
                  asLink
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </GlassButton>
              )}

              <GlassButton variant="secondary" size="sm" onClick={onClose}>
                <span>Close</span>
              </GlassButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
