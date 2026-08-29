'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LegalMatter } from '@/types';
import { Scale, Send, RefreshCw, Phone, Mail, CheckCircle, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminPage() {
  const [matters, setMatters] = useState<LegalMatter[]>([]);
  const [selectedMatter, setSelectedMatter] = useState<LegalMatter[] | any>(null);
  const [outreachSubject, setOutreachSubject] = useState('Conflict Clearance & Retainer Confirmation — Chandra Law Chambers');
  const [outreachMessage, setOutreachMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const fetchMatters = () => {
    fetch('/api/matters').then((r) => r.json()).then((d) => {
      if (d.success) {
        setMatters(d.matters);
        if (d.matters.length > 0 && !selectedMatter) {
          setSelectedMatter(d.matters[0]);
          setOutreachMessage(`Dear ${d.matters[0].clientName},\n\nWe confirm that Chandra Law Chambers has completed the preliminary conflict-of-interest screening for your matter against ${d.matters[0].opposingParty} before the ${d.matters[0].subjectJurisdiction}.\n\nSenior Standing Counsel Advocate Shlok Chandra has reviewed the brief and approved the retainer schedule.`);
        }
      }
    });
  };

  useEffect(() => {
    fetchMatters();
  }, []);

  const handleSelectMatter = (m: LegalMatter) => {
    setSelectedMatter(m);
    setOutreachMessage(`Dear ${m.clientName},\n\nWe confirm that Chandra Law Chambers has completed the preliminary conflict-of-interest screening for your matter against ${m.opposingParty}.\n\nAdvocate Shlok Chandra has scheduled your chambers conference.`);
    setSendSuccess(false);
  };

  const handleSendOutreach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatter) return;
    setIsSending(true);

    try {
      const res = await fetch('/api/admin/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientEmail: selectedMatter.clientEmail,
          clientName: selectedMatter.clientName,
          subject: outreachSubject,
          message: outreachMessage,
          matterCode: selectedMatter.matterCode,
        }),
      });
      const d = await res.json();
      if (d.success) {
        setSendSuccess(true);
        confetti({ particleCount: 40, spread: 60 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-8 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Chambers Executive Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-foreground">Senior Counsel Registry & Matter Intake CRM</h1>
          </div>
          <button onClick={fetchMatters} className="px-4 py-2 rounded-xl bg-muted text-xs font-bold flex items-center space-x-1.5 self-start">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Refresh Registry</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="legal-card p-5 space-y-1">
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Active Briefs</div>
            <div className="text-2xl font-black text-foreground">{matters.length} Matters</div>
          </div>
          <div className="legal-card p-5 space-y-1">
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Claim Value</div>
            <div className="text-2xl font-black text-blue-600">₹84.5 Cr</div>
          </div>
          <div className="legal-card p-5 space-y-1">
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Conflict Clearance</div>
            <div className="text-2xl font-black text-emerald-500">100% Passed</div>
          </div>
          <div className="legal-card p-5 space-y-1">
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Reported Precedents</div>
            <div className="text-2xl font-black text-amber-500">120+ Citations</div>
          </div>
        </div>

        {/* Lead CRM & Automated Outreach Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Matters Table */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-black text-foreground flex items-center space-x-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <span>Incoming Briefs & Conflict Checks</span>
            </h2>

            <div className="space-y-3">
              {matters.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleSelectMatter(m)}
                  className={`legal-card p-5 space-y-2 cursor-pointer transition-all ${
                    selectedMatter?.id === m.id ? 'ring-2 ring-blue-600 bg-blue-500/5' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600">{m.matterCode}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase">{m.status}</span>
                  </div>
                  <div className="font-black text-base text-foreground">{m.clientEntity || m.clientName}</div>
                  <div className="text-xs text-muted-foreground">vs. <strong className="text-foreground">{m.opposingParty}</strong></div>
                  <div className="text-xs text-muted-foreground">{m.subjectJurisdiction} • Claim: <strong className="text-amber-500">{m.estimatedClaimINR}</strong></div>
                  <div className="text-xs text-muted-foreground flex items-center space-x-4 pt-1">
                    <span className="flex items-center space-x-1"><Phone className="w-3 h-3 text-blue-600" /> <span>{m.clientPhone}</span></span>
                    <span className="flex items-center space-x-1"><Mail className="w-3 h-3 text-blue-600" /> <span>{m.clientEmail}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 1-Click Outreach Email Engine */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-lg font-black text-foreground flex items-center space-x-2">
              <Send className="w-5 h-5 text-blue-600" />
              <span>1-Click Retainer Outreach Email</span>
            </h2>

            {selectedMatter ? (
              <form onSubmit={handleSendOutreach} className="legal-card p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-muted-foreground">Recipient Entity / Counsel</label>
                  <input type="text" disabled value={`${selectedMatter.clientName} (${selectedMatter.clientEmail})`} className="w-full p-2.5 rounded-xl bg-muted border border-border text-foreground font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-muted-foreground">Email Subject</label>
                  <input type="text" required value={outreachSubject} onChange={(e) => setOutreachSubject(e.target.value)} className="w-full p-2.5 rounded-xl bg-background border border-border text-foreground font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-muted-foreground">Brief Communication Body</label>
                  <textarea rows={6} required value={outreachMessage} onChange={(e) => setOutreachMessage(e.target.value)} className="w-full p-2.5 rounded-xl bg-background border border-border text-foreground resize-none" />
                </div>

                {sendSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Retainer communication dispatched successfully via SMTP!</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSending ? 'Dispatching...' : 'Dispatch 1-Click Retainer Email'}</span>
                </button>
              </form>
            ) : (
              <div className="legal-card p-8 text-center text-xs text-muted-foreground">Select a matter to draft outreach.</div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
