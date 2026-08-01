"use client"
import { useState, useEffect } from 'react'

export function MobileMenu({ items, phoneNumber, phoneDisplay, accent, bg, text, textDim, borderColor, fontFamily = 'inherit' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* DESKTOP NAV - hidden on mobile via mach-nav-desktop class */}
      <nav className="mach-nav-desktop">
        {items.map(item => (
          <a key={item.href} href={item.href} style={{ color: textDim, textDecoration: 'none', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, fontFamily }}>
            {item.label}
          </a>
        ))}
        {phoneNumber && (
          <a href={`tel:${phoneNumber}`} style={{ background: accent, color: bg, textDecoration: 'none', padding: '10px 18px', fontFamily, fontSize: 14, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: 4, whiteSpace: 'nowrap' }}>
            ☎ {phoneDisplay}
          </a>
        )}
      </nav>

      {/* MOBILE NAV - visible only on mobile via mach-nav-mobile class */}
      <div className="mach-nav-mobile">
        {phoneNumber && (
          <a href={`tel:${phoneNumber}`} style={{ background: accent, color: bg, textDecoration: 'none', padding: '9px 14px', fontFamily, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: 4, whiteSpace: 'nowrap' }}>
            ☎ Call
          </a>
        )}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
          style={{ background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: 4, padding: '9px 11px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}
        >
          <span style={{ display: 'block', width: 20, height: 2, background: text, transition: 'all 0.2s' }} />
          <span style={{ display: 'block', width: 20, height: 2, background: text, transition: 'all 0.2s' }} />
          <span style={{ display: 'block', width: 20, height: 2, background: text, transition: 'all 0.2s' }} />
        </button>
      </div>

      {open && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: bg, zIndex: 100, padding: '72px 20px 24px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: 4, padding: '8px 12px', cursor: 'pointer', color: text, fontSize: 18, fontWeight: 300, lineHeight: 1 }}
          >
            ✕
          </button>
          {items.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ color: text, textDecoration: 'none', fontSize: 22, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontFamily, padding: '18px 0', borderBottom: `1px solid ${borderColor}`, display: 'block' }}
            >
              {item.label}
            </a>
          ))}
          {phoneNumber && (
            <a
              href={`tel:${phoneNumber}`}
              onClick={() => setOpen(false)}
              style={{ background: accent, color: bg, textDecoration: 'none', padding: '18px 28px', fontFamily, fontSize: 17, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 20 }}
            >
              <span style={{ fontSize: 20 }}>☎</span> {phoneDisplay}
            </a>
          )}
        </div>
      )}
    </>
  )
}
