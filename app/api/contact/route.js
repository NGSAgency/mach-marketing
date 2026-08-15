import { NextResponse } from 'next/server'
import { sendMachEmail, MACH_TEAM } from '@/lib/email/template.js'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, company, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const escape = (s) => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

    const result = await sendMachEmail({
      to: MACH_TEAM,
      replyTo: email,
      subject: `New inquiry: ${name}${company ? ` (${company})` : ''}`,
      template: {
        kicker: 'New Inquiry',
        headline: 'You have a new lead.',
        paragraphs: [
          'Someone just reached out through machdigitalsolutions.com. Full details below.',
        ],
        details: [
          ['Name', escape(name)],
          ['Company', escape(company || '—')],
          ['Email', escape(email)],
          ['Phone', escape(phone || '—')],
          ['Message', escape(message)],
        ],
        ctaLabel: `Reply to ${escape(name)} →`,
        ctaHref: `mailto:${escape(email)}`,
      },
    })

    if (!result.ok) {
      console.error('Contact form email failed:', result.error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
