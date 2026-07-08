'use client'
import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setMsg('')
    const form = new FormData(e.target)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      company: form.get('company'),
      message: form.get('message'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('sent')
      setMsg('Thanks — we\'ll be in touch shortly.')
      e.target.reset()
    } catch (err) {
      setStatus('idle')
      setMsg('Something went wrong. Email chris@machdigitalsolutions.com directly.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">Contact</div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get in touch.</h1>
      <p className="text-neutral-600 mb-12">
        Tell us about your business and what you\'re trying to grow. We'll get back within one business day.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input name="name" type="text" required className="w-full bg-white border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:border-neutral-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input name="email" type="email" required className="w-full bg-white border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:border-neutral-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Company (optional)</label>
          <input name="company" type="text" className="w-full bg-white border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:border-neutral-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">What are you trying to grow?</label>
          <textarea name="message" rows={5} required className="w-full bg-white border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:border-neutral-900" />
        </div>
        <button type="submit" disabled={status === 'submitting'} className="bg-neutral-900 text-white px-6 py-3 rounded-md font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50">
          {status === 'submitting' ? 'Sending...' : 'Send'}
        </button>
        {msg && <p className={`text-sm ${status === 'sent' ? 'text-green-700' : 'text-red-700'}`}>{msg}</p>}
      </form>
    </div>
  )
}
