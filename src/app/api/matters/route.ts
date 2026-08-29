import { NextRequest, NextResponse } from 'next/server';
import { getMatters, createMatter, getMatterById } from '@/lib/store';
import { sendMatterIntakeConfirmation } from '@/lib/email';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    const m = getMatterById(id);
    if (!m) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, matter: m });
  }
  return NextResponse.json({ success: true, matters: getMatters() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const matter = createMatter({
      clientName: body.clientName,
      clientEntity: body.clientEntity || '',
      clientPhone: body.clientPhone,
      clientEmail: body.clientEmail || 'legal@entity.com',
      opposingParty: body.opposingParty || '',
      subjectJurisdiction: body.subjectJurisdiction || 'Delhi High Court Commercial Bench',
      estimatedClaimINR: body.estimatedClaimINR || '₹10 Cr – ₹50 Cr',
      preferredConsultationDate: body.preferredConsultationDate || '2026-09-02',
      conflictCheckPassed: true,
      notes: body.notes || '',
      status: 'conflict_cleared',
    });

    if (matter.clientEmail.includes('@')) {
      sendMatterIntakeConfirmation(matter).catch(console.error);
    }

    return NextResponse.json({ success: true, matter });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
