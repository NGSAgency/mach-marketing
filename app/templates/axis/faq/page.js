import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { axisTokens as t } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { AxisHeader, AxisFooter } from '../components/Chrome.js'
import { AxisCTA, AxisPageHero } from '../components/Blocks.js'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

const DEFAULT_FAQS = [
  { question: 'Do you offer 24/7 emergency service?', answer: 'Yes. We provide 24/7 emergency service for HVAC, plumbing, and electrical needs. Call anytime.' },
  { question: 'What areas do you serve?', answer: 'We serve the entire Kansas City metropolitan area including Kansas City, Overland Park, Leawood, Prairie Village, Olathe, Lenexa, Shawnee, Merriam, and more.' },
  { question: 'Are you licensed and insured?', answer: 'Yes. All technicians are fully licensed, bonded, and insured. We hold master licenses in HVAC, plumbing, and electrical.' },
  { question: 'Do you offer financing?', answer: 'Yes. Flexible financing through Synchrony, Wells Fargo, and GreenSky for larger installs and repairs.' },
  { question: 'What is your response time?', answer: 'Emergency calls answered within 2-4 hours. Non-emergency service typically scheduled same-day or next-day.' },
  { question: 'Do you provide free estimates?', answer: 'Yes. All installation estimates are free. Repair diagnostics have a small service fee that\'s waived if you proceed with the recommended repair.' },
  { question: 'What certifications do you have?', answer: 'NATE-certified HVAC technicians, master plumbers, master electricians, EPA 608 certified, Generac Elite Dealer.' },
  { question: 'Do you offer warranties?', answer: 'Yes. 100% satisfaction guarantee on all work. New installs include manufacturer warranty plus our labor warranty.' },
]

export async function generateMetadata() {
  return buildStaticMetadata(config, { slug: 'faq', title: 'FAQ', description: `Common questions about ${config.business.display_name} services.` }, { isPreview: true })
}

export default async function FAQPage({ searchParams }) {
  const brand = await getBrandOverrides(searchParams)
  const T = applyBrand(t, brand)
  const c = config
  const faqs = c.faqs || DEFAULT_FAQS
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <JsonLd data={buildFAQSchema(faqs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} logo={brand.logo} T={T} />
        <AxisPageHero T={T} eyebrow="FAQ" title={<>Common <span style={{ color: T.colors.accent }}>questions</span>.</>} sub="What we hear most often." />

        <section style={{ background: T.colors.bgSecondary, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: T.colors.bg, border: `1px solid ${T.colors.borderLight}`, borderRadius: T.radius.lg, padding: 28, marginBottom: 12, boxShadow: T.shadow.subtle }}>
                <summary style={{ fontSize: 20, fontWeight: 700, color: T.colors.text, cursor: 'pointer', listStyle: 'none', letterSpacing: -0.3 }}>
                  {f.question}
                </summary>
                <p style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <AxisCTA T={T} config={c} />
        <AxisFooter config={c} T={T} />
      </div>
    </>
  )
}
