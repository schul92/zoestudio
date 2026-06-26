import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Nav from '@/components/admin/Nav'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'ZOE LUMOS — Analytics',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-zinc-950 text-zinc-100 antialiased`} style={{ background: '#09090b', color: '#fafafa' }}>
        <Nav />
        <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
      </body>
    </html>
  )
}
