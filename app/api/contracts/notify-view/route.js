import { sendMachEmail, MACH_TEAM } from '@/lib/email/template.js'

export async function POST(request) {
  try {
    const body = await request.json()
    const { contractId } = body
    if (!contractId) return Response.json({ error: 'contractId required' }, { status: 400 })

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const cRes = await fetch(`${supabaseUrl}/rest/v1/contracts?id=eq.${contractId}&select=*,clients(name)`, {
      headers: { 'apikey': serviceKey, 'Authorization': `Bearer ${serviceKey}` },
    })
    const rows = await cRes.json()
    if (!rows || rows.length === 0) return Response.json({ success: true })
    const contract = rows[0]

    const clientName = contract.clients?.name || 'Client'
    const monthly = contract.monthly_fee ? `$${Number(contract.monthly_fee).toLocaleString()}` : '—'
    const services = (contract.services || []).join(', ') || '—'
    const viewedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', timeZoneName: 'short' })

    await sendMachEmail({
      to: MACH_TEAM,
      subject: `${clientName} just opened the contract`,
      template: {
        kicker: 'Contract Viewed',
        headline: `${clientName} just opened the contract.`,
        paragraphs: [
          `${clientName} viewed their contract for the first time. This is a great moment to follow up if you haven't heard back in a day or two.`,
        ],
        details: [
          ['Client', clientName],
          ['Viewed At', viewedAt],
          ['Monthly Fee', monthly],
          ['Services', services],
        ],
      },
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('notify-view error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
