// Sample data used by the email preview endpoint
// Every template in the MACH ecosystem has an entry here so it can be previewed.

import { renderEmail } from '@/lib/email/template.js'

export const TEMPLATES = {
  contact_form: {
    label: 'Contact form submission (marketing site)',
    audience: 'Team',
    build: () => renderEmail({
      kicker: 'New Inquiry',
      headline: 'You have a new lead.',
      paragraphs: ['Someone just reached out through machdigitalsolutions.com. Full details below.'],
      details: [
        ['Name', 'Jane Smith'],
        ['Company', 'Acme HVAC'],
        ['Email', 'jane@acmehvac.com'],
        ['Phone', '913-555-0142'],
        ['Message', "We're looking to overhaul our website and want to improve our SEO. Currently getting about 5 leads a month and we'd like to get to 20+. Do you have availability to chat?"],
      ],
      ctaLabel: 'Reply to Jane →',
      ctaHref: 'mailto:jane@acmehvac.com',
    }),
  },
  contract_viewed: {
    label: 'Contract viewed by client',
    audience: 'Team',
    build: () => renderEmail({
      kicker: 'Contract Viewed',
      headline: 'Acme HVAC just opened the contract.',
      paragraphs: ["Acme HVAC viewed their contract for the first time. This is a great moment to follow up if you haven't heard back in a day or two."],
      details: [
        ['Client', 'Acme HVAC'],
        ['Viewed At', 'August 15, 2026 at 11:22 AM CDT'],
        ['Monthly Fee', '$2,850'],
        ['Services', 'Website, SEO & Content'],
      ],
    }),
  },
  contract_signed_client: {
    label: 'Contract signed — confirmation to client',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Signature Confirmed',
      headline: 'Your contract has been signed.',
      greeting: 'Hi Jane,',
      paragraphs: [
        'Thank you for signing your service agreement with MACH Digital Solutions. Your signature has been recorded.',
        'Our team will review and countersign shortly. Once complete, you will receive the fully-executed contract PDF for your records.',
      ],
      details: [
        ['Signed By', 'Jane Smith, Owner'],
        ['Signed At', 'August 15, 2026 at 2:34 PM CDT'],
      ],
      footerNote: 'Questions? Just reply to this email.',
    }),
  },
  contract_signed_team: {
    label: 'Contract signed by client — team notify',
    audience: 'Team',
    build: () => renderEmail({
      kicker: 'Client Signed',
      headline: 'Jane Smith just signed.',
      paragraphs: ['Jane Smith (Owner) has electronically signed their agreement. Head to the client detail page in Command Center to countersign. Once you countersign, the fully-executed PDF will be generated and sent automatically.'],
      details: [
        ['Signed By', 'Jane Smith, Owner'],
        ['Client Email', 'jane@acmehvac.com'],
        ['Signed At', 'August 15, 2026 at 2:34 PM CDT'],
        ['Client IP', '73.42.18.219'],
        ['Monthly Fee', '$2,850'],
        ['Services', 'Website, SEO & Content'],
      ],
    }),
  },
  contract_fully_executed_client: {
    label: 'Contract fully executed — client welcome',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Welcome Aboard',
      headline: 'Welcome to MACH, Jane.',
      greeting: 'Hi Jane,',
      paragraphs: [
        'We are thrilled to have Acme HVAC on board and excited to get started.',
        "The first step is completing your onboarding questionnaire. This is where you will share the key details about your business, your goals, and what makes your company unique — everything we need to build a strategy that actually fits.",
        'The more thorough your responses, the stronger the foundation we can build from day one. Take your time with it.',
        'Your fully-executed contract is attached to this email for your records.',
      ],
      details: [
        ['Client', 'Acme HVAC'],
        ['Services', 'Website, SEO & Content'],
        ['Monthly Fee', '$2,850'],
        ['Start Date', 'September 1, 2026'],
        ['Countersigned', 'August 15, 2026 at 3:12 PM CDT'],
      ],
    }),
  },
  contract_fully_executed_team: {
    label: 'Contract fully executed — team notify',
    audience: 'Team',
    build: () => renderEmail({
      kicker: 'Contract Executed',
      headline: 'Acme HVAC is now active.',
      paragraphs: ['Jane Smith contract has been countersigned by Chris Nothnick and is now fully executed. Onboarding kickoff email has been sent to the client.'],
      details: [
        ['Client', 'Acme HVAC'],
        ['Client Contact', 'jane@acmehvac.com'],
        ['Services', 'Website, SEO & Content'],
        ['Monthly Fee', '$2,850'],
        ['Start Date', 'September 1, 2026'],
        ['Countersigned By', 'Chris Nothnick'],
      ],
    }),
  },
  contract_sent: {
    label: 'Contract sent to client',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Your Agreement',
      headline: 'Your MACH agreement is ready.',
      greeting: 'Hi Jane,',
      paragraphs: [
        'Great connecting with you. Your Digital Services Subscription Agreement is ready for your review and signature.',
        "Please review the terms, and if everything looks good, use the button below to sign electronically. If you have questions before signing, just reply to this email — we're happy to walk through anything.",
      ],
      details: [
        ['Client', 'Acme HVAC'],
        ['Services', 'Website, SEO & Content'],
        ['Monthly Fee', '$2,850'],
      ],
      ctaLabel: 'Review & Sign →',
      ctaHref: 'https://machdigitalsolutions.com/sign/EXAMPLE_TOKEN',
      footerNote: 'This link is unique to you and expires in 30 days.',
    }),
  },
  payment_succeeded: {
    label: 'Payment succeeded (client receipt)',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Payment Received',
      headline: 'Thanks for your payment.',
      greeting: 'Hi Jane,',
      paragraphs: [
        "We just received your monthly payment. Everything's set for another great month of MACH services.",
        'A receipt from Stripe is also available at the link below.',
      ],
      details: [
        ['Amount', '$2,850.00'],
        ['Date', 'August 15, 2026'],
        ['Invoice', 'in_1QaBcDeFgHiJkLmN'],
      ],
      ctaLabel: 'View Receipt →',
      ctaHref: '#',
      footerNote: 'Manage your payment methods and view your billing history at any time through your customer portal.',
    }),
  },
  payment_failed_client: {
    label: 'Payment failed — to client',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Payment Issue',
      headline: "We couldn't process your payment.",
      greeting: 'Hi Jane,',
      paragraphs: [
        "Your monthly payment for MACH Digital Services didn't go through this cycle. This is often due to an expired card or a temporary hold from your bank — nothing to worry about.",
        "To keep things running smoothly, please update your payment method using the button below. We'll try again automatically in a few days.",
      ],
      details: [
        ['Amount', '$2,850.00'],
        ['Reason', 'Card declined'],
        ['Next Attempt', 'August 18, 2026 at 8:00 AM CDT'],
      ],
      ctaLabel: 'Update Payment Method →',
      ctaHref: '#',
      footerNote: "If you have any questions, just reply to this email — we're happy to help.",
    }),
  },
  payment_failed_team: {
    label: 'Payment failed — to team',
    audience: 'Team',
    build: () => renderEmail({
      kicker: 'Payment Failed',
      headline: 'Payment failed for Acme HVAC.',
      paragraphs: [
        "Acme HVAC's monthly payment failed. The client has been automatically notified with a link to update their payment method.",
        'Stripe will retry automatically. If it fails again, consider reaching out personally.',
      ],
      details: [
        ['Client', 'Acme HVAC'],
        ['Contact', 'jane@acmehvac.com'],
        ['Amount', '$2,850.00'],
        ['Reason', 'Card declined'],
        ['Next Retry', 'August 18, 2026 at 8:00 AM CDT'],
      ],
    }),
  },
  automation_alert: {
    label: 'Automation alert',
    audience: 'Team',
    build: () => renderEmail({
      kicker: 'Automation Alert',
      headline: 'Anomaly detected for Acme HVAC.',
      paragraphs: ['The MACH automation engine detected an unusual drop in paid media performance for Acme HVAC over the last 7 days. Suggested action: Review bid strategy and check for keyword rejections. A diagnosis and recommended fix have been generated in Command Center.'],
      details: [
        ['Client', 'Acme HVAC'],
        ['Metric', 'Paid conversions'],
        ['Change', '-38% vs 30-day baseline'],
        ['Priority', 'High'],
        ['Detected', 'August 15, 2026 at 4:00 AM UTC'],
      ],
      ctaLabel: 'Review Diagnosis →',
      ctaHref: '#',
    }),
  },
  inquiry_received: {
    label: 'Inquiry received (auto-reply to prospect)',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Inquiry Received',
      headline: 'Thanks for reaching out.',
      greeting: 'Hi Jane,',
      paragraphs: [
        'We got your message and one of us will be in touch within one business day.',
        "If there's anything else you'd like to add — the URL of your current site, specific goals, or context that would help — just reply to this email.",
      ],
      footerNote: '— The MACH Team',
    }),
  },
  welcome_questionnaire: {
    label: 'Welcome + questionnaire invite',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Welcome Aboard',
      headline: 'Welcome to MACH, Jane.',
      greeting: 'Hi Jane,',
      paragraphs: [
        'Excited to have Acme HVAC on board. The first step is a short questionnaire.',
        "It's the source of truth for everything we build: your services, service areas, differentiators, and credentials. The better this is filled out, the better your site will rank and convert.",
        'Set aside about 15–20 minutes. You can save your progress and come back to it — no rush.',
      ],
      ctaLabel: 'Start Questionnaire →',
      ctaHref: '#',
      footerNote: '— The MACH Team',
    }),
  },
  questionnaire_nudge_early: {
    label: 'Questionnaire nudge (early — day 4)',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Gentle Nudge',
      headline: 'Any questions on the questionnaire?',
      greeting: 'Hi Jane,',
      paragraphs: [
        'Just checking in — we noticed the questionnaire is still open.',
        'If you have any questions or want to walk through it together on a quick call, just let us know. Otherwise, take your time.',
      ],
      ctaLabel: 'Continue Questionnaire →',
      ctaHref: '#',
      footerNote: '— The MACH Team',
    }),
  },
  questionnaire_nudge_late: {
    label: 'Questionnaire nudge (late — day 7)',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Still Here',
      headline: "We're ready when you are.",
      greeting: 'Hi Jane,',
      paragraphs: [
        "It's been a bit since we sent the questionnaire and we wanted to check in.",
        "No rush at all — but if you'd rather do it together on a quick call, or if you have questions, just reply to this email.",
      ],
      ctaLabel: 'Continue Questionnaire →',
      ctaHref: '#',
      footerNote: '— The MACH Team',
    }),
  },
  questionnaire_received: {
    label: 'Questionnaire received (auto-reply)',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Questionnaire Received',
      headline: "Got it — we're on it.",
      greeting: 'Hi Jane,',
      paragraphs: [
        'Thanks for completing the questionnaire for Acme HVAC. This gives us everything we need to start building.',
        "Our team is reviewing your responses now. You'll hear from us within a few business days with next steps and initial timeline.",
        'In the meantime, if anything comes up or you want to add something, just reply to this email.',
      ],
      footerNote: '— The MACH Team',
    }),
  },
  site_live: {
    label: 'Site live announcement',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'Site is Live',
      headline: 'Acme HVAC is live.',
      greeting: 'Hi Jane,',
      paragraphs: [
        'The wait is over — your new site is live and ready to start bringing in leads.',
        "Take some time to click around, share it with your team, and let us know if you spot anything that needs a tweak.",
        "From here, we get to work on the ongoing pieces: SEO, content, and — if applicable — paid media. You'll hear from us regularly with updates on progress and performance.",
      ],
      ctaLabel: 'Visit Your Site →',
      ctaHref: '#',
      footerNote: '— The MACH Team',
    }),
  },
  week_one_checkin: {
    label: 'Week one check-in',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'One Week In',
      headline: 'Quick check-in.',
      greeting: 'Hi Jane,',
      paragraphs: [
        "It's been a week since Acme HVAC went live and we wanted to check in.",
        "How's it been received? Have you had a chance to share it with customers or leads? If anything feels off — a page you'd tweak, copy you'd sharpen, an image you'd swap — just reply to this email and we'll take care of it.",
        "We're also actively working behind the scenes on SEO and content to compound traffic over time.",
      ],
      ctaLabel: 'Visit Your Site →',
      ctaHref: '#',
      footerNote: '— The MACH Team',
    }),
  },
  month_one_checkin: {
    label: 'Month one check-in',
    audience: 'Client',
    build: () => renderEmail({
      kicker: 'One Month In',
      headline: 'How are we doing so far?',
      greeting: 'Hi Jane,',
      paragraphs: [
        "Hard to believe it's already been a month since Acme HVAC launched.",
        "We wanted to take a step back and check in. What's working? What could be better? Anything you wish we were doing differently?",
        "Feedback at this point in the engagement is really valuable — it helps us shape the next few months of work. Even a couple of quick thoughts would help.",
      ],
      footerNote: '— The MACH Team',
    }),
  },
}
