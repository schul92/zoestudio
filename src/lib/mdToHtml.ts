/**
 * Minimal Markdown → HTML for the RSS feed's <content:encoded>.
 *
 * Naver Search Advisor asks for the full post body in every RSS item, and our posts already exist as Markdown
 * twins (lib/blogMarkdown.ts). That Markdown only uses a small subset — headings, paragraphs, blockquotes,
 * ordered/unordered lists, pipe tables, **bold** and [links](https://…) — so a tiny converter is enough and
 * keeps a parser dependency out of the bundle.
 */

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function inline(s: string): string {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>')
}

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((c) => c.trim())

export function mdToHtml(md: string): string {
  const out: string[] = []
  const lines = md.split('\n')
  let para: string[] = []
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null
  let table: string[][] | null = null

  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`)
    para = []
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`)
    list = null
    if (table) {
      const [head, ...body] = table
      out.push(
        `<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>` +
          `<tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
      )
    }
    table = null
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    let m: RegExpMatchArray | null
    if (!line.trim()) {
      flush()
    } else if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      flush()
      out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`)
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flush()
      out.push(`<blockquote><p>${inline(m[1])}</p></blockquote>`)
    } else if (line.trim().startsWith('|')) {
      if (list || para.length) flush()
      if (/^\|?[\s:|-]+\|?$/.test(line.trim())) continue // header separator row
      ;(table ??= []).push(cells(line))
    } else if ((m = line.match(/^\s*(\d+)\.\s+(.*)$/)) || (m = line.match(/^\s*[-*]\s+(.*)$/))) {
      const tag = /^\s*\d+\./.test(line) ? 'ol' : 'ul'
      const text = tag === 'ol' ? m[2] : m[1]
      if (para.length || table || (list && list.tag !== tag)) flush()
      ;(list ??= { tag, items: [] }).items.push(text)
    } else {
      if (list || table) flush()
      para.push(line.trim())
    }
  }
  flush()
  return out.join('\n')
}
