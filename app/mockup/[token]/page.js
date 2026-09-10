import { fetchMockup } from '../../../lib/site/fetch.js'
import BoltHome from '../../site/[slug]/renderers/BoltHome.js'
import GroveHome from '../../site/[slug]/renderers/GroveHome.js'
import AxisHome from '../../site/[slug]/renderers/AxisHome.js'
import SereneHome from '../../site/[slug]/renderers/SereneHome.js'
import CrewHome from '../../site/[slug]/renderers/CrewHome.js'
import MockupBanner from './MockupBanner.js'
import TemplateTabs from './TemplateTabs.js'
import { familyMode } from '../../../lib/templates/shared/brand.js'
import { boltTokens } from '../../templates/bolt/tokens.js'
import { groveTokens } from '../../templates/grove/tokens.js'
import { axisTokens } from '../../templates/axis/tokens.js'
import { sereneTokens } from '../../templates/serene/tokens.js'
import { crewTokens } from '../../templates/crew/tokens.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Website Concept',
  robots: { index: false, follow: false, nocache: true },
}

const HOME = { bolt: BoltHome, grove: GroveHome, axis: AxisHome, serene: SereneHome, crew: CrewHome }
const TOKENS = { bolt: boltTokens, grove: groveTokens, axis: axisTokens, serene: sereneTokens, crew: crewTokens }

// Tab labels describe the layout, not the family name. Serene and AXIS read
// differently for a medical practice than for a trade.
function layoutLabel(family, industry) {
  const medical = industry === 'medspa'
  return {
    serene: 'Editorial',
    axis: medical ? 'Clinical' : 'Clean',
    grove: 'Warm',
    bolt: 'Bold',
    crew: 'Local',
  }[family] || family
}

/**
 * The layouts a prospect can compare: the families suited to their industry
 * (the same list onboarding offers a client), with the concept's own family
 * first. A family not suited to the industry is never offered, which is how a
 * med spa nearly ended up on a home-services design.
 */
function layoutOptions(config) {
  const own = config.template_slug
  const suited = (config.profile?.families || []).filter(f => HOME[f])
  const keys = [...new Set([own, ...suited].filter(f => HOME[f]))]
  return keys.map(key => ({ key, label: layoutLabel(key, config.profile?.key) }))
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

export default async function MockupPage({ params, searchParams }) {
  const { token } = await params
  const query = await searchParams
  const result = await fetchMockup(token)

  if (result?.error === 'expired') {
    return <Notice heading="This concept has expired" body="Concepts stay live for 30 days. Reach out and we will put together a fresh one." />
  }

  if (!result || result.error || !result.config) {
    return <Notice heading="Concept not found" body="This link may have expired or been replaced. Get in touch and we will send you a new one." />
  }

  const config = result.config
  const options = layoutOptions(config)
  const own = config.template_slug || 'bolt'

  // A requested layout wins, provided it is one of the offered options
  const requested = query?.t
  const family = (requested && options.some(o => o.key === requested)) ? requested : own
  const Home = HOME[family] || HOME.bolt

  // Every tab renders at the lightness of the concept's own family (or the mode
  // set on the concept), so switching tabs changes the layout and nothing else.
  // Without this each family would take its own lightness and the comparison
  // would be dark against light rather than one layout against another.
  const brand = config.brand?.derive && !config.brand?.mode && family !== own && TOKENS[own]
    ? { ...config.brand, mode: familyMode(TOKENS[own]) }
    : config.brand

  // A single clickable home page rather than three pages stacked with dividers.
  // The stack read as a presentation deck; navigating a real site is far more
  // convincing, and the nav links now resolve to actual mockup routes.
  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <TemplateTabs current={family} options={options} token={token} />
      <div style={{ paddingTop: options.length > 1 ? 88 : 44 }}>
        <Home config={{ ...config, brand, template_slug: family, chrome_offset: options.length > 1 ? 88 : 44 }} siteSlug={token} />
      </div>
    </>
  )
}
