import type { BlogPost, BlogSection } from '@/data/blogContent'
import { SITE_URL } from '@/lib/siteUrl'

// Markdown twin of a blog post, for AI assistants and agents that read text rather than rendered pages.
// Same words as the HTML (nothing an ordinary reader cannot see), served at /blog/<slug>.md and to
// `Accept: text/markdown` requests for /blog/<slug>.

export const postUrl = (slug: string, locale: 'en' | 'ko') =>
  `${SITE_URL}${locale === 'ko' ? '/ko' : ''}/blog/${slug}`

// Pipe-delimited section items as a Markdown table, one column per header.
function table(s: BlogSection, headers: string[]): string {
  const rows = (s.items || []).map((i) => i.split('|').map((c) => c.trim()))
  return [
    ...(s.content ? [`**${s.content}**`, ''] : []),
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| ${headers.map((_, i) => r[i] || '').join(' | ')} |`),
  ].join('\n')
}

function section(s: BlogSection, locale: 'en' | 'ko'): string {
  switch (s.type) {
    case 'intro':
    case 'p':
      return s.content
    case 'h2':
      return `## ${s.content}`
    case 'ul':
      return [s.content, ...(s.items || []).map((i) => `- ${i}`)].filter(Boolean).join('\n')
    case 'tip':
      return `> **${locale === 'ko' ? '참고' : 'Note'}:** ${s.content}`
    case 'cta':
      return `${s.content}\n\n[${locale === 'ko' ? '무료 상담 받기' : 'Get a free consultation'}](${SITE_URL}${locale === 'ko' ? '/ko' : ''}/contact)`
    case 'stats':
      // items: 'CHANGE|LABEL|ABSOLUTE'
      return table(s, locale === 'ko' ? ['수치', '항목', '비고'] : ['Figure', 'Measure', 'Detail'])
    case 'bars':
      // items: 'LABEL|VALUE[|highlight]'; the caption carries the unit
      return table(s, locale === 'ko' ? ['항목', '값'] : ['Item', 'Value'])
    case 'screenshot': {
      const caption = s.items?.[0] || ''
      return `![${caption}](${SITE_URL}${s.content})${caption ? `\n\n*${caption}*` : ''}`
    }
    default:
      return s.content || ''
  }
}

export function blogPostMarkdown(post: BlogPost, locale: 'en' | 'ko'): string {
  const sections = post.sections[locale]?.length ? post.sections[locale] : post.sections.en
  const updated = post.updatedDate || post.date
  const lines = [
    `# ${post.title[locale]}`,
    '',
    `> ${post.metaDescription[locale]}`,
    '',
    locale === 'ko'
      ? `작성: ${post.author} · ZOE LUMOS (조이루모스) · 게시 ${post.date} · 수정 ${updated} · 원문: ${postUrl(post.slug, locale)}`
      : `By ${post.author} · ZOE LUMOS · Published ${post.date} · Updated ${updated} · Source: ${postUrl(post.slug, locale)}`,
    '',
  ]

  // The page opens with this "Quick answer" block, above the article.
  if (post.howto) {
    lines.push(
      `## ${post.howto.name[locale]}`,
      '',
      post.howto.description[locale],
      '',
      ...post.howto.steps.map((st, i) => `${i + 1}. **${st.name[locale]}** — ${st.text[locale]}`),
      '',
    )
  }

  lines.push(sections.map((s) => section(s, locale)).filter(Boolean).join('\n\n'))

  if (post.faq?.length) {
    lines.push('', locale === 'ko' ? '## 자주 묻는 질문' : '## Frequently asked questions')
    for (const f of post.faq) lines.push('', `### ${f.q[locale]}`, '', f.a[locale])
  }

  lines.push(
    '',
    '---',
    '',
    locale === 'ko'
      ? `ZOE LUMOS는 뉴저지 포트리의 한·영 이중언어 웹 스튜디오입니다. 문의: info@zoelumos.com · ${SITE_URL}/ko/contact`
      : `ZOE LUMOS is a bilingual (English · Korean) web studio in Fort Lee, NJ. Contact: info@zoelumos.com · ${SITE_URL}/contact`,
    '',
  )
  return lines.join('\n')
}
