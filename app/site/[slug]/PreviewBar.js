'use client'

import { useState } from 'react'

// The bar across the top of a private preview. The client reviews every page,
// suggests changes, and approves the site from here; Command Center won't
// publish until they have (and every page has been checked).
//
// It sits in the page flow, above the site's own header, so it never covers
// the site or shifts its sticky header.

const C = { bg: '#0b1f44', text: '#ffffff', dim: '#c9d6ee', field: '#ffffff', fieldText: '#0b1320', border: 'rgba(255,255,255,0.35)', ok: '#9be7b4', err: '#ffc9c9' }
const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
const btn = { font: `600 14px/1 ${font}`, padding: '10px 16px', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap' }

export default function PreviewBar({ slug, businessName, approvedAt, approvedBy }) {
  const [open, setOpen] = useState(null) // 'approve' | 'feedback' | null
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')
  const [approved, setApproved] = useState(approvedAt ? { at: approvedAt, by: approvedBy } : null)
  const [sentFeedback, setSentFeedback] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') || '').trim()
    const message = String(f.get('message') || '').trim()
    setState('sending'); setError('')
    try {
      const res = await fetch('/api/site-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, action: open, name, message, page: window.location.pathname }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'That did not send. Please try again.')
      if (open === 'approve') setApproved({ at: new Date().toISOString(), by: name })
      else setSentFeedback(true)
      setOpen(null); setState('idle')
    } catch (err) {
      setError(err.message); setState('idle')
    }
  }

  const when = approved ? new Date(approved.at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : null

  return (
    <div role="region" aria-label="Website preview" style={{ background: C.bg, color: C.text, fontFamily: font, fontSize: 14, lineHeight: 1.5, position: 'relative', zIndex: 100 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '12px clamp(16px, 4vw, 40px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 18px' }}>
        <span style={{ font: `700 11px/1 ${font}`, letterSpacing: '0.12em', textTransform: 'uppercase', border: `1px solid ${C.border}`, borderRadius: 4, padding: '5px 8px' }}>Preview</span>
        <span style={{ flex: '1 1 320px' }}>
          {approved
            ? <>Approved by {approved.by} on {when}. We&apos;ll be in touch to schedule the launch.</>
            : <>This is the private preview of {businessName ? `${businessName}'s` : 'your'} new website. It isn&apos;t live yet. Every page and the contact form work.</>}
          {sentFeedback && <span style={{ color: C.ok }}> Thanks, your note is with the team.</span>}
        </span>
        <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => { setOpen(open === 'feedback' ? null : 'feedback'); setError('') }} aria-expanded={open === 'feedback'} style={{ ...btn, background: 'transparent', color: C.text, border: `1px solid ${C.border}` }}>Suggest a change</button>
          {!approved && (
            <button type="button" onClick={() => { setOpen(open === 'approve' ? null : 'approve'); setError('') }} aria-expanded={open === 'approve'} style={{ ...btn, background: C.text, color: C.bg, border: `1px solid ${C.text}` }}>Approve this site</button>
          )}
        </span>
      </div>

      {open && (
        <form onSubmit={submit} style={{ maxWidth: 1240, margin: '0 auto', padding: '4px clamp(16px, 4vw, 40px) 18px', display: 'grid', gap: 12 }}>
          <p style={{ margin: 0, color: C.dim, maxWidth: '70ch' }}>
            {open === 'approve'
              ? 'Approving tells us the site is ready to launch as it is. Please look through each page first. We will still check with you before it goes live.'
              : `Tell us what you'd like changed. We'll note that you were on ${typeof window !== 'undefined' ? window.location.pathname.replace(`/site/${slug}`, '') || 'the home page' : 'this page'}.`}
          </p>
          <label style={{ display: 'grid', gap: 6, maxWidth: 360 }}>
            <span style={{ fontWeight: 600 }}>Your name</span>
            <input name="name" required autoComplete="name" style={{ font: `16px ${font}`, padding: '10px 12px', borderRadius: 6, border: 'none', background: C.field, color: C.fieldText }} />
          </label>
          <label style={{ display: 'grid', gap: 6, maxWidth: 640 }}>
            <span style={{ fontWeight: 600 }}>{open === 'approve' ? 'Anything else we should know? (optional)' : 'What should change?'}</span>
            <textarea name="message" rows={4} required={open === 'feedback'} style={{ font: `16px ${font}`, padding: '10px 12px', borderRadius: 6, border: 'none', background: C.field, color: C.fieldText, resize: 'vertical' }} />
          </label>
          {error && <div role="alert" style={{ color: C.err }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button type="submit" disabled={state === 'sending'} style={{ ...btn, background: C.text, color: C.bg, border: `1px solid ${C.text}`, opacity: state === 'sending' ? 0.7 : 1 }}>
              {state === 'sending' ? 'Sending…' : open === 'approve' ? 'Approve the site' : 'Send to the team'}
            </button>
            <button type="button" onClick={() => setOpen(null)} style={{ ...btn, background: 'transparent', color: C.text, border: `1px solid ${C.border}` }}>Cancel</button>
          </div>
        </form>
      )}
      <style>{`[aria-label="Website preview"] button:focus-visible, [aria-label="Website preview"] input:focus-visible, [aria-label="Website preview"] textarea:focus-visible { outline: 3px solid #9ec5ff; outline-offset: 2px; }`}</style>
    </div>
  )
}
