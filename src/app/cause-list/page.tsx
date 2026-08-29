'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourtDocket } from '@/types';
import { Gavel, Calendar } from 'lucide-react';

export default function CauseListPage() {
  const [dockets, setDockets] = useState<CourtDocket[]>([]);

  useEffect(() => {
    fetch('/api/dockets').then((r) => r.json()).then((d) => d.success && setDockets(d.dockets));
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-8 flex-1">
        <div className="pb-4 border-b border-border space-y-1">
          <h1 className="text-2xl sm:text-4xl font-black text-foreground">Chambers Cause List & Docket</h1>
          <p className="text-xs text-muted-foreground">Daily court listing schedule before Supreme Court of India, Delhi High Court & Arbitral Tribunals.</p>
        </div>

        <div className="space-y-4">
          {dockets.map((doc) => (
            <div key={doc.id} className="legal-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-sm text-blue-600">{doc.caseNumber}</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs">{doc.forum}</span>
              </div>
              <div className="font-black text-base text-foreground">{doc.matterTitle}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
                <div>Bench: <strong className="text-foreground">{doc.bench}</strong></div>
                <div>Court Room: <strong className="text-foreground">{doc.courtRoom} (Item #{doc.itemNumber})</strong></div>
                <div>Stage & Date: <strong className="text-blue-600 font-bold">{doc.stage} ({doc.hearingDate})</strong></div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
