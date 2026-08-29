import { NextRequest, NextResponse } from 'next/server';
import { createPasswordResetToken } from '@/lib/store';
import { sendPasswordResetOtpEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const cleanEmail = email.toLowerCase().trim();
    const otp = createPasswordResetToken(cleanEmail);
    await sendPasswordResetOtpEmail(cleanEmail, otp);
    return NextResponse.json({ success: true, message: 'OTP sent' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
