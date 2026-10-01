'use client'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./HeaderNew'), {
  ssr: true,
  loading: () => (
    <header className="kn-header kn-solid fixed top-0 inset-x-0 z-[100] border-b border-hairline">
      <div className="container-edge flex items-center h-14 md:h-16">
        <span className="text-[17px] md:text-[19px] font-bold tracking-[-0.03em] text-ink">Zoe Lumos</span>
      </div>
    </header>
  )
})

export default function HeaderWrapper({ locale = 'en' }: { locale?: string }) {
  return <Header locale={locale} />
}