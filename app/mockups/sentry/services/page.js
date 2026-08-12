import { SHeader, SFooter, sTokens as T, SERVICES } from '../shell.js'

export const metadata = { title: 'Services - Sentry Solutions', robots: { index: false, follow: false } }

export default function SentryServices() {
  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SHeader />

      <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-20%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}12, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Services</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(44px, 8vw, 96px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Six services, engineered as <em style={{ fontStyle: 'italic', color: T.accent }}>one growth engine</em>.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>
            Each service is designed to reinforce the others. Whether you engage us for one or all six, every recommendation is grounded in the same rigorous financial and strategic discipline.
          </p>
        </div>
      </section>

      {SERVICES.map((s, idx) => (
        <section key={s.tag} style={{ padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 32px)', borderTop: `1px solid ${T.border}`, background: idx % 2 === 1 ? T.bgAlt : T.bg }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(64px, 12vw, 120px)', color: T.accent, fontWeight: 400, letterSpacing: -3, lineHeight: 0.9 }}>{s.tag}</div>
              <div style={{ fontSize: 12, color: T.fgMuted, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginTop: 12 }}>{s.name}</div>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.1, margin: '0 0 24px 0' }}>{s.short}</h2>
              <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: T.fgDim, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}`, textAlign: 'center' }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 32px 0' }}>Let's <em style={{ fontStyle: 'italic', color: T.accent }}>build</em> together.</h2>
          <a href="/mockups/sentry/contact" style={{ background: T.accent, color: T.navy, padding: '18px 32px', borderRadius: 4, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block', letterSpacing: 0.3 }}>Schedule a Strategy Call →</a>
        </div>
      </section>

      <SFooter />
    </div>
  )
}
