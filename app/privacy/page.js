export const metadata = { title: 'Privacy Policy' }

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">Legal</div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
      <p className="text-sm text-neutral-500 mb-12">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="prose prose-neutral max-w-none">
        <h2>Introduction</h2>
        <p>MACH Digital Solutions ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect information when you use our services or visit our website.</p>

        <h2>Information We Collect</h2>
        <p>We collect information you provide directly, including:</p>
        <ul>
          <li>Contact information (name, email, phone, company)</li>
          <li>Business information necessary to provide our services</li>
          <li>Google Account data when you authorize us to access Google Analytics, Google Ads, Google Search Console, or Google Business Profile on your behalf</li>
        </ul>

        <h2>Google API Services User Data Policy</h2>
        <p>MACH Digital Solutions' use of Google API data adheres to the Google API Services User Data Policy, including the Limited Use requirements. We only access, use, store, and share your Google user data for purposes that you consent to as our client.</p>
        <p>Specifically, when you grant us access to your Google services:</p>
        <ul>
          <li>We access this data only to provide the marketing services you have engaged us for</li>
          <li>We do not sell, rent, or share your Google data with third parties for advertising purposes</li>
          <li>We do not use your Google data to train or improve any machine learning models</li>
          <li>We use industry-standard security practices to protect your data</li>
          <li>You may revoke our access at any time through your Google account settings</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide, maintain, and improve our services</li>
          <li>To communicate with you about your account and our services</li>
          <li>To generate reports and insights about your marketing performance</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>Data Sharing</h2>
        <p>We do not sell your personal information. We may share information with service providers who help us operate our business (such as hosting providers, analytics providers, and payment processors) under strict confidentiality obligations.</p>

        <h2>Data Security</h2>
        <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>

        <h2>Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at chris@machdigitalsolutions.com.</p>

        <h2>Cookies</h2>
        <p>Our website uses cookies for essential functionality and analytics. You can control cookies through your browser settings.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page.</p>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, contact us at chris@machdigitalsolutions.com.</p>
      </div>
    </div>
  )
}
