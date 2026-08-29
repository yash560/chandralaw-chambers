import { PracticeArea, CourtDocket } from '@/types';

export const CHAMBERS_INFO = {
  name: 'Chandra Law Chambers & Dispute Resolution',
  shortName: 'Chandra Law Chambers',
  tagline: 'High-Stakes Commercial Litigation, Domestic & International Arbitration & Sovereign Counsel',
  managingPartner: 'Advocate Shlok Chandra',
  partnerTitle: 'Senior Standing Counsel | Advocate-on-Record Practice',
  barCouncilEnrollment: 'D/1482/2011 (Bar Council of Delhi & Supreme Court Bar Association)',
  experienceYears: 15,
  casesHandled: 2400,
  reportedJudgments: '120+ Reported Precedents',
  offices: [
    'A-22, Ground Floor, Defence Colony, New Delhi – 110024',
    'A-79, First Floor, Defence Colony, New Delhi – 110024',
  ],
  phone: '+91 99996 70588',
  altPhone: '011-47572618',
  email: 'shlokchandra@chandralawchambers.com',
  altEmail: 'admin@chandralawchambers.com',
  workingHours: 'Mon – Sat: 09:30 AM – 08:30 PM',
  notableJudgments: [
    'National Highways Authority of India vs. Progressive Construction (Section 34 ACA)',
    'Apex Logistics Corp vs. Directorate General of GST Intelligence (Writ Petition Art 226)',
    'In Re: Cross-Border Software Royalties (Section 260A Income Tax Appeal)',
  ]
};

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Vikramjit Sahney',
    designation: 'Group General Counsel, Vanguard Infrastructure Ltd',
    location: 'New Delhi',
    rating: 5,
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    review: 'Advocate Shlok Chandra’s strategic acumen in obtaining an emergency ex-parte Section 9 stay from the Delhi High Court saved our infrastructure consortium from an illegal ₹85 Crore bank guarantee invocation. Unmatched preparation and courtroom presence.',
    forum: 'Delhi High Court (Commercial Division)',
  },
  {
    id: 'rev-2',
    author: 'Rajiv Mehra',
    designation: 'Director, Singhania International Ports',
    location: 'Mumbai / Delhi',
    rating: 5,
    date: '3 months ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    review: 'In our DIAC commercial arbitration involving cross-border EPC contracts, Shlok’s cross-examination of technical expert witnesses turned the entire trajectory of the dispute in our favor. Truly an elite dispute resolution counsel.',
    forum: 'DIAC Commercial Arbitration',
  },
  {
    id: 'rev-3',
    author: 'Ananya Deshmukh',
    designation: 'Head of Tax & Legal, TransGlobal Energy Pvt Ltd',
    location: 'Gurgaon, Delhi NCR',
    rating: 5,
    date: '4 months ago',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    review: 'Having Shlok Chandra represent our direct tax appeals before the High Court gave us immense confidence. His mastery over Section 260A tax jurisprudence and transfer pricing precedents is exemplary.',
    forum: 'High Court Taxation Division',
  },
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'commercial-arbitration',
    name: 'Commercial Arbitration & Section 9/34 Applications',
    slug: 'commercial-arbitration',
    category: 'Arbitration',
    shortDesc: 'Representation in domestic and international institutional arbitrations (DIAC, SIAC, LCIA, ICC) and High Court Section 9/11/34 petitions.',
    fullDesc: 'Led by Shlok Chandra, the arbitration practice handles high-value EPC infrastructure disputes, shareholder joint-venture disagreements, and post-award enforcement under the Arbitration and Conciliation Act, 1996.',
    keyForums: ['Delhi International Arbitration Centre (DIAC)', 'Delhi High Court (Original Jurisdiction)', 'Supreme Court of India'],
    leadCounsel: 'Shlok Chandra, Managing Partner',
    statutoryActs: ['Arbitration and Conciliation Act, 1996', 'Commercial Courts Act, 2015', 'Specific Relief Act'],
    isPrimary: true,
    image: '/assets/courts/arbitration_suite.jpg',
  },
  {
    id: 'high-court-litigation',
    name: 'Constitutional Writs & Delhi High Court Commercial Appeals',
    slug: 'delhi-high-court-litigation',
    category: 'High Court',
    shortDesc: 'Article 226 Constitutional Writ Petitions, Commercial IP Suits, Injunctions, and Company Appeals before the Division Bench.',
    fullDesc: 'Regularly appearing before the Hon’ble Delhi High Court across the original civil side, appellate commercial rosters, and commercial taxation benches.',
    keyForums: ['Hon’ble High Court of Delhi (New Delhi)'],
    leadCounsel: 'Shlok Chandra & Senior Chambers Associates',
    statutoryActs: ['Constitution of India (Art 226/227)', 'Code of Civil Procedure, 1908', 'Commercial Courts Act'],
    isPrimary: true,
    image: '/assets/courts/courtroom_facade.jpg',
  },
  {
    id: 'supreme-court-appeals',
    name: 'Supreme Court Special Leave Petitions (SLPs) & Transfer Petitions',
    slug: 'supreme-court-appeals',
    category: 'Supreme Court',
    shortDesc: 'Strategic drafting and senior advocacy for Article 136 Special Leave Petitions, Civil Appeals, and Contempt Petitions.',
    fullDesc: 'Formulating nuanced constitutional arguments and precedent-setting SLPs before multi-judge constitution benches of the Supreme Court of India.',
    keyForums: ['Supreme Court of India (Tilak Marg, New Delhi)'],
    leadCounsel: 'Shlok Chandra',
    statutoryActs: ['Article 136 of the Constitution', 'Supreme Court Rules, 2013'],
    isPrimary: true,
    image: '/assets/chambers/law_library.jpg',
  },
  {
    id: 'taxation-corporate-defense',
    name: 'Direct Tax Prosecution & NCLAT Corporate Insolvency (IBC)',
    slug: 'taxation-corporate-defense',
    category: 'Taxation & Corporate',
    shortDesc: 'High-stakes Section 260A Income Tax Appeals, corporate debt restructuring (IBC), and white-collar defense.',
    fullDesc: 'Serving as Senior Standing Counsel with unmatched command over complex cross-border transfer pricing, corporate search seizures, and NCLT corporate resolution processes.',
    keyForums: ['Income Tax Appellate Tribunal (ITAT)', 'NCLAT New Delhi', 'High Court Taxation Bench'],
    leadCounsel: 'Shlok Chandra, Senior Standing Counsel',
    statutoryActs: ['Income Tax Act, 1961', 'Insolvency and Bankruptcy Code, 2016 (IBC)'],
    image: '/assets/chambers/defence_colony_office.jpg',
  },
];

