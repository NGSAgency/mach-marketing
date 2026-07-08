import Link from 'next/link'

export const metadata = { title: 'Services' }

const services = [
  {
    name: 'Search Engine Optimization',
    slug: 'seo',
    description: '[[EDIT: SEO service description here]] Rank higher in Google for the terms your customers actually search. Technical audits, content strategy, on-page optimization, local SEO, and link building.',
  },
  {
    name: 'Paid Media',
    slug: 'paid-media',
    description: '[[EDIT: Paid media description]] Google Ads, Meta, LinkedIn, and programmatic campaigns. We handle strategy, creative, targeting, bid management, and optimization.',
  },
  {
    name: 'Websites &amp; Landing Pages',
    slug: 'web',
    description: '[[EDIT: Web description]] Fast, modern websites and high-converting landing pages. Built on modern stacks with SEO baked in.',
  },
  {
    name: 'Analytics &amp; Reporting',
    slug: 'analytics',
    description: '[[EDIT: Analytics description]] GA4, Search Console, call tracking, and custom dashboards. Know what\'s working and what isn\'t.',
  },
  {
    name: 'Marketing Automation',
    slug: 'automation',
    description: '[[EDIT: Automation description]] Lead capture, CRM integration, email nurture, and workflow automation to turn traffic into revenue.',
  },
]

export default function Services() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">Services</div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">What we do.</h1>
      <p className="text-lg text-neutral-600 mb-16 max-w-2xl">
        {'[[EDIT: Services page intro]]'} We offer a focused set of services designed to work together.
        Most clients start with one and expand as we prove results.
      </p>

      <div className="space-y-16">
        {services.map(s => (
          <div key={s.slug} className="border-t border-neutral-200 pt-8">
            <h2 className="text-2xl font-bold mb-3" dangerouslySetInnerHTML={{ __html: s.name }} />
            <p className="text-neutral-700" dangerouslySetInnerHTML={{ __html: s.description }} />
          </div>
        ))}
      </div>

      <div className="mt-20 pt-8 border-t border-neutral-200">
        <p className="text-neutral-600 mb-4">Ready to talk?</p>
        <Link href="/contact" className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-md font-medium hover:bg-neutral-700 transition-colors">
          Get in touch
        </Link>
      </div>
    </div>
  )
}
