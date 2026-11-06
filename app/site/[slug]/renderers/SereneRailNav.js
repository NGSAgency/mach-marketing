'use client'
import { useEffect, useState } from 'react'

// The page's section list in the side rail, with the section being read
// marked. Server-rendered with the first section marked; once the page is
// live it follows the scroll.
export default function SereneRailNav({ items, colors }) {
  const [current, setCurrent] = useState(items[0]?.id)
  useEffect(() => {
    const els = items.map(it => document.getElementById(it.id)).filter(Boolean)
    if (!els.length) return
    // The current section is the last one whose top has passed just under
    // the sticky header; at the very bottom of the page, the last section.
    // (An IntersectionObserver picked the topmost section still in view,
    // which after a jump was the one before.)
    // A short timer rather than requestAnimationFrame, which some browsers
    // pause for a page that is not being painted
    let timer = 0
    const update = () => {
      timer = 0
      const line = 170
      let cur = els[0].id
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = els[els.length - 1].id
      setCurrent(cur)
    }
    const onScroll = () => { if (!timer) timer = setTimeout(update, 60) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (timer) clearTimeout(timer) }
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
