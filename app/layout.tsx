import type { Metadata } from 'next'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'
import styles from './layout.module.css'

const inter = localFont({
  src: './fonts/InterVariable.woff2',
  variable: '--font-body',
  display: 'swap',
})

const ivory = localFont({
  src: './fonts/IvoryLLWeb-Light.woff2',
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Obsidian — The all-in-one platform for financial advisers',
    template: '%s',
  },
  description: 'AI-powered practice management for financial advisers.',
  metadataBase: new URL('https://obsidianos.com'),
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${styles.body} ${inter.variable} ${ivory.variable}`}>{children}</body>
    </html>
  )
}
