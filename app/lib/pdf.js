// =========================================================
// PDF GENERATION (pdf-lib)
// Programmatically builds a clean professional signed contract PDF
// No Chromium needed - works reliably on any serverless environment
// =========================================================

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

// Colors (matching MACH brand)
const BRAND_GREEN = rgb(0.122, 0.227, 0.180) // #1F3A2E
const TEXT_PRIMARY = rgb(0.067, 0.094, 0.153) // #111827
const TEXT_SECONDARY = rgb(0.294, 0.333, 0.388) // #4B5563
const TEXT_MUTED = rgb(0.42, 0.447, 0.502) // #6B7280
const BG_GRAY = rgb(0.976, 0.980, 0.984) // #F9FAFB
const BORDER_GRAY = rgb(0.898, 0.906, 0.922) // #E5E7EB

const PAGE_WIDTH = 612  // 8.5 inches
const PAGE_HEIGHT = 792 // 11 inches
const MARGIN_LEFT = 60
const MARGIN_RIGHT = 60
const MARGIN_TOP = 60
const MARGIN_BOTTOM = 80
const USABLE_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT

/**
 * Strip HTML tags and decode entities from the contract body
 * Produces plain text with paragraph breaks preserved
 */
function extractTextBlocks(html) {
  // Normalize
  let text = html

  // Extract headings + paragraphs as blocks
  const blocks = []
  const blockPattern = /<(h1|h2|h3|p|li|tr)([^>]*)>([\s\S]*?)<\/\1>/gi
  let match
  while ((match = blockPattern.exec(text)) !== null) {
    const tag = match[1].toLowerCase()
    const attrs = match[2] || ''
    let content = match[3]

    // Strip inner tags but preserve strong/b as bold markers
    content = content.replace(/<(strong|b)>([^<]+)<\/(strong|b)>/gi, '**$2**')
    content = content.replace(/<[^>]+>/g, ' ')

    // Decode HTML entities
    content = decodeEntities(content)
    content = content.replace(/\s+/g, ' ').trim()

    if (!content) continue

    blocks.push({ tag, content, isBold: attrs.includes('bold') })
  }
  return blocks
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&middot;/g, '·')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
}

