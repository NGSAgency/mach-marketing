export const metadata = { title: 'Preview A — Modern Minimal' }

export default function PreviewA() {
  return (
    <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif' }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', zIndex: 10 }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', padding: '18px clamp(16px, 4vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: -0.3 }}>MACH</div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
            <span>Services</span>
            <span>Industries</span>
            <span>Team</span>
            <span style={{ background: '#fff', color: '#0a0a0a', padding: '8px 16px', borderRadius: 6, fontWeight: 600 }}>Book a call</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: 'clamp(60px, 12vw, 140px) clamp(16px, 4vw, 32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', fontSize: 13, color: 'rgba(255,255,255,0.6)', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, marginBottom: 32, fontWeight: 500 }}>
            Kansas City · Boston
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 84px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1, margin: '0 0 24px 0' }}>
            The growth engine<br />
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>for home services.</span>
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, margin: '0 auto 40px', maxWidth: 620 }}>
            AI-powered marketing infrastructure for HVAC, plumbing, roofing, and electrical companies. Websites, SEO, PPC, content — all automated, all measured.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{ background: '#fff', color: '#0a0a0a', padding: '14px 24px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Book a call →</a>
            <a href="#" style={{ background: 'transparent', color: '#fff', padding: '14px 24px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>See how it works</a>
          </div>
        </div>
      </section>

      {/* Pillars grid */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 32px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 24 }}>
          {[
            { t: 'AI-powered', d: 'A brain that watches every metric across every client, diagnoses issues with Claude, and executes fixes autonomously.' },
            { t: 'Home services expertise', d: 'We speak HVAC. We know how HVAC/plumbing/roofing SEO works differently than SaaS.' },
            { t: 'KC + Boston', d: 'Two coasts of the country. Local knowledge and 24/7 support coverage.' },
            { t: 'Full-stack', d: 'Website, SEO, PPC, content — one team, one system, one invoice.' },
          ].map(p => (
            <div key={p.t} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', padding: 32, borderRadius: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: -0.5 }}>{p.t}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)', fontSize: 13, borderTop: '1px solid rgba(255,255,255,0.08)' }}>Preview A · Modern Minimal</div>
    </div>
  )
}
