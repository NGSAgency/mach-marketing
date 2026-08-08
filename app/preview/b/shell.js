import { content } from '../../../lib/site-content/data.js'

export const bTokens = {
  bg: '#fdfaf6',
  bgAlt: '#f6efe4',
  bgCard: '#ffffff',
  bgDark: '#0f0e0c',
  ink: '#0f0e0c',
  inkDim: '#5a5854',
  inkMuted: '#8a8680',
  accent: '#f97316',
  accentDim: '#ea580c',
  accentSoft: '#fed7aa',
  accentGlow: '#fb923c40',
  purple: '#7c3aed',
  green: '#059669',
  border: 'rgba(15,14,12,0.1)',
  borderStrong: 'rgba(15,14,12,0.2)',
}

export function BHeader() {
  return (
    <nav style={{ position: 'sticky', top: 0, background: 'rgba(253,250,246,0.85)', backdropFilter: 'blur(20px) saturate(140%)', WebkitBackdropFilter: 'blur(20px) saturate(140%)', zIndex: 50, borderBottom: `1px solid ${bTokens.border}` }}>
      <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', padding: '18px clamp(16px, 4vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <a href="/preview/b" style={{ display: 'flex', alignItems: 'center', gap: 10, color: bTokens.ink, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${bTokens.accent}, ${bTokens.accentDim})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: bTokens.bg }} />
          </div>
          <span style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>MACH</span>
        </a>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <a href="/preview/b/services" style={{ padding: '8px 14px', color: bTokens.inkDim, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Services</a>
          <a href="/preview/b/industries" style={{ padding: '8px 14px', color: bTokens.inkDim, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Industries</a>
          <a href="/preview/b/team" style={{ padding: '8px 14px', color: bTokens.inkDim, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Team</a>
          <a href="/preview/b/contact" style={{ padding: '10px 20px', color: bTokens.bg, background: bTokens.ink, textDecoration: 'none', fontSize: 14, fontWeight: 600, borderRadius: 100, marginLeft: 8, whiteSpace: 'nowrap' }}>Get started →</a>
        </div>
      </div>
    </nav>
  )
}

export function BFooter() {
  return (
    <footer style={{ background: bTokens.bgDark, color: bTokens.bg, padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) 40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${bTokens.accent}20, transparent 60%)`, filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 'clamp(40px, 8vw, 88px)', fontWeight: 800, letterSpacing: -3, lineHeight: 0.95, marginBottom: 32, fontFamily: 'Inter Tight, Inter, sans-serif', maxWidth: 900 }}>Ready to <span style={{ color: bTokens.accent }}>grow</span>?</div>
          <a href="/preview/b/contact" style={{ background: bTokens.accent, color: bTokens.bgDark, padding: '18px 32px', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block', boxShadow: `0 12px 40px ${bTokens.accentGlow}` }}>Start today →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 40, marginBottom: 48, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${bTokens.accent}, ${bTokens.accentDim})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: bTokens.bg }} />
              </div>
              <span style={{ fontFamily: 'Inter Tight, Inter, sans-serif', fontWeight: 800, fontSize: 18 }}>MACH</span>
            </div>
            <div style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.6, maxWidth: 260 }}>Growth marketing for service-based businesses that want to build something lasting.</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>Services</div>
            {content.services.map(s => (<div key={s.name} style={{ marginBottom: 10, fontSize: 14, opacity: 0.75 }}>{s.name}</div>))}
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>Company</div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/b/team" style={{ color: 'inherit', opacity: 0.75, textDecoration: 'none' }}>Team</a></div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/b/industries" style={{ color: 'inherit', opacity: 0.75, textDecoration: 'none' }}>Industries</a></div>
            <div style={{ marginBottom: 10, fontSize: 14 }}><a href="/preview/b/contact" style={{ color: 'inherit', opacity: 0.75, textDecoration: 'none' }}>Contact</a></div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>Offices</div>
            <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.75 }}>Kansas City, MO</div>
            <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.75 }}>Boston, MA</div>
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 12, opacity: 0.5 }}>
          <div>© 2026 MACH Digital Solutions · NGS Digital LLC</div>
          <div>hello@machdigitalsolutions.com</div>
        </div>
      </div>
    </footer>
  )
}

// Big product screenshot mockup - dashboard style
export function DashboardMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: 20, overflow: 'hidden', background: bTokens.bgCard, boxShadow: '0 40px 80px -20px rgba(15,14,12,0.15), 0 20px 40px -10px rgba(249,115,22,0.15), 0 0 0 1px rgba(15,14,12,0.06)' }}>
      {/* Header bar */}
      <div style={{ background: bTokens.bg, padding: '14px 18px', borderBottom: `1px solid ${bTokens.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
        </div>
        <div style={{ fontSize: 12, color: bTokens.inkMuted, fontWeight: 500 }}>Portfolio Overview · Live</div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#22c55e15', borderRadius: 100, fontSize: 11, color: bTokens.green, fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: bTokens.green }} /> All systems normal
        </div>
      </div>
      {/* Main content */}
      <div style={{ padding: 20, background: bTokens.bg }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 12 }}>
          <div style={{ background: bTokens.bgCard, padding: 20, borderRadius: 12, border: `1px solid ${bTokens.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: bTokens.inkMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4, fontWeight: 600 }}>Lead Volume</div>
                <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1, color: bTokens.ink }}>+142%</div>
              </div>
              <div style={{ fontSize: 11, color: bTokens.green, fontWeight: 600, padding: '4px 8px', background: '#05966915', borderRadius: 6 }}>↑ 24% MoM</div>
            </div>
            {/* Chart */}
            <div style={{ display: 'flex', gap: 4, height: 48, alignItems: 'flex-end' }}>
              {[35, 42, 38, 55, 48, 62, 58, 71, 68, 82, 88, 95].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: i > 7 ? `linear-gradient(180deg, ${bTokens.accent}, ${bTokens.accentDim})` : bTokens.accentSoft, borderRadius: 3 }} />
              ))}
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${bTokens.accent}, ${bTokens.accentDim})`, padding: 20, borderRadius: 12, color: bTokens.bg }}>
            <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4, fontWeight: 600 }}>Active Clients</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1, marginBottom: 8 }}>24</div>
            <div style={{ fontSize: 11, opacity: 0.85 }}>All accounts optimal</div>
          </div>
        </div>
        {/* Activity list */}
        <div style={{ background: bTokens.bgCard, borderRadius: 12, border: `1px solid ${bTokens.border}` }}>
          {[
            { icon: '⚡', text: 'Bid strategy adjusted for emergency keywords', client: 'Rocky Mountain HVAC', color: bTokens.accent },
            { icon: '📝', text: 'Content brief generated: water heater installation', client: 'Elite Plumbing Co', color: bTokens.purple },
            { icon: '📊', text: 'Meta descriptions optimized across 12 pages', client: 'Front Range Home', color: bTokens.green },
          ].map((r, i) => (
            <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < 2 ? `1px solid ${bTokens.border}` : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${r.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: bTokens.ink, fontWeight: 500, marginBottom: 2 }}>{r.text}</div>
                <div style={{ fontSize: 11, color: bTokens.inkMuted }}>{r.client}</div>
              </div>
              <div style={{ fontSize: 10, color: bTokens.inkMuted }}>2m</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Marquee logo strip
export function LogoMarquee() {
  const items = ['SERVICE-BASED', 'HOME SERVICES', 'HVAC', 'PLUMBING', 'ROOFING', 'ELECTRICAL', 'LANDSCAPING', 'PEST CONTROL', 'WINDOW CLEANING', 'CLEANING SERVICES']
  return (
    <div style={{ padding: 'clamp(32px, 5vw, 48px) 0', borderTop: `1px solid ${bTokens.border}`, borderBottom: `1px solid ${bTokens.border}`, overflow: 'hidden', background: bTokens.bg }}>
      <div className="marquee-track" style={{ display: 'flex', gap: 48, width: 'max-content', whiteSpace: 'nowrap' }}>
        {[...items, ...items].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 48, fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 700, fontFamily: 'Inter Tight, Inter, sans-serif', letterSpacing: -1, color: bTokens.inkMuted }}>
            {label}
            <span style={{ color: bTokens.accent }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  )
}
