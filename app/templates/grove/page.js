import { groveTokens as t } from './tokens.js'
import { ServiceIcon } from '../../../lib/templates/shared/icons.js'
import { config } from '../../../lib/templates/configs/example-multi-service.js'
import { buildHomeMetadata, buildLocalBusinessSchema, JsonLd } from '../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveFooter } from './components/Chrome.js'
import { GroveCTA } from './components/Blocks.js'

export async function generateMetadata() {
  return buildHomeMetadata(config, { isPreview: true })
}

export default async function GroveHome({ searchParams }) {
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
        <GroveHeader config={c} />

        {/* HERO - Full-width centered, story-first */}
        <section style={{ background: T.colors.bg, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(40px, 8vw, 80px)', textAlign: 'center', position: 'relative' }}>
          <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>
              Family-owned since {c.business.established_year}
            </div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(36px, 8vw, 88px)", fontWeight: 500, letterSpacing: 'clamp(-1px, -0.3vw, -3px)', margin: '0 0 32px 0', lineHeight: 0.98, color: T.colors.text }}>
              The neighbors {c.primary_service_area} trusts <em style={{ fontStyle: 'italic', color: T.colors.accent, fontWeight: 500 }}>for home.</em>
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 22px)", color: T.colors.textDim, lineHeight: 1.55, margin: '0 auto 48px', maxWidth: 620 }}>
              HVAC, plumbing, and electrical care from the same family, on the same street corner, for {c.business.years_in_business}+ years.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href={`tel:${c.business.phone}`} style={{ background: T.colors.accent, color: T.colors.bgLight, textDecoration: 'none', padding: 'clamp(14px, 2vw, 20px) clamp(20px, 4vw, 40px)', fontFamily: T.fonts.body, fontSize: "clamp(15px, 1.5vw, 18px)", fontWeight: 600, borderRadius: T.radius.full, boxShadow: T.shadow.warm, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>☎</span> {c.business.phone_display}
              </a>
              <a href="/templates/grove/services" style={{ color: T.colors.text, textDecoration: 'underline', textDecorationColor: T.colors.accent, textUnderlineOffset: 6, fontFamily: T.fonts.body, fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 500, padding: 'clamp(14px, 2vw, 20px) clamp(8px, 2vw, 12px)' }}>
                See what we do
              </a>
            </div>
          </div>

          {/* Wide inline stats bar */}
          <div style={{ maxWidth: 'min(1100px, 100%)', margin: 'clamp(48px, 8vw, 96px) auto 0', paddingTop: 48, borderTop: `1px solid ${T.colors.border}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: 32 }}>
            {[
              { big: `${c.reviews.google_rating}★`, small: `${c.reviews.google_count}+ Google reviews` },
              { big: `${c.business.years_in_business}yrs`, small: `Serving ${c.primary_service_area}` },
              { big: '24/7', small: 'Emergency service' },
              { big: `${c.service_areas.length}+`, small: 'Neighborhoods served' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: T.fonts.display, fontSize: "clamp(22px, 3.5vw, 40px)", fontWeight: 500, color: T.colors.text, marginBottom: 6, letterSpacing: -1 }}>{s.big}</div>
                <div style={{ fontSize: 13, color: T.colors.textMuted }}>{s.small}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HERITAGE / STORY - Full-bleed with alternating panels */}
        <section style={{ background: T.colors.bgAlt, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(1240px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(28px, 5vw, 80px)', alignItems: 'center' }}>
            <div style={{ background: T.colors.accentGlow, aspectRatio: '5/6', borderRadius: T.radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.colors.border}` }}>
              <div style={{ color: T.colors.accent, fontSize: 13, fontWeight: 500 }}>[ Family / heritage photo ]</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Our story</div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 5.5vw, 56px)", fontWeight: 500, letterSpacing: 'clamp(-0.5px, -0.15vw, -1.5px)', margin: '0 0 32px 0', lineHeight: 1.05, color: T.colors.text }}>
                Started in {c.business.established_year} with a handshake and a promise.
              </h2>
              <p style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: T.colors.textDim, lineHeight: 1.7, marginBottom: 20 }}>
                We treat every home like our own. Show up when we say we will. Charge what the job is worth. Explain the work so you know exactly what you paid for.
              </p>
              <p style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: T.colors.textDim, lineHeight: 1.7, marginBottom: 32 }}>
                {c.business.years_in_business}+ years later, we still answer the phone the same way. Still send the same crew back for the follow-up. Still know most of our customers by name.
              </p>
              <div style={{ display: 'flex', gap: 'clamp(20px, 3vw, 40px)', paddingTop: 32, borderTop: `1px solid ${T.colors.border}` }}>
                <div>
                  <div style={{ fontFamily: T.fonts.display, fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 500, color: T.colors.accent, letterSpacing: -1 }}>{c.team.size}</div>
                  <div style={{ fontSize: 13, color: T.colors.textMuted }}>Team members</div>
                </div>
                <div>
                  <div style={{ fontFamily: T.fonts.display, fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 500, color: T.colors.accent, letterSpacing: -1 }}>NATE</div>
                  <div style={{ fontSize: 13, color: T.colors.textMuted }}>Certified technicians</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES - Alternating full-bleed sections by category (NOT grid) */}
        <section id="services" style={{ background: T.colors.bg, padding: 'clamp(48px, 10vw, 120px) 0 clamp(32px, 6vw, 60px)' }}>
          <div style={{ maxWidth: 'min(1240px, 100%)', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)', textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Everything for your home</div>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(30px, 6.5vw, 64px)", fontWeight: 500, letterSpacing: 'clamp(-0.5px, -0.2vw, -2px)', margin: 0, lineHeight: 1.05, color: T.colors.text }}>
              One team. <em style={{ fontStyle: 'italic', color: T.colors.accent }}>Every home service.</em>
            </h2>
          </div>

          {categories.map((cat, idx) => {
            const catServices = c.services.filter(s => s.category === cat)
            const alt = idx % 2 === 1
            return (
              <div key={cat} style={{ background: alt ? T.colors.bgAlt : T.colors.bg, padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 32px)', borderTop: idx === 0 ? `1px solid ${T.colors.border}` : 'none', borderBottom: `1px solid ${T.colors.border}` }}>
                <div style={{ maxWidth: 'min(1240px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(28px, 5vw, 80px)', alignItems: 'center' }}>
                  <div style={{ order: alt ? 2 : 1 }}>
                    <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>{cat} Services</div>
                    <h3 style={{ fontFamily: T.fonts.display, fontSize: "clamp(24px, 4.5vw, 48px)", fontWeight: 500, letterSpacing: 'clamp(-0.5px, -0.15vw, -1.5px)', margin: '0 0 24px 0', lineHeight: 1.1, color: T.colors.text }}>
                      Trusted {cat.toLowerCase()} care for your home.
                    </h3>
                    <p style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: T.colors.textDim, lineHeight: 1.6, marginBottom: 32 }}>
                      From routine maintenance to emergencies. {catServices.length} services, one licensed team.
                    </p>
                    <div style={{ display: 'grid', gap: 12 }}>
                      {catServices.map(svc => (
                        <a key={svc.slug} href={`/templates/grove/services/${svc.slug}`} style={{ textDecoration: 'none', background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: '20px 24px', borderRadius: T.radius.sm, display: 'flex', alignItems: 'center', gap: 16, boxShadow: T.shadow.soft }}>
                          <div style={{ color: T.colors.accent, flexShrink: 0 }}><ServiceIcon name={svc.icon} size={24} /></div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: T.fonts.display, fontSize: "clamp(15px, 1.6vw, 20px)", fontWeight: 500, color: T.colors.text, letterSpacing: -0.3 }}>{svc.name}</div>
                            <div style={{ fontSize: 13, color: T.colors.textMuted, marginTop: 2 }}>{svc.short}</div>
                          </div>
                          {svc.emergency && (
                            <div style={{ background: T.colors.accentGlow, color: T.colors.accent, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: T.radius.full }}>24/7</div>
                          )}
                          <div style={{ color: T.colors.accent, fontSize: 18 }}>→</div>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div style={{ order: alt ? 1 : 2, background: T.colors.accentGlow, aspectRatio: '4/5', borderRadius: T.radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.colors.border}` }}>
                    <div style={{ color: T.colors.accent, fontSize: 13, fontWeight: 500 }}>[ {cat} work photo ]</div>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* SINGLE FEATURED TESTIMONIAL - magazine editorial */}
        <section style={{ background: T.colors.accent, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ color: T.colors.bgLight, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 32, opacity: 0.7 }}>What our neighbors say</div>
            <div style={{ fontSize: "clamp(30px, 7.5vw, 80px)", color: T.colors.bgLight, opacity: 0.3, lineHeight: 0.7, marginBottom: 20, fontFamily: T.fonts.display }}>"</div>
            <p style={{ fontFamily: T.fonts.display, fontSize: "clamp(22px, 3.5vw, 40px)", fontWeight: 400, fontStyle: 'italic', color: T.colors.bgLight, lineHeight: 1.3, margin: '0 0 40px 0', letterSpacing: -0.5 }}>
              {c.reviews.featured[0].text}
            </p>
            <div style={{ color: T.colors.bgLight, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.reviews.featured[0].author}</div>
            <div style={{ color: T.colors.bgLight, opacity: 0.75, fontSize: 14 }}>{c.reviews.featured[0].service} · {c.reviews.featured[0].location}</div>
            <div style={{ marginTop: 48, display: 'inline-flex', gap: 8, alignItems: 'center', color: T.colors.bgLight, fontSize: 15 }}>
              <span style={{ letterSpacing: 3, fontSize: 18 }}>★★★★★</span>
              <span style={{ opacity: 0.9 }}>{c.reviews.google_rating} across {c.reviews.google_count}+ Google reviews</span>
            </div>
          </div>
        </section>

        {/* SERVICE AREAS - Narrative + softer grid */}
        <section style={{ background: T.colors.bg, padding: 'clamp(48px, 10vw, 120px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ maxWidth: 'min(900px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Serving the neighborhood</div>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 5.5vw, 56px)", fontWeight: 500, letterSpacing: 'clamp(-0.5px, -0.15vw, -1.5px)', margin: '0 0 32px 0', lineHeight: 1.05, color: T.colors.text }}>
              We're on <em style={{ fontStyle: 'italic', color: T.colors.accent }}>your street.</em>
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: T.colors.textDim, lineHeight: 1.6, marginBottom: 48, maxWidth: 'min(700px, 100%)', margin: '0 auto 48px' }}>
              We serve {c.service_areas.length}+ neighborhoods across the {c.primary_service_area} area — usually with a truck already nearby.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 800, margin: '0 auto' }}>
              {c.service_areas.map(area => (
                <div key={area} style={{ padding: '10px 20px', background: T.colors.accentGlow, color: T.colors.accent, fontSize: 15, fontWeight: 600, borderRadius: T.radius.full, letterSpacing: -0.2 }}>
                  {area}
                </div>
              ))}
            </div>
          </div>
        </section>

        <GroveCTA config={c} />
        <GroveFooter config={c} />
      </div>
    </>
  )
}
