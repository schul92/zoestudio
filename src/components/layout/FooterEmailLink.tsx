// Clicks are counted by the delegated listener in src/lib/analyticsBoot.ts.
interface FooterEmailLinkProps {
  email: string
}

export default function FooterEmailLink({ email }: FooterEmailLinkProps) {
  return (
    <a
      href={`mailto:${email}`}
      className="flex items-center group/link text-gray-400 hover:text-amber-400 transition-colors duration-200"
    >
      <span className="mr-3 text-lg group-hover/link:scale-110 transition-transform duration-200">✉️</span>
      <span className="text-sm border-b border-transparent group-hover/link:border-amber-400 transition duration-200">
        {email}
      </span>
    </a>
  )
}
