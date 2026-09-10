'use client'

import { useState } from 'react'

/**
 * The contact form on client sites. The forms used to be plain <form> tags
 * with no handler, so "Send" reloaded the page and the message went nowhere.
 * This posts to /api/site-lead, which hands it to Command Center to email the
 * client (and the agency, when the client has that on).
 *
 * On a concept there is no client to email, so the form shows what it would
 * do and sends nothing.
 *
 * Colours come from the family's roles so it reads on any palette:
 *   colors: { text, textDim, textMuted, border, field, fieldText, accent, onAccent, success, urgent }
 */
export default function ContactForm({ slug, concept = false, colors, fonts = {}, radius = 6, submitLabel = 'Send' }) {
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    if (concept) { setState('sent'); return }
    const form = new FormData(e.currentTarget)
    const body = Object.fromEntries(form.entries())
    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/site-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, slug, page: typeof window !== 'undefined' ? window.location.pathname : null }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        // A 400 is something the visitor can fix; anything else is on our side.
        const err = new Error(data.error || 'Your message could not be sent.')
        err.fixable = res.status === 400
        throw err
      }
      setState('sent')
    } catch (err) {
      setError(err.fixable ? err.message : `${err.message || 'Your message could not be sent.'} Please call us instead, or try again.`)
      setState('error')
    }
  }

  const label = { display: 'block', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.textDim, marginBottom: 8, fontFamily: fonts.body }
  const field = {
    width: '100%', boxSizing: 'border-box', background: colors.field, color: colors.fieldText || colors.text,
    border: `1px solid ${colors.border}`, borderRadius: radius, padding: '13px 14px', fontSize: 16, fontFamily: fonts.body,
  }

  if (state === 'sent') {
    return (
      <div role="status" style={{ border: `1px solid ${colors.border}`, borderRadius: radius, padding: 28, color: colors.text, fontFamily: fonts.body }}>
        <div style={{ fontSize: 20, marginBottom: 8, fontFamily: fonts.display }}>
          {concept ? 'On the live site, this sends' : 'Thank you. Your message is on its way.'}
        </div>
        <div style={{ color: colors.textDim, lineHeight: 1.7 }}>
          {concept
            ? 'Messages from this form go straight to your inbox, with the page they were sent from.'
            : "We'll be in touch soon."}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 18, fontFamily: fonts.body }}>
      <div>
        <label htmlFor="cf-name" style={label}>Name</label>
        <input id="cf-name" name="name" required autoComplete="name" style={field} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 18 }}>
        <div>
          <label htmlFor="cf-phone" style={label}>Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" style={field} />
        </div>
        <div>
          <label htmlFor="cf-email" style={label}>Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" style={field} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" style={label}>Message</label>
        <textarea id="cf-message" name="message" rows={5} required style={{ ...field, resize: 'vertical' }} />
      </div>
      {/* Honeypot: people never see or fill this; simple bots do. */}
      <input name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      {state === 'error' && (
        <div role="alert" style={{ color: colors.urgent || colors.text, fontSize: 14, lineHeight: 1.6 }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        style={{
          justifySelf: 'start', background: colors.accent, color: colors.onAccent, border: 'none', borderRadius: radius,
          padding: '15px 34px', fontSize: 15, letterSpacing: '0.04em', cursor: 'pointer', fontFamily: fonts.body,
          opacity: state === 'sending' ? 0.7 : 1,
        }}
      >
        {state === 'sending' ? 'Sending…' : submitLabel}
      </button>
      <div style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.6 }}>
        Leave a phone number or an email so we can reply.
      </div>
    </form>
  )
}
