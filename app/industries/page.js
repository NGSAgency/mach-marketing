export const metadata = { title: 'Industries' }

const industries = [
  { name: 'Home Services', description: '[[EDIT]] Landscape, HVAC, plumbing, roofing, pest control, and other trades. Our platform is purpose-built for local service businesses.' },
  { name: 'Professional Services', description: '[[EDIT]] Law firms, accounting, financial advisors, consultants. Trust-driven marketing for expertise-based businesses.' },
  { name: 'Healthcare &amp; Dental', description: '[[EDIT]] Dental practices, chiropractors, physical therapy, medical offices. Patient acquisition and reputation management.' },
  { name: 'Home Improvement', description: '[[EDIT]] Contractors, remodelers, custom builders. Long sales cycles, high ticket, review-driven decisions.' },
  { name: 'Real Estate', description: '[[EDIT]] Agents, brokers, property management. Lead capture and neighborhood-level marketing.' },
  { name: 'E-commerce &amp; Retail', description: '[[EDIT]] Direct-to-consumer brands and local retailers. Product-focused campaigns and conversion optimization.' },
]

export default function Industries() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">Industries</div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Who we serve.</h1>
      <p className="text-lg text-neutral-600 mb-16 max-w-2xl">
        {'[[EDIT: Industries intro]]'} We work with businesses across a range of industries.
        The common thread: they want measurable growth and a partner that takes execution seriously.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {industries.map(i => (
          <div key={i.name} className="border border-neutral-200 rounded-lg p-6 hover:border-neutral-400 transition-colors">
            <h2 className="text-xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: i.name }} />
            <p className="text-sm text-neutral-600" dangerouslySetInnerHTML={{ __html: i.description }} />
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-neutral-200 text-center">
        <p className="text-neutral-600 mb-2">Don't see your industry?</p>
        <p className="text-sm text-neutral-500">
          {'[[EDIT: We work with businesses of all sizes. If your industry isn\'t listed, let\'s talk.]]'}
        </p>
      </div>
    </div>
  )
}
