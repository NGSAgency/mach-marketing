export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Proposal | MACH Digital Solutions',
  robots: { index: false, follow: false },
}

const CC_URL = process.env.COMMAND_CENTER_URL || 'https://app.machdigitalsolutions.com'

const CTA_STYLE = {
  display: 'inline-block',
  background: '#0851cf',
  color: '#fff',
  padding: '14px 28px',
  borderRadius: 10,
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: 15,
}

async function getProposal(token) {
  try {
    const res = await fetch(`${CC_URL}/api/proposals/public?token=${encodeURIComponent(token)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function ProposalPage({ params }) {
  const { token } = await params
  const proposal = await getProposal(token)

  if (!proposal) {
    return (
      <div style={{ minHeight: '100vh', background: '#fdfaf6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, fontFamily: '-apple-system, "Helvetica Neue", Arial, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <img src="/mach-logo-dark.png" alt="MACH Digital Solutions" style={{ height: 56, width: 'auto', margin: '0 auto 32px' }} />
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 12, letterSpacing: '-0.5px' }}>
            Proposal not found
          </h1>
          <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6 }}>
            This link may have expired or been replaced. Reach out to{' '}
            <a href="mailto:sales@machdigitalsolutions.com" style={{ color: '#0851cf', textDecoration: 'none', fontWeight: 600 }}>
              sales@machdigitalsolutions.com
            </a>{' '}
            and we&apos;ll send you a fresh one.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdfaf6', padding: '40px 20px' }}>
      <div style={{ maxWidth: 850, margin: '0 auto' }}>
        <div
          style={{
            background: '#fdfaf6',
            padding: 'clamp(28px, 5vw, 60px)',
            borderRadius: 12,
            border: '1px solid rgba(0,0,0,0.08)',
          }}
          dangerouslySetInnerHTML={{ __html: proposal.html }}
        />
        <div style={{ textAlign: 'center', padding: '32px 0 8px' }}>
          <a href="mailto:sales@machdigitalsolutions.com" style={CTA_STYLE}>
            Questions? Get in touch
          </a>
        </div>
      </div>
    </div>
  )
}
