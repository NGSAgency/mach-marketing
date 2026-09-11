import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildLocalBusinessSchema, JsonLd, urlService, urlServices } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
import { TrustBar, ConcernsGrid, BeforeAfterGallery, Providers, Reviews, StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'
import HeroMedia from '../../../../lib/templates/shared/components/HeroMedia.js'
import { heroTrust } from '../../../../lib/templates/shared/claims.js'

// What the business is, in the words people search with, for the H1.
const BUSINESS_NOUN = { medspa: 'Med spa', med_spa: 'Med spa', aesthetics: 'Med spa', wellness: 'Med spa', auto_detailing: 'Auto detailing' }

export default function SereneHome({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  // Mockups render the same pages under /mockup/<token>, so the base path
  // comes from the config when present rather than being hardcoded.
  const base = c.base_path || `/site/${siteSlug}`
  const labels = navLabels(c)
  const gen = c.generated || {}
  const imgs = c.images || {}
  // The business's own video, when they have one, plays in the hero frame.
  const video = imgs.home_video?.url ? imgs.home_video : null
  const hero = imgs.home_hero || (video ? { url: video.poster || null, alt: '' } : null)
  const secondary = imgs.home_secondary

  const components = c.profile?.components || []
  const has = (k) => components.includes(k)
  const concerns = c.concerns || []
  const services = c.services || []

  // Hero Research Brief (2026-09-11). The H1 says what and where in plain
  // words ("Med spa in Overland Park"); the practice's own line becomes the
  // eyebrow and the generated sentence the support. Without a place the
  // headline falls back to a short promise from their own tagline or copy.
  const name = c.business?.display_name || ''
  const place = c.primary_service_area && c.primary_service_area !== 'your area' ? c.primary_service_area : null
  const noun = BUSINESS_NOUN[c.industry_key] || BUSINESS_NOUN[c.profile?.key] || services[0]?.category || null
  const ownTagline = c.positioning?.tagline || ''
  const generated = gen['home|hero_subheadline'] || ''
  const shortPromise = (ownTagline && ownTagline.length <= 68 ? ownTagline : generated.split(/[.·|]/)[0].trim()).replace(/[,;]\s*$/, '')
  const headline = noun && place ? `${noun} in ${place}` : (shortPromise || noun || name)
  const eyebrow = ownTagline && ownTagline.length <= 56 && ownTagline !== headline
    ? ownTagline
    : [c.business.address_line, c.business.established_year ? `Est. ${c.business.established_year}` : null].filter(Boolean).join('  ·  ')
  const support = generated && generated !== headline ? generated : (ownTagline && ownTagline !== headline && ownTagline !== eyebrow ? ownTagline : null)

  // Who treats you. Credentials rank with reviews for this buyer, so the
  // medical director (or the credentialed lead provider) is named on the
  // first screen, exactly as the practice supplied it.
  const providers = c.providers || []
  const director = providers.find(p => p.is_medical_director)
    || (typeof c.medical?.medical_director === 'string' && c.medical.medical_director.trim() ? { name: c.medical.medical_director.trim(), is_medical_director: true } : null)
  const lead = director || providers.find(p => (p.credentials || []).length > 0) || null
  const leadText = lead ? [
    lead.is_medical_director ? 'Medical director' : null,
    [lead.name, ...(lead.credentials || [])].join(', '),
  ].filter(Boolean).join(': ') + (!lead.is_medical_director && lead.title ? ` · ${lead.title}` : '') : null

  const trust = heroTrust(c, { max: 3 })
  const rating = trust.find(t => t.kind === 'rating')
  const since = trust.find(t => t.kind === 'since')

  // Book online when they take bookings online, with a call beside it: most
  // med spa bookings still happen by phone.
  const bookingUrl = /^https?:\/\//i.test(c.business?.booking_url || '') ? c.business.booking_url : null
  const phone = c.business?.phone_display ? c.business.phone : null
  const conversion = labels.conversion.replace(/^\w/, ch => ch.toUpperCase())
  const primary = bookingUrl
    ? { href: bookingUrl, label: 'Book online', external: true }
    : phone ? { href: `tel:${phone}`, label: conversion } : { href: `${base}/contact`, label: conversion }
  const secondaryCta = bookingUrl && phone
    ? { href: `tel:${phone}`, label: `Call ${c.business.phone_display}` }
    : { href: `${base}${urlServices(c)}`, label: `View ${labels.offering.toLowerCase()}` }

  // "Not sure where to start?" For a visitor who knows the problem but not the
  // treatment, straight into the concern pages.
  const heroConcerns = concerns.slice(0, 5)

  return (
    <>
      <SereneResponsive border={T.colors.border} />
      {!c.concept && <JsonLd data={buildLocalBusinessSchema(c)} />}
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        {/* SPLIT HERO
            Asymmetric on purpose: type occupies the left, image bleeds off the
            right edge. Content-sized, so the next section shows beneath it. */}
        <section data-hero="" style={{
          display: 'grid',
          gridTemplateColumns: hero ? 'minmax(0, 1fr) minmax(0, 0.85fr)' : '1fr',
          alignItems: 'stretch',
          minHeight: 'clamp(380px, 52svh, 580px)',
          borderBottom: `1px solid ${T.colors.borderLight}`,
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(36px, 5vw, 72px) clamp(24px, 5vw, 96px)',
          }}>
            {eyebrow && (
              <div style={{ fontFamily: T.fonts.body, fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.textDim, marginBottom: 24 }}>
                {eyebrow}
              </div>
            )}

            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: 'clamp(34px, 4.4vw, 60px)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              margin: 0,
              color: T.colors.text,
              textWrap: 'balance',
            }}>
              {headline}
            </h1>

            {support && (
              <p style={{ fontSize: T.type.base, lineHeight: 1.7, color: T.colors.textDim, margin: '20px 0 0', maxWidth: 520 }}>
                {support}
              </p>
            )}

            {(rating || since || leadText) && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gap: 8, fontSize: 15, color: T.colors.textDim }}>
                {(rating || since) && (
                  <li style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 16px' }}>
                    {rating && (
                      <span>
                        <span style={{ fontFamily: T.fonts.display, fontSize: 22, color: T.colors.text }}>{rating.rating} ★</span>
                        {' '}{rating.count ? `${rating.count.toLocaleString('en-US')} ${c.reviews?.source === 'their_site' ? 'reviews' : 'Google reviews'}` : ''}
                        {c.concept && c.reviews?.source === 'their_site' ? ' (from your current site)' : ''}
                      </span>
                    )}
                    {since && <span>{since.text}</span>}
                  </li>
                )}
                {leadText && <li style={{ color: T.colors.text }}>{leadText}</li>}
              </ul>
            )}
            {c.concept && (!rating || !leadText) && (
              <div style={{ marginTop: 20, border: `1px dashed ${T.colors.border}`, borderRadius: T.radius.md, padding: '10px 14px', fontSize: 14, lineHeight: 1.5, color: T.colors.textDim, maxWidth: 520 }}>
                <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.colors.text, marginRight: 8 }}>Concept note</span>
                {!rating && !leadText
                  ? 'Your Google rating and your medical director\'s name and credentials go here.'
                  : !rating ? 'Your Google rating and review count go here.' : 'Your medical director\'s name and credentials go here.'}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a href={primary.href} {...(primary.external ? { rel: 'noopener' } : {})} style={{ ...{ padding: '15px 32px', borderRadius: T.radius.full, textDecoration: 'none', fontSize: T.type.sm, letterSpacing: '0.04em', whiteSpace: 'nowrap' }, background: T.colors.accent, color: T.colors.onAccent }}>
                {primary.label}
              </a>
              <a href={secondaryCta.href} style={{ ...{ padding: '15px 32px', borderRadius: T.radius.full, textDecoration: 'none', fontSize: T.type.sm, letterSpacing: '0.04em', whiteSpace: 'nowrap' }, border: `1px solid ${T.colors.border}`, color: T.colors.text }}>
                {secondaryCta.label}
              </a>
            </div>

            {heroConcerns.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 13, color: T.colors.textMuted, marginBottom: 10 }}>Not sure where to start?</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {heroConcerns.map(k => (
                    <a key={k.slug} href={`${base}/concerns/${k.slug}`} style={{ border: `1px solid ${T.colors.borderLight}`, borderRadius: T.radius.full, padding: '8px 14px', fontSize: 14, color: T.colors.text, textDecoration: 'none' }}>
                      {k.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {hero && (
            /* Source images are 1920px, so a full-bleed hero on a wide display
               stretches them past native size and reads as blurry. Capping the
               column keeps the image close to its actual resolution. */
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(240px, 32svh, 520px)', maxWidth: 700, justifySelf: 'end', width: '100%' }}>
              <HeroMedia image={hero.url ? hero : null} video={video} alt={c.business.display_name} />
            </div>
          )}
        </section>

        {has('trust_bar') && <TrustBar T={T} c={c} skip={[rating && 'rating', since && 'years', director && 'director'].filter(Boolean)} />}

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
                  border: `1px solid ${T.colors.accent}`,
                  color: T.colors.accent,
                  fontSize: T.type.sm,
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '14px 32px',
                  borderRadius: T.radius.full,
                  whiteSpace: 'nowrap',
                }}>
                  All {(c.services || []).length} {labels.offering.toLowerCase()}
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
                          ? `linear-gradient(180deg, ${T.colors.overlayLight} 0%, ${T.colors.overlayStrong} 100%)`
                          : 'none',
                      }} />
                      <div data-on-image={img ? '' : undefined} style={{ '--on-image': T.colors.textOnImage, '--on-image-dim': T.colors.textOnImageDim, color: img ? T.colors.textOnImage : T.colors.text, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: featured ? 48 : 32 }}>
                        <div style={{
                          fontSize: T.type.xs,
                          letterSpacing: '0.18em',
                          color: img ? T.colors.textOnImageDim : T.colors.accent,
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
                          <div style={{ fontSize: T.type.sm, color: img ? T.colors.textOnImageDim : T.colors.textDim, marginTop: 16, maxWidth: 420, lineHeight: 1.7 }}>
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
            <section style={{ padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 96px)', borderTop: `1px solid ${T.colors.borderLight}` }}>
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

                  <div>
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
        <SereneFooter T={T} c={c} base={base} />
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
