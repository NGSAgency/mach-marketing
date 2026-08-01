export function MobileMenu({ items, phoneNumber, phoneDisplay, accent, bg, text, textDim, borderColor, fontFamily = 'inherit', menuId = 'mach-mobile-menu-toggle' }) {
  return (
    <>
      {/* Hidden checkbox controls menu state - CSS toggles overlay visibility */}
      <input type="checkbox" id={menuId} className="mach-menu-check" aria-hidden="true" />

      {/* Desktop nav */}
      <nav className="mach-nav-desktop">
        {items.map(item => (
          <a key={item.href} href={item.href} style={{ color: textDim, textDecoration: 'none', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, fontFamily }}>
            {item.label}
          </a>
        ))}
        {phoneNumber && (
          <a href={`tel:${phoneNumber}`} style={{ background: accent, color: bg, textDecoration: 'none', padding: '10px 18px', fontFamily, fontSize: 14, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: 4, whiteSpace: 'nowrap' }}>
            ☎ {phoneDisplay}
          </a>
        )}
      </nav>

      {/* Mobile nav - Call + hamburger label */}
      <div className="mach-nav-mobile">
        {phoneNumber && (
          <a href={`tel:${phoneNumber}`} style={{ background: accent, color: bg, textDecoration: 'none', padding: '9px 14px', fontFamily, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: 4, whiteSpace: 'nowrap' }}>
            ☎ Call
          </a>
        )}
        <label htmlFor={menuId} aria-label="Open menu" style={{ background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: 4, padding: '9px 11px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
          <span style={{ display: 'block', width: 20, height: 2, background: text }} />
          <span style={{ display: 'block', width: 20, height: 2, background: text }} />
          <span style={{ display: 'block', width: 20, height: 2, background: text }} />
        </label>
      </div>

      {/* Overlay - shown when checkbox is checked via CSS */}
      <div className="mach-mobile-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: bg, zIndex: 100, padding: '72px 20px 24px', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
        <label htmlFor={menuId} aria-label="Close menu" style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: 4, padding: '8px 12px', cursor: 'pointer', color: text, fontSize: 18, fontWeight: 300, lineHeight: 1, display: 'inline-block' }}>
          ✕
        </label>
        {items.map(item => (
          <a
            key={item.href}
            href={item.href}
            style={{ color: text, textDecoration: 'none', fontSize: 22, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontFamily, padding: '18px 0', borderBottom: `1px solid ${borderColor}`, display: 'block' }}
          >
            {item.label}
          </a>
        ))}
        {phoneNumber && (
          <a
            href={`tel:${phoneNumber}`}
            style={{ background: accent, color: bg, textDecoration: 'none', padding: '18px 28px', fontFamily, fontSize: 17, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', borderRadius: 4, alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 20, display: 'flex' }}
          >
            <span style={{ fontSize: 20 }}>☎</span> {phoneDisplay}
          </a>
        )}
      </div>
    </>
  )
}
