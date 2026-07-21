export const runtime = 'nodejs'
export const maxDuration = 60

import crypto from 'crypto'

export async function POST(request) {
  try {
    const body = await request.json()
    const { token, signerName, signerTitle, signerEmail, consented, userAgent } = body

    if (!token || !signerName || !signerTitle || !consented) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const fetchRes = await fetch(`${supabaseUrl}/rest/v1/contracts?signing_token=eq.${token}&select=*`, {
      headers: { 'apikey': serviceKey, 'Authorization': `Bearer ${serviceKey}` },
    })
    const rows = await fetchRes.json()
    if (!rows || rows.length === 0) return Response.json({ error: 'Contract not found' }, { status: 404 })

    const contract = rows[0]

    if (['signed', 'countersigned', 'active'].includes(contract.status)) {
      return Response.json({ error: 'Already signed' }, { status: 400 })
    }

    if (contract.expires_at && new Date(contract.expires_at) < new Date()) {
      return Response.json({ error: 'Contract expired' }, { status: 400 })
    }

    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || null

    const contractHash = crypto.createHash('sha256').update(contract.rendered_html).digest('hex')
    const signedAt = new Date().toISOString()

    const updateRes = await fetch(`${supabaseUrl}/rest/v1/contracts?id=eq.${contract.id}`, {
      method: 'PATCH',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'signed',
        signed_at: signedAt,
        client_signature_name: signerName,
        client_signature_title: signerTitle,
        client_signature_email: signerEmail,
        client_signature_ip: ip,
        client_signature_user_agent: userAgent,
        client_consent_electronic: consented,
        contract_hash_at_signing: contractHash,
      }),
    })

    if (!updateRes.ok) {
      const err = await updateRes.text()
      return Response.json({ error: 'Failed to record signature: ' + err }, { status: 500 })
    }

    await fetch(`${supabaseUrl}/rest/v1/contract_activity`, {
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contract_id: contract.id,
        event_type: 'signed',
        actor_type: 'client',
        actor_id: signerEmail || signerName,
        actor_ip: ip,
        actor_user_agent: userAgent,
        metadata: {
          signer_name: signerName,
          signer_title: signerTitle,
          contract_hash: contractHash,
        },
      }),
    })

    // Refresh contract with the just-set fields (need contract_hash_at_signing for PDF audit block)
    const updatedContract = {
      ...contract,
      contract_hash_at_signing: contractHash,
      client_signature_name: signerName,
      client_signature_title: signerTitle,
      signed_at: signedAt,
    }

    // Send confirmation emails (no PDF yet - full PDF ships on countersign)
    await sendSignedNotifications({ contract, signerName, signerTitle, signerEmail, signedAt, ip })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Sign error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

async function sendSignedNotifications({ contract, signerName, signerTitle, signerEmail, signedAt, ip }) {
  if (!process.env.RESEND_API_KEY) return

  const clientHtml = `<!DOCTYPE html>
<html><body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111827; line-height: 1.6;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-size: 12px; letter-spacing: 3px; color: #1F3A2E; font-weight: 600;">MACH DIGITAL SOLUTIONS</div>
    <div style="border-bottom: 2px solid #1F3A2E; margin-top: 8px;"></div>
  </div>
  <h1 style="font-size: 24px;">Contract signed successfully</h1>
  <p>Hi ${signerName},</p>
  <p>Thank you for signing your service agreement with MACH Digital Solutions. This email confirms your signature.</p>
  <div style="background: #F9FAFB; padding: 20px; border-left: 4px solid #1F3A2E; margin: 30px 0;">
    <div style="font-size: 12px; color: #6B7280;">SIGNED BY</div>
    <div style="margin: 4px 0 12px 0;">${signerName}, ${signerTitle}</div>
    <div style="font-size: 12px; color: #6B7280;">SIGNED AT</div>
    <div style="margin-top: 4px;">${new Date(signedAt).toLocaleString('en-US', { timeZone: 'America/Chicago', timeZoneName: 'short' })}</div>
  </div>
  <p>Your signature has been recorded. Our team will review and countersign shortly. You'll receive the fully-executed contract PDF for your records once the countersignature is complete.</p>
  <p>Questions? Just reply to this email.</p>
</body></html>`

  const teamHtml = `<!DOCTYPE html>
<html><body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111827; line-height: 1.6;">
  <h1 style="font-size: 20px;">Contract signed by client 🎉</h1>
  <div style="background: #F0FDF4; border-left: 4px solid #22C55E; padding: 16px; margin: 20px 0;">
    <div style="font-size: 12px; color: #166534; font-weight: 600;">${signerName}, ${signerTitle}</div>
    <div style="font-size: 13px; color: #4B5563; margin-top: 4px;">has signed the service agreement</div>
  </div>
  <p><strong>Contract ID:</strong> ${contract.id}</p>
  <p><strong>Monthly Fee:</strong> $${contract.monthly_fee?.toLocaleString() || '?'}</p>
  <p><strong>Services:</strong> ${(contract.services || []).join(', ')}</p>
  <p><strong>Client Email:</strong> ${signerEmail || 'not provided'}</p>
  <p><strong>Client IP:</strong> ${ip || 'not captured'}</p>
  <p style="margin-top: 20px;">Head to the client detail page in the Command Center to countersign. Fully-executed PDF will be generated and sent when you countersign.</p>
</body></html>`

  const emails = []
  if (signerEmail) {
    emails.push({
      from: 'MACH Digital Solutions <team@machdigitalsolutions.com>',
      to: signerEmail,
      subject: 'Contract signed — your MACH service agreement',
      html: clientHtml,
    })
  }
  emails.push({
    from: 'MACH Digital Solutions <team@machdigitalsolutions.com>',
    to: 'chris@machdigitalsolutions.com',
    subject: `[Contract Signed] ${signerName} signed`,
    html: teamHtml,
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
}
