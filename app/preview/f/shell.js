import { content } from '../../../lib/site-content/data.js'

export const fTokens = {
  bg: '#ffffff',
  ink: '#0d0d0d',
  inkDim: '#525252',
  inkMuted: '#8a8a8a',
  accent: '#1e40ff',
  accentSoft: '#eef2ff',
  // Section blocks
  moody1: '#fef3c7',  // warm cream
  moody2: '#0d0d0d',  // deep ink
  moody3: '#dbeafe',  // ice
  moody4: '#f5f0ea',  // sand
  border: '#e5e5e5',
  borderStrong: '#0d0d0d',
}

export function Eyebrow({ label, dark = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: dark ? fTokens.accent : fTokens.accent }}>
      <div style={{ width: 32, height: 2, background: fTokens.accent }} />
      {label}
    </div>
  )
}

export function FHeader() {
  return (
    <nav style={{ borderBottom: `1px solid ${fTokens.border}`, position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', zIndex: 10 }}>
      <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', padding: '20px clamp(16px, 4vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <a href="/preview/f" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: fTokens.ink, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ width: 12, height: 12, background: fTokens.accent, borderRadius: 2 }} />
          </div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: -0.5, color: fTokens.ink }}>MACH</span>
        </a>
        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center', fontSize: 14, fontFamily: 'Inter, system-ui, sans-serif' }}>
          <a href="/preview/f/services" style={{ color: fTokens.inkDim, textDecoration: 'none', fontWeight: 500 }}>Services</a>
          <a href="/preview/f/industries" style={{ color: fTokens.inkDim, textDecoration: 'none', fontWeight: 500 }}>Industries</a>
          <a href="/preview/f/team" style={{ color: fTokens.inkDim, textDecoration: 'none', fontWeight: 500 }}>Team</a>
          <a href="/preview/f/contact" style={{ background: fTokens.ink, color: fTokens.bg, padding: '10px 20px', borderRadius: 4, fontWeight: 600, fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap' }}>Get in touch →</a>
        </div>
      </div>
    </nav>
  )
}

export function FFooter() {
  return (
    <footer style={{ background: fTokens.ink, color: fTokens.bg, padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) 40px' }}>
      <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, background: fTokens.bg, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 12, height: 12, background: fTokens.accent, borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: -0.5 }}>MACH</span>
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 500, letterSpacing: -2, lineHeight: 1.05, maxWidth: 780 }}>Let's build <span style={{ color: fTokens.accent }}>something great.</span></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 40, marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>Services</div>
            {content.services.map(s => (<div key={s.name} style={{ marginBottom: 10, fontSize: 14, opacity: 0.75 }}>{s.name}</div>))}
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>Company</div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/f/team" style={{ color: 'inherit', opacity: 0.75, textDecoration: 'none' }}>Team</a></div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/f/industries" style={{ color: 'inherit', opacity: 0.75, textDecoration: 'none' }}>Industries</a></div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/f/contact" style={{ color: 'inherit', opacity: 0.75, textDecoration: 'none' }}>Contact</a></div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>Offices</div>
            <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.75 }}>Kansas City, MO</div>
            <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.75 }}>Boston, MA</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>Contact</div>
            <a href="mailto:hello@machdigitalsolutions.com" style={{ color: 'inherit', fontSize: 14, opacity: 0.75, textDecoration: 'none' }}>hello@machdigitalsolutions.com</a>
          </div>
        </div>
        <div style={{ paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 12, opacity: 0.5, fontFamily: 'Space Grotesk, sans-serif' }}>
          <div>© 2026 MACH Digital Solutions</div>
          <div>NGS Digital LLC</div>
        </div>
      </div>
    </footer>
  )
}
