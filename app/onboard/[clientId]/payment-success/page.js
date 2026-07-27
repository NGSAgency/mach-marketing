export default async function PaymentSuccess({ params }) {
  const { clientId } = await params
  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#1F3A2E', color: 'white', padding: '20px 40px', textAlign: 'center' }}>
        <div style={{ letterSpacing: 3, fontSize: 12, fontWeight: 600 }}>MACH DIGITAL SOLUTIONS</div>
      </div>
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '50%', background: '#DCFCE7', color: '#166534', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 24 }}>✓</div>
        <h1 style={{ fontSize: 28, color: '#111827', margin: '0 0 12px 0' }}>Payment method saved!</h1>
        <p style={{ color: '#4B5563', margin: '0 0 32px 0', fontSize: 16, lineHeight: 1.6 }}>
          Your payment method is on file. Your first charge will happen on the 1st of next month per your contract — nothing has been charged today.
        </p>
        <p style={{ color: '#4B5563', margin: '0 0 32px 0', fontSize: 15 }}>
          Return to the onboarding questionnaire to continue setting up your account.
        </p>
        <p style={{ color: '#6B7280', fontSize: 14 }}>
          You can close this window and return to the onboarding tab you had open.
        </p>
      </div>
    </div>
  )
}
