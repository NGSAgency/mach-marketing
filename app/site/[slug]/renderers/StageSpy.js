'use client'
import { useEffect } from 'react'

/**
 * Tells the panel which chapter is being read.
 *
 * Every chapter's caption and facts are already on the page, server-rendered
 * and hidden; this only moves the `data-on` marker between them. So a visitor
 * whose JavaScript never runs still gets chapter one's panel and every link on
 * the page, which is the whole reason it works this way rather than fetching
 * or building markup.
 *
 * It is called straight from the scroll event on purpose. An earlier version
 * queued the work on requestAnimationFrame behind a flag, and when the browser
 * throttled frames the flag never cleared and the panel stopped following the
 * page for the rest of the session.
 */
export default function StageSpy() {
  useEffect(() => {
    const chaps = Array.from(document.querySelectorAll('[data-stage-chap]'))
    if (chaps.length === 0) return
    const pick = (attr, id) => Array.from(document.querySelectorAll(`[${attr}]`))
      .forEach(el => {
        const on = el.getAttribute(attr) === id
        el.toggleAttribute('data-on', on)
        if (attr === 'data-stage-cap' || attr === 'data-stage-board') el.style.display = on ? 'block' : 'none'
        if (attr === 'data-stage-dot' || attr === 'data-stage-toc') el.classList.toggle('on', on)
      })

    let current = null
    const apply = (sec) => {
      const id = sec.getAttribute('data-stage-chap')
      if (id === current) return
      current = id
      pick('data-stage-cap', id)
      pick('data-stage-board', id)
      pick('data-stage-dot', id)
      pick('data-stage-toc', id)
      const shot = sec.getAttribute('data-shot')
      if (shot != null) {
        document.querySelectorAll('[data-stage-shot]').forEach(img => {
          img.style.opacity = img.getAttribute('data-stage-shot') === shot ? '1' : '0'
        })
      }
    }

    const spy = () => {
      const mid = window.innerHeight / 2
      let found = chaps[0]
      for (const c of chaps) {
        const r = c.getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) { found = c; break }
        if (r.top > mid) break
        found = c
      }
      apply(found)
    }
    spy()
    window.addEventListener('scroll', spy, { passive: true })
    window.addEventListener('resize', spy)
    return () => {
      window.removeEventListener('scroll', spy)
      window.removeEventListener('resize', spy)
    }
  }, [])
  return null
}
