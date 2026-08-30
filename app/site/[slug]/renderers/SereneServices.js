import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { MobileMenu } from '../../../../lib/templates/shared/MobileMenu.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd, urlServices, urlServiceAreas, urlService, urlArea } from '../../../../lib/templates/shared/seo/index.js'

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

  // Whether service areas belong in primary navigation is an industry decision
  // carried on the profile. Home services buyers check coverage first because
  // urgency drives the search; aesthetics buyers choose on provider and
  // treatment, so a coverage tab is noise. Those pages stay live and linked
  // from the footer, which is where they carry SEO weight.
  const showPlaces = c.profile?.nav?.show_places !== false

  // Who performs a treatment is a stronger trust signal than the device in
  // medical verticals, so the team earns nav placement over coverage.
  const showTeam = (c.profile?.pages || []).includes('practitioners')

  // Practices that publish regularly need the blog reachable, and it is a real
  // ranking asset rather than an afterthought.
  const hasBlog = (c.profile?.pages || []).includes('blog')

  const links = [
    { href: `${base}${urlServices(c)}`, label: labels.offering },
    ...(showTeam ? [{ href: `${base}/team`, label: 'Our Team' }] : []),
    ...(showPlaces ? [{ href: `${base}${urlServiceAreas(c)}`, label: labels.place }] : []),
    { href: `${base}/about`, label: 'About' },
    ...(hasBlog ? [{ href: `${base}/blog`, label: 'Blog' }] : []),
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
        <div className="serene-header-inner" style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '16px clamp(24px, 5vw, 96px)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: 32,
        }}>
          <a href={base} style={{ textDecoration: 'none', flexShrink: 0 }}>
            {logo ? (
              /* Logo sits on a light plate. A practice often has only one
                 variant, and dark artwork on a dark background disappears
                 entirely, so the plate guarantees it is visible either way. */
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#ffffff',
                padding: '12px 22px',
                borderRadius: T.radius.sm,
              }}>
                <img src={logo} alt={c.business.display_name} style={{ height: 64, width: 'auto', display: 'block' }} />
              </span>
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
          <nav className="serene-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="serene-navlink"
                style={{
                  position: 'relative',
                  color: T.colors.text,
                  textDecoration: 'none',
                  fontSize: T.type.sm,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  paddingBottom: 6,
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0, justifySelf: 'end' }}>
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
        .serene-navlink::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: ${T.colors.accent};
          transition: width 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .serene-navlink:hover::after { width: 100%; }
        .serene-navlink:hover { color: ${T.colors.accentLight}; }
        @media (max-width: 1024px) {
          .serene-nav { display: none !important; }
          .serene-menu { display: block !important; }
          .serene-header-inner { grid-template-columns: auto auto !important; justify-content: space-between !important; }
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
  const base = c.base_path || ''
  const services = (c.services || []).slice(0, 6)
  const areas = c.service_areas || []
  const showTeam = (c.profile?.pages || []).includes('practitioners')
  const hasBlog = (c.profile?.pages || []).includes('blog')

  const colHead = {
    fontSize: T.type.xs,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: T.colors.accent,
    marginBottom: 20,
  }

  const linkStyle = {
    display: 'block',
    color: T.colors.textDim,
    textDecoration: 'none',
    fontSize: T.type.sm,
    lineHeight: 2.1,
  }

  return (
    <footer style={{ background: T.colors.bgAlt, borderTop: `1px solid ${T.colors.borderLight}` }}>
      {/* Four columns rather than a stack of lines. Service and area links here
          are also how those pages get crawled, so the footer is doing SEO work
          rather than just closing the page. */}
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: 'clamp(56px, 8vw, 96px) clamp(24px, 5vw, 96px) clamp(32px, 4vw, 56px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
        gap: 'clamp(32px, 5vw, 64px)',
      }}>
        <div>
          <div style={{
            fontFamily: T.fonts.display,
            fontSize: 'clamp(22px, 2.4vw, 28px)',
            fontWeight: 300,
            color: T.colors.text,
            marginBottom: 20,
            lineHeight: 1.2,
          }}>
            {c.business.display_name}
          </div>
          <div style={{ fontSize: T.type.sm, lineHeight: 2, color: T.colors.textDim }}>
            {c.business.address_line && <div>{c.business.address_line}</div>}
            {c.business.phone_display && (
              <a href={`tel:${c.business.phone}`} style={{ color: T.colors.textDim, textDecoration: 'none' }}>
                {c.business.phone_display}
              </a>
            )}
            {c.business.email && <div>{c.business.email}</div>}
          </div>
          {c.business.hours_display && (
            <div style={{ fontSize: T.type.xs, color: T.colors.textMuted, marginTop: 16, lineHeight: 1.9 }}>
              {c.business.hours_display}
            </div>
          )}
        </div>

        {services.length > 0 && (
          <div>
            <div style={colHead}>{labels.offering}</div>
            {services.map(s => (
              <a key={s.slug} href={`${base}${urlService(s.slug, c)}`} style={linkStyle}>
                {s.name}
              </a>
            ))}
            {(c.services || []).length > services.length && (
              <a href={`${base}${urlServices(c)}`} style={{ ...linkStyle, color: T.colors.accent }}>
                All {labels.offering.toLowerCase()}
              </a>
            )}
          </div>
        )}

        <div>
          <div style={colHead}>Practice</div>
          <a href={`${base}/about`} style={linkStyle}>About</a>
          {showTeam && <a href={`${base}/team`} style={linkStyle}>Our Team</a>}
          {hasBlog && <a href={`${base}/blog`} style={linkStyle}>Journal</a>}
          <a href={`${base}/faq`} style={linkStyle}>Questions</a>
          <a href={`${base}/contact`} style={linkStyle}>Contact</a>
        </div>

        {areas.length > 0 && (
          <div>
            <div style={colHead}>Areas We Serve</div>
            {areas.slice(0, 8).map(area => (
              <a key={area} href={`${base}${urlArea(area, c)}`} style={linkStyle}>
                {area}
              </a>
            ))}
          </div>
        )}
      </div>

      <div style={{
        borderTop: `1px solid ${T.colors.borderLight}`,
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '24px clamp(24px, 5vw, 96px) 32px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          fontSize: T.type.xs,
          color: T.colors.textMuted,
        }}>
          <span>© {new Date().getFullYear()} {c.business.legal_name || c.business.display_name}</span>
          {c.profile?.compliance_level === 'medical' && (
            <span style={{ maxWidth: 520, textAlign: 'right', lineHeight: 1.6 }}>
              Individual results vary. A consultation determines whether a treatment is appropriate for you.
            </span>
          )}
        </div>
      </div>
    </footer>
  )
}

