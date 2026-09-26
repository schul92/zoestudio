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

// Pre-rendered frames of the 3D scene for phones and low-power devices, one per story beat.
export const STILLS = [
  { p: 0, src: '/hero/lumos-still-0.webp' },
  { p: 0.4, src: '/hero/lumos-still-1.webp' },
  { p: 0.55, src: '/hero/lumos-still-2.webp' },
  { p: 0.69, src: '/hero/lumos-still-3.webp' },
  { p: 0.93, src: '/hero/lumos-still-4.webp' },
] as const
