// Story beats — the single source of truth for caption ranges. Screen swaps and camera moves are baked into
// the pre-rendered frames (Blender, same timings): TJ Flowers → EndoPia → TJ Flowers (search) → Salt & Polish + phone.
export const CAPTION_RANGES = [
  [0.3, 0.47],
  [0.47, 0.62],
  [0.62, 0.76],
  [0.76, 1.01],
] as const
// Progress used for the static frame when the user prefers reduced motion.
export const REDUCED_P = 0.42
// End of the opening segment (lid opens, screen lights, camera settles square-on). Its frames load first, in order.
export const OPENING_END = 0.42
// Frames up to here are decoded right after load and kept resident, so a fling through the lid opening never waits
// on a decode.
export const PIN_END = 0.35
// Copy block (eyebrow, H1, subline) fades out over this range; the product band only moves up after it has gone.
export const COPY_FADE = [0.04, 0.13] as const
export const BAND_RISE = [0.1, 0.22] as const

// Phones play the portrait set; everything wider plays the 16:9 set. Keep in sync with the CSS.
export const PHONE_MQ = '(max-width: 820px)'

// Photoreal pre-rendered image sequences scrubbed by scroll (Apple's method), AVIF with a WebP fallback, in
// content-hashed folders (served immutable). Frames are cropped to the product so the player can fit it into the
// measured band at any viewport; meta.txt (JSON; .txt so the locale middleware skips it) holds, per frame, its story
// progress p and its crop box within the shared render frame. Frames are motion-weighted (dense while things move,
// sparse on static holds), so the player maps scroll progress → frame by p, not by index.
// Desktop renders are 16:9 at 1920, phone renders are portrait at 1170. Folder names come from lumosFrames.ts
// (generated), passed in from the server so the placeholders there never reach the client bundle.
export type SeqSet = { dir: string; count: number; maxDpr: number }
export const seqSrc = (dir: string, i: number, ext: 'avif' | 'webp') => `${dir}/f${String(i).padStart(3, '0')}.${ext}`
export type SeqMeta = { rw: number; rh: number; f: { p: number; x: number; y: number; w: number; h: number }[] }
