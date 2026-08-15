'use client'

const BAR = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 99999,
  background: 'linear-gradient(135deg, #050508 0%, #0851cf 100%)',
  color: '#fff',
  padding: '12px 20px',
  fontFamily: '-apple-system, "Helvetica Neue", Arial, sans-serif',
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  flexWrap: 'wrap',
  textAlign: 'center',
  boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
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

const LINK = {
  color: '#fff',
  fontWeight: 700,
  textDecoration: 'underline',
  whiteSpace: 'nowrap',
}

export default function PreviewBanner({ businessName }) {
  return (
    <div style={BAR}>
      <span style={PILL}>Preview</span>
      <span>
        This is a private preview of the {businessName ? businessName + ' ' : ''}site. It is not live yet.
      </span>
      <a href="mailto:sales@machdigitalsolutions.com?subject=Website%20feedback" style={LINK}>
        Send feedback
      </a>
    </div>
  )
}
