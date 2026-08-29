'use client';

import React from 'react';
import Link from 'next/link';
import { CHAMBERS_INFO, PRACTICE_AREAS } from '@/lib/constants';
import { Scale, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border mt-16 sm:mt-24 pb-20 sm:pb-12 pt-12 sm:pt-16 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 font-bold shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-foreground">{CHAMBERS_INFO.name}</h3>
                <p className="text-[11px] text-blue-600 font-semibold">{CHAMBERS_INFO.tagline}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-md">
              Led by <strong>{CHAMBERS_INFO.managingPartner}</strong> ({CHAMBERS_INFO.partnerTitle}). Providing strategic commercial litigation, arbitration advocacy, and direct tax counsel before the Supreme Court of India & Hon’ble Delhi High Court.
            </p>
            <div className="p-3 rounded-2xl bg-muted/60 border border-border text-[11px]">
              Bar Council Enrollment: {CHAMBERS_INFO.barCouncilEnrollment}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-foreground uppercase tracking-wider text-[11px]">Key Rosters</h4>
            <ul className="space-y-2 text-xs">
              {PRACTICE_AREAS.map((p) => (
                <li key={p.id}>
                  <Link href={`/practice-areas/${p.slug}`} className="hover:text-blue-600 transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-foreground uppercase tracking-wider text-[11px]">Chambers Registry</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{CHAMBERS_INFO.offices[0]}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <a href={`tel:${CHAMBERS_INFO.phone}`} className="font-bold text-foreground hover:underline">
                  {CHAMBERS_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 {CHAMBERS_INFO.name}. All rights reserved. Bar Council regulatory compliance.</p>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-foreground">Client Vault</Link>
            <Link href="/admin" className="hover:text-foreground">Senior Registry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
