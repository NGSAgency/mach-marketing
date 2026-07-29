import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { groveTokens as T } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveFooter } from '../components/Chrome.js'
import { GroveCTA, GrovePageHero } from '../components/Blocks.js'

const DEFAULT_FAQS = [
  { question: 'Do you offer 24/7 emergency service?', answer: 'Yes. We provide 24/7 emergency service for HVAC, plumbing, and electrical needs. Call us anytime — our licensed technicians are standing by.' },
  { question: 'What areas do you serve?', answer: 'We serve the entire Kansas City metropolitan area including Kansas City, Overland Park, Leawood, Prairie Village, Olathe, Lenexa, Shawnee, Merriam, and more.' },
  { question: 'Are you licensed and insured?', answer: 'Absolutely. All our technicians are fully licensed, bonded, and insured. We hold master licenses in HVAC, plumbing, and electrical work.' },
  { question: 'Do you offer financing?', answer: 'Yes. We partner with Synchrony, Wells Fargo, and GreenSky to offer flexible financing options for larger installs and repairs.' },
  { question: 'What is your response time?', answer: 'Most emergency calls are answered within 2-4 hours. Non-emergency service calls are typically scheduled same-day or next-day depending on availability.' },
  { question: 'Do you provide free estimates?', answer: 'Yes. All installation estimates are free. Repair diagnostics have a small service fee that is waived if you choose to move forward with the recommended repair.' },
  { question: 'What certifications do your technicians have?', answer: 'Our team includes NATE-certified HVAC technicians, master plumbers, master electricians, EPA 608 certified refrigeration technicians, and Generac Elite Dealer certification for generator work.' },
  { question: 'Do you offer warranties?', answer: 'Yes. We offer a 100% satisfaction guarantee on all work. New installations include manufacturer warranties plus our labor warranty on parts and installation.' },
]

export async function generateMetadata() {
  return buildStaticMetadata(config, { slug: 'faq', title: 'FAQ', description: `Common questions about ${config.business.display_name} services and coverage areas.` }, { isPreview: true })
}

export default function FAQPage() {
  const c = config
  const faqs = c.faqs || DEFAULT_FAQS
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <JsonLd data={buildFAQSchema(faqs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader config={c} />
        <GrovePageHero eyebrow="Answers" title={<>Common <em style={{ fontStyle: 'italic', color: T.colors.accent }}>questions.</em></>} sub="What our neighbors ask most often." />

        <section style={{ background: T.colors.bgAlt, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: T.colors.bgLight, border: `1px solid ${T.colors.border}`, borderRadius: T.radius.md, padding: 28, marginBottom: 12, boxShadow: T.shadow.soft }}>
                <summary style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 500, color: T.colors.text, cursor: 'pointer', listStyle: 'none', letterSpacing: -0.3 }}>
                  {f.question}
                </summary>
                <p style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.7, marginTop: 16, marginBottom: 0 }}>
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <GroveCTA config={c} />
        <GroveFooter config={c} />
      </div>
    </>
  )
}
