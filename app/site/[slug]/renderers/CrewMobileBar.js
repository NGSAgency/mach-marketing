'use client'

import { useEffect, useState } from 'react'

/**
 * Call and quote buttons pinned to the bottom of the screen on phones, shown
 * once the hero (which already has both) has scrolled away.
 */
export default function CrewMobileBar({ phone, phoneDisplay, quoteHref, colors, fontFamily }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="crew-mobilebar" aria-hidden={!show} style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60,
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
      padding: '10px 12px calc(10px + env(safe-area-inset-bottom))',
      background: colors.bgTranslucent, backdropFilter: 'blur(12px)',
      borderTop: `1px solid ${colors.border}`,
      transform: show ? 'translateY(0)' : 'translateY(110%)',
      transition: 'transform 220ms ease',
      fontFamily,
    }}>
      {phone && (
        <a href={`tel:${phone}`} style={{ background: colors.accent, color: colors.onAccent, borderRadius: 8, padding: '14px 12px', textAlign: 'center', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
          Call {phoneDisplay}
        </a>
      )}
      <a href={quoteHref} style={{ background: colors.inverseBg, color: colors.inverseText, borderRadius: 8, padding: '14px 12px', textAlign: 'center', fontWeight: 700, fontSize: 16, textDecoration: 'none', gridColumn: phone ? 'auto' : '1 / -1' }}>
        Get a quote
      </a>
    </div>
  )
}
