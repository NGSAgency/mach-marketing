// Renders GA4 + GTM tags in <head>-adjacent inline scripts.
// GSC verification is a <meta> tag returned via generateMetadata (see below).
export function TrackingScripts({ tracking }) {
  if (!tracking) return null
  const { ga4_measurement_id, gtm_container_id } = tracking

  return (
    <>
      {ga4_measurement_id && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4_measurement_id}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${ga4_measurement_id}');`,
            }}
          />
        </>
      )}
      {gtm_container_id && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm_container_id}');`,
          }}
        />
      )}
    </>
  )
}

// Build GSC verification meta into any page's metadata
export function trackingMetadata(tracking) {
  if (!tracking?.search_console_verification) return {}
  return {
    other: { 'google-site-verification': tracking.search_console_verification },
  }
}
