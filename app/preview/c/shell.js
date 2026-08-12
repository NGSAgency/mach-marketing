import { content } from '../../../lib/site-content/data.js'

export const cTokens = {
  bg: '#0a0a0b',
  bgAlt: '#111112',
  bgLift: '#161618',
  panel: 'rgba(255,255,255,0.03)',
  border: 'rgba(255,255,255,0.06)',
  borderStrong: 'rgba(255,255,255,0.14)',
  fg: '#fafafa',
  fgDim: '#a1a1a3',
  fgMuted: '#6e6e70',
  accent: '#3b7ce8',
  accentDim: '#0851cf',
  accentSoft: 'rgba(59,124,232,0.12)',
  accentGlow: 'rgba(59,124,232,0.35)',
}

export function CHeader() {
  return (
    <nav style={{ position: 'sticky', top: 0, background: 'rgba(10,10,11,0.6)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)', zIndex: 50, borderBottom: `1px solid ${cTokens.border}` }}>
      <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', padding: '12px clamp(12px, 3vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <a href="/preview/c" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flex: '0 0 auto', minWidth: 0 }}>
          <img src="/mach-logo-main.png" alt="MACH Digital Solutions" style={{ height: 'clamp(26px, 5.5vw, 36px)', width: 'auto', display: 'block', maxWidth: 'min(170px, 55vw)' }} />
        </a>
        <div className="preview-nav-links">
          <a href="/preview/c/services" style={{ padding: '8px 14px', color: cTokens.fgDim, textDecoration: 'none', fontSize: 13, fontWeight: 500, borderRadius: 6 }}>Services</a>
          <a href="/preview/c/industries" style={{ padding: '8px 14px', color: cTokens.fgDim, textDecoration: 'none', fontSize: 13, fontWeight: 500, borderRadius: 6 }}>Industries</a>
          <a href="/preview/c/team" style={{ padding: '8px 14px', color: cTokens.fgDim, textDecoration: 'none', fontSize: 13, fontWeight: 500, borderRadius: 6 }}>Team</a>
          <a href="/preview/c/contact" style={{ padding: '8px 16px', color: cTokens.bg, background: cTokens.fg, textDecoration: 'none', fontSize: 13, fontWeight: 600, borderRadius: 6, marginLeft: 8, whiteSpace: 'nowrap' }}>Get started</a>
        </div>
        <a href="/preview/c/contact" className="preview-nav-cta-mobile" style={{ padding: '8px 14px', color: cTokens.bg, background: cTokens.fg, textDecoration: 'none', fontSize: 13, fontWeight: 600, borderRadius: 6, whiteSpace: 'nowrap' }}>Start</a>
      </div>
    </nav>
  )
}

export function CFooter() {
  return (
    <footer style={{ background: cTokens.bg, borderTop: `1px solid ${cTokens.border}`, padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) 40px', color: cTokens.fg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-60%', left: '30%', width: '60%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${cTokens.accent}15, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 'min(1440px, 100%)', margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: 80 }}>
          <div style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontSize: 'clamp(48px, 11vw, 140px)', fontWeight: 800, letterSpacing: -6, lineHeight: 0.9, background: `linear-gradient(180deg, ${cTokens.fg}, ${cTokens.fgMuted})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Growth<span style={{ color: cTokens.accent, WebkitTextFillColor: cTokens.accent }}>.</span>
          </div>
          <div style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: cTokens.fgDim, lineHeight: 1.55, maxWidth: 640, marginTop: 24 }}>Ready when you are. Talk with our team about what growth looks like for your business.</div>
          <a href="/preview/c/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 32, background: cTokens.accent, color: cTokens.bg, padding: '14px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', boxShadow: `0 20px 40px -12px ${cTokens.accentGlow}` }}>Start a conversation <span>→</span></a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 40, paddingTop: 40, borderTop: `1px solid ${cTokens.border}` }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: cTokens.fgMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>Services</div>
            {content.services.map(s => (<div key={s.name} style={{ marginBottom: 8, fontSize: 13, color: cTokens.fgDim }}>{s.name}</div>))}
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: cTokens.fgMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>Company</div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/preview/c/team" style={{ color: cTokens.fgDim, textDecoration: 'none' }}>Team</a></div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/preview/c/industries" style={{ color: cTokens.fgDim, textDecoration: 'none' }}>Industries</a></div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/preview/c/contact" style={{ color: cTokens.fgDim, textDecoration: 'none' }}>Contact</a></div>
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: cTokens.fgMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>Offices</div>
            <div style={{ marginBottom: 8, fontSize: 13, color: cTokens.fgDim }}>Kansas City</div>
            <div style={{ marginBottom: 8, fontSize: 13, color: cTokens.fgDim }}>Boston</div>
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: cTokens.fgMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>Contact</div>
            <a href="mailto:hello@machdigitalsolutions.com" style={{ color: cTokens.fgDim, fontSize: 13, textDecoration: 'none' }}>hello@machdigital solutions.com</a>
          </div>
        </div>
        <div style={{ paddingTop: 32, marginTop: 40, borderTop: `1px solid ${cTokens.border}`, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 11, color: cTokens.fgMuted, fontFamily: 'JetBrains Mono, monospace' }}>
          <div>© 2026 MACH DIGITAL SOLUTIONS · NGS DIGITAL LLC</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  )
}

// Terminal-style typing hero mockup
export function TerminalMockup() {
  return (
    <div style={{ background: cTokens.bgAlt, border: `1px solid ${cTokens.borderStrong}`, borderRadius: 12, padding: 24, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, boxShadow: `0 40px 80px -20px ${cTokens.accentGlow}` }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, opacity: 0.5 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
      </div>
      <div style={{ color: cTokens.fgDim, lineHeight: 1.8 }}>
        <div><span style={{ color: cTokens.accent }}>$</span> mach --analyze</div>
        <div style={{ opacity: 0.7, marginTop: 8 }}>› Scanning portfolio...</div>
        <div style={{ opacity: 0.7 }}>› Analyzing 24 client accounts</div>
        <div style={{ opacity: 0.7 }}>› Detecting anomalies...</div>
        <div style={{ marginTop: 12, padding: 10, background: `${cTokens.accent}10`, borderLeft: `2px solid ${cTokens.accent}`, borderRadius: 4 }}>
          <div style={{ color: cTokens.accent, fontWeight: 600 }}>⚡ Opportunity detected</div>
          <div style={{ color: cTokens.fgDim, fontSize: 12, marginTop: 4 }}>Emergency AC keywords under-bid by 34% in KC market</div>
        </div>
        <div style={{ marginTop: 12, padding: 10, background: 'rgba(34,197,94,0.08)', borderLeft: '2px solid #22c55e', borderRadius: 4 }}>
          <div style={{ color: '#22c55e', fontWeight: 600 }}>✓ Action executed</div>
          <div style={{ color: cTokens.fgDim, fontSize: 12, marginTop: 4 }}>Bid adjustments applied · +$2,400 projected monthly revenue</div>
        </div>
        <div style={{ marginTop: 16, color: cTokens.accent }}><span className="cursor" style={{ '--accent': cTokens.accent }}></span></div>
      </div>
    </div>
  )
}
