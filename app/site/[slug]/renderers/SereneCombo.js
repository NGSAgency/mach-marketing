import { sereneTokens } from '../../../templates/serene/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildMedicalProcedureSchema,
  breadcrumbsForCombo,
  JsonLd,
} from '../../../../lib/templates/shared/seo/index.js'
import { SereneHeader, SereneCTA, SereneFooter, navLabels } from './SereneServices.js'

/**
 * Service + area page. This is the highest-intent page type we generate and the
 * one most competitors in this vertical do not build at all: they publish a
 * treatment page and stop, leaving every "treatment in city" query uncontested.
 */
export default function SereneCombo({ config: c, siteSlug, service, area }) {
  const T = applyBrand(sereneTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const base = `/site/${siteSlug}`
  const labels = navLabels(c)
  const gen = c.generated || {}
  const hero = (c.images || {}).combo_hero || (c.images || {})[`service_${service.slug}`]

  const faqs = Array.isArray(gen['combo|faq']) ? gen['combo|faq'] : []

  const schemas = [
    buildBreadcrumbSchema(c, breadcrumbsForCombo(service, area, c)),
    buildMedicalProcedureSchema(c, service),
    faqs.length > 0 ? buildFAQSchema(faqs) : null,
  ].filter(Boolean)

  return (
    <>
      {schemas.map((s, i) => <JsonLd key={i} data={s} />)}
      <TrackingScripts tracking={c.tracking} />

      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <SereneHeader T={T} c={c} logo={c.brand?.logo_url} base={base} />

        {hero && (
          <section style={{ position: 'relative', height: 'clamp(360px, 48vh, 520px)', overflow: 'hidden' }}>
            <img
              src={hero.url}
              alt={hero.alt || `${service.name} in ${area}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(43,39,36,0.1) 0%, rgba(43,39,36,0.6) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 'clamp(28px, 5vw, 64px)' }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', marginBottom: 14 }}>{area}</div>
                <h1 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(32px, 6vw, 58px)', fontWeight: 400, letterSpacing: 0.5, lineHeight: 1.1, margin: 0, color: '#fff' }}>
                  {service.name} in {area}
                </h1>
              </div>
            </div>
          </section>
        )}

        <section style={{ padding: hero ? 'clamp(40px, 6vw, 72px) 32px clamp(32px, 5vw, 56px)' : 'clamp(64px, 10vw, 130px) 32px clamp(40px, 6vw, 72px)' }}>
          <div style={{ maxWidth: 'min(860px, 100%)', margin: '0 auto' }}>
            {!hero && (
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: T.colors.accentDim, marginBottom: 20 }}>
                {area}
              </div>
            )}
            {!hero && (
              <h1 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(36px, 6.5vw, 62px)', fontWeight: 400, letterSpacing: 0.5, lineHeight: 1.12, margin: 0, color: T.colors.text }}>
                {service.name} in {area}
              </h1>
            )}
            {gen['combo|hero_subheadline'] && (
              <p style={{ fontSize: 'clamp(17px, 2.2vw, 20px)', color: T.colors.textDim, marginTop: 22, lineHeight: 1.7, maxWidth: 640 }}>
                {gen['combo|hero_subheadline']}
              </p>
            )}
            {c.business.phone_display && (
              <a
                href={`tel:${c.business.phone}`}
                style={{
                  display: 'inline-block',
                  marginTop: 32,
                  background: T.colors.secondary,
                  color: T.colors.bgLight,
                  padding: '15px 38px',
                  borderRadius: T.radius.full,
                  textDecoration: 'none',
                  fontSize: 15,
                  letterSpacing: 0.4,
                }}
              >
                {c.business.phone_display}
              </a>
            )}
          </div>
        </section>

        {gen['combo|intro'] && (
          <section style={{ padding: '0 32px clamp(48px, 7vw, 88px)' }}>
            <div style={{ maxWidth: 720, margin: '0 auto', fontSize: 17, lineHeight: 1.85, color: T.colors.textDim }}>
              {gen['combo|intro'].split('\n\n').map((p, i) => (
                <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {gen['combo|local_considerations'] && (
          <section style={{ background: T.colors.bgAlt, padding: 'clamp(56px, 8vw, 100px) 32px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 400, margin: '0 0 24px', color: T.colors.text }}>
                {service.name} in {area}
              </h2>
              <div style={{ fontSize: 17, lineHeight: 1.85, color: T.colors.textDim }}>
                {gen['combo|local_considerations'].split('\n\n').map((p, i) => (
                  <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section style={{ padding: 'clamp(56px, 8vw, 100px) 32px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 400, margin: '0 0 32px', color: T.colors.text }}>
                Common questions
              </h2>
              {faqs.map((f, i) => (
                <div key={i} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: i < faqs.length - 1 ? `1px solid ${T.colors.borderLight}` : 'none' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 10px', color: T.colors.text }}>{f.question}</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.8, color: T.colors.textDim, margin: 0 }}>{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(c.service_areas || []).length > 1 && (
          <section style={{ padding: '0 32px clamp(56px, 8vw, 100px)' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: T.colors.textMuted, marginBottom: 14 }}>
                Also serving
              </div>
              <div style={{ fontSize: 15, lineHeight: 2, color: T.colors.textDim }}>
                {c.service_areas.filter(a => a !== area).join(' · ')}
              </div>
            </div>
          </section>
        )}

        <SereneCTA T={T} c={c} headline={`${service.name} in ${area}`} />
        <SereneFooter T={T} c={c} />
      </div>
    </>
  )
}
