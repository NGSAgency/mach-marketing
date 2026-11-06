'use client'
import { useEffect, useState } from 'react'

// The page's section list in the side rail, with the section being read
// marked. Server-rendered with the first section marked; once the page is
// live it follows the scroll.
export default function SereneRailNav({ items, colors }) {
  const [current, setCurrent] = useState(items[0]?.id)
  useEffect(() => {
    const els = items.map(it => document.getElementById(it.id)).filter(Boolean)
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    // A section counts as current once its top passes just under the header
    const io = new IntersectionObserver(entries => {
      const seen = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (seen[0]) setCurrent(seen[0].target.id)
    }, { rootMargin: '-150px 0px -55% 0px', threshold: 0 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [items])
  if (!items || items.length < 2) return null
  return (
    <nav aria-label="On this page">
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 2 }}>
        {items.map(it => {
          const on = it.id === current
          return (
            <li key={it.id}>
              <a href={`#${it.id}`} aria-current={on ? 'location' : undefined} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', textDecoration: 'none',
                fontSize: 14, letterSpacing: '0.01em', color: on ? colors.text : colors.textMuted, transition: 'color .2s',
              }}>
                <span aria-hidden="true" style={{ width: on ? 22 : 10, height: 1, background: on ? colors.accent : colors.border, flex: 'none', transition: 'width .2s' }} />
                {it.label}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
