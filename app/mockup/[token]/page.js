import { fetchMockup } from '../../../lib/site/fetch.js'
import BoltHome from '../../site/[slug]/renderers/BoltHome.js'
import GroveHome from '../../site/[slug]/renderers/GroveHome.js'
import AxisHome from '../../site/[slug]/renderers/AxisHome.js'
import SereneHome from '../../site/[slug]/renderers/SereneHome.js'
import BoltServiceDetail from '../../site/[slug]/renderers/BoltServiceDetail.js'
import GroveServiceDetail from '../../site/[slug]/renderers/GroveServiceDetail.js'
import AxisServiceDetail from '../../site/[slug]/renderers/AxisServiceDetail.js'
import SereneServices from '../../site/[slug]/renderers/SereneServices.js'
import BoltCombo from '../../site/[slug]/renderers/BoltCombo.js'
import GroveCombo from '../../site/[slug]/renderers/GroveCombo.js'
import AxisCombo from '../../site/[slug]/renderers/AxisCombo.js'
import SereneCombo from '../../site/[slug]/renderers/SereneCombo.js'
import MockupBanner from './MockupBanner.js'
import MockupNav from './MockupNav.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Website Concept',
  robots: { index: false, follow: false, nocache: true },
}

const HOME = { bolt: BoltHome, grove: GroveHome, axis: AxisHome, serene: SereneHome }
const SERVICE = { bolt: BoltServiceDetail, grove: GroveServiceDetail, axis: AxisServiceDetail, serene: SereneServices }
const COMBO = { bolt: BoltCombo, grove: GroveCombo, axis: AxisCombo, serene: SereneCombo }

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

// A divider between the three pages, so the scroll reads as three distinct
// pages rather than one very long one.
function PageDivider({ label, sub }) {
  return (
    <div style={{
      background: '#050508',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '28px 24px',
      textAlign: 'center',
      fontFamily: '-apple-system, "Helvetica Neue", Arial, sans-serif',
    }}>
      <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#0851cf', fontWeight: 700, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)' }}>{sub}</div>
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
  const family = config.template_slug || 'bolt'
  const Home = HOME[family] || HOME.bolt
  const ServicePage = SERVICE[family] || SERVICE.bolt
  const ComboPage = COMBO[family] || COMBO.bolt

  const service = config.services?.[0]
  const area = config.service_areas?.[0]
  const base = `mockup/${token}`

  const offeringLabel = config.profile?.nouns?.offering?.singular || 'service'
  const placeLabel = config.profile?.nouns?.place?.singular || 'service area'

  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <MockupNav />

      <div style={{ paddingTop: 88 }}>
        <section id="home">
          <Home config={config} siteSlug={base} />
        </section>

        {service && (
          <>
            <PageDivider
              label={`${offeringLabel} page`}
              sub={`One of these for every ${offeringLabel} you offer`}
            />
            <section id="service">
              <ServicePage config={config} siteSlug={base} service={service} />
            </section>
          </>
        )}

        {service && area && (
          <>
            <PageDivider
              label="Local page"
              sub={`${service.name} in ${area} — one for every ${offeringLabel} and ${placeLabel} combination`}
            />
            <section id="combo">
              <ComboPage config={config} siteSlug={base} service={service} area={area} />
            </section>
          </>
        )}
      </div>
    </>
  )
}
