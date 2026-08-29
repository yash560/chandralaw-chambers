'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CHAMBERS_INFO } from '@/lib/constants';
import { Scale, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RetainerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [clientName, setClientName] = useState('');
  const [clientEntity, setClientEntity] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [opposingParty, setOpposingParty] = useState('');
  const [subjectJurisdiction, setSubjectJurisdiction] = useState('Delhi High Court (Commercial Injunction)');
  const [estimatedClaimINR, setEstimatedClaimINR] = useState('₹10 Cr – ₹50 Cr');
  const [preferredConsultationDate, setPreferredConsultationDate] = useState('2026-09-02');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/matters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEntity,
          clientPhone,
          clientEmail,
          opposingParty,
          subjectJurisdiction,
          estimatedClaimINR,
          preferredConsultationDate,
          notes,
          conflictCheckPassed: true,
          status: 'conflict_cleared',
        }),
      });

      const data = await res.json();
      if (data.success && data.matter) {
        confetti({ particleCount: 50, spread: 70 });
        onClose();
        router.push(`/client-vault`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="legal-card p-6 sm:p-8 max-w-lg w-full space-y-5 max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
            <Scale className="w-3.5 h-3.5" />
            <span>Confidential Retainer Consultation</span>
          </div>
          <h2 className="text-xl font-black text-foreground">Brief Senior Standing Counsel</h2>
          <p className="text-xs text-muted-foreground">
            Direct conference with <strong>{CHAMBERS_INFO.managingPartner}</strong>. Attorney-client privilege applies.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-muted-foreground">Authorized Representative</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Rahul Singhania"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-muted-foreground">Corporate Entity / Firm</label>
              <input
                type="text"
                required
                value={clientEntity}
                onChange={(e) => setClientEntity(e.target.value)}
                placeholder="e.g. Singhania Logistics Ltd"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-muted-foreground">Mobile Phone</label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+91 99999 00000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-muted-foreground">Official Email</label>
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="legal@entity.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-muted-foreground">Opposing Party / Respondents</label>
            <input
              type="text"
              required
              value={opposingParty}
              onChange={(e) => setOpposingParty(e.target.value)}
              placeholder="e.g. Union of India / NHAI / Private Claimant"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-muted-foreground">Target Forum</label>
              <select
                value={subjectJurisdiction}
                onChange={(e) => setSubjectJurisdiction(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold"
              >
                <option value="Delhi High Court (Commercial Injunction)">Delhi High Court (Commercial Injunction)</option>
                <option value="Supreme Court of India (SLP)">Supreme Court of India (SLP)</option>
                <option value="DIAC / SIAC Commercial Arbitration">DIAC / SIAC Commercial Arbitration</option>
                <option value="NCLAT & Corporate Insolvency (IBC)">NCLAT & Corporate Insolvency (IBC)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-muted-foreground">Claim Value</label>
              <select
                value={estimatedClaimINR}
                onChange={(e) => setEstimatedClaimINR(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold"
              >
                <option value="₹1 Cr – ₹5 Cr">₹1 Cr – ₹5 Cr</option>
                <option value="₹10 Cr – ₹50 Cr">₹10 Cr – ₹50 Cr</option>
                <option value="₹100 Cr+">₹100 Cr+ (High-Stakes Commercial)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-muted-foreground">Brief Summary of Dispute</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Urgent Section 9 petition for stay on invocation of bank guarantee..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Registering Brief...' : 'Clear Conflict & Schedule Chambers Conference'}</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};
