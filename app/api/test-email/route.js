import { NextResponse } from 'next/server'
import { TEMPLATES } from '@/lib/email/samples.js'
import { sendMachEmail } from '@/lib/email/template.js'

export async function GET(req) {
  const url = new URL(req.url)
  const templateKey = url.searchParams.get('template')
  const sendTo = url.searchParams.get('send')

  // Index page: no template selected → list everything
  if (!templateKey) {
    const rows = Object.entries(TEMPLATES).map(([key, t]) =>
      `<tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e5e5;"><a href="/api/test-email?template=${key}" style="color: #0851cf; text-decoration: none; font-weight: 600;">${t.label}</a></td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e5e5; color: #666; font-size: 13px;">${t.audience}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e5e5;"><code style="font-size: 11px; color: #666; background: #f5f5f7; padding: 2px 6px; border-radius: 3px;">${key}</code></td>
      </tr>`
    ).join('')

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>MACH Email Preview</title></head>
    <body style="font-family: -apple-system, sans-serif; max-width: 900px; margin: 40px auto; padding: 0 20px; color: #050508;">
      <h1 style="font-size: 32px; letter-spacing: -1px;">MACH Email Preview</h1>
      <p style="color: #666; line-height: 1.6;">Click a template to preview. To send a real test to yourself, append <code>&amp;send=your@email.com</code> to any preview URL.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 24px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-radius: 8px; overflow: hidden;">
        <thead><tr style="background: #f5f5f7;">
          <th style="text-align: left; padding: 12px 16px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Template</th>
          <th style="text-align: left; padding: 12px 16px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Audience</th>
          <th style="text-align: left; padding: 12px 16px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Key</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </body></html>`

    return new Response(html, { headers: { 'Content-Type': 'text/html' } })
  }

  const template = TEMPLATES[templateKey]
  if (!template) {
    return NextResponse.json({ error: `Unknown template: ${templateKey}. Available: ${Object.keys(TEMPLATES).join(', ')}` }, { status: 404 })
  }

  const html = template.build()

  // Send mode
  if (sendTo) {
    const result = await sendMachEmail({
      to: sendTo,
      subject: `[TEST] ${template.label}`,
      // The template.build() returns full HTML but sendMachEmail expects template opts
      // Bypass by sending raw HTML directly via Resend
      template: { headline: 'TEST', paragraphs: [] }, // won't be used
    })
    // Instead of the shortcut above, do a direct Resend send with the pre-rendered HTML
    const RESEND_KEY = process.env.RESEND_API_KEY
    if (!RESEND_KEY) return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 500 })

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'MACH Digital Solutions <sales@machdigitalsolutions.com>',
        to: [sendTo],
        subject: `[TEST] ${template.label}`,
        html,
      }),
    })

    if (!resp.ok) {
      const body = await resp.text()
      return NextResponse.json({ error: 'Send failed', detail: body }, { status: 500 })
    }
    return NextResponse.json({ success: true, sent_to: sendTo, template: templateKey })
  }

  // Preview mode: just render the HTML in the browser
  return new Response(html, { headers: { 'Content-Type': 'text/html' } })
}
