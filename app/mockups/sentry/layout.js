export const metadata = { title: 'Sentry Solutions - MACH Mockup', robots: { index: false, follow: false } }

export default function SentryLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ background: '#d4a24f', padding: '10px 20px', textAlign: 'center', fontSize: 13, color: '#1a1f2e', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
        MACH Mockup for Sentry Solutions · Concept only · Not affiliated with Sentry Solutions
      </div>
      {children}
    </>
  )
}
