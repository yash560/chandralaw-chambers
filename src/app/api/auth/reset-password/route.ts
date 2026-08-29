import { NextRequest, NextResponse } from 'next/server';
import { verifyPasswordResetToken } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    const isValid = verifyPasswordResetToken(email.toLowerCase().trim(), otp);
    if (!isValid) return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 400 });
    return NextResponse.json({ success: true, message: 'Password reset' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
