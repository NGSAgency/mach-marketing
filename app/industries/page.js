import { AHeader, AFooter, MeshBg, aTokens as T } from '../shell.js'
import { content } from '../../lib/site-content/data.js'

export const metadata = { title: 'Industries | MACH Digital Solutions', description: 'Growth marketing built for service-based businesses. HVAC, plumbing, roofing, landscaping, auto body, med spas, dental practices, law firms, and more.' }

export default function AIndustries() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ position: 'relative', padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Industries</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -4, lineHeight: 0.98, margin: '0 auto 32px', maxWidth: 900 }}>
            Built for <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>service businesses</span>.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto', maxWidth: 640 }}>
            We work with businesses whose customers are searching for them. If you deliver a service, we can help you grow.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}` }}>
        {/* Four to a row on a wide screen (12 tiles: three full rows); a short
            last row widens to fill it. Each tile is a photo of the work,
            darkened toward the bottom so the name always reads. */}
        <style>{`.ind-tile img{transition:transform .5s ease}.ind-tile:hover img{transform:scale(1.04)}@media (prefers-reduced-motion: reduce){.ind-tile img{transition:none}.ind-tile:hover img{transform:none}}`}</style>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {content.industries.map((i, idx) => (
            <div key={i.name} className="ind-tile" style={{ flex: '1 1 max(220px, calc((100% - 48px) / 4))', boxSizing: 'border-box', position: 'relative', height: 220, borderRadius: 16, overflow: 'hidden', border: `1px solid ${T.border}`, background: '#11131a' }}>
              {i.photo && (
                <img src={`https://images.unsplash.com/${i.photo}?w=800&q=75&auto=format&fit=crop`} alt={i.alt || ''} loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,8,0.15) 0%, rgba(5,5,8,0.35) 45%, rgba(5,5,8,0.92) 100%)' }} />
              <div style={{ position: 'absolute', top: 16, right: 18, fontFamily: 'Geist Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: 1 }}>{String(idx + 1).padStart(2, '0')}</div>
              <div style={{ position: 'absolute', left: 24, right: 24, bottom: 20, fontSize: 20, fontWeight: 600, letterSpacing: -0.5 }}>{i.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1000px, 100%)', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 64px)', borderRadius: 24, background: `linear-gradient(135deg, ${T.accent1}20, ${T.accent2}15)`, border: `1px solid ${T.border}`, textAlign: 'center', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent1}25, transparent 60%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 12, color: T.fg, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24, opacity: 0.7 }}>Don't see yours?</div>
            <h2 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px 0' }}><span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Inquire</span> to find out.</h2>
            <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: T.fgDim, margin: '0 auto 40px', maxWidth: 620, lineHeight: 1.55 }}>Our approach adapts to any service-based business. If you serve customers who search for what you do, we can help.</p>
            <a href="/contact" style={{ background: T.fg, color: T.bg, padding: '16px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>Tell us about your business →</a>
          </div>
        </div>
      </section>

      <AFooter />
    </div>
  )
}
