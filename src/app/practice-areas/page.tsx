'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PRACTICE_AREAS, CHAMBERS_INFO } from '@/lib/constants';
import { Scale, ArrowRight } from 'lucide-react';

export default function PracticeAreasPage() {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-12 flex-1">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs">
            <Scale className="w-3.5 h-3.5" />
            <span>Advocacy & Litigation Practice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Chambers Practice Areas
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Specialized representation before the Supreme Court of India, Delhi High Court, and arbitral tribunals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRACTICE_AREAS.map((p) => (
            <div key={p.id} className="legal-card overflow-hidden flex flex-col justify-between group">
              <div className="relative h-60 w-full overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 font-bold text-[10px]">
                  {p.category}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base text-foreground group-hover:text-blue-600 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.shortDesc}
                  </p>
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-semibold">{p.leadCounsel}</span>
                  <Link
                    href={`/practice-areas/${p.slug}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    View Practice &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
