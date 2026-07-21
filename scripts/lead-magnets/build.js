#!/usr/bin/env node
/**
 * Build lead-magnet PDFs from the HTML sources in this directory into
 * public/downloads/. Requires Google Chrome (headless print-to-pdf).
 *
 *   node scripts/lead-magnets/build.js
 */
const { execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const SRC = __dirname
const OUT = path.join(__dirname, '..', '..', 'public', 'downloads')

const JOBS = [
  ['pricing-guide-ko.html', 'zoelumos-website-pricing-guide-2026-ko.pdf'],
  ['pricing-guide-en.html', 'zoelumos-website-pricing-guide-2026-en.pdf'],
  ['website-checklist.html', 'zoelumos-website-checklist-ko-en.pdf'],
]

fs.mkdirSync(OUT, { recursive: true })

for (const [src, out] of JOBS) {
  const srcPath = path.join(SRC, src)
  const outPath = path.join(OUT, out)
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--print-to-pdf=' + outPath,
    'file://' + srcPath,
  ], { stdio: 'pipe' })
  const kb = Math.round(fs.statSync(outPath).size / 1024)
  console.log(`built ${out} (${kb} KB)`)
}