function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const width = font.widthOfTextAtSize(testLine, fontSize)
    if (width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

// Draw text with **bold** markers rendering as bold
async function drawTextWithBold(page, text, x, y, { font, fontBold, size, color, maxWidth }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  let cursorX = x
  const spaceWidth = font.widthOfTextAtSize(' ', size)

  // Split each part into words and their fonts
  const tokens = []
  for (const part of parts) {
    const isBold = part.startsWith('**') && part.endsWith('**')
    const raw = isBold ? part.slice(2, -2) : part
    const words = raw.split(/\s+/).filter(Boolean)
    for (const w of words) {
      tokens.push({ word: w, bold: isBold })
    }
  }

  // Now wrap tokens into lines
  const lines = [[]]
  let currentWidth = 0
  for (let i = 0; i < tokens.length; i++) {
    const { word, bold } = tokens[i]
    const f = bold ? fontBold : font
    const wordWidth = f.widthOfTextAtSize(word, size)
    const withSpace = currentWidth === 0 ? wordWidth : currentWidth + spaceWidth + wordWidth
    if (withSpace > maxWidth && currentWidth > 0) {
      lines.push([{ word, bold, width: wordWidth }])
      currentWidth = wordWidth
    } else {
      lines[lines.length - 1].push({ word, bold, width: wordWidth })
      currentWidth = withSpace
    }
  }

  let currentY = y
  for (const line of lines) {
    cursorX = x
    for (let i = 0; i < line.length; i++) {
      const { word, bold } = line[i]
      const f = bold ? fontBold : font
      page.drawText(word, { x: cursorX, y: currentY, size, font: f, color })
      cursorX += f.widthOfTextAtSize(word, size) + spaceWidth
    }
    currentY -= size * 1.4
  }
  return currentY
}

export async function generateSignedContractPdf(contract, signerName, signerTitle, signedAt, ip) {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  let y = PAGE_HEIGHT - MARGIN_TOP

  const ensureSpace = (needed) => {
    if (y - needed < MARGIN_BOTTOM) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
      y = PAGE_HEIGHT - MARGIN_TOP
    }
  }

  // ========== HEADER ==========
  page.drawText('NGS DIGITAL LLC', {
    x: PAGE_WIDTH / 2 - fontBold.widthOfTextAtSize('NGS DIGITAL LLC', 10) / 2,
    y,
    size: 10,
    font: fontBold,
    color: BRAND_GREEN,
  })
  y -= 8
  page.drawLine({
    start: { x: MARGIN_LEFT, y },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
    thickness: 1.5,
    color: BRAND_GREEN,
  })
  y -= 30

  // ========== TITLE ==========
  const title = 'Digital Services Subscription Agreement'
  page.drawText(title, {
    x: PAGE_WIDTH / 2 - fontBold.widthOfTextAtSize(title, 18) / 2,
    y,
    size: 18,
    font: fontBold,
    color: TEXT_PRIMARY,
  })
  y -= 26

  const subtitle = 'Website Development · Content · SEO · Paid Media Management'
  page.drawText(subtitle, {
    x: PAGE_WIDTH / 2 - fontItalic.widthOfTextAtSize(subtitle, 10) / 2,
    y,
    size: 10,
    font: fontItalic,
    color: TEXT_MUTED,
  })
  y -= 30

  // ========== BODY ==========
  const blocks = extractTextBlocks(contract.rendered_html)

  for (const block of blocks) {
    let size, blockFont, color, spaceAfter
    if (block.tag === 'h1') {
      size = 16; blockFont = fontBold; color = TEXT_PRIMARY; spaceAfter = 14
      ensureSpace(30)
    } else if (block.tag === 'h2') {
      size = 12; blockFont = fontBold; color = BRAND_GREEN; spaceAfter = 8
      ensureSpace(24)
      y -= 6 // extra space before h2
    } else if (block.tag === 'h3') {
      size = 11; blockFont = fontBold; color = BRAND_GREEN; spaceAfter = 6
      ensureSpace(20)
      y -= 4
    } else if (block.tag === 'li') {
      size = 10; blockFont = font; color = TEXT_PRIMARY; spaceAfter = 4
      ensureSpace(18)
      // Draw bullet
      page.drawText('•', { x: MARGIN_LEFT + 6, y, size, font, color })
    } else {
      size = 10; blockFont = font; color = TEXT_PRIMARY; spaceAfter = 6
      ensureSpace(18)
    }

    const x = block.tag === 'li' ? MARGIN_LEFT + 18 : MARGIN_LEFT
    const width = block.tag === 'li' ? USABLE_WIDTH - 18 : USABLE_WIDTH

    if (['h1', 'h2', 'h3'].includes(block.tag)) {
      // Wrap heading text
      const lines = wrapText(block.content.replace(/\*\*/g, ''), blockFont, size, width)
      for (const line of lines) {
        ensureSpace(size * 1.4)
        page.drawText(line, { x, y, size, font: blockFont, color })
        y -= size * 1.4
      }
    } else {
      // Paragraph with **bold** support
      y = await drawTextWithBold(page, block.content, x, y, {
        font, fontBold, size, color, maxWidth: width,
      })
    }
    y -= spaceAfter
  }

  // ========== SIGNATURE PAGE ==========
  page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  y = PAGE_HEIGHT - MARGIN_TOP

  page.drawText('SIGNATURES', {
    x: MARGIN_LEFT,
    y,
    size: 14,
    font: fontBold,
    color: BRAND_GREEN,
  })
  y -= 8
  page.drawLine({
    start: { x: MARGIN_LEFT, y },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
    thickness: 2,
    color: BRAND_GREEN,
  })
  y -= 40

  const cellWidth = (USABLE_WIDTH - 40) / 2

  // Client signature
  const signatureNameSize = 24
  page.drawText(signerName, {
    x: MARGIN_LEFT,
    y,
    size: signatureNameSize,
    font: fontItalic,
    color: TEXT_PRIMARY,
  })
  y -= 6
  page.drawLine({
    start: { x: MARGIN_LEFT, y },
    end: { x: MARGIN_LEFT + cellWidth, y },
    thickness: 0.5,
    color: TEXT_MUTED,
  })
  y -= 12
  page.drawText('CLIENT SIGNATURE', {
    x: MARGIN_LEFT,
    y,
    size: 8,
    font: fontBold,
    color: TEXT_MUTED,
  })
  y -= 14

  const signedAtFormatted = new Date(signedAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone: 'America/Chicago' })

  page.drawText(`Name: ${signerName}`, { x: MARGIN_LEFT, y, size: 10, font, color: TEXT_PRIMARY })
  y -= 14
  page.drawText(`Title: ${signerTitle}`, { x: MARGIN_LEFT, y, size: 10, font, color: TEXT_PRIMARY })
  y -= 14
  page.drawText(`Date: ${signedAtFormatted}`, { x: MARGIN_LEFT, y, size: 10, font, color: TEXT_PRIMARY })

  // MACH countersign placeholder (right column)
  let mY = PAGE_HEIGHT - MARGIN_TOP - 40
  page.drawText('Pending countersignature', {
    x: MARGIN_LEFT + cellWidth + 40,
    y: mY,
    size: signatureNameSize,
    font: fontItalic,
    color: TEXT_MUTED,
  })
  mY -= 6
  page.drawLine({
    start: { x: MARGIN_LEFT + cellWidth + 40, y: mY },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y: mY },
    thickness: 0.5,
    color: TEXT_MUTED,
  })
  mY -= 12
  page.drawText('MACH DIGITAL SOLUTIONS', {
    x: MARGIN_LEFT + cellWidth + 40,
    y: mY,
    size: 8,
    font: fontBold,
    color: TEXT_MUTED,
  })
  mY -= 20
  const machNote = 'Awaiting countersignature by an authorized representative of NGS Digital LLC'
  const machLines = wrapText(machNote, font, 10, cellWidth)
  for (const line of machLines) {
    page.drawText(line, { x: MARGIN_LEFT + cellWidth + 40, y: mY, size: 10, font, color: TEXT_SECONDARY })
    mY -= 14
  }

  y = Math.min(y, mY) - 40

  // ========== AUDIT TRAIL ==========
  ensureSpace(200)

  // Gray background box for audit block
  const auditStartY = y
  const auditHeight = 190
  page.drawRectangle({
    x: MARGIN_LEFT,
    y: y - auditHeight,
    width: USABLE_WIDTH,
    height: auditHeight,
    color: BG_GRAY,
    borderColor: TEXT_MUTED,
    borderWidth: 0.5,
  })

  y -= 16
  page.drawText('Electronic Signature Audit Trail', {
    x: MARGIN_LEFT + 16,
    y,
    size: 11,
    font: fontBold,
    color: TEXT_PRIMARY,
  })
  y -= 20

  const auditRows = [
    ['CONTRACT ID', contract.id],
    ['SIGNED AT', signedAtFormatted],
    ['IP ADDRESS', ip || 'not captured'],
    ['CONTRACT HASH (SHA-256)', contract.contract_hash_at_signing || 'pending'],
    ['SIGNER EMAIL', contract.client_signature_email || 'not provided'],
    ['ELECTRONIC CONSENT', 'Explicit consent to electronic signing'],
  ]

  for (const [label, value] of auditRows) {
    page.drawText(label, {
      x: MARGIN_LEFT + 16,
      y,
      size: 8,
      font: fontBold,
      color: TEXT_MUTED,
    })
    y -= 12
    const valueLines = wrapText(String(value), font, 9, USABLE_WIDTH - 32)
    for (const line of valueLines.slice(0, 2)) {
      page.drawText(line, { x: MARGIN_LEFT + 16, y, size: 9, font, color: TEXT_PRIMARY })
      y -= 12
    }
    y -= 4
  }

  // Compliance footer
  ensureSpace(60)
  y -= 20
  const complianceText = 'This contract was executed electronically in compliance with the U.S. Electronic Signatures in Global and National Commerce Act (E-SIGN Act, 15 U.S.C. § 7001) and applicable state Uniform Electronic Transactions Act (UETA).'
  const complianceLines = wrapText(complianceText, fontItalic, 9, USABLE_WIDTH)
  for (const line of complianceLines) {
    page.drawText(line, { x: MARGIN_LEFT, y, size: 9, font: fontItalic, color: TEXT_MUTED })
    y -= 12
  }

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}


