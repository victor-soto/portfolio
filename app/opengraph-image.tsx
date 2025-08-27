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
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 25% 25%, rgba(0, 188, 212, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 188, 212, 0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            padding: '80px 60px',
            borderRadius: '24px',
            border: '2px solid rgba(0, 188, 212, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #00BCD4, #00A8CC)',
              borderRadius: '2px',
            }}
          />
          
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '16px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            {siteConfig.name}
          </div>
          
          {/* Position */}
          <div
            style={{
              fontSize: 36,
              color: '#00BCD4',
              marginBottom: '32px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {siteConfig.position}
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: 24,
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '700px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.4,
            }}
          >
            {siteConfig.description}
          </div>
          
          {/* Tech stack hint */}
          <div
            style={{
              fontSize: 18,
              color: '#64748b',
              marginTop: '24px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textAlign: 'center',
            }}
          >
            Full Stack • React • Node.js • TypeScript
          </div>
        </div>
        
        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00BCD4, transparent)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
