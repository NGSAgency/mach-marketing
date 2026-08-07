export const metadata = { title: 'Preview B — Bold Marketing' }

export default function PreviewB() {
  return (
    <div style={{ background: '#fff', color: '#0a0a0a', minHeight: '100vh', fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <nav style={{ borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', padding: '18px clamp(16px, 4vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>MACH</div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', fontSize: 14, fontWeight: 500 }}>
            <span>Services</span>
            <span>Industries</span>
            <span>Team</span>
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', padding: '10px 20px', borderRadius: 100, fontWeight: 600 }}>Start now →</span>
          </div>
        </div>
      </nav>

      {/* Hero with gradient background */}
      <section style={{ background: 'linear-gradient(180deg, #f5f3ff 0%, #fff 100%)', padding: 'clamp(60px, 12vw, 120px) clamp(16px, 4vw, 32px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', width: 800, height: 800, background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 60%)', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6366f1', padding: '6px 14px', background: 'rgba(99,102,241,0.1)', borderRadius: 100, marginBottom: 32, fontWeight: 600 }}>
            <span>✨</span> AI-powered marketing infrastructure
          </div>
          <h1 style={{ fontSize: 'clamp(42px, 9vw, 92px)', fontWeight: 800, letterSpacing: -3.5, lineHeight: 0.95, margin: '0 0 28px 0' }}>
            Grow home service<br />
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>businesses faster.</span>
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: '#525252', lineHeight: 1.5, margin: '0 auto 40px', maxWidth: 620 }}>
            The complete marketing platform for HVAC, plumbing, roofing, and electrical. Websites, SEO, PPC, content — automated, measured, and always improving.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', padding: '16px 28px', borderRadius: 100, fontSize: 16, fontWeight: 600, textDecoration: 'none', boxShadow: '0 10px 40px rgba(99,102,241,0.35)' }}>Start now →</a>
            <a href="#" style={{ color: '#0a0a0a', padding: '16px 28px', borderRadius: 100, fontSize: 16, fontWeight: 600, textDecoration: 'none', border: '1px solid #d4d4d4' }}>See a demo</a>
          </div>
        </div>
      </section>

      {/* Feature cards with icons */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 13, color: '#6366f1', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Everything you need</div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: -2, margin: 0 }}>Four pillars. One system.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 20 }}>
            {[
              { i: '🧠', t: 'AI Brain', d: 'Watches every metric, diagnoses issues, executes fixes autonomously.', c: '#eef2ff' },
              { i: '🔧', t: 'Home Services DNA', d: 'We know HVAC/plumbing/roofing SEO isn\'t like SaaS.', c: '#fef3c7' },
              { i: '📍', t: 'KC + Boston', d: 'Two coasts, one team. 24/7 coverage.', c: '#dcfce7' },
              { i: '🎯', t: 'Full-Stack', d: 'Website, SEO, PPC, content — one team, one invoice.', c: '#fce7f3' },
            ].map(p => (
              <div key={p.t} style={{ background: p.c, padding: 32, borderRadius: 20 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.i}</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, letterSpacing: -0.5 }}>{p.t}</div>
                <div style={{ fontSize: 15, color: '#525252', lineHeight: 1.55 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: 40, color: '#999', fontSize: 13, borderTop: '1px solid #eee' }}>Preview B · Bold Marketing</div>
    </div>
  )
}
