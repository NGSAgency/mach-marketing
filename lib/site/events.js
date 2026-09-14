'use client'

import { useEffect } from 'react'

// The three things worth counting on a client site. Everything here is a no-op
// unless the site is loading its analytics tags, so concepts and private
// previews never reach a client's property.
//
//   form_submit     the contact form actually sent        method: form
//   click_to_call   a tel: link was tapped                method: phone
//   click_to_email  a mailto: link was clicked            method: email
//
// GA4 attributes every event to the page it happened on, so nothing here
// carries a path: "which pages produce leads" is a built-in dimension.
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, params)
  } catch {
    // Analytics must never break a page a customer is trying to use.
  }
}

// One listener for the whole site rather than a handler on every link: the
// phone number appears in headers, mobile bars, footers and half the page
// bodies, and a family added later shouldn't have to remember any of this.
export default function LeadEvents() {
  useEffect(() => {
    function onClick(e) {
      const link = e.target?.closest?.('a[href^="tel:"], a[href^="mailto:"]')
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (href.startsWith('tel:')) {
        // The number that was tapped, so a client with more than one line or
        // location can tell them apart.
        trackEvent('click_to_call', { method: 'phone', phone_number: href.slice(4).trim().slice(0, 100) })
      } else if (href.startsWith('mailto:')) {
        trackEvent('click_to_email', { method: 'email' })
      }
    }
    // Capture, so the event is sent before a tel: link takes the browser away.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  return null
}
