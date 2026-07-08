export const metadata = { title: 'Terms of Service' }

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">Legal</div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
      <p className="text-sm text-neutral-500 mb-12">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="prose prose-neutral max-w-none">
        <h2>Acceptance of Terms</h2>
        <p>By accessing or using MACH Digital Solutions' website or services, you agree to be bound by these Terms of Service.</p>

        <h2>Services</h2>
        <p>MACH Digital Solutions provides marketing services including but not limited to search engine optimization (SEO), paid media management, website development, analytics reporting, and marketing automation.</p>

        <h2>Client Responsibilities</h2>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Grant necessary access to accounts and platforms required for services</li>
          <li>Pay invoices on the agreed schedule</li>
          <li>Comply with all applicable laws and platform policies (Google Ads, Meta, etc.)</li>
        </ul>

        <h2>Payment</h2>
        <p>Payment terms are outlined in individual service agreements. Invoices are typically due within 15 days unless otherwise agreed.</p>

        <h2>Intellectual Property</h2>
        <p>Content, strategy, and code we create for you is your property upon payment. We retain the right to display work in our portfolio unless otherwise agreed.</p>

        <h2>Confidentiality</h2>
        <p>We treat all client information as confidential and will not disclose it to third parties except as necessary to provide services or as required by law.</p>

        <h2>Limitation of Liability</h2>
        <p>MACH Digital Solutions' liability is limited to the amounts paid for services in the three months preceding the claim. We do not guarantee specific results (rankings, leads, conversions).</p>

        <h2>Termination</h2>
        <p>Either party may terminate the service agreement with 30 days' written notice. Client will pay for all work completed through the termination date.</p>

        <h2>Governing Law</h2>
        <p>These Terms are governed by the laws of the State of Kansas. Any disputes will be resolved in the courts of Johnson County, Kansas.</p>

        <h2>Changes to These Terms</h2>
        <p>We may update these Terms from time to time. Continued use of our services constitutes acceptance of the updated Terms.</p>

        <h2>Contact Us</h2>
        <p>Questions about these Terms? Email chris@machdigitalsolutions.com.</p>
      </div>
    </div>
  )
}
