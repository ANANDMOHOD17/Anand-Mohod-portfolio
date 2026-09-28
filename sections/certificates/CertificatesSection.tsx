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
import { Award, ArrowUpRight, Eye, ShieldCheck, ExternalLink, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Initial view shows first 6; toggle reveals all 9
  const INITIAL_COUNT = 6;
  const displayCertificates = showAll ? certificatesData : certificatesData.slice(0, INITIAL_COUNT);
  const remainingCount = certificatesData.length - INITIAL_COUNT;

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
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </GlassButton>
            </Link>
          )}
        </div>

        {/* Certificates Grid with Subtle Card Depth */}
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
                      className="p-6 h-full flex flex-col justify-between hover:border-accent/40 transition-all border-slate-200 dark:border-white/10 bg-white/80 dark:bg-graphite-900/80 group shadow-glass-sm hover:shadow-[0_15px_35px_rgba(99,102,241,0.12)]"
                      tilt={true}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shadow-sm">
                            <Award className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                              {cert.category}
                            </span>
                            <span className="text-xs font-mono text-slate-500">
                              {cert.date}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold block mb-1">
                            {cert.issuer}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                            {cert.name}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {cert.description}
                        </p>
                      </div>

                      {/* Verify / View Actions */}
                      <div className="mt-6 pt-3.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline focus:outline-none"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {cert.verificationUrl && (
                            <a
                              href={cert.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-accent transition-colors"
                              title="Verify on Credly / Issuer Portal"
                            >
                              <span>Verify</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{cert.credentialId ? `#${cert.credentialId.slice(0, 6)}` : 'Verified'}</span>
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* "Show More" / "Show Less" Toggle Button */}
            {certificatesData.length > INITIAL_COUNT && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent font-mono text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow"
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
          <GlassCard className="p-10 text-center max-w-2xl mx-auto border-slate-200 dark:border-white/10 bg-white dark:bg-graphite-900/60">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Certifications Updating
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-normal">
              Official technical certifications and verified course credentials will appear here once uploaded.
            </p>
          </GlassCard>
        )}
      </div>

      {/* Full-Screen Liquid Glass Certificate Viewer */}
      <CertificateViewer
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
