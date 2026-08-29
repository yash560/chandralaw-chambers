'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalMatter } from '@/types';
import { ShieldCheck, FileText } from 'lucide-react';

export default function ClientVaultPage() {
  const [matters, setMatters] = useState<LegalMatter[]>([]);

  useEffect(() => {
    fetch('/api/matters').then((r) => r.json()).then((d) => d.success && setMatters(d.matters));
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-8 flex-1">
        <div className="pb-4 border-b border-border space-y-1">
          <h1 className="text-2xl sm:text-4xl font-black text-foreground">Client Litigation Vault</h1>
          <p className="text-xs text-muted-foreground">Encrypted briefs, verified conflict clearances, and order sheets.</p>
        </div>

        <div className="space-y-4">
          {matters.map((m) => (
            <div key={m.id} className="legal-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-blue-600">{m.matterCode}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase">{m.status}</span>
              </div>
              <div className="font-black text-base text-foreground">{m.clientEntity || m.clientName} vs. {m.opposingParty}</div>
              <div className="text-xs text-muted-foreground">Forum: {m.subjectJurisdiction} • Claim: {m.estimatedClaimINR}</div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
