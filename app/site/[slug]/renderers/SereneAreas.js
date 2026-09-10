import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd, urlArea, urlServiceAreas } from '../../../../lib/templates/shared/seo/index.js'
import { countLabel } from '../../../../lib/templates/shared/claims.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

/**
 * Index of every area page. Text tiles rather than photos: there is no
 * imagery specific to a place, and a treatment photo repeated across areas
 * reads as a mistake.
 */
export default function SereneAreas({ config: c, siteSlug }) {
  const T = applyBrand(sereneTokens, brandFrom(c))
  // Mockups render the same pages under /mockup/<token>, so the base path
  // comes from the config when present rather than being hardcoded.
  const base = c.base_path || `/site/${siteSlug}`
  const labels = navLabels(c)
  const areas = (c.service_areas || []).filter(Boolean)
  const offeringNoun = c.profile?.nouns?.offering || {}
  const offeringCount = countLabel(
    (c.services || []).length,
    offeringNoun.singular || 'service',
    offeringNoun.plural || 'services',
  )

  const crumbs = [{ name: 'Home', url: '/' }, { name: labels.place, url: urlServiceAreas(c) }]

  return (
    <>
      <SereneResponsive border={T.colors.border} />
      {c.concept !== true && <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />}
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) clamp(32px, 4vw, 56px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              {labels.place}
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
              Areas we serve
            </h1>
          </div>
        </section>

        <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 112px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {areas.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
                gap: 8,
              }}>
                {areas.map((area, i) => (
                  <a
                    key={area}
                    href={`${base}${urlArea(area, c)}`}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: 180,
                      padding: 28,
                      background: T.colors.surface,
                      border: `1px solid ${T.colors.borderLight}`,
                      textDecoration: 'none',
                      color: T.colors.text,
                    }}
                  >
                    <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', color: T.colors.accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <div style={{ fontFamily: T.fonts.display, fontSize: 'clamp(21px, 2.4vw, 27px)', fontWeight: 300, lineHeight: 1.15 }}>
                        {area}
                      </div>
                      {offeringCount && (
                        <div style={{ fontSize: T.type.sm, color: T.colors.textDim, marginTop: 10 }}>
                          {offeringCount}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p style={{
                fontSize: T.type.base,
                lineHeight: 1.8,
                color: T.colors.textDim,
                margin: 0,
                paddingTop: 32,
                borderTop: `1px solid ${T.colors.borderLight}`,
                maxWidth: 640,
              }}>
                No areas are listed yet.
              </p>
            )}
          </div>
        </section>

        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} base={base} />
      </div>
    </>
  )
}
