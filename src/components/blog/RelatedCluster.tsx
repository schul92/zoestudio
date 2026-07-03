import Link from 'next/link'
import { blogContent } from '@/data/blogContent'
import { PILLARS, POST_TO_PILLAR } from '@/data/blogClusters'
import { pillarHubExists } from '@/components/blog/pillarLinks'

/**
 * Renders the topic cluster of which the current post is a member —
 * linking up to the pillar hub page (when the route exists) and 4-5
 * sibling posts in the same cluster. This is the structural piece that
 * lets Google (and AI engines) classify topical authority.
 *
 * Per Search Engine Land cluster research, AI citation rates jump from
 * ~12% to ~41% when hub-and-spoke internal linking is implemented.
 *
 * Unmapped slugs no longer dead-end: they fall back to the 3 newest posts.
 */

type Post = (typeof blogContent)[0]

function SiblingList({
  posts,
  locale,
  prefix,
}: {
  posts: Post[]
  locale: 'en' | 'ko'
  prefix: string
}) {
  const isKo = locale === 'ko'
  return (
    <ul className="divide-y divide-hairline">
      {posts.map((post, i) => (
        <li key={post.slug}>
          <Link
            href={`${prefix}/blog/${post.slug}`}
            className="group flex items-baseline justify-between gap-6 py-5 md:py-6"
          >
            <div className="flex items-baseline gap-4 min-w-0">
              <span className="overline text-ash shrink-0 w-8">
                0{i + 1}
              </span>
              <div className="min-w-0">
                <h4 className="font-display text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.35] tracking-luxury text-ink m-0 group-hover:text-gold transition-colors">
                  {post.title[locale]}
                </h4>
                <p className="overline text-ash mt-2">
                  {post.category[locale]} · {post.readTime} {isKo ? '분' : 'min'}
                </p>
              </div>
            </div>
            <span
              aria-hidden
              className="text-ash group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function RelatedCluster({
  currentSlug,
  locale,
}: {
  currentSlug: string
  locale: 'en' | 'ko'
}) {
  const prefix = locale === 'ko' ? '/ko' : ''
  const isKo = locale === 'ko'

  const pillarKey = POST_TO_PILLAR[currentSlug]
  const pillar = pillarKey ? PILLARS[pillarKey] : undefined

  // Sibling posts: everything in the cluster except the current post.
  // Cap at 5 visible siblings so the section doesn't dominate the page.
  const siblings: Post[] = pillar
    ? (pillar.posts
        .filter((s) => s !== currentSlug)
        .slice(0, 5)
        .map((slug) => blogContent.find((p) => p.slug === slug))
        .filter(Boolean) as Post[])
    : []

  // Fallback for unmapped slugs (or empty clusters): 3 newest other posts,
  // so the section never silently disappears.
  const fallback: Post[] =
    !pillar || siblings.length === 0
      ? [...blogContent]
          .filter((p) => p.slug !== currentSlug)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3)
      : []

  if (siblings.length === 0 && fallback.length === 0) return null

  // Pillar hub link. When the dedicated hub route exists under
  // src/app/[locale]/, link it; otherwise fall back to the strongest
  // existing post in the cluster (pillarSlug).
  const hubExists = pillarKey ? pillarHubExists(pillarKey) : false
  const pillarPost = pillar
    ? blogContent.find((p) => p.slug === pillar.pillarSlug)
    : undefined
  const pillarHref = pillar
    ? hubExists
      ? `${prefix}${pillar.pillarUrl}`
      : pillarPost && currentSlug !== pillar.pillarSlug
        ? `${prefix}/blog/${pillarPost.slug}`
        : null
    : null

  const usingFallback = !pillar || siblings.length === 0

  return (
    <section className="hair-top bg-bone">
      <div className="container-edge max-w-4xl py-16 md:py-20">
        <div className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
          <span className="section-num italic text-ink">∞</span>
          <span className="h-px w-10 bg-hairline" />
          <span>
            {usingFallback
              ? isKo ? '최신 글' : 'Latest from the journal'
              : isKo ? '관련 시리즈' : 'Related cluster'}
          </span>
        </div>

        {/* Pillar header + prominent hub link */}
        {pillar && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-10 md:mb-12 items-end">
            <div className="md:col-span-8">
              <p className="overline text-gold mb-3">
                {isKo ? '시리즈 주제' : 'Topic'}
              </p>
              <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-luxury text-ink m-0">
                {pillarHref ? (
                  <Link href={pillarHref} className="hover:text-gold transition-colors">
                    {pillar.label[locale]}
                  </Link>
                ) : (
                  pillar.label[locale]
                )}
              </h3>
            </div>
            {pillarHref && (
              <div className="md:col-span-4 md:text-right">
                <Link
                  href={pillarHref}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-ink border-b border-ink hover:text-gold hover:border-gold pb-1 transition-colors"
                >
                  {hubExists
                    ? isKo ? '전체 가이드 보기' : 'Read the full guide'
                    : isKo ? '시리즈 메인 보기' : 'Read the pillar'}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Sibling list (or newest-posts fallback) */}
        <SiblingList
          posts={usingFallback ? fallback : siblings}
          locale={locale}
          prefix={prefix}
        />
      </div>
    </section>
  )
}
