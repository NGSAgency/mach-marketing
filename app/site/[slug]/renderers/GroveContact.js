import { groveTokens } from '../../../templates/grove/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { GroveHeader, GroveFooter } from './GroveServices.js'

export default function GroveContact({ config: c, siteSlug }) {
  const brand = { accent: c.brand?.primary_accent, logo: c.brand?.logo_url }
  const T = applyBrand(groveTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <GroveHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 72px', textAlign: 'center' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, padding: '6px 14px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Get in touch</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.05 }}>
              Say <em style={{ fontStyle: 'italic', color: T.colors.accent }}>hi</em>.
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '48px 32px 120px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64 }}>
            <div>
              <div style={{ background: T.colors.accentGlow, padding: 40, borderRadius: T.radius.lg, border: `1px solid ${T.colors.border}`, marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Give us a call</div>
                <a href={`tel:${c.business.phone}`} style={{ fontFamily: T.fonts.display, fontSize: 48, fontWeight: 500, color: T.colors.accent, textDecoration: 'none', display: 'block', letterSpacing: -1 }}>{c.business.phone_display}</a>
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
            <div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 36, fontWeight: 500, letterSpacing: -1, marginBottom: 32 }}>Or drop us a note.</h2>
              <form style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 40, borderRadius: T.radius.md, boxShadow: T.shadow.soft }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Name</label>
                  <input required style={{ width: '100%', background: T.colors.bg, border: `1.5px solid ${T.colors.border}`, padding: '14px 16px', fontSize: 16, borderRadius: T.radius.sm }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Phone</label>
                  <input required type="tel" style={{ width: '100%', background: T.colors.bg, border: `1.5px solid ${T.colors.border}`, padding: '14px 16px', fontSize: 16, borderRadius: T.radius.sm }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Message</label>
                  <textarea rows={4} style={{ width: '100%', background: T.colors.bg, border: `1.5px solid ${T.colors.border}`, padding: '14px 16px', fontSize: 16, borderRadius: T.radius.sm, resize: 'vertical' }} />
                </div>
                <button type="submit" style={{ width: '100%', background: T.colors.accent, color: T.colors.bgLight, border: 'none', padding: '18px 24px', fontSize: 17, fontWeight: 600, borderRadius: T.radius.full, cursor: 'pointer' }}>Send your note →</button>
              </form>
            </div>
          </div>
        </section>

        <GroveFooter T={T} c={c} />
      </div>
    </>
  )
}
