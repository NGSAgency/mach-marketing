// =========================================================
// SHARED BLOG CORE
//
// Owns article structure and every SEO-critical concern: Article schema,
// FAQ schema, breadcrumbs, and heading hierarchy. Template families supply
// only tokens and their header/footer chrome.
//
// Adding a new template family means passing different tokens and chrome —
// never reimplementing this file. That keeps SEO from drifting between
// families or being forgotten when a family is added.
// =========================================================

import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildSchemaBlock,
  JsonLd,
  breadcrumbsForBlogIndex,
  breadcrumbsForBlogPost,
} from '../seo/index.js'

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return ''
  }
}

function readingTime(words) {
  if (!words) return null
  return Math.max(1, Math.round(words / 225))
}

/**
 * Blog index.
 *
 * @param {Object}   props.T        - family design tokens
 * @param {Object}   props.config   - client site config
 * @param {Array}    props.posts    - published posts
 * @param {string}   props.base     - route base, e.g. /site/acme
 * @param {Function} props.Chrome   - family wrapper supplying header + footer
 */
export function BlogIndexCore({ T, config: c, posts = [], base = '', Chrome }) {
  const crumbs = breadcrumbsForBlogIndex()
  const colors = T.colors
  const fonts = T.fonts

  const body = (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />

      <section style={{ background: colors.bgAlt, padding: 'clamp(48px, 8vw, 80px) 24px', borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontFamily: fonts.display, fontSize: 12, color: colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>
            Blog
          </div>
          <h1 style={{ fontFamily: fonts.display, fontSize: 'clamp(28px, 6vw, 56px)', fontWeight: 800, letterSpacing: -1, margin: 0, color: colors.text }}>
            Guides, tips, and answers
          </h1>
          <p style={{ fontSize: 18, color: colors.textDim, marginTop: 16, maxWidth: 640 }}>
            Practical advice from the team at {c.business?.display_name}.
          </p>
        </div>
      </section>

      <section style={{ background: colors.bg, padding: 'clamp(40px, 6vw, 72px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {posts.length === 0 ? (
            <p style={{ color: colors.textDim, fontSize: 16 }}>New articles are on the way. Check back soon.</p>
          ) : (
            <div style={{ display: 'grid', gap: 20 }}>
              {posts.map(p => (
                <a
                  key={p.slug}
                  href={`${base}/blog/${p.slug}`}
                  style={{
                    display: 'block',
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderLeft: `4px solid ${colors.accent}`,
                    padding: 'clamp(20px, 3vw, 28px)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <h2 style={{ fontFamily: fonts.display, fontSize: 'clamp(19px, 2.6vw, 24px)', fontWeight: 700, margin: 0, color: colors.text, lineHeight: 1.25 }}>
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p style={{ fontSize: 16, color: colors.textDim, marginTop: 10, lineHeight: 1.6 }}>{p.excerpt}</p>
                  )}
                  <div style={{ fontSize: 13, color: colors.textDim, marginTop: 14, opacity: 0.85 }}>
                    {formatDate(p.published_at)}
                    {readingTime(p.word_count) ? ` · ${readingTime(p.word_count)} min read` : ''}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )

  return <Chrome>{body}</Chrome>
}

/**
 * Single blog post.
 */
export function BlogPostCore({ T, config: c, post, prev, next, base = '', Chrome }) {
  const crumbs = breadcrumbsForBlogPost(post)
  const colors = T.colors
  const fonts = T.fonts

  const faqs = Array.isArray(post.schema_faq) ? post.schema_faq : []

  const schemas = [
    buildArticleSchema(c, post),
    buildBreadcrumbSchema(c, crumbs),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ].filter(Boolean)

  const body = (
    <>
      {schemas.map((s, i) => <JsonLd key={i} data={s} />)}

      <article>
        <header style={{ background: colors.bgAlt, padding: 'clamp(48px, 8vw, 80px) 24px 40px', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <a href={`${base}/blog`} style={{ fontFamily: fonts.display, fontSize: 12, color: colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none' }}>
              ← Blog
            </a>
            <h1 style={{ fontFamily: fonts.display, fontSize: 'clamp(26px, 5.5vw, 46px)', fontWeight: 800, letterSpacing: -0.5, margin: '20px 0 0', color: colors.text, lineHeight: 1.15 }}>
              {post.title}
            </h1>
            <div style={{ fontSize: 14, color: colors.textDim, marginTop: 16, opacity: 0.85 }}>
              {formatDate(post.published_at)}
              {readingTime(post.word_count) ? ` · ${readingTime(post.word_count)} min read` : ''}
            </div>
          </div>
        </header>

        <div style={{ background: colors.bg, padding: 'clamp(36px, 5vw, 56px) 24px' }}>
          <div
            className="mach-article"
            style={{ maxWidth: 720, margin: '0 auto', color: colors.text, fontSize: 17, lineHeight: 1.75 }}
            dangerouslySetInnerHTML={{ __html: post.body_html || '' }}
          />
        </div>

        {(prev || next) && (
          <nav style={{ background: colors.bgAlt, padding: '40px 24px', borderTop: `1px solid ${colors.border}` }}>
            <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gap: 16, gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr' }}>
              {prev && (
                <a href={`${base}/blog/${prev.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ fontSize: 12, color: colors.textDim, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Previous</div>
                  <div style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: colors.text }}>{prev.title}</div>
                </a>
              )}
              {next && (
                <a href={`${base}/blog/${next.slug}`} style={{ textDecoration: 'none', color: 'inherit', textAlign: prev ? 'right' : 'left' }}>
                  <div style={{ fontSize: 12, color: colors.textDim, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Next</div>
                  <div style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: colors.text }}>{next.title}</div>
                </a>
              )}
            </div>
          </nav>
        )}
      </article>

      {/* Article body styling. Scoped so it cannot leak into family chrome. */}
      <style dangerouslySetInnerHTML={{ __html: `
        .mach-article h2 { font-family: ${fonts.display}; font-size: clamp(21px, 3.2vw, 28px); font-weight: 800; line-height: 1.25; margin: 40px 0 14px; color: ${colors.text}; }
        .mach-article h3 { font-family: ${fonts.display}; font-size: clamp(17px, 2.4vw, 20px); font-weight: 700; margin: 28px 0 10px; color: ${colors.text}; }
        .mach-article p { margin: 0 0 18px; color: ${colors.textDim}; }
        .mach-article ul, .mach-article ol { margin: 0 0 18px; padding-left: 22px; color: ${colors.textDim}; }
        .mach-article li { margin-bottom: 8px; }
        .mach-article a { color: ${colors.accent}; text-decoration: underline; }
        .mach-article strong { color: ${colors.text}; font-weight: 700; }
        .mach-article > *:first-child { margin-top: 0; }
      ` }} />
    </>
  )

  return <Chrome>{body}</Chrome>
}
