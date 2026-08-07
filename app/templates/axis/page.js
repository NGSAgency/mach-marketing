import { axisTokens as t } from './tokens.js'
import { ServiceIcon } from '../../../lib/templates/shared/icons.js'
import { config } from '../../../lib/templates/configs/example-multi-service.js'
import { buildHomeMetadata, buildLocalBusinessSchema, JsonLd } from '../../../lib/templates/shared/seo/index.js'
import { AxisHeader, AxisFooter } from './components/Chrome.js'

export async function generateMetadata() {
  return buildHomeMetadata(config, { isPreview: true })
}

export default async function AxisHome({ searchParams }) {
  const params = await (searchParams || Promise.resolve({}))
  const accentOverride = params.accent
  const logoOverride = params.logo
  const T = accentOverride ? { ...t, colors: { ...t.colors, accent: accentOverride } } : t
  const c = config
  const categories = [...new Set(c.services.map(s => s.category))]

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} />

        {/* HERO - immersive full-viewport */}
        <section style={{ background: T.colors.bg, padding: '80px 32px 0', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', width: '100%', textAlign: 'center', paddingBottom: 64 }}>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 32, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>
              ★ {c.reviews.google_rating} · {c.reviews.google_count}+ reviews · Family-owned since {c.business.established_year}
            </div>
            <h1 style={{ fontSize: "clamp(40px, 11vw, 128px)", fontWeight: 800, letterSpacing: 'clamp(-2px, -0.5vw, -5px)', lineHeight: 0.95, margin: '0 0 32px 0', color: T.colors.text }}>
              Your home,<br />
              <span style={{ color: T.colors.accent }}>handled.</span>
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 26px)", color: T.colors.textDim, lineHeight: 1.4, margin: '0 auto 48px', maxWidth: 780, fontWeight: 400 }}>
              HVAC, plumbing, and electrical. One number. One team. One accountability.
            </p>
            <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/templates/axis/contact" style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: 'clamp(14px, 2vw, 20px) clamp(20px, 4vw, 40px)', fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.glow }}>Get started</a>
              <a href={`tel:${c.business.phone}`} style={{ color: T.colors.text, textDecoration: 'none', padding: 'clamp(14px, 2vw, 20px) clamp(20px, 4vw, 40px)', fontSize: 18, fontWeight: 600, borderRadius: T.radius.full, border: `1.5px solid ${T.colors.border}` }}>{c.business.phone_display}</a>
            </div>
          </div>

          {/* Product hero visual - clean big card */}
          <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', width: '100%', background: T.colors.bgSecondary, borderRadius: `${T.radius.xl} ${T.radius.xl} 0 0`, aspectRatio: '21/9', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: T.shadow.lift, border: `1px solid ${T.colors.borderLight}` }}>
            <div style={{ textAlign: 'center', color: T.colors.textDim, fontSize: 14, fontWeight: 500 }}>
              [ Big hero product-style image ]<br/>
              <span style={{ color: T.colors.textMuted, fontSize: 12, marginTop: 8, display: 'block' }}>Full-bleed lifestyle shot</span>
            </div>
          </div>
        </section>

        {/* CATEGORY SECTIONS - each trade is its own product moment, full-bleed alternating */}
        {categories.map((cat, idx) => {
          const catServices = c.services.filter(s => s.category === cat)
          const alt = idx % 2 === 1
          const isDark = idx === 1  // Middle category on dark bg for contrast
          return (
            <section key={cat} style={{
              background: isDark ? T.colors.bgInverse : (alt ? T.colors.bgSecondary : T.colors.bg),
              color: isDark ? T.colors.textInverse : T.colors.text,
              padding: 'clamp(56px, 12vw, 160px) clamp(16px, 4vw, 32px)'
            }}>
              <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 96, alignItems: 'center' }}>
                <div style={{ order: alt ? 2 : 1 }}>
                  <div style={{ fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 2 }}>
                    {cat}
                  </div>
                  <h2 style={{ fontSize: "clamp(36px, 8vw, 96px)", fontWeight: 800, letterSpacing: 'clamp(-1.5px, -0.4vw, -4px)', lineHeight: 0.95, margin: '0 0 32px 0', color: isDark ? T.colors.textInverse : T.colors.text }}>
                    {cat === 'HVAC' ? <>Climate<br/>you control.</> : cat === 'Plumbing' ? <>Water<br/>that works.</> : <>Power<br/>you trust.</>}
                  </h2>
                  <p style={{ fontSize: "clamp(15px, 1.6vw, 20px)", color: isDark ? T.colors.textInverseDim : T.colors.textDim, lineHeight: 1.55, marginBottom: 40, maxWidth: 480 }}>
                    {cat === 'HVAC' ? 'From summer emergencies to whole-home installations. Certified technicians, transparent pricing, financing available.' : cat === 'Plumbing' ? 'From drain cleaning to water heater installs. 24/7 emergency response, master plumber on every job.' : 'From panel upgrades to EV chargers. Licensed master electricians, safety-first work you can rely on.'}
                  </p>
                  <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                    {catServices.slice(0, 4).map(svc => (
                      <a key={svc.slug} href={`/templates/axis/services/${svc.slug}`} style={{ textDecoration: 'none', background: isDark ? T.colors.bgInverseAlt : T.colors.bg, padding: '18px 24px', borderRadius: T.radius.md, display: 'flex', alignItems: 'center', gap: 16, border: `1px solid ${isDark ? T.colors.borderDark : T.colors.borderLight}` }}>
                        <div style={{ color: T.colors.accent, flexShrink: 0 }}><ServiceIcon name={svc.icon} size={22} /></div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 16, fontWeight: 600, color: isDark ? T.colors.textInverse : T.colors.text }}>{svc.name}</div>
                        </div>
                        {svc.emergency && (<div style={{ fontSize: 10, color: T.colors.accent, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>24/7</div>)}
                        <div style={{ color: isDark ? T.colors.textInverseDim : T.colors.textDim, fontSize: 18 }}>→</div>
                      </a>
                    ))}
                  </div>
                  <a href={`/templates/axis/services`} style={{ color: T.colors.accent, textDecoration: 'none', fontSize: 16, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    Explore all {cat.toLowerCase()} services →
                  </a>
                </div>
                <div style={{ order: alt ? 1 : 2, background: isDark ? T.colors.bgInverseAlt : T.colors.bgTertiary, aspectRatio: '4/5', borderRadius: T.radius.xl, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: T.shadow.lift, border: `1px solid ${isDark ? T.colors.borderDark : T.colors.borderLight}` }}>
                  <div style={{ textAlign: 'center', color: isDark ? T.colors.textInverseDim : T.colors.textDim, fontSize: 14 }}>
                    [ {cat} image ]
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {/* COMPARISON TABLE - "Why we're different" */}
        <section style={{ background: T.colors.bg, padding: 'clamp(56px, 12vw, 160px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(1080px, 100%)', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 20, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>The difference</div>
              <h2 style={{ fontSize: "clamp(30px, 6.5vw, 72px)", fontWeight: 800, letterSpacing: 'clamp(-1px, -0.3vw, -3px)', lineHeight: 1, margin: 0 }}>
                Not another <br/><span style={{ color: T.colors.accent }}>service company.</span>
              </h2>
            </div>
            <div style={{ background: T.colors.bgSecondary, borderRadius: T.radius.xl, padding: 48, border: `1px solid ${T.colors.borderLight}` }}>
              {[
                { us: 'Master licensed on every truck', them: 'Untrained apprentices doing the work' },
                { us: 'Upfront pricing before we start', them: 'Surprise charges after the work is done' },
                { us: '2-4hr response for emergencies', them: '48+ hour waits, "next available slot"' },
                { us: 'Same crew every visit', them: 'Random subcontractors' },
                { us: '100% satisfaction guarantee', them: '"As-is" work, no accountability' },
                { us: 'Family-owned since 1998', them: 'Private equity roll-up churn' },
              ].map((row, i, arr) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr', gap: 24, padding: '20px 0', borderBottom: i < arr.length - 1 ? `1px solid ${T.colors.borderLight}` : 'none', alignItems: 'center' }}>
                  <div style={{ color: T.colors.accent, fontSize: "clamp(15px, 1.6vw, 20px)", fontWeight: 700 }}>✓</div>
                  <div style={{ fontSize: 17, color: T.colors.text, fontWeight: 600 }}>{row.us}</div>
                  <div style={{ fontSize: 15, color: T.colors.textMuted, textDecoration: 'line-through' }}>{row.them}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SINGLE MASSIVE TESTIMONIAL */}
        <section style={{ background: T.colors.bgInverse, color: T.colors.textInverse, padding: 'clamp(56px, 12vw, 160px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(1080px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', gap: 4, color: T.colors.accent, fontSize: "clamp(15px, 1.8vw, 24px)", marginBottom: 40, letterSpacing: 4 }}>★★★★★</div>
            <p style={{ fontSize: "clamp(22px, 4vw, 48px)", fontWeight: 500, color: T.colors.textInverse, lineHeight: 1.25, margin: '0 0 48px 0', letterSpacing: -1.5 }}>
              "{c.reviews.featured[0].text}"
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 56, height: 56, background: T.colors.accent, color: T.colors.bg, borderRadius: T.radius.full, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: "clamp(15px, 1.6vw, 20px)", fontWeight: 700 }}>
                {c.reviews.featured[0].author.charAt(0)}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{c.reviews.featured[0].author}</div>
                <div style={{ fontSize: 14, color: T.colors.textInverseDim, marginTop: 4 }}>{c.reviews.featured[0].service} · {c.reviews.featured[0].location}</div>
              </div>
            </div>
            <div style={{ marginTop: 64, fontSize: 15, color: T.colors.textInverseDim }}>
              Join {c.reviews.google_count.toLocaleString()}+ neighbors who trust {c.business.display_name}.
            </div>
          </div>
        </section>

        {/* COVERAGE - horizontal band */}
        <section style={{ background: T.colors.bg, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(1400px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, margin: '0 0 24px 0' }}>
              Serving the <span style={{ color: T.colors.accent }}>{c.primary_service_area}</span>.
            </h2>
            <p style={{ fontSize: 18, color: T.colors.textDim, marginBottom: 48, maxWidth: 620, margin: '0 auto 48px' }}>
              {c.service_areas.length}+ neighborhoods · Same-day response · 24/7 emergency
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
              {c.service_areas.map(area => (
                <div key={area} style={{ padding: '12px 20px', background: T.colors.bgSecondary, fontSize: 15, fontWeight: 600, borderRadius: T.radius.full, color: T.colors.text, border: `1px solid ${T.colors.borderLight}` }}>
                  {area}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA - bold */}
        <section style={{ background: T.colors.accent, color: T.colors.bg, padding: 'clamp(56px, 12vw, 160px) clamp(16px, 4vw, 32px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 'min(1080px, 100%)', margin: '0 auto' }}>
            <h2 style={{ fontSize: "clamp(36px, 8vw, 96px)", fontWeight: 800, letterSpacing: 'clamp(-1.5px, -0.4vw, -4px)', lineHeight: 0.95, margin: '0 0 32px 0', color: T.colors.bg }}>
              Let's fix it.
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 22px)", color: T.colors.bg, opacity: 0.9, marginBottom: 48, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
              Call now or request a free quote online.
            </p>
            <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href={`tel:${c.business.phone}`} style={{ background: T.colors.bg, color: T.colors.text, textDecoration: 'none', padding: 'clamp(14px, 2vw, 20px) clamp(20px, 4vw, 40px)', fontSize: 18, fontWeight: 700, borderRadius: T.radius.full }}>
                Call {c.business.phone_display}
              </a>
              <a href="/templates/axis/contact" style={{ background: 'transparent', color: T.colors.bg, textDecoration: 'none', padding: 'clamp(14px, 2vw, 20px) clamp(20px, 4vw, 40px)', fontSize: 18, fontWeight: 700, borderRadius: T.radius.full, border: `2px solid ${T.colors.bg}` }}>
                Get a free quote →
              </a>
            </div>
          </div>
        </section>

        <AxisFooter config={c} />
      </div>
    </>
  )
}
