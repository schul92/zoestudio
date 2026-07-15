import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  variable: '--font-sans',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Booking Demo — ZOE LUMOS',
  // Prototype against the Square sandbox: never index.
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF7F0',
}

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${fraunces.variable} min-h-screen bg-ivory text-ink antialiased`}>
        {children}
      </body>
    </html>
  )
}
