/**
 * Layout wrapper kept for existing call sites. Content is visible at rest —
 * entrance motion is pure CSS (`.reveal`, `.mask-rise`), so nothing waits on
 * an IntersectionObserver or on hydration.
 */
export default function InView({
  children,
  as: Tag = 'div',
  className = '',
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
  return <Node className={`${className} in`.trim()}>{children}</Node>
}
