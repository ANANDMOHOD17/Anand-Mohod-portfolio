'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import CertificateViewer from '@/components/viewer/CertificateViewer';
import { certificatesData } from '@/data/certificates';
import { Certificate } from '@/types';
import { ArrowLeft, Award, Eye, ShieldCheck } from 'lucide-react';

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(certificatesData.map((c) => c.category)))];

  const filteredCerts = activeCategory === 'All'
    ? certificatesData
    : certificatesData.filter((c) => c.category === activeCategory);

  return (
    <div className="pt-32 pb-24 md:py-36 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/#certificates"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-accent transition-colors mb-8 group"
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
                className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-accent/15 text-accent border border-accent/40 shadow-sm'
                    : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Certificates Grid or Empty State */}
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
                    className="p-6 h-full flex flex-col justify-between hover:border-accent/40 transition-all cursor-pointer group"
                    onClick={() => setSelectedCert(cert)}
                    tilt={true}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            {cert.category}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {cert.date}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-accent/80 block mb-1">
                          {cert.issuer}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors line-clamp-2">
                          {cert.name}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {cert.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-accent">
                      <span className="flex items-center gap-1.5 font-medium group-hover:underline">
                        <Eye className="w-3.5 h-3.5" />
                        View Certificate
                      </span>
                      <span className="text-slate-500 text-[10px]">
                        {cert.credentialId ? `#${cert.credentialId.slice(0, 8)}...` : 'Verified'}
                      </span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <GlassCard className="p-12 text-center max-w-2xl mx-auto border-white/10 bg-graphite-900/60">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              No Certificates Listed
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-normal">
              Technical credentials and verified certifications will be displayed here once added.
            </p>
          </GlassCard>
        )}
      </div>

      {/* Full-Screen Liquid Glass Certificate Viewer */}
      <CertificateViewer
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
