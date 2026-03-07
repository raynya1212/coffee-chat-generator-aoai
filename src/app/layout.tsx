import type { Metadata } from 'next'
import { Capriola, Yomogi } from 'next/font/google'
import './globals.css'

const capriola = Capriola({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-capriola',
  display: 'swap',
});

const yomogi = Yomogi({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yomogi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Coffee chat time',
  description: 'Generate fun and engaging topics for your coffee chats!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${capriola.variable} ${yomogi.variable}`}>
      <body>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
