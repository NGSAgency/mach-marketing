'use client'

/**
 * Layout switcher for a concept.
 *
 * Content is generated once and rendered through each suited family, in the
 * prospect's own palette and at the same lightness, so the only thing that
 * changes between tabs is the layout. Comparing layouts only means something
 * now that every family renders every colour role from the same palette.
 *
 * Sits below the concept banner and switches via query parameter so each option
 * is linkable on its own.
 */
export default function TemplateTabs({ current, options, token }) {
  if (!options || options.length < 2) return null

  return (
    <div style={{
      position: 'fixed',
      top: 44,
      left: 0,
      right: 0,
      zIndex: 99998,
      background: 'rgba(5,5,8,0.94)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: '8px 12px',
      fontFamily: '-apple-system, "Helvetica Neue", Arial, sans-serif',
    }}>
      <span style={{
        fontSize: 11,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
        marginRight: 8,
        whiteSpace: 'nowrap',
      }}>
        Layout
      </span>

      {options.map(opt => {
        const active = opt.key === current
        return (
          <a
            key={opt.key}
            href={`/concept/${token}?t=${opt.key}`}
            style={{
              background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: active ? '#fff' : 'rgba(255,255,255,0.6)',
              border: active ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
              padding: '6px 16px',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: active ? 700 : 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {opt.label}
          </a>
        )
      })}
    </div>
  )
}