// =========================================================
// FULLY EXECUTED PDF (client + MACH signatures)
// =========================================================

export async function generateFullyExecutedPdf(contract) {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  let y = PAGE_HEIGHT - MARGIN_TOP

  const ensureSpace = (needed) => {
    if (y - needed < MARGIN_BOTTOM) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
      y = PAGE_HEIGHT - MARGIN_TOP
    }
  }

  // Header
  page.drawText('NGS DIGITAL LLC', {
    x: PAGE_WIDTH / 2 - fontBold.widthOfTextAtSize('NGS DIGITAL LLC', 10) / 2,
    y, size: 10, font: fontBold, color: BRAND_GREEN,
  })
  y -= 8
  page.drawLine({
    start: { x: MARGIN_LEFT, y }, end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
    thickness: 1.5, color: BRAND_GREEN,
  })
  y -= 30

  const title = 'Digital Services Subscription Agreement'
  page.drawText(title, {
    x: PAGE_WIDTH / 2 - fontBold.widthOfTextAtSize(title, 18) / 2,
    y, size: 18, font: fontBold, color: TEXT_PRIMARY,
  })
  y -= 26

  const subtitle = 'FULLY EXECUTED'
  page.drawText(subtitle, {
    x: PAGE_WIDTH / 2 - fontBold.widthOfTextAtSize(subtitle, 11) / 2,
    y, size: 11, font: fontBold, color: rgb(0.13, 0.55, 0.27),
  })
  y -= 30

  // Body
  const blocks = extractTextBlocks(contract.rendered_html)
  for (const block of blocks) {
    let size, blockFont, color, spaceAfter
    if (block.tag === 'h1') {
      size = 16; blockFont = fontBold; color = TEXT_PRIMARY; spaceAfter = 14
      ensureSpace(30)
    } else if (block.tag === 'h2') {
      size = 12; blockFont = fontBold; color = BRAND_GREEN; spaceAfter = 8
      ensureSpace(24); y -= 6
    } else if (block.tag === 'h3') {
      size = 11; blockFont = fontBold; color = BRAND_GREEN; spaceAfter = 6
      ensureSpace(20); y -= 4
    } else if (block.tag === 'li') {
      size = 10; blockFont = font; color = TEXT_PRIMARY; spaceAfter = 4
      ensureSpace(18)
      page.drawText('•', { x: MARGIN_LEFT + 6, y, size, font, color })
    } else {
      size = 10; blockFont = font; color = TEXT_PRIMARY; spaceAfter = 6
      ensureSpace(18)
    }

    const x = block.tag === 'li' ? MARGIN_LEFT + 18 : MARGIN_LEFT
    const width = block.tag === 'li' ? USABLE_WIDTH - 18 : USABLE_WIDTH

    if (['h1', 'h2', 'h3'].includes(block.tag)) {
      const lines = wrapText(block.content.replace(/\*\*/g, ''), blockFont, size, width)
      for (const line of lines) {
        ensureSpace(size * 1.4)
        page.drawText(line, { x, y, size, font: blockFont, color })
        y -= size * 1.4
      }
    } else {
      y = await drawTextWithBold(page, block.content, x, y, {
        font, fontBold, size, color, maxWidth: width,
      })
    }
    y -= spaceAfter
  }

  // Signature page
  page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  y = PAGE_HEIGHT - MARGIN_TOP

  page.drawText('SIGNATURES', {
    x: MARGIN_LEFT, y, size: 14, font: fontBold, color: BRAND_GREEN,
  })
  y -= 8
  page.drawLine({
    start: { x: MARGIN_LEFT, y }, end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
    thickness: 2, color: BRAND_GREEN,
  })
  y -= 40

  const cellWidth = (USABLE_WIDTH - 40) / 2
  const signatureNameSize = 24

  const clientSignedAt = new Date(contract.signed_at).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone: 'America/Chicago' })

  page.drawText(contract.client_signature_name, {
    x: MARGIN_LEFT, y, size: signatureNameSize, font: fontItalic, color: TEXT_PRIMARY,
  })
  y -= 6
  page.drawLine({
    start: { x: MARGIN_LEFT, y }, end: { x: MARGIN_LEFT + cellWidth, y },
    thickness: 0.5, color: TEXT_MUTED,
  })
  y -= 12
  page.drawText('CLIENT SIGNATURE', { x: MARGIN_LEFT, y, size: 8, font: fontBold, color: TEXT_MUTED })
  y -= 14
  page.drawText(`Name: ${contract.client_signature_name}`, { x: MARGIN_LEFT, y, size: 10, font, color: TEXT_PRIMARY })
  y -= 14
  page.drawText(`Title: ${contract.client_signature_title}`, { x: MARGIN_LEFT, y, size: 10, font, color: TEXT_PRIMARY })
  y -= 14
  page.drawText(`Date: ${clientSignedAt}`, { x: MARGIN_LEFT, y, size: 10, font, color: TEXT_PRIMARY })

  const countersignedAt = new Date(contract.countersigned_at).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone: 'America/Chicago' })

  let mY = PAGE_HEIGHT - MARGIN_TOP - 40
  page.drawText(contract.countersigned_name, {
    x: MARGIN_LEFT + cellWidth + 40, y: mY,
    size: signatureNameSize, font: fontItalic, color: TEXT_PRIMARY,
  })
  mY -= 6
  page.drawLine({
    start: { x: MARGIN_LEFT + cellWidth + 40, y: mY }, end: { x: PAGE_WIDTH - MARGIN_RIGHT, y: mY },
    thickness: 0.5, color: TEXT_MUTED,
  })
  mY -= 12
  page.drawText('MACH DIGITAL SOLUTIONS', {
    x: MARGIN_LEFT + cellWidth + 40, y: mY,
    size: 8, font: fontBold, color: TEXT_MUTED,
  })
  mY -= 14
  page.drawText(`Name: ${contract.countersigned_name}`, { x: MARGIN_LEFT + cellWidth + 40, y: mY, size: 10, font, color: TEXT_PRIMARY })
  mY -= 14
  page.drawText(`Title: ${contract.countersigned_title}`, { x: MARGIN_LEFT + cellWidth + 40, y: mY, size: 10, font, color: TEXT_PRIMARY })
  mY -= 14
  page.drawText(`Date: ${countersignedAt}`, { x: MARGIN_LEFT + cellWidth + 40, y: mY, size: 10, font, color: TEXT_PRIMARY })

  y = Math.min(y, mY) - 40

  // Audit trail
  ensureSpace(220)
  const auditHeight = 210
  page.drawRectangle({
    x: MARGIN_LEFT, y: y - auditHeight,
    width: USABLE_WIDTH, height: auditHeight,
    color: BG_GRAY, borderColor: TEXT_MUTED, borderWidth: 0.5,
  })

  y -= 16
  page.drawText('Electronic Signature Audit Trail', {
    x: MARGIN_LEFT + 16, y, size: 11, font: fontBold, color: TEXT_PRIMARY,
  })
  y -= 20

  const auditRows = [
    ['CONTRACT ID', contract.id],
    ['CLIENT SIGNED', clientSignedAt],
    ['COUNTERSIGNED', countersignedAt],
    ['CLIENT IP', contract.client_signature_ip || 'not captured'],
    ['CONTRACT HASH (SHA-256)', contract.contract_hash_at_signing || 'pending'],
    ['STATUS', 'FULLY EXECUTED — both parties signed'],
  ]

  for (const [label, value] of auditRows) {
    page.drawText(label, {
      x: MARGIN_LEFT + 16, y, size: 8, font: fontBold, color: TEXT_MUTED,
    })
    y -= 12
    const valueLines = wrapText(String(value), font, 9, USABLE_WIDTH - 32)
    for (const line of valueLines.slice(0, 2)) {
      page.drawText(line, { x: MARGIN_LEFT + 16, y, size: 9, font, color: TEXT_PRIMARY })
      y -= 12
    }
    y -= 4
  }

  ensureSpace(60)
  y -= 20
  const complianceText = 'This contract was executed electronically in compliance with the U.S. Electronic Signatures in Global and National Commerce Act (E-SIGN Act, 15 U.S.C. § 7001) and applicable state Uniform Electronic Transactions Act (UETA).'
  const complianceLines = wrapText(complianceText, fontItalic, 9, USABLE_WIDTH)
  for (const line of complianceLines) {
    page.drawText(line, { x: MARGIN_LEFT, y, size: 9, font: fontItalic, color: TEXT_MUTED })
    y -= 12
  }

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}
