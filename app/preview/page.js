export const metadata = { title: 'MACH - Design Options', robots: { index: false, follow: false } }

export default function PreviewIndex() {
  const options = [
    { slug: 'a', name: 'Gradient Mesh', vibe: 'Vercel-inspired dark polish', description: 'Dark base, animated mesh gradient hero, glassmorphism nav, floating product mockup showing the MACH brain in action, hover-glow service cards, logo cloud.' },
    { slug: 'b', name: 'Bright Confidence', vibe: 'Ramp/Stripe-inspired light with color pop', description: 'Light base with confident color, big product screenshot in hero, animated stats, side-by-side sections, marquee logo strip, warm and premium.' },
    { slug: 'c', name: 'Refined Motion', vibe: 'Linear-inspired near-black with warmth', description: 'Near-black backdrop, warm accent, huge fluid type, scroll-triggered reveals, mockup that types itself in, sharp geometric detail, restrained but alive.' },
  ]
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '60px 20px', fontFamily: '-apple-system, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2, margin: '0 0 12px 0' }}>MACH - Design Options</h1>
        <p style={{ fontSize: 17, color: '#666', lineHeight: 1.6, marginBottom: 48, maxWidth: 680 }}>
          Three sleek/modern site directions - each inspired by best-in-class SaaS design (Linear, Vercel, Ramp, Stripe). Same content, different aesthetic. Pick one or mix elements from multiple.
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
        <div style={{ marginTop: 32, textAlign: 'center', color: '#999', fontSize: 13 }}>Share: machdigitalsolutions.com/preview</div>
      </div>
    </div>
  )
}
