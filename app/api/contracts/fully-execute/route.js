export const runtime = 'nodejs'
export const maxDuration = 60

import { generateFullyExecutedPdf } from '../../../lib/pdf.js'
import { sendMachEmail, MACH_TEAM } from '@/lib/email/template.js'

export async function POST(request) {
  try {
    const { contractId } = await request.json()
    if (!contractId) return Response.json({ error: 'contractId required' }, { status: 400 })

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const res = await fetch(`${supabaseUrl}/rest/v1/contracts?id=eq.${contractId}&select=*,clients(name,primary_contact_email)`, {
      headers: { 'apikey': serviceKey, 'Authorization': `Bearer ${serviceKey}` },
    })
    const rows = await res.json()
    if (!rows || rows.length === 0) return Response.json({ error: 'Contract not found' }, { status: 404 })
    const contract = rows[0]

    if (contract.status !== 'active') {
      return Response.json({ error: 'Contract must be in active status (countersigned)' }, { status: 400 })
    }

    const pdfBuffer = await generateFullyExecutedPdf(contract)
    const clientEmail = contract.client_signature_email || contract.clients?.primary_contact_email
    const clientName = contract.client_signature_name || contract.clients?.name || 'Client'
    const monthly = contract.monthly_fee ? `$${Number(contract.monthly_fee).toLocaleString()}` : '—'
    const services = (contract.services || []).join(', ') || '—'
    const startDate = contract.start_date || 'Per contract terms'
    const countersignedAtFormatted = contract.countersigned_at
      ? new Date(contract.countersigned_at).toLocaleString('en-US', { timeZone: 'America/Chicago', timeZoneName: 'short' })
      : 'Just now'

    const attachments = [{
      filename: 'fully-executed-contract.pdf',
      content: Buffer.from(pdfBuffer).toString('base64'),
    }]

    // Client-facing: welcome / fully-executed confirmation
    if (clientEmail) {
      await sendMachEmail({
        to: clientEmail,
        subject: 'Your MACH agreement is fully executed',
        attachments,
        template: {
          kicker: 'Welcome Aboard',
          headline: `Welcome to MACH, ${clientName.split(' ')[0]}.`,
          greeting: `Hi ${clientName.split(' ')[0]},`,
          paragraphs: [
            `We are thrilled to have ${contract.clients?.name || clientName} on board and excited to get started.`,
            "The first step is completing your onboarding questionnaire. This is where you will share the key details about your business, your goals, and what makes your company unique — everything we need to build a strategy that actually fits.",
            'The more thorough your responses, the stronger the foundation we can build from day one. Take your time with it.',
            'Your fully-executed contract is attached to this email for your records.',
          ],
          details: [
            ['Client', contract.clients?.name || clientName],
            ['Services', services],
            ['Monthly Fee', monthly],
            ['Start Date', startDate],
            ['Countersigned', countersignedAtFormatted],
          ],
        },
      })
    }

    // Team notification
    await sendMachEmail({
      to: MACH_TEAM,
      subject: `${contract.clients?.name || clientName} is fully executed`,
      attachments,
      template: {
        kicker: 'Contract Executed',
        headline: `${contract.clients?.name || clientName} is now active.`,
        paragraphs: [
          `${clientName} contract has been countersigned by ${contract.countersigned_name || 'the team'} and is now fully executed. Onboarding kickoff email has been sent to the client.`,
        ],
        details: [
          ['Client', contract.clients?.name || clientName],
          ['Client Contact', clientEmail || 'Not provided'],
          ['Services', services],
          ['Monthly Fee', monthly],
          ['Start Date', startDate],
          ['Countersigned By', contract.countersigned_name || '—'],
        ],
      },
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Fully-execute error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
