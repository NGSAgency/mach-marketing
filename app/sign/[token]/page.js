import { notFound } from 'next/navigation'
import { contractFeeLines } from '@/lib/contracts/feeLines.js'
import SigningForm from './SigningForm'

async function getContract(token) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const res = await fetch(`${supabaseUrl}/rest/v1/contracts?signing_token=eq.${token}&select=*`, {
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const rows = await res.json()
  if (!rows || rows.length === 0) return null
  return rows[0]
}

async function markViewed(contract) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const isFirstView = !contract.first_viewed_at

  try {
    if (isFirstView) {
      await fetch(`${supabaseUrl}/rest/v1/contracts?id=eq.${contract.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_viewed_at: new Date().toISOString(), status: 'viewed' }),
      })

      await fetch(`${supabaseUrl}/rest/v1/contract_activity`, {
        method: 'POST',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contract_id: contract.id,
          event_type: 'viewed',
          actor_type: 'client',
        }),
      })

      // Send view notification email directly (avoid unawaited fetch getting killed)
      await sendViewNotification(contract)
    }
  } catch (e) {
    // best-effort
  }
}

// The site's dark body would otherwise show through: dark text on black, and
// white text in white boxes. Every state of this page sets its own light
// background and text color.
const STATUS_PAGE = { background: '#FFFFFF', color: '#111827', colorScheme: 'light', minHeight: '100vh', padding: '80px 16px', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' }
const STATUS_BOX = { maxWidth: 600, margin: '0 auto', padding: 40, textAlign: 'center' }

export default async function SigningPage({ params }) {
  const { token } = await params
  const contract = await getContract(token)

  if (!contract) return notFound()

  // Already signed comes first: a signed contract whose signing link has since
  // passed its date should say it's signed, not that the link expired.
  if (['signed', 'countersigned', 'active'].includes(contract.status)) {
    return (
      <div style={STATUS_PAGE}>
        <div style={STATUS_BOX}>
          <div style={{ display: 'inline-block', width: 60, height: 60, borderRadius: '50%', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px' }}>✓</div>
          <h1 style={{ color: '#111827' }}>You've already signed this contract</h1>
          <p style={{ color: '#374151' }}>Signed on {new Date(contract.signed_at).toLocaleDateString()}. A copy was emailed to you.</p>
        </div>
      </div>
    )
  }

  // Check status
  if (contract.status === 'expired' || (contract.expires_at && new Date(contract.expires_at) < new Date())) {
    return (
      <div style={STATUS_PAGE}>
        <div style={STATUS_BOX}>
          <h1 style={{ color: '#111827' }}>This link has expired</h1>
          <p style={{ color: '#374151' }}>Please contact MACH Digital Solutions to receive a new contract.</p>
          <p style={{ color: '#374151', marginTop: 20 }}><a href="mailto:chris@machdigitalsolutions.com" style={{ color: '#1F3A2E' }}>chris@machdigitalsolutions.com</a></p>
        </div>
      </div>
    )
  }

  if (contract.status === 'cancelled') {
    return (
      <div style={STATUS_PAGE}>
        <div style={STATUS_BOX}>
          <h1 style={{ color: '#111827' }}>This contract has been cancelled</h1>
          <p style={{ color: '#374151' }}>Please contact MACH Digital Solutions if you believe this is a mistake.</p>
        </div>
      </div>
    )
  }

  // Mark viewed + send notification (must await to complete on Vercel serverless)
  await markViewed(contract)

  return <SigningForm contract={contract} />
}


async function sendViewNotification(contract) {
  try {
    const { sendMachEmail, MACH_TEAM } = await import('@/lib/email/template.js')

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    let clientName = 'Client'
    if (contract.client_id) {
      const clientRes = await fetch(`${supabaseUrl}/rest/v1/clients?id=eq.${contract.client_id}&select=name`, {
        headers: { 'apikey': serviceKey, 'Authorization': `Bearer ${serviceKey}` },
      })
      const rows = await clientRes.json()
      if (rows && rows[0]) clientName = rows[0].name
    }

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
          ...contractFeeLines(contract),
          ['Services', services],
        ],
      },
    })
  } catch (e) {
    // best-effort — don't block the client from viewing their contract
  }
}
