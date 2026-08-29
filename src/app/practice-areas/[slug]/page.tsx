'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PRACTICE_AREAS, CHAMBERS_INFO } from '@/lib/constants';
import { Scale, ArrowRight } from 'lucide-react';

export default function PracticeAreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const practice = PRACTICE_AREAS.find((p) => p.slug === slug);

  if (!practice) notFound();

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-10 flex-1">
        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{practice.category}</span>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground">{practice.name}</h1>
          <div className="text-xs text-muted-foreground pt-1">
            Lead Counsel: <strong>{practice.leadCounsel}</strong>
          </div>
        </div>

        <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-border shadow-2xl">
          <img src={practice.image} alt={practice.name} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-lg font-black text-foreground">Chambers Practice Overview</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {practice.fullDesc}
            </p>

            <div className="space-y-2 pt-4 border-t border-border">
              <h3 className="font-bold text-xs text-foreground uppercase tracking-wider">Governing Statutory Framework:</h3>
              <div className="flex flex-wrap gap-2">
                {practice.statutoryActs.map((act, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-muted text-xs font-bold text-foreground">
                    {act}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="legal-card p-6 space-y-4">
              <div className="font-black text-sm text-foreground">Brief Senior Standing Counsel</div>
              <p className="text-xs text-muted-foreground">
                Submit matter facts, opposing parties, and target statutory relief for confidential screening.
              </p>
              <Link
                href="/contact"
                className="w-full block text-center py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Schedule Chambers Retainer &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
