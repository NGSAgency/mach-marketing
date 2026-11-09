import { NextResponse } from 'next/server'

// Contact form submissions from client sites. Validates, drops obvious bots,
// and forwards to Command Center, which knows where the client wants leads
// sent. The internal secret stays on the server.
export async function POST(req) {
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }

  const { slug, name, email, phone, message, page, company_website, vehicle, vin, insurance, location, photos } = body || {}

  // Honeypot filled in: a bot. Answer as if it worked so it doesn't retry.
  if (company_website) return NextResponse.json({ ok: true })

  if (!slug || !String(name || '').trim() || !String(message || '').trim()) {
    return NextResponse.json({ error: 'Please add your name and a message.' }, { status: 400 })
  }
  if (!String(email || '').trim() && !String(phone || '').trim()) {
    return NextResponse.json({ error: 'Please add a phone number or an email so we can reply.' }, { status: 400 })
  }

  // Photos come shrunk by the form (a few hundred KB each). These limits stop
  // abuse; Command Center checks each one again.
  const photoList = Array.isArray(photos) ? photos : []
  if (photoList.length > 5) return NextResponse.json({ error: 'Please send up to 5 photos.' }, { status: 400 })
  if (photoList.some(p => typeof p?.data !== 'string' || !/^data:image\/(jpeg|png|webp);base64,/.test(p.data) || p.data.length > 900000) || photoList.reduce((n, p) => n + p.data.length, 0) > 4000000) {
    return NextResponse.json({ error: 'One of the photos could not be read. Try a JPG.' }, { status: 400 })
  }

  const ccUrl = process.env.COMMAND_CENTER_URL || 'https://app.machdigitalsolutions.com'
  try {
    const res = await fetch(`${ccUrl}/api/site/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-internal-secret': process.env.INTERNAL_API_SECRET || '' },
      body: JSON.stringify({ slug, lead: { name, email, phone, message, page, vehicle, vin, insurance, location, photos: photoList.map(p => ({ data: p.data })) } }),
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
