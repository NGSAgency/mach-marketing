import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildLocalBusinessSchema, JsonLd, urlService, urlServices } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'

export default function SereneHome({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const base = `/site/${siteSlug}`
  const labels = navLabels(c)
  const gen = c.generated || {}

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
      <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        {/* Hero. Restrained on purpose: in this vertical whitespace reads as
            quality, and a loud hero undercuts the clinical half of the pitch. */}
        <section style={{ padding: 'clamp(72px, 12vw, 160px) 32px clamp(56px, 8vw, 100px)' }}>
          <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(40px, 8vw, 76px)', fontWeight: 400, letterSpacing: 0.5, lineHeight: 1.08, margin: 0, color: T.colors.text }}>
              {c.business.display_name}
            </h1>
            <p style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', color: T.colors.textDim, marginTop: 24, lineHeight: 1.7, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
              {gen['home|hero_subheadline'] || c.positioning?.tagline}
            </p>
            {c.business.phone_display && (
              <a
                href={`tel:${c.business.phone}`}
                style={{
                  display: 'inline-block',
                  marginTop: 36,
                  background: T.colors.secondary,
                  color: T.colors.bgLight,
                  padding: '16px 42px',
                  borderRadius: T.radius.full,
                  textDecoration: 'none',
                  fontSize: 15,
                  letterSpacing: 0.4,
                }}
              >
                {c.business.phone_display}
              </a>
            )}
          </div>
        </section>

        {gen['home|intro_paragraph'] && (
          <section style={{ padding: '0 32px clamp(56px, 8vw, 100px)' }}>
            <div style={{ maxWidth: 720, margin: '0 auto', fontSize: 17, lineHeight: 1.85, color: T.colors.textDim }}>
              {gen['home|intro_paragraph'].split('\n\n').map((p, i) => (
                <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>
              ))}
            </div>
          </section>
        )}

        <section style={{ background: T.colors.bgAlt, padding: 'clamp(64px, 10vw, 120px) 32px' }}>
          <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 400, margin: '0 0 12px', color: T.colors.text }}>
              {labels.offering}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 24, marginTop: 40 }}>
              {(c.services || []).slice(0, 9).map(s => (
                <a
                  key={s.slug}
                  href={`${base}${urlService(s.slug, c)}`}
                  style={{
                    background: T.colors.surface,
                    border: `1px solid ${T.colors.borderLight}`,
                    borderRadius: T.radius.lg,
                    padding: 28,
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                  }}
                >
                  <div style={{ fontFamily: T.fonts.display, fontSize: 21, fontWeight: 400, color: T.colors.text }}>{s.name}</div>
                  {s.short && <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 10, lineHeight: 1.65 }}>{s.short}</div>}
                </a>
              ))}
            </div>
            {(c.services || []).length > 9 && (
              <a href={`${base}${urlServices(c)}`} style={{ display: 'inline-block', marginTop: 32, color: T.colors.accentDim, fontSize: 15 }}>
                View all {labels.offering.toLowerCase()}
              </a>
            )}
          </div>
        </section>

        {gen['home|why_us'] && (
          <section style={{ padding: 'clamp(64px, 10vw, 120px) 32px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto', fontSize: 17, lineHeight: 1.85, color: T.colors.textDim }}>
              {gen['home|why_us'].split('\n\n').map((p, i) => (
                <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>
              ))}
            </div>
          </section>
        )}

        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} />
      </div>
    </>
  )
}
