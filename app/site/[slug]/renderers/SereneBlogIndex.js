import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter } from './SereneServices.js'
import { StickyBooking } from '../../../../lib/templates/shared/components/medical.js'

export default function SereneBlogIndex({ config: c, siteSlug, posts = [] }) {
  const T = applyBrand(sereneTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const base = c.base_path || `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 96px) clamp(32px, 5vw, 56px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              Journal
            </div>
            <h1 style={{
              fontFamily: T.fonts.display,
              fontSize: 'clamp(32px, 4.6vw, 60px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Notes from the practice
            </h1>
          </div>
        </section>

        {posts.length === 0 ? (
          <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 112px)' }}>
            <div style={{ maxWidth: 720, fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
              Posts appear here, each written around a question your clients actually ask
              and structured so search engines can lift the answer directly.
            </div>
          </section>
        ) : (
          <>
            {featured && (
              <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(40px, 6vw, 72px)' }}>
                <a
                  href={`${base}/blog/${featured.slug}`}
                  style={{
                    display: 'block',
                    maxWidth: 1400,
                    margin: '0 auto',
                    textDecoration: 'none',
                    color: 'inherit',
                    borderTop: `1px solid ${T.colors.borderLight}`,
                    paddingTop: 40,
                  }}
                >
                  <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', color: T.colors.accent, marginBottom: 16 }}>
                    Latest
                  </div>
                  <h2 style={{
                    fontFamily: T.fonts.display,
                    fontSize: 'clamp(26px, 3.6vw, 46px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                    margin: 0,
                    maxWidth: 900,
                  }}>
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p style={{ fontSize: T.type.base, lineHeight: 1.8, color: T.colors.textDim, marginTop: 18, maxWidth: 640 }}>
                      {featured.excerpt}
                    </p>
                  )}
                </a>
              </section>
            )}

            {rest.length > 0 && (
              <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 112px)' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                  {rest.map((post, i) => (
                    <a
                      key={post.slug || i}
                      href={`${base}/blog/${post.slug}`}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 8fr)',
                        gap: 'clamp(16px, 4vw, 56px)',
                        padding: '28px 0',
                        borderTop: `1px solid ${T.colors.borderLight}`,
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <div style={{ fontSize: T.type.xs, letterSpacing: '0.1em', color: T.colors.textMuted, paddingTop: 6 }}>
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: T.fonts.display,
                          fontSize: 'clamp(19px, 2.2vw, 26px)',
                          fontWeight: 300,
                          lineHeight: 1.25,
                          margin: 0,
                        }}>
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p style={{ fontSize: T.type.sm, lineHeight: 1.75, color: T.colors.textDim, margin: '10px 0 0', maxWidth: 620 }}>
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <SereneCTA T={T} c={c} />
        <SereneFooter T={T} c={c} />
        <StickyBooking T={T} c={c} />
      </div>
    </>
  )
}
