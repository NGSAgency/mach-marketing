import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { PREVIEW_COOKIE } from '../../../lib/site/preview.js'

// The client approving their preview or suggesting a change, from the preview
// bar. The preview token comes from the cookie set by their preview link, so
// only someone holding that link can approve. Command Center records it and
// tells the team.
export async function POST(req) {
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const token = (await cookies()).get(PREVIEW_COOKIE)?.value
  if (!token) return NextResponse.json({ error: 'Open the preview from your preview link, then try again.' }, { status: 400 })

  const { action, name, message, page } = body || {}
  const ccUrl = process.env.COMMAND_CENTER_URL || 'https://app.machdigitalsolutions.com'
  try {
    const res = await fetch(`${ccUrl}/api/site/preview-config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-internal-secret': process.env.INTERNAL_API_SECRET || '' },
      body: JSON.stringify({ token, action, name, message, page }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return NextResponse.json({ error: data.error || 'That did not send. Please try again.' }, { status: res.status === 400 || res.status === 404 ? res.status : 502 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[site-review] forward failed', e?.message)
    return NextResponse.json({ error: 'That did not send. Please try again.' }, { status: 502 })
  }
}
