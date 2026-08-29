/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      // beforeFiles runs before the filesystem is checked, so these map an
      // industry's URL segment onto the existing route without adding a
      // dynamic sibling that could shadow the combo page catch-all.
      //
      // A med spa's pages live at /treatments/botox while an HVAC company's
      // live at /services/ac-repair. Both are served by the same route.
      // URL keywords are a weak ranking signal, but changing URLs after launch
      // is harmful, so the segment is fixed correctly at build time.
      beforeFiles: [
        // Offering segments
        { source: '/site/:slug/treatments', destination: '/site/:slug/services' },
        { source: '/site/:slug/treatments/:item', destination: '/site/:slug/services/:item' },
        { source: '/site/:slug/packages', destination: '/site/:slug/services' },
        { source: '/site/:slug/packages/:item', destination: '/site/:slug/services/:item' },

        // Place segments
        { source: '/site/:slug/locations', destination: '/site/:slug/service-areas' },
        { source: '/site/:slug/locations/:item', destination: '/site/:slug/service-areas/:item' },

        // Same mappings for the mockup preview route
        { source: '/mockup/:token/treatments/:item', destination: '/mockup/:token' },
        { source: '/mockup/:token/packages/:item', destination: '/mockup/:token' },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
