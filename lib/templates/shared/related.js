// Links between related pages: on a treatment page, the concerns it helps
// with and the articles about it; on an article, the treatments it covers.
// Command Center works out the pairs (config.links, src/lib/related-links.js);
// this only draws them, in whichever family's colours and type it's given.
// Nothing renders when there's nothing to link.
import { urlService } from './seo/urls.js'

const lower = (s) => String(s || '').toLowerCase()

/** { concerns, posts } for a treatment, { services } for an article. */
export function linksFor(c, kind, slug) {
  const l = c?.links?.[kind]?.[slug] || {}
  const concerns = new Set((c?.concerns || []).map(x => x.slug))
  const services = new Set((c?.services || []).map(x => x.slug))
  return {
    // Only pages that exist on the site right now
    concerns: (l.concerns || []).filter(x => concerns.has(x.slug)),
    posts: l.posts || [],
    services: (l.services || []).filter(x => services.has(x.slug)),
  }
}

/**
 * kind: 'service' (a treatment page) or 'post' (an article).
 * C: { text, textDim, accent, border }, F: { display }.
 * wrap: the family's content width (omit inside an existing column).
 */
export function RelatedLinks({ c, base, kind, slug, C, F, wrap, pad = 'clamp(36px, 5vw, 64px)', align = 'left' }) {
  const l = linksFor(c, kind, slug)
  const offering = c?.profile?.nouns?.offering?.plural || 'services'
  const groups = kind === 'post'
    ? [{ key: 'services', title: `${offering.replace(/^\w/, ch => ch.toUpperCase())} in this article`, items: l.services.map(s => ({ href: `${base}${urlService(s.slug, c)}`, label: s.name })) }]
    : [
        { key: 'concerns', title: 'Concerns it helps with', items: l.concerns.map(x => ({ href: `${base}/concerns/${x.slug}`, label: x.label })) },
        { key: 'posts', title: 'Further reading', items: l.posts.map(p => ({ href: `${base}/blog/${p.slug}`, label: p.title })) },
      ]
  const shown = groups.filter(g => g.items.length)
  if (!shown.length) return null

  const inner = (
    <div style={{ display: 'grid', gap: 28, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', textAlign: align }}>
      {shown.map(g => (
        <nav key={g.key} aria-label={g.title}>
          <h2 style={{ fontFamily: F?.display, fontSize: 'clamp(18px, 1.8vw, 22px)', lineHeight: 1.25, margin: '0 0 12px', color: C?.text }}>{g.title}</h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 }}>
            {g.items.map(it => (
              <li key={it.href}>
                <a href={it.href} style={{ color: C?.accent || C?.text, textDecoration: 'underline', textUnderlineOffset: 3, fontSize: 16, lineHeight: 1.5 }}>{it.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  )
  if (!wrap) return <div style={{ marginBlock: 32 }}>{inner}</div>
  return (
    <section style={{ paddingBlock: pad, borderTop: `1px solid ${C?.border || 'rgba(0,0,0,0.1)'}` }}>
      <div style={wrap}>{inner}</div>
    </section>
  )
}

export { lower }
