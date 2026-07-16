'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SigningForm({ contract }) {
  const router = useRouter()
  const [signerName, setSignerName] = useState('')
  const [signerTitle, setSignerTitle] = useState('')
  const [signerEmail, setSignerEmail] = useState('')
  const [consented, setConsented] = useState(false)
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState('')

  const handleSign = async () => {
    setError('')
    if (!signerName.trim()) { setError('Please enter your full legal name'); return }
    if (!signerTitle.trim()) { setError('Please enter your title'); return }
    if (!consented) { setError('Please confirm you agree to sign electronically'); return }

    setSigning(true)
    try {
      const res = await fetch('/api/contracts/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: contract.signing_token,
          signerName: signerName.trim(),
          signerTitle: signerTitle.trim(),
          signerEmail: signerEmail.trim() || null,
          consented,
          userAgent: navigator.userAgent,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Signing failed')
      // Refresh to show success state
      router.refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setSigning(false)
    }
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#1F3A2E', color: 'white', padding: '20px 40px', textAlign: 'center' }}>
        <div style={{ letterSpacing: 3, fontSize: 12, fontWeight: 600 }}>MACH DIGITAL SOLUTIONS</div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        {/* Contract document */}
        <div style={{ background: 'white', padding: '60px 60px 40px', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: 30 }}>
          <div dangerouslySetInnerHTML={{ __html: contract.rendered_html }} />
        </div>

        {/* Signature block */}
        <div style={{ background: 'white', padding: 40, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#111827', fontSize: 22 }}>Sign Contract</h2>

          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', padding: 16, borderRadius: 6, marginBottom: 24 }}>
            <p style={{ margin: 0, fontSize: 13, color: '#4B5563' }}>
              By typing your name and clicking &ldquo;Sign and Accept&rdquo; below, you agree that:
            </p>
            <ul style={{ margin: '10px 0 0 20px', fontSize: 13, color: '#4B5563', paddingLeft: 0 }}>
              <li>You are authorized to sign this agreement on behalf of your organization</li>
              <li>You have read and understood the terms of this agreement</li>
              <li>Your electronic signature has the same legal effect as a handwritten signature</li>
              <li>Your IP address, timestamp, and device information will be recorded as evidence of signing</li>
            </ul>
          </div>

          {error && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#B91C1C', padding: 12, borderRadius: 6, marginBottom: 16, fontSize: 14 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Full Legal Name *</label>
              <input
                type="text"
                value={signerName}
                onChange={e => setSignerName(e.target.value)}
                placeholder="Your full legal name"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: 15, boxSizing: 'border-box', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Title *</label>
              <input
                type="text"
                value={signerTitle}
                onChange={e => setSignerTitle(e.target.value)}
                placeholder="e.g. Owner, CEO, General Manager"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email (for signed copy)</label>
              <input
                type="email"
                value={signerEmail}
                onChange={e => setSignerEmail(e.target.value)}
                placeholder="you@company.com"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 24 }}>
            <input
              type="checkbox"
              checked={consented}
              onChange={e => setConsented(e.target.checked)}
              style={{ marginTop: 3 }}
            />
            <span style={{ fontSize: 13, color: '#374151' }}>
              I agree to sign this agreement electronically and understand that my electronic signature is legally binding, equivalent to my handwritten signature.
            </span>
          </label>

          <button
            onClick={handleSign}
            disabled={signing}
            style={{
              width: '100%',
              background: signing ? '#9CA3AF' : '#1F3A2E',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 600,
              cursor: signing ? 'wait' : 'pointer',
              letterSpacing: 0.5,
            }}
          >
            {signing ? 'Signing...' : 'Sign and Accept'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 30, fontSize: 12, color: '#6B7280' }}>
          Questions? Contact <a href="mailto:chris@machdigitalsolutions.com" style={{ color: '#1F3A2E' }}>chris@machdigitalsolutions.com</a>
        </div>
      </div>
    </div>
  )
}
