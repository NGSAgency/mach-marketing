'use client'

import { useState } from 'react'

/**
 * Collapsed by default.
 *
 * A dozen open answers is inherently busy regardless of how it is laid out.
 * Collapsed, the same content becomes a scannable list of questions, and the
 * reader opens only what they came for. Answers stay in the DOM so FAQ schema
 * and crawlers still see them.
 */
export default function FAQAccordion({ items = [], tokens: T }) {
  const [open, setOpen] = useState(0)

  return (
    <div>
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i} style={{ borderTop: `1px solid ${T.borderLight}` }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '26px 0',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 24,
                cursor: 'pointer',
                textAlign: 'left',
                color: 'inherit',
                fontFamily: 'inherit',
              }}
            >
              <span style={{
                fontFamily: T.display,
                fontSize: 'clamp(18px, 2.1vw, 24px)',
                fontWeight: 300,
                lineHeight: 1.3,
                color: T.text,
                letterSpacing: '-0.01em',
              }}>
                {f.question}
              </span>
              <span style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: T.accent,
                fontSize: 22,
                fontWeight: 200,
                lineHeight: 1,
                transform: isOpen ? 'rotate(45deg)' : 'none',
                transition: 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                +
              </span>
            </button>

            <div style={{
              maxHeight: isOpen ? 600 : 0,
              overflow: 'hidden',
              transition: 'max-height 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <p style={{
                fontSize: 16,
                lineHeight: 1.85,
                color: T.textDim,
                margin: '0 0 28px',
                maxWidth: 680,
                paddingRight: 52,
              }}>
                {f.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
