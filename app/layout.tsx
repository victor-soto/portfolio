import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { siteConfig } from '@/config/site.config' 

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || siteConfig.url

  return {
    metadataBase: new URL(baseUrl),
    title: `${siteConfig.name} - ${siteConfig.position}`,
    description: siteConfig.description,
    generator: 'Next.js',
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
    manifest: '/manifest.json',
    openGraph: {
      title: siteConfig.site.title,
      description: siteConfig.site.description,
      url: baseUrl,
      siteName: siteConfig.site.title,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${siteConfig.position}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.site.title,
      description: siteConfig.site.description,
      creator: '@victorsoto',
      images: ['/opengraph-image'],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
