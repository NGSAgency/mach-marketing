import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter } from './SereneServices.js'
import { TrustBar, StickyBooking } from '../../../../lib/templates/shared/components/medical.js'

export default function SereneAbout({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const base = c.base_path || `/site/${siteSlug}`
  const gen = c.generated || {}
  const img = (c.images || {}).home_secondary || (c.images || {}).home_hero

  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        {/* Editorial opening: the first sentence carries at display size, the
            rest sits in a narrower column. A long block of prose set the same
            size throughout is what made this page read as thoughtless. */}
        {(() => {
          const story = (gen['about|story'] || gen['home|intro_paragraph'] || '').replace(/\s+/g, ' ').trim()
          const sentences = story.split(/(?<=[.!?])\s+/)
          const lead = sentences[0] || ''
          const body = sentences.slice(1)

          return (
            <>
              <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) clamp(32px, 4vw, 56px)' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                  <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 28 }}>
                    About {c.business.display_name}
                  </div>
                  <h1 style={{
                    fontFamily: T.fonts.display,
                    fontSize: 'clamp(28px, 3.8vw, 52px)',
                    fontWeight: 300,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    maxWidth: 900,
                  }}>
                    {lead}
                  </h1>
                </div>
              </section>

              <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(48px, 7vw, 88px)' }}>
                <div style={{
                  maxWidth: 1400,
                  margin: '0 auto',
                  display: 'grid',
                  gridTemplateColumns: img ? 'minmax(0, 6fr) minmax(0, 5fr)' : '1fr',
                  gap: 'clamp(32px, 6vw, 88px)',
                  alignItems: 'start',
                }}>
                  <div style={{ maxWidth: 620, fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
                    {body.map((s, i) => <p key={i} style={{ margin: '0 0 20px' }}>{s}</p>)}
                  </div>

                  {img && (
                    <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                      <img src={img.url} alt={img.alt || c.business.display_name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                </div>
              </section>
            </>
          )
        })()}

        {/* Approach as numbered points rather than another wall of prose */}
        {gen['about|our_approach'] && (
          <section style={{ background: T.colors.bgAlt, padding: 'clamp(56px, 8vw, 96px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <h2 style={{
                fontFamily: T.fonts.display,
                fontSize: 'clamp(26px, 3.4vw, 42px)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                margin: '0 0 48px',
              }}>
                How we work
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 'clamp(24px, 4vw, 56px)' }}>
                {gen['about|our_approach']
                  .replace(/\s+/g, ' ')
                  .split(/(?<=[.!?])\s+/)
                  .filter(s => s.length > 40)
                  .slice(0, 4)
                  .map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: T.fonts.display, fontSize: 26, fontWeight: 300, color: T.colors.accent, marginBottom: 14, lineHeight: 1 }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p style={{ fontSize: T.type.sm, lineHeight: 1.8, color: T.colors.textDim, margin: 0 }}>{s}</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        <TrustBar T={T} c={c} />
        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
