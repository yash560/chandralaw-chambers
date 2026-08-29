'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, FileText, CheckCircle2, AlertTriangle, ArrowRight, Gavel } from 'lucide-react';

interface JurisdictionOption {
  id: string;
  name: string;
  bench: string;
  statutoryPleading: string;
  limitationPeriod: string;
  averageTimeline: string;
  description: string;
}

const JURISDICTIONS: JurisdictionOption[] = [
  {
    id: 'delhi_high_court',
    name: 'Delhi High Court (Commercial Bench)',
    bench: 'Original Civil / Commercial Division Bench',
    statutoryPleading: 'Section 9 Injunction / Section 34 Challenge / Commercial Suit',
    limitationPeriod: '30 Days to 3 Years depending on cause of action',
    averageTimeline: '4 – 12 Months to Disposal',
    description: 'Urgent interim stays against unconditional bank guarantees, Section 11 arbitrator appointments, and commercial appeals.',
  },
  {
    id: 'supreme_court',
    name: 'Supreme Court of India (SLP)',
    bench: 'Constitution & Appellate Rosters',
    statutoryPleading: 'Article 136 Special Leave Petition (Civil / Criminal)',
    limitationPeriod: '90 Days from High Court Final Order',
    averageTimeline: 'Notice Stage: 2-4 Weeks',
    description: 'Senior advocacy formulating constitutional questions of law, statutory interpretation, and challenging High Court final decrees.',
  },
  {
    id: 'diac_arbitration',
    name: 'Commercial Arbitration (DIAC / SIAC)',
    bench: 'Sole Arbitrator / 3-Member Tribunal',
    statutoryPleading: 'Statement of Claim under Arbitration & Conciliation Act',
    limitationPeriod: '3 Years under Section 21 of ACA 1996',
    averageTimeline: '12 Months (Fast Track Available)',
    description: 'High-value EPC construction disputes, shareholder joint venture conflicts, and post-award domestic/foreign enforcement.',
  },
  {
    id: 'nclat_corporate',
    name: 'NCLAT & Corporate Insolvency (IBC)',
    bench: 'Principal Bench, New Delhi',
    statutoryPleading: 'Section 7/9/61 IBC Appeals & Oppression Mismanagement',
    limitationPeriod: '30 Days under Section 61(2) of IBC',
    averageTimeline: '3 – 6 Months to Final Order',
    description: 'Corporate debt resolution, liquidation stays, and defending promoters against frivolous insolvency triggers.',
  },
];

interface Props {
  onOpenRetainer?: () => void;
}

export const MatterIntakeConflictScanner: React.FC<Props> = ({ onOpenRetainer }) => {
  const [selectedJurisdictionId, setSelectedJurisdictionId] = useState<string>('delhi_high_court');
  const [opposingParty, setOpposingParty] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<'cleared' | null>('cleared');

  const currentJur = JURISDICTIONS.find((j) => j.id === selectedJurisdictionId) || JURISDICTIONS[0];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('cleared');
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="legal-card p-5 sm:p-8 space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Confidential Conflict-of-Interest & Jurisdiction Scanner</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-foreground">
            Matter Assessment & Conflict Clearance
          </h3>
          <p className="text-xs text-muted-foreground">
            Select your appellate forum and screen opposing parties for immediate chambers clearance and retainer scheduling.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-muted/70 border border-border text-right shrink-0">
          <div className="text-[10px] uppercase font-bold text-muted-foreground">Senior Standing Counsel</div>
          <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400">Shlok Chandra Chambers</div>
        </div>
      </div>

      {/* Jurisdiction Grid */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground uppercase block">
          Select Primary Legal Jurisdiction / Tribunal:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {JURISDICTIONS.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedJurisdictionId(item.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedJurisdictionId === item.id
                  ? 'bg-blue-500/15 border-blue-600 text-foreground ring-2 ring-blue-500/50 shadow-md'
                  : 'bg-card border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <div className="text-xs font-black text-foreground">{item.name}</div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{item.bench}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Opposing Party Conflict Check Input */}
      <form onSubmit={handleScan} className="p-4 rounded-2xl bg-muted/60 border border-border flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full space-y-1">
          <label className="text-[10px] uppercase font-bold text-muted-foreground">
            Screen Opposing Party / Corporate Entity for Conflict:
          </label>
          <input
            type="text"
            value={opposingParty}
            onChange={(e) => setOpposingParty(e.target.value)}
            placeholder="e.g. National Highways Authority, Larsen & Toubro, etc."
            className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-xs text-foreground font-semibold"
          />
        </div>
        <button
          type="submit"
          disabled={isScanning}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shrink-0 sm:mt-5"
        >
          {isScanning ? 'Scanning...' : 'Check Conflict'}
        </button>
      </form>

      {/* Jurisdiction Analysis & Strategic Directive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedJurisdictionId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="p-5 sm:p-6 rounded-2xl bg-muted/60 border border-border space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-border text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Key Statutory Pleading</span>
              <span className="font-extrabold text-foreground">{currentJur.statutoryPleading}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Statutory Limitation</span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400">{currentJur.limitationPeriod}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Disposal Horizon</span>
              <span className="font-extrabold text-foreground">{currentJur.averageTimeline}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              ⚖️ <strong>Advocate Shlok Chandra’s Strategic Counsel:</strong> {currentJur.description}
            </p>
            {onOpenRetainer && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenRetainer}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center space-x-1.5 shrink-0"
              >
                <span>Initiate Retainer Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
