'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'service', label: 'Service page' },
  { id: 'combo', label: 'Local page' },
]

export default function MockupNav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      let current = 'home'
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 120) current = s.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 88, behavior: 'smooth' })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 44,
      left: 0,
      right: 0,
      zIndex: 99998,
      background: 'rgba(5,5,8,0.92)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      justifyContent: 'center',
      gap: 4,
      padding: '8px 12px',
      fontFamily: '-apple-system, "Helvetica Neue", Arial, sans-serif',
    }}>
      {SECTIONS.map(s => (
        <button
          key={s.id}
          onClick={() => go(s.id)}
          style={{
            background: active === s.id ? 'rgba(255,255,255,0.14)' : 'transparent',
            color: active === s.id ? '#fff' : 'rgba(255,255,255,0.6)',
            border: 'none',
            padding: '6px 14px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: active === s.id ? 700 : 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
