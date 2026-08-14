"use client"

import { useState } from 'react'
import { AHeader, AFooter, MeshBg, aTokens as T } from '../shell.js'

export default function AContact() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      e.currentTarget.reset()
    } catch (err) {
      setStatus('error')
      setError('Something went wrong. Please email us directly at hello@machdigitalsolutions.com')
    }
  }

  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ position: 'relative', padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Contact</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -4, lineHeight: 0.98, margin: '0 auto 32px', maxWidth: 800 }}>
            Let's <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>start</span>.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto', maxWidth: 640 }}>
            Tell us about your business and what you're looking to achieve. We respond within one business day.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 6vw, 64px) clamp(16px, 4vw, 32px) clamp(80px, 12vw, 120px)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(32px, 6vw, 64px)' }}>
          <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, padding: 'clamp(28px, 4vw, 40px)' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 12px 0', color: T.fg }}>Message sent</h3>
                <p style={{ fontSize: 15, color: T.fgDim, lineHeight: 1.6, margin: 0 }}>Thanks for reaching out. We'll respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Your name <span style={{ color: T.accent1 }}>*</span></label>
                  <input required name="name" type="text" minLength={2} maxLength={100} style={{ width: '100%', background: T.bgAlt, border: `1px solid ${T.borderStrong}`, borderRadius: 10, padding: '14px 18px', fontSize: 15, fontFamily: 'Geist, system-ui, sans-serif', color: T.fg, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Company <span style={{ color: T.accent1 }}>*</span></label>
                  <input required name="company" type="text" minLength={2} maxLength={200} style={{ width: '100%', background: T.bgAlt, border: `1px solid ${T.borderStrong}`, borderRadius: 10, padding: '14px 18px', fontSize: 15, fontFamily: 'Geist, system-ui, sans-serif', color: T.fg, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Email <span style={{ color: T.accent1 }}>*</span></label>
                  <input required name="email" type="email" style={{ width: '100%', background: T.bgAlt, border: `1px solid ${T.borderStrong}`, borderRadius: 10, padding: '14px 18px', fontSize: 15, fontFamily: 'Geist, system-ui, sans-serif', color: T.fg, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Phone <span style={{ color: T.accent1 }}>*</span></label>
                  <input required name="phone" type="tel" inputMode="tel" pattern="[\\d\\s\\-\\(\\)\\+\\.]{10,20}" title="Please enter a valid phone number" placeholder="(555) 123-4567" style={{ width: '100%', background: T.bgAlt, border: `1px solid ${T.borderStrong}`, borderRadius: 10, padding: '14px 18px', fontSize: 15, fontFamily: 'Geist, system-ui, sans-serif', color: T.fg, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Tell us about your business <span style={{ color: T.accent1 }}>*</span></label>
                  <textarea required name="message" rows={4} style={{ width: '100%', background: T.bgAlt, border: `1px solid ${T.borderStrong}`, borderRadius: 10, padding: '14px 18px', fontSize: 15, fontFamily: 'Geist, system-ui, sans-serif', color: T.fg, outline: 'none', resize: 'vertical' }} />
                </div>
                {status === 'error' && <div style={{ fontSize: 13, color: '#ef4444', padding: 12, background: '#ef444410', borderRadius: 8 }}>{error}</div>}
                <button type="submit" disabled={status === 'submitting'} style={{ background: T.fg, color: T.bg, padding: '14px 24px', borderRadius: 10, fontSize: 15, fontWeight: 600, border: 'none', cursor: status === 'submitting' ? 'wait' : 'pointer', justifySelf: 'start', boxShadow: `0 0 30px ${T.glowPurple}`, opacity: status === 'submitting' ? 0.7 : 1 }}>
                  {status === 'submitting' ? 'Sending...' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
          <div>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Email</div>
              <a href="mailto:hello@machdigitalsolutions.com" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: T.fg, textDecoration: 'none', fontWeight: 500, wordBreak: 'break-word' }}>hello@machdigitalsolutions.com</a>
            </div>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: T.accent2, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Offices</div>
              <div style={{ fontSize: 16, marginBottom: 6, fontWeight: 500 }}>Kansas City</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Boston</div>
            </div>
            <div style={{ padding: 24, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16 }}>
              <div style={{ fontSize: 11, color: T.accent3, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Response</div>
              <div style={{ fontSize: 14, color: T.fgDim, lineHeight: 1.6 }}>Within one business day, every time.</div>
            </div>
          </div>
        </div>
      </section>
      <AFooter />
    </div>
  )
}
