import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Clock App',
  description: 'A beautiful clock, mirror, and flashlight tool.',
  manifest: '/manifest.json',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}