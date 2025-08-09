export default function SocialMediaIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="35" cy="35" r="12" stroke="currentColor" strokeWidth="3"/>
      <circle cx="65" cy="35" r="12" stroke="currentColor" strokeWidth="3"/>
      <circle cx="50" cy="65" r="12" stroke="currentColor" strokeWidth="3"/>
      <path
        d="M44 40L41 60M56 40L59 60M42 30L58 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}