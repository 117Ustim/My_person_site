import type { ReactNode } from 'react'
import styles from './PageSection.module.css'

type PageSectionProps = {
  children: ReactNode
  className?: string
  tone?: 'default' | 'raised'
}

export default function PageSection({ children, className = '', tone = 'default' }: PageSectionProps) {
  return <section className={`${styles.section} ${tone === 'raised' ? styles.raised : ''} ${className}`}>{children}</section>
}
