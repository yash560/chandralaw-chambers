import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const cleanEmail = email.toLowerCase().trim();

    if (cleanEmail === 'shlokchandra@chandralawchambers.com' || cleanEmail === 'admin@chandralawchambers.com' || cleanEmail === 'info@thewebvale.com') {
      return NextResponse.json({
        success: true,
        user: { id: 'counsel-1', name: 'Advocate Shlok Chandra', email: cleanEmail, role: 'counsel' },
      });
    }

    return NextResponse.json({
      success: true,
      user: { id: 'client-1', name: cleanEmail.split('@')[0], email: cleanEmail, role: 'client' },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
