import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
import { TrustBar, StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

export default function SereneAbout({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  const base = c.base_path || `/site/${siteSlug}`
  const gen = c.generated || {}
  const labels = navLabels(c)
  const img = (c.images || {}).home_secondary || (c.images || {}).home_hero

  const crumbs = [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]

  return (
    <>
      <SereneResponsive border={T.colors.border} />
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        {/* Structured rather than narrative. A story-first about page depends
            entirely on the story being good; a structured one holds up whatever
            copy goes in it, which also makes it fillable later. */}
        {(() => {
          const story = (gen['about|story'] || gen['home|intro_paragraph'] || '').replace(/\s+/g, ' ').trim()
          const sentences = story.split(/(?<=[.!?])\s+/)
          const lead = sentences[0] || ''
          const body = sentences.slice(1)

          const facts = []
          if (c.business.established_year) facts.push({ k: 'Established', v: c.business.established_year })
          if (c.business.address_line) facts.push({ k: 'Location', v: c.business.address_line })
          if ((c.services || []).length) facts.push({ k: labels.offering, v: `${c.services.length} offered` })
          if ((c.service_areas || []).length) facts.push({ k: 'Areas served', v: `${c.service_areas.length}` })

          return (
            <>
              <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) 0' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                  <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 28 }}>
                    About
                  </div>
                  <h1 style={{
                    fontFamily: T.fonts.display,
                    fontSize: 'clamp(28px, 3.8vw, 52px)',
                    fontWeight: 300,
                    lineHeight: 1.18,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    maxWidth: 880,
                  }}>
                    {lead}
                  </h1>
                </div>
              </section>

              {/* Image bleeding to the right edge, facts stacked against it.
                  Gives the page a spine rather than a column of prose. */}
              <section style={{ padding: 'clamp(40px, 6vw, 72px) 0 clamp(48px, 7vw, 88px) clamp(24px, 5vw, 96px)' }}>
                <div style={{
                  maxWidth: 1500,
                  margin: '0 auto',
                  display: 'grid',
                  gridTemplateColumns: img ? 'minmax(0, 5fr) minmax(0, 6fr)' : '1fr',
                  gap: 'clamp(32px, 5vw, 72px)',
                  alignItems: 'center',
                }}>
                  <div style={{ maxWidth: 560 }}>
                    <div style={{ fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
                      {body.slice(0, 3).map((s, i) => <p key={i} style={{ margin: '0 0 20px' }}>{s}</p>)}
                    </div>

                    {facts.length > 0 && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: 24,
                        marginTop: 40,
                        paddingTop: 32,
                        borderTop: `1px solid ${T.colors.borderLight}`,
                      }}>
                        {facts.map(f => (
                          <div key={f.k}>
                            <div style={{ fontSize: T.type.xs, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.colors.textMuted, marginBottom: 8 }}>
                              {f.k}
                            </div>
                            <div style={{ fontFamily: T.fonts.display, fontSize: 'clamp(19px, 2.1vw, 25px)', fontWeight: 300, color: T.colors.text }}>
                              {f.v}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {img && (
                    <div style={{ aspectRatio: '5/4', overflow: 'hidden' }}>
                      <img src={img.url} alt={img.alt || c.business.display_name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                </div>
              </section>
            </>
          )
        })()}

        {/* Approach as numbered points */}
        {gen['about|our_approach'] && (
          <section style={{ background: T.colors.bgAlt, padding: 'clamp(56px, 8vw, 96px) clamp(24px, 5vw, 96px)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <h2 style={{
                fontFamily: T.fonts.display,
                fontSize: 'clamp(26px, 3.4vw, 42px)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                margin: '0 0 56px',
                maxWidth: 620,
              }}>
                How we work
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 'clamp(24px, 4vw, 56px)' }}>
                {gen['about|our_approach']
                  .replace(/\s+/g, ' ')
                  .split(/(?<=[.!?])\s+/)
                  .filter(s => s.length > 40)
                  .slice(0, 4)
                  .map((s, i) => (
                    <div key={i} style={{ borderTop: `1px solid ${T.colors.border}`, paddingTop: 24 }}>
                      <div style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 300, color: T.colors.accent, marginBottom: 16, lineHeight: 1 }}>
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
