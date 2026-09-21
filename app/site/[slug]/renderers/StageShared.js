import { proofItems, pricingModel, oneLine, paragraphs } from './family/data.js'
import { Board } from './StageKit.js'

// Pieces every STAGE page uses: the photographs the panel can show, the rows
// its board can hold, and the shapes the left column repeats.

/** Up to three photographs for the panel, best first. A client with none gets
 *  an empty list and the panel shows a plate of their colour instead. */
export function shotsFor(x, extra = []) {
  const i = x.imgs || {}
  const first = [...extra, i.home_hero, i.home_secondary, i.about_hero, i.combo_hero]
  const services = (x.services || []).map(s => i[`service_${s.slug}`])
  const areas = Object.keys(i).filter(k => k.startsWith('area_')).map(k => i[k])
  const seen = new Set()
  return [...first, ...services, ...areas]
    .filter(s => s && s.url && !seen.has(s.url) && seen.add(s.url))
    .slice(0, 3)
}

/** The plate shown in place of a photograph. */
export const plateFor = (x, over) => ({
  kicker: over?.kicker || x.tradeNoun,
  title: over?.title || x.name,
  line: over?.line || [x.primaryArea && `Serving ${x.primaryArea}`, x.since].filter(Boolean).join(' · ') || null,
})

/** Facts for a panel board, each only when the field exists. */
export const facts = {
  credentials: (x) => x.credential && { k: 'License', v: x.license ? `${x.license}${x.credential === 'Licensed & insured' ? ', fully insured' : ''}` : x.credential },
  emergency: (x) => x.emergency && { k: 'Emergencies', v: x.emergency },
  basedAt: (x) => x.biz.address_line && { k: 'Based at', v: x.biz.address_line },
  hours: (x) => x.biz.hours_display && { k: 'Hours', v: x.biz.hours_display },
  phone: (x) => x.phoneDisplay && { k: 'Phone', v: x.phoneDisplay },
  email: (x) => x.biz.email && { k: 'Email', v: x.biz.email },
  estimates: (x) => x.pos.free_estimates && { k: 'Estimates', v: 'Free' },
  warranty: (x) => {
    const w = (x.pos.warranties || [])[0]
    const t = typeof w === 'string' ? w : w?.name || w?.description
    return t && { k: 'Guarantee', v: t }
  },
  since: (x) => x.since && { k: 'In business', v: x.since },
  rating: (x) => {
    const r = proofItems(x).find(p => p.kind === 'rating')
    return r && { k: 'Rating', v: `${r.value} from ${r.label}` }
  },
  areas: (x) => x.areas.length > 0 && { k: 'Areas', v: `${x.areas.length} ${x.areas.length === 1 ? 'community' : 'communities'}` },
  services: (x) => x.services.length > 0 && { k: x.offeringLabel, v: `${x.services.length}, each with its own page` },
}

export const boardOf = (x, rows) => {
  const list = rows.filter(Boolean)
  return list.length ? <Board x={x} rows={list} /> : null
}

/** The prices, as a board. */
export function priceRows(x) {
  const p = pricingModel(x.c)
  return p.rows.map(r => ({ k: r.k, v: r.v }))
}

/** Figures for the foot of an opening screen: short values only. */
export function figuresFor(x, extra = []) {
  return [
    ...proofItems(x).filter(p => p.kind === 'rating' || p.kind === 'since').map(p => ({ v: p.value, k: p.label })),
    ...extra,
  ].filter(Boolean).slice(0, 4)
}

export function Figures({ x, items }) {
  const { C, F } = x
  if (!items?.length) return null
  return (
    <div className="stg-figs" style={{ ['--n']: items.length }}>
      {items.map((f, i) => (
        <div key={i}>
          <b style={{ display: 'block', fontFamily: F.display, fontWeight: 800, letterSpacing: '-0.035em', fontSize: 'clamp(24px, 2.4vw, 34px)', lineHeight: 1.05 }}>{f.v}</b>
          <span style={{ display: 'block', marginTop: 7, ...x.label(C.textMuted), fontSize: 13 }}>{f.k}</span>
        </div>
      ))}
    </div>
  )
}

/** Two ruled rows under the opening: where and when. */
export function CoverageRows({ x, rows }) {
  const { C } = x
  const list = rows.filter(r => r && r.v)
  if (!list.length) return null
  return (
    <dl style={{ margin: '0 0 clamp(18px, 2.6vh, 28px)', borderTop: `1px solid ${C.border}` }}>
      {list.map(r => (
        <div key={r.k} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 150px) minmax(0, 1fr)', gap: 'clamp(14px, 2vw, 28px)',
                                padding: '11px 0', borderBottom: `1px solid ${C.border}`, alignItems: 'baseline' }}>
          <dt style={{ ...x.label(C.textMuted), fontSize: 12.5 }}>{r.k}</dt>
          <dd style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: C.text }}>{r.v}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Prose at the family's measure; two columns once it runs long. */
