export const metadata = { title: 'Preview D' }

export default function DLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: '#fff8e1', padding: '10px 20px', textAlign: 'center', fontSize: 13, color: '#5c4a00', fontFamily: 'Inter, system-ui, sans-serif' }}>
        Preview D · <a href="/preview" style={{ color: '#5c4a00', fontWeight: 600 }}>← All design options</a>
      </div>
      {children}
    </>
  )
}
