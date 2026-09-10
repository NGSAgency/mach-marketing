'use client'

const BAR = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 99999,
  background: 'linear-gradient(135deg, #050508 0%, #0851cf 100%)',
  color: '#fff',
  // One row at every width. The page underneath is offset by exactly this
  // height, so a wrapping banner used to cover the site's own header on phones.
  height: 44,
  padding: '0 16px',
  fontFamily: '-apple-system, "Helvetica Neue", Arial, sans-serif',
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 14,
  flexWrap: 'nowrap',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
}

const PILL = {
  background: 'rgba(255,255,255,0.16)',
  padding: '3px 10px',
  borderRadius: 100,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
}

const CTA = {
  background: '#fff',
  color: '#0851cf',
  padding: '6px 14px',
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 13,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

export default function MockupBanner({ businessName }) {
  return (
    <div style={BAR}>
      <style>{`.mb-short{display:none}@media (max-width:640px){.mb-long{display:none}.mb-short{display:inline}}`}</style>
      <span style={PILL}>Concept</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
        <span className="mb-long">A website concept for {businessName}, built by MACH Digital Solutions.</span>
        <span className="mb-short">A concept for {businessName}</span>
      </span>
      <a href="mailto:sales@machdigitalsolutions.com?subject=Website%20concept" style={CTA}>
        Talk to us
      </a>
    </div>
  )
}
