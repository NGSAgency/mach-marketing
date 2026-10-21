export const metadata = { title: 'Privacy Policy' }

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">Legal</div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
      <p className="text-sm text-neutral-500 mb-12">Last updated: October 21, 2026</p>

      <div className="max-w-none leading-relaxed text-neutral-300 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_strong]:text-white">
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

        <h2>Client Dashboards and the Data We Process for Our Clients</h2>
        <p>MACH Digital Solutions provides reporting dashboards to the businesses we work with (“clients”). To do that, we process some information on our clients’ behalf. For this information, our client decides what is collected and why; we act as their service provider and use it only to provide the dashboard and related services to them.</p>

        <h3>What the dashboard holds</h3>
        <ul>
          <li><strong>Enquiries from our clients’ customers.</strong> When someone fills in a form on a client’s website, submits a Google Ads lead form, or otherwise contacts a client through a system the client has connected, the dashboard stores what they sent: typically their name, email address, phone number, message, and which location or advertisement it relates to. Our client’s staff use this to follow up, and the dashboard keeps their work on it: notes, the stage the enquiry has reached, a follow-up date, and which staff member is handling it.</li>
          <li><strong>Business performance figures.</strong> With our client’s permission, the dashboard reads daily totals from the systems they connect, such as Google Analytics, Google Ads, Google Search Console, Square, Lightspeed and Klaviyo: for example website visits, advertising spend, sales totals, numbers of transactions, stock levels, and email marketing results. These are business totals, not details of individual shoppers. We do not receive or store payment card details.</li>
          <li><strong>Dashboard users.</strong> The names, email addresses and roles of our client’s staff who use the dashboard, when they last signed in, and their own display choices (such as which numbers appear on their overview), so these follow them from device to device.</li>
        </ul>

        <h3>Who can see it</h3>
        <ul>
          <li>Our client’s staff, limited by the access our client gives them (for example, a store manager sees only their own store).</li>
          <li>MACH staff, to set up, support and maintain the dashboard.</li>
          <li>We do not sell this information or use it for our own marketing, and we do not use it to train machine learning models.</li>
        </ul>

        <h3>Service providers</h3>
        <p>We use trusted providers to run the dashboard, under confidentiality and security obligations: hosting and database (Supabase, Vercel), email delivery (Resend), and the systems our client chooses to connect (such as Google, Square, Lightspeed and Klaviyo). Data is stored in the United States.</p>

        <h3>How we protect it</h3>
        <p>Access requires a one-time sign-in code sent by email; there are no shared passwords. Access to connected systems is read-only wherever the system allows it, and the credentials for those connections are stored encrypted. Each person sees only what their role permits. We keep encrypted backups so information can be recovered after an accident.</p>

        <h3>How long we keep it</h3>
        <p>We keep this information while our client uses the dashboard. When a client stops using it, we delete their dashboard data within 30 days of their request or of the end of our agreement, except that encrypted backups are kept for up to 8 weeks before they are overwritten.</p>

        <h3>Your choices</h3>
        <p>If you contacted one of our clients and want to see, correct or delete the details you sent them, please contact that business directly. We will help them respond. You can also contact us at chris@machdigitalsolutions.com and we will pass your request to the right client.</p>

        <h3>Cookies on the dashboard</h3>
        <p>The dashboard itself uses only the cookies needed to keep users signed in. It does not use advertising or tracking cookies.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page.</p>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, contact us at chris@machdigitalsolutions.com.</p>
      </div>
    </div>
  )
}
