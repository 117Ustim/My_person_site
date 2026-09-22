import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: {
    default: 'Сайты',
    template: '%s',
  },
  description: 'Сайты.',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uk" className="dark">
      <body className={styles.body}>{children}</body>
    </html>
  )
}
