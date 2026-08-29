export interface PracticeArea {
  id: string;
  name: string;
  slug: string;
  category: 'Arbitration' | 'High Court' | 'Supreme Court' | 'Taxation & Corporate';
  shortDesc: string;
  fullDesc: string;
  keyForums: string[];
  leadCounsel: string;
  statutoryActs: string[];
  isPrimary?: boolean;
  image: string;
}

export interface CourtDocket {
  id: string;
  caseNumber: string;
  matterTitle: string;
  forum: 'Supreme Court of India' | 'Delhi High Court' | 'NCLAT' | 'DIAC Arbitration';
  courtRoom: string;
  bench: string;
  itemNumber: number;
  stage: 'Final Arguments' | 'Notice Motion' | 'Cross Examination' | 'Order Pronouncement';
  hearingDate: string;
  status: 'listed' | 'in_progress' | 'disposed' | 'reserved';
}

export interface LegalMatter {
  id: string;
  matterCode: string;
  clientName: string;
  clientEntity: string;
  clientPhone: string;
  clientEmail: string;
  opposingParty: string;
  subjectJurisdiction: string;
  estimatedClaimINR: string;
  preferredConsultationDate: string;
  conflictCheckPassed: boolean;
  notes?: string;
  status: 'conflict_cleared' | 'intake_review' | 'brief_accepted' | 'retainer_active';
  createdAt: string;
}
