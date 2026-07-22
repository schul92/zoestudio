#!/usr/bin/env node
/**
 * Move drafts matching a marker phrase to the trash.
 *
 *   node scripts/gmail/prune-drafts.js "phrase"          # dry run — lists only
 *   node scripts/gmail/prune-drafts.js "phrase" --delete # actually trashes
 *
 * Built for cold-email campaign cleanup: each superseded revision of a template
 * carries a phrase the final version does not, so pruning by phrase removes the
 * stale copies and cannot touch the keepers.
 *
 * Dry run is the default on purpose — always eyeball the list before deleting.
 * Drafts go to Trash (recoverable for 30 days), not a hard delete.
 */
const { accessToken, gmail, whoami } = require('./lib')

const phrase = process.argv[2]
const doDelete = process.argv.includes('--delete')

if (!phrase) {
  console.error('Usage: node scripts/gmail/prune-drafts.js "<phrase>" [--delete]')
  process.exit(1)
}

async function main() {
  const token = await accessToken()
  const mailbox = await whoami(token)
  console.log(`📬 mailbox: ${mailbox}`)
  console.log(`🔎 phrase : "${phrase}"`)
  console.log(doDelete ? '⚠️  MODE   : DELETE (to Trash)\n' : '👀 MODE   : dry run\n')

  // Gmail's `q` searches the indexed body, so the phrase filter runs server-side.
  let pageToken
  const hits = []
  do {
    const params = new URLSearchParams({ q: `"${phrase}"`, maxResults: '100' })
    if (pageToken) params.set('pageToken', pageToken)
    const page = await gmail(token, `/drafts?${params}`)
    for (const d of page.drafts || []) hits.push(d.id)
    pageToken = page.nextPageToken
  } while (pageToken)

  if (!hits.length) {
    console.log('No drafts matched — nothing to do.')
    return
  }

  // Confirm each hit really contains the phrase before trashing it. The search
  // index tokenizes, so a `q` match is not proof of a literal substring.
  let trashed = 0
  let skipped = 0
  for (const id of hits) {
    const d = await gmail(token, `/drafts/${id}?format=full`)
    const to = (d.message?.payload?.headers || []).find((h) => h.name.toLowerCase() === 'to')?.value || '?'
    const subject = (d.message?.payload?.headers || []).find((h) => h.name.toLowerCase() === 'subject')?.value || ''
    const body = decodeBody(d.message?.payload)

    if (!body.includes(phrase)) {
      console.log(`  skip  ${to} — "${subject}" (index match only, phrase not in body)`)
      skipped += 1
      continue
    }

    if (doDelete) {
      await gmail(token, `/drafts/${id}`, { method: 'DELETE' })
      console.log(`  trash ${to} — "${subject}"`)
    } else {
      console.log(`  would trash ${to} — "${subject}"`)
    }
    trashed += 1
  }

  console.log(
    `\n${doDelete ? 'Trashed' : 'Would trash'}: ${trashed}` + (skipped ? ` · skipped ${skipped}` : '')
  )
  if (!doDelete) console.log('Re-run with --delete to apply.')
}

/** Walk the MIME tree and concatenate every text part. */
function decodeBody(part, acc = []) {
  if (!part) return acc.join('\n')
  if (part.body?.data) {
    acc.push(Buffer.from(part.body.data, 'base64url').toString('utf8'))
  }
  for (const p of part.parts || []) decodeBody(p, acc)
  return acc.join('\n')
}

main().catch((e) => {
  console.error('❌', e.message)
  if (e.status === 403) {
    console.error('   → Gmail API may be disabled for this Cloud project, or the token lacks gmail.modify.')
    console.error('   → Run: node scripts/gmail/auth.js')
  }
  process.exit(1)
})
