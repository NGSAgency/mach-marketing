export const sTokens = {
  bg: '#0d1420',
  bgAlt: '#131b2b',
  bgLift: '#1a2338',
  panel: 'rgba(255,255,255,0.03)',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
  fg: '#f7f5f0',
  fgDim: '#a8b0c0',
  fgMuted: '#6b7488',
  accent: '#d4a24f',
  accentBright: '#e6b968',
  accentDim: '#a67e3c',
  navy: '#0d1420',
  navyLight: '#1e2a42',
}

export const SERVICES = [
  { tag: '01', name: 'Growth Strategy', slug: 'growth-strategy', short: 'Financially grounded growth planning', body: 'We help businesses design and execute financially grounded growth strategies, whether that includes purely organic strategies or inorganic acquisition of complementary businesses. Every strategy is built on rigorous financial modeling and market analysis.' },
  { tag: '02', name: 'Capital Raising', slug: 'capital-raising', short: 'From modeling to close', body: 'We help companies prepare for and navigate the capital raising process. From financial modeling and investor materials to capital structure design and negotiations with lenders and equity partners, we guide you through every stage.' },
  { tag: '03', name: 'Exit Planning', slug: 'exit-planning', short: 'Years of preparation, one great outcome', body: 'Good exit planning means a well run process. Great exit planning happens in the years leading up to it. Our work includes transaction preparation, valuation optimization, buyer identification, and negotiation support.' },
  { tag: '04', name: 'Fractional CFO', slug: 'fractional-cfo', short: 'Senior finance leadership on demand', body: 'We provide senior financial leadership without the cost of a full-time executive. Our fractional CFO services include financial oversight, forecasting, strategic planning, board reporting, and hands-on partnership with your leadership team.' },
  { tag: '05', name: 'Financial Operations', slug: 'financial-operations', short: 'Day-to-day infrastructure that scales', body: 'From bookkeeping and accounts receivable to payroll and reporting, we manage the day-to-day financial infrastructure that keeps your business running efficiently and gives you clean data to make better decisions.' },
  { tag: '06', name: 'Advisory & Board Services', slug: 'advisory-board', short: 'A trusted partner in the boardroom', body: 'We serve as strategic advisors and board members to founder-led companies and lower middle market businesses, providing outside perspective, institutional-level expertise, and long-term partnership.' },
]

export const INDUSTRIES = [
  { name: 'Founder-Led Companies', desc: 'Owner-operated businesses ready to scale' },
  { name: 'ETA Entrepreneurs', desc: 'Search fund and self-funded acquirers' },
  { name: 'Lower Middle Market', desc: '$2M–$50M revenue businesses' },
  { name: 'Private Equity Portfolio', desc: 'Post-investment operational partners' },
  { name: 'Family-Owned Businesses', desc: 'Multi-generational transitions' },
  { name: 'Service Businesses', desc: 'Professional services and specialty firms' },
]

