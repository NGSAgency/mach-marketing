// The site config scoped to one location of a multi-location business, for
// its page at /contact/<location>: that location's address, phone, hours and
// booking link in place of the main ones, its own structured data
// (current_location), and the contact form sending leads for it. Null when the
// business has no such location.
export function scopedToLocation(c, locationSlug) {
  const locs = Array.isArray(c.locations) && c.locations.length > 1 ? c.locations : []
  const loc = locs.find(l => l.slug === locationSlug)
  if (!loc) return null
  return {
    ...c,
    current_location: loc,
    business: {
      ...c.business,
      address_line: loc.address_line || '',
      phone: loc.phone || c.business.phone,
      phone_display: loc.phone_display || loc.phone || c.business.phone_display,
      hours_display: loc.hours_display || null,
      booking_url: loc.booking_url || c.business.booking_url || null,
    },
    lead_form: { ...(c.lead_form || {}), preset: loc.id },
  }
}
