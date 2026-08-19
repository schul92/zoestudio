#!/usr/bin/env node
/**
 * Keep only the newest draft per recipient; trash the older duplicates.
 *
 *   node scripts/gmail/dedupe-drafts.js recipients.txt          # dry run
 *   node scripts/gmail/dedupe-drafts.js recipients.txt --delete
 *
 * recipients.txt: one email address per line (blank lines and # comments ok).
 *
 * Rewriting a campaign means re-creating every draft — the Gmail API has no
 * update. That leaves one stale copy per revision, and they are not
 * distinguishable by content once the wording converges. Scoping to an explicit
 * recipient list keeps unrelated drafts (clients, quotes) untouched.
 */
const fs = require('fs')
const { accessToken, gmail, whoami } = require('./lib')

const listFile = process.argv[2]
const doDelete = process.argv.includes('--delete')

if (!listFile) {
  console.error('Usage: node scripts/gmail/dedupe-drafts.js <recipients.txt> [--delete]')
  process.exit(1)
}

const targets = new Set(
  fs
    .readFileSync(listFile, 'utf8')
    .split('\n')
    .map((l) => l.trim().toLowerCase())
    .filter((l) => l && !l.startsWith('#'))
)

async function main() {
  const token = await accessToken()
  console.log(`📬 mailbox: ${await whoami(token)}`)
  console.log(`🎯 recipients: ${targets.size}`)
  console.log(doDelete ? '⚠️  MODE: DELETE (to Trash)\n' : '👀 MODE: dry run\n')

  let pageToken
  const all = []
  do {
    const params = new URLSearchParams({ maxResults: '100' })
    if (pageToken) params.set('pageToken', pageToken)
    const page = await gmail(token, `/drafts?${params}`)
    all.push(...(page.drafts || []))
    pageToken = page.nextPageToken
  } while (pageToken)

  // Group every draft addressed to a target recipient, newest first.
  const byRecipient = new Map()
  for (const d of all) {
    const full = await gmail(token, `/drafts/${d.id}?format=metadata`)
    const headers = full.message?.payload?.headers || []
    const to = (headers.find((h) => h.name.toLowerCase() === 'to')?.value || '').toLowerCase()
    const match = [...targets].find((t) => to.includes(t))
    if (!match) continue
    const subject = headers.find((h) => h.name.toLowerCase() === 'subject')?.value || ''
    const ts = Number(full.message?.internalDate || 0)
    if (!byRecipient.has(match)) byRecipient.set(match, [])
    byRecipient.get(match).push({ id: d.id, subject, ts })
  }

  let kept = 0
  let removed = 0
  for (const [recipient, drafts] of byRecipient) {
    drafts.sort((a, b) => b.ts - a.ts)
    const [keep, ...stale] = drafts
    kept += 1
    console.log(`${recipient}`)
    console.log(`  keep  "${keep.subject}"  (${new Date(keep.ts).toISOString().slice(11, 19)})`)
    for (const s of stale) {
      if (doDelete) await gmail(token, `/drafts/${s.id}`, { method: 'DELETE' })
      console.log(`  ${doDelete ? 'trash' : 'would trash'} "${s.subject}"  (${new Date(s.ts).toISOString().slice(11, 19)})`)
      removed += 1
    }
  }

  console.log(`\nkept ${kept} · ${doDelete ? 'trashed' : 'would trash'} ${removed}`)
  const missing = [...targets].filter((t) => !byRecipient.has(t))
  if (missing.length) {
    console.log(`\n⚠️  no draft found for ${missing.length}:`)
    missing.forEach((m) => console.log('   -', m))
  }
  if (!doDelete) console.log('\nRe-run with --delete to apply.')
}

main().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
