// The privacy notice a client site needs because of what the site itself does:
// it takes messages through a form, and — when the client has tracking set up —
// it loads Google's tags.
//
// Everything here is built from what the client told us and what is actually
// configured. Nothing is asserted on their behalf: no retention periods, no
// promises about selling data, no claim to comply with any particular law.
// Those are the client's to make, not ours to generate. A client whose lawyer
// wants different words can store a `privacy|body` content row, which wins.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

function on(v) { return typeof v === 'string' && v.trim().length > 0 }

/**
 * @returns { title, updated, intro, sections: [{ heading, paragraphs, items }], override }
 */
export function privacyModel(c) {
  const biz = c.business || {}
  const t = c.tracking || {}
  const name = biz.display_name || biz.legal_name || 'this business'
  const legal = biz.legal_name && biz.legal_name !== biz.display_name ? biz.legal_name : null

  // A client's own wording, if someone has stored it.
  const override = (c.generated && c.generated['privacy|body']) || null

  const contactLines = [
    biz.address_line,
    on(biz.phone_display || biz.phone) ? (biz.phone_display || biz.phone) : null,
    biz.email,
  ].filter(Boolean)

  const sections = []

  sections.push({
    heading: 'Who we are',
    paragraphs: [
      legal
        ? `This website belongs to ${name}, trading as part of ${legal}.`
        : `This website belongs to ${name}.`,
      contactLines.length
        ? `You can reach us at ${contactLines.join(' · ')}.`
        : null,
    ].filter(Boolean),
  })

  sections.push({
    heading: 'What you send us',
    paragraphs: [
      `If you fill in a form on this site, what you type is sent to us by email so we can reply. That is your name, your phone number or email address, and whatever you write in the message.`,
      `We use it to answer you and to arrange the work you asked about. If you would rather not use the form, call or email us instead.`,
    ],
  })

  // Only what is switched on, described plainly.
  const tools = []
  if (on(t.ga4_measurement_id)) tools.push('Google Analytics, which counts visits and which pages people look at')
  if (on(t.gtm_container_id)) tools.push('Google Tag Manager, which loads the measurement tools above')
  if (on(t.google_ads_conversion_id)) tools.push('Google Ads conversion tracking, which tells us whether an advert led to an enquiry')

  if (tools.length) {
    sections.push({
      heading: 'How we measure the site',
      paragraphs: [
        `This site uses ${tools.length === 1 ? 'one measurement tool' : 'measurement tools'} provided by Google:`,
      ],
      items: tools,
      after: [
        `These tools count things like pages viewed, phone numbers tapped and forms sent. They tell us how the site is doing — they are not used to identify you personally, and we do not use them to build a profile of you.`,
        `They work by storing small files called cookies in your browser. Every browser can block or delete cookies in its settings; the site works either way.`,
      ],
    })
  } else {
    sections.push({
      heading: 'Cookies',
      paragraphs: [
        `This site does not load any analytics or advertising tools, and sets no cookies of its own.`,
      ],
    })
  }

  // Deliberately descriptive. "We never sell your data" is a claim about how
  // the client runs their business — true of most trades, not all, and not
  // ours to assert for them. A client who wants to say it can, in their own
  // override.
  sections.push({
    heading: 'Who else sees it',
    paragraphs: [
      tools.length
        ? `The measurement tools above are run by Google, so the visit data they collect is processed by Google under their own terms.`
        : null,
      `Our web developer can see the site's settings in the course of maintaining it.`,
    ].filter(Boolean),
  })

  sections.push({
    heading: 'Your choices',
    paragraphs: [
      contactLines.length
        ? `If you want to know what we hold about you, or want it deleted, contact us using the details above and we will deal with it.`
        : `If you want to know what we hold about you, or want it deleted, get in touch and we will deal with it.`,
      tools.length
        ? `To stop the measurement tools entirely, block cookies in your browser or install Google's opt-out add-on.`
        : null,
    ].filter(Boolean),
  })

  const now = new Date()
  return {
    title: 'Privacy',
    updated: `${MONTHS[now.getMonth()]} ${now.getFullYear()}`,
    intro: `What this website collects, why, and what you can do about it.`,
    sections,
    override,
  }
}
