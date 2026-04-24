'use client'

import {
  VIEW_WIDTH,
  VIEW_HEIGHT,
  NATION_PATH,
  STATES,
  CITIES,
  type CityPin,
} from './_map/us-states'

// Expose cities for the locations list
export const cities: { id: string; name: string; primary?: boolean }[] = CITIES.map((c) => ({
  id: c.id,
  name: c.name,
  primary: c.primary,
}))

// States that have an active city presence — highlighted subtly
const ACTIVE_STATE_NAMES = new Set<string>([
  'New Jersey',
  'New York',
  'California',
  'Texas',
  'Georgia',
  'Virginia',
  'Illinois',
  'Washington',
  'Maryland',
  'Hawaii',
])

export default function USMap({
  activeId,
  onHover,
  className = '',
}: {
  activeId?: string | null
  onHover?: (id: string | null) => void
  className?: string
}) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className={className}
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Subtle framing latitude marks */}
      <g stroke="currentColor" strokeWidth="0.4" opacity="0.07">
        <line x1="0" y1="150" x2={VIEW_WIDTH} y2="150" />
        <line x1="0" y1="300" x2={VIEW_WIDTH} y2="300" />
        <line x1="0" y1="450" x2={VIEW_WIDTH} y2="450" />
      </g>

      {/* States — engraved hairlines, active states softly filled */}
      <g>
        {STATES.map((s) => {
          const active = ACTIVE_STATE_NAMES.has(s.name)
          return (
            <path
              key={s.id}
              d={s.d}
              stroke="currentColor"
              strokeWidth="0.6"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={active ? 0.55 : 0.22}
              fill={active ? 'currentColor' : 'none'}
              fillOpacity={active ? 0.02 : 0}
            />
          )
        })}
      </g>

      {/* Nation outline — slightly stronger */}
      <path
        d={NATION_PATH}
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />

      {/* Pulse ring filter for gold sheen */}
      <defs>
        <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B8914A" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#B8914A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#B8914A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* City pins */}
      <g>
        {CITIES.map((c) => {
          const active = activeId === c.id
          return (
            <g
              key={c.id}
              transform={`translate(${c.x}, ${c.y})`}
              onMouseEnter={() => onHover?.(c.id)}
              onMouseLeave={() => onHover?.(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Soft glow */}
              {(active || c.primary) && (
                <circle r={active ? 36 : 24} fill="url(#pinGlow)" />
              )}
              {/* Pulse rings */}
              {(active || c.primary) && (
                <>
                  <circle
                    r="6"
                    stroke="#B8914A"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      values="6;22;6"
                      dur={active ? '1.6s' : '2.6s'}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0;0.6"
                      dur={active ? '1.6s' : '2.6s'}
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}
              {/* Outer ring */}
              <circle
                r={active ? 7 : 5}
                stroke={active ? '#B8914A' : 'currentColor'}
                strokeWidth="0.9"
                fill={active || c.primary ? 'rgba(250,247,240,0.9)' : 'rgba(250,247,240,0.95)'}
                style={{ transition: 'all 400ms cubic-bezier(.16,1,.3,1)' }}
              />
              {/* Core dot */}
              <circle
                r={active ? 2.2 : 1.8}
                fill={active || c.primary ? '#B8914A' : 'currentColor'}
                style={{ transition: 'all 400ms cubic-bezier(.16,1,.3,1)' }}
              />
              {/* Label — visible on active + primary */}
              <g
                style={{ transition: 'opacity 400ms ease' }}
                opacity={active ? 1 : c.primary ? 0.9 : 0}
              >
                <LabelPlacement pin={c}>
                  <text
                    fontSize="11"
                    fontFamily="Fraunces, serif"
                    fontStyle="italic"
                    fontWeight="300"
                    fill="currentColor"
                  >
                    {c.name}
                  </text>
                </LabelPlacement>
              </g>
            </g>
          )
        })}
      </g>

      {/* Legend + meta */}
      <g transform={`translate(${VIEW_WIDTH - 200}, ${VIEW_HEIGHT - 36})`}>
        <circle r="2.2" cx="4" cy="-4" fill="#B8914A" />
        <text
          x="14"
          y="0"
          fontSize="9"
          letterSpacing="0.22em"
          fontFamily="Inter, sans-serif"
          fill="currentColor"
          opacity="0.55"
        >
          ACTIVE PRESENCE
        </text>
      </g>

      {/* Hairline box around Hawaii inset (bottom-left) */}
      <g transform="translate(185, 480)" opacity="0.22">
        <line x1="0" y1="0" x2="140" y2="0" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="0" y2="110" stroke="currentColor" strokeWidth="0.5" />
        <line x1="140" y1="0" x2="140" y2="110" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="110" x2="140" y2="110" stroke="currentColor" strokeWidth="0.5" />
        <text
          x="4"
          y="12"
          fontSize="8"
          letterSpacing="0.22em"
          fontFamily="Inter, sans-serif"
          fill="currentColor"
          opacity="0.7"
        >
          HAWAII
        </text>
      </g>
    </svg>
  )
}

function LabelPlacement({
  pin,
  children,
}: {
  pin: CityPin
  children: React.ReactNode
}) {
  // Position label near the pin — offset so it doesn't overlap the dot
  // Mirror x offset for pins on the right edge so labels stay on canvas.
  const rightEdge = pin.x > VIEW_WIDTH - 180
  const dx = rightEdge ? -14 : 12
  const anchor = rightEdge ? 'end' : 'start'
  return (
    <g transform={`translate(${dx}, 4)`} textAnchor={anchor as 'start' | 'end'}>
      {children}
    </g>
  )
}
