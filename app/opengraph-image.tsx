import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'John Developer - Software Engineer'
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
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: '60px',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            John Developer
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#667eea',
              marginBottom: '30px',
            }}
          >
            Software Engineer
          </div>
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            Specializing in modern web technologies and scalable applications
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
