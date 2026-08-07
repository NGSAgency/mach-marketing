export const metadata = { title: 'Preview C — Editorial + Technical' }

export default function PreviewC() {
  return (
    <div style={{ background: '#faf9f6', color: '#1a1a1a', minHeight: '100vh', fontFamily: 'ui-serif, Georgia, "Iowan Old Style", serif' }}>
      <nav style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', position: 'sticky', top: 0, background: 'rgba(250,249,246,0.9)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto', padding: '20px clamp(16px, 4vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: -0.5 }}>MACH.</div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', fontSize: 15, fontFamily: '-apple-system, system-ui, sans-serif' }}>
            <span>Services</span>
            <span>Industries</span>
            <span>Team</span>
            <span style={{ background: '#1a1a1a', color: '#faf9f6', padding: '10px 20px', borderRadius: 4, fontWeight: 500, fontSize: 14 }}>Get in touch</span>
          </div>
        </div>
      </nav>

      {/* Hero - editorial layout */}
      <section style={{ padding: 'clamp(80px, 14vw, 160px) clamp(16px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', fontSize: 13, color: '#9a8f7a', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 40, fontWeight: 600 }}>Est. 2024 · Kansas City + Boston</div>
          <h1 style={{ fontSize: 'clamp(48px, 10vw, 108px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.95, margin: '0 0 40px 0', maxWidth: 900 }}>
            A digital marketing agency, <em style={{ fontStyle: 'italic', color: '#8b6f47' }}>reimagined</em> for home services.
          </h1>
          <p style={{ fontSize: 'clamp(19px, 2.2vw, 24px)', color: '#4a4a4a', lineHeight: 1.55, margin: '0 0 48px', maxWidth: 720, fontFamily: 'ui-serif, Georgia, serif' }}>
            We're building the growth engine that home service companies deserve. AI that thinks. Automation that acts. And a team that knows the difference between an HVAC lead in July and a roofing lead after a hailstorm.
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', fontFamily: '-apple-system, system-ui, sans-serif' }}>
            <a href="#" style={{ background: '#1a1a1a', color: '#faf9f6', padding: '14px 24px', borderRadius: 4, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Start a conversation</a>
            <a href="#" style={{ color: '#1a1a1a', padding: '14px 8px', fontSize: 15, fontWeight: 500, textDecoration: 'underline', textDecorationColor: '#8b6f47', textUnderlineOffset: 6 }}>Read our approach</a>
          </div>
        </div>
      </section>

      {/* Pillars - editorial 4-col table */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
          <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', fontSize: 13, color: '#9a8f7a', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>How we're different</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 40, borderTop: '2px solid #1a1a1a', paddingTop: 32 }}>
            {[
              { n: '01', t: 'AI-powered brain', d: 'Watches every client\'s data. Diagnoses issues with Claude. Executes fixes on its own.' },
              { n: '02', t: 'Home services fluency', d: 'We speak HVAC. We know why roofing keywords spike after hail.' },
              { n: '03', t: 'Two coasts', d: 'Kansas City heartland. Boston East Coast. 24/7 coverage between us.' },
              { n: '04', t: 'Full-stack', d: 'Website. SEO. PPC. Content. One team, one system, one invoice.' },
            ].map(p => (
              <div key={p.n}>
                <div style={{ fontSize: 13, color: '#8b6f47', fontFamily: '-apple-system, system-ui, sans-serif', fontWeight: 600, letterSpacing: 1, marginBottom: 16 }}>{p.n}</div>
                <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: -0.5, marginBottom: 12 }}>{p.t}</div>
                <div style={{ fontSize: 16, color: '#4a4a4a', lineHeight: 1.6, fontFamily: 'ui-serif, Georgia, serif' }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: 40, color: '#9a8f7a', fontSize: 13, borderTop: '1px solid rgba(0,0,0,0.08)', fontFamily: '-apple-system, system-ui, sans-serif' }}>Preview C · Editorial + Technical</div>
    </div>
  )
}
