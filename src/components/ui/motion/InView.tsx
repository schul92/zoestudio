/**
 * Layout wrapper kept for existing call sites. Content is visible at rest —
 * entrance motion is pure CSS (`.reveal`, `.mask-rise`), so nothing waits on
 * an IntersectionObserver or on hydration. `delay` becomes the --rv-d custom
 * property those animations read, so authored staggers actually play.
 */
export default function InView({
  children,
  as: Tag = 'div',
  className = '',
  delay,
}: {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  className?: string
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
}) {
  const Node = Tag as any
  const style = delay ? ({ '--rv-d': `${delay}ms` } as React.CSSProperties) : undefined
  return (
    <Node className={`${className} in`.trim()} style={style}>
      {children}
    </Node>
  )
}
