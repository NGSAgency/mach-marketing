import { content } from '../../../lib/site-content/data.js'
export const bTokens = { bg: '#08090b', panel: '#0f1114', panel2: '#161a20', border: 'rgba(255,255,255,0.06)', borderStrong: 'rgba(255,255,255,0.12)', fg: '#e8e8e8', fgDim: '#9ca0a8', fgMuted: '#5a5f6a', accent: '#a3e635', accentDim: '#84cc16', danger: '#f43f5e', warn: '#facc15' }

export function BHeader() {
  return (
    <nav style={{ borderBottom: `1px solid ${bTokens.border}`, background: bTokens.bg, position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', padding: '14px clamp(16px, 4vw, 24px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <a href="/preview/b" style={{ display: 'flex', alignItems: 'center', gap: 10, color: bTokens.fg, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: bTokens.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: bTokens.bg, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 14 }}>M</div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 15, letterSpacing: -0.3 }}>mach.digital</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: bTokens.accent, background: `${bTokens.accent}15`, padding: '3px 8px', borderRadius: 4, marginLeft: 4 }}>v1.0</span>
        </a>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <a href="/preview/b/services" style={{ padding: '8px 14px', color: bTokens.fgDim, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 500, borderRadius: 6 }}>services</a>
          <a href="/preview/b/industries" style={{ padding: '8px 14px', color: bTokens.fgDim, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 500, borderRadius: 6 }}>industries</a>
          <a href="/preview/b/team" style={{ padding: '8px 14px', color: bTokens.fgDim, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 500, borderRadius: 6 }}>team</a>
          <a href="/preview/b/contact" style={{ padding: '10px 16px', color: bTokens.bg, background: bTokens.accent, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700, borderRadius: 6, marginLeft: 8 }}>./start<span style={{ opacity: 0.6 }}>()</span></a>
        </div>
      </div>
    </nav>
  )
}

export function BFooter() {
  return (
    <footer style={{ background: bTokens.panel, borderTop: `1px solid ${bTokens.border}`, padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) 40px', color: bTokens.fg }}>
      <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: bTokens.accent, color: bTokens.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 14 }}>M</div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 15 }}>mach.digital</span>
            </div>
            <div style={{ fontSize: 13, color: bTokens.fgDim, lineHeight: 1.6, maxWidth: 280 }}>The operating system for service-based businesses that want to grow.</div>
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: bTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>./modules</div>
            {content.services.map(s => (<div key={s.name} style={{ marginBottom: 8, fontSize: 13, color: bTokens.fgDim, fontFamily: 'JetBrains Mono, monospace' }}>{s.name.toLowerCase().replace(/ /g, '-')}</div>))}
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: bTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>./company</div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/preview/b/team" style={{ color: bTokens.fgDim, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace' }}>team</a></div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/preview/b/industries" style={{ color: bTokens.fgDim, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace' }}>industries</a></div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/preview/b/contact" style={{ color: bTokens.fgDim, textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace' }}>contact</a></div>
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: bTokens.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>./locations</div>
            <div style={{ marginBottom: 8, fontSize: 13, color: bTokens.fgDim, fontFamily: 'JetBrains Mono, monospace' }}>kc.mo</div>
            <div style={{ marginBottom: 8, fontSize: 13, color: bTokens.fgDim, fontFamily: 'JetBrains Mono, monospace' }}>bos.ma</div>
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${bTokens.border}`, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 11, color: bTokens.fgMuted, fontFamily: 'JetBrains Mono, monospace' }}>
          <div>© 2026 mach.digital · ngs_digital_llc</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: bTokens.accent, boxShadow: `0 0 8px ${bTokens.accent}` }} /> all systems operational</div>
        </div>
      </div>
    </footer>
  )
}
