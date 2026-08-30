// =========================================================
// MEDICAL AESTHETICS COMPONENTS
//
// Research on this vertical is consistent about what a med spa site needs and
// what a generic service template does not provide:
//
//   - A filterable before/after gallery, the single strongest conversion
//     element, converting at 2-3x sites without one
//   - Provider credentials, which are what separate a medical practice from a
//     salon in a prospect's mind
//   - Concern-based navigation, because people search by problem ("acne
//     scarring") before they know the treatment ("microneedling")
//   - Booking reachable at all times, since most traffic is mobile
//
// The design tension every source names: too clinical repels the client who
// wants to feel pampered, too luxury loses the one who needs to trust you with
// their face. These components carry credibility without sterility.
//
// Family-agnostic: everything takes tokens, so any visual family can use them.
// =========================================================

/**
 * Credibility strip directly under the hero. Trust signals belong above the
 * fold, and this is where the medical half of "medical luxury" gets stated.
 * Only renders what the practice actually confirmed.
 */
export function TrustBar({ T, c }) {
  const items = []

  if (c.reviews?.google_rating && c.reviews?.google_count) {
    items.push({ big: `${c.reviews.google_rating}★`, small: `${c.reviews.google_count} Google reviews` })
  }
  if (c.business?.years_in_business) {
    items.push({ big: `${c.business.years_in_business}`, small: 'years in practice' })
  }
  if (c.medical?.medical_director) {
    items.push({ big: 'Medical', small: 'director on staff' })
  }
  if ((c.providers || []).length > 0) {
    items.push({ big: `${c.providers.length}`, small: c.providers.length === 1 ? 'licensed provider' : 'licensed providers' })
  }
  if ((c.services || []).length > 0) {
    items.push({ big: `${c.services.length}`, small: 'treatments offered' })
  }

  if (items.length < 2) return null

  return (
    <section style={{ background: T.colors.surface, borderTop: `1px solid ${T.colors.borderLight}`, borderBottom: `1px solid ${T.colors.borderLight}` }}>
      <div style={{
        maxWidth: 'min(1100px, 100%)',
        margin: '0 auto',
        padding: 'clamp(24px, 4vw, 40px) 32px',
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(min(140px, 100%), 1fr))`,
        gap: 24,
        textAlign: 'center',
      }}>
        {items.slice(0, 4).map((it, i) => (
          <div key={i}>
            <div style={{ fontFamily: T.fonts.display, fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 400, color: T.colors.accent, lineHeight: 1 }}>
              {it.big}
            </div>
            <div style={{ fontSize: 13, color: T.colors.textDim, marginTop: 8, letterSpacing: 0.3 }}>
              {it.small}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Concern-based entry points.
 *
 * Organizing around the problem rather than the treatment lets a visitor
 * self-identify before they know what to buy, and it captures a whole class of
 * searches that treatment pages miss entirely.
 */
export function ConcernsGrid({ T, c, base, concerns = [] }) {
  if (concerns.length === 0) return null

  return (
    <section style={{ background: T.colors.bg, padding: 'clamp(56px, 8vw, 104px) 32px' }}>
      <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
        <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 400, margin: '0 0 12px', color: T.colors.text }}>
          What would you like to address?
        </h2>
        <p style={{ fontSize: 16, color: T.colors.textDim, margin: '0 0 40px', maxWidth: 560, lineHeight: 1.7 }}>
          Start with the concern. We will talk through the options at your consultation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 14 }}>
          {concerns.map(concern => (
            <a
              key={concern.slug}
              href={`${base}/concerns/${concern.slug}`}
              style={{
                display: 'block',
                background: T.colors.surface,
                border: `1px solid ${T.colors.borderLight}`,
                borderRadius: T.radius.md,
                padding: '20px 22px',
                textDecoration: 'none',
                color: T.colors.text,
                fontSize: 16,
              }}
            >
              {concern.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Before and after gallery.
 *
 * The strongest conversion element in this vertical, but only with real
 * results: prospects recognize stock imagery and it destroys credibility.
 * When a practice has no consented photos this renders an honest placeholder
 * rather than filling the space with something false.
 */
export function BeforeAfterGallery({ T, c, cases = [] }) {
  // With no consented photos, a bare paragraph reads as unfinished. Framed
  // panels with numbered structure read as a specification of what gets built.
  if (cases.length === 0) return null

  return (
    <section style={{ background: T.colors.bgAlt, padding: 'clamp(72px, 10vw, 144px) clamp(24px, 5vw, 96px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 300, margin: '0 0 56px', color: T.colors.text, letterSpacing: '-0.015em' }}>
          Results
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 24 }}>
          {cases.map((item, i) => (
            <figure key={i} style={{ margin: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <img src={item.before} alt="Before treatment" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
                <img src={item.after} alt="After treatment" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
              </div>
              <figcaption style={{ fontSize: T.type.xs, color: T.colors.textMuted, marginTop: 12, letterSpacing: '0.04em' }}>
                {item.treatment}{item.detail ? ` · ${item.detail}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
        <p style={{ fontSize: T.type.xs, color: T.colors.textMuted, marginTop: 32 }}>
          Individual results vary. Photos shown with client consent.
        </p>
      </div>
    </section>
  )
}

/**
 * What gets built once the practice supplies their own material.
 *
 * Replaces separate empty before/after and provider sections, which rendered as
 * bare paragraphs in a row and read as unfinished. Presented as a numbered
 * specification, the same information reads as a plan.
 */
export function PlannedSections({ T, c, items = [] }) {
  if (items.length === 0) return null

  return (
    <section style={{ background: T.colors.bgAlt, padding: 'clamp(72px, 10vw, 144px) clamp(24px, 5vw, 96px)', borderTop: `1px solid ${T.colors.borderLight}` }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 8fr)', gap: 'clamp(32px, 6vw, 96px)', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 96 }}>
            <div style={{ fontSize: T.type.xs, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 24 }}>
              Also included
            </div>
            <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(28px, 3.6vw, 46px)', fontWeight: 300, lineHeight: 1.15, margin: 0, color: T.colors.text, letterSpacing: '-0.015em' }}>
              Built from your own material
            </h2>
          </div>

          <div>
            {items.map((item, i) => (
              <div
                key={item.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: 24,
                  padding: '32px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${T.colors.borderLight}`,
                }}
              >
                <div style={{ fontFamily: T.fonts.display, fontSize: 28, fontWeight: 300, color: T.colors.accent, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div style={{ fontFamily: T.fonts.display, fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 300, color: T.colors.text, marginBottom: 10 }}>
                    {item.title}
                  </div>
                  <p style={{ fontSize: T.type.sm, lineHeight: 1.75, color: T.colors.textDim, margin: 0, maxWidth: 620 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Provider cards.
 *
 * Who performs a treatment matters more to this buyer than which device is
 * used, and named credentials are what distinguish a medical practice from a
 * salon. Nothing is asserted that the practice did not supply.
 */
export function Providers({ T, c, providers = [], base }) {
  // Empty state is handled by PlannedSections so the page does not stack
  // several bare paragraphs in a row.
  if (providers.length === 0) return null
  if (false) {
    return (
      <section style={{ background: T.colors.bg, padding: 'clamp(56px, 8vw, 104px) 32px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 400, margin: '0 0 16px', color: T.colors.text }}>
            Meet your providers
          </h2>
          <p style={{ fontSize: 16, color: T.colors.textDim, lineHeight: 1.7, margin: 0 }}>
            Provider profiles with credentials and photos go here, each with its own page.
            For this buyer, who performs the treatment carries more weight than the device.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section style={{ background: T.colors.bg, padding: 'clamp(56px, 8vw, 104px) 32px' }}>
      <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
        <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 400, margin: '0 0 40px', color: T.colors.text }}>
          Your providers
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: 32 }}>
          {providers.map(pr => (
            <div key={pr.slug || pr.name}>
              {pr.photo_url && (
                <img
                  src={pr.photo_url}
                  alt={pr.name}
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: T.radius.md, display: 'block', marginBottom: 18 }}
                />
              )}
              <div style={{ fontFamily: T.fonts.display, fontSize: 22, fontWeight: 400, color: T.colors.text }}>{pr.name}</div>
              {pr.title && <div style={{ fontSize: 14, color: T.colors.accent, marginTop: 4 }}>{pr.title}</div>}
              {Array.isArray(pr.credentials) && pr.credentials.length > 0 && (
                <div style={{ fontSize: 13, color: T.colors.textMuted, marginTop: 8 }}>{pr.credentials.join(' · ')}</div>
              )}
              {pr.bio && <p style={{ fontSize: 15, color: T.colors.textDim, lineHeight: 1.7, marginTop: 14 }}>{pr.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Booking bar fixed to the bottom on mobile.
 *
 * Over three quarters of traffic in this vertical is mobile, and the booking
 * action needs to stay reachable rather than requiring a scroll back to the
 * header.
 */
export function StickyBooking({ T, c }) {
  const label = c.profile?.nouns?.conversion || 'book a consultation'
  const href = c.business?.booking_url || (c.business?.phone ? `tel:${c.business.phone}` : null)
  if (!href) return null

  return (
    <>
      <div
        className="mach-sticky-book"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: T.colors.surface,
          borderTop: `1px solid ${T.colors.border}`,
          padding: '12px 16px',
          display: 'none',
        }}
      >
        <a
          href={href}
          style={{
            display: 'block',
            background: T.colors.secondary,
            color: T.colors.bgLight,
            padding: '15px',
            borderRadius: T.radius.full,
            textAlign: 'center',
            textDecoration: 'none',
            fontSize: 16,
            letterSpacing: 0.3,
          }}
        >
          {label.replace(/\b\w/g, ch => ch.toUpperCase())}
        </a>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .mach-sticky-book { display: block !important; }
          body { padding-bottom: 76px; }
        }
      ` }} />
    </>
  )
}

/**
 * Review quotes. Social proof belongs above the fold for this buyer, and real
 * named reviews outperform aggregate ratings alone.
 */
export function Reviews({ T, c, reviews = [] }) {
  const list = reviews.length > 0 ? reviews : (c.reviews?.featured || [])
  if (list.length === 0) return null

  return (
    <section style={{ background: T.colors.surface, padding: 'clamp(56px, 8vw, 104px) 32px' }}>
      <div style={{ maxWidth: 'min(1100px, 100%)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 32 }}>
          {list.slice(0, 3).map((r, i) => (
            <blockquote key={i} style={{ margin: 0 }}>
              <div style={{ color: T.colors.accent, fontSize: 15, letterSpacing: 2, marginBottom: 14 }}>★★★★★</div>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: T.colors.textDim, margin: '0 0 14px' }}>
                {typeof r === 'string' ? r : r.text}
              </p>
              {typeof r !== 'string' && r.author && (
                <cite style={{ fontSize: 14, color: T.colors.textMuted, fontStyle: 'normal' }}>{r.author}</cite>
              )}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
