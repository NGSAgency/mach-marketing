export const runtime = 'nodejs'
export const maxDuration = 60

import crypto from 'crypto'
import { sendMachEmail, MACH_TEAM } from '@/lib/email/template.js'

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
        // The Effective Date is the date of signature. Recording it here rather
        // than guessing when the contract was sent means the document, the term
        // calculation, and the subscription all reference the same real date.
        contract_data: {
          ...(contract.contract_data || {}),
          start_date: new Date(signedAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Chicago',
          }),
        },
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
        metadata: { signer_name: signerName, signer_title: signerTitle, contract_hash: contractHash },
      }),
    })

    await sendSignedNotifications({ contract, signerName, signerTitle, signerEmail, signedAt, ip })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Sign error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

async function sendSignedNotifications({ contract, signerName, signerTitle, signerEmail, signedAt, ip }) {
  const monthly = contract.monthly_fee ? `$${Number(contract.monthly_fee).toLocaleString()}` : '—'
  const services = (contract.services || []).join(', ') || '—'
  const signedAtFormatted = new Date(signedAt).toLocaleString('en-US', { timeZone: 'America/Chicago', timeZoneName: 'short' })

  // Confirmation to client
  if (signerEmail) {
    await sendMachEmail({
      to: signerEmail,
      subject: 'Signature confirmed — MACH service agreement',
      template: {
        kicker: 'Signature Confirmed',
        headline: 'Your contract has been signed.',
        greeting: `Hi ${signerName},`,
        paragraphs: [
          'Thank you for signing your service agreement with MACH Digital Solutions. Your signature has been recorded.',
          'Our team will review and countersign shortly. Once complete, you will receive the fully-executed contract PDF for your records.',
        ],
        details: [
          ['Signed By', `${signerName}, ${signerTitle}`],
          ['Signed At', signedAtFormatted],
        ],
        footerNote: 'Questions? Just reply to this email.',
      },
    })
  }

  // Notification to team
  await sendMachEmail({
    to: MACH_TEAM,
    subject: `${contract.clients?.name || signerName} just signed`,
    template: {
      kicker: 'Client Signed',
      headline: `${signerName} just signed.`,
      paragraphs: [
        `${signerName} (${signerTitle}) has electronically signed their agreement. Head to the client detail page in Command Center to countersign. Once you countersign, the fully-executed PDF will be generated and sent automatically.`,
      ],
      details: [
        ['Signed By', `${signerName}, ${signerTitle}`],
        ['Client Email', signerEmail || 'Not provided'],
        ['Signed At', signedAtFormatted],
        ['Client IP', ip || 'Not captured'],
        ['Monthly Fee', monthly],
        ['Services', services],
      ],
    },
  })
}
