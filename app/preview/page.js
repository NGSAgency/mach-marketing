export const metadata = { title: 'MACH - Design Directions', robots: { index: false, follow: false } }

export default function PreviewIndex() {
  const options = [
    {
      slug: 'd', name: 'Studio',
      vibe: 'Editorial, boutique, warm',
      description: 'Serif display with editorial layout. Warm off-white palette with numbered sections. Feels like a smart, deliberate design studio.',
      status: 'ready',
    },
    {
      slug: 'e', name: 'Signal',
      vibe: 'Tech-forward, engineered, precise',
      description: 'Dark theme with subtle grid motif and monospaced accents. Vibrant single accent color. Feels like a modern infra/product company.',
      status: 'ready',
    },
    {
      slug: 'f', name: 'Frame',
      vibe: 'High-contrast, geometric, brand-first',
      description: 'Bold geometric sans with framed section headers. White base with electric accent + moody color blocks per section. Feels like a modern brand agency.',
      status: 'ready',
    },
  ]

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '60px 20px', fontFamily: '-apple-system, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2, margin: '0 0 12px 0' }}>MACH - Design Directions</h1>
        <p style={{ fontSize: 17, color: '#666', lineHeight: 1.6, marginBottom: 48, maxWidth: 680 }}>
          Three full-site treatments (Home, Services, Industries, Team, Contact) for the MACH marketing site. Each option shows a distinct visual direction with the real content. Pick one to move forward with.
        </p>

        <div style={{ display: 'grid', gap: 20 }}>
          {options.map(opt => {
            const isReady = opt.status === 'ready' || opt.status === 'in_progress'
            const label = opt.status === 'ready' ? 'View full site →' : opt.status === 'in_progress' ? 'In progress (home only) →' : 'Coming soon'
            const cardStyle = {
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: 12,
              padding: 28,
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              opacity: opt.status === 'coming_soon' ? 0.5 : 1,
              cursor: opt.status === 'coming_soon' ? 'not-allowed' : 'pointer',
            }
            const Wrapper = ({ children }) => isReady
              ? <a href={`/preview/${opt.slug}`} style={cardStyle}>{children}</a>
              : <div style={cardStyle}>{children}</div>
            return (
              <Wrapper key={opt.slug}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8 }}>Option {opt.slug.toUpperCase()}: {opt.name}</div>
                  <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>{opt.vibe}</div>
                </div>
                <p style={{ fontSize: 15, color: '#555', lineHeight: 1.55, margin: '0 0 16px 0' }}>{opt.description}</p>
                <div style={{ fontSize: 14, color: '#0066ff', fontWeight: 600 }}>{label}</div>
              </Wrapper>
            )
          })}
        </div>

        <div style={{ marginTop: 48, padding: 20, background: '#fff8e1', borderRadius: 8, fontSize: 14, color: '#5c4a00', lineHeight: 1.6 }}>
          <strong>Note:</strong> Colors will match the final logo. Content is real from Chris's brief. Full page builds for all 5 pages.
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', color: '#999', fontSize: 13 }}>
          Share with the team: <strong>machdigitalsolutions.com/preview</strong>
        </div>
      </div>
    </div>
  )
}
