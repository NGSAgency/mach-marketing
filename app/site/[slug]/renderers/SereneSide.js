import { aroundTownFor } from './family/data.js'
import SereneRailNav from './SereneRailNav.js'

// The side rail of SERENE's treatment, town and concern pages, and the
// pieces it is built from (see RailLayout below). Everything shown is the
// practice's own information; a line with no data behind it is left out.

// Clears the sticky header (121px on a laptop) with room to spare; at 112
// the top of the column slid under it
const STICK_TOP = 144

export const sideId = (label) => String(label || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

export function BookButton({ T, c, label }) {
  const href = c.business?.booking_url || (c.business?.phone ? `tel:${c.business.phone}` : null)
  if (!href) return null
  const text = String(label || c.profile?.nouns?.conversion || 'book a consultation')
  return (
    <a href={href} style={{
      justifySelf: 'start', display: 'inline-block', background: T.colors.accent, color: T.colors.onAccent,
      padding: '13px 28px', borderRadius: T.radius.full, textDecoration: 'none', fontSize: T.type.sm, letterSpacing: '0.04em',
    }}>
      {text.replace(/^\w/, ch => ch.toUpperCase())}
    </a>
  )
}

// "6302 NW Barry Road, Kansas City, MO 64154" as street, then the rest
const addressLines = (a) => {
  const t = String(a).trim(); const i = t.indexOf(',')
  return i > 0 ? [t.slice(0, i), t.slice(i + 1).trim()] : [t]
}

const servingFor = (c, area) => {
  const areas = (c.service_areas || []).map(a => String(a).trim()).filter(Boolean)
  const place = area || (areas.length === 1 ? areas[0] : null)
  const hoods = place ? aroundTownFor(c, place, 'clinic').neighborhoods : []
  const list = hoods.length ? hoods : areas
  if (!list.length) return null
  return list.slice(0, 6).join(', ') + (list.length > 6 ? ' and more' : '')
}

export function SideFacts({ T, c, area, labels, towns = true }) {
  const b = c.business || {}
  const rows = [
    b.address_line && { k: 'Address', v: addressLines(b.address_line).map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>) },
    b.hours_display && { k: 'Hours', v: String(b.hours_display).split(' · ').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>) },
    b.phone_display && { k: 'Phone', v: <a href={`tel:${b.phone}`} style={{ color: T.colors.text, textDecoration: 'none' }}>{b.phone_display}</a> },
    towns && servingFor(c, area) && { k: 'Serving', v: servingFor(c, area) },
  ].filter(Boolean)
  return (
    <>
      {rows.length > 0 && (
        <dl style={{ margin: 0, display: 'grid', gap: 16 }}>
          {rows.map(r => (
            <div key={r.k}>
              <dt style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.colors.accent, marginBottom: 4 }}>{r.k}</dt>
              <dd style={{ margin: 0, fontSize: T.type.sm, lineHeight: 1.55, color: T.colors.text }}>{r.v}</dd>
            </div>
          ))}
        </dl>
      )}
      <BookButton T={T} c={c} label={labels?.conversion} />
    </>
  )
}

// One side rail for the run of text sections on a page.
//
// Each section used to carry its own sticky column, so the side content
// handed over at every section boundary: the old column slid up under the
// header before the next arrived, and short sections (What it costs,
// Questions) had no list at all. Now one rail runs the length of the
// sections and stays put: the list of sections with the current one
// marked, then the practice's details and the booking button. Each
// section's heading sits at the top of its text. On a phone the rail is
// hidden and the sections read straight through.
export function RailLayout({ T, c, labels, area, sections }) {
  const shown = sections.filter(s => s && s.body)
  if (!shown.length) return null
  const items = shown.map(s => ({ id: sideId(s.label), label: s.label }))
  return (
    <div style={{ padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 96px) clamp(56px, 8vw, 104px)' }}>
      <div className="sr-rail" style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 8fr)', gap: 'clamp(24px, 5vw, 80px)', alignItems: 'start' }}>
        <aside className="sr-rail-side" style={{ position: 'sticky', top: STICK_TOP, display: 'grid', gap: 28, maxHeight: `calc(100vh - ${STICK_TOP + 24}px)`, overflowY: 'auto' }}>
          <SereneRailNav items={items} colors={{ text: T.colors.text, textMuted: T.colors.textMuted, accent: T.colors.accent, border: T.colors.border }} />
          <div style={{ display: 'grid', gap: 22, paddingTop: 24, borderTop: `1px solid ${T.colors.borderLight}` }}>
            {/* Towns are left to the sections and footer, which keeps the rail
                short enough to stay with the last section to its end */}
            <SideFacts T={T} c={c} area={area} labels={labels} towns={false} />
          </div>
        </aside>
        <div>
          {shown.map((s, i) => (
            <section key={s.label} id={sideId(s.label)} style={{
              scrollMarginTop: STICK_TOP,
              paddingBlock: i === 0 ? '0 clamp(36px, 5vw, 56px)' : 'clamp(36px, 5vw, 56px)',
              borderTop: i === 0 ? 'none' : `1px solid ${T.colors.borderLight}`,
            }}>
              <h2 style={{ fontFamily: T.fonts.display, fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em', color: T.colors.text, margin: '0 0 22px' }}>
                {s.label}
              </h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 860px) { .sr-rail { grid-template-columns: minmax(0, 1fr) !important; } .sr-rail-side { display: none !important; } }
      ` }} />
    </div>
  )
}

// The usual body of a text section: paragraphs split on blank lines
export function Paras({ T, text, max = 680 }) {
  return (
    <div style={{ maxWidth: max, fontSize: T.type.base, lineHeight: 1.85, color: T.colors.textDim }}>
      {String(text).split('\n\n').map((p, i) => <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>)}
    </div>
  )
}

// Questions and answers, as the sections show them
export function QAList({ T, faqs }) {
  return (
    <div style={{ maxWidth: 720 }}>
      {faqs.map((f, i) => (
        <div key={i} style={{ padding: '22px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.colors.borderLight}` }}>
          <h3 style={{ fontSize: T.type.lg, fontWeight: 400, lineHeight: 1.4, margin: '0 0 10px', color: T.colors.text }}>{f.question}</h3>
          <p style={{ fontSize: T.type.base, lineHeight: 1.8, color: T.colors.textDim, margin: 0 }}>{f.answer}</p>
        </div>
      ))}
    </div>
  )
}
