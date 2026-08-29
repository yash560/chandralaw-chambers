import { LegalMatter, CourtDocket } from '@/types';
import { CHAMBERS_INFO, PRACTICE_AREAS, COURT_DOCKETS } from './constants';

export { CHAMBERS_INFO, PRACTICE_AREAS };

export let matters: LegalMatter[] = [
  {
    id: 'm-1',
    matterCode: 'CLC-2026-7819',
    clientName: 'Vanguard Infrastructure JV',
    clientEntity: 'Vanguard Infra Pvt Ltd',
    clientPhone: '+91 98100 45120',
    clientEmail: 'legal@vanguardinfra.com',
    opposingParty: 'National Highways Authority of India (NHAI)',
    subjectJurisdiction: 'Delhi High Court (Section 9 Commercial Injunction)',
    estimatedClaimINR: '₹84.50 Crores',
    preferredConsultationDate: '2026-09-02',
    conflictCheckPassed: true,
    notes: 'Emergency stay on invocation of unconditional bank guarantee.',
    status: 'retainer_active',
    createdAt: new Date().toISOString(),
  },
];

export let dockets: CourtDocket[] = [...COURT_DOCKETS];

export const passwordResetOtps: Record<string, { otp: string; expiresAt: number }> = {};

export function getMatters() {
  return matters;
}

export function createMatter(data: Omit<LegalMatter, 'id' | 'matterCode' | 'createdAt'>): LegalMatter {
  const newM: LegalMatter = {
    ...data,
    id: `m-${Date.now()}`,
    matterCode: `CLC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
  };
  matters = [newM, ...matters];
  return newM;
}

export function getMatterById(idOrCode: string) {
  return matters.find((m) => m.id === idOrCode || m.matterCode === idOrCode);
}

export function getDockets() {
  return dockets;
}

export function createPasswordResetToken(email: string): string {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  passwordResetOtps[email.toLowerCase()] = {
    otp,
    expiresAt: Date.now() + 15 * 60 * 1000,
  };
  return otp;
}

export function verifyPasswordResetToken(email: string, otp: string): boolean {
  const entry = passwordResetOtps[email.toLowerCase()];
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) return false;
  return entry.otp === otp;
}
