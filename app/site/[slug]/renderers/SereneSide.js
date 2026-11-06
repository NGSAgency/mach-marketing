import { aroundTownFor } from './family/data.js'

// The left column of SERENE's two-column sections (heading left, text right).
//
// It used to hold the heading alone, so a long section left a tall empty strip
// down the left of the page (the balance check flags it). Now the column does
// a job and stays in view while the text beside it scrolls:
//   - the first section of a page: address, hours, phone, the towns served,
//     and the booking button
//   - Questions: a short "still deciding" prompt with the phone and booking
//   - a long section in between: a list of the page's sections, the current
//     one marked, so a reader can jump ahead
// Everything shown is the practice's own information; a line with no data
// behind it is left out. On a phone the columns stack and the sticky turns
// off (SereneResponsive).

const STICK_TOP = 112 // clears the sticky header

export const sideId = (label) => String(label || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// A section counts as long when its text runs past this many characters; a
// short one keeps the heading alone so the side never outgrows the text.
export const LONG_TEXT = 700

export function SideColumn({ T, label, level = 2, size = 'clamp(20px, 2.3vw, 28px)', children }) {
  const H = level === 2 ? 'h2' : 'div'
  return (
    <div style={{ position: 'sticky', top: STICK_TOP, alignSelf: 'start', display: 'grid', gap: 24 }}>
      <H style={{ fontFamily: T.fonts.display, fontSize: size, fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.01em', color: T.colors.text, margin: 0, paddingTop: 2 }}>
        {label}
      </H>
      {children}
    </div>
  )
}

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

export function SideFacts({ T, c, area, labels }) {
  const b = c.business || {}
  const rows = [
    b.address_line && { k: 'Address', v: addressLines(b.address_line).map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>) },
    b.hours_display && { k: 'Hours', v: String(b.hours_display).split(' · ').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>) },
    b.phone_display && { k: 'Phone', v: <a href={`tel:${b.phone}`} style={{ color: T.colors.text, textDecoration: 'none' }}>{b.phone_display}</a> },
    servingFor(c, area) && { k: 'Serving', v: servingFor(c, area) },
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

export function SideAsk({ T, c, labels }) {
  const b = c.business || {}
  const conversion = String(labels?.conversion || 'book a consultation').toLowerCase()
  return (
    <>
      <p style={{ margin: 0, fontSize: T.type.sm, lineHeight: 1.75, color: T.colors.textDim, maxWidth: '30ch' }}>
        Still deciding?{' '}
        {b.phone_display
          ? <>Call <a href={`tel:${b.phone}`} style={{ color: T.colors.text, textDecorationColor: T.colors.accent, textUnderlineOffset: 4 }}>{b.phone_display}</a> or {conversion} and ask in person.</>
          : <>Ask in person at a consultation.</>}
      </p>
      <BookButton T={T} c={c} label={labels?.conversion} />
    </>
  )
}

export function SideNav({ T, items, current }) {
  if (!items || items.length < 3) return null
  return (
    <nav aria-label="On this page">
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 2 }}>
        {items.map(it => {
          const on = it.id === current
          return (
            <li key={it.id}>
              <a href={`#${it.id}`} aria-current={on ? 'location' : undefined} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', textDecoration: 'none',
                fontSize: 13, letterSpacing: '0.02em', color: on ? T.colors.text : T.colors.textMuted,
              }}>
                <span aria-hidden="true" style={{ width: on ? 22 : 10, height: 1, background: on ? T.colors.accent : T.colors.border, flex: 'none' }} />
                {it.label}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
