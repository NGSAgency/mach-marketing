// CREW blog skin: the shared BlogCore (structure, structured data, SEO) in
// CREW's chrome. Posts used to fall through to Bolt's.
import { BlogIndexCore, BlogPostCore } from '../../../../lib/templates/shared/blog/BlogCore.js'
import { crewContext, CrewPage } from './CrewChrome.js'

function chrome(x) {
  return function Chrome({ children }) {
    return <CrewPage x={x} current="blog">{children}</CrewPage>
  }
}

export function CrewBlogIndex({ config: c, siteSlug, posts }) {
  const x = crewContext(c, siteSlug)
  return <BlogIndexCore T={x.T} config={c} posts={posts} base={x.base} Chrome={chrome(x)} />
}

export function CrewBlogPost({ config: c, siteSlug, post, prev, next }) {
  const x = crewContext(c, siteSlug)
  return <BlogPostCore T={x.T} config={c} post={post} prev={prev} next={next} base={x.base} Chrome={chrome(x)} />
}
