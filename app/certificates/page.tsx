'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import CertificateViewer from '@/components/viewer/CertificateViewer';
import { certificatesData } from '@/data/certificates';
import { Certificate } from '@/types';
import { getAssetPath } from '@/lib/utils';
import { ArrowLeft, Award, Eye, ShieldCheck, ExternalLink } from 'lucide-react';

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(certificatesData.map((c) => c.category)))];

  const filteredCerts = activeCategory === 'All'
    ? certificatesData
    : certificatesData.filter((c) => c.category === activeCategory);

  const prefetchPreview = (url?: string) => {
    if (!url || typeof window === 'undefined') return;
    const img = new Image();
    img.src = getAssetPath(url);
  };

  return (
    <div className="pt-32 pb-24 md:py-36 min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/#certificates"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <SectionHeading
          number="ARCHIVE"
          label="CERTIFICATIONS"
          title="Verified Technical Credentials"
          description="A complete directory of verified certifications covering software engineering, algorithms, database systems, and modern web frameworks."
        />

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`btn-outline px-4 py-2 rounded-xl text-xs tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  activeCategory === cat
                    ? 'btn-outline-active font-semibold shadow-[var(--shadow-sm)]'
                    : 'font-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Certificates Grid */}
        {filteredCerts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredCerts.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassCard
                    className="p-6 h-full flex flex-col justify-between hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer group border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
                    onClick={() => setSelectedCert(cert)}
                    onMouseEnter={() => prefetchPreview(cert.preview)}
                    tilt={true}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        {/* Icon */}
                        <div className="w-9 h-9 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Award className="w-5 h-5 text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors" />
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Category badge */}
                          <span className="btn-outline text-[10px] font-mono px-2 py-0.5 rounded-full font-medium">
                            {cert.category}
                          </span>
                          <span className="text-xs font-mono text-[var(--text-faint)]">
                            {cert.date}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-faint)] block mb-1">
                          {cert.issuer}
                        </span>
                        <h3 className="text-lg font-bold text-[var(--text)] line-clamp-2 leading-snug">
                          {cert.name}
                        </h3>
                      </div>

                      <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--accent)]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(cert);
                        }}
                        className="flex items-center gap-1.5 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                      {cert.verificationUrl ? (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--text-muted)] hover:text-[var(--accent)] flex items-center gap-1 text-[11px] transition-colors"
                        >
                          Verify <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[var(--text-faint)] text-[10px]">
                          {cert.credentialId ? `#${cert.credentialId.slice(0, 8)}...` : 'Verified'}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <GlassCard className="p-12 text-center max-w-2xl mx-auto border border-[var(--border)] bg-[var(--bg-elevated)]">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)] mb-2">
              No Certificates Listed
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed font-normal">
              Technical credentials and verified certifications will be displayed here once added.
            </p>
          </GlassCard>
        )}
      </div>

      {/* Full-Screen Immersive Certificate Viewer via Portal */}
      <CertificateViewer
        certificate={selectedCert}
        certificates={filteredCerts}
        onClose={() => setSelectedCert(null)}
        onNavigate={(cert) => setSelectedCert(cert)}
      />
    </div>
  );
}
