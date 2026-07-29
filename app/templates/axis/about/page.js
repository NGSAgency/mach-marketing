import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { axisTokens as T } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { AxisHeader, AxisFooter } from '../components/Chrome.js'
import { AxisCTA, AxisPageHero } from '../components/Blocks.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, { slug: 'about', title: 'About', description: `Family-owned since ${config.business.established_year}. Meet the ${config.business.display_name} team.` }, { isPreview: true })
}

export default function AboutPage() {
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} />
        <AxisPageHero eyebrow={`Since ${c.business.established_year}`} title={<>Built on <span style={{ color: T.colors.accent }}>trust</span>.</>} sub={`${c.business.years_in_business} years. ${c.team.size} technicians. One family.`} />

        <section style={{ background: T.colors.bgSecondary, padding: '120px 32px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <p style={{ fontSize: 32, fontWeight: 500, color: T.colors.text, lineHeight: 1.3, letterSpacing: -0.8, marginBottom: 40 }}>
              We started with a handshake, a truck, and a promise: treat every home like our own.
            </p>
            <div style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.7 }}>
              <p>{c.business.display_name} was born in {c.business.established_year}. First customer was a neighbor. Second was that neighbor's brother. Third was a referral from the second.</p>
              <p>Today we serve {c.service_areas.length}+ neighborhoods with {c.team.size} team members — but every truck still gets dispatched by someone who knows the roads by heart.</p>
              <p>{c.team.description}</p>
            </div>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 20, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Certifications</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, margin: '0 0 48px 0', lineHeight: 1.05 }}>Credentials that matter.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {c.certifications.map(cert => (
                <div key={cert.name} style={{ background: T.colors.bgSecondary, padding: 28, borderRadius: T.radius.lg, border: `1px solid ${T.colors.borderLight}` }}>
                  <div style={{ color: T.colors.accent, fontSize: 20, marginBottom: 12 }}>✓</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.colors.text, letterSpacing: -0.3 }}>{cert.name}</div>
                  <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>{cert.type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AxisCTA config={c} />
        <AxisFooter config={c} />
      </div>
    </>
  )
}
