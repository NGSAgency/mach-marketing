import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { boltTokens as T } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { BoltHeader, BoltFooter } from '../components/Chrome.js'
import { BoltCTA, BoltPageHero } from '../components/Blocks.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, {
    slug: 'about',
    title: 'About Us',
    description: `Family-owned since ${config.business.established_year}. Meet the ${config.business.display_name} team serving ${config.primary_service_area}.`
  }, { isPreview: true })
}

export default function AboutPage() {
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader config={c} />
        <BoltPageHero
          eyebrow={`Family-Owned Since ${c.business.established_year}`}
          title={<>Who We Are</>}
          sub={`${c.business.years_in_business}+ years serving ${c.primary_service_area} with honest, professional home services.`}
        />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 36, fontWeight: 700, letterSpacing: -0.5, textTransform: 'uppercase', margin: '0 0 24px 0' }}>Our Story</h2>
            <div style={{ fontSize: 17, color: T.colors.textDim, lineHeight: 1.7 }}>
              <p>{c.business.display_name} started in {c.business.established_year} with a simple promise: treat every customer's home like our own. What began as a small family operation has grown into one of the most trusted home services companies in {c.primary_service_area}, but our commitment to that original promise hasn't changed.</p>
              <p>Today, our team of {c.team.size} licensed professionals responds to service calls across {c.service_areas.length}+ neighborhoods, delivering the same personal care and quality workmanship we've been known for since day one.</p>
            </div>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 36, fontWeight: 700, letterSpacing: -0.5, textTransform: 'uppercase', margin: '0 0 40px 0' }}>Our Certifications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {c.certifications.map(cert => (
                <div key={cert.name} style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 24, borderRadius: T.radius.sm }}>
                  <div style={{ color: T.colors.accent, fontSize: 20, marginBottom: 8 }}>✓</div>
                  <div style={{ fontFamily: T.fonts.display, fontSize: 16, fontWeight: 700, color: T.colors.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>{cert.name}</div>
                  <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 }}>{cert.type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BoltCTA config={c} />
        <BoltFooter config={c} />
      </div>
    </>
  )
}
