import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildMedicalProcedureSchema,
  breadcrumbsForService,
  JsonLd,
  urlCombo,
} from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
import { StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

export default function SereneServiceDetail({ config: c, siteSlug, service, conceptOnly = false }) {
  const T = applyBrand(sereneTokens, {
    accent: c.brand?.primary_accent,
    secondary: c.brand?.secondary,
    mode: c.brand?.mode,
    palette: c.brand?.palette,
    logo: c.brand?.logo_url,
  })
  // Mockups render the same pages under /mockup/<token>, so the base path
  // comes from the config when present rather than being hardcoded.
  const base = c.base_path || `/site/${siteSlug}`
  const labels = navLabels(c)
  const gen = c.generated || {}
  const img = (c.images || {})[`service_${service.slug}`]
  const areas = c.service_areas || []

  const faqs = Array.isArray(gen['service_detail|faq']) ? gen['service_detail|faq'] : []

  const schemas = [
    buildBreadcrumbSchema(c, breadcrumbsForService(service, c)),
    buildMedicalProcedureSchema(c, service),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ].filter(Boolean)

  const Section = ({ label, body, index = 0 }) => body ? (
    <section style={{
      padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 96px)',
      background: index % 2 === 1 ? T.colors.bgAlt : 'transparent',
      borderTop: `1px solid ${T.colors.borderLight}`,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 8fr)', gap: 'clamp(24px, 5vw, 80px)' }}>
        <div style={{
          fontFamily: T.fonts.display,
          fontSize: 'clamp(20px, 2.3vw, 28px)',
          fontWeight: 300,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: T.colors.text,
          paddingTop: 2,
        }}>
          {label}
        </div>
        <div style={{ maxWidth: 640, fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
          {String(body).split('\n\n').map((p, i) => <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>)}
        </div>
      </div>
    </section>
  ) : null

  return (
    <>
      <SereneResponsive />
      {schemas.map((s, i) => <JsonLd key={i} data={s} />)}
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        <section style={{
          display: 'grid',
          gridTemplateColumns: img ? 'minmax(0, 1fr) minmax(0, 0.9fr)' : '1fr',
          alignItems: 'stretch',
          borderBottom: `1px solid ${T.colors.borderLight}`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px, 6vw, 88px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              {labels.offering}
            </div>
            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: 'clamp(32px, 4.4vw, 58px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              {service.name}
            </h1>
            {gen['service_detail|hero_subheadline'] && (
              <p style={{ fontSize: T.type.lg, lineHeight: 1.6, color: T.colors.textDim, margin: '24px 0 0', maxWidth: 480, fontWeight: 300 }}>
                {gen['service_detail|hero_subheadline']}
              </p>
            )}
            {c.business.phone_display && (
              <a href={`tel:${c.business.phone}`} style={{
                display: 'inline-block',
                marginTop: 40,
                alignSelf: 'flex-start',
                background: T.colors.accent,
                color: T.colors.bg,
                padding: '16px 40px',
                borderRadius: T.radius.full,
                textDecoration: 'none',
                fontSize: T.type.sm,
                letterSpacing: '0.04em',
              }}>
                {labels.conversion.replace(/\b\w/g, ch => ch.toUpperCase())}
              </a>
            )}
          </div>

          {img && (
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(260px, 34vh, 480px)', maxWidth: 700, justifySelf: 'end', width: '100%' }}>
              <img src={img.url} alt={img.alt || service.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </section>

        {conceptOnly && (
          <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 96px) 0' }}>
            <div style={{
              maxWidth: 1400,
              margin: '0 auto',
              padding: '28px 32px',
              border: `1px solid ${T.colors.border}`,
              borderRadius: T.radius.md,
            }}>
              <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 12 }}>
                Concept
              </div>
              <p style={{ fontSize: T.type.base, lineHeight: 1.8, color: T.colors.textDim, margin: 0, maxWidth: 720 }}>
                Shown in structure only. Every treatment gets a page written like the one
                for {(c.services || [])[0]?.name}, with its own overview, what to expect,
                aftercare, FAQ schema, and links to each area you serve.
              </p>
            </div>
          </section>
        )}

        <div style={{ paddingTop: conceptOnly ? 'clamp(32px, 4vw, 56px)' : 'clamp(48px, 7vw, 88px)' }}>
          <Section label="Overview" body={gen['service_detail|intro']} index={0} />
          <Section label="What to expect" body={gen['service_detail|what_to_expect']} index={1} />
          <Section label="Our approach" body={gen['service_detail|materials_and_methods']} index={2} />
          {c.profile?.compliance_level === 'medical' && (
            <>
              <Section label="Candidacy" body={gen['service_detail|candidacy']} index={3} />
              <Section label="Aftercare" body={gen['service_detail|aftercare']} index={4} />
            </>
          )}
        </div>

        {faqs.length > 0 && (
          <section style={{ background: T.colors.bgAlt, padding: 'clamp(64px, 9vw, 120px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 8fr)', gap: 'clamp(24px, 5vw, 80px)' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 300, margin: 0, letterSpacing: '-0.015em' }}>
                Questions
              </h2>
              <div style={{ maxWidth: 720 }}>
                {faqs.map((f, i) => (
                  <div key={i} style={{ padding: '24px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.colors.borderLight}` }}>
                    <h3 style={{ fontSize: T.type.lg, fontWeight: 400, margin: '0 0 10px', color: T.colors.text }}>{f.question}</h3>
                    <p style={{ fontSize: T.type.base, lineHeight: 1.8, color: T.colors.textDim, margin: 0 }}>{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Links to every area page for this treatment. These are the combo
            pages, and cross-linking them from the treatment page is what gets
            them crawled. */}
        {areas.length > 0 && (
          <section style={{ padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 32 }}>
                {service.name} near you
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 8 }}>
                {areas.map(area => (
                  <a
                    key={area}
                    href={`${base}${urlCombo(service, area)}`}
                    style={{
                      position: 'relative',
                      display: 'block',
                      minHeight: 130,
                      overflow: 'hidden',
                      background: T.colors.surface,
                      border: `1px solid ${T.colors.borderLight}`,
                      textDecoration: 'none',
                      color: T.colors.text,
                    }}
                  >
                    {/* Deliberately no image: the same treatment photo repeated
                        across eight area tiles reads as a mistake. */}
                    <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', padding: 20, minHeight: 130 }}>
                      <div>
                        <div style={{ fontSize: T.type.xs, letterSpacing: '0.14em', color: T.colors.accent, marginBottom: 6 }}>
                          {service.name}
                        </div>
                        <div style={{ fontFamily: T.fonts.display, fontSize: 20, fontWeight: 300, lineHeight: 1.15 }}>
                          {area}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <SereneCTA T={T} c={c} headline={service.name} />
        <SereneFooter T={T} c={c} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
