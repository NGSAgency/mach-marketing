export default async function PaymentCancelled({ params }) {
  const { clientId } = await params
  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#1F3A2E', color: 'white', padding: '20px 40px', textAlign: 'center' }}>
        <div style={{ letterSpacing: 3, fontSize: 12, fontWeight: 600 }}>MACH DIGITAL SOLUTIONS</div>
      </div>
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, color: '#111827', margin: '0 0 12px 0' }}>Payment setup cancelled</h1>
        <p style={{ color: '#4B5563', margin: '0 0 32px 0', fontSize: 16, lineHeight: 1.6 }}>
          No worries — no payment was processed. Return to onboarding whenever you\'re ready to try again.
        </p>
        <p style={{ color: '#6B7280', fontSize: 14 }}>
          You can close this window and return to the onboarding tab you had open.
        </p>
        <p style={{ color: '#6B7280', fontSize: 13, marginTop: 40 }}>
          Questions? Email <a href="mailto:chris@machdigitalsolutions.com" style={{ color: '#1F3A2E' }}>chris@machdigitalsolutions.com</a>
        </p>
      </div>
    </div>
  )
}
