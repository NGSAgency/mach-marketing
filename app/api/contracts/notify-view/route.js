export async function POST(request) {
  try {
    const body = await request.json()
    const { contractId } = body
    if (!contractId) return Response.json({ error: 'contractId required' }, { status: 400 })

    if (!process.env.RESEND_API_KEY) return Response.json({ success: true })

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // Get contract + client info
    const cRes = await fetch(`${supabaseUrl}/rest/v1/contracts?id=eq.${contractId}&select=*,clients(name)`, {
      headers: { 'apikey': serviceKey, 'Authorization': `Bearer ${serviceKey}` },
    })
    const rows = await cRes.json()
    if (!rows || rows.length === 0) return Response.json({ success: true })
    const contract = rows[0]

    // Notify team
    const html = `<!DOCTYPE html>
<html><body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111827; line-height: 1.6;">
  <h1 style="font-size: 20px;">Client viewed contract 👀</h1>
  <div style="background: #EFF6FF; border-left: 4px solid #60A5FA; padding: 16px; margin: 20px 0;">
    <div style="font-size: 13px; color: #1E40AF;">${contract.clients?.name || 'Client'} opened their contract</div>
    <div style="font-size: 12px; color: #4B5563; margin-top: 4px;">First viewed at ${new Date().toLocaleString()}</div>
  </div>
  <p><strong>Contract ID:</strong> ${contract.id}</p>
  <p><strong>Monthly Fee:</strong> $${contract.monthly_fee?.toLocaleString() || '?'}</p>
  <p><strong>Services:</strong> ${(contract.services || []).join(', ')}</p>
  <p>They haven't signed yet. If they don't sign within a few days, consider a follow-up.</p>
</body></html>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'MACH Digital Solutions <team@machdigitalsolutions.com>',
        to: 'chris@machdigitalsolutions.com',
        subject: `[Contract Viewed] ${contract.clients?.name || 'Client'} opened their contract`,
        html,
      }),
    })

    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
