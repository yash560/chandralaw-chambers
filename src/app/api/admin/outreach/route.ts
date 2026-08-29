import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { CHAMBERS_INFO } from '@/lib/constants';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'info@thewebvale.com',
    pass: process.env.SMTP_PASS || 'Global5972@',
  },
});

export async function POST(req: NextRequest) {
  try {
    const { clientEmail, clientName, subject, message, matterCode } = await req.json();

    const html = `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #090d16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc;">
    <div style="max-width: 580px; margin: 40px auto; background-color: #111827; border-radius: 24px; border: 1px solid #1e293b; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <div style="font-size: 18px; font-weight: 900; color: #f59e0b;">${CHAMBERS_INFO.name}</div>
        <div style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-top: 4px; margin-bottom: 20px;">Senior Counsel Registry Communication</div>

        <h2 style="font-size: 20px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">${subject}</h2>
        <div style="font-size: 14px; color: #cbd5e1; line-height: 1.7; white-space: pre-line; margin-bottom: 24px;">
${message}
        </div>

        <div style="background-color: #172033; border-radius: 14px; padding: 16px; margin: 20px 0; border: 1px solid #1e293b; font-size: 12px; color: #94a3b8;">
            Matter Code: <strong style="color: #f59e0b; font-family: monospace;">${matterCode || 'CLC-2026-VIP'}</strong>
        </div>

        <div style="font-size: 11px; color: #94a3b8; border-top: 1px solid #1e293b; padding-top: 16px; line-height: 1.6;">
            🏛️ <strong>Chambers:</strong> ${CHAMBERS_INFO.offices[0]}<br/>
            📞 <strong>Direct Line:</strong> ${CHAMBERS_INFO.phone}
        </div>
    </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"${CHAMBERS_INFO.managingPartner}" <${process.env.SMTP_USER || 'info@thewebvale.com'}>`,
      to: clientEmail,
      subject: subject || `Litigation Communication — ${CHAMBERS_INFO.name}`,
      html,
    });

    return NextResponse.json({ success: true, message: 'Dispatched successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
