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
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            padding: '60px 40px',
            borderRadius: '16px',
            border: '2px solid #00BCD4',
            maxWidth: '800px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '20px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {siteConfig.name}
          </div>
          
          <div
            style={{
              fontSize: 32,
              color: '#00BCD4',
              marginBottom: '30px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '600',
            }}
          >
            {siteConfig.position}
          </div>
          
          <div
            style={{
              fontSize: 20,
              color: '#94a3b8',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.5,
              maxWidth: '600px',
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
