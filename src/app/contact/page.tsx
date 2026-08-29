'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CHAMBERS_INFO } from '@/lib/constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 sm:py-16 w-full space-y-10 flex-1">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-foreground">Chambers Registry & Offices</h1>
          <p className="text-xs text-muted-foreground">Defence Colony, New Delhi & Court Chambers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="legal-card p-8 space-y-6">
            <h2 className="text-lg font-black text-foreground">Defence Colony Chambers</h2>
            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-foreground">Chandra Law Chambers</div>
                  <div className="text-muted-foreground">{CHAMBERS_INFO.offices[0]}</div>
                  <div className="text-muted-foreground">{CHAMBERS_INFO.offices[1]}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <a href={`tel:${CHAMBERS_INFO.phone}`} className="font-bold text-blue-600 hover:underline">{CHAMBERS_INFO.phone}</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-muted-foreground">{CHAMBERS_INFO.email}</span>
              </div>
            </div>
          </div>

          <div className="legal-card p-8 space-y-4">
            <h2 className="text-lg font-black text-foreground">Senior Advocacy Conferences</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Conferences with <strong>{CHAMBERS_INFO.managingPartner}</strong> are strictly by prior appointment and following completion of conflict clearance.
            </p>
            <div className="p-4 rounded-xl bg-muted/60 text-xs text-muted-foreground">
              Direct Senior Line: <strong>{CHAMBERS_INFO.phone}</strong> | Chambers Landline: <strong>{CHAMBERS_INFO.altPhone}</strong>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
