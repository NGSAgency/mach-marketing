import { config } from '../../../../lib/templates/configs/example-multi-service.js'
import { groveTokens as T } from '../tokens.js'
import { buildStaticMetadata, buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveFooter } from '../components/Chrome.js'
import { GrovePageHero } from '../components/Blocks.js'

export async function generateMetadata() {
  return buildStaticMetadata(config, { slug: 'contact', title: 'Contact Us', description: `Contact ${config.business.display_name} for home service in ${config.primary_service_area}.` }, { isPreview: true })
}

export default function ContactPage() {
  const c = config
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader config={c} />
        <GrovePageHero eyebrow="Get in touch" title={<>Say <em style={{ fontStyle: 'italic', color: T.colors.accent }}>hi</em>.</>} sub={c.positioning.emergency_service ? 'Same-day service. 24/7 emergency response.' : 'Same-day response. Free estimates.'} />

        <section style={{ background: T.colors.bg, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64 }}>
            {/* Left: Contact info */}
            <div>
              <div style={{ background: T.colors.accentGlow, padding: 40, borderRadius: T.radius.lg, border: `1px solid ${T.colors.border}`, marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Give us a call</div>
                <a href={`tel:${c.business.phone}`} style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 500, color: T.colors.accent, textDecoration: 'none', display: 'block', letterSpacing: -1 }}>
                  {c.business.phone_display}
                </a>
                <div style={{ fontSize: 15, color: T.colors.textDim, marginTop: 12 }}>{c.business.hours_display}</div>
              </div>
              <div style={{ background: T.colors.surface, padding: 28, borderRadius: T.radius.md, border: `1px solid ${T.colors.border}`, marginBottom: 12, boxShadow: T.shadow.soft }}>
                <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Email</div>
                <a href={`mailto:${c.business.email}`} style={{ fontFamily: T.fonts.display, fontSize: 22, color: T.colors.text, textDecoration: 'none', fontWeight: 500 }}>{c.business.email}</a>
              </div>
              <div style={{ background: T.colors.surface, padding: 28, borderRadius: T.radius.md, border: `1px solid ${T.colors.border}`, boxShadow: T.shadow.soft }}>
                <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Office</div>
                <div style={{ fontSize: 17, color: T.colors.text, lineHeight: 1.5 }}>{c.business.address_line}</div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 36, fontWeight: 500, letterSpacing: -1, margin: '0 0 32px 0', color: T.colors.text }}>Or drop us a note.</h2>
              <form style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 40, borderRadius: T.radius.md, boxShadow: T.shadow.soft }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Name</label>
                  <input required style={{ width: '100%', background: T.colors.bg, border: `1.5px solid ${T.colors.border}`, color: T.colors.text, padding: '14px 16px', fontSize: 16, fontFamily: T.fonts.body, borderRadius: T.radius.sm }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Phone</label>
                  <input required type="tel" style={{ width: '100%', background: T.colors.bg, border: `1.5px solid ${T.colors.border}`, color: T.colors.text, padding: '14px 16px', fontSize: 16, fontFamily: T.fonts.body, borderRadius: T.radius.sm }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Service needed</label>
                  <select style={{ width: '100%', background: T.colors.bg, border: `1.5px solid ${T.colors.border}`, color: T.colors.text, padding: '14px 16px', fontSize: 16, fontFamily: T.fonts.body, borderRadius: T.radius.sm }}>
                    <option value="">Select a service</option>
                    {c.services.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Message</label>
                  <textarea rows={4} style={{ width: '100%', background: T.colors.bg, border: `1.5px solid ${T.colors.border}`, color: T.colors.text, padding: '14px 16px', fontSize: 16, fontFamily: T.fonts.body, borderRadius: T.radius.sm, resize: 'vertical' }} />
                </div>
                <button type="submit" style={{ width: '100%', background: T.colors.accent, color: T.colors.bgLight, border: 'none', padding: '18px 24px', fontFamily: T.fonts.body, fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, cursor: 'pointer' }}>
                  Send your note →
                </button>
              </form>
            </div>
          </div>
        </section>

        <GroveFooter config={c} />
      </div>
    </>
  )
}
