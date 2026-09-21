import { SectionHead as CrewHead } from './CrewChrome.js'
import { SectionHead as HearthHead } from './HearthKit.js'
import { SectionHead as LevelHead } from './LevelKit.js'
import { boardOf } from './StageShared.js'
import { captionParts } from './family/data.js'
import { crewPlan, hearthPlan, levelPlan, centrePlan, bookingPlan, stagePlan, serenePlan } from './family/gallery.js'

// A gallery of the client's own photographs, one per family, each built from
// something that family already does so that no two share a structure (the
// approved mock: public/mockups/galleries.html, not committed). RAIL's lives
// in RailKit and was the first.
//
// Every one renders nothing below two photographs, and shows only as many as
// its layout fills cleanly — the counts are in family/gallery.js, which has
// the reasoning. Whether the section shows at all is the section registry's
// call, made by the caller: on by default for CENTRE, RAIL and SERENE, off
// for the rest until the client switches it on.

const fill = { display: 'block', width: '100%', height: '100%', objectFit: 'cover' }
const Photo = ({ it, style }) => <img src={it.url} alt={it.alt || ''} loading="lazy" style={{ ...fill, ...style }} />

// ---- CREW: the latest job large, the rest around it -------------------------

export function CrewGallery({ x, items }) {
  const plan = crewPlan(items.length)
  if (!plan) return null
  const { C, F, T, wrap } = x
  const list = items.slice(0, plan.count)
  return (
    <section style={{ paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
      <div style={wrap}>
        <CrewHead x={x} eyebrow="Our work" title="Recent jobs" />
        <div className={`crew-gal${plan.mode === 'pair' ? ' crew-gal-pair' : ''}`}>
          {list.map((it, i) => {
            const { job, place } = captionParts(it.caption)
            const feat = plan.mode === 'feature' && i === 0
            return (
              <figure key={it.url} className={feat ? 'feat' : undefined} style={{
                margin: 0, display: 'flex', flexDirection: 'column', background: C.surface,
                border: `1px solid ${C.border}`, borderRadius: T.radius.md, overflow: 'hidden',
              }}>
                <div style={{ flex: 1, minHeight: 0 }}><Photo it={it} /></div>
                {job && (
                  <figcaption style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', padding: '11px 14px', borderTop: `3px solid ${C.text}` }}>
                    <b style={{ fontFamily: F.display, fontWeight: 700, fontSize: feat ? 26 : 20, lineHeight: 1.15, color: C.text }}>{job}</b>
                    {place && <span style={{ color: C.textDim, fontSize: 15, whiteSpace: 'nowrap' }}>{place}</span>}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
        <style>{`
          .crew-gal { display: grid; gap: 18px; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: 230px; }
          .crew-gal-pair { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 330px; }
          .crew-gal .feat { grid-column: span 2; grid-row: span 2; }
          @media (max-width: 760px) {
            .crew-gal, .crew-gal-pair { grid-template-columns: minmax(0, 1fr); grid-auto-rows: 270px; }
            .crew-gal .feat { grid-column: auto; grid-row: auto; }
          }
        `}</style>
      </div>
    </section>
  )
}

// ---- HEARTH: framed prints, the middle one hung lower -----------------------

export function HearthGallery({ x, items }) {
  const plan = hearthPlan(items.length)
  if (!plan) return null
  const { C, F, wrap, sectionPad } = x
  const list = items.slice(0, plan.count)
  return (
    <section style={{ paddingBlock: sectionPad }}>
      <div style={wrap}>
        <HearthHead x={x} eyebrow="From our work" title="Jobs we're proud of" />
        <div className={`h-gal${plan.stagger ? ' h-gal-stagger' : ''}`} style={{ '--cols': plan.cols, borderTop: `1px dashed ${C.border}` }}>
          {list.map(it => {
            const { job, place } = captionParts(it.caption)
            return (
              <figure key={it.url} style={{ margin: 0 }}>
                <div style={{
                  background: C.surface, padding: 12, border: `1px solid ${C.border}`, aspectRatio: '4 / 3.4',
                  boxShadow: `0 1px 0 ${C.border}, 0 10px 24px -14px rgba(60, 40, 20, 0.35)`,
                }}><Photo it={it} /></div>
                {job && (
                  <figcaption style={{ marginTop: 14, paddingLeft: 2 }}>
                    <b style={{ display: 'block', fontFamily: F.display, fontWeight: 600, fontSize: 20, lineHeight: 1.2, color: C.text }}>{job}</b>
                    {place && <span style={{ display: 'block', marginTop: 5, paddingTop: 6, borderTop: `1px dashed ${C.border}`, color: C.textDim, fontSize: 14.5 }}>{place}</span>}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
        <style>{`
          .h-gal { display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); gap: 34px 30px; padding-top: 40px; }
          .h-gal-stagger { padding-bottom: 44px; }
          .h-gal-stagger > figure:nth-child(3n + 2) { transform: translateY(44px); }
          @media (max-width: 760px) {
            .h-gal { grid-template-columns: minmax(0, 1fr); }
            .h-gal-stagger { padding-bottom: 0; }
            .h-gal-stagger > figure:nth-child(3n + 2) { transform: none; }
          }
        `}</style>
      </div>
    </section>
  )
}

// ---- LEVEL: a bento, captions as pills on the photograph --------------------

export function LevelGallery({ x, items }) {
  const plan = levelPlan(items.length)
  if (!plan) return null
  const { C, T, wrap, sectionPad } = x
  const list = items.slice(0, plan.count)
  return (
    <section style={{ paddingBlock: sectionPad }}>
      <div style={wrap}>
        <LevelHead x={x} eyebrow="Our work" title="Recent jobs"
          aside={<span style={{ color: C.textDim, fontSize: 16 }}>{list.length} photos</span>} />
        <div className="lv-gal" style={{ '--rows': plan.rows }}>
          {list.map((it, i) => {
            const [c0, c1, r0, r1] = plan.tiles[i]
            const { job, place } = captionParts(it.caption)
            return (
              <figure key={it.url} className={i === 0 ? 'lv-gal-first' : undefined} style={{
                margin: 0, position: 'relative', borderRadius: T.radius.lg, overflow: 'hidden',
                gridColumn: `${c0} / ${c1}`, gridRow: `${r0} / ${r1}`,
              }}>
                <Photo it={it} />
                {job && (
                  <figcaption style={{
                    position: 'absolute', left: 12, bottom: 12, maxWidth: 'calc(100% - 24px)',
                    // Not fully round: a long caption wraps on the small tiles,
                    // and a full radius over two lines reads as a lump. At one
                    // line this looks the same as a pill.
                    background: C.surface, color: C.text, borderRadius: 16, padding: '8px 14px', lineHeight: 1.35,
                    fontWeight: 600, fontSize: 14.5, boxShadow: '0 4px 14px -6px rgba(0, 0, 0, 0.35)',
                  }}>
                    {job}{place && <span style={{ color: C.textDim, fontWeight: 400 }}> · {place}</span>}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
        <style>{`
          .lv-gal { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: repeat(var(--rows), 190px); gap: 14px; }
          @media (max-width: 760px) {
            .lv-gal { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: none; grid-auto-rows: 170px; }
            .lv-gal > figure { grid-column: auto !important; grid-row: auto !important; }
            .lv-gal > .lv-gal-first { grid-column: 1 / 3 !important; grid-row: span 2 !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

// ---- CENTRE: one large centred photograph, a strip of the rest --------------

export function CentreGallery({ x, items }) {
  const plan = centrePlan(items.length)
  if (!plan) return null
  const { C, F, T, wrap, mid, sectionPad } = x
  const list = items.slice(0, plan.count)
  const small = (it) => {
    const { job, place } = captionParts(it.caption)
    return (
      <figure key={it.url} style={{ margin: 0 }}>
        <Photo it={it} style={{ aspectRatio: plan.mode === 'pair' ? '4 / 3' : '1', height: 'auto', borderRadius: T.radius.md }} />
        {job && (
          <figcaption style={{ marginTop: 10, fontSize: plan.mode === 'pair' ? 16 : 14, fontWeight: 500, lineHeight: 1.4, color: C.text }}>
            {job}{place && <><br /><span style={{ color: C.textDim, fontWeight: 400 }}>{place}</span></>}
          </figcaption>
        )}
      </figure>
    )
  }
  const [first, ...rest] = list
  return (
    <section style={{ paddingBlock: sectionPad, textAlign: 'center' }}>
      <div style={wrap}>
        <div style={mid}>
          <h2 style={{ ...x.h2, marginBottom: 10 }}>Recent work</h2>
          <p style={{ color: C.textDim, margin: '0 auto 38px', maxWidth: 520, lineHeight: 1.65, fontSize: 17 }}>A few of the jobs we've finished lately.</p>
        </div>
        {plan.mode === 'pair' ? (
          <div className="ctr-gal-pair">{list.map(small)}</div>
        ) : (
          <>
            <figure style={{ margin: '0 auto', maxWidth: 980 }}>
              <Photo it={first} style={{ aspectRatio: '16 / 8.5', height: 'auto', borderRadius: T.radius.md }} />
              {first.caption && <figcaption style={{ fontFamily: F.display, fontStyle: 'italic', fontSize: 21, marginTop: 16, color: C.text }}>{first.caption}</figcaption>}
            </figure>
            <div className="ctr-gal-strip" style={{ '--n': plan.strip, borderTop: `1px solid ${C.border}` }}>{rest.map(small)}</div>
          </>
        )}
        <style>{`
          .ctr-gal-pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; max-width: 980px; margin: 0 auto; }
          .ctr-gal-strip { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 16px; max-width: 980px; margin: 38px auto 0; padding-top: 30px; }
          @media (max-width: 760px) {
            .ctr-gal-pair { grid-template-columns: minmax(0, 1fr); }
            .ctr-gal-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
        `}</style>
      </div>
    </section>
  )
}

// ---- BOOKING: one quiet row that scrolls sideways ---------------------------

export function BookingGallery({ x, items }) {
  const plan = bookingPlan(items.length)
  if (!plan) return null
  const { C, F, T, wrap, sectionPad } = x
  const list = items.slice(0, plan.count)
  return (
    <section style={{ paddingBlock: sectionPad }}>
      <div style={wrap}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, borderBottom: `2px solid ${C.text}`, paddingBottom: 12, marginBottom: 22 }}>
          <h2 style={{ ...x.h2, fontSize: 'clamp(24px, 3vw, 34px)' }}>Recent jobs</h2>
          {list.length >= 5 && <span style={{ color: C.textDim, fontSize: 15 }}>Scroll for more</span>}
        </div>
        <div className="bk-gal">
          {list.map(it => {
            const { job, place } = captionParts(it.caption)
            return (
              <figure key={it.url} style={{ margin: 0, flex: '0 0 280px', scrollSnapAlign: 'start' }}>
                <Photo it={it} style={{ height: 'auto', aspectRatio: '4 / 3', borderRadius: T.radius.md }} />
                {job && (
                  <figcaption style={{ marginTop: 10, fontSize: 15, color: C.textDim }}>
                    <b style={{ fontFamily: F.display, fontWeight: 700, color: C.text }}>{job}</b>{place && ` · ${place}`}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
        <style>{`.bk-gal { display: flex; align-items: flex-start; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 14px; }`}</style>
      </div>
    </section>
  )
}

// ---- STAGE: a numbered contact sheet, the captions on the chapter's board ---

/** A chapter for STAGE's home page, or null. The numbers tie each photograph
 *  to its line on the board, so they appear only when every photograph shown
 *  has a caption to be numbered against. */
export function stageGalleryChapter(x, items) {
  const plan = stagePlan(items.length)
  if (!plan) return null
  const { C, F } = x
  const list = items.slice(0, plan.count)
  const numbered = list.every(it => it.caption)
  return {
    id: 'work', label: 'The work',
    cap: { title: 'Recent jobs', line: 'Photographs from jobs we have finished.' },
    board: numbered ? boardOf(x, list.map((it, i) => ({ k: String(i + 1), v: it.caption }))) : null,
    content: (
      <>
        <h2 style={x.h2}>The work</h2>
        <div className="stg-gal" style={{ '--cols': plan.cols, background: C.text, marginTop: 28 }}>
          {list.map((it, i) => (
            <figure key={it.url} style={{ margin: 0, position: 'relative', aspectRatio: '1' }}>
              <Photo it={it} />
              {numbered && (
                <span style={{
                  position: 'absolute', top: 8, left: 8, display: 'inline-grid', placeItems: 'center', minWidth: 26, height: 26, padding: '0 6px',
                  background: C.accent, color: C.onAccent, fontFamily: F.display, fontWeight: 800, fontSize: 14,
                }}>{i + 1}</span>
              )}
            </figure>
          ))}
        </div>
        <style>{`
          .stg-gal { display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); gap: 6px; padding: 6px; }
          @media (max-width: 600px) { .stg-gal { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        `}</style>
      </>
    ),
  }
}

// ---- SERENE: an editorial column, captions in italic ------------------------

export function SereneGallery({ T, items }) {
  const plan = serenePlan(items.length)
  if (!plan) return null
  const list = items.slice(0, plan.count)
  const C = T.colors
  const Fig = ({ it, ratio, low }) => (
    <figure style={{ margin: 0, marginTop: low ? 70 : 0 }} className={low ? 'sr-gal-low' : undefined}>
      <Photo it={it} style={{ height: 'auto', aspectRatio: ratio, borderRadius: T.radius.md }} />
      {it.caption && (
        <figcaption style={{ marginTop: 14, fontFamily: T.fonts.display, fontStyle: 'italic', fontSize: 19, color: C.textDim, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span aria-hidden="true" style={{ width: 28, height: 1, background: C.accent, flex: 'none' }} />{it.caption}
        </figcaption>
      )}
    </figure>
  )
  return (
    <section style={{ padding: 'clamp(64px, 9vw, 120px) clamp(24px, 5vw, 96px)', borderTop: `1px solid ${C.borderLight}` }}>
      <div className="sr-gal" style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontFamily: T.fonts.display, fontWeight: 300, fontSize: 'clamp(26px, 2.6vw, 34px)', lineHeight: 1.15, margin: 0, color: C.text }}>
          From the practice
        </h2>
        <div style={{ display: 'grid', gap: 38 }}>
          {plan.groups.map((g, gi) => g.length === 1
            ? <Fig key={gi} it={list[g[0]]} ratio="16 / 9" />
            : (
              <div key={gi} className="sr-gal-pair">
                <Fig it={list[g[0]]} ratio="4 / 5" />
                <Fig it={list[g[1]]} ratio="4 / 5" low />
              </div>
            ))}
        </div>
      </div>
      <style>{`
        .sr-gal { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 8fr); gap: clamp(24px, 5vw, 80px); }
        .sr-gal-pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; align-items: start; }
        @media (max-width: 760px) {
          .sr-gal, .sr-gal-pair { grid-template-columns: minmax(0, 1fr); }
          .sr-gal-low { margin-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}
