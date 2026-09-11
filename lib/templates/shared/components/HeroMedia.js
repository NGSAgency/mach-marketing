import HeroVideo from './HeroVideo.js'

/**
 * The hero's background: the business's own video when they have one,
 * otherwise the photo. Video is only ever the business's own footage (their
 * site or what they send us), never stock.
 *
 * The photo (or the video's poster) is a real <img> that loads first: it is
 * usually what Google times as the page's main paint (LCP), so it is never
 * lazy-loaded and asks the browser for top priority. The video itself is
 * added by HeroVideo after the page has loaded, on larger screens only, with
 * a pause button (WCAG 2.2.2).
 */
export default function HeroMedia({ image, video, alt = '', style = {} }) {
  const fill = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style }
  const src = image?.url || video?.poster || null
  return (
    <>
      {src && (
        <img
          src={src}
          alt={image?.url ? (image.alt || alt) : ''}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          style={fill}
        />
      )}
      {video?.url && <HeroVideo url={video.url} poster={video.poster || src || undefined} style={fill} />}
    </>
  )
}
