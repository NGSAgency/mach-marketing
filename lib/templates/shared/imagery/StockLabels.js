'use client'

import { useEffect } from 'react'

// Stock photos are served from Unsplash's CDN; the business's own photos
// never are, so the host identifies them without every renderer having to
// pass a flag through.
const IS_STOCK = (src) => /(^|\/\/)images\.unsplash\.com\//.test(src || '')

/**
 * On concepts, puts a small "Sample photo" tag on every stock photo so a
 * prospect knows their own photos go there. Tags sit in one overlay layer on
 * top of the page, positioned over the visible part of each image, so no
 * renderer changes and nothing inside a photo's text container is touched.
 */
export default function StockLabels() {
  useEffect(() => {
    const layer = document.createElement('div')
    layer.setAttribute('aria-hidden', 'true')
    layer.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;z-index:30;pointer-events:none'
    document.body.appendChild(layer)

    // The part of an image actually on screen: cropped by any ancestor that
    // clips its overflow (cover images are often larger than their frame).
    const visibleRect = (img) => {
      let r = img.getBoundingClientRect()
      let box = { left: r.left, top: r.top, right: r.right, bottom: r.bottom }
      for (let el = img.parentElement; el && el !== document.body; el = el.parentElement) {
        const cs = getComputedStyle(el)
        if (/(hidden|clip|auto|scroll)/.test(cs.overflow + cs.overflowX + cs.overflowY)) {
          const p = el.getBoundingClientRect()
          box = { left: Math.max(box.left, p.left), top: Math.max(box.top, p.top), right: Math.min(box.right, p.right), bottom: Math.min(box.bottom, p.bottom) }
        }
      }
      return box.right - box.left > 60 && box.bottom - box.top > 40 ? box : null
    }

    let frame = 0
    const draw = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        layer.textContent = ''
        for (const img of document.images) {
          if (!IS_STOCK(img.currentSrc || img.src) || !img.offsetParent) continue
          const box = visibleRect(img)
          if (!box) continue
          const tag = document.createElement('span')
          tag.textContent = 'Sample photo'
          tag.style.cssText = [
            'position:absolute',
            `left:${box.left + window.scrollX + 10}px`,
            `top:${box.bottom + window.scrollY - 30}px`,
            'background:#111418', 'color:#ffffff', 'font:600 11px/1 system-ui,-apple-system,sans-serif',
            'letter-spacing:.04em', 'padding:6px 9px', 'border-radius:4px', 'white-space:nowrap',
          ].join(';')
          layer.appendChild(tag)
        }
      })
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(document.body)
    // Redrawing the layer is itself a mutation; only react to the page's own.
    const mo = new MutationObserver(records => { if (records.some(r => !layer.contains(r.target))) draw() })
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'class', 'style'] })
    window.addEventListener('load', draw)
    for (const img of document.images) if (!img.complete) img.addEventListener('load', draw, { once: true })
    return () => { ro.disconnect(); mo.disconnect(); window.removeEventListener('load', draw); cancelAnimationFrame(frame); layer.remove() }
  }, [])
  return null
}
