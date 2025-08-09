export default function SEOIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3"/>
      <path
        d="M65 65L75 75"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M35 40C35 40 40 35 50 35C60 35 65 40 65 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="40" cy="50" r="2" fill="currentColor"/>
      <circle cx="50" cy="50" r="2" fill="currentColor"/>
      <circle cx="60" cy="50" r="2" fill="currentColor"/>
    </svg>
  )
}