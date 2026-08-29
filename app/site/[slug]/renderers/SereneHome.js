import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildLocalBusinessSchema, JsonLd, urlService, urlServices } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
import { TrustBar, ConcernsGrid, BeforeAfterGallery, Providers, Reviews, StickyBooking } from '../../../../lib/templates/shared/components/medical.js'

export default function SereneHome({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const base = `/site/${siteSlug}`
  const labels = navLabels(c)
  const gen = c.generated || {}
  const imgs = c.images || {}
  const hero = imgs.home_hero
  const secondary = imgs.home_secondary

  const components = c.profile?.components || []
  const has = (k) => components.includes(k)
  const concerns = c.concerns || []
  const services = c.services || []

  // The hero carries one clear promise, not the business name. The name is
  // already in the header; repeating it wastes the most valuable space on the
  // page.
  const promise = gen['home|hero_subheadline'] || c.positioning?.tagline

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        {/* SPLIT HERO
            Asymmetric on purpose: type occupies the left, image bleeds off the
            right edge. A centered hero creates no tension and no direction for
            the eye. The image extends past the viewport so the composition
            reads as a crop of something larger rather than a contained block. */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: hero ? 'minmax(0, 1fr) minmax(0, 0.85fr)' : '1fr',
          alignItems: 'stretch',
          minHeight: 'clamp(520px, 78vh, 820px)',
          borderBottom: `1px solid ${T.colors.borderLight}`,
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(48px, 8vw, 128px) clamp(24px, 5vw, 96px)',
          }}>
            <div style={{
              fontFamily: T.fonts.body,
              fontSize: T.type.xs,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: T.colors.accent,
              marginBottom: 32,
            }}>
              {[c.business.address_line, c.business.established_year ? `Est. ${c.business.established_year}` : null]
                .filter(Boolean).join('  ·  ')}
            </div>

            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: T.type.hero,
              fontWeight: 300,
              lineHeight: 0.94,
              letterSpacing: '-0.02em',
              margin: 0,
              color: T.colors.text,
            }}>
              {promise}
            </h1>

            <div style={{ display: 'flex', gap: 16, marginTop: 48, flexWrap: 'wrap' }}>
              {c.business.phone_display && (
                <a href={`tel:${c.business.phone}`} style={{
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
              <a href={`${base}${urlServices(c)}`} style={{
                border: `1px solid ${T.colors.border}`,
                color: T.colors.text,
                padding: '16px 40px',
                borderRadius: T.radius.full,
                textDecoration: 'none',
                fontSize: T.type.sm,
                letterSpacing: '0.04em',
              }}>
                View {labels.offering}
              </a>
            </div>
          </div>

          {hero && (
            /* Source images are 1920px, so a full-bleed hero on a wide display
               stretches them past native size and reads as blurry. Capping the
               column keeps the image close to its actual resolution. */
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(320px, 40vh, 820px)', maxWidth: 900, justifySelf: 'end', width: '100%' }}>
              <img
                src={hero.url}
                alt={hero.alt || c.business.display_name}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </section>

        {has('trust_bar') && <TrustBar T={T} c={c} />}

        {/* BENTO TREATMENT GRID
            The first treatment spans two columns and is twice the height. That
            asymmetry is the hierarchy: uniform cards give the eye nowhere to
            land and read as a catalog rather than a considered page. */}
        {services.length > 0 && (
          <section style={{ padding: 'clamp(64px, 10vw, 144px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
                <h2 style={{
                  fontFamily: T.fonts.display,
                  fontSize: T.type.display,
                  fontWeight: 300,
                  lineHeight: 1,
                  letterSpacing: '-0.015em',
                  margin: 0,
                  color: T.colors.text,
                }}>
                  {labels.offering}
                </h2>
                <a href={`${base}${urlServices(c)}`} style={{
                  color: T.colors.accent,
                  fontSize: T.type.sm,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  borderBottom: `1px solid ${T.colors.accent}`,
                  paddingBottom: 4,
                }}>
                  All {labels.offering.toLowerCase()}
                </a>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
                gap: 8,
              }}>
                {services.slice(0, 7).map((s, i) => {
                  const img = imgs[`service_${s.slug}`]
                  const featured = i === 0
                  return (
                    <a
                      key={s.slug}
                      href={`${base}${urlService(s.slug, c)}`}
                      style={{
                        position: 'relative',
                        display: 'block',
                        textDecoration: 'none',
                        color: T.colors.text,
                        background: T.colors.surface,
                        overflow: 'hidden',
                        minHeight: featured ? 480 : 232,
                        gridColumn: featured ? 'span 2' : 'span 1',
                        gridRow: featured ? 'span 2' : 'span 1',
                      }}
                    >
                      {img && (
                        <img
                          src={img.url}
                          alt={img.alt || s.name}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
                        />
                      )}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: img
                          ? 'linear-gradient(180deg, rgba(15,14,13,0.1) 0%, rgba(15,14,13,0.85) 100%)'
                          : 'none',
                      }} />
                      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: featured ? 48 : 32 }}>
                        <div style={{
                          fontSize: T.type.xs,
                          letterSpacing: '0.18em',
                          color: T.colors.accent,
                          marginBottom: 16,
                        }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div style={{
                          fontFamily: T.fonts.display,
                          fontSize: featured ? T.type.xl : T.type.lg,
                          fontWeight: 300,
                          lineHeight: 1.1,
                          letterSpacing: '-0.01em',
                        }}>
                          {s.name}
                        </div>
                        {featured && s.short && (
                          <div style={{ fontSize: T.type.sm, color: T.colors.textDim, marginTop: 16, maxWidth: 420, lineHeight: 1.7 }}>
                            {s.short}
                          </div>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* EDITORIAL INTRO
            Generated prose arrives as one paragraph, and rendering it as one
            paragraph produces the wall of text this replaces. Splitting it into
            a display-size lead, a narrow offset body column, and a pulled phrase
            in the margin gives the eye landmarks and a place to enter. */}
        {gen['home|intro_paragraph'] && (() => {
          const raw = gen['home|intro_paragraph'].replace(/\s+/g, ' ').trim()
          const sentences = raw.split(/(?<=[.!?])\s+/)
          const lead = sentences[0] || raw
          const body = sentences.slice(1)

          // Pull the most distinctive sentence into the margin. Longest is a
          // decent proxy for most substantive, and it is deterministic.
          const pullIdx = body.length > 2
            ? body.reduce((best, s, i) => (s.length > body[best].length ? i : best), 0)
            : -1
          const pull = pullIdx >= 0 ? body[pullIdx] : null
          const rest = pullIdx >= 0 ? body.filter((_, i) => i !== pullIdx) : body

          return (
            <section style={{ padding: 'clamp(80px, 12vw, 176px) clamp(24px, 5vw, 96px)', borderTop: `1px solid ${T.colors.borderLight}` }}>
              <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)', gap: 'clamp(32px, 6vw, 96px)', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 40 }}>
                      The practice
                    </div>

                    {/* Lead sentence at display size. This is the entry point. */}
                    <p style={{
                      fontFamily: T.fonts.display,
                      fontSize: 'clamp(26px, 3.4vw, 44px)',
                      fontWeight: 300,
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                      color: T.colors.text,
                      margin: '0 0 40px',
                      maxWidth: 720,
                    }}>
                      {lead}
                    </p>

                    <div style={{ maxWidth: 560, fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
                      {rest.map((s, i) => (
                        <p key={i} style={{ margin: '0 0 20px' }}>{s}</p>
                      ))}
                    </div>
                  </div>

                  <div style={{ position: 'sticky', top: 96 }}>
                    {secondary && (
                      <div style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: pull ? 48 : 0 }}>
                        <img src={secondary.url} alt={secondary.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    )}
                    {pull && (
                      <blockquote style={{
                        margin: 0,
                        paddingLeft: 24,
                        borderLeft: `1px solid ${T.colors.accent}`,
                        fontFamily: T.fonts.display,
                        fontSize: 'clamp(19px, 2.1vw, 25px)',
                        fontWeight: 300,
                        fontStyle: 'italic',
                        lineHeight: 1.45,
                        color: T.colors.textDim,
                      }}>
                        {pull}
                      </blockquote>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )
        })()}

        {has('concerns_grid') && <ConcernsGrid T={T} c={c} base={base} concerns={concerns} />}
        {has('reviews') && <Reviews T={T} c={c} />}
        {has('before_after') && <BeforeAfterGallery T={T} c={c} cases={c.before_after || []} />}
        {has('providers') && <Providers T={T} c={c} providers={c.providers || []} base={base} />}

        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} />
        {has('sticky_booking') && <StickyBooking T={T} c={c} />}
      </div>

      {/* Single-column stack on mobile. The asymmetry is a desktop composition;
          forcing it on a phone produces slivers. */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          section[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
          a[style*="span 2"] { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 280px !important; }
        }
      ` }} />
    </>
  )
}
