import { siteConfig } from '@/config/site.config'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = `${siteConfig.name} - ${siteConfig.position}`
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
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
          backgroundColor: '#1C1C1F',
          backgroundImage: 'linear-gradient(135deg, #00BCD4 0%, #00A8CC 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(28, 28, 31, 0.9)',
            padding: '60px',
            borderRadius: '20px',
            border: '2px solid rgba(0, 188, 212, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#E5E5E5',
              marginBottom: '20px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#00BCD4',
              marginBottom: '30px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {siteConfig.position}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#A9A9A9',
              textAlign: 'center',
              maxWidth: '600px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