export const COURT_DOCKETS: CourtDocket[] = [
  {
    id: 'd-1',
    caseNumber: 'ARB.P. 482/2026',
    matterTitle: 'Vanguard Infra JV vs. National Highways Authority',
    forum: 'Delhi High Court',
    courtRoom: 'Court No. 14 (Commercial Bench)',
    bench: 'Hon’ble Justice Rajiv Shakdher & Hon’ble Justice C. Hari Shankar',
    itemNumber: 7,
    stage: 'Final Arguments',
    hearingDate: '2026-09-02',
    status: 'listed',
  },
  {
    id: 'd-2',
    caseNumber: 'SLP (C) No. 18940/2026',
    matterTitle: 'Apex Energy Ltd. vs. Union of India & Ors.',
    forum: 'Supreme Court of India',
    courtRoom: 'Court No. 3',
    bench: 'Hon’ble Chief Justice Bench',
    itemNumber: 12,
    stage: 'Notice Motion',
    hearingDate: '2026-09-04',
    status: 'listed',
  },
  {
    id: 'd-3',
    caseNumber: 'DIAC Case No. 894/2025',
    matterTitle: 'Singhania Logistics vs. TransGlobal Ports Pvt. Ltd.',
    forum: 'DIAC Arbitration',
    courtRoom: 'Arbitration Suite A, DIAC',
    bench: 'Sole Arbitrator (Former Judge, SC of India)',
    itemNumber: 1,
    stage: 'Cross Examination',
    hearingDate: '2026-09-08',
    status: 'listed',
  },
];

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    slug: 'section-9-interim-protection-bank-guarantees',
    title: 'Restraining Invocations of Unconditional Bank Guarantees under Section 9 ACA',
    category: 'Arbitration Law',
    readTime: '6 min read',
    publishedDate: 'August 26, 2026',
    author: 'Advocate Shlok Chandra',
    excerpt: 'An exhaustive statutory analysis on proving "irretrievable injustice" and "special equities" when seeking High Court injunctions against bank guarantees.',
    heroImage: '/assets/courts/courtroom_facade.jpg',
    content: `
The invocation of an unconditional bank guarantee is traditionally viewed as independent of underlying contract disputes. However, Section 9 of the Arbitration and Conciliation Act, 1996 empowers commercial courts to grant urgent protective relief.

### 1. The Twin Exceptions: Fraud and Special Equities
To restrain a beneficiary from encashing a performance bank guarantee, Indian jurisprudence requires meeting two strict threshold tests:
- **Egregious Fraud:** Fraud of an egregious nature that vitiates the very execution of the underlying transaction.
- **Special Equities & Irretrievable Injustice:** Demonstrating that encashment would inflict irreparable financial ruin on the contractor before arbitral adjudication.

### 2. Strategic Pleadings before the Commercial Bench
In recent Division Bench rulings of the Delhi High Court, establishing mutual non-fulfillment of reciprocal obligations and arbitrary termination has provided a robust foundation for interim protection pending tribunal constitution.
    `,
  },
  {
    id: 'blog-2',
    slug: 'article-136-special-leave-petition-formulation',
    title: 'Formulating Questions of Law for Supreme Court Article 136 SLPs',
    category: 'Supreme Court Practice',
    readTime: '5 min read',
    publishedDate: 'August 14, 2026',
    author: 'Advocate Shlok Chandra',
    excerpt: 'How to structure Special Leave Petitions to survive preliminary notice hearings and convince multi-judge constitution benches.',
    heroImage: '/assets/chambers/law_library.jpg',
    content: `
Article 136 of the Constitution of India confers discretionary appellate jurisdiction upon the Supreme Court. It is not an ordinary court of regular appeal; petitions must frame substantial, unresolved questions of law with nationwide public importance.
    `,
  },
  {
    id: 'blog-3',
    slug: 'direct-tax-search-seizures-section-132',
    title: 'Navigating Section 132 Direct Tax Search & Seizure Prosecutions',
    category: 'Taxation Defense',
    readTime: '7 min read',
    publishedDate: 'July 30, 2026',
    author: 'Advocate Shlok Chandra',
    excerpt: 'Defense protocols and quashing writ petitions during high-stakes corporate income tax raids and unaccounted cash investigations.',
    heroImage: '/assets/chambers/defence_colony_office.jpg',
    content: `
Search and seizure actions initiated by the Income Tax Department under Section 132 demand immediate legal intervention. Drafting prompt Article 226 writ petitions challenging the "reasons to believe" recorded by the competent authority is critical to preventing coercive recovery.
    `,
  },
];

export const FAQS = [
  {
    question: 'How do you conduct Conflict-of-Interest screening for new litigation retainers?',
    answer: 'Before accepting any confidential brief or consultation, our registry screens all corporate parties, respondents, subsidiary entities, and promoters against our active matter database to guarantee strict compliance with Bar Council of India professional ethics.',
  },
  {
    question: 'Can Chandra Law Chambers file urgent Section 9 commercial injunctions on same-day notice?',
    answer: 'Yes. Our senior drafting and filing team is equipped to prepare emergency petitions, pay requisite court fees, and obtain urgent listing before the Hon’ble Delhi High Court Commercial Division Bench within 24 hours in exigent circumstances.',
  },
  {
    question: 'Does Advocate Shlok Chandra personally appear before the Supreme Court and High Court?',
    answer: 'Yes. Advocate Shlok Chandra personally leads oral arguments across all listed matters, Special Leave Petitions, Division Bench commercial appeals, and international arbitration hearings.',
  },
  {
    question: 'What are your fee structures for corporate retainers and brief appearances?',
    answer: 'We provide clear, transparent engagement terms including per-appearance senior advocacy fees, drafting and conference schedules, and fixed-fee retainers for long-term domestic/international institutional arbitrations.',
  },
];
