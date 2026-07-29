import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { boltTokens as t } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { BoltHeader, BoltFooter } from '../components/Chrome.js'
import { BoltCTA, BoltPageHero } from '../components/Blocks.js'
import { getBrandOverrides, applyBrand } from '../../../../lib/templates/shared/brand.js'

const DEFAULT_FAQS = [
  {
    question: 'Do you offer 24/7 emergency service?',
    answer: 'Yes. We provide 24/7 emergency service for HVAC, plumbing, and electrical needs. Call us anytime - our licensed technicians are standing by.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve the entire Kansas City metropolitan area including Kansas City, Overland Park, Leawood, Prairie Village, Olathe, Lenexa, Shawnee, Merriam, and more.'
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Absolutely. All our technicians are fully licensed, bonded, and insured. We hold master licenses in HVAC, plumbing, and electrical work.'
  },
  {
    question: 'Do you offer financing?',
    answer: 'Yes. We partner with Synchrony, Wells Fargo, and GreenSky to offer flexible financing options for larger installs and repairs.'
  },
  {
    question: 'What is your response time?',
    answer: 'Most emergency calls are answered within 2-4 hours. Non-emergency service calls are typically scheduled same-day or next-day depending on availability.'
  },
  {
    question: 'Do you provide free estimates?',
    answer: 'Yes. All installation estimates are free. Repair diagnostics have a small service fee that is waived if you choose to move forward with the recommended repair.'
  },
  {
    question: 'What certifications do your technicians have?',
    answer: 'Our team includes NATE-certified HVAC technicians, master plumbers, master electricians, EPA 608 certified refrigeration technicians, and Generac Elite Dealer certification for generator work.'
  },
  {
    question: 'Do you offer warranties?',
    answer: 'Yes. We offer a 100% satisfaction guarantee on all work. New installations include manufacturer warranties plus our labor warranty on parts and installation.'
  }
]

export async function generateMetadata() {
  return buildStaticMetadata(config, {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    description: `Common questions about ${config.business.display_name} services, pricing, and coverage areas.`
  }, { isPreview: true })
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
        <BoltHeader config={c} logo={brand.logo} T={T} />
        <BoltPageHero T={T} eyebrow="FAQ"
          title="Common Questions"
          sub="Answers to the questions we hear most from customers."
        />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: T.colors.bg, border: `1px solid ${T.colors.border}`, borderRadius: T.radius.sm, padding: 24, marginBottom: 12 }}>
                <summary style={{ fontFamily: T.fonts.display, fontSize: 20, fontWeight: 700, color: T.colors.text, textTransform: 'uppercase', letterSpacing: 0.5, cursor: 'pointer', listStyle: 'none' }}>
                  {f.question}
                </summary>
                <p style={{ fontSize: 16, color: T.colors.textDim, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <BoltCTA T={T} config={c} />
        <BoltFooter config={c} T={T} />
      </div>
    </>
  )
}
