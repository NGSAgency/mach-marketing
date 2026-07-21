export const runtime = 'nodejs'
export const maxDuration = 60

import { generateFullyExecutedPdf } from '../../../lib/pdf.js'

export async function POST(request) {
  try {
    const { contractId } = await request.json()
    if (!contractId) return Response.json({ error: 'contractId required' }, { status: 400 })

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const res = await fetch(`${supabaseUrl}/rest/v1/contracts?id=eq.${contractId}&select=*,clients(name,primary_contact_email)`, {
      headers: { 'apikey': serviceKey, 'Authorization': `Bearer ${serviceKey}` },
    })
    const rows = await res.json()
    if (!rows || rows.length === 0) return Response.json({ error: 'Contract not found' }, { status: 404 })
    const contract = rows[0]

    if (contract.status !== 'active') {
      return Response.json({ error: 'Contract must be in active status (countersigned)' }, { status: 400 })
    }

    const pdfBuffer = await generateFullyExecutedPdf(contract)

    const clientEmail = contract.client_signature_email || contract.clients?.primary_contact_email
    const clientName = contract.client_signature_name || contract.clients?.name || 'Client'
    const attachments = [{
      filename: 'fully-executed-contract.pdf',
      content: Buffer.from(pdfBuffer).toString('base64'),
    }]

    const clientHtml = `<!DOCTYPE html>
<html><body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111827; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-size: 12px; letter-spacing: 3px; color: #1F3A2E; font-weight: 600;">MACH DIGITAL SOLUTIONS</div>
    <div style="border-bottom: 2px solid #1F3A2E; margin-top: 8px;"></div>
  </div>
  <h1 style="font-size: 24px;">🎉 Your contract is fully executed</h1>
  <p>Hi ${clientName},</p>
  <p>Your service agreement with MACH Digital Solutions has been countersigned by our team and is now fully executed.</p>
  <div style="background: #F0FDF4; padding: 20px; border-left: 4px solid #22C55E; margin: 30px 0;">
    <div style="font-size: 12px; color: #166534; font-weight: 600;">FULLY EXECUTED</div>
    <div style="margin-top: 8px; font-size: 14px;">Countersigned by ${contract.countersigned_name}, ${contract.countersigned_title}</div>
    <div style="margin-top: 4px; font-size: 13px; color: #4B5563;">${new Date(contract.countersigned_at).toLocaleString()}</div>
  </div>
  <p>Your fully-executed contract is attached to this email. Please keep it for your records.</p>
  <p>Our team will be in touch shortly to kick off your onboarding. Welcome aboard!</p>
</body></html>`

    const teamHtml = `<!DOCTYPE html>
<html><body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111827; line-height: 1.6;">
  <h1 style="font-size: 20px;">Contract fully executed 🎉</h1>
  <div style="background: #F0FDF4; border-left: 4px solid #22C55E; padding: 16px; margin: 20px 0;">
    <div style="font-size: 13px; color: #166534;">${clientName} contract is now active</div>
    <div style="font-size: 12px; color: #4B5563; margin-top: 4px;">Countersigned by ${contract.countersigned_name}</div>
  </div>
  <p><strong>Client:</strong> ${contract.clients?.name || clientName}</p>
  <p><strong>Monthly Fee:</strong> $${contract.monthly_fee?.toLocaleString() || '?'}</p>
  <p><strong>Services:</strong> ${(contract.services || []).join(', ')}</p>
  <p><strong>Start Date:</strong> ${contract.start_date || 'per contract'}</p>
  <p style="margin-top: 30px;">Fully-executed PDF attached. Time to kick off onboarding.</p>
</body></html>`

    const emails = []
    if (clientEmail) {
      emails.push({
        from: 'MACH Digital Solutions <team@machdigitalsolutions.com>',
        to: clientEmail,
        subject: '🎉 Your MACH service agreement is fully executed',
        html: clientHtml,
        attachments,
      })
    }
    emails.push({
      from: 'MACH Digital Solutions <team@machdigitalsolutions.com>',
      to: 'chris@machdigitalsolutions.com',
      subject: `[Fully Executed] ${clientName} contract active`,
      html: teamHtml,
      attachments,
    })

    for (const email of emails) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(email),
        })
      } catch (e) {
        console.error('Email send failed:', e)
      }
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Fully-execute error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
