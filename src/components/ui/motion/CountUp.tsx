/**
 * Renders the figure as-is. The old count-up server-rendered "0" until
 * hydration, so previews, crawlers and slow phones showed wrong numbers.
 */
export default function CountUp({
  value,
  className = '',
}: {
  value: string
  duration?: number
  className?: string
}) {
  return <span className={`tabular-nums ${className}`.trim()}>{value}</span>
}
