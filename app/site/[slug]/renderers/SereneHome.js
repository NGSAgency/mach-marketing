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

  // Which components this industry calls for, and its concern list
  const components = c.profile?.components || []
  const hasComponent = (key) => components.includes(key)
  const concerns = c.concerns || []

  const visibleServices = (c.services || []).slice(0, 9)
  // A grid mixing image cards and text-only cards looks broken, so only use
  // images when most of the visible cards can actually be filled.
  const withImages = visibleServices.filter(s => imgs[`service_${s.slug}`]).length
  const useCardImages = withImages >= Math.ceil(visibleServices.length / 2)

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
      <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        {/* Hero. Image-led when we have a photo, typography-led when we do not.
            Both are intentional compositions rather than one being a fallback:
            in this vertical an empty space reads as restraint, but a real image
            does far more work. */}
        {hero && (
          <section style={{ position: 'relative', height: 'clamp(420px, 60vh, 640px)', overflow: 'hidden' }}>
            <img
              src={hero.url}
              alt={hero.alt || c.business.display_name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(43,39,36,0.15) 0%, rgba(43,39,36,0.55) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 'clamp(32px, 6vw, 72px)' }}>
              <div style={{ maxWidth: 720 }}>
                <h1 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(38px, 7vw, 72px)', fontWeight: 400, letterSpacing: 0.5, lineHeight: 1.08, margin: 0, color: '#fff' }}>
                  {c.business.display_name}
                </h1>
                <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.92)', marginTop: 18, lineHeight: 1.6, maxWidth: 560 }}>
                  {gen['home|hero_subheadline'] || c.positioning?.tagline}
                </p>
              </div>
            </div>
          </section>
        )}

        <section style={{ padding: hero ? 'clamp(48px, 7vw, 88px) 32px clamp(40px, 6vw, 72px)' : 'clamp(72px, 12vw, 160px) 32px clamp(56px, 8vw, 100px)' }}>
          <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            {!hero && (
              <>
                <h1 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(40px, 8vw, 76px)', fontWeight: 400, letterSpacing: 0.5, lineHeight: 1.08, margin: 0, color: T.colors.text }}>
                  {c.business.display_name}
                </h1>
                <p style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', color: T.colors.textDim, marginTop: 24, lineHeight: 1.7, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
                  {gen['home|hero_subheadline'] || c.positioning?.tagline}
                </p>
              </>
            )}
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
              {visibleServices.map(s => {
                const img = imgs[`service_${s.slug}`]
                return (
                  <a
                    key={s.slug}
                    href={`${base}${urlService(s.slug, c)}`}
                    style={{
                      background: T.colors.surface,
                      border: `1px solid ${T.colors.borderLight}`,
                      borderRadius: T.radius.lg,
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      overflow: 'hidden',
                    }}
                  >
                    {useCardImages && (
                      <div style={{ aspectRatio: '4/3', background: T.colors.bgAlt, overflow: 'hidden' }}>
                        {img && (
                          <img
                            src={img.url}
                            alt={img.alt || s.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        )}
                      </div>
                    )}
                    <div style={{ padding: 28 }}>
                      <div style={{ fontFamily: T.fonts.display, fontSize: 21, fontWeight: 400, color: T.colors.text }}>{s.name}</div>
                      {s.short && <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 10, lineHeight: 1.65 }}>{s.short}</div>}
                    </div>
                  </a>
                )
              })}
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

        {/* Components this vertical requires. Each renders an honest placeholder
            when the practice has not supplied the underlying data, rather than
            filling the space with stock imagery or invented credentials. */}
        {hasComponent('trust_bar') && <TrustBar T={T} c={c} />}
        {hasComponent('concerns_grid') && <ConcernsGrid T={T} c={c} base={base} concerns={concerns} />}
        {hasComponent('reviews') && <Reviews T={T} c={c} />}
        {hasComponent('before_after') && <BeforeAfterGallery T={T} c={c} cases={c.before_after || []} />}
        {hasComponent('providers') && <Providers T={T} c={c} providers={c.providers || []} base={base} />}

        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} />
        {hasComponent('sticky_booking') && <StickyBooking T={T} c={c} />}
      </div>
    </>
  )
}
