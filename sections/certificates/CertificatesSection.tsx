'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import CertificateViewer from '@/components/viewer/CertificateViewer';
import { certificatesData } from '@/data/certificates';
import { Certificate } from '@/types';
import { getAssetPath } from '@/lib/utils';
import { Award, ArrowUpRight, Eye, ShieldCheck, ExternalLink, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_COUNT = 6;
  const displayCertificates = showAll ? certificatesData : certificatesData.slice(0, INITIAL_COUNT);
  const remainingCount = certificatesData.length - INITIAL_COUNT;

  const prefetchPreview = (url?: string) => {
    if (!url || typeof window === 'undefined') return;
    const img = new Image();
    img.src = getAssetPath(url);
  };

  return (
    <section id="certificates" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeading
            number="05"
            label="Certificates"
            title="Verified Technical Certifications"
            description="Industry credentials, generative AI competencies, data analytics simulations, and technical course completions."
            className="mb-0 md:mb-0"
          />

          {certificatesData.length > 0 && (
            <Link href="/certificates">
              <GlassButton variant="secondary" size="md">
                <span>View Full Archive ({certificatesData.length})</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--accent)]" />
              </GlassButton>
            </Link>
          )}
        </div>

        {displayCertificates.length > 0 ? (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {displayCertificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <GlassCard
                      onClick={() => setSelectedCert(cert)}
                      onMouseEnter={() => prefetchPreview(cert.preview)}
                      className="p-6 h-full flex flex-col justify-between cursor-pointer border border-[var(--border)] bg-[var(--bg-elevated)] group shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all duration-200 ease-out"
                      tilt={true}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          {/* Icon container */}
                          <div className="w-10 h-10 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center group-hover:scale-105 transition-transform shadow-[var(--shadow-sm)]">
                            <Award className="w-5 h-5 text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors" />
                          </div>
                          <div className="flex items-center gap-2">
                            {/* Category badge */}
                            <span className="btn-outline text-[10px] font-mono px-2.5 py-0.5 rounded-full font-medium">
                              {cert.category}
                            </span>
                            <span className="text-xs font-mono text-[var(--text-faint)]">
                              {cert.date}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-faint)] font-semibold block mb-1">
                            {cert.issuer}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-[var(--text)] line-clamp-2 leading-snug">
                            {cert.name}
                          </h3>
                        </div>

                        <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                          {cert.description}
                        </p>
                      </div>

                      {/* Verify / View Actions */}
                      <div className="mt-6 pt-3.5 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCert(cert);
                          }}
                          className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent)] hover:text-[var(--accent-2)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md"
                        >
                          <Eye className="w-3.5 h-3.5 text-[var(--accent)]" />
                          <span>View Certificate</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {cert.verificationUrl && (
                            <a
                              href={cert.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[11px] text-[var(--accent)] hover:text-[var(--accent-2)] hover:underline transition-colors"
                              title="Verify on Credly / Issuer Portal"
                            >
                              <span>Verify</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {/* Credential ID badge */}
                          <span className="inline-flex items-center gap-1 text-[var(--text-muted)] text-[10px] font-medium bg-[var(--bg-subtle)] px-2 py-0.5 rounded-md border border-[var(--border)]">
                            <CheckCircle2 className="w-3 h-3 text-[var(--text-faint)]" />
                            <span>{cert.credentialId ? `#${cert.credentialId.slice(0, 6)}` : 'Verified'}</span>
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Show More / Show Less toggle */}
            {certificatesData.length > INITIAL_COUNT && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-semibold tracking-wide shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
                >
                  <span>
                    {showAll ? 'Show Less' : `Show More (${remainingCount} Remaining)`}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showAll ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            )}
          </>
        ) : (
          <GlassCard className="p-10 text-center max-w-2xl mx-auto border border-[var(--border)] bg-[var(--bg-elevated)]">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)] mb-2">
              Certifications Updating
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed font-normal">
              Official technical certifications and verified course credentials will appear here once uploaded.
            </p>
          </GlassCard>
        )}
      </div>

      {/* Full-Screen Immersive Certificate Viewer via Portal */}
      <CertificateViewer
        certificate={selectedCert}
        certificates={certificatesData}
        onClose={() => setSelectedCert(null)}
        onNavigate={(cert) => setSelectedCert(cert)}
      />
    </section>
  );
}
