// =========================================================
// MACH SHARED EMAIL TEMPLATE (Option 5: Gradient Bold)
// Used by all outgoing emails from both marketing site + Command Center
// Update this one file to change the look across all emails.
// =========================================================

export function renderEmail(opts) {
  const {
    kicker = 'Notification',
    headline,
    greeting,
    paragraphs = [],
    details,
    ctaLabel,
    ctaHref = '#',
    footerNote,
  } = opts

  const escapeAttr = (s) => String(s || '').replace(/[&<>"\']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "\'": '&#39;'
  }[c]))

  const paragraphsHtml = paragraphs.map(p =>
    `<p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0 0 16px 0;">${p}</p>`
  ).join('')

  const greetingHtml = greeting
    ? `<p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0 0 16px 0;">${greeting}</p>`
    : ''

  let detailsHtml = ''
  if (details && details.length > 0) {
    const rows = details.map(([label, value], i) => {
      const border = i < details.length - 1 ? 'border-bottom: 1px solid #e5e5e5;' : ''
      return `<div style="display: flex; padding: 10px 0; ${border}"><div style="flex: 0 0 140px; color: #666; font-size: 13px; font-weight: 500;">${label}</div><div style="font-weight: 700; color: #050508; font-size: 14px; flex: 1;">${value}</div></div>`
    }).join('')
    detailsHtml = `<div style="background: #f5f5f7; border-radius: 12px; padding: 24px; margin: 24px 0;">${rows}</div>`
  }

  const ctaHtml = ctaLabel
    ? `<a href="${escapeAttr(ctaHref)}" style="display: inline-block; background: linear-gradient(135deg, #3b7ce8, #0851cf); color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 8px 24px rgba(8,81,207,0.3); margin-top: 8px;">${escapeAttr(ctaLabel)}</a>`
    : ''

  const footerNoteHtml = footerNote
    ? `<p style="font-size: 13px; color: #666; line-height: 1.6; margin: 24px 0 0 0;">${footerNote}</p>`
    : ''

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MACH Digital Solutions</title>
</head>
<body style="margin: 0; padding: 40px 20px; background: #eaeaef; font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;">
<div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.08);">
  <div style="background: linear-gradient(135deg, #050508 0%, #0851cf 100%); padding: 40px; position: relative; overflow: hidden;">
    <div style="position: relative;">
      <img src="https://machdigitalsolutions.com/mach-logo-main.png" alt="MACH" style="height: 40px; width: auto; display: block; margin-bottom: 24px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.7); letter-spacing: 2px; text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">${escapeAttr(kicker)}</div>
      <h1 style="font-size: 32px; font-weight: 800; letter-spacing: -1.5px; line-height: 1.15; margin: 0; color: #ffffff;">${headline}</h1>
    </div>
  </div>
  <div style="padding: 40px;">
    ${greetingHtml}
    ${paragraphsHtml}
    ${detailsHtml}
    ${ctaHtml}
    ${footerNoteHtml}
  </div>
  <div style="padding: 32px 40px; background: #f5f5f7; text-align: center;">
    <div style="color: #909098; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">MACH Digital Solutions</div>
    <div style="color: #909098; font-size: 12px;">Kansas City · Boston · <a href="https://machdigitalsolutions.com" style="color: #0851cf; text-decoration: none;">machdigitalsolutions.com</a></div>
  </div>
</div>
</body>
</html>`
}

export async function sendMachEmail(opts) {
  const { to, subject, replyTo, from, template, attachments } = opts

  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) {
    console.error('RESEND_API_KEY is not set')
    return { ok: false, error: 'RESEND_API_KEY not configured' }
  }

  const html = renderEmail(template)

  const payload = {
    from: from || 'MACH Digital Solutions <sales@machdigitalsolutions.com>',
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  }
  if (replyTo) payload.reply_to = replyTo
  if (attachments) payload.attachments = attachments

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const text = await resp.text()
    if (!resp.ok) {
      console.error('Resend send failed:', resp.status, text)
      return { ok: false, error: `Resend ${resp.status}: ${text}` }
    }

    let data = {}
    try { data = JSON.parse(text) } catch {}
    return { ok: true, id: data.id }
  } catch (err) {
    console.error('sendMachEmail error:', err)
    return { ok: false, error: err.message }
  }
}


// =========================================================
// TEAM ROSTER
// Central place to add/remove team members from internal notifications.
// Update this array when the team changes.
// =========================================================
export const MACH_TEAM = [
  'chris@machdigitalsolutions.com',
  'mark@machdigitalsolutions.com',
  'sawyer@machdigitalsolutions.com',
]

// Convenience aliases
export const MACH_SALES = 'sales@machdigitalsolutions.com'
export const MACH_FROM = 'MACH Digital Solutions <sales@machdigitalsolutions.com>'
