import type { Metadata } from 'next'
import '@fontsource-variable/source-serif-4/opsz.css'
import type { ReactNode } from 'react'
import styles from './layout.module.css'

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
      <body className={styles.body}>{children}</body>
    </html>
  )
}
