import { content } from '../../../lib/site-content/data.js'

export const dTokens = {
  bg: '#f7f4ee',
  ink: '#1a1a1a',
  inkDim: '#4a4a4a',
  inkMuted: '#8a8479',
  accent: '#8b6f47',
  accentSoft: '#e8dfd0',
  border: 'rgba(26,26,26,0.1)',
  borderStrong: '#1a1a1a',
}

export function DHeader({ activePath = '/' }) {
  const links = [
    { href: '/preview/d/services', label: 'Services' },
    { href: '/preview/d/industries', label: 'Industries' },
    { href: '/preview/d/team', label: 'Team' },
    { href: '/preview/d/contact', label: 'Contact' },
  ]
  return (
    <nav style={{ borderBottom: `1px solid ${dTokens.border}`, position: 'sticky', top: 0, background: 'rgba(247,244,238,0.9)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', zIndex: 10 }}>
      <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', padding: '20px clamp(16px, 4vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <a href="/preview/d" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700, fontSize: 22, letterSpacing: -0.5, color: dTokens.ink, textDecoration: 'none' }}>MACH.</a>
        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center', fontSize: 14, fontFamily: 'Inter, system-ui, sans-serif' }}>
          {links.slice(0, 3).map(l => (
            <a key={l.href} href={l.href} style={{ color: dTokens.inkDim, textDecoration: 'none', fontWeight: 500 }}>{l.label}</a>
          ))}
          <a href="/preview/d/contact" style={{ background: dTokens.ink, color: dTokens.bg, padding: '10px 20px', borderRadius: 4, fontWeight: 500, fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap' }}>Get in touch</a>
        </div>
      </div>
    </nav>
  )
}

export function DFooter() {
  return (
    <footer style={{ background: dTokens.ink, color: dTokens.bg, padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) 40px' }}>
      <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 48, marginBottom: 64 }}>
          <div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 32, fontWeight: 500, letterSpacing: -1, marginBottom: 20 }}>MACH<em style={{ fontStyle: 'italic', color: dTokens.accent }}>.</em></div>
            <div style={{ fontSize: 15, opacity: 0.7, lineHeight: 1.6, maxWidth: 300 }}>A digital marketing agency built for businesses that want measurable growth.</div>
          </div>
          <div>
            <div style={{ fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 600 }}>Services</div>
            {content.services.map(s => (<div key={s.name} style={{ marginBottom: 10, fontSize: 14, opacity: 0.85 }}>{s.name}</div>))}
          </div>
          <div>
            <div style={{ fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 600 }}>Company</div>
            <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.85 }}><a href="/preview/d/team" style={{ color: 'inherit', textDecoration: 'none' }}>Team</a></div>
            <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.85 }}><a href="/preview/d/industries" style={{ color: 'inherit', textDecoration: 'none' }}>Industries</a></div>
            <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.85 }}><a href="/preview/d/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></div>
          </div>
          <div>
            <div style={{ fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontWeight: 600 }}>Offices</div>
            <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.85 }}>Kansas City</div>
            <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.85 }}>Boston</div>
          </div>
        </div>
        <div style={{ paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 12, opacity: 0.5 }}>
          <div>© 2026 MACH Digital Solutions. All rights reserved.</div>
          <div>NGS Digital LLC · Kansas City + Boston</div>
        </div>
      </div>
    </footer>
  )
}
