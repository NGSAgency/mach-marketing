import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd, urlContact } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneFooter, navLabels } from './SereneServices.js'
import { StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'
import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'

const titleCase = (s) => String(s || '').replace(/\b\w/g, ch => ch.toUpperCase())

export default function SereneContact({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  // Mockups render the same pages under /mockup/<token>, so the base path
  // comes from the config when present rather than being hardcoded.
  const base = c.base_path || `/site/${siteSlug}`
  const labels = navLabels(c)
  const b = c.business || {}
  const isConcept = c.concept === true

  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: urlContact() }]

  // Only what the config actually holds. A missing field is simply absent
  // rather than replaced with a placeholder.
  const details = [
    b.phone_display && b.phone ? { k: 'Phone', v: b.phone_display, href: `tel:${b.phone}` } : null,
    b.phone_display && !b.phone ? { k: 'Phone', v: b.phone_display } : null,
    b.email ? { k: 'Email', v: b.email, href: `mailto:${b.email}` } : null,
    b.address_line ? { k: 'Address', v: b.address_line } : null,
    b.hours_display ? { k: 'Hours', v: b.hours_display } : null,
  ].filter(Boolean)

  const eyebrow = {
    fontSize: T.type.xs,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: T.colors.accent,
  }

  return (
    <>
      <SereneResponsive border={T.colors.border} />
      {!isConcept && <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />}
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) clamp(32px, 4vw, 56px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ ...eyebrow, marginBottom: 24 }}>
              Contact
            </div>
            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: 'clamp(32px, 4.6vw, 60px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 820,
            }}>
              {titleCase(labels.conversion)}
            </h1>
          </div>
        </section>

        {/* Details against the form. The practice's own contact points come
            first because many visitors would rather call than write. */}
        <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 112px)' }}>
          <div style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 6fr)',
            gap: 'clamp(40px, 6vw, 96px)',
            alignItems: 'start',
            borderTop: `1px solid ${T.colors.borderLight}`,
            paddingTop: 'clamp(40px, 5vw, 64px)',
          }}>
            <div>
              {details.length > 0 && (
                <div style={{ display: 'grid', gap: 32 }}>
                  {details.map(d => (
                    <div key={d.k}>
                      <div style={{ fontSize: T.type.xs, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.colors.textMuted, marginBottom: 10 }}>
                        {d.k}
                      </div>
                      {d.href ? (
                        <a href={d.href} style={{
                          fontFamily: T.fonts.display,
                          fontSize: 'clamp(21px, 2.4vw, 28px)',
                          fontWeight: 300,
                          lineHeight: 1.3,
                          color: T.colors.text,
                          textDecoration: 'none',
                          overflowWrap: 'anywhere',
                        }}>
                          {d.v}
                        </a>
                      ) : (
                        <div style={{ fontSize: T.type.base, lineHeight: 1.8, color: T.colors.textDim, whiteSpace: 'pre-line' }}>
                          {d.v}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {b.booking_url && (
                <a href={b.booking_url} style={{
                  display: 'inline-block',
                  marginTop: details.length > 0 ? 48 : 0,
                  background: T.colors.accent,
                  color: T.colors.onAccent,
                  padding: '16px 40px',
                  borderRadius: T.radius.full,
                  textDecoration: 'none',
                  fontSize: T.type.sm,
                  letterSpacing: '0.04em',
                }}>
                  {titleCase(labels.conversion)}
                </a>
              )}
            </div>

            <div>
              <h2 style={{
                fontFamily: T.fonts.display,
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                margin: '0 0 32px',
              }}>
                Send a message
              </h2>
              <ContactForm
                slug={siteSlug}
                concept={isConcept}
                colors={{
                  text: T.colors.text,
                  textDim: T.colors.textDim,
                  textMuted: T.colors.textMuted,
                  border: T.colors.border,
                  field: T.colors.surface,
                  fieldText: T.colors.text,
                  accent: T.colors.accent,
                  onAccent: T.colors.onAccent,
                  success: T.colors.success,
                  urgent: T.colors.urgent,
                }}
                fonts={T.fonts}
                radius={T.radius.sm}
                submitLabel="Send message"
              />
            </div>
          </div>
        </section>

        <SereneFooter T={T} c={c} base={base} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
