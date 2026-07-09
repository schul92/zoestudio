'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const TABS = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/ads', label: 'Google Ads' },
  { href: '/admin/gsc', label: 'Search Console' },
  { href: '/admin/ga4', label: 'Analytics (GA4)' },
]

export default function Nav() {
  const pathname = usePathname()

  if (pathname === '/admin/login') return null

  async function logout() {
    await signOut({ redirectTo: '/admin/login' })
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-6">
          <span className="font-semibold tracking-tight text-zinc-100">
            ZOE <span className="font-light text-zinc-400">LUMOS</span>
            <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400">Analytics</span>
          </span>
          <nav className="hidden items-center gap-1 md:flex">
            {TABS.map((t) => {
              const active = pathname === t.href
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    active ? 'bg-white/10 text-zinc-50' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                  }`}
                >
                  {t.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <button onClick={logout} className="text-xs text-zinc-500 transition-colors hover:text-zinc-300">
          Log out
        </button>
      </div>
      {/* mobile tabs */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-white/5 px-3 py-2 md:hidden">
        {TABS.map((t) => {
          const active = pathname === t.href
          return (
            <Link key={t.href} href={t.href} className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm ${active ? 'bg-white/10 text-zinc-50' : 'text-zinc-400'}`}>
              {t.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