export function Prose({ x, text, columns = null }) {
  const list = paragraphs(text)
  if (!list.length) return null
  const cols = columns == null ? list.length > 2 : columns
  return (
    <div className={cols ? 'stg-cols' : undefined} style={{ ...x.body, maxWidth: cols ? 'none' : '64ch' }}>
      {list.map((p, i) => <p key={i} style={cols ? undefined : { margin: i === list.length - 1 ? 0 : '0 0 18px' }}>{p}</p>)}
    </div>
  )
}

/** A service, as a card with its photograph where one exists. */
export function ServiceCards({ x, items }) {
  const { C, F, T } = x
  if (!items.length) return null
  return (
    <div className="stg-two">
      {items.map(s => (
        <a key={s.href} href={s.href} style={{ display: 'flex', flexDirection: 'column', background: C.surface, border: `1px solid ${C.border}`, textDecoration: 'none', color: 'inherit' }}>
          {s.image?.url
            ? <span style={{ display: 'block', height: 'clamp(110px, 11vw, 148px)', overflow: 'hidden', background: C.inverseBg }}>
                <img src={s.image.url} alt={s.image.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </span>
            : <span style={{ display: 'block', height: 8, background: C.accent }} />}
          <span style={{ padding: 'clamp(15px, 1.5vw, 20px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <b style={{ fontFamily: F.display, fontWeight: 700, letterSpacing: '-0.025em', fontSize: 19, lineHeight: 1.15, color: C.text }}>{s.name}</b>
            {s.line && <span style={{ margin: '7px 0 0', color: C.textDim, fontSize: 15.5, lineHeight: 1.55 }}>{s.line}</span>}
            <span style={{ marginTop: 'auto', paddingTop: 14, color: C.accentDim, fontWeight: 700, fontSize: 14.5 }}>Details →</span>
          </span>
        </a>
      ))}
    </div>
  )
}

/** Services grouped by category when there are enough of them to need it. */
export function ServiceGroups({ x, hrefFor, nameFor }) {
  const { C, services, offeringLabel, imgs } = x
  const categories = [...new Set(services.map(s => s.category).filter(Boolean))]
  const grouped = services.length > 4 && categories.length > 1
  const card = (s) => ({
    href: hrefFor(s),
    name: nameFor ? nameFor(s) : s.name,
    line: oneLine(s.short),
    image: imgs[`service_${s.slug}`] || null,
  })
  // Past eight services the home page shows the head of each group and the
  // index carries the rest, so this chapter never runs past three rows.
  const cap = services.length > 8 ? 4 : 99
  if (!grouped) return <ServiceCards x={x} items={services.slice(0, 8).map(card)} />
  return (
    <>
      {categories.map(cat => {
        const inCat = services.filter(s => s.category === cat)
        return (
          <div key={cat} style={{ marginTop: 'clamp(26px, 3vh, 38px)' }}>
            <h3 style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '0 0 16px', paddingBottom: 10, borderBottom: `2px solid ${C.text}`,
                         ...x.label(C.text), fontSize: 13 }}>
              {cat}
              <em style={{ fontStyle: 'normal', color: C.textMuted, fontWeight: 600, letterSpacing: '0.08em' }}>
                {inCat.length} {inCat.length === 1 ? (offeringLabel.replace(/s$/, '') || 'service') : offeringLabel.toLowerCase()}
              </em>
            </h3>
            <ServiceCards x={x} items={inCat.slice(0, cap).map(card)} />
          </div>
        )
      })}
    </>
  )
}

/** Questions as ruled rows that open. */
export function Questions({ x, items }) {
  const { C, F } = x
  if (!items?.length) return null
  return (
    <div>
      {items.map((q, i) => (
        <details key={i} open={i === 0} style={{ borderTop: `1px solid ${C.border}`, borderBottom: i === items.length - 1 ? `1px solid ${C.border}` : undefined }}>
          <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 18, padding: '15px 0',
                            fontFamily: F.display, fontWeight: 700, letterSpacing: '-0.015em', fontSize: 17.5 }}>
            {q.question}
            <span aria-hidden="true" style={{ color: C.accent, fontWeight: 800 }}>+</span>
          </summary>
          <p style={{ margin: '0 0 16px', color: C.textDim, fontSize: 16, lineHeight: 1.7, maxWidth: '54ch' }}>{q.answer}</p>
        </details>
      ))}
    </div>
  )
}

