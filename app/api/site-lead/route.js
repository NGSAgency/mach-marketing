import { NextResponse } from 'next/server'

// Contact form submissions from client sites. Validates, drops obvious bots,
// and forwards to Command Center, which knows where the client wants leads
// sent. The internal secret stays on the server.
export async function POST(req) {
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }

  const { slug, name, email, phone, message, page, company_website } = body || {}

  // Honeypot filled in: a bot. Answer as if it worked so it doesn't retry.
  if (company_website) return NextResponse.json({ ok: true })

  if (!slug || !String(name || '').trim() || !String(message || '').trim()) {
    return NextResponse.json({ error: 'Please add your name and a message.' }, { status: 400 })
  }
  if (!String(email || '').trim() && !String(phone || '').trim()) {
    return NextResponse.json({ error: 'Please add a phone number or an email so we can reply.' }, { status: 400 })
  }

  const ccUrl = process.env.COMMAND_CENTER_URL || 'https://app.machdigitalsolutions.com'
  try {
    const res = await fetch(`${ccUrl}/api/site/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-internal-secret': process.env.INTERNAL_API_SECRET || '' },
      body: JSON.stringify({ slug, lead: { name, email, phone, message, page } }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return NextResponse.json({ error: data.error || 'Your message could not be sent.' }, { status: res.status === 400 ? 400 : 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[site-lead] forward failed', e?.message)
    return NextResponse.json({ error: 'Your message could not be sent.' }, { status: 502 })
  }
}
