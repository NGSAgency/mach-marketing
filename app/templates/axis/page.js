import { axisTokens as T } from './tokens.js'
import { ServiceIcon } from '../../../lib/templates/shared/icons.js'
import { config } from '../../../lib/templates/configs/example-multi-service.js'
import { buildHomeMetadata, buildLocalBusinessSchema, JsonLd } from '../../../lib/templates/shared/seo/index.js'
import { AxisHeader, AxisFooter } from './components/Chrome.js'
import { AxisCTA } from './components/Blocks.js'

export async function generateMetadata() {
  return buildHomeMetadata(config, { isPreview: true })
}

export default function AxisHome() {
  const c = config
  const categories = [...new Set(c.services.map(s => s.category))]

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(c)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader config={c} />

        {/* HERO - big centered marketing hero (Apple product-launch style) */}
        <section style={{ background: T.colors.bg, padding: '96px 32px 128px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 24, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>
              ★ {c.reviews.google_rating} · {c.reviews.google_count}+ Google reviews
            </div>
            <h1 style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3.5, lineHeight: 1.02, margin: '0 0 32px 0', color: T.colors.text }}>
              Premium home services.<br />
              <span style={{ color: T.colors.accent }}>Simplified.</span>
            </h1>
            <p style={{ fontSize: 24, color: T.colors.textDim, lineHeight: 1.5, margin: '0 auto 48px', maxWidth: 720 }}>
              HVAC, plumbing, and electrical from a single trusted team. Same-day service. Transparent pricing. Family-owned since {c.business.established_year}.
            </p>
            <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/templates/axis/contact" style={{ background: T.colors.accent, color: T.colors.bg, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.glow, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Get started
              </a>
              <a href={`tel:${c.business.phone}`} style={{ background: T.colors.bg, color: T.colors.text, textDecoration: 'none', padding: '18px 36px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, border: `1.5px solid ${T.colors.border}`, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Call {c.business.phone_display}
              </a>
            </div>
          </div>

          {/* Hero visual - clean device/product-style card */}
          <div style={{ maxWidth: 1080, margin: '96px auto 0', background: T.colors.bgSecondary, borderRadius: T.radius.xl, aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: T.shadow.lift, border: `1px solid ${T.colors.borderLight}` }}>
            <div style={{ textAlign: 'center', color: T.colors.textDim, fontSize: 14, fontWeight: 500 }}>
              [ Product-style hero image ]<br/>
              <span style={{ color: T.colors.textMuted, fontSize: 12, marginTop: 8, display: 'block' }}>Real crew · Real work · Real trust</span>
            </div>
          </div>
        </section>

        {/* METRICS BAR - clean stat row */}
        <section style={{ background: T.colors.bgSecondary, padding: '64px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, textAlign: 'center' }}>
            {[
              { big: `${c.reviews.google_rating}★`, small: 'Google rating' },
              { big: `${c.reviews.google_count}+`, small: 'Verified reviews' },
              { big: `${c.business.years_in_business}yr`, small: 'In business' },
              { big: '24/7', small: 'Emergency service' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 52, fontWeight: 800, color: T.colors.text, letterSpacing: -2, lineHeight: 1 }}>{s.big}</div>
                <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8, fontWeight: 500 }}>{s.small}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES - product-card grid */}
        <section style={{ background: T.colors.bg, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 16, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Every home service</div>
              <h2 style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05, margin: 0, color: T.colors.text }}>
                One team. <span style={{ color: T.colors.accent }}>Everything.</span>
              </h2>
              <p style={{ fontSize: 20, color: T.colors.textDim, lineHeight: 1.5, margin: '20px auto 0', maxWidth: 620 }}>
                {c.services.length} services across HVAC, plumbing, and electrical — from a single licensed team you can trust.
              </p>
            </div>

            {categories.map(cat => {
              const catServices = c.services.filter(s => s.category === cat)
              return (
                <div key={cat} style={{ marginBottom: 48 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
                    <h3 style={{ fontSize: 24, fontWeight: 700, color: T.colors.text, margin: 0, letterSpacing: -0.5 }}>{cat}</h3>
                    <div style={{ fontSize: 14, color: T.colors.textMuted }}>{catServices.length} service{catServices.length === 1 ? '' : 's'}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {catServices.map(svc => (
                      <a key={svc.slug} href={`/templates/axis/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.bgSecondary, padding: 32, borderRadius: T.radius.lg, display: 'block', position: 'relative', boxShadow: T.shadow.subtle, border: `1px solid ${T.colors.borderLight}` }}>
                        {svc.emergency && (
                          <div style={{ position: 'absolute', top: 20, right: 20, background: T.colors.accent, color: T.colors.bg, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: T.radius.full }}>24/7</div>
                        )}
                        <div style={{ width: 56, height: 56, background: T.colors.bg, borderRadius: T.radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.colors.accent, marginBottom: 20, boxShadow: T.shadow.subtle }}>
                          <ServiceIcon name={svc.icon} size={28} />
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: T.colors.text, marginBottom: 8, letterSpacing: -0.5 }}>{svc.name}</div>
                        <div style={{ fontSize: 14, color: T.colors.textDim, lineHeight: 1.5 }}>{svc.short}</div>
                        <div style={{ marginTop: 20, color: T.colors.accent, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>Learn more →</div>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* FEATURE BAND - value props */}
        <section style={{ background: T.colors.bgSecondary, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, margin: 0, color: T.colors.text }}>
                Why choose {c.business.display_name.split(' ')[0]}.
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                { title: 'Same-day service', desc: 'Most jobs completed on the first visit. Emergency response in 2-4 hours.' },
                { title: 'Transparent pricing', desc: 'Upfront quotes before we start. No surprises, no hidden fees.' },
                { title: 'Family-owned', desc: `Family-owned since ${c.business.established_year}. Neighbors serving neighbors.` },
                { title: 'Licensed & insured', desc: 'Master licenses in HVAC, plumbing, and electrical. Fully bonded.' },
                { title: '100% guarantee', desc: 'We stand behind every job. If you\'re not satisfied, we make it right.' },
                { title: 'Financing available', desc: 'Flexible payment options through Synchrony, Wells Fargo, and GreenSky.' },
              ].map(f => (
                <div key={f.title} style={{ background: T.colors.bg, padding: 32, borderRadius: T.radius.lg, boxShadow: T.shadow.subtle }}>
                  <div style={{ width: 40, height: 40, background: T.colors.accentGlow, color: T.colors.accent, borderRadius: T.radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>✓</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.colors.text, marginBottom: 8, letterSpacing: -0.3 }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: T.colors.textDim, lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL - clean modern card */}
        <section style={{ background: T.colors.bg, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 16, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Reviews</div>
              <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
                Trusted by <span style={{ color: T.colors.accent }}>{c.reviews.google_count}+ neighbors</span>.
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              {c.reviews.featured.map((r, i) => (
                <div key={i} style={{ background: T.colors.bgSecondary, padding: 32, borderRadius: T.radius.lg, boxShadow: T.shadow.subtle }}>
                  <div style={{ color: T.colors.accent, fontSize: 18, marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
                  <p style={{ fontSize: 17, color: T.colors.text, lineHeight: 1.6, margin: '0 0 24px 0', fontWeight: 500 }}>"{r.text}"</p>
                  <div style={{ paddingTop: 20, borderTop: `1px solid ${T.colors.borderLight}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, background: T.colors.accent, color: T.colors.bg, borderRadius: T.radius.full, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700 }}>
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: T.colors.text }}>{r.author}</div>
                      <div style={{ fontSize: 13, color: T.colors.textDim, marginTop: 2 }}>{r.service} · {r.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE AREAS */}
        <section style={{ background: T.colors.bgSecondary, padding: '120px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 16, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Coverage</div>
                <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
                  Serving the {c.primary_service_area}.
                </h2>
                <p style={{ fontSize: 18, color: T.colors.textDim, lineHeight: 1.6, marginTop: 24 }}>
                  {c.service_areas.length}+ neighborhoods · Same-day response · 24/7 emergency
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {c.service_areas.map(area => (
                  <div key={area} style={{ padding: '14px 20px', background: T.colors.bg, fontSize: 15, fontWeight: 600, borderRadius: T.radius.md, color: T.colors.text, boxShadow: T.shadow.subtle, textAlign: 'center', border: `1px solid ${T.colors.borderLight}` }}>
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AxisCTA config={c} />
        <AxisFooter config={c} />
      </div>
    </>
  )
}
