'use client'

import { useState } from 'react'
import { trackEvent } from '../../../site/events.js'

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
 *
 * options is the site config's lead_form: { photos, vehicle, insurance,
 * max_photos, locations: [{ id, name }] }. Photo estimates (auto body,
 * November 2026): photos are shrunk in the browser to 1600px before sending,
 * so a 6MB phone photo goes as a few hundred KB and the request stays well
 * under the server's size limit.
 */
const PHOTO_EDGE = 1600

async function shrinkPhoto(file) {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () => reject(new Error(`${file.name || 'That file'} could not be opened as a photo. Try a JPG or a screenshot.`))
      el.src = url
    })
    // Five photos have to fit one request (about 4.5MB), so each is kept
    // under about 700KB as sent: smaller, then softer, until it fits
    for (const edge of [PHOTO_EDGE, 1200, 900]) {
      const scale = Math.min(1, edge / Math.max(img.naturalWidth, img.naturalHeight))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.naturalWidth * scale)
      canvas.height = Math.round(img.naturalHeight * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      for (const q of [0.82, 0.7, 0.58]) {
        const data = canvas.toDataURL('image/jpeg', q)
        if (data.length < 700000) return data
      }
    }
    throw new Error('That photo is too large. Try a smaller one.')
  } finally {
    URL.revokeObjectURL(url)
  }
}

export default function ContactForm({ slug, concept = false, colors, fonts = {}, radius = 6, submitLabel = 'Send', rows = 5, options = null }) {
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [photos, setPhotos] = useState([]) // [{ id, data }]
  const [photoBusy, setPhotoBusy] = useState(false)
  const [photoError, setPhotoError] = useState('')
  const opt = options || {}
  const maxPhotos = opt.max_photos || 5
  const locations = Array.isArray(opt.locations) ? opt.locations : []
  const estimate = opt.photos || opt.vehicle

  async function addPhotos(e) {
    const files = [...(e.target.files || [])]
    e.target.value = ''
    if (!files.length) return
    setPhotoError('')
    const room = maxPhotos - photos.length
    if (files.length > room) setPhotoError(`Up to ${maxPhotos} photos. The first ${Math.max(room, 0)} were added.`)
    setPhotoBusy(true)
    const added = []
    for (const f of files.slice(0, Math.max(room, 0))) {
      try { added.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, data: await shrinkPhoto(f) }) }
      catch (err) { setPhotoError(err.message) }
    }
    setPhotos(p => [...p, ...added].slice(0, maxPhotos))
    setPhotoBusy(false)
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (concept) { setState('sent'); return }
    const form = new FormData(e.currentTarget)
    form.delete('photo_picker')
    const body = Object.fromEntries(form.entries())
    if (photos.length) body.photos = photos.map(p => ({ data: p.data }))
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
      // A lead only counts once it has actually reached the client.
      trackEvent('form_submit', { method: 'form', ...(photos.length ? { photos: photos.length } : {}) })
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
          {concept ? 'On the live site, this sends' : photos.length ? 'Thank you. Your photos and message are on their way.' : 'Thank you. Your message is on its way.'}
        </div>
        <div style={{ color: colors.textDim, lineHeight: 1.7 }}>
          {concept
            ? `Messages from this form go straight to your inbox, with the page they were sent from${opt.photos ? ' and any photos attached' : ''}.`
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
      {opt.preset && <input type="hidden" name="location" value={opt.preset} />}
      {locations.length > 1 && !opt.preset && (
        <div>
          <label htmlFor="cf-location" style={label}>Which location?</label>
          <select id="cf-location" name="location" required defaultValue="" style={field}>
            <option value="" disabled>Choose one</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>
      )}
      {opt.vehicle && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 18 }}>
          <div>
            <label htmlFor="cf-vehicle" style={label}>Vehicle</label>
            <input id="cf-vehicle" name="vehicle" placeholder="Year, make and model" style={field} />
          </div>
          <div>
            <label htmlFor="cf-vin" style={label}>VIN (optional)</label>
            <input id="cf-vin" name="vin" maxLength={17} autoCapitalize="characters" style={field} />
          </div>
        </div>
      )}
      {opt.insurance && (
        <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
          <legend style={{ ...label, padding: 0 }}>Is this an insurance claim?</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, color: colors.text, fontSize: 15 }}>
            {[['yes', 'Yes'], ['no', 'No'], ['not sure', 'Not sure']].map(([v, t]) => (
              <label key={v} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="radio" name="insurance" value={v} /> {t}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div>
        <label htmlFor="cf-message" style={label}>{estimate ? 'What happened?' : 'Message'}</label>
        <textarea id="cf-message" name="message" rows={rows} required placeholder={estimate ? 'Where the damage is and how it happened' : undefined} style={{ ...field, resize: 'vertical' }} />
      </div>
      {opt.photos && (
        <div>
          <label htmlFor="cf-photos" style={label}>Photos{photos.length ? ` (${photos.length} of ${maxPhotos})` : ''}</label>
          {photos.length > 0 && (
            <ul style={{ listStyle: 'none', margin: '0 0 12px', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {photos.map((p, i) => (
                <li key={p.id} style={{ position: 'relative' }}>
                  <img src={p.data} alt={`Photo ${i + 1}`} style={{ width: 84, height: 84, objectFit: 'cover', borderRadius: radius, border: `1px solid ${colors.border}`, display: 'block' }} />
                  <button type="button" onClick={() => setPhotos(ps => ps.filter(x => x.id !== p.id))} aria-label={`Remove photo ${i + 1}`}
                    style={{ position: 'absolute', top: -8, right: -8, width: 26, height: 26, borderRadius: '50%', border: `1px solid ${colors.border}`, background: colors.field, color: colors.fieldText || colors.text, cursor: 'pointer', fontSize: 15, lineHeight: '22px', padding: 0 }}>×</button>
                </li>
              ))}
            </ul>
          )}
          {photos.length < maxPhotos && (
            <label className="mach-photo-pick" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px dashed ${colors.border}`, borderRadius: radius, padding: '12px 16px', color: colors.text, cursor: photoBusy ? 'progress' : 'pointer', fontSize: 15 }}>
              <input id="cf-photos" name="photo_picker" type="file" accept="image/*" multiple onChange={addPhotos} disabled={photoBusy}
                style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden' }} />
              {photoBusy ? 'Adding photos…' : photos.length ? 'Add more photos' : 'Add photos of the damage'}
            </label>
          )}
          <style>{'.mach-photo-pick:focus-within{outline:2px solid currentColor;outline-offset:2px}'}</style>
          <div role={photoError ? 'alert' : undefined} style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.6, marginTop: 8 }}>
            {photoError || `Up to ${maxPhotos}. A wide shot and a close-up of each dent help most.`}
          </div>
        </div>
      )}
      {/* Honeypot: people never see or fill this; simple bots do. */}
      <input name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      {state === 'error' && (
        <div role="alert" style={{ color: colors.urgent || colors.text, fontSize: 14, lineHeight: 1.6 }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={state === 'sending' || photoBusy}
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
