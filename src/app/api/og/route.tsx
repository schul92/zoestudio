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
            backgroundColor: 'white',
            backgroundImage: 'linear-gradient(to bottom right, #f0f9ff, #f3e8ff)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Lightbulb Logo */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              style={{ marginBottom: '20px' }}
            >
              <path
                d="M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z"
                stroke="black"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5"
                stroke="black"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="50" cy="45" r="8" fill="gold" opacity="0.5" />
            </svg>
            
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                backgroundClip: 'text',
                color: 'transparent',
                margin: '0',
                padding: '0',
              }}
            >
              {title}
            </h1>
            
            <p
              style={{
                fontSize: '24px',
                color: '#4b5563',
                marginTop: '20px',
                textAlign: 'center',
                maxWidth: '800px',
              }}
            >
              {subtitle}
            </p>
            
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '40px',
              }}
            >
              <span style={{ fontSize: '18px', color: '#6b7280' }}>SEO</span>
              <span style={{ fontSize: '18px', color: '#6b7280' }}>•</span>
              <span style={{ fontSize: '18px', color: '#6b7280' }}>Google Ads</span>
              <span style={{ fontSize: '18px', color: '#6b7280' }}>•</span>
              <span style={{ fontSize: '18px', color: '#6b7280' }}>Web Design</span>
              <span style={{ fontSize: '18px', color: '#6b7280' }}>•</span>
              <span style={{ fontSize: '18px', color: '#6b7280' }}>LLC Formation</span>
            </div>
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