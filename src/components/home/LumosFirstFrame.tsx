import type { CSSProperties } from 'react'
import { FRAMES_DESKTOP, FRAMES_MOBILE } from './lumosFrames'
import { PHONE_MQ, seqSrc } from './lumosStory'

// Server-only: the first frame is in the HTML (paints before any JS) over a ~400-byte blurred placeholder, so the
// placeholders never ship in the client bundle.
export default function LumosFirstFrame() {
  return (
    <div
      className="lh-first"
      aria-hidden="true"
      style={{ '--ph-d': `url(${FRAMES_DESKTOP.placeholder})`, '--ph-m': `url(${FRAMES_MOBILE.placeholder})` } as CSSProperties}
    >
      <picture>
        <source media={PHONE_MQ} type="image/avif" srcSet={seqSrc(FRAMES_MOBILE.dir, 0, 'avif')} />
        <source media={PHONE_MQ} srcSet={seqSrc(FRAMES_MOBILE.dir, 0, 'webp')} />
        <source type="image/avif" srcSet={seqSrc(FRAMES_DESKTOP.dir, 0, 'avif')} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={seqSrc(FRAMES_DESKTOP.dir, 0, 'webp')} alt="" decoding="async" {...{ fetchpriority: 'high' }} />
      </picture>
    </div>
  )
}
