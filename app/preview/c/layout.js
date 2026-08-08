export const metadata = { title: 'Preview C - Refined Motion' }
export default function CLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .fade-up { animation: fadeUp 0.8s ease-out both; }
        .cursor::after { content: '_'; animation: cursor 1s infinite; color: var(--accent); margin-left: 4px; }
      `}</style>
      <div style={{ background: '#fff8e1', padding: '10px 20px', textAlign: 'center', fontSize: 13, color: '#5c4a00', fontFamily: 'Inter, system-ui, sans-serif' }}>
        Preview C · Refined Motion · <a href="/preview" style={{ color: '#5c4a00', fontWeight: 600 }}>← All options</a>
      </div>
      {children}
    </>
  )
}
