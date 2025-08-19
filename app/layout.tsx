import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { siteConfig } from '@/config/site.config' 

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.position}`,
  description: siteConfig.description,
  generator: 'Next.js',
  openGraph: {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    url: siteConfig.url,
    siteName: siteConfig.site.title,
  },
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
