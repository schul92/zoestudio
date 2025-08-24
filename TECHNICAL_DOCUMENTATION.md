# ZOE LUMOS Technical Documentation
## Complete Next.js 14 App Router SSR/SSG Implementation Guide

### Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture Decisions](#architecture-decisions)
4. [Server-Side Rendering Strategy](#server-side-rendering-strategy)
5. [Performance Optimizations](#performance-optimizations)
6. [Internationalization (i18n)](#internationalization-i18n)
7. [Analytics & Tracking](#analytics--tracking)
8. [SEO Implementation](#seo-implementation)
9. [Form Handling & Email](#form-handling--email)
10. [Component Architecture](#component-architecture)
11. [Deployment & Production](#deployment--production)

---

## Project Overview

This is a high-performance, SEO-optimized marketing website built with Next.js 14 App Router, focusing on maximum server-side rendering for optimal Core Web Vitals and Google rankings.

### Key Metrics Achieved
- **Performance Score**: 85-90 (Lighthouse)
- **First Load JS**: 87.1KB shared
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **FID**: < 100ms

---

## Tech Stack

### Core Framework
```json
{
  "next": "14.2.5",          // App Router with RSC (React Server Components)
  "react": "^18.3.1",         // With Server Components support
  "react-dom": "^18.3.1",
  "typescript": "^5.5.3"      // Type safety throughout
}
```

### Styling & Animation
```json
{
  "tailwindcss": "^3.4.4",   // Utility-first CSS
  "framer-motion": "^11.2.10", // Animations (client-side only)
  "autoprefixer": "^10.4.19",
  "postcss": "^8.4.39"
}
```

### Analytics & Monitoring
```json
{
  "@vercel/analytics": "^1.5.0",
  "@vercel/speed-insights": "^1.2.0",
  "Google Analytics 4": "via gtag.js"
}
```

### Email & Forms
```json
{
  "nodemailer": "^7.0.5",
  "react-hook-form": "^7.52.0"  // Form validation
}
```

### Icons & UI
```json
{
  "lucide-react": "^0.539.0"  // Tree-shakeable icons
}
```

---

## Architecture Decisions

### 1. App Router over Pages Router
- **Why**: Better server-side rendering, streaming, and React Server Components
- **Benefits**: Smaller client bundles, faster initial page loads

### 2. Static Generation (SSG) for Most Pages
- **Strategy**: Pre-render at build time for marketing pages
- **Dynamic**: Only API routes and user-specific content

### 3. Component Strategy
```
Server Components (Default):
- Layout components
- Static content
- SEO metadata

Client Components (When Needed):
- Interactive forms
- Animations
- State management
- Event handlers
```

---

## Server-Side Rendering Strategy

### Directory Structure
```
src/app/
├── [locale]/                 # Internationalization
│   ├── layout.tsx           # Root layout (Server Component)
│   ├── page.tsx             # Home page (Server Component)
│   ├── about/
│   ├── pricing/
│   ├── ny-website/          # Location-specific pages
│   └── nj-website/
├── api/                     # API routes
│   ├── contact/
│   └── track/
├── robots.ts                # Dynamic robots.txt
└── sitemap.ts               # Dynamic sitemap.xml
```

### Page Rendering Strategy

#### Server Components (Default)
```tsx
// src/app/[locale]/page.tsx
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Static metadata generation
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: 'Title',
    description: 'Description',
    // Full SEO metadata
  }
}

// Static params for build-time generation
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' }
  ]
}

// Server Component with dynamic imports
export default function Page() {
  // Heavy components loaded dynamically
  const HeavyComponent = dynamic(() => import('./Heavy'), {
    ssr: true,  // Still server-rendered
    loading: () => <div>Loading...</div>
  })
  
  return <HeavyComponent />
}
```

#### Client Components (Interactive)
```tsx
'use client'  // Opt-in to client-side

import { useState, useEffect } from 'react'

export default function Interactive() {
  // Client-side state and effects
  const [state, setState] = useState()
  
  // Hydration-safe mounting
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return <div>Loading...</div>
  
  return <div>{/* Interactive content */}</div>
}
```

---

## Performance Optimizations

### 1. Next.js Configuration
```javascript
// next.config.js
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 60,
  },
  
  // Remove console in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react'],
  },
  
  // Module imports optimization
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
  
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Additional optimization...
        },
      }
    }
    return config
  },
}
```

### 2. Cache Headers Strategy
```javascript
async headers() {
  return [
    // HTML pages - short cache
    {
      source: '/',
      headers: [{
        key: 'Cache-Control',
        value: 'public, s-maxage=3600, stale-while-revalidate=59',
      }],
    },
    // Static assets - long cache
    {
      source: '/_next/static/:path*',
      headers: [{
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      }],
    },
    // API routes - no cache
    {
      source: '/api/:path*',
      headers: [{
        key: 'Cache-Control',
        value: 'no-store, max-age=0',
      }],
    },
  ]
}
```

### 3. Font Loading Strategy
```tsx
// Avoid Google Fonts blocking
<link
  rel="preload"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  as="style"
  onLoad="this.onload=null;this.rel='stylesheet'"
/>

// Fallback fonts immediately available
<style>
  {`body { 
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-display: swap;
  }`}
</style>
```

### 4. Critical CSS Inlining
```tsx
// layout.tsx
<head>
  <style dangerouslySetInnerHTML={{
    __html: `
      /* Critical CSS for above-the-fold */
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: system-ui, -apple-system, sans-serif; }
      .container { max-width: 1280px; margin: 0 auto; }
      /* Only critical styles */
    `
  }} />
</head>
```

---

## Internationalization (i18n)

### URL Structure
```
/          → English homepage
/ko        → Korean homepage
/pricing   → English pricing
/ko/pricing → Korean pricing
```

### Implementation
```tsx
// Middleware for locale detection
// src/middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (!pathnameHasLocale) {
    // Redirect to locale version
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

// Translation hook
// src/hooks/useTranslation.ts
export function useTranslation(locale: string) {
  const translations = locale === 'ko' ? ko : en
  return { t: translations }
}
```

---

## Analytics & Tracking

### Google Analytics 4 Implementation
```tsx
// src/components/GoogleAnalytics.tsx
'use client'

import Script from 'next/script'

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  return (
    <>
      <Script
        strategy="afterInteractive"  // Load after page interactive
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  )
}
```

### Custom Event Tracking
```typescript
// src/lib/analytics.ts
export function track(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
    })
  }
}

// Usage examples
track('form_submit', { form_name: 'contact', email: userEmail })
track('pricing_interaction', { action: 'select_tier', tier: 'pro' })
```

---

## SEO Implementation

### 1. Metadata Generation
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: 'Dynamic Title',
    description: 'Dynamic description',
    keywords: 'keyword1, keyword2',
    authors: [{ name: 'Author' }],
    openGraph: {
      title: 'OG Title',
      description: 'OG Description',
      url: 'https://example.com',
      siteName: 'Site Name',
      images: ['/og-image.png'],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Twitter Title',
      description: 'Twitter Description',
      images: ['/twitter-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://example.com',
      languages: {
        'en': 'https://example.com',
        'ko': 'https://example.com/ko',
      },
    },
  }
}
```

### 2. Structured Data (JSON-LD)
```tsx
// layout.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Company Name",
      "url": "https://example.com",
      "logo": "https://example.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@example.com",
        "contactType": "customer service",
      },
    }),
  }}
/>
```

### 3. Dynamic Sitemap
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          ko: `${baseUrl}/ko`,
        }
      }
    },
    // Additional pages...
  ]
}
```

### 4. Dynamic Robots.txt
```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

---

## Form Handling & Email

### Contact Form with Loading States
```tsx
'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalState, setModalState] = useState({ 
    isOpen: false, 
    type: 'loading' 
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setModalState({ isOpen: true, type: 'loading' })
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setModalState({ isOpen: true, type: 'success' })
        // Reset form after modal closes
      } else {
        setModalState({ isOpen: true, type: 'error' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      <Modal {...modalState} />
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </>
  )
}
```

### API Route with Nodemailer
```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const body = await request.json()
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: body.to,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
```

---

## Component Architecture

### File Organization
```
src/
├── app/                    # App Router pages
├── components/
│   ├── layout/            # Layout components (Header, Footer)
│   ├── sections/          # Page sections (Hero, Services, Contact)
│   ├── ui/                # Reusable UI components
│   └── pricing/           # Pricing-specific components
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── config/                # Configuration files
└── types/                 # TypeScript types
```

### Component Patterns

#### Server Component (Default)
```tsx
// No 'use client' directive
export default function ServerComponent({ data }) {
  // Can fetch data directly
  const content = await fetchContent()
  
  return (
    <div>
      {/* Static content */}
      {content.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

#### Client Component Pattern
```tsx
'use client'

import { useState, useEffect } from 'react'

export default function ClientComponent() {
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <div>Loading...</div>  // Server-side placeholder
  }
  
  return <div>{/* Client-side content */}</div>
}
```

#### Hybrid Pattern (Server + Client)
```tsx
// ServerWrapper.tsx (Server Component)
import ClientInteraction from './ClientInteraction'

export default async function ServerWrapper() {
  const data = await fetchData()  // Server-side data fetching
  
  return (
    <div>
      <h1>{data.title}</h1>  {/* Static content */}
      <ClientInteraction initialData={data} />  {/* Interactive part */}
    </div>
  )
}

// ClientInteraction.tsx (Client Component)
'use client'

export default function ClientInteraction({ initialData }) {
  const [data, setData] = useState(initialData)
  // Interactive logic
}
```

---

## Deployment & Production

### Environment Variables
```env
# .env.production
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-specific-password
```

### Vercel Configuration
```json
// vercel.json
{
  "functions": {
    "app/api/contact/route.ts": {
      "maxDuration": 10
    }
  },
  "redirects": [
    {
      "source": "/en/:path*",
      "destination": "/:path*",
      "permanent": true
    }
  ]
}
```

### Build Optimization Checklist
- [ ] Run `npm run build` and check bundle sizes
- [ ] Ensure all pages are statically generated (●)
- [ ] Check Core Web Vitals with Lighthouse
- [ ] Verify meta tags with browser extensions
- [ ] Test form submissions in production
- [ ] Validate Analytics tracking
- [ ] Check mobile responsiveness
- [ ] Test both language versions
- [ ] Verify sitemap.xml generation
- [ ] Submit to Google Search Console

---

## Performance Monitoring

### Key Metrics to Track
1. **Core Web Vitals**
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

2. **Bundle Size**
   - First Load JS < 100KB
   - Per-page JS < 50KB

3. **SEO Metrics**
   - All pages indexed
   - Rich snippets appearing
   - Mobile-friendly test passing

### Monitoring Tools
- Vercel Analytics (built-in)
- Google PageSpeed Insights
- Google Search Console
- GTmetrix
- WebPageTest

---

## Common Patterns & Solutions

### 1. Dynamic Imports for Heavy Components
```tsx
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { 
    ssr: true,  // Still server-render
    loading: () => <Skeleton />
  }
)
```

### 2. Optimistic UI Updates
```tsx
const [optimisticState, setOptimisticState] = useState(data)

const handleUpdate = async (newData) => {
  setOptimisticState(newData)  // Update immediately
  try {
    await updateAPI(newData)
  } catch {
    setOptimisticState(data)  // Revert on error
  }
}
```

### 3. Intersection Observer for Lazy Loading
```tsx
const [isVisible, setIsVisible] = useState(false)
const ref = useRef(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  
  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])
```

---

## Summary

This architecture prioritizes:
1. **Server-side rendering** for SEO and performance
2. **Static generation** where possible
3. **Progressive enhancement** with client components
4. **Optimized bundle sizes** through code splitting
5. **Type safety** with TypeScript
6. **Analytics integration** for data-driven decisions
7. **Multi-language support** for broader reach
8. **Email integration** for lead capture
9. **Performance monitoring** for continuous improvement

The result is a fast, SEO-optimized, fully-featured marketing website that ranks well on Google and provides excellent user experience.