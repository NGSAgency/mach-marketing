export const metadata = { title: 'MACH - Design Directions', robots: { index: false, follow: false } }

export default function PreviewIndex() {
  const options = [
    {
      slug: 'a', name: 'The Case File',
      vibe: 'Narrative-driven, editorial long-form',
      description: 'Home page tells the story of what we do through a scrolling case narrative. Numbers animate, before/after moments, embedded services within the story. Feels like a Bloomberg long-form piece.',
    },
    {
      slug: 'b', name: 'The Console',
      vibe: 'Interactive, product-like, alive',
      description: 'Full-screen dashboard on landing with metrics that feel real-time. Services shown as hoverable modules. Command palette navigation. Feels like a product, not a marketing site.',
    },
    {
      slug: 'c', name: 'The Manifesto',
      vibe: 'Bold statement, huge typography, minimalist',
      description: 'Single long scroll of a manifesto - one sentence per section, HUGE typography, no traditional hero. Services page is an essay. Team page is 3 quotes. Feels like a top-tier design agency.',
    },
  ]

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '60px 20px', fontFamily: '-apple-system, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2, margin: '0 0 12px 0' }}>MACH - Design Directions</h1>
        <p style={{ fontSize: 17, color: '#666', lineHeight: 1.6, marginBottom: 48, maxWidth: 680 }}>
          Three completely different site architectures. Not skins - different experiences. Each with all 5 pages built out.
        </p>

        <div style={{ display: 'grid', gap: 20 }}>
          {options.map(opt => (
            <a key={opt.slug} href={`/preview/${opt.slug}`} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28, textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8 }}>Option {opt.slug.toUpperCase()}: {opt.name}</div>
                <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>{opt.vibe}</div>
              </div>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.55, margin: '0 0 16px 0' }}>{opt.description}</p>
              <div style={{ fontSize: 14, color: '#0066ff', fontWeight: 600 }}>View full site →</div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', color: '#999', fontSize: 13 }}>
          Share: <strong>machdigitalsolutions.com/preview</strong>
        </div>
      </div>
    </div>
  )
}
