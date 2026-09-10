import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, buildPersonSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
import { StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

/**
 * Provider profiles.
 *
 * In medical aesthetics the provider matters more to a buyer than the device,
 * and named credentials are what separate a medical practice from a salon. Each
 * provider emits Person schema, which Google expects for health practices and
 * which most competitors in this vertical omit entirely.
 */
export default function SereneTeam({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  // Mockups render the same pages under /mockup/<token>, so the base path
  // comes from the config when present rather than being hardcoded.
  const base = c.base_path || `/site/${siteSlug}`
  const providers = c.providers || []

  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Our Team', url: '/team' }]
  const schemas = [
    buildBreadcrumbSchema(c, crumbs),
    ...providers.map(p => buildPersonSchema(c, p)).filter(Boolean),
  ]

  return (
    <>
      <SereneResponsive border={T.colors.border} />
      {schemas.map((s, i) => <JsonLd key={i} data={s} />)}
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        <section style={{ padding: 'clamp(56px, 8vw, 112px) clamp(24px, 5vw, 96px) clamp(32px, 5vw, 64px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              Our Team
            </div>
            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: 'clamp(34px, 5vw, 68px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: 780,
            }}>
              The people behind your care
            </h1>
          </div>
        </section>

        {providers.length > 0 ? (
          <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 120px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              {providers.map((p, i) => (
                <article
                  key={p.slug || p.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: p.photo_url ? 'minmax(0, 4fr) minmax(0, 8fr)' : '1fr',
                    gap: 'clamp(24px, 5vw, 72px)',
                    alignItems: 'start',
                    padding: 'clamp(40px, 6vw, 72px) 0',
                    borderTop: i === 0 ? 'none' : `1px solid ${T.colors.borderLight}`,
                  }}
                >
                  {p.photo_url && (
                    <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                      <img src={p.photo_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}

                  <div style={{ maxWidth: 640 }}>
                    <h2 style={{
                      fontFamily: T.fonts.display,
                      fontSize: 'clamp(26px, 3.2vw, 40px)',
                      fontWeight: 300,
                      letterSpacing: '-0.015em',
                      margin: 0,
                    }}>
                      {p.name}
                    </h2>

                    {p.title && (
                      <div style={{ fontSize: T.type.sm, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.colors.accent, marginTop: 12 }}>
                        {p.title}
                      </div>
                    )}

                    {Array.isArray(p.credentials) && p.credentials.length > 0 && (
                      <div style={{ fontSize: T.type.sm, color: T.colors.textMuted, marginTop: 10 }}>
                        {p.credentials.join(' · ')}
                      </div>
                    )}

                    {p.bio && (
                      <div style={{ fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim, marginTop: 24 }}>
                        {String(p.bio).split('\n\n').map((para, j) => (
                          <p key={j} style={{ margin: '0 0 18px' }}>{para}</p>
                        ))}
                      </div>
                    )}

                    {Array.isArray(p.specialties) && p.specialties.length > 0 && (
                      <div style={{ marginTop: 28 }}>
                        <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.textMuted, marginBottom: 14 }}>
                          Specializes in
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                          {p.specialties.map(s => (
                            <span key={s} style={{
                              border: `1px solid ${T.colors.border}`,
                              borderRadius: T.radius.full,
                              padding: '8px 18px',
                              fontSize: T.type.sm,
                              color: T.colors.textDim,
                            }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : c.concept === true ? (
          <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 120px)' }}>
            <div style={{ maxWidth: 720, margin: '0 auto', fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
              Provider profiles go here, one for each member of your team, with a photo,
              credentials, and what they specialize in. Each gets its own page and carries
              Person schema, which search engines expect from medical practices and which
              most practices in this field do not publish at all.
            </div>
          </section>
        ) : null}

        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} base={base} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
