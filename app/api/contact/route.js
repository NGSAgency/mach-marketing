export async function POST(request) {
  const body = await request.json()
  const { name, email, company, message } = body

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: 'Email not configured' }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'MACH Digital Solutions <leads@machdigitalsolutions.com>',
        to: ['chris@machdigitalsolutions.com'],
        reply_to: email,
        subject: `New inquiry from ${name}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; padding: 20px;">
            <h2 style="margin-bottom: 20px;">New inquiry received</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; font-weight: 600; width: 100px;">Name</td><td>${name}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: 600;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
              ${company ? `<tr><td style="padding: 6px 0; font-weight: 600;">Company</td><td>${company}</td></tr>` : ''}
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">${message}</div>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return Response.json({ error: err }, { status: res.status })
    }

    // Send auto-reply confirmation to the person who submitted
    try {
      const firstName = String(name || '').trim().split(/\s+/)[0] || 'there'
      const autoReplyHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1f2937;">
  <div style="margin-bottom: 32px;">
    <h1 style="font-size: 22px; font-weight: 600; color: #111827; margin: 0; letter-spacing: -0.01em;">MACH Digital Solutions</h1>
  </div>
  <div style="font-size: 15px; line-height: 1.6; color: #374151;">
    <p>Hi ${firstName},</p>
    <p>Thanks for reaching out — we got your message and one of us will be in touch within one business day.</p>
    <p>In the meantime, if you want to add anything (like the URL of your current site or specific goals you're trying to hit), just reply to this email.</p>
    <p>Talk soon,<br />The MACH Team</p>
  </div>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0 20px 0;" />
  <div style="font-size: 12px; color: #9ca3af; line-height: 1.5;">
    MACH Digital Solutions<br />
    Kansas City &middot; Boston<br />
    <a href="https://machdigitalsolutions.com" style="color: #9ca3af; text-decoration: none;">machdigitalsolutions.com</a>
  </div>
</div>
      `.trim()
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'The MACH Team <team@machdigitalsolutions.com>',
          to: [email],
          subject: 'Got your inquiry — we will be in touch shortly',
          html: autoReplyHtml,
        }),
      })
    } catch (e) {
      console.warn('Auto-reply failed:', e)
    }

    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
