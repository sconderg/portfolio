import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { site } from '@/lib/site'
import { ThemeProvider } from '@/components/theme-provider'
import { CursorFollower } from '@/components/cursor-follower'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://amirmuhammad.dev'),
  title: `${site.name} | ${site.role}`,
  description: site.tagline,
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <CursorFollower />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
