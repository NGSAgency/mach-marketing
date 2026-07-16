import { notFound } from 'next/navigation'
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

      // Fire view notification email (best-effort)
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://machdigitalsolutions.com'
      fetch(`${baseUrl}/api/contracts/notify-view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractId: contract.id }),
      }).catch(() => {})
    }
  } catch (e) {
    // best-effort
  }
}

export default async function SigningPage({ params }) {
  const { token } = await params
  const contract = await getContract(token)

  if (!contract) return notFound()

  // Check status
  if (contract.status === 'expired' || (contract.expires_at && new Date(contract.expires_at) < new Date())) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: 40, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ color: '#111827' }}>This link has expired</h1>
        <p style={{ color: '#6B7280' }}>Please contact MACH Digital Solutions to receive a new contract.</p>
        <p style={{ color: '#6B7280', marginTop: 20 }}><a href="mailto:chris@machdigitalsolutions.com" style={{ color: '#1F3A2E' }}>chris@machdigitalsolutions.com</a></p>
      </div>
    )
  }

  if (contract.status === 'cancelled') {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: 40, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ color: '#111827' }}>This contract has been cancelled</h1>
        <p style={{ color: '#6B7280' }}>Please contact MACH Digital Solutions if you believe this is a mistake.</p>
      </div>
    )
  }

  if (['signed', 'countersigned', 'active'].includes(contract.status)) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: 40, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'inline-block', width: 60, height: 60, borderRadius: '50%', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px' }}>✓</div>
        <h1 style={{ color: '#111827' }}>You've already signed this contract</h1>
        <p style={{ color: '#6B7280' }}>Signed on {new Date(contract.signed_at).toLocaleDateString()}. A copy was emailed to you.</p>
      </div>
    )
  }

  // Mark viewed (best-effort, don't block)
  markViewed(contract)

  return <SigningForm contract={contract} />
}
