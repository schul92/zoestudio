'use client'

import Link from 'next/link'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import type { SeqSet } from './lumosStory'

export type LumosCaption = { label: string; value: string; body: string }
export type LumosCopy = {
  eyebrow: string
  h1Lead: string
  h1Accent: string
  sub: string
  cta1: string
  cta2: string
  scroll: string
  sceneLabel: string
  captions: LumosCaption[]
}

// Brand names stay untranslated when a browser auto-translates the page.
function NoTranslate({ text }: { text: string }) {
  const parts = text.split(/(Zoe Lumos|Shopify)/)
  return (
    <>
      {parts.map((part, i) =>
        part === 'Zoe Lumos' || part === 'Shopify' ? (
          <span key={i} translate="no">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default function LumosHero({
  t,
  prefix,
  desktop,
  mobile,
  firstFrame,
}: {
  t: LumosCopy
  prefix: string
  desktop: SeqSet
  mobile: SeqSet
  firstFrame: ReactNode
}) {
  const storyRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const seqRef = useRef<HTMLCanvasElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const capRefs = useRef<(HTMLDivElement | null)[]>([])
  const [fallback, setFallback] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const story = storyRef.current
    const stage = stageRef.current
    const canvas = seqRef.current
    if (!story || !stage || !canvas) return
    let cancelled = false
    let dispose: (() => void) | undefined
    import('./lumosPlayer')
      .then(({ mountLumos }) => {
        if (cancelled) return
        dispose = mountLumos({
          story, stage, canvas,
          copy: copyRef.current, sub: subRef.current, cta: ctaRef.current, pill: pillRef.current, hint: hintRef.current,
          caps: capRefs.current, desktop, mobile,
          onFallback: () => setFallback(true),
        })
      })
      .catch(() => { if (!cancelled) setFallback(true) })
    return () => { cancelled = true; dispose?.() }
  }, [t, desktop, mobile])

  return (
    <section ref={storyRef} className={`lh-story${reduced ? ' lh-story-reduced' : ''}`} aria-labelledby="hero-title">
      <div ref={stageRef} className="lh-stage">
        {fallback && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/portfolio/tj-flowers.jpg" alt="TJ Flowers Shopify store" className="lh-fallback" />
        )}
        <canvas ref={seqRef} className="lh-seq" role="img" aria-label={t.sceneLabel} />

        <div ref={copyRef} className="lh-copy">
          <p className="lh-eyebrow">
            <NoTranslate text={t.eyebrow} />
          </p>
          <h1 id="hero-title" className="lh-h1">
            <span className="block">{t.h1Lead}</span>
            <span className="block lh-accent">{t.h1Accent}</span>
          </h1>
          <p ref={subRef} className="lh-sub">
            <NoTranslate text={t.sub} />
          </p>
          {firstFrame}
        </div>

        {t.captions.map((c, i) => (
          <div
            key={c.label}
            ref={(el) => { capRefs.current[i] = el }}
            className="lh-cap"
            aria-hidden="true"
          >
            <small>
              <NoTranslate text={c.label} />
            </small>
            <b>{c.value}</b>
            <p>
              <NoTranslate text={c.body} />
            </p>
          </div>
        ))}

        <div ref={ctaRef} className="lh-cta">
          <Link href={`${prefix}/#contact`} className="lh-btn">
            {t.cta1} <span className="lh-btn-arrow" aria-hidden>→</span>
          </Link>
          <Link href={`${prefix}/blog/tj-flowers-shopify-revamp-case-study`} className="lh-link">
            {t.cta2} <span aria-hidden>›</span>
          </Link>
        </div>
        <div ref={pillRef} className="lh-pill">
          <Link href={`${prefix}/#contact`} className="lh-btn lh-pill-btn">
            {t.cta1}
          </Link>
        </div>
        <div ref={hintRef} className="lh-hint" aria-hidden>
          {t.scroll}
        </div>
      </div>
    </section>
  )
}
