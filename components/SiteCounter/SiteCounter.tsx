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

    const timer = window.setTimeout(() => {
      if (document.visibilityState !== 'visible') {
        return
      }

      const currentUrl = new URL(window.location.href)
      const currentParams = new URLSearchParams(currentUrl.search)
      const trackingKeys = ['utm_source', 'utm_medium', 'utm_campaign'] as const
      const storedTracking = trackingKeys.reduce<Record<string, string>>((result, key) => {
        const currentValue = currentParams.get(key)

        if (currentValue) {
          sessionStorage.setItem(`person_site_${key}`, currentValue)
        }

        result[key] = currentValue ?? sessionStorage.getItem(`person_site_${key}`) ?? ''
        return result
      }, {})

      fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page,
          referrer: document.referrer,
          utmSource: storedTracking.utm_source,
          utmMedium: storedTracking.utm_medium,
          utmCampaign: storedTracking.utm_campaign,
          language: navigator.language,
          screen: `${window.screen.width}x${window.screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          automated: navigator.webdriver === true,
        }),
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
    }, 2500)

    return () => {
      window.clearTimeout(timer)
      isCurrent = false
    }
  }, [pathname])

  if (!pageByPath[pathname]) {
    return null
  }

  return (
    <span className={styles.counter} aria-live="polite" aria-busy={count === null}>
      {count ?? '…'}
    </span>
  )
}
