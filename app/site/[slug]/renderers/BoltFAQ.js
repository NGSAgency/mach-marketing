import { boltTokens } from '../../../templates/bolt/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { BoltHeader, BoltCTA, BoltFooter } from './BoltServices.js'

const DEFAULT_FAQS = [
  { question: 'Do you offer 24/7 emergency service?', answer: 'Yes. We provide 24/7 emergency service. Call anytime.' },
  { question: 'Are you licensed and insured?', answer: 'Yes. Fully licensed, bonded, and insured.' },
  { question: 'Do you offer financing?', answer: 'Yes, we offer flexible financing options.' },
  { question: 'What is your response time?', answer: 'Emergency calls answered within 2-4 hours. Non-emergency same-day or next-day.' },
  { question: 'Do you provide free estimates?', answer: 'Yes. All installation estimates are free.' },
  { question: 'Do you offer warranties?', answer: '100% satisfaction guarantee on all work.' },
]

export default function BoltFAQ({ config: c, siteSlug }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const faqs = DEFAULT_FAQS
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <JsonLd data={buildFAQSchema(faqs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 64, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0 }}>
              Common <span style={{ color: T.colors.accent }}>questions</span>
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, borderLeft: `4px solid ${T.colors.accent}`, padding: 24, marginBottom: 12 }}>
                <summary style={{ fontFamily: T.fonts.display, fontSize: 18, fontWeight: 700, color: T.colors.text, textTransform: 'uppercase', letterSpacing: 0.5, cursor: 'pointer' }}>{f.question}</summary>
                <p style={{ fontSize: 16, color: T.colors.textDim, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <BoltCTA T={T} c={c} />
        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}
