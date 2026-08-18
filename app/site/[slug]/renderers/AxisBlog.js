// Axis blog skin.
// All structure and SEO live in the shared BlogCore. This file supplies only
// this family's tokens and chrome, so a new template family needs a file this
// size rather than a full renderer.
import { axisTokens } from '../../../templates/axis/tokens.js'
import { applyBrand } from '../../../../lib/templates/shared/brand.js'
import { TrackingScripts } from '../../../../lib/site/tracking.js'
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import { AxisHeader, AxisFooter } from './AxisServices.js'

function makeChrome(T, c, logo, base) {
  return function Chrome({ children }) {
    return (
      <div style={{ background: T.colors.bg, color: T.colors.text, fontFamily: T.fonts.body, minHeight: '100vh' }}>
        <TrackingScripts tracking={c.tracking} />
        <AxisHeader T={T} c={c} logo={logo} base={base} />
        {children}
        <AxisFooter T={T} c={c} />
      </div>
    )
  }
}

export function AxisBlogIndex({ config: c, siteSlug, posts }) {
  const T = applyBrand(axisTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const base = `/site/${siteSlug}`
  return <BlogIndexCore T={T} config={c} posts={posts} base={base} Chrome={makeChrome(T, c, c.brand?.logo_url, base)} />
}

export function AxisBlogPost({ config: c, siteSlug, post, prev, next }) {
  const T = applyBrand(axisTokens, { accent: c.brand?.primary_accent, logo: c.brand?.logo_url })
  const base = `/site/${siteSlug}`
  return <BlogPostCore T={T} config={c} post={post} prev={prev} next={next} base={base} Chrome={makeChrome(T, c, c.brand?.logo_url, base)} />
}
