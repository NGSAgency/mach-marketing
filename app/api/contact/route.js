import { NextResponse } from 'next/server'
import { sendMachEmail, MACH_TEAM } from '@/lib/email/template.js'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, company, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Split "First Last" into parts
    const nameParts = String(name).trim().split(/\s+/)
    const first_name = nameParts[0] || null
    const last_name = nameParts.slice(1).join(' ') || null

    // 1. Create prospect record in Command Center (best-effort; don't block on failure)
    let prospectId = null
    try {
      const ccUrl = process.env.COMMAND_CENTER_URL || 'https://app.machdigitalsolutions.com'
      const resp = await fetch(`${ccUrl}/api/prospects/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone: phone || null,
          company_name: company || null,
          source: 'website',
          source_details: 'Contact form on machdigitalsolutions.com',
          notes: message,
        }),
      })
      if (resp.ok) {
        const data = await resp.json()
        prospectId = data?.prospect?.id || null
      } else {
        console.error('Prospect creation failed:', resp.status, await resp.text())
      }
    } catch (err) {
      console.error('Prospect creation error (non-blocking):', err)
    }

    // 1b. Create primary contact on the prospect (best-effort)
    if (prospectId) {
      try {
        const ccUrl = process.env.COMMAND_CENTER_URL || 'https://app.machdigitalsolutions.com'
        await fetch(`${ccUrl}/api/prospects/contact-create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prospectId,
            first_name,
            last_name,
            email,
            phone: phone || null,
            is_primary: true,
          }),
        })
      } catch (err) {
        console.error('Contact creation error (non-blocking):', err)
      }
    }

    // 2. Send notification email to team with link to prospect (if created)
    const escape = (s) => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
    const details = [
      ['Name', escape(name)],
      ['Company', escape(company || '—')],
      ['Email', escape(email)],
      ['Phone', escape(phone || '—')],
      ['Message', escape(message)],
    ]
    if (prospectId) {
      details.push(['Prospect ID', prospectId])
    }

    const ctaLabel = prospectId ? 'View in Command Center →' : `Reply to ${escape(name)} →`
    const ctaHref = prospectId
      ? `https://app.machdigitalsolutions.com/prospects/${prospectId}`
      : `mailto:${escape(email)}`

    const result = await sendMachEmail({
      to: MACH_TEAM,
      replyTo: email,
      subject: `New inquiry: ${name}${company ? ` (${company})` : ''}`,
      template: {
        kicker: 'New Inquiry',
        headline: 'You have a new lead.',
        paragraphs: [
          prospectId
            ? 'Someone reached out through machdigitalsolutions.com. A prospect record has been created in Command Center — full details below.'
            : 'Someone reached out through machdigitalsolutions.com. Full details below.',
        ],
        details,
        ctaLabel,
        ctaHref,
      },
    })

    if (!result.ok) {
      console.error('Contact form email failed:', result.error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, prospectId })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
