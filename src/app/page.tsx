'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { MatterIntakeConflictScanner } from '@/components/MatterIntakeConflictScanner';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { RetainerModal } from '@/components/RetainerModal';
import { Footer } from '@/components/layout/Footer';
import { CHAMBERS_INFO, PRACTICE_AREAS, COURT_DOCKETS } from '@/lib/constants';
import {
  Scale,
  Calendar,
  Sparkles,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Gavel,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  const [isRetainerOpen, setIsRetainerOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar onOpenRetainer={() => setIsRetainerOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full space-y-16 sm:space-y-24 flex-1">
        {/* 1. Hero Section with Senior Advocacy Credentials */}
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-500/20 text-xs font-bold shadow-sm">
                <Gavel className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Senior Standing Counsel • Supreme Court & Delhi High Court</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Strategic Litigation, Commercial Arbitration &{' '}
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-amber-500 bg-clip-text text-transparent">
                  Decisive Advocacy.
                </span>
              </h1>

              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Led by <strong>{CHAMBERS_INFO.managingPartner}</strong> ({CHAMBERS_INFO.partnerTitle}), our chambers deliver rigorous counsel across high-stakes commercial disputes, Section 9/34 arbitration petitions, and Article 136 Supreme Court appeals.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  onClick={() => setIsRetainerOpen(true)}
                  className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Brief Counsel & Clear Conflict</span>
                </button>

                <a
                  href={`tel:${CHAMBERS_INFO.phone}`}
                  className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted text-xs sm:text-sm font-semibold"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Chambers: {CHAMBERS_INFO.phone}</span>
                </a>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
                <div className="p-3.5 rounded-2xl bg-card border border-border space-y-0.5 shadow-sm">
                  <div className="text-lg sm:text-2xl font-black text-foreground">
                    <AnimatedCounter to={15} suffix="+ Yrs" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-medium">Court Advocacy</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-card border border-border space-y-0.5 shadow-sm">
                  <div className="text-lg sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                    <AnimatedCounter to={2400} suffix="+" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-medium">Matters Handled</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-card border border-border space-y-0.5 shadow-sm">
                  <div className="text-lg sm:text-2xl font-black text-amber-500">
                    120+
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-medium">Reported Precedents</div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="legal-card p-4 sm:p-6 space-y-4">
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-border shadow-xl">
                  <img
                    src="/assets/counsel/shlok_chandra.jpg"
                    alt={CHAMBERS_INFO.managingPartner}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white space-y-1">
                    <div className="text-xs font-bold text-amber-400">{CHAMBERS_INFO.managingPartner}</div>
                    <div className="text-[11px] text-slate-300">Senior Standing Counsel • Chambers in Defence Colony</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Interactive Matter Intake & Conflict Screening Tool */}
        <section id="conflict-check" className="space-y-6">
          <MatterIntakeConflictScanner onOpenRetainer={() => setIsRetainerOpen(true)} />
        </section>

        {/* 3. Practice Areas Showcase */}
        <section id="practices" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1 max-w-xl">
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs">
                <Scale className="w-3.5 h-3.5" />
                <span>Specialized Practice Rosters</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Litigation & Dispute Resolution
              </h2>
            </div>
            <Link
              href="/practice-areas"
              className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline"
            >
              <span>Explore All Rosters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRACTICE_AREAS.map((p) => (
              <div key={p.id} className="legal-card overflow-hidden flex flex-col justify-between group">
                <div className="relative h-56 w-full overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 font-bold text-[10px] border border-blue-500/30">
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
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.statutoryActs.map((act, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-semibold">Lead: {p.leadCounsel}</span>
                    <Link
                      href={`/practice-areas/${p.slug}`}
                      className="font-bold text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      <span>Brief Overview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Live Court Cause List & Hearing Docket Strip */}
        <section id="cause-list" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">Chambers Hearing Docket & Cause List</h3>
              <p className="text-xs text-muted-foreground">Active listings across Supreme Court, High Court & DIAC Arbitrations.</p>
            </div>
            <Link href="/cause-list" className="text-xs font-bold text-blue-600 hover:underline">
              View Full Cause List &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COURT_DOCKETS.map((doc) => (
              <div key={doc.id} className="legal-card p-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-blue-600">{doc.caseNumber}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-bold text-[10px]">{doc.forum}</span>
                </div>
                <div className="font-extrabold text-xs text-foreground line-clamp-1">{doc.matterTitle}</div>
                <div className="text-[11px] text-muted-foreground">{doc.courtRoom} • Item #{doc.itemNumber}</div>
                <div className="text-[11px] text-muted-foreground font-semibold">Stage: {doc.stage} • Date: {doc.hearingDate}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <RetainerModal isOpen={isRetainerOpen} onClose={() => setIsRetainerOpen(false)} />
    </div>
  );
}
