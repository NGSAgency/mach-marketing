export const metadata = { title: 'Preview C - The Manifesto' }
export default function CLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <div style={{ background: '#fff8e1', padding: '10px 20px', textAlign: 'center', fontSize: 13, color: '#5c4a00', fontFamily: 'Inter, system-ui, sans-serif' }}>
        Preview C · The Manifesto · <a href="/preview" style={{ color: '#5c4a00', fontWeight: 600 }}>← All options</a>
      </div>
      {children}
    </>
  )
}
