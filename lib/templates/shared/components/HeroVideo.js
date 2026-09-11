'use client'

import { useEffect, useRef, useState } from 'react'

// Video only where it costs little and can't bother anyone: a screen at least
// tablet-wide, no request for reduced motion, no data saver. Everyone else
// keeps the still image HeroMedia already rendered underneath.
const WANTS_VIDEO = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

/**
 * The business's own looping hero video, with a visible pause button.
 *
 * WCAG 2.2.2 (AA): anything that starts on its own, moves for more than five
 * seconds and sits beside other content needs a way to pause it, and a
 * reduced-motion setting alone doesn't count. The button stays in the corner,
 * away from the headline and buttons.
 */
export default function HeroVideo({ url, poster, style }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(WANTS_VIDEO)
    const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData === true
    if (!mq.matches || saveData) return
    // Wait for the page (and its hero image) to finish loading, so the video
    // never competes with it for bandwidth.
    const start = () => setShow(true)
    if (document.readyState === 'complete') { start(); return }
    window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!show || !v) return
    const p = v.play()
    // Autoplay can still be refused (low power mode, browser policy). The
    // still image underneath stays, so the hero never goes blank.
    if (p && p.catch) p.catch(() => setShow(false))
  }, [show])

  if (!show) return null

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) { v.play().catch(() => {}); setPaused(false) } else { v.pause(); setPaused(true) }
  }

  return (
    <>
      <video
        ref={ref}
        src={url}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={style}
      />
      <button
        type="button"
        className="hero-video-toggle"
        onClick={toggle}
        aria-label={paused ? 'Play background video' : 'Pause background video'}
        style={{
          position: 'absolute', right: 16, bottom: 16, zIndex: 3,
          width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.7)',
          background: 'rgba(0,0,0,0.6)', color: '#ffffff', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0,
        }}
      >
        {paused ? (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" fill="currentColor" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" /></svg>
        )}
      </button>
      <style>{`.hero-video-toggle:focus-visible{outline:3px solid #ffffff;outline-offset:2px;box-shadow:0 0 0 5px rgba(0,0,0,0.6)}`}</style>
    </>
  )
}
