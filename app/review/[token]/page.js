import { cookies } from 'next/headers'

// The website review a prospect is sent (Command Center's site analyzer).
// Command Center serves it only once someone at MACH has turned the link on;
// a MACH staff browser (mach_staff cookie) sees it before that, as a preview.
// The content comes from Command Center src/lib/site-analyzer/report.js.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CC_URL = process.env.COMMAND_CENTER_URL || 'https://app.machdigitalsolutions.com'

export async function generateMetadata({ params }) {
  const { token } = await params
  const r = await getReview(token)
  return {
    title: r ? `Website review · ${r.business || r.host}` : 'Website review | MACH Digital Solutions',
    robots: { index: false, follow: false },
  }
}

async function getReview(token) {
  if (!/^[a-f0-9]{32}$/.test(String(token || ''))) return null
  let staff = ''
  try { staff = (await cookies()).get('mach_staff')?.value || '' } catch {}
  try {
    const q = new URLSearchParams({ review: token })
    if (staff) q.set('staff', staff)
    const res = await fetch(`${CC_URL}/api/reports/get?${q}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch { return null }
}

const CSS = `
  :root { --green: #1F3A2E; --ink: #111827; --body: #4B5563; --dim: #6B7280; --faint: #9ca3af; --line: #eceef1; --page: #f3f5f4; --tile: #f8faf9;
    --good: #15803d; --goodbg: #dcfce7; --mid: #b45309; --midbg: #fef3c7; --bad: #b91c1c; --badbg: #fee2e2; }
  * { box-sizing: border-box; }
  .rv { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; background: var(--page); color: var(--ink); color-scheme: light; -webkit-font-smoothing: antialiased; min-height: 100vh; padding: 1px 0; }
  .rv-sheet { max-width: 720px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(31,58,46,.06); overflow: hidden; }
  .rv-preview { background: #fef3c7; color: #78350f; font-size: 13px; text-align: center; padding: 8px 16px; }
  .rv-top { background: var(--green); color: #fff; padding: 30px 40px; display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; }
  .rv-brand { font-size: 11px; letter-spacing: 3px; opacity: .75; }
  .rv-top h1 { margin: 10px 0 4px; font-size: 25px; font-weight: 600; line-height: 1.25; }
  .rv-top p { margin: 0; font-size: 14px; opacity: .75; }
  .rv-ring { width: 116px; height: 116px; position: relative; }
  .rv-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .rv-ring div { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
  .rv-ring b { font-size: 36px; line-height: 1; font-variant-numeric: tabular-nums; }
  .rv-ring span { font-size: 11px; opacity: .75; margin-top: 3px; }
  .rv-body { padding: 30px 40px 36px; }
  .rv-verdict { display: flex; gap: 12px; align-items: baseline; flex-wrap: wrap; margin: 0 0 6px; }
  .rv-pill { font-size: 12px; font-weight: 600; border-radius: 999px; padding: 3px 10px; white-space: nowrap; }
  .p-mid { background: var(--midbg); color: var(--mid); } .p-bad { background: var(--badbg); color: var(--bad); } .p-good { background: var(--goodbg); color: var(--good); }
  .rv-verdict h2 { margin: 0; font-size: 19px; line-height: 1.4; font-weight: 600; flex: 1 1 320px; text-wrap: balance; }
  .rv-lede { margin: 0; font-size: 14px; color: var(--dim); line-height: 1.55; }
  .rv h3 { font-size: 12px; letter-spacing: .8px; text-transform: uppercase; color: var(--dim); margin: 32px 0 14px; font-weight: 600; }
  .rv-tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .rv-tile { background: var(--tile); border-radius: 10px; padding: 14px 14px 12px; }
  .rv-tile .n { font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1; }
  .rv-tile .l { font-size: 13px; color: var(--body); margin-top: 6px; line-height: 1.3; min-height: 2.6em; }
  .rv-tile .m { height: 4px; border-radius: 2px; background: #e5e7eb; margin-top: 10px; overflow: hidden; }
  .rv-tile .m i { display: block; height: 100%; }
  .c-bad { color: var(--bad); } .c-mid { color: var(--mid); } .c-good { color: var(--good); }
  .f-bad { background: #ef4444; } .f-mid { background: #f59e0b; } .f-good { background: #22c55e; }
  .rv-probs { list-style: none; margin: 0; padding: 0; display: grid; }
  .rv-probs li { display: grid; grid-template-columns: 36px 1fr; gap: 14px; padding: 18px 0; border-top: 1px solid var(--line); }
  .rv-probs li:first-child { border-top: 0; padding-top: 4px; }
  .rv-idx { width: 36px; height: 36px; border-radius: 10px; background: var(--green); color: #fff; display: grid; place-items: center; font-weight: 700; font-size: 15px; }
  .rv-probs .h { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 5px; }
  .rv-probs b { font-size: 16px; }
  .rv-probs p { margin: 0; font-size: 14.5px; line-height: 1.55; color: var(--body); }
  .rv-probs .found { margin-top: 6px; font-size: 13.5px; color: var(--ink); }
  .rv-probs .found strong { font-weight: 600; }
  .rv-working { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 14.5px; color: var(--body); }
  .rv-working li::before { content: "✓"; color: var(--good); font-weight: 700; margin-right: 7px; }
  .rv-cta { margin-top: 32px; background: var(--tile); border-radius: 12px; padding: 20px 22px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .rv-cta div { max-width: 40ch; }
  .rv-cta strong { display: block; font-size: 16px; margin-bottom: 2px; }
  .rv-cta span { font-size: 14px; color: var(--body); line-height: 1.5; }
  .rv-btn { background: var(--green); color: #fff; font-weight: 600; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 15px; white-space: nowrap; }
  .rv-btn:focus-visible { outline: 3px solid #86efac; outline-offset: 2px; }
  .rv-foot { font-size: 12px; color: var(--faint); line-height: 1.6; margin: 22px 0 0; }
  @media (max-width: 640px) {
    .rv-sheet { margin: 0; border-radius: 0; box-shadow: none; }
    .rv-top { padding: 24px 20px; grid-template-columns: 1fr; }
    .rv-ring { width: 96px; height: 96px; } .rv-ring b { font-size: 30px; }
    .rv-top h1 { font-size: 22px; }
    .rv-body { padding: 24px 20px 28px; }
    .rv-tiles { grid-template-columns: 1fr 1fr; }
    .rv-btn { width: 100%; text-align: center; }
  }
`

const tone = (n) => (n >= 78 ? 'good' : n >= 62 ? 'mid' : 'bad')
const ringColor = (n) => (n >= 78 ? '#4ade80' : n >= 62 ? '#fbbf24' : '#f87171')
const day = (iso) => { try { return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Chicago' }) } catch { return '' } }

export default async function ReviewPage({ params }) {
  const { token } = await params
  const r = await getReview(token)

  if (!r) {
    return (
      <div className="rv"><style>{CSS}</style>
        <div className="rv-sheet"><div className="rv-body" style={{ textAlign: 'center' }}>
          <h2 style={{ marginTop: 0 }}>This review isn’t available</h2>
          <p className="rv-lede">The link may have been turned off. If you were expecting it, reply to the email it came with.</p>
        </div></div>
      </div>
    )
  }

  const name = r.business || r.host
  const C = 2 * Math.PI * 52
  const subject = encodeURIComponent(`Website review for ${name}`)

  return (
    <div className="rv">
      <style>{CSS}</style>
      <div className="rv-sheet">
        {r.preview && <div className="rv-preview">Preview: only MACH can see this until the link is turned on in Command Center.</div>}
        <header className="rv-top">
          <div>
            <div className="rv-brand">MACH DIGITAL SOLUTIONS</div>
            <h1>Website review for {name}</h1>
            <p>{r.host} · {day(r.reviewedAt)}</p>
          </div>
          <div className="rv-ring" role="img" aria-label={`Website score ${r.overall} out of 100`}>
            <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="10" /><circle cx="60" cy="60" r="52" fill="none" stroke={ringColor(r.overall)} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(C * r.overall / 100).toFixed(1)} ${C.toFixed(1)}`} /></svg>
            <div><b>{r.overall}</b><span>out of 100</span></div>
          </div>
        </header>

        <div className="rv-body">
          <div className="rv-verdict">
            <span className={`rv-pill p-${tone(r.overall)}`}>Grade {r.grade}</span>
            <h2>{r.headline}</h2>
          </div>
          <p className="rv-lede">We scored your website on what Google looks at when it decides which local businesses to show. Here’s where you stand and what’s costing you the most.</p>

          {r.tiles?.length > 0 && <>
            <h3>Where you stand</h3>
            <div className="rv-tiles">
              {r.tiles.map(t => (
                <div key={t.name} className="rv-tile">
                  <div className={`n c-${tone(t.score)}`}>{t.score}</div>
                  <div className="l">{t.name}</div>
                  <div className="m"><i className={`f-${tone(t.score)}`} style={{ width: `${t.score}%` }} /></div>
                </div>
              ))}
            </div>
          </>}

          {r.problems?.length > 0 && <>
            <h3>What’s hurting your rankings most</h3>
            <ol className="rv-probs">
              {r.problems.map((p, i) => (
                <li key={i}>
                  <div className="rv-idx">{i + 1}</div>
                  <div>
                    <div className="h"><b>{p.title}</b><span className={`rv-pill ${p.impact === 'High' ? 'p-bad' : 'p-mid'}`}>{p.impact} impact</span></div>
                    <p>{p.why}</p>
                    {p.found && <p className="found"><strong>Found:</strong> {p.found}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </>}

          {r.working?.length > 0 && <>
            <h3>What’s working</h3>
            <ul className="rv-working">{r.working.map(w => <li key={w}>{w}</li>)}</ul>
          </>}

          <div className="rv-cta">
            <div><strong>Want to see what fixing these would take?</strong><span>We’ll walk you through it on a short call. No cost.</span></div>
            <a className="rv-btn" href={`mailto:sales@machdigitalsolutions.com?subject=${subject}`}>Set up a call</a>
          </div>

          <p className="rv-foot">This scores your website only. Your Google Business Profile, reviews and links from other sites also affect where you show up. We read {r.pagesRead} pages of your site on {day(r.reviewedAt)}. Questions? sales@machdigitalsolutions.com</p>
        </div>
      </div>
    </div>
  )
}
