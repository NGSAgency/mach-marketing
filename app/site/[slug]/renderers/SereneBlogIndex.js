import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter } from './SereneServices.js'
import { StickyBooking } from '../../../../lib/templates/shared/components/medical.js'
import SereneResponsive from '../../../../lib/templates/shared/components/SereneResponsive.js'

export default function SereneBlogIndex({ config: c, siteSlug, posts = [] }) {
  const T = applyBrand(sereneTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const base = c.base_path || `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]

  const imgs = c.images || {}

  const imageFor = (post) => {
    const t = String(post.title || '').toLowerCase()
    const match = (c.services || []).find(s => {
      const name = String(s.name || '').toLowerCase()
      return name && (t.includes(name) || name.split(' ').every(w => w.length > 3 && t.includes(w)))
    })
    return match ? imgs[`service_${match.slug}`] : null
  }

  const withImages = posts.map(p => ({ ...p, image: imageFor(p) }))
  const featured = withImages[0]
  const rest = withImages.slice(1)

  return (
    <>
      <SereneResponsive />
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
              <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(32px, 4vw, 56px)' }}>
                <a
                  href={`${base}/blog/${featured.slug}`}
                  style={{
                    position: 'relative',
                    display: 'block',
                    maxWidth: 1400,
                    margin: '0 auto',
                    minHeight: 'clamp(320px, 46vh, 480px)',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: T.colors.text,
                    background: T.colors.surface,
                  }}
                >
                  {featured.image && (
                    <img
                      src={featured.image.url}
                      alt={featured.image.alt || featured.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${T.colors.overlayLight} 0%, ${T.colors.overlayStrong} 100%)` }} />
                  <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(28px, 4vw, 56px)', minHeight: 'clamp(280px, 36vh, 380px)' }}>
                    <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 18 }}>
                      Latest
                    </div>
                    <h2 style={{
                      fontFamily: T.fonts.display,
                      fontSize: 'clamp(26px, 3.6vw, 46px)',
                      fontWeight: 300,
                      lineHeight: 1.12,
                      letterSpacing: '-0.02em',
                      margin: 0,
                      maxWidth: 820,
                    }}>
                      {featured.title}
                    </h2>
                  </div>
                </a>
              </section>
            )}

            {rest.length > 0 && (
              <section style={{ padding: '0 clamp(24px, 5vw, 96px) clamp(64px, 9vw, 112px)' }}>
                <div style={{
                  maxWidth: 1400,
                  margin: '0 auto',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                  gap: 8,
                }}>
                  {rest.map((post, i) => (
                    <a
                      key={post.slug || i}
                      href={`${base}/blog/${post.slug}`}
                      style={{
                        position: 'relative',
                        display: 'block',
                        minHeight: 260,
                        overflow: 'hidden',
                        textDecoration: 'none',
                        color: T.colors.text,
                        background: T.colors.surface,
                      }}
                    >
                      {post.image && (
                        <img
                          src={post.image.url}
                          alt={post.image.alt || post.title}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                        />
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: post.image ? `linear-gradient(180deg, ${T.colors.overlayFaint} 0%, ${T.colors.overlayStrong} 100%)` : 'none' }} />
                      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 28, minHeight: 260 }}>
                        <h3 style={{
                          fontFamily: T.fonts.display,
                          fontSize: 'clamp(18px, 2vw, 23px)',
                          fontWeight: 300,
                          lineHeight: 1.25,
                          margin: 0,
                        }}>
                          {post.title}
                        </h3>
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
