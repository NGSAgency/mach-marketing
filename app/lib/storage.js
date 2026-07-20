// Upload a signed contract PDF to Supabase Storage
// Bucket: signed-contracts (private)

export async function uploadSignedPdf(contractId, pdfBuffer) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const path = `${contractId}/signed.pdf`
  const uploadUrl = `${supabaseUrl}/storage/v1/object/signed-contracts/${path}`

  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/pdf',
      'x-upsert': 'true',
    },
    body: pdfBuffer,
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Storage upload failed: ${err}`)
  }

  // Generate a signed URL valid for 1 year (for viewing)
  const signResponse = await fetch(`${supabaseUrl}/storage/v1/object/sign/signed-contracts/${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ expiresIn: 31536000 }), // 1 year
  })

  if (!signResponse.ok) {
    return { path, signedUrl: null }
  }

  const signed = await signResponse.json()
  return {
    path,
    signedUrl: `${supabaseUrl}/storage/v1${signed.signedURL}`,
  }
}
