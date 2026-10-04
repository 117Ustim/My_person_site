'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './SiteCounter.module.css'

const pageByPath: Record<string, string> = {
  '/': 'home',
  '/portfolio': 'portfolio',
  '/about': 'about',
}

export default function SiteCounter() {
  const pathname = usePathname()
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const page = pageByPath[pathname]

    if (!page) {
      setCount(null)
      return
    }

    let isCurrent = true

    setCount(null)

    fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page }),
      cache: 'no-store',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Counter request failed')
        }

        return response.json() as Promise<{ count: number }>
      })
      .then(data => {
        if (isCurrent) {
          setCount(data.count)
        }
      })
      .catch(() => {
        if (isCurrent) {
          setCount(0)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [pathname])

  if (!pageByPath[pathname]) {
    return null
  }

  return (
    <span className={styles.counter} aria-live="polite" aria-busy={count === null}>
      {count ?? 0}
    </span>
  )
}
