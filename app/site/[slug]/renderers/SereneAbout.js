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

        <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) clamp(32px, 5vw, 56px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              About
            </div>
            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: 'clamp(32px, 4.6vw, 60px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: 820,
            }}>
              {c.business.display_name}
            </h1>
          </div>
        </section>

        <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(56px, 8vw, 96px)' }}>
          <div style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: img ? 'minmax(0, 7fr) minmax(0, 5fr)' : '1fr',
            gap: 'clamp(32px, 6vw, 88px)',
            alignItems: 'start',
          }}>
            <div style={{ maxWidth: 640, fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
              {(gen['about|story'] || gen['home|intro_paragraph'] || '').split('\n\n').map((p, i) => (
                <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>
              ))}
              {gen['about|our_approach'] && (
                <>
                  <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, margin: '40px 0 20px' }}>
                    Our approach
                  </div>
                  {gen['about|our_approach'].split('\n\n').map((p, i) => (
                    <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>
                  ))}
                </>
              )}
            </div>

            {img && (
              <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                <img src={img.url} alt={img.alt || c.business.display_name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
          </div>
        </section>

        <TrustBar T={T} c={c} />
        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
