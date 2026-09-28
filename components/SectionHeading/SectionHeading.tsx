'use client'

import { useEffect, useRef, useState } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

import styles from './SectionHeading.module.css'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    if (!('IntersectionObserver' in window)) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, { threshold: 0.2 })

    observer.observe(heading)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={headingRef} className={`${styles.heading} ${align === 'center' ? styles.center : ''} ${isInView ? styles.isInView : ''}`}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  )
}