export function SHeader() {
  const T = sTokens
  return (
    <nav style={{ position: 'sticky', top: 0, background: 'rgba(13,20,32,0.85)', backdropFilter: 'blur(20px) saturate(140%)', WebkitBackdropFilter: 'blur(20px) saturate(140%)', zIndex: 50, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', padding: '14px clamp(12px, 3vw, 32px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <a href="/mockups/sentry" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flex: '0 0 auto', minWidth: 0 }}>
          <img src="/mockups/sentry-logo.png" alt="Sentry Solutions" style={{ height: 'clamp(36px, 6vw, 52px)', width: 'auto', display: 'block', maxWidth: 'min(260px, 60vw)' }} />
        </a>
        <div className="preview-nav-links">
          <div className="sentry-nav-dropdown" style={{ position: 'relative' }}>
            <a href="/mockups/sentry/services" style={{ padding: '10px 18px', color: T.fg, textDecoration: 'none', fontSize: 15, fontWeight: 600, letterSpacing: 0.2, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.7 }}><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <div className="sentry-nav-dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, minWidth: 300, marginTop: 8, background: 'rgba(19,27,43,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: `1px solid ${T.borderStrong}`, borderRadius: 8, padding: 8, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.5)' }}>
              {SERVICES.map(s => (
                <a key={s.slug} href={`/mockups/sentry/services/${s.slug}`} style={{ display: 'block', padding: '12px 16px', color: T.fg, textDecoration: 'none', borderRadius: 6, transition: 'background 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 13, color: T.accent }}>{s.tag}</span>
                    <div>
                      <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 17, fontWeight: 500, letterSpacing: -0.3, marginBottom: 2 }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: T.fgDim, lineHeight: 1.4 }}>{s.short}</div>
                    </div>
                  </div>
                </a>
              ))}
              <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 8, paddingTop: 8 }}>
                <a href="/mockups/sentry/services" style={{ display: 'block', padding: '10px 16px', color: T.accent, textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase', borderRadius: 6 }}>
                  View All Services →
                </a>
              </div>
            </div>
          </div>
          <a href="/mockups/sentry/insights" style={{ padding: '10px 18px', color: T.fg, textDecoration: 'none', fontSize: 15, fontWeight: 600, letterSpacing: 0.2 }}>Insights</a>
          <a href="/mockups/sentry/about" style={{ padding: '10px 18px', color: T.fg, textDecoration: 'none', fontSize: 15, fontWeight: 600, letterSpacing: 0.2 }}>About</a>
          <a href="/mockups/sentry/contact" style={{ padding: '10px 18px', color: T.fg, textDecoration: 'none', fontSize: 15, fontWeight: 600, letterSpacing: 0.2 }}>Contact</a>
          <a href="/mockups/sentry/contact" style={{ padding: '10px 20px', color: T.navy, background: T.accent, textDecoration: 'none', fontSize: 14, fontWeight: 700, borderRadius: 4, marginLeft: 8, whiteSpace: 'nowrap', letterSpacing: 0.3 }}>Schedule a Call →</a>
        </div>
        <a href="/mockups/sentry/contact" className="preview-nav-cta-mobile" style={{ padding: '8px 14px', color: T.navy, background: T.accent, textDecoration: 'none', fontSize: 12, fontWeight: 700, borderRadius: 4, whiteSpace: 'nowrap' }}>Contact →</a>
      </div>
    </nav>
  )
}

export function SFooter() {
  const T = sTokens
  return (
    <footer style={{ background: T.navy, borderTop: `1px solid ${T.border}`, padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) 40px', color: T.fg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-40%', right: '10%', width: '60%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}10, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: 64 }}>
          <img src="/mockups/sentry-logo.png" alt="Sentry Solutions" style={{ height: 48, width: 'auto', marginBottom: 32 }} />
          <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 780, fontStyle: 'italic' }}>Institutional-grade strategy for entrepreneurial businesses.</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 40, marginBottom: 48, paddingTop: 48, borderTop: `1px solid ${T.border}` }}>
          <div>
            <div style={{ fontSize: 11, color: T.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>Services</div>
            {SERVICES.map(s => (<div key={s.name} style={{ marginBottom: 8, fontSize: 13, color: T.fgDim }}>{s.name}</div>))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>Firm</div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/mockups/sentry/about" style={{ color: T.fgDim, textDecoration: 'none' }}>About</a></div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/mockups/sentry/contact" style={{ color: T.fgDim, textDecoration: 'none' }}>Contact</a></div>
            <div style={{ marginBottom: 8, fontSize: 13 }}><a href="/mockups/sentry/insights" style={{ color: T.fgDim, textDecoration: 'none' }}>Insights</a></div>
            <div style={{ marginBottom: 8, fontSize: 13, color: T.fgDim }}>Case Studies</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>Who We Serve</div>
            {INDUSTRIES.slice(0, 4).map(i => (<div key={i.name} style={{ marginBottom: 8, fontSize: 13, color: T.fgDim }}>{i.name}</div>))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.fgMuted, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>Get in Touch</div>
            <div style={{ marginBottom: 12, fontSize: 13, color: T.fgDim, lineHeight: 1.6 }}>Schedule a complimentary strategy call.</div>
            <a href="/mockups/sentry/contact" style={{ display: 'inline-block', padding: '10px 18px', background: T.accent, color: T.navy, textDecoration: 'none', fontSize: 13, fontWeight: 700, borderRadius: 4 }}>Start the conversation →</a>
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 12, color: T.fgMuted }}>
          <div>© 2026 Sentry Solutions. All rights reserved.</div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>Mockup by MACH Digital Solutions</div>
        </div>
      </div>
    </footer>
  )
}