export default function SereneServices({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const logo = c.brand?.logo_url
  // Mockups render the same pages under /mockup/<token>, so the base path
  // comes from the config when present rather than being hardcoded.
  const base = c.base_path || `/site/${siteSlug}`
  const labels = navLabels(c)
  const crumbs = [{ name: 'Home', url: '/' }, { name: labels.offering, url: urlServices(c) }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) clamp(32px, 4vw, 56px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              {labels.offering}
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
              Everything we offer
            </h1>
            <p style={{ fontSize: T.type.lg, color: T.colors.textDim, marginTop: 20, maxWidth: 560, lineHeight: 1.65, fontWeight: 300 }}>
              {c.positioning?.tagline}
            </p>
          </div>
        </section>

        {/* Image-led tiles rather than text cards. This is a visual industry and
            a list of names reads as a price sheet. */}
        <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 112px)' }}>
          <div style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
            gap: 8,
          }}>
            {(c.services || []).map((s, i) => {
              const img = (c.images || {})[`service_${s.slug}`]
              return (
                <a
                  key={s.slug}
                  href={`${base}${urlService(s.slug, c)}`}
                  style={{
                    position: 'relative',
                    display: 'block',
                    minHeight: 300,
                    textDecoration: 'none',
                    color: T.colors.text,
                    background: T.colors.surface,
                    overflow: 'hidden',
                  }}
                >
                  {img && (
                    <img
                      src={img.url}
                      alt={img.alt || s.name}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    />
                  )}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: img ? 'linear-gradient(180deg, rgba(15,14,13,0.05) 0%, rgba(15,14,13,0.88) 100%)' : 'none',
                  }} />
                  <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32 }}>
                    <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', color: T.colors.accent, marginBottom: 14 }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ fontFamily: T.fonts.display, fontSize: 'clamp(21px, 2.4vw, 27px)', fontWeight: 300, lineHeight: 1.15 }}>
                      {s.name}
                    </div>
                    {s.short && (
                      <div style={{ fontSize: T.type.sm, color: 'rgba(244,239,232,0.72)', marginTop: 12, lineHeight: 1.6 }}>
                        {s.short}
                      </div>
                    )}
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} />
      </div>
    </>
  )
}

export { SereneHeader, SereneCTA, SereneFooter, navLabels }
