import { groveTokens } from '../../../templates/grove/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveCTA, GroveFooter } from './GroveServices.js'

const DEFAULT_FAQS = [
  { question: 'Do you offer 24/7 emergency service?', answer: 'Yes. Call anytime for emergency service.' },
  { question: 'Are you licensed and insured?', answer: 'Yes. Fully licensed, bonded, and insured.' },
  { question: 'Do you offer financing?', answer: 'Yes, flexible financing options are available.' },
  { question: 'What is your response time?', answer: 'Emergency calls answered within 2-4 hours. Non-emergency same-day or next-day.' },
  { question: 'Do you provide free estimates?', answer: 'All installation estimates are free.' },
  { question: 'Do you offer warranties?', answer: '100% satisfaction guarantee on all work.' },
]

export default function GroveFAQ({ config: c, siteSlug }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const faqs = DEFAULT_FAQS
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <JsonLd data={buildFAQSchema(faqs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 72px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Answers</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 72, fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.05 }}>
              Common <em style={{ fontStyle: 'italic', color: T.colors.accent }}>questions</em>.
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bgAlt, padding: '48px 32px 120px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: T.colors.bgLight, border: `1px solid ${T.colors.border}`, borderRadius: T.radius.md, padding: 28, marginBottom: 12, boxShadow: T.shadow.soft }}>
                <summary style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 500, color: T.colors.text, cursor: 'pointer', listStyle: 'none', letterSpacing: -0.3 }}>{f.question}</summary>
                <p style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <GroveCTA T={T} c={c} />
        <GroveFooter T={T} c={c} />
      </div>
    </>
  )
}
