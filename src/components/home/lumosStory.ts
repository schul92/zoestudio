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

// Phones play the portrait set; everything wider plays the 16:9 set. Keep in sync with the CSS.
export const PHONE_MQ = '(max-width: 820px)'

// Photoreal pre-rendered image sequences scrubbed by scroll (Apple's method), AVIF with a WebP fallback, in
// content-hashed folders (served immutable). Frames are cropped to the product so the player can fit it into the
// measured band at any viewport; meta.txt (JSON; .txt so the locale middleware skips it) holds each crop size.
// Desktop renders are 16:9 at 1920, phone renders are portrait at 1170. Folder names come from lumosFrames.ts
// (generated), passed in from the server so the placeholders there never reach the client bundle.
export type SeqSet = { dir: string; count: number; maxDpr: number }
export const seqSrc = (dir: string, i: number, ext: 'avif' | 'webp') => `${dir}/f${String(i).padStart(2, '0')}.${ext}`
