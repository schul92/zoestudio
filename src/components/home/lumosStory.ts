// Kept free of three.js so the hero can import it without pulling the 3D chunk into first-load JS.
// Story beats — the single source of truth for screen swaps and caption ranges.
// Screens: TJ Flowers → EndoPia → TJ Flowers (search result) → Salt & Polish (with the phone).
export const SCREEN_BREAKS = [0.47, 0.62, 0.76] as const
export const SCREEN_ORDER = [0, 1, 0, 2] as const
export const CAPTION_RANGES = [
  [0.3, 0.47],
  [0.47, 0.62],
  [0.62, 0.76],
  [0.76, 1.01],
] as const
// Progress used for the static frame when the user prefers reduced motion.
export const REDUCED_P = 0.42

// Phones and low-power devices play a pre-rendered image sequence of the 3D story (Apple's method)
// instead of loading three.js. Each frame is cropped to the product; meta.txt (JSON; .txt so the locale middleware skips it) holds the crop sizes.
export const SEQ_COUNT = 60
export const SEQ_DIR = '/hero/seq'
export const seqSrc = (i: number) => `${SEQ_DIR}/f${String(i).padStart(2, '0')}.webp`
