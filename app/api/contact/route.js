import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, company, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const RESEND_KEY = process.env.RESEND_API_KEY
    if (!RESEND_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY missing from env', debug: 'no-key' }, { status: 500 })
    }

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #050508; border-bottom: 2px solid #3b7ce8; padding-bottom: 12px;">New contact form submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name:</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Company:</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(company || '—')}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(phone || '')}">${escapeHtml(phone || '—')}</a></td></tr>
        </table>
        <div style="margin-top: 24px; padding: 20px; background: #f5f5f7; border-radius: 8px;">
          <div style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 600;">Message</div>
          <div style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
        </div>
      </div>
    `

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'MACH Website <sales@machdigitalsolutions.com>',
        to: ['sales@machdigitalsolutions.com'],
        reply_to: email,
        subject: `New inquiry: ${name}${company ? ` (${company})` : ''}`,
        html,
      })
    })

    const respBody = await resp.text()

    if (!resp.ok) {
      return NextResponse.json({ 
        error: 'Failed to send email', 
        debug: { status: resp.status, body: respBody, keyLen: RESEND_KEY.length, keyPrefix: RESEND_KEY.slice(0, 3) }
      }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 })
  }
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"\']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "\'": '&#39;' }[c]))
}
