// src/lib/email.ts
// Email notification service using Resend
// Falls back gracefully if RESEND_API_KEY is not configured

import { Lead } from '@/types';

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  skipped?: boolean;
}

export async function sendCustomerConfirmationEmail(lead: Lead): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.log('[Email] RESEND_API_KEY not configured. Skipping customer confirmation email.');
    return { success: false, skipped: true, error: 'Email service not configured' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Cynbit Smart Discovery <noreply@cynbit.in>',
      to: lead.email,
      subject: 'Your Project Enquiry Has Been Received – Cynbit Smart Discovery',
      html: buildCustomerEmailHtml(lead),
    });

    if (error) {
      console.error('[Email] Failed to send customer confirmation:', error);
      return { success: false, error: error.message };
    }

    console.log('[Email] Customer confirmation sent:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error('[Email] Unexpected error:', err);
    return { success: false, error: 'Unexpected email error' };
  }
}

export async function sendAdminNotificationEmail(lead: Lead): Promise<EmailResult> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!process.env.RESEND_API_KEY || !adminEmail) {
    console.log('[Email] RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL not configured. Skipping admin notification.');
    return { success: false, skipped: true, error: 'Email service not configured' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Cynbit Smart Discovery <noreply@cynbit.in>',
      to: adminEmail,
      subject: `[New Lead] ${lead.referenceId} – ${lead.priorityLevel} Priority – ${lead.fullName}`,
      html: buildAdminEmailHtml(lead),
    });

    if (error) {
      console.error('[Email] Failed to send admin notification:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error('[Email] Unexpected error:', err);
    return { success: false, error: 'Unexpected email error' };
  }
}

function buildCustomerEmailHtml(lead: Lead): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; margin: 0; padding: 0; background: #f8fafc; }
  .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 32px; text-align: center; }
  .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 700; }
  .header p { color: #94a3b8; margin: 8px 0 0; }
  .body { padding: 32px; }
  .ref-box { background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0; }
  .ref-id { font-size: 28px; font-weight: 800; color: #0ea5e9; letter-spacing: 2px; }
  .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
  .label { color: #64748b; font-size: 14px; }
  .value { color: #1a1a2e; font-size: 14px; font-weight: 600; }
  .steps { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0; }
  .step { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
  .step-num { background: #1a1a2e; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
  .footer { background: #f8fafc; padding: 24px 32px; text-align: center; color: #64748b; font-size: 13px; }
  .badge { display: inline-block; background: #dcfce7; color: #16a34a; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>Cynbit Smart Discovery</h1>
      <p>Intelligent Project Enquiry System</p>
    </div>
    <div class="body">
      <p>Dear <strong>${lead.fullName}</strong>,</p>
      <p>Thank you for submitting your project enquiry. We have received your request and our team will review it shortly.</p>
      <div class="ref-box">
        <p style="margin:0 0 8px; color:#64748b; font-size:14px;">Your Enquiry Reference ID</p>
        <div class="ref-id">${lead.referenceId}</div>
        <p style="margin:8px 0 0; color:#64748b; font-size:12px;">Save this ID to track your enquiry</p>
      </div>
      <div class="info-row"><span class="label">Project Goal</span><span class="value">${lead.projectGoal}</span></div>
      <div class="info-row"><span class="label">Company</span><span class="value">${lead.companyName}</span></div>
      <div class="info-row"><span class="label">Budget</span><span class="value">${lead.budgetRange}</span></div>
      <div class="info-row"><span class="label">Timeline</span><span class="value">${lead.expectedTimeline}</span></div>
      <div class="info-row" style="border:none">
        <span class="label">Recommended Service</span>
        <span class="badge">${lead.recommendedService}</span>
      </div>
      <div class="steps">
        <strong style="font-size:15px">What happens next?</strong>
        <div class="step" style="margin-top:16px"><div class="step-num">1</div><div>Our team will review your project requirements within 1–2 business days.</div></div>
        <div class="step"><div class="step-num">2</div><div>A Cynbit representative will contact you via ${lead.preferredContactMethod}.</div></div>
        <div class="step"><div class="step-num">3</div><div>We will schedule a discovery call to discuss your project in detail.</div></div>
        <div class="step" style="margin:0"><div class="step-num">4</div><div>You will receive a detailed proposal tailored to your requirements.</div></div>
      </div>
      <p style="color:#64748b; font-size:14px">If you have urgent questions, please visit <a href="https://www.cynbit.in" style="color:#0ea5e9">www.cynbit.in</a> or reply to this email.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Cynbit Technologies. All rights reserved.</p>
      <p style="margin:4px 0 0">This is an automated message from Cynbit Smart Discovery prototype.</p>
    </div>
  </div>
</body>
</html>`;
}

function buildAdminEmailHtml(lead: Lead): string {
  const priorityColor = lead.priorityLevel === 'High' ? '#dc2626' : lead.priorityLevel === 'Medium' ? '#d97706' : '#16a34a';
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; margin: 0; padding: 0; background: #f8fafc; }
  .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { background: #1a1a2e; padding: 24px 32px; }
  .header h1 { color: white; margin: 0; font-size: 18px; }
  .priority-badge { display: inline-block; color: white; padding: 4px 16px; border-radius: 20px; font-weight: 700; font-size: 14px; background: ${priorityColor}; }
  .body { padding: 32px; }
  .row { display: flex; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
  .label { color: #64748b; font-size: 14px; width: 180px; flex-shrink: 0; }
  .value { color: #1a1a2e; font-size: 14px; font-weight: 500; }
  .desc { background: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0; font-size: 14px; line-height: 1.6; }
  .score { font-size: 32px; font-weight: 800; color: ${priorityColor}; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 New Project Enquiry Received</h1>
      <p style="color:#94a3b8;margin:4px 0 12px">Cynbit Smart Discovery System</p>
      <span class="priority-badge">${lead.priorityLevel} Priority</span>
      <span style="color:#94a3b8;margin-left:12px;font-size:14px">${lead.referenceId}</span>
    </div>
    <div class="body">
      <div style="text-align:center;margin-bottom:24px">
        <div class="score">${lead.priorityScore}/100</div>
        <div style="color:#64748b;font-size:14px">Priority Score</div>
      </div>
      <div class="row"><span class="label">Full Name</span><span class="value">${lead.fullName}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${lead.email}</span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${lead.phone}</span></div>
      <div class="row"><span class="label">Company</span><span class="value">${lead.companyName}</span></div>
      <div class="row"><span class="label">Industry</span><span class="value">${lead.industry}</span></div>
      <div class="row"><span class="label">Company Size</span><span class="value">${lead.companySize}</span></div>
      <div class="row"><span class="label">Project Goal</span><span class="value">${lead.projectGoal}</span></div>
      <div class="row"><span class="label">Budget</span><span class="value">${lead.budgetRange}</span></div>
      <div class="row"><span class="label">Timeline</span><span class="value">${lead.expectedTimeline}</span></div>
      <div class="row"><span class="label">Recommended Service</span><span class="value">${lead.recommendedService}</span></div>
      <div class="row" style="border:none"><span class="label">Contact Preference</span><span class="value">${lead.preferredContactMethod}</span></div>
      <strong style="display:block;margin:16px 0 8px">Project Description</strong>
      <div class="desc">${lead.projectDescription}</div>
      <strong style="display:block;margin:16px 0 8px">Recommendation Reason</strong>
      <div class="desc">${lead.recommendationReason}</div>
    </div>
  </div>
</body>
</html>`;
}

