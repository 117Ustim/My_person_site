import type { ReactNode } from 'react'
import styles from './PageSection.module.css'

type PageSectionProps = {
  children: ReactNode
  className?: string
  id?: string
  tone?: 'default' | 'raised'
}

export default function PageSection({ children, className = '', id, tone = 'default' }: PageSectionProps) {
  return <section id={id} className={`${styles.section} ${tone === 'raised' ? styles.raised : ''} ${className}`}>{children}</section>
}
