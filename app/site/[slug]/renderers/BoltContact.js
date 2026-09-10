import { boltTokens } from '../../../templates/bolt/tokens.js'
import { applyBrand, brandFrom } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { buildBreadcrumbSchema, JsonLd } from '../../../../lib/templates/shared/seo/index.js'
import { BoltHeader, BoltFooter } from './BoltServices.js'
import ContactForm from '../../../../lib/templates/shared/components/ContactForm.js'

export default function BoltContact({ config: c, siteSlug }) {
  const brand = brandFrom(c)
  const T = applyBrand(boltTokens, brand)
  const logo = c.brand?.logo_url
  const base = `/site/${siteSlug}`
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(c, crumbs)} />
        <TrackingScripts tracking={c.tracking} />
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <BoltHeader T={T} c={c} logo={logo} base={base} />

        <section style={{ background: T.colors.bgAlt, padding: '80px 24px', borderBottom: `4px solid ${T.colors.accent}` }}>
          <div style={{ maxWidth: 'min(1280px, 100%)', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: T.fonts.display, fontSize: 12, color: T.colors.accent, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Contact</div>
            <h1 style={{ fontFamily: T.fonts.display, fontSize: 64, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase', margin: 0 }}>
              Get in <span style={{ color: T.colors.accent }}>touch</span>
            </h1>
          </div>
        </section>

        <section style={{ background: T.colors.bg, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>Reach us</h2>
              <div style={{ background: T.colors.surface, borderLeft: `4px solid ${T.colors.accent}`, padding: 32, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>Call now</div>
                <a href={`tel:${c.business.phone}`} style={{ fontFamily: T.fonts.display, fontSize: 42, fontWeight: 800, color: T.colors.accent, textDecoration: 'none', display: 'block' }}>{c.business.phone_display}</a>
                <div style={{ fontSize: 14, color: T.colors.textDim, marginTop: 8 }}>{c.business.hours_display}</div>
              </div>
              <div style={{ background: T.colors.surface, padding: 24, marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 6 }}>Email</div>
                <a href={`mailto:${c.business.email}`} style={{ fontSize: 17, color: T.colors.text, textDecoration: 'none', fontWeight: 600 }}>{c.business.email}</a>
              </div>
              <div style={{ background: T.colors.surface, padding: 24 }}>
                <div style={{ fontSize: 11, color: T.colors.textMuted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 6 }}>Office</div>
                <div style={{ fontSize: 15, color: T.colors.text }}>{c.business.address_line}</div>
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>Request service</h2>
              <div style={{ background: T.colors.surface, border: `1px solid ${T.colors.border}`, padding: 32 }}>
                <ContactForm
                  slug={siteSlug}
                  concept={c.concept === true}
                  colors={{ text: T.colors.text, textDim: T.colors.textDim, textMuted: T.colors.textMuted, border: T.colors.border, field: T.colors.bg, fieldText: T.colors.text, accent: T.colors.accent, onAccent: T.colors.onAccent, success: T.colors.success, urgent: T.colors.urgent }}
                  fonts={T.fonts}
                  radius={0}
                  submitLabel="Send"
                />
              </div>
            </div>
          </div>
        </section>

        <BoltFooter T={T} c={c} />
      </div>
    </>
  )
}
