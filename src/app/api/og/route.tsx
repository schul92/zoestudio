import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'ZOE LUMOS'
    const subtitle = searchParams.get('subtitle') || 'Professional SEO Services, Google Ads & Web Design'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at 50% 30%, rgba(217, 173, 59, 0.12) 0%, transparent 70%)',
              display: 'flex',
            }}
          />

          {/* Top accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(to right, transparent, #d9ad3b, #f5c842, #d9ad3b, transparent)',
              display: 'flex',
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 60px',
              maxWidth: '1100px',
            }}
          >
            {/* ZOE LUMOS branding */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '40px',
              }}
            >
              {/* Lightbulb icon */}
              <svg
                width="56"
                height="56"
                viewBox="0 0 100 100"
              >
                <path
                  d="M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z"
                  stroke="#d9ad3b"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5"
                  stroke="#d9ad3b"
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="50" cy="45" r="10" fill="#f5c842" opacity="0.4" />
              </svg>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#d9ad3b',
                  letterSpacing: '6px',
                }}
              >
                ZOE LUMOS
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: title.length > 30 ? '48px' : '60px',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0',
                padding: '0',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>

            {/* Divider */}
            <div
              style={{
                width: '80px',
                height: '3px',
                backgroundColor: '#d9ad3b',
                marginTop: '28px',
                marginBottom: '28px',
                borderRadius: '2px',
                display: 'flex',
              }}
            />

            {/* Subtitle */}
            <p
              style={{
                fontSize: '22px',
                color: '#a0a0a0',
                margin: '0',
                textAlign: 'center',
                maxWidth: '800px',
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </p>

            {/* Service tags */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '44px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {['SEO', 'Google Ads', 'Web Design', 'E-Commerce'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '14px',
                    color: '#d9ad3b',
                    border: '1px solid rgba(217, 173, 59, 0.3)',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(217, 173, 59, 0.08)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '14px', color: '#555555' }}>
              www.zoelumos.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
