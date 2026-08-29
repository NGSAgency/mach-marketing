import { fetchMockup } from '../../../lib/site/fetch.js'
import BoltHomeRender from '../../site/[slug]/renderers/BoltHome.js'
import GroveHomeRender from '../../site/[slug]/renderers/GroveHome.js'
import AxisHomeRender from '../../site/[slug]/renderers/AxisHome.js'
import MockupBanner from './MockupBanner.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Website Concept',
  robots: { index: false, follow: false, nocache: true },
}

const RENDERERS = {
  bolt: BoltHomeRender,
  grove: GroveHomeRender,
  axis: AxisHomeRender,
}

function Notice({ heading, body }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fdfaf6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, fontFamily: '-apple-system, "Helvetica Neue", Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: 460 }}>
        <img src="/mach-logo-dark.png" alt="MACH Digital Solutions" style={{ height: 52, width: 'auto', margin: '0 auto 28px' }} />
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 12, letterSpacing: '-0.5px' }}>{heading}</h1>
        <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6 }}>{body}</p>
        <a href="mailto:sales@machdigitalsolutions.com" style={{ display: 'inline-block', marginTop: 24, background: '#0851cf', color: '#fff', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
          Get in touch
        </a>
      </div>
    </div>
  )
}

export default async function MockupPage({ params }) {
  const { token } = await params
  const result = await fetchMockup(token)

  if (result?.error === 'expired') {
    return <Notice heading="This concept has expired" body="Concepts stay live for 30 days. Reach out and we will put together a fresh one." />
  }

  if (!result || result.error || !result.config) {
    return <Notice heading="Concept not found" body="This link may have expired or been replaced. Get in touch and we will send you a new one." />
  }

  const config = result.config
  const Renderer = RENDERERS[config.template_slug] || RENDERERS.bolt

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <div style={{ paddingTop: 44 }}>
        <Renderer config={config} siteSlug={`mockup/${token}`} />
      </div>
    </>
  )
}
