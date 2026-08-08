export const metadata = { title: 'Preview B - Bright Confidence' }
export default function BLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Inter+Tight:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 40s linear infinite; }
      `}</style>
      <div style={{ background: '#fff8e1', padding: '10px 20px', textAlign: 'center', fontSize: 13, color: '#5c4a00', fontFamily: 'Inter, system-ui, sans-serif' }}>
        Preview B · Bright Confidence · <a href="/preview" style={{ color: '#5c4a00', fontWeight: 600 }}>← All options</a>
      </div>
      {children}
    </>
  )
}
