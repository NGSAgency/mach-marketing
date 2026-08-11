import { content } from '../../../lib/site-content/data.js'

export const aTokens = {
  bg: '#050508',
  bgAlt: '#0a0a0f',
  panel: 'rgba(255,255,255,0.03)',
  panelHover: 'rgba(255,255,255,0.05)',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.15)',
  fg: '#f5f5f7',
  fgDim: '#a1a1aa',
  fgMuted: '#71717a',
  accent1: '#3b7ce8',
  accent2: '#0851cf',
  accent3: '#0537a0',
  glowPurple: '#0851cf33',
  glowBlue: '#3b82f633',
}

// Mesh gradient background
export function MeshBg({ variant = 'default' }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '70%', height: '70%', borderRadius: '50%', background: `radial-gradient(circle, ${aTokens.accent1}30, transparent 60%)`, filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', top: '10%', right: '-15%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${aTokens.accent2}25, transparent 60%)`, filter: 'blur(90px)' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '20%', width: '60%', height: '70%', borderRadius: '50%', background: `radial-gradient(circle, ${aTokens.accent3}20, transparent 60%)`, filter: 'blur(100px)' }} />
    </div>
  )
}

// Grid overlay pattern
export function GridBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '64px 64px', pointerEvents: 'none', maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)' }} />
  )
}

export function AHeader() {
  return (
    <nav style={{ borderBottom: `1px solid ${aTokens.border}`, position: 'sticky', top: 0, background: 'rgba(5,5,8,0.7)', backdropFilter: 'blur(20px) saturate(140%)', WebkitBackdropFilter: 'blur(20px) saturate(140%)', zIndex: 50 }}>
      <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', padding: '16px clamp(16px, 4vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <a href="/preview/a" style={{ display: 'flex', alignItems: 'center', gap: 10, color: aTokens.fg, textDecoration: 'none' }}>
          <img src="/mach-logo-mark.svg" alt="MACH" style={{ height: 32, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
          <span style={{ fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: -0.3 }}>MACH</span>
        </a>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <a href="/preview/a/services" style={{ padding: '8px 14px', color: aTokens.fgDim, textDecoration: 'none', fontSize: 14, fontWeight: 500, borderRadius: 6 }}>Services</a>
          <a href="/preview/a/industries" style={{ padding: '8px 14px', color: aTokens.fgDim, textDecoration: 'none', fontSize: 14, fontWeight: 500, borderRadius: 6 }}>Industries</a>
          <a href="/preview/a/team" style={{ padding: '8px 14px', color: aTokens.fgDim, textDecoration: 'none', fontSize: 14, fontWeight: 500, borderRadius: 6 }}>Team</a>
          <a href="/preview/a/contact" style={{ padding: '10px 18px', color: aTokens.bg, background: aTokens.fg, textDecoration: 'none', fontSize: 14, fontWeight: 600, borderRadius: 8, marginLeft: 8, whiteSpace: 'nowrap' }}>Get started →</a>
        </div>
      </div>
    </nav>
  )
}

export function AFooter() {
  return (
    <footer style={{ background: aTokens.bg, borderTop: `1px solid ${aTokens.border}`, padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) 40px', color: aTokens.fg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-40%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${aTokens.accent1}15, transparent 60%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <img src="/mach-logo-mark.svg" alt="MACH" style={{ height: 40, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: -0.5 }}>MACH</span>
          </div>
          <div style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 780, background: `linear-gradient(135deg, ${aTokens.fg}, ${aTokens.fgDim})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The growth engine for service-based businesses.</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 40, marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 11, color: aTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, fontWeight: 600 }}>Services</div>
            {content.services.map(s => (<div key={s.name} style={{ marginBottom: 10, fontSize: 14, color: aTokens.fgDim }}>{s.name}</div>))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: aTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, fontWeight: 600 }}>Company</div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/a/team" style={{ color: aTokens.fgDim, textDecoration: 'none' }}>Team</a></div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/a/industries" style={{ color: aTokens.fgDim, textDecoration: 'none' }}>Industries</a></div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/a/contact" style={{ color: aTokens.fgDim, textDecoration: 'none' }}>Contact</a></div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: aTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, fontWeight: 600 }}>Offices</div>
            <div style={{ marginBottom: 10, fontSize: 14, color: aTokens.fgDim }}>Kansas City</div>
            <div style={{ marginBottom: 10, fontSize: 14, color: aTokens.fgDim }}>Boston</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: aTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, fontWeight: 600 }}>Contact</div>
            <a href="mailto:hello@machdigitalsolutions.com" style={{ color: aTokens.fgDim, fontSize: 14, textDecoration: 'none' }}>hello@machdigitalsolutions.com</a>
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${aTokens.border}`, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 12, color: aTokens.fgMuted }}>
          <div>© 2026 MACH Digital Solutions · NGS Digital LLC</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}

// Signature product mockup - looks like MACH's automation brain dashboard
export function BrainMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 720, margin: '0 auto', borderRadius: 16, overflow: 'hidden', border: `1px solid ${aTokens.border}`, background: aTokens.bgAlt, boxShadow: `0 40px 100px -20px ${aTokens.glowPurple}, 0 0 0 1px ${aTokens.border}` }}>
      {/* Titlebar */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderBottom: `1px solid ${aTokens.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
        <div style={{ marginLeft: 12, fontFamily: 'Geist Mono, monospace', fontSize: 11, color: aTokens.fgMuted }}>mach.digital/brain</div>
      </div>
      {/* Content */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: aTokens.fgMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4, fontWeight: 600 }}>Portfolio Health</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: aTokens.fg, letterSpacing: -0.5 }}>All systems <span style={{ color: '#22c55e' }}>optimal</span></div>
          </div>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: aTokens.fgMuted }}>Live · 24h</div>
        </div>
        {/* Bar chart */}
        <div style={{ display: 'flex', gap: 4, height: 60, marginBottom: 20, alignItems: 'flex-end' }}>
          {[40, 55, 48, 62, 70, 65, 78, 75, 82, 88, 92, 96].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: `linear-gradient(180deg, ${aTokens.accent1}, ${aTokens.accent2})`, borderRadius: 2, opacity: 0.85 }} />
          ))}
        </div>
        {/* Rules firing */}
        <div style={{ display: 'grid', gap: 6, marginTop: 16 }}>
          {[
            { icon: '⚡', text: 'Bid adjustment on emergency AC keywords', time: '2m', color: '#22c55e' },
            { icon: '📊', text: 'Content brief generated for water heater installation', time: '14m', color: aTokens.accent2 },
            { icon: '🎯', text: 'Meta description rewritten for 12 service pages', time: '1h', color: aTokens.accent1 },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: `1px solid ${aTokens.border}` }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: `${r.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{r.icon}</div>
              <div style={{ flex: 1, fontSize: 12, color: aTokens.fgDim }}>{r.text}</div>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: aTokens.fgMuted }}>{r.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
