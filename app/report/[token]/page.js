export const dynamic = 'force-dynamic'

async function fetchReport(token) {
  try {
    const url = `https://app.machdigitalsolutions.com/api/reports/get?token=${token}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (e) { return null }
}

const NUM = (n) => typeof n === 'number' ? n.toLocaleString() : '—'
const PCT = (n) => n != null && n !== '' ? `${n}%` : '—'
const DOLLARS = (n) => n != null ? `$${(typeof n === 'string' ? parseFloat(n) : n).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '—'

export default async function ReportPage({ params }) {
  const { token } = await params
  const report = await fetchReport(token)

  if (!report) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 600, margin: '80px auto', padding: 40, textAlign: 'center' }}>
        <h1 style={{ color: '#111827' }}>Report not found</h1>
        <p style={{ color: '#6b7280' }}>This report may have been removed or the link has expired.</p>
      </div>
    )
  }

  const { period_label, ai_summary, data, client } = report
  const ai = data?.ai || {}

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#1F3A2E', color: 'white', padding: '32px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: 3, opacity: 0.9, marginBottom: 12 }}>MACH DIGITAL SOLUTIONS</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600 }}>{client?.name}</h1>
        <p style={{ margin: '8px 0 0 0', fontSize: 16, opacity: 0.9 }}>{period_label} Performance Report</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>
        {/* Executive Summary */}
        {ai_summary && (
          <section style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 18, color: '#111827', marginTop: 0 }}>Executive Summary</h2>
            <div style={{ color: '#4B5563', fontSize: 15, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: ai_summary }} />

            {ai.wins?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#6B7280', marginBottom: 10 }}>Wins This Period</div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  {ai.wins.map((w, i) => (
                    <li key={i} style={{ padding: '8px 0', color: '#111827', fontSize: 14, borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ color: '#22c55e', marginRight: 8 }}>✓</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ai.focus_areas?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#6B7280', marginBottom: 10 }}>Focus Next Period</div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  {ai.focus_areas.map((f, i) => (
                    <li key={i} style={{ padding: '8px 0', color: '#111827', fontSize: 14, borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ color: '#f59e0b', marginRight: 8 }}>→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Search Console */}
        {data?.search_console && (
          <section style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 18, color: '#111827', marginTop: 0 }}>Organic Search Performance</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
              <Kpi label="Clicks" value={NUM(data.search_console.total_clicks)} />
              <Kpi label="Impressions" value={NUM(data.search_console.total_impressions)} />
              <Kpi label="Avg. Position" value={data.search_console.avg_position || '—'} />
              <Kpi label="Avg. CTR" value={PCT(data.search_console.avg_ctr)} />
            </div>
            {data.search_console.top_queries?.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: '#6B7280', marginBottom: 10 }}>Top Queries</div>
                <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                  <thead><tr style={{ borderBottom: '1px solid #e5e7eb', color: '#9ca3af', textAlign: 'left', fontSize: 11 }}>
                    <th style={{ padding: '8px 8px 8px 0' }}>Query</th><th style={{ textAlign: 'right', padding: 8 }}>Clicks</th><th style={{ textAlign: 'right', padding: 8 }}>Impr.</th><th style={{ textAlign: 'right', padding: '8px 0 8px 8px' }}>Pos.</th>
                  </tr></thead>
                  <tbody>
                    {data.search_console.top_queries.map((q, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', color: '#111827' }}>
                        <td style={{ padding: '8px 8px 8px 0' }}>{q.query}</td>
                        <td style={{ textAlign: 'right', padding: 8, fontVariantNumeric: 'tabular-nums' }}>{NUM(q.clicks)}</td>
                        <td style={{ textAlign: 'right', padding: 8, fontVariantNumeric: 'tabular-nums' }}>{NUM(q.impressions)}</td>
                        <td style={{ textAlign: 'right', padding: '8px 0 8px 8px', fontVariantNumeric: 'tabular-nums' }}>{q.avgPosition || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* GA4 */}
        {data?.ga4 && (
          <section style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 18, color: '#111827', marginTop: 0 }}>Website Traffic</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
              <Kpi label="Total Users" value={NUM(data.ga4.total_users)} />
              <Kpi label="Total Sessions" value={NUM(data.ga4.total_sessions)} />
              <Kpi label="Organic Users" value={NUM(data.ga4.organic_users)} highlight />
              <Kpi label="Conversions" value={NUM(data.ga4.total_conversions)} />
            </div>
            {data.ga4.top_sources?.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: '#6B7280', marginBottom: 10 }}>Top Traffic Sources</div>
                <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                  <thead><tr style={{ borderBottom: '1px solid #e5e7eb', color: '#9ca3af', textAlign: 'left', fontSize: 11 }}>
                    <th style={{ padding: '8px 8px 8px 0' }}>Source / Medium</th><th style={{ textAlign: 'right', padding: 8 }}>Users</th><th style={{ textAlign: 'right', padding: 8 }}>Sessions</th><th style={{ textAlign: 'right', padding: '8px 0 8px 8px' }}>Conv.</th>
                  </tr></thead>
                  <tbody>
                    {data.ga4.top_sources.map((s, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', color: '#111827' }}>
                        <td style={{ padding: '8px 8px 8px 0' }}>{s.source} / {s.medium}</td>
                        <td style={{ textAlign: 'right', padding: 8 }}>{NUM(s.users)}</td>
                        <td style={{ textAlign: 'right', padding: 8 }}>{NUM(s.sessions)}</td>
                        <td style={{ textAlign: 'right', padding: '8px 0 8px 8px' }}>{NUM(s.conversions)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Google Ads */}
        {data?.google_ads && (
          <section style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 18, color: '#111827', marginTop: 0 }}>Paid Media (Google Ads)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
              <Kpi label="Ad Spend" value={DOLLARS(data.google_ads.total_cost)} />
              <Kpi label="Clicks" value={NUM(data.google_ads.total_clicks)} />
              <Kpi label="Conversions" value={NUM(data.google_ads.total_conversions)} />
              <Kpi label="Cost / Conv." value={data.google_ads.cost_per_conversion ? DOLLARS(data.google_ads.cost_per_conversion) : '—'} />
            </div>
            {data.google_ads.top_campaigns?.length > 0 && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: '#6B7280', marginBottom: 10 }}>Top Campaigns by Spend</div>
                <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                  <thead><tr style={{ borderBottom: '1px solid #e5e7eb', color: '#9ca3af', textAlign: 'left', fontSize: 11 }}>
                    <th style={{ padding: '8px 8px 8px 0' }}>Campaign</th><th style={{ textAlign: 'right', padding: 8 }}>Spend</th><th style={{ textAlign: 'right', padding: 8 }}>Clicks</th><th style={{ textAlign: 'right', padding: '8px 0 8px 8px' }}>Conv.</th>
                  </tr></thead>
                  <tbody>
                    {data.google_ads.top_campaigns.map((c, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', color: '#111827' }}>
                        <td style={{ padding: '8px 8px 8px 0' }}>{c.name}</td>
                        <td style={{ textAlign: 'right', padding: 8 }}>{DOLLARS(c.cost)}</td>
                        <td style={{ textAlign: 'right', padding: 8 }}>{NUM(c.clicks)}</td>
                        <td style={{ textAlign: 'right', padding: '8px 0 8px 8px' }}>{NUM(c.conversions)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Content Shipped */}
        {data?.content && (
          <section style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 18, color: '#111827', marginTop: 0 }}>Content Published</h2>
            <p style={{ color: '#4B5563', margin: '0 0 12px 0' }}><strong>{data.content.total_pieces}</strong> pieces published this period</p>
            {data.content.list?.length > 0 && (
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {data.content.list.slice(0, 10).map((c, i) => (
                  <li key={i} style={{ padding: '8px 0', color: '#111827', fontSize: 13, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{c.title}</span>
                    <span style={{ color: '#6B7280', fontSize: 11 }}>{new Date(c.published_at).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '24px 0', color: '#9ca3af', fontSize: 12 }}>
          <p style={{ margin: 0 }}>Questions about this report? Reply to the email or contact <a href="mailto:chris@machdigitalsolutions.com" style={{ color: '#1F3A2E' }}>chris@machdigitalsolutions.com</a></p>
          <p style={{ margin: '8px 0 0 0' }}>Report generated {new Date(report.generated_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

function Kpi({ label, value, highlight }) {
  return (
    <div style={{ background: highlight ? '#DCFCE7' : '#F9FAFB', padding: 12, borderRadius: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#6B7280', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, color: highlight ? '#166534' : '#111827', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{value}</div>
    </div>
  )
}
