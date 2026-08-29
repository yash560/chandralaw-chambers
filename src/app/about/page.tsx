'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CHAMBERS_INFO } from '@/lib/constants';
import { Scale, Award, Gavel, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-12 flex-1">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs">
            <Scale className="w-3.5 h-3.5" />
            <span>Chambers Profile & Senior Registry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            About Advocate Shlok Chandra
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {CHAMBERS_INFO.partnerTitle} & Founder of {CHAMBERS_INFO.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-border shadow-2xl">
              <img src="/assets/counsel/shlok_chandra.jpg" alt={CHAMBERS_INFO.managingPartner} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold">
                {CHAMBERS_INFO.managingPartner}
                <div className="text-[10px] text-amber-400 font-normal">{CHAMBERS_INFO.barCouncilEnrollment}</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-black text-foreground">Decisive Commercial Advocacy & Sovereign Representation</h2>
            <p>
              Advocate Shlok Chandra is a distinguished litigator and arbitration practitioner with 15+ years of standing at the Bar. Serving as Senior Standing Counsel for sovereign taxation bodies and appearing regularly before the Supreme Court of India and Delhi High Court.
            </p>
            <p>
              Having represented Fortune 500 conglomerates, infrastructure consortia, and PSU boards in over 2,400 matters and 120+ reported judicial precedents.
            </p>
            <div className="p-4 rounded-2xl bg-muted/60 border border-border space-y-2 text-xs">
              <div className="font-bold text-foreground">Notable Judicial Precedents:</div>
              <ul className="space-y-1">
                {CHAMBERS_INFO.notableJudgments.map((j, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <Gavel className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{j}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
