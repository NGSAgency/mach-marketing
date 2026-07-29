import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { groveTokens as T } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveFooter } from '../components/Chrome.js'
import { GroveCTA, GrovePageHero } from '../components/Blocks.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, { slug: 'about', title: 'About Us', description: `Family-owned since ${config.business.established_year}. Meet the ${config.business.display_name} team serving ${config.primary_service_area}.` }, { isPreview: true })
}

export default function AboutPage() {
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader config={c} />
        <GrovePageHero eyebrow={`Family-owned since ${c.business.established_year}`} title={<>Who <em style={{ fontStyle: 'italic', color: T.colors.accent }}>we are.</em></>} sub={`${c.business.years_in_business}+ years, ${c.team.size} people, one family.`} />

        <section style={{ background: T.colors.bgAlt, padding: '96px 32px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ fontSize: 20, color: T.colors.text, lineHeight: 1.7 }}>
              <p style={{ fontFamily: T.fonts.display, fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: T.colors.accent, lineHeight: 1.35, marginBottom: 40 }}>
                "We treat every home like our own. That's how it started, and that's how it's stayed."
              </p>
              <p style={{ color: T.colors.textDim, fontSize: 18 }}>{c.business.display_name} started in {c.business.established_year} in a garage on the east side of {c.primary_service_area}. First customer was a neighbor. Second customer was that neighbor's friend. Third was that friend's mom.</p>
              <p style={{ color: T.colors.textDim, fontSize: 18 }}>Today we serve {c.service_areas.length}+ neighborhoods across the metro with {c.team.size} team members. The truck fleet grew, but the neighbor-to-neighbor way of working stayed the same.</p>
              <p style={{ color: T.colors.textDim, fontSize: 18 }}>{c.team.description}</p>
            </div>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '96px 32px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Certifications</div>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 500, letterSpacing: -1.5, margin: '0 0 48px 0', color: T.colors.text }}>Licenses & credentials.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {c.certifications.map(cert => (
                <div key={cert.name} style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 28, borderRadius: T.radius.md, boxShadow: T.shadow.soft }}>
                  <div style={{ color: T.colors.accent, fontSize: 20, marginBottom: 12 }}>✓</div>
                  <div style={{ fontFamily: T.fonts.display, fontSize: 20, fontWeight: 500, color: T.colors.text, letterSpacing: -0.3 }}>{cert.name}</div>
                  <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 }}>{cert.type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GroveCTA config={c} />
        <GroveFooter config={c} />
      </div>
    </>
  )
}
