import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Victor Soto - Software Engineer',
    short_name: 'Victor Soto',
    description: 'Professional portfolio of Victor Soto, a software engineer specializing in modern web technologies and scalable applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1C1C1F',
    theme_color: '#00BCD4',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