/** The steps of a visit, numbered. */
export function Steps({ x, steps }) {
  const { C, F } = x
  if (!steps?.length) return null
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: 16 }}>
          <span style={{ width: 32, height: 32, borderRadius: '50%', background: C.accent, color: C.onAccent, display: 'grid', placeItems: 'center',
                         fontFamily: F.display, fontWeight: 700, fontSize: 14 }}>{i + 1}</span>
          <div>
            {s.title && <h4 style={{ margin: '2px 0 4px', fontFamily: F.display, fontWeight: 700, fontSize: 18.5, letterSpacing: '-0.02em' }}>{s.title}</h4>}
            {s.description && <p style={{ margin: 0, color: C.textDim, fontSize: 16, lineHeight: 1.7 }}>{s.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Linked blocks — towns, or a service in every town. */
export function Blocks({ x, items }) {
  const { C, F, T } = x
  if (!items.length) return null
  return (
    <div className="stg-two">
      {items.map(i => (
        <div key={i.href} style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.accent}`,
                                   padding: 'clamp(18px, 1.9vw, 24px)', display: 'flex', flexDirection: 'column' }}>
          <a href={i.href} style={{ fontFamily: F.display, fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(21px, 2vw, 27px)', lineHeight: 1.1, textDecoration: 'none', color: C.text }}>
            {i.title}
          </a>
          {i.meta && <span style={{ margin: '8px 0 0', ...x.label(C.textMuted), fontSize: 13 }}>{i.meta}</span>}
          {i.links?.length > 0 && (
            <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0 clamp(12px, 1.4vw, 22px)' }}>
              {i.links.map((l, n) => (
                <li key={l.href} style={{ borderTop: n > 1 ? `1px solid ${C.border}` : 'none' }}>
                  <a href={l.href} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, padding: '9px 0', textDecoration: 'none', fontSize: 15.5, color: C.text }}>
                    {l.label}<i style={{ fontStyle: 'normal', color: C.accent, fontWeight: 700 }}>›</i>
                  </a>
                </li>
              ))}
            </ul>
          )}
          {i.out && <a href={i.out.href} style={{ marginTop: 'auto', paddingTop: 16, color: C.accentDim, fontWeight: 700, fontSize: 14.5, textDecoration: 'none' }}>{i.out.label} →</a>}
        </div>
      ))}
    </div>
  )
}

/** A row of plain linked cards — related services, nearby towns, combos. */
export function LinkRow({ x, items }) {
  const { C, F } = x
  if (!items.length) return null
  return (
    <div className="stg-two">
      {items.map(i => (
        <a key={i.href} href={i.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12,
                                               background: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.accent}`,
                                               padding: '15px 18px', textDecoration: 'none', color: 'inherit' }}>
          <b style={{ fontFamily: F.display, fontWeight: 700, letterSpacing: '-0.02em', fontSize: 18 }}>{i.title}</b>
          <i style={{ fontStyle: 'normal', color: C.accent, fontWeight: 700 }}>›</i>
        </a>
      ))}
    </div>
  )
}

/** The footer at the end of the left column. */
export function SiteFooter({ x }) {
  const { C, F, name, biz, phone, phoneDisplay, services, areas, href, license } = x
  return (
    <footer style={{ borderTop: `2px solid ${C.text}`, padding: 'clamp(34px, 4vw, 52px) clamp(28px, 4vw, 72px) clamp(40px, 4vw, 56px)' }}>
      <div className="stg-three">
        <div>
          <span style={{ fontFamily: F.display, fontWeight: 800, letterSpacing: '-0.03em', fontSize: 20 }}>{name}</span>
          <p style={{ margin: '10px 0 0', color: C.textDim, fontSize: 16, lineHeight: 1.7 }}>
            {biz.address_line && <>{biz.address_line}<br /></>}
            {phone && <a href={`tel:${phone}`} style={{ fontWeight: 700, color: C.text, textDecoration: 'none' }}>{phoneDisplay}</a>}
            {biz.hours_display && <><br />{biz.hours_display}</>}
            {license && <><br />Licensed {license}</>}
          </p>
        </div>
        {services.length > 0 && (
          <div>
            <h5 style={{ margin: '0 0 10px', ...x.label(C.textMuted), fontSize: 12 }}>{x.offeringLabel}</h5>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 7, fontSize: 16 }}>
              {services.slice(0, 6).map(s => <li key={s.slug}><a href={href.service(s.slug)} style={{ color: C.textDim, textDecoration: 'none' }}>{s.name}</a></li>)}
            </ul>
          </div>
        )}
        {areas.length > 0 && (
          <div>
            <h5 style={{ margin: '0 0 10px', ...x.label(C.textMuted), fontSize: 12 }}>{x.placeLabel}</h5>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 7, fontSize: 16 }}>
              {areas.slice(0, 6).map(a => <li key={a}><a href={href.area(a)} style={{ color: C.textDim, textDecoration: 'none' }}>{a}</a></li>)}
            </ul>
          </div>
        )}
      </div>
      <div style={{ marginTop: 26, paddingTop: 16, borderTop: `1px solid ${C.border}`, color: C.textMuted, fontSize: 14 }}>
        © {new Date().getFullYear()} {biz.legal_name || name}
        {' · '}
        <a href={href.privacy} style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy</a>
        {x.social.map(s => (
          <span key={s.key}>{' · '}<a href={s.href} target="_blank" rel="noopener noreferrer me" style={{ color: 'inherit', textDecoration: 'underline' }}>{s.label}</a></span>
        ))}
      </div>
    </footer>
  )
}
