import { axisTokens } from '../../../templates/axis/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { AxisHeader, AxisFooter } from './AxisServices.js'
import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'

export default function AxisContact({ config: c, siteSlug }) {
  const brand = brandFrom(c)
  const T = applyBrand(axisTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <AxisHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bg, padding: '96px 32px 64px', textAlign: 'center', borderBottom: `1px solid ${T.colors.borderLight}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'inline-block', fontSize: 13, color: T.colors.accent, fontWeight: 600, marginBottom: 20, padding: '6px 16px', background: T.colors.accentGlow, borderRadius: T.radius.full }}>Contact</div>
            <h1 style={{ fontSize: "clamp(28px, 6.5vw, 72px)", fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.05, margin: 0 }}>
              Get <span style={{ color: T.colors.accent }}>started</span>.
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 32px 120px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64 }}>
            <div>
              <div style={{ background: T.colors.inverseBg, color: T.colors.inverseText, padding: 40, borderRadius: T.radius.lg, marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: T.colors.inverseTextDim, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600, marginBottom: 12 }}>Direct line</div>
                <a href={`tel:${c.business.phone}`} style={{ fontSize: 48, fontWeight: 800, color: T.colors.inverseText, textDecoration: 'none', display: 'block', letterSpacing: -1.5 }}>{c.business.phone_display}</a>
                <div style={{ fontSize: 15, color: T.colors.inverseTextDim, marginTop: 12 }}>{c.business.hours_display}</div>
              </div>
              <div style={{ background: T.colors.surface, padding: 28, borderRadius: T.radius.lg, marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Email</div>
                <a href={`mailto:${c.business.email}`} style={{ fontSize: 20, color: T.colors.text, textDecoration: 'none', fontWeight: 600 }}>{c.business.email}</a>
              </div>
              <div style={{ background: T.colors.surface, padding: 28, borderRadius: T.radius.lg }}>
                <div style={{ fontSize: 12, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Office</div>
                <div style={{ fontSize: 17, color: T.colors.text, lineHeight: 1.5 }}>{c.business.address_line}</div>
              </div>
            </div>
            <div>
              <div style={{ background: T.colors.surface, padding: 40, borderRadius: T.radius.lg }}>
                <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, margin: '0 0 24px 0' }}>Request a quote.</h2>
                <ContactForm
                  slug={siteSlug}
                  concept={c.concept === true}
                  colors={{ text: T.colors.text, textDim: T.colors.textDim, textMuted: T.colors.textMuted, border: T.colors.border, field: T.colors.bg, fieldText: T.colors.text, accent: T.colors.accent, onAccent: T.colors.onAccent, success: T.colors.success, urgent: T.colors.urgent }}
                  fonts={T.fonts}
                  radius={T.radius.md}
                  submitLabel="Request quote →"
                />
              </div>
            </div>
          </div>
        </section>

        <AxisFooter T={T} c={c} />
      </div>
    </>
  )
}
