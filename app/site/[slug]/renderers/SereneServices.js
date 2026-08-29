import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { MobileMenu } from '../../../../lib/templates/shared/MobileMenu.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd, urlServices, urlServiceAreas, urlService } from '../../../../lib/templates/shared/seo/index.js'

const titleCase = (s) => String(s || '').replace(/\b\w/g, ch => ch.toUpperCase())

/**
 * Nav labels come from the industry profile, so a med spa reads Treatments and
 * Locations while a home services client reads Services and Areas. Hardcoding
 * these is what makes a template feel like it was built for someone else.
 */
function navLabels(c) {
  return {
    offering: titleCase(c.profile?.nouns?.offering?.plural || 'services'),
    place: titleCase(c.profile?.nouns?.place?.plural || 'service areas'),
    conversion: c.profile?.nouns?.conversion || 'get in touch',
  }
}

function SereneHeader({ T, c, logo, base }) {
  const labels = navLabels(c)

  const links = [
    { href: `${base}${urlServices(c)}`, label: labels.offering },
    { href: `${base}${urlServiceAreas(c)}`, label: labels.place },
    { href: `${base}/about`, label: 'About' },
    { href: `${base}/faq`, label: 'FAQ' },
  ]

  return (
    <>
      {/* Thin utility strip. Puts the phone number and location within reach
          without competing with the main navigation. */}
      <div style={{
        background: T.colors.bgAlt,
        borderBottom: `1px solid ${T.colors.borderLight}`,
        fontSize: T.type.xs,
        letterSpacing: '0.06em',
        color: T.colors.textMuted,
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '10px clamp(24px, 5vw, 96px)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          <span>{c.business.address_line}</span>
          {c.business.phone_display && (
            <a href={`tel:${c.business.phone}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>
              {c.business.phone_display}
            </a>
          )}
        </div>
      </div>

      <header style={{
        background: T.colors.bg,
        borderBottom: `1px solid ${T.colors.borderLight}`,
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: 'clamp(20px, 3vw, 32px) clamp(24px, 5vw, 96px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}>
          <a href={base} style={{ textDecoration: 'none', flexShrink: 0 }}>
            {logo ? (
              <img src={logo} alt={c.business.display_name} style={{ maxHeight: 44, display: 'block' }} />
            ) : (
              <div style={{
                fontFamily: T.fonts.display,
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                fontWeight: 300,
                letterSpacing: '0.02em',
                color: T.colors.text,
                lineHeight: 1,
              }}>
                {c.business.display_name}
              </div>
            )}
          </a>

          {/* Inline navigation on desktop. A bare hamburger on a wide screen
              hides the treatment range, which is the main thing a visitor is
              trying to assess. */}
          <nav className="serene-nav" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  color: T.colors.textDim,
                  textDecoration: 'none',
                  fontSize: T.type.sm,
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            {(c.business.booking_url || c.business.phone) && (
              <a
                href={c.business.booking_url || `tel:${c.business.phone}`}
                style={{
                  background: T.colors.accent,
                  color: T.colors.bg,
                  padding: '12px 28px',
                  borderRadius: T.radius.full,
                  textDecoration: 'none',
                  fontSize: T.type.sm,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                {labels.conversion.replace(/\b\w/g, ch => ch.toUpperCase())}
              </a>
            )}

            <div className="serene-menu" style={{ display: 'none' }}>
              <MobileMenu
                items={links}
                phoneNumber={c.business.phone}
                phoneDisplay={c.business.phone_display}
                accent={T.colors.accent}
                bg={T.colors.bgAlt}
                text={T.colors.text}
                textDim={T.colors.textDim}
                borderColor={T.colors.border}
                fontFamily={T.fonts.body}
              />
            </div>
          </div>
        </div>
      </header>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .serene-nav { display: none !important; }
          .serene-menu { display: block !important; }
        }
      ` }} />
    </>
  )
}

function SereneCTA({ T, c, headline }) {
  const labels = navLabels(c)
  return (
    <section style={{ background: T.colors.bgAlt, padding: 'clamp(64px, 10vw, 120px) 32px', textAlign: 'center' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 400, color: T.colors.text, margin: '0 0 20px', lineHeight: 1.2 }}>
          {headline || `Ready when you are`}
        </h2>
        {c.business.phone_display && (
          <a
            href={`tel:${c.business.phone}`}
            style={{
              display: 'inline-block',
              background: T.colors.secondary,
              color: T.colors.bgLight,
              padding: '16px 40px',
              borderRadius: T.radius.full,
              textDecoration: 'none',
              fontSize: 15,
              letterSpacing: 0.4,
              marginTop: 12,
            }}
          >
            {titleCase(labels.conversion)}
          </a>
        )}
      </div>
    </section>
  )
}

function SereneFooter({ T, c }) {
  const labels = navLabels(c)
  return (
    <footer style={{ background: T.colors.text, color: T.colors.bgAlt, padding: 'clamp(48px, 7vw, 80px) 32px 40px' }}>
      <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
        <div style={{ fontFamily: T.fonts.display, fontSize: 26, fontWeight: 400, marginBottom: 20 }}>
          {c.business.display_name}
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.9, opacity: 0.75 }}>
          {c.business.address_line && <div>{c.business.address_line}</div>}
          {c.business.phone_display && <div>{c.business.phone_display}</div>}
          {c.business.email && <div>{c.business.email}</div>}
          {c.business.hours_display && <div style={{ marginTop: 10 }}>{c.business.hours_display}</div>}
        </div>

        {(c.service_areas || []).length > 0 && (
          <div style={{ marginTop: 32, fontSize: 13, opacity: 0.6, lineHeight: 1.8 }}>
            <div style={{ marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase', fontSize: 11 }}>{labels.place}</div>
            {c.service_areas.join(' · ')}
          </div>
        )}

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid rgba(255,255,255,0.12)`, fontSize: 12, opacity: 0.5 }}>
          © {new Date().getFullYear()} {c.business.legal_name || c.business.display_name}
          {c.profile?.compliance_level === 'medical' && (
            <div style={{ marginTop: 8 }}>
              Individual results vary. A consultation is required to determine whether a treatment is appropriate for you.
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export default function SereneServices({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const labels = navLabels(c)
  const crumbs = [{ name: 'Home', url: '/' }, { name: labels.offering, url: urlServices(c) }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ padding: 'clamp(64px, 10vw, 120px) 32px 48px' }}>
          <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(38px, 7vw, 68px)', fontWeight: 400, letterSpacing: 0.5, lineHeight: 1.1, margin: 0, color: T.colors.text }}>
              {labels.offering}
            </h1>
            <p style={{ fontSize: 18, color: T.colors.textDim, marginTop: 20, maxWidth: 620, lineHeight: 1.7 }}>
              {c.positioning?.tagline}
            </p>
          </div>
        </section>

        <section style={{ padding: '0 32px clamp(64px, 10vw, 120px)' }}>
          <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 28 }}>
            {(c.services || []).map(s => (
              <a
                key={s.slug}
                href={`${base}${urlService(s.slug, c)}`}
                style={{
                  background: T.colors.surface,
                  border: `1px solid ${T.colors.borderLight}`,
                  borderRadius: T.radius.lg,
                  padding: 32,
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  boxShadow: T.shadow.soft,
                }}
              >
                <h2 style={{ fontFamily: T.fonts.display, fontSize: 24, fontWeight: 400, margin: '0 0 12px', color: T.colors.text }}>
                  {s.name}
                </h2>
                <p style={{ fontSize: 15, color: T.colors.textDim, lineHeight: 1.7, margin: 0 }}>
                  {s.short}
                </p>
              </a>
            ))}
          </div>
        </section>

        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} />
      </div>
    </>
  )
}

export { SereneHeader, SereneCTA, SereneFooter, navLabels }
