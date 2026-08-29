'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CHAMBERS_INFO, PRACTICE_AREAS, COURT_DOCKETS } from '@/lib/constants';
import { LegalMatter } from '@/types';
import {
  Scale,
  Shield,
  Send,
  Plus,
  RefreshCw,
  Layers,
  Award,
  Phone,
  Mail,
  CheckCircle2,
  Calendar,
  Gavel,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  Settings,
  Star,
  BookOpen,
  FolderKanban,
  Check,
  Building,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';
import confetti from 'canvas-confetti';

type LegalTab =
  | 'overview'
  | 'cause_list'
  | 'conflict_check'
  | 'pleadings'
  | 'sovereign_tax'
  | 'client_registry'
  | 'outreach'
  | 'fee_ledger'
  | 'precedents'
  | 'arbitration_suites'
  | 'endorsements'
  | 'governance';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<LegalTab>('overview');
  const [matters, setMatters] = useState<LegalMatter[]>([]);
  const [selectedMatter, setSelectedMatter] = useState<LegalMatter | any>(null);

  // Outreach State
  const [outreachSubject, setOutreachSubject] = useState('Conflict Clearance & Retainer Confirmation — Chandra Law Chambers');
  const [outreachMessage, setOutreachMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // New Matter Entry State
  const [newClientName, setNewClientName] = useState('');
  const [newClientEntity, setNewClientEntity] = useState('');
  const [newOpposingParty, setNewOpposingParty] = useState('');
  const [newJurisdiction, setNewJurisdiction] = useState('Delhi High Court');
  const [newClaimAmount, setNewClaimAmount] = useState('₹25.0 Cr');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isAddingMatter, setIsAddingMatter] = useState(false);

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

  const handleAddMatter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingMatter(true);
    try {
      const res = await fetch('/api/matters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: newClientName,
          clientEntity: newClientEntity,
          opposingParty: newOpposingParty,
          subjectJurisdiction: newJurisdiction,
          estimatedClaimINR: newClaimAmount,
          clientPhone: newPhone,
          clientEmail: newEmail,
          urgentReliefRequired: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        confetti({ particleCount: 50, spread: 70 });
        fetchMatters();
        setNewClientName('');
        setNewClientEntity('');
        setNewOpposingParty('');
        setNewPhone('');
        setNewEmail('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingMatter(false);
    }
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
        confetti({ particleCount: 50, spread: 60 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSending(false);
    }
  };

  const SIDEBAR_ITEMS: { id: LegalTab; label: string; icon: any; badge?: string }[] = [
    { id: 'overview', label: 'Chambers Overview & KPIs', icon: Scale },
    { id: 'cause_list', label: 'Court Cause List', icon: Gavel, badge: `${COURT_DOCKETS.length} Listed` },
    { id: 'conflict_check', label: 'Conflict Screening Engine', icon: Shield, badge: 'Zero Conflict' },
    { id: 'pleadings', label: 'Court Filings & Pleadings', icon: FileText, badge: '28 Sets' },
    { id: 'sovereign_tax', label: 'Sovereign Tax Roster', icon: Building },
    { id: 'client_registry', label: 'Corporate Client Registry', icon: FolderKanban, badge: `${matters.length}` },
    { id: 'outreach', label: '1-Click Retainer Email', icon: Send },
    { id: 'fee_ledger', label: 'Appearance & Fee Ledger', icon: DollarSign },
    { id: 'precedents', label: 'Reported Precedents', icon: BookOpen, badge: '120+' },
    { id: 'arbitration_suites', label: 'Arbitration Suites', icon: Layers },
    { id: 'endorsements', label: 'General Counsel Citations', icon: Award, badge: '5.0★' },
    { id: 'governance', label: 'Chambers Governance', icon: Settings },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full space-y-6 flex-1">
        {/* Top Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>Chandra Law Chambers ERP v4.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              Senior Standing Counsel Executive Registry
            </h1>
            <p className="text-xs text-muted-foreground">
              Direct Chambers Management • {CHAMBERS_INFO.managingPartner} ({CHAMBERS_INFO.barCouncilEnrollment})
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={fetchMatters}
              className="px-3.5 py-2 rounded-xl bg-card border border-border text-xs font-bold text-foreground hover:bg-muted flex items-center space-x-1.5 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
              <span>Sync Docket</span>
            </button>
            <button
              onClick={() => setActiveTab('client_registry')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register New Brief</span>
            </button>
          </div>
        </div>

        {/* 12-Module Sidebar & Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Navigation Rail (12 Items) */}
          <aside className="lg:col-span-3 legal-card p-3 space-y-1 overflow-x-auto lg:overflow-visible flex lg:flex-col gap-1 lg:gap-0 sticky top-24">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-left font-bold text-xs flex items-center justify-between transition-all shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-extrabold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-muted text-foreground'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Right Active Module Work Area */}
          <section className="lg:col-span-9 space-y-6">
            {/* 1. OVERVIEW & KPIS */}
            {activeTab === 'overview' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="legal-card p-4 space-y-1">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Claim Value</div>
                    <div className="text-xl sm:text-2xl font-black text-foreground">₹84.50 Cr</div>
                    <div className="text-[10px] text-emerald-500 font-bold flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Commercial Arbitration & Writs</span>
                    </div>
                  </div>
                  <div className="legal-card p-4 space-y-1">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Active Briefs Handled</div>
                    <div className="text-xl sm:text-2xl font-black text-blue-600">2,400+ Matters</div>
                    <div className="text-[10px] text-muted-foreground">15+ Yrs at Bar</div>
                  </div>
                  <div className="legal-card p-4 space-y-1">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Reported Precedents</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-500">120+ Reported</div>
                    <div className="text-[10px] text-muted-foreground">SCC & DLR Citations</div>
                  </div>
                  <div className="legal-card p-4 space-y-1">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Conflict Clearance</div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-500">100% Verified</div>
                    <div className="text-[10px] text-muted-foreground">Strict BCI Ethics</div>
                  </div>
                </div>

                {/* Today's Court Listed Cause List */}
                <div className="legal-card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                      <Gavel className="w-4 h-4 text-blue-600" />
                      <span>Today&apos;s Senior Oral Arguments & Cause List</span>
                    </h2>
                    <span className="text-xs text-muted-foreground font-semibold">
                      Delhi High Court & Supreme Court
                    </span>
                  </div>

                  <div className="space-y-3">
                    {COURT_DOCKETS.map((doc) => (
                      <div key={doc.id} className="p-4 rounded-2xl bg-muted/60 border border-border space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-blue-600">{doc.caseNumber}</span>
                            <strong className="text-foreground text-sm">{doc.matterTitle}</strong>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 font-bold text-[10px] uppercase">
                            {doc.forum}
                          </span>
                        </div>
                        <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                          <span>Court Room: {doc.courtRoom}</span>
                          <span>Item #{doc.itemNumber}</span>
                          <span>Stage: {doc.stage}</span>
                          <span>Hearing Date: {doc.hearingDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. CAUSE LIST MASTER */}
            {activeTab === 'cause_list' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <Gavel className="w-4 h-4 text-blue-600" />
                    <span>Daily Court Rosters & Hearing Schedule</span>
                  </h2>

                  <div className="space-y-2 text-xs">
                    {COURT_DOCKETS.map((doc) => (
                      <div key={doc.id} className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between">
                        <div>
                          <span className="font-mono text-blue-600 font-bold">{doc.caseNumber}</span>: <strong className="text-foreground">{doc.matterTitle}</strong>
                          <div className="text-muted-foreground text-[11px]">{doc.forum} • {doc.courtRoom} • Item #{doc.itemNumber} • Bench: {doc.bench}</div>
                        </div>
                        <span className="font-bold text-blue-600 bg-blue-500/10 px-2.5 py-1 rounded-lg">Listed for {doc.stage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. CONFLICT SCREENING ENGINE */}
            {activeTab === 'conflict_check' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Automated Conflict-of-Interest Screening & Privileged Clearance</span>
                  </h2>

                  <div className="p-4 rounded-2xl bg-muted/60 border border-border text-xs space-y-2">
                    <div className="font-bold text-foreground">Active Database Screening Protocol:</div>
                    <p className="text-muted-foreground">Every incoming entity, subsidiary board, and individual promoter is screened against 2,400+ past client representations and opposing parties across High Court, Supreme Court, and DIAC tribunals to guarantee 100% compliance with Bar Council of India professional ethics.</p>
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Chambers Conflict Clearance Status: 100% Clean • No Prohibited Retainers</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. PLEADINGS & VAULT */}
            {activeTab === 'pleadings' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Drafting Vault: Petitions, SLPs & Section 9 Injunctions</span>
                  </h2>

                  <div className="space-y-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
                      <div>
                        <strong className="text-foreground">Section 9 ACA Petition: Stay on ₹85 Cr Bank Guarantee</strong>
                        <div className="text-muted-foreground">Vanguard Infra vs. NHAI • Drafted by Shlok Chandra • Listed Court 14</div>
                      </div>
                      <span className="font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-lg">Filed & Listed</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
                      <div>
                        <strong className="text-foreground">Article 136 Special Leave Petition (Civil)</strong>
                        <div className="text-muted-foreground">Apex Energy vs. UOI • Constitutional Questions of Law on Gas Pricing</div>
                      </div>
                      <span className="font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-lg">AOR Stamped</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. SOVEREIGN TAX */}
            {activeTab === 'sovereign_tax' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4 text-xs">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>Senior Standing Counsel Sovereign Direct Tax Practice</span>
                  </h2>

                  <div className="space-y-2">
                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border">
                      <strong>Section 260A High Court Tax Appeals:</strong> Transfer pricing adjustments, cross-border royalty withholding, search & seizure assessments.
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border">
                      <strong>ITAT Special Bench Appearances:</strong> Corporate international tax disputes, capital gains characterization.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. CLIENT REGISTRY */}
            {activeTab === 'client_registry' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-blue-600" />
                    <span>Register New Client Brief & Screen Conflict</span>
                  </h2>

                  <form onSubmit={handleAddMatter} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground">Client Representative</label>
                      <input type="text" required value={newClientName} onChange={(e) => setNewClientName(e.target.value)} placeholder="e.g. Vikramjit Sahney" className="w-full p-2.5 rounded-xl bg-background border border-border text-foreground font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground">Corporate Entity</label>
                      <input type="text" required value={newClientEntity} onChange={(e) => setNewClientEntity(e.target.value)} placeholder="e.g. Vanguard Infra Ltd" className="w-full p-2.5 rounded-xl bg-background border border-border text-foreground font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground">Opposing Party / Respondent</label>
                      <input type="text" required value={newOpposingParty} onChange={(e) => setNewOpposingParty(e.target.value)} placeholder="e.g. NHAI / UOI" className="w-full p-2.5 rounded-xl bg-background border border-border text-foreground font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground">Jurisdiction</label>
                      <select value={newJurisdiction} onChange={(e) => setNewJurisdiction(e.target.value)} className="w-full p-2.5 rounded-xl bg-background border border-border text-foreground font-semibold">
                        <option value="Delhi High Court">Delhi High Court (Commercial Division)</option>
                        <option value="Supreme Court of India">Supreme Court of India</option>
                        <option value="DIAC Commercial Arbitration">DIAC Commercial Arbitration</option>
                        <option value="NCLAT New Delhi">NCLAT New Delhi</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground">Claim Value</label>
                      <input type="text" value={newClaimAmount} onChange={(e) => setNewClaimAmount(e.target.value)} className="w-full p-2.5 rounded-xl bg-background border border-border text-foreground font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground">Official Email</label>
                      <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="legal@entity.com" className="w-full p-2.5 rounded-xl bg-background border border-border text-foreground font-semibold" />
                    </div>
                    <div className="sm:col-span-3 pt-2">
                      <button type="submit" disabled={isAddingMatter} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md disabled:opacity-50">
                        {isAddingMatter ? 'Screening & Registering Brief...' : 'Screen Conflict & Register Brief'}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="legal-card p-6 space-y-3">
                  <h3 className="text-sm font-black text-foreground">Registered Briefs</h3>
                  <div className="space-y-2 text-xs">
                    {matters.map((m) => (
                      <div key={m.id} className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
                        <div>
                          <strong className="text-foreground">{m.clientEntity || m.clientName}</strong> vs. <span className="text-blue-600 font-semibold">{m.opposingParty}</span>
                          <div className="text-[11px] text-muted-foreground">{m.subjectJurisdiction} • Claim: {m.estimatedClaimINR} • {m.clientEmail}</div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[10px] uppercase">
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. OUTREACH */}
            {activeTab === 'outreach' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <Send className="w-4 h-4 text-blue-600" />
                    <span>1-Click Retainer & Conflict Clearance Emailer</span>
                  </h2>

                  {sendSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold text-xs flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Retainer communication dispatched successfully via SMTP!</span>
                    </div>
                  )}

                  {selectedMatter ? (
                    <form onSubmit={handleSendOutreach} className="space-y-3.5 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground">Recipient Client</label>
                        <input type="text" disabled value={`${selectedMatter.clientName} (${selectedMatter.clientEmail})`} className="w-full p-2.5 rounded-xl bg-muted border border-border text-foreground font-semibold" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground">Subject</label>
                        <input type="text" required value={outreachSubject} onChange={(e) => setOutreachSubject(e.target.value)} className="w-full p-2.5 rounded-xl bg-background border border-border font-semibold text-foreground" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground">Official Communication Body</label>
                        <textarea rows={6} required value={outreachMessage} onChange={(e) => setOutreachMessage(e.target.value)} className="w-full p-2.5 rounded-xl bg-background border border-border text-foreground resize-none" />
                      </div>
                      <button type="submit" disabled={isSending} className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md disabled:opacity-50 flex items-center justify-center space-x-2">
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSending ? 'Dispatching...' : 'Dispatch 1-Click Retainer Email'}</span>
                      </button>
                    </form>
                  ) : (
                    <div className="p-8 text-center text-xs text-muted-foreground">Select a matter to draft outreach.</div>
                  )}
                </div>
              </div>
            )}

            {/* 8. FEE LEDGER */}
            {activeTab === 'fee_ledger' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4 text-xs">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span>Senior Appearance Fees & Retainer Schedules</span>
                  </h2>

                  <div className="space-y-2">
                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
                      <div>
                        <strong>Supreme Court of India (Per Appearance):</strong> Final Arguments / Notice Motion
                      </div>
                      <span className="font-bold text-blue-600">Standard Senior Schedule</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
                      <div>
                        <strong>Delhi High Court Commercial Bench (Per Appearance):</strong> Section 9/34 ACA Hearings
                      </div>
                      <span className="font-bold text-blue-600">Standard Senior Schedule</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 9. PRECEDENTS */}
            {activeTab === 'precedents' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4 text-xs">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>Reported Judicial Precedents (120+ Citations)</span>
                  </h2>

                  <div className="space-y-2">
                    {CHAMBERS_INFO.notableJudgments.map((j, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-muted/50 border border-border">
                        <strong>{j}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 10. ARBITRATION SUITES */}
            {activeTab === 'arbitration_suites' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4 text-xs">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Chambers Conference Rooms & DIAC Preparation Rooms</span>
                  </h2>

                  <div className="space-y-2">
                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border">
                      <strong>Conference Suite A (Defence Colony):</strong> High-speed video conference, secure document shredder, verbatim transcription link.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 11. ENDORSEMENTS */}
            {activeTab === 'endorsements' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4 text-xs">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>General Counsel Citations & Directory Accolades</span>
                  </h2>

                  <div className="space-y-2">
                    <div className="p-3.5 rounded-xl bg-muted/50 border border-border">
                      <strong>Vanguard Infrastructure Ltd:</strong> &quot;Unmatched courtroom presence and emergency Section 9 stay obtained within 24 hours.&quot;
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 12. GOVERNANCE */}
            {activeTab === 'governance' && (
              <div className="space-y-6" data-aos="fade-in">
                <div className="legal-card p-6 space-y-4 text-xs">
                  <h2 className="text-base font-black text-foreground flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-blue-600" />
                    <span>Chambers Governance & Bar Affiliations</span>
                  </h2>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-muted/50 border border-border">
                      <strong>Bar Council of Delhi:</strong> Enrolment #{CHAMBERS_INFO.barCouncilEnrollment}
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50 border border-border">
                      <strong>Supreme Court Bar Association:</strong> Permanent Member
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50 border border-border">
                      <strong>Chambers Offices:</strong> {CHAMBERS_INFO.offices.join(' • ')}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
