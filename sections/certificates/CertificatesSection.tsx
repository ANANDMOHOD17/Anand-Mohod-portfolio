'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import CertificateViewer from '@/components/viewer/CertificateViewer';
import { certificatesData } from '@/data/certificates';
import { Certificate } from '@/types';
import { Award, ArrowUpRight, Eye, ShieldCheck } from 'lucide-react';

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const featuredCertificates = certificatesData.filter((c) => c.featured);
  const displayCertificates = featuredCertificates.length > 0 ? featuredCertificates : certificatesData.slice(0, 3);

  return (
    <section id="certificates" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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
                <span>View All ({certificatesData.length})</span>
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </GlassButton>
            </Link>
          )}
        </div>

        {/* Certificates Grid or Empty State */}
        {displayCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCertificates.map((cert) => (
              <GlassCard
                key={cert.id}
                className="p-6 flex flex-col justify-between hover:border-accent/40 transition-all cursor-pointer group"
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
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors line-clamp-2">
                      {cert.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
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
            ))}
          </div>
        ) : (
          <GlassCard className="p-10 text-center max-w-2xl mx-auto border-white/10 bg-graphite-900/60">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Certifications Updating
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-normal">
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
