"use client"
import { useState, useEffect } from 'react'

export function MobileMenu({ items, phoneNumber, phoneDisplay, accent, bg, text, textDim, borderColor, fontFamily = 'inherit' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Inject the media-query CSS once
  const css = `
    .mach-desktop-nav { display: flex; }
    .mach-mobile-nav { display: none; }
    @media (max-width: 767px) {
      .mach-desktop-nav { display: none !important; }
      .mach-mobile-nav { display: flex !important; }
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      
      {/* DESKTOP NAV */}
      <nav className="mach-desktop-nav" style={{ alignItems: 'center', gap: 'clamp(12px, 2vw, 20px)' }}>
        {items.map(item => (
          <a key={item.href} href={item.href} style={{ color: textDim, textDecoration: 'none', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, fontFamily }}>
            {item.label}
          </a>
        ))}
        {phoneNumber && (
          <a href={`tel:${phoneNumber}`} style={{ background: accent, color: bg, textDecoration: 'none', padding: '10px 20px', fontFamily, fontSize: 15, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: 4 }}>
            ☎ {phoneDisplay}
          </a>
        )}
      </nav>

      {/* MOBILE NAV */}
      <div className="mach-mobile-nav" style={{ alignItems: 'center', gap: 8 }}>
        {phoneNumber && (
          <a href={`tel:${phoneNumber}`} style={{ background: accent, color: bg, textDecoration: 'none', padding: '10px 16px', fontFamily, fontSize: 14, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: 4, whiteSpace: 'nowrap' }}>
            ☎ Call
          </a>
        )}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: 4, padding: '10px 12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}
        >
          <span style={{ display: 'block', width: 22, height: 2, background: text, transition: 'all 0.2s', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: text, transition: 'all 0.2s', opacity: open ? 0 : 1 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: text, transition: 'all 0.2s', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {open && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: bg, zIndex: 100, padding: '80px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: 4, padding: '8px 14px', cursor: 'pointer', color: text, fontSize: 20, fontWeight: 300 }}
          >
            ✕
          </button>
          {items.map(item => (
            
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ color: text, textDecoration: 'none', fontSize: 24, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontFamily, padding: '20px 0', borderBottom: `1px solid ${borderColor}`, display: 'block' }}
            >
              {item.label}
            </a>
          ))}
          {phoneNumber && (
            
              href={`tel:${phoneNumber}`}
              onClick={() => setOpen(false)}
              style={{ background: accent, color: bg, textDecoration: 'none', padding: '20px 32px', fontFamily, fontSize: 18, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 24 }}
            >
              <span style={{ fontSize: 22 }}>☎</span> {phoneDisplay}
            </a>
          )}
        </div>
      )}
    </>
  )
}
