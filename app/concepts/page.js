// Design concepts for client sites, for the team to look at. The four pages
// themselves are static files in public/concepts — drawings of a layout, not
// the real renderers, all showing the same made-up business so the structures
// can be compared without the content getting in the way.
export const metadata = {
  title: 'MACH — Client site design concepts',
  robots: { index: false, follow: false },
}

const concepts = [
  {
    slug: 'a',
    name: 'Booking First',
    job: 'Gets the visit booked',
    description:
      'The hero is half argument, half a real request-a-visit form with “what happens next” inside it. The rating and the review come straight after, up high. The services are a quiet two-column list near the bottom, because by then the decision is made. No steps band and no closing band — the form already did that job.',
  },
  {
    slug: 'b',
    name: 'Centre',
    job: 'Looks like the best business in town',
    description:
      'Everything runs down a centre line. A floating nav rides over a full-height photograph, then one service at a time fills a large panel that switches when you pick another name. Figures across a dark band, the review alone as a pull quote, a real timeline, tiled service areas on brick, and questions that open and close.',
  },
  {
    slug: 'c',
    name: 'Spec Sheet',
    job: 'Lets someone check the facts',
    description:
      'Built like a trade catalogue. The facts sit in a bordered “at a glance” table beside the headline, a photograph runs the width of the page, and the services are a real table — what it covers, what it starts at. Coverage stays compact however many towns there are. No cards anywhere.',
  },
  {
    slug: 'd',
    name: 'Side Rail',
    job: 'Stands out from everything else local',
    description:
      'No top bar at all: the logo, menu, phone and button live in a rail pinned down the right edge, and the page scrolls beside it on a dark ground. On a phone the rail becomes an ordinary bar at the top.',
  },
]

const wrap = { maxWidth: 960, margin: '0 auto', padding: '0 20px' }

export default function ConceptsIndex() {
  return (
    <div style={{ background: '#f4f4f2', minHeight: '100vh', padding: '64px 0 80px', fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif', color: '#15181c' }}>
      <div style={wrap}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6b7178', marginBottom: 14 }}>
          MACH Digital Solutions · Internal
        </div>
        <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '0 0 16px' }}>
          Client site design concepts
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: '#4c535a', maxWidth: '62ch', margin: '0 0 10px' }}>
          Four structures for the same business. They are not four colour schemes — the section order, what leads the
          page, and the shape each piece of content takes are different in every one. Each is built to do a different
          job, so a client gets the one that suits how their customers actually buy.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: '#6b7178', maxWidth: '62ch', margin: '0 0 40px' }}>
          Every page shows the same sample business — a Kansas HVAC company — with placeholder photographs. Nothing on
          them is invented: every figure, price and line of copy comes from the sort of answers the questionnaire and
          the scraper give us.
        </p>

        <div style={{ display: 'grid', gap: 16 }}>
          {concepts.map(c => (
            <a
              key={c.slug}
              href={`/concepts/${c.slug}.html`}
              style={{
                display: 'block', background: '#fff', border: '1px solid #ddddd7', borderRadius: 14,
                padding: 'clamp(22px, 3vw, 30px)', textDecoration: 'none', color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 10 }}>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>
                  {c.slug.toUpperCase()} — {c.name}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b2451f' }}>
                  {c.job}
                </div>
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4c535a', margin: '0 0 16px', maxWidth: '78ch' }}>{c.description}</p>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#15181c' }}>Open the page →</span>
            </a>
          ))}
        </div>

        <p style={{ marginTop: 36, fontSize: 15, color: '#6b7178' }}>
          Worth opening on a phone as well as a laptop — they are built to hold up at both.
        </p>
      </div>
    </div>
  )
}
