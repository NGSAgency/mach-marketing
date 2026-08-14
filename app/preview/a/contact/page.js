"use client"

import { useState } from 'react'
import { AHeader, AFooter, MeshBg, aTokens as T } from '../shell.js'

function formatPhone(input) {
  // Strip all non-digits, cap at 10
  const digits = input.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

export default function AContact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function updateField(name, value) {
    if (name === 'phone') value = formatPhone(value)
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const rawText = await res.text()
      let data = {}
      try { data = JSON.parse(rawText) } catch { data = { raw: rawText } }
      if (!res.ok) {
        setStatus('error')
        setError('HTTP ' + res.status + ' — ' + (data.error || rawText || 'unknown error'))
        return
      }
      setStatus('success')
      setForm({ name: '', company: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError('Network error: ' + err.message)
    }
  }

  const inputStyle = { width: '100%', background: T.bgAlt, border: `1px solid ${T.borderStrong}`, borderRadius: 10, padding: '14px 18px', fontSize: 15, fontFamily: 'Geist, system-ui, sans-serif', color: T.fg, outline: 'none' }
  const labelStyle = { display: 'block', fontSize: 12, color: T.fgMuted, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }
  const req = <span style={{ color: T.accent1 }}>*</span>

  return (
    <div style={{ background: T.bg, color: T.fg, minHeight: '100vh', fontFamily: 'Geist, system-ui, sans-serif' }}>
      <AHeader />
      <section style={{ position: 'relative', padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)', overflow: 'hidden' }}>
        <MeshBg />
        <div style={{ maxWidth: 'min(1200px, 100%)', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: T.accent1, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Contact</div>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 96px)', fontWeight: 700, letterSpacing: -4, lineHeight: 0.98, margin: '0 auto 32px', maxWidth: 800 }}>
            Let\'s <span style={{ background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2}, ${T.accent3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>start</span>.
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: T.fgDim, lineHeight: 1.55, margin: '0 auto', maxWidth: 640 }}>
            Tell us about your business and what you\'re looking to achieve. We respond within one business day.
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
                <p style={{ fontSize: 15, color: T.fgDim, lineHeight: 1.6, margin: 0 }}>Thanks for reaching out. We\'ll respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }} noValidate>
                <div>
                  <label style={labelStyle}>Your name {req}</label>
                  <input required value={form.name} onChange={e => updateField('name', e.target.value)} type="text" minLength={2} maxLength={100} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Company {req}</label>
                  <input required value={form.company} onChange={e => updateField('company', e.target.value)} type="text" minLength={2} maxLength={200} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email {req}</label>
                  <input required value={form.email} onChange={e => updateField('email', e.target.value)} type="email" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone {req}</label>
                  <input required value={form.phone} onChange={e => updateField('phone', e.target.value)} type="tel" inputMode="numeric" placeholder="123-456-7890" pattern="\\d{3}-\\d{3}-\\d{4}" title="Format: 123-456-7890" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Tell us about your business {req}</label>
                  <textarea required value={form.message} onChange={e => updateField('message', e.target.value)} rows={4} minLength={10} style={{...inputStyle, resize: 'vertical'}} />
                </div>
                {status === 'error' && (
                  <div style={{ fontSize: 13, color: '#fca5a5', padding: 14, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, wordBreak: 'break-word', lineHeight: 1.5 }}>
                    <strong>Error:</strong> {error || 'Unknown error occurred'}
                  </div>
                )}
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
