export const metadata = { title: 'MACH — Design Directions', robots: { index: false, follow: false } }

export default function PreviewIndex() {
  const options = [
    { slug: 'a', name: 'Modern Minimal', description: 'Linear/Vercel-style. Dark theme, big fluid typography, restrained. Focus on words + whitespace. Feels like a tech company.', vibe: 'Confident, tech-forward, quiet' },
    { slug: 'b', name: 'Bold Marketing', description: 'Stripe/Ramp-style. Gradient hero, colorful feature cards with icons, high-energy. Feels like a modern SaaS product.', vibe: 'Energetic, approachable, modern SaaS' },
    { slug: 'c', name: 'Editorial + Technical', description: 'Publication-inspired. Serif type, generous margins, warm palette, numbered sections. Feels like a well-crafted essay.', vibe: 'Sophisticated, thoughtful, premium' },
  ]
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '60px 20px', fontFamily: '-apple-system, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5, margin: '0 0 12px 0' }}>MACH — Design Directions</h1>
        <p style={{ fontSize: 17, color: '#666', lineHeight: 1.6, marginBottom: 48, maxWidth: 640 }}>Three home page treatments for the MACH marketing site. Same messaging, different aesthetic. Pick one to move forward with.</p>
        <div style={{ display: 'grid', gap: 20 }}>
          {options.map(opt => (
            <a key={opt.slug} href={`/preview/${opt.slug}`} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28, textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>Option {opt.slug.toUpperCase()}: {opt.name}</div>
                <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>{opt.vibe}</div>
              </div>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.55, margin: '0 0 16px 0' }}>{opt.description}</p>
              <div style={{ fontSize: 14, color: '#0066ff', fontWeight: 600 }}>View →</div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 48, padding: 20, background: '#fff8e1', borderRadius: 8, fontSize: 14, color: '#5c4a00', lineHeight: 1.6 }}>
          <strong>Note:</strong> Visual direction only. Colors will match final logo. Content is placeholder. Full page builds (Services, Industries, Team, Contact) come next.
        </div>
      </div>
    </div>
  )
}
