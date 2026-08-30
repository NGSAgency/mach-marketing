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
            {/* Lead post at scale, the rest in a grid. A single long list of
                titles reads as an archive rather than something to read. */}
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
                    borderTop: `1px solid ${T.colors.border}`,
                    paddingTop: 40,
                  }}
                >
                  <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', color: T.colors.accent, marginBottom: 18 }}>
                    Latest
                  </div>
                  <h2 style={{
                    fontFamily: T.fonts.display,
                    fontSize: 'clamp(28px, 4vw, 52px)',
                    fontWeight: 300,
                    lineHeight: 1.12,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    maxWidth: 960,
                  }}>
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p style={{ fontSize: T.type.base, lineHeight: 1.8, color: T.colors.textDim, marginTop: 20, maxWidth: 640 }}>
                      {featured.excerpt}
                    </p>
                  )}
                </a>
              </section>
            )}

            {rest.length > 0 && (
              <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 112px)' }}>
                <div style={{
                  maxWidth: 1400,
                  margin: '0 auto',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
                  gap: 'clamp(24px, 3vw, 48px)',
                }}>
                  {rest.map((post, i) => (
                    <a
                      key={post.slug || i}
                      href={`${base}/blog/${post.slug}`}
                      style={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit',
                        borderTop: `1px solid ${T.colors.borderLight}`,
                        paddingTop: 24,
                      }}
                    >
                      <div style={{ fontSize: T.type.xs, letterSpacing: '0.14em', color: T.colors.textMuted, marginBottom: 12 }}>
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                          : String(i + 2).padStart(2, '0')}
                      </div>
                      <h3 style={{
                        fontFamily: T.fonts.display,
                        fontSize: 'clamp(19px, 2.1vw, 24px)',
                        fontWeight: 300,
                        lineHeight: 1.28,
                        margin: 0,
                        color: T.colors.text,
                      }}>
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p style={{ fontSize: T.type.sm, lineHeight: 1.75, color: T.colors.textDim, margin: '12px 0 0' }}>
                          {post.excerpt}
                        </p>
                      )}
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
