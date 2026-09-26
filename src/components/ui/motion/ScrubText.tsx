/**
 * ScrubText — scroll-scrubbed, word-by-word reveal in pure CSS.
 *
 * Each word ramps from a dim ghost to full ink across its own slice of the
 * element's view timeline (`animation-timeline: view()`). Browsers without
 * scroll-driven animations, and reduced-motion readers, see plain full text.
 * Splits on whitespace only, so it reads correctly for Korean and English.
 */

type ScrubTextProps = {
  children: string
  className?: string
  as?: 'h2' | 'p'
}

export default function ScrubText({ children, className = '', as = 'p' }: ScrubTextProps) {
  const tokens = (children ?? '').split(/(\s+)/)
  const words = tokens.filter((t) => t.trim()).length
  let w = 0
  const Tag = as

  return (
    <Tag className={`kn-scrub ${className}`}>
      {tokens.map((tok, i) => {
        if (!tok.trim()) return tok
        const start = (w / words) * 60
        w += 1
        return (
          <span key={i} className="kn-scrub-w" style={{ ['--s' as string]: `${start}%` }}>
            {tok}
          </span>
        )
      })}
    </Tag>
  )
}
