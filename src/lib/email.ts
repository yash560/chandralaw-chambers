import nodemailer from 'nodemailer';
import { LegalMatter, CourtDocket } from '@/types';
import { CHAMBERS_INFO } from './constants';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER || 'info@thewebvale.com',
    pass: process.env.SMTP_PASS || 'Global5972@',
  },
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://chandralaw.thewebvale.com';
const SENDER_EMAIL = process.env.SMTP_USER || 'info@thewebvale.com';

export async function sendPasswordResetOtpEmail(email: string, otp: string) {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #090d16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc;">
    <div style="max-width: 540px; margin: 40px auto; background-color: #111827; border-radius: 24px; border: 1px solid #1e293b; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <div style="font-size: 18px; font-weight: 900; color: #f59e0b;">${CHAMBERS_INFO.name}</div>
        <div style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-top: 4px; margin-bottom: 20px;">Client Vault Security Verification</div>

        <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">Reset Your Vault Credentials</h2>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
            Enter your 6-digit verification code to access your encrypted litigation pleadings and cause list records.
        </p>

        <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%); border: 1.5px dashed #f59e0b; border-radius: 16px; padding: 22px; text-align: center; margin: 24px 0;">
            <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">One-Time Security OTP</div>
            <div style="font-size: 34px; font-weight: 900; letter-spacing: 10px; color: #f59e0b; font-family: monospace;">${otp}</div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 8px;">⏳ Valid for 15 minutes</div>
        </div>
    </div>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${CHAMBERS_INFO.shortName} Vault" <${SENDER_EMAIL}>`,
      to: email,
      subject: `Security OTP: ${otp} — ${CHAMBERS_INFO.name}`,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function sendMatterIntakeConfirmation(matter: LegalMatter) {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #090d16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc;">
    <div style="max-width: 580px; margin: 40px auto; background-color: #111827; border-radius: 24px; border: 1px solid #1e293b; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <div style="font-size: 18px; font-weight: 900; color: #f59e0b;">${CHAMBERS_INFO.name}</div>
        <div style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-top: 4px; margin-bottom: 20px;">Confidential Retainer & Matter Intake Verification</div>

        <h2 style="font-size: 20px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">Conflict Cleared & Brief Registered</h2>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
            Your confidential brief has been preliminary cleared for conflict-of-interest and placed before <strong>${CHAMBERS_INFO.managingPartner}</strong>.
        </p>

        <div style="background-color: #172033; border-radius: 16px; padding: 20px; margin: 20px 0; border: 1px solid #1e293b; font-size: 13px;">
            <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase;">Matter Docket Reference</div>
            <div style="font-size: 24px; font-weight: 900; color: #ffffff; font-family: monospace; margin: 4px 0 12px 0;">${matter.matterCode}</div>
            
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="color: #cbd5e1; font-size: 13px;">
                <tr><td style="padding: 4px 0; color: #94a3b8;">Client Entity:</td><td style="font-weight: bold; color: #ffffff;" align="right">${matter.clientEntity || matter.clientName}</td></tr>
                <tr><td style="padding: 4px 0; color: #94a3b8;">Opposing Party:</td><td style="font-weight: bold; color: #ffffff;" align="right">${matter.opposingParty}</td></tr>
                <tr><td style="padding: 4px 0; color: #94a3b8;">Subject / Forum:</td><td style="font-weight: bold; color: #ffffff;" align="right">${matter.subjectJurisdiction}</td></tr>
                <tr><td style="padding: 4px 0; color: #94a3b8;">Claim Value:</td><td style="font-weight: bold; color: #f59e0b;" align="right">${matter.estimatedClaimINR}</td></tr>
                <tr><td style="padding: 4px 0; color: #94a3b8;">Consultation Date:</td><td style="font-weight: bold; color: #ffffff;" align="right">${matter.preferredConsultationDate}</td></tr>
            </table>
        </div>

        <div style="font-size: 11px; color: #94a3b8; border-top: 1px solid #1e293b; padding-top: 16px; line-height: 1.6;">
            🏛️ <strong>Chambers:</strong> ${CHAMBERS_INFO.offices[0]}<br/>
            📞 <strong>Direct Senior Registry:</strong> ${CHAMBERS_INFO.phone} | ${CHAMBERS_INFO.altPhone}
        </div>
    </div>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${CHAMBERS_INFO.shortName}" <${SENDER_EMAIL}>`,
      to: matter.clientEmail,
      subject: `Confidential Brief Docket: ${matter.matterCode} — ${CHAMBERS_INFO.name}`,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
