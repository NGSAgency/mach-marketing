export const metadata = { title: 'Preview A - The Case File' }
export default function ALayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,ital@9..144,300;9..144,400;9..144,500;9..144,600;9..144,400,1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ background: '#fff8e1', padding: '10px 20px', textAlign: 'center', fontSize: 13, color: '#5c4a00', fontFamily: 'Inter, system-ui, sans-serif' }}>
        Preview A · The Case File · <a href="/preview" style={{ color: '#5c4a00', fontWeight: 600 }}>← All options</a>
      </div>
      {children}
    </>
  )
}
