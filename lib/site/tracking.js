// Renders GA4 + GTM tags in <head>-adjacent inline scripts.
// GSC verification is a <meta> tag returned via generateMetadata (see below).
//
// Internal traffic (November 2026): visits from us and from the client's own
// staff are tagged traffic_type=internal, which the property's "Internal
// Traffic" data filter drops, so their own clicking around never counts as
// customers. A browser is internal when it carries our staff cookie (any
// Command Center staff link marks it; the server passes that in as internal),
// or when someone opened the site once with ?mach_internal=on, which sets a
// cookie for 400 days. ?mach_internal=off clears it.
const INTERNAL_COOKIE = 'mach_internal'
const internalScript = (staff) => `(function(){try{var q=new URLSearchParams(location.search).get('${INTERNAL_COOKIE}');` +
  `if(q==='on'){document.cookie='${INTERNAL_COOKIE}=1; path=/; max-age=34560000; SameSite=Lax'}` +
  `else if(q==='off'){document.cookie='${INTERNAL_COOKIE}=; path=/; max-age=0; SameSite=Lax'}` +
  `window.__machInternal=${staff ? 'true' : 'false'}||/(?:^|; )${INTERNAL_COOKIE}=1/.test(document.cookie)}catch(e){window.__machInternal=${staff ? 'true' : 'false'}}})();`

export function TrackingScripts({ tracking, internal = false }) {
  if (!tracking) return null
  const { ga4_measurement_id, gtm_container_id } = tracking

  return (
    <>
      {ga4_measurement_id && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4_measurement_id}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `${internalScript(internal)}window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${ga4_measurement_id}', window.__machInternal ? { traffic_type: 'internal' } : {});`,
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
