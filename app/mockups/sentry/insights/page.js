import { SHeader, SFooter, sTokens as T } from '../shell.js'

export const metadata = { title: 'Insights - Sentry Solutions', robots: { index: false, follow: false } }

const POSTS = [
  {
    category: 'Capital Raising',
    date: 'August 12, 2026',
    read: '6 min read',
    title: 'What Founders Get Wrong About Their First Capital Raise',
    excerpt: 'Most first-time founders approach capital raising as a fundraising problem. The best ones treat it as a strategic positioning exercise — and the difference shows up in valuation.',
    slug: 'first-capital-raise-mistakes',
    featured: true,
  },
  {
    category: 'Exit Planning',
    date: 'August 5, 2026',
    read: '8 min read',
    title: 'The 3-Year Runway: Why Great Exits Start Long Before You Sell',
    excerpt: 'A well-run exit process is table stakes. Great exit outcomes come from the operational and financial decisions made in the 24 to 36 months prior.',
    slug: 'three-year-exit-runway',
  },
  {
    category: 'Fractional CFO',
    date: 'July 28, 2026',
    read: '5 min read',
    title: 'When to Hire a Fractional CFO vs. a Full-Time One',
    excerpt: 'The threshold isn\'t revenue — it\'s complexity. Here\'s the framework we use to help founders think through the decision.',
    slug: 'fractional-vs-fulltime-cfo',
  },
  {
    category: 'Growth Strategy',
    date: 'July 21, 2026',
    read: '7 min read',
    title: 'Organic Growth or Acquisition? A Framework for the $10M Business',
    excerpt: 'For lower middle market businesses, the build-vs-buy decision has more variables than most frameworks account for. Here\'s how we think about it.',
    slug: 'organic-vs-acquisition',
  },
  {
    category: 'Financial Operations',
    date: 'July 14, 2026',
    read: '4 min read',
    title: 'The 5 Metrics Every Founder Should See Monthly',
    excerpt: 'Not the vanity numbers. The five metrics that actually tell you whether your business is getting healthier or sicker.',
    slug: 'five-monthly-metrics',
  },
  {
    category: 'Growth Strategy',
    date: 'July 7, 2026',
    read: '6 min read',
    title: 'Why Every ETA Entrepreneur Needs a Financial Partner',
    excerpt: 'Search fund and self-funded acquirers face a specific set of financial challenges in the first 18 months post-close. Here are the ones that matter most.',
    slug: 'eta-financial-partner',
  },
]

const CATEGORIES = ['All', 'Capital Raising', 'Growth Strategy', 'Exit Planning', 'Fractional CFO', 'Financial Operations']

export default function SentryInsights() {
  const featured = POSTS.find(p => p.featured)
  const rest = POSTS.filter(p => !p.featured)

  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Manrope, system-ui, sans-serif' }}>
      <SHeader />

      {/* Hero */}
      <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-15%', width: '50%', height: '70%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}12, transparent 60%)`, filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Insights</div>
          <h1 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(44px, 8vw, 96px)', fontWeight: 400, letterSpacing: -3, lineHeight: 0.98, margin: '0 0 32px 0' }}>
            Perspectives on <em style={{ fontStyle: 'italic', color: T.accent }}>growth, capital, and strategy</em>.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: T.fgDim, lineHeight: 1.55, margin: 0, maxWidth: 780 }}>
            Practical, honest guidance for founders, investors, and entrepreneurs navigating pivotal moments in their businesses.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section style={{ padding: '0 clamp(16px, 4vw, 32px) clamp(24px, 4vw, 40px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', paddingTop: 24 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c} style={{ padding: '8px 16px', background: c === 'All' ? T.accent : T.panel, color: c === 'All' ? T.navy : T.fg, border: `1px solid ${c === 'All' ? T.accent : T.borderStrong}`, borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.2, fontFamily: 'Manrope, system-ui, sans-serif' }}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section style={{ padding: 'clamp(32px, 5vw, 56px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 80px)' }}>
          <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
            <a href={`/mockups/sentry/insights/${featured.slug}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 64px)', padding: 'clamp(32px, 4vw, 56px)', background: T.bgAlt, border: `1px solid ${T.borderStrong}`, borderRadius: 16, textDecoration: 'none', color: 'inherit', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30%', right: '-15%', width: '50%', height: '150%', borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}18, transparent 60%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: T.accent, color: T.navy, borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 24 }}>Featured</div>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 14, color: T.accent, marginBottom: 12 }}>{featured.category}</div>
                <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.1, margin: '0 0 20px 0' }}>{featured.title}</h2>
                <p style={{ fontSize: 'clamp(15px, 1.7vw, 17px)', color: T.fgDim, lineHeight: 1.6, margin: '0 0 24px 0' }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: T.fgMuted }}>
                  <span>{featured.date}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: T.fgMuted }} />
                  <span>{featured.read}</span>
                </div>
              </div>
              <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 12, background: `linear-gradient(135deg, ${T.accent}30, ${T.bgLift})`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(80px, 14vw, 140px)', color: T.accent, fontWeight: 400, letterSpacing: -6 }}>01</div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section style={{ padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 140px)' }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto' }}>
          <div className="sentry-industries-grid" style={{ display: 'grid', gap: 24 }}>
            {rest.map((post, idx) => (
              <a key={post.slug} href={`/mockups/sentry/insights/${post.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ aspectRatio: '16/10', borderRadius: 12, background: `linear-gradient(135deg, ${idx % 2 === 0 ? T.accent + '25' : T.bgLift}, ${T.bgAlt})`, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: `1px solid ${T.border}` }}>
                  <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(48px, 8vw, 80px)', color: T.accent, opacity: 0.7, letterSpacing: -3 }}>0{idx + 2}</div>
                </div>
                <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 13, color: T.accent, marginBottom: 8 }}>{post.category}</div>
                <h3 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 400, letterSpacing: -0.8, lineHeight: 1.2, margin: '0 0 12px 0' }}>{post.title}</h3>
                <p style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.55, margin: '0 0 16px 0' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: T.fgMuted }}>
                  <span>{post.date}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: T.fgMuted }} />
                  <span>{post.read}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 4vw, 32px)', background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Stay Informed</div>
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 400, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px 0' }}>
            The <em style={{ fontStyle: 'italic', color: T.accent }}>Sentry</em> Brief.
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto 32px', maxWidth: 560 }}>
            Concise, actionable perspectives on growth, capital, and strategy — delivered monthly to your inbox.
          </p>
          <div style={{ display: 'flex', gap: 8, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
            <input type="email" placeholder="your@company.com" style={{ flex: 1, minWidth: 220, background: T.bg, border: `1px solid ${T.borderStrong}`, borderRadius: 4, padding: '14px 18px', fontSize: 15, fontFamily: 'Manrope, system-ui, sans-serif', color: T.fg, outline: 'none' }} />
            <button type="submit" style={{ background: T.accent, color: T.navy, padding: '14px 24px', borderRadius: 4, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: 0.3, fontFamily: 'Manrope, system-ui, sans-serif' }}>Subscribe →</button>
          </div>
        </div>
      </section>

      <SFooter />
    </div>
  )
}
