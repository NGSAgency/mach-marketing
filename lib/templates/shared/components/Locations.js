// Businesses with more than one shop or office. The config's locations list
// (Command Center, api/_lib/site/locations.js) is empty for a one-location
// business, and then everything here renders the family's own single address
// unchanged.
//
// Each location has its own contact page at /contact/<slug>.

const link = { color: 'inherit', textDecoration: 'none' }

/** The locations, main first, or null when there is only one. */
export function multiLocations(c) {
  return Array.isArray(c?.locations) && c.locations.length > 1 ? c.locations : null
}

export const locationPath = (contactHref, loc) => `${String(contactHref || '').replace(/\/$/, '')}/${loc.slug}`

/**
 * The footer's address block: each location's name (linking to its page),
 * address and phone. fallback is the family's own single-address markup.
 */
export function FooterLocations({ c, contactHref, fallback = null, gap = 10 }) {
  const locs = multiLocations(c)
  if (!locs) return fallback
  return (
    <div style={{ display: 'grid', gap }}>
      {locs.map(l => (
        <div key={l.id}>
          <a href={locationPath(contactHref, l)} style={{ ...link, fontWeight: 700 }}>{l.name}</a>
          {l.address_line && <div>{l.address_line}</div>}
          {l.phone && <div><a href={`tel:${l.phone.replace(/[^0-9+]/g, '')}`} style={link}>{l.phone_display || l.phone}</a></div>}
        </div>
      ))}
    </div>
  )
}

/** Compact phone list for a header strip: "St. Louis 636-… · St. Charles 636-…". */
export function LocationPhones({ c, style = {}, linkStyle = {} }) {
  const locs = (multiLocations(c) || []).filter(l => l.phone)
  if (!locs.length) return null
  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '4px 14px', ...style }}>
      {locs.map(l => (
        <span key={l.id}>
          {l.name}{' '}
          <a href={`tel:${l.phone.replace(/[^0-9+]/g, '')}`} style={{ ...link, fontWeight: 700, ...linkStyle }}>{l.phone_display || l.phone}</a>
        </span>
      ))}
    </span>
  )
}
