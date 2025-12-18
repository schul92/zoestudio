'use client'

import { trackEmailClick } from '@/utils/analytics'

interface FooterEmailLinkProps {
  email: string
}

export default function FooterEmailLink({ email }: FooterEmailLinkProps) {
  return (
    <a
      href={`mailto:${email}`}
      onClick={() => trackEmailClick(email)}
      className="flex items-center group/link text-gray-600 hover:text-black transition-colors duration-200"
    >
      <span className="mr-3 text-lg group-hover/link:scale-110 transition-transform duration-200">✉️</span>
      <span className="text-sm border-b border-transparent hover:border-black transition-all duration-200">
        {email}
      </span>
    </a>
  )
}
