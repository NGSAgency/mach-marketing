// =========================================================
// PDF GENERATION
// Renders a signed contract HTML to a PDF via headless Chrome
// Uses @sparticuz/chromium for serverless-friendly Puppeteer
// =========================================================

import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

/**
 * Generate a PDF from signed contract HTML
 * @param {object} contract - the contract record
 * @param {string} signerName
 * @param {string} signerTitle
 * @param {string} signedAt - ISO timestamp
 * @param {string} ip - client IP
 * @returns {Buffer} - PDF bytes
 */
export async function generateSignedContractPdf(contract, signerName, signerTitle, signedAt, ip) {
  const signedAtFormatted = new Date(signedAt).toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
  })

  // Build the full HTML with the contract body + signature block
  const fullHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page { margin: 60px 60px 80px 60px; size: letter; }
  body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #111827; font-size: 13px; line-height: 1.6; margin: 0; padding: 0; }
  h1, h2, h3 { color: #1F3A2E; }
  h1 { font-size: 24px; }
  h2 { font-size: 16px; letter-spacing: 1px; margin-top: 24px; margin-bottom: 10px; }
  h3 { font-size: 14px; margin-top: 18px; margin-bottom: 8px; }
  p { margin: 8px 0; }
  ul { margin: 8px 0; padding-left: 24px; }
  hr { border: 0; border-top: 1px solid #E5E7EB; margin: 20px 0; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
  th { background: #1F3A2E !important; color: white !important; padding: 10px !important; text-align: left; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  td { padding: 10px !important; border-bottom: 1px solid #E5E7EB; }
  mark { background: #fef3c7; color: #92400e; padding: 1px 4px; border-radius: 3px; }
  .signature-block { margin-top: 60px; border-top: 2px solid #1F3A2E; padding-top: 24px; page-break-inside: avoid; }
  .signature-row { display: flex; justify-content: space-between; margin-top: 32px; gap: 40px; }
  .signature-cell { flex: 1; }
  .signature-name { font-family: Georgia, serif; font-style: italic; font-size: 22px; color: #111827; border-bottom: 1px solid #6B7280; padding-bottom: 6px; margin-bottom: 6px; }
  .signature-label { font-size: 10px; color: #6B7280; letter-spacing: 1px; }
  .audit-block { margin-top: 40px; padding: 16px; background: #F9FAFB; border-left: 3px solid #6B7280; font-size: 11px; color: #4B5563; }
  .audit-label { color: #6B7280; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; }
  .audit-value { margin-bottom: 8px; }
</style>
</head>
<body>
  ${contract.rendered_html}

  <div class="signature-block">
    <h2 style="margin-top: 0;">SIGNATURES</h2>

    <div class="signature-row">
      <div class="signature-cell">
        <div class="signature-name">${signerName}</div>
        <div class="signature-label">CLIENT SIGNATURE</div>
        <p style="margin-top: 12px; font-size: 12px;"><strong>Name:</strong> ${signerName}<br><strong>Title:</strong> ${signerTitle}<br><strong>Date:</strong> ${signedAtFormatted}</p>
      </div>

      <div class="signature-cell">
        <div class="signature-name" style="color: #9CA3AF;">Pending countersignature</div>
        <div class="signature-label">MACH DIGITAL SOLUTIONS</div>
        <p style="margin-top: 12px; font-size: 12px; color: #6B7280;">Awaiting countersignature by an authorized representative of NGS Digital LLC</p>
      </div>
    </div>

    <div class="audit-block">
      <div style="font-weight: 600; margin-bottom: 10px; color: #111827;">Electronic Signature Audit Trail</div>
      <div class="audit-label">CONTRACT ID</div>
      <div class="audit-value">${contract.id}</div>
      <div class="audit-label">SIGNED AT</div>
      <div class="audit-value">${signedAtFormatted}</div>
      <div class="audit-label">IP ADDRESS</div>
      <div class="audit-value">${ip || 'not captured'}</div>
      <div class="audit-label">CONTRACT HASH (SHA-256)</div>
      <div class="audit-value" style="font-family: monospace; font-size: 10px; word-break: break-all;">${contract.contract_hash_at_signing || 'pending'}</div>
      <div class="audit-label">ELECTRONIC SIGNATURE CONSENT</div>
      <div class="audit-value">Signer explicitly consented to electronic signing</div>
      <div style="margin-top: 12px; font-size: 10px; color: #6B7280;">This contract was executed electronically in compliance with the U.S. Electronic Signatures in Global and National Commerce Act (E-SIGN Act, 15 U.S.C. § 7001) and applicable state Uniform Electronic Transactions Act (UETA).</div>
    </div>
  </div>
</body>
</html>`

  const isLocal = process.env.NODE_ENV === 'development'

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: isLocal
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : await chromium.executablePath(),
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  })

  try {
    const page = await browser.newPage()
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' })
    const pdfBuffer = await page.pdf({
      format: 'letter',
      printBackground: true,
      margin: { top: '0.5in', bottom: '0.75in', left: '0.5in', right: '0.5in' },
    })
    return pdfBuffer
  } finally {
    await browser.close()
  }
}
