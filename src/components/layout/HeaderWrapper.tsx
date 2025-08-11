'use client'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => (
    <header className="fixed top-0 w-full z-[100] bg-white/10 backdrop-blur-sm">
      <nav className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="h-7 sm:h-8 w-28 sm:w-32 bg-gray-200 animate-pulse rounded" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded" />
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </nav>
    </header>
  )
})

export default function HeaderWrapper({ locale = 'en' }: { locale?: string }) {
  return <Header locale={locale} />
}