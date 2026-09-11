import { loadConcept } from './concept.js'
import MockupBanner from './MockupBanner.js'
import TemplateTabs from './TemplateTabs.js'
import { rendererFor, layoutOptions } from '../../site/[slug]/renderers/registry.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Website Concept',
  robots: { index: false, follow: false, nocache: true },
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
  const { result, config, family } = await loadConcept(token, query?.t || null)

  if (result?.error === 'expired') {
    return <Notice heading="This concept has expired" body="Concepts stay live for 30 days. Reach out and we will put together a fresh one." />
  }

  if (!config) {
    return <Notice heading="Concept not found" body="This link may have expired or been replaced. Get in touch and we will send you a new one." />
  }

  // The layouts the prospect can compare, the concept's own first. Content is
  // generated once; each tab renders it through another family in the same
  // palette and lightness (loadConcept), so only the layout changes.
  const options = layoutOptions(result.config)
  const Home = rendererFor(family, 'Home')

  // A single clickable home page rather than several stacked with dividers:
  // navigating a real site is far more convincing, and the nav links resolve
  // to actual concept routes, in the same layout.
  return (
    <>
      <MockupBanner businessName={result.meta?.business_name || 'your business'} />
      <TemplateTabs current={family} options={options} token={token} />
      <div style={{ paddingTop: options.length > 1 ? 88 : 44 }}>
        <Home config={{ ...config, chrome_offset: options.length > 1 ? 88 : 44 }} siteSlug={token} />
      </div>
    </>
  )
}
