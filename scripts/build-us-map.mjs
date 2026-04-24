#!/usr/bin/env node
/**
 * Build-time: converts the us-atlas states-albers-10m topojson into a
 * compact set of SVG paths at a fixed viewBox. Emits a TS module that the
 * map component can import directly — no runtime d3/topojson load.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as topojson from 'topojson-client'
import { presimplify, simplify } from 'topojson-simplify'
import { geoPath, geoIdentity, geoAlbersUsa } from 'd3-geo'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')

const src = resolve(root, 'node_modules/us-atlas/states-albers-10m.json')
const outDir = resolve(root, 'src/components/sections/_map')
const outFile = resolve(outDir, 'us-states.ts')

const raw = JSON.parse(readFileSync(src, 'utf8'))
// Light simplification — keep state silhouettes recognizable.
const pre = presimplify(raw)
const topology = simplify(pre, 1)
const statesFC = topojson.feature(topology, topology.objects.states)
const nationFC = topojson.feature(topology, topology.objects.nation)

// states-albers-10m is pre-projected into a 960×600 canvas.
// Use identity projection to pass-through coordinates.
const path = geoPath(geoIdentity())

const width = 960
const height = 600

// Round path coordinates to 1 decimal — further size reduction.
const round1 = (d) => d.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(1))

// Filter out degenerate sub-paths like "Mx,y Lx,y Lx,y Z" where all points are
// identical (artifacts of simplification). Keeps only sub-paths with real area.
const cleanPath = (d) => {
  if (!d) return ''
  // Split on M/m moveto commands but keep them.
  const parts = d.match(/[Mm][^Mm]*/g) || []
  const kept = parts.filter((sub) => {
    const coords = sub.match(/-?\d+(?:\.\d+)?/g)
    if (!coords || coords.length < 4) return false
    // Build point list, check any pair differs.
    const pts = []
    for (let i = 0; i < coords.length; i += 2) {
      pts.push([+coords[i], +coords[i + 1]])
    }
    const [x0, y0] = pts[0]
    return pts.some(([x, y]) => Math.abs(x - x0) > 0.5 || Math.abs(y - y0) > 0.5)
  })
  return kept.join('')
}

const states = statesFC.features.map((f) => ({
  id: String(f.id),
  name: f.properties.name,
  d: cleanPath(round1(path(f) || '')),
}))

const nationPath = cleanPath(round1(path(nationFC) || ''))

// Project city coordinates into the same Albers-USA canvas (960×600).
const cityProj = geoAlbersUsa()
  .scale(1300)
  .translate([width / 2, height / 2])

const cityInputs = [
  { id: 'nj', name: 'Fort Lee · NJ', lonlat: [-73.98, 40.85], primary: true },
  { id: 'ny', name: 'Manhattan · NY', lonlat: [-73.97, 40.78] },
  { id: 'ca', name: 'Los Angeles · CA', lonlat: [-118.24, 34.05] },
  { id: 'tx', name: 'Dallas · TX', lonlat: [-96.8, 32.78] },
  { id: 'ga', name: 'Atlanta · GA', lonlat: [-84.39, 33.75] },
  { id: 'va', name: 'Annandale · VA', lonlat: [-77.2, 38.83] },
  { id: 'il', name: 'Chicago · IL', lonlat: [-87.65, 41.85] },
  { id: 'wa', name: 'Seattle · WA', lonlat: [-122.33, 47.6] },
  { id: 'md', name: 'Ellicott City · MD', lonlat: [-76.8, 39.27] },
  { id: 'hi', name: 'Honolulu · HI', lonlat: [-157.85, 21.31] },
]

const cities = cityInputs.map((c) => {
  const p = cityProj(c.lonlat)
  return {
    id: c.id,
    name: c.name,
    primary: !!c.primary,
    x: p ? +p[0].toFixed(1) : 0,
    y: p ? +p[1].toFixed(1) : 0,
  }
})

mkdirSync(outDir, { recursive: true })
const out = `// Auto-generated from us-atlas states-albers-10m.json. Do not edit.
export const VIEW_WIDTH = ${width}
export const VIEW_HEIGHT = ${height}
export const NATION_PATH = ${JSON.stringify(nationPath)}
export const STATES: { id: string; name: string; d: string }[] = ${JSON.stringify(
  states,
  null,
  2
)}
export type CityPin = { id: string; name: string; primary: boolean; x: number; y: number }
export const CITIES: CityPin[] = ${JSON.stringify(cities, null, 2)}
`
writeFileSync(outFile, out)
console.log(`✓ wrote ${states.length} states → ${outFile} (${(out.length / 1024).toFixed(1)} KB)`)
