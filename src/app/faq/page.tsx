'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FAQS } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-8 flex-1">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-foreground">Frequently Asked Questions</h1>
          <p className="text-xs text-muted-foreground">Clarity on conflict clearance, retainers, and emergency filings.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="legal-card p-5 space-y-2">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-extrabold text-sm text-foreground"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === idx && (
                <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
