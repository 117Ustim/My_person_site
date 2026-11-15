'use client'

import { useEffect, useRef } from 'react'
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'
import { trackEvent } from '../../lib/analytics'
import { usePathname } from 'next/navigation'

export default function WebVitals() {
  const pathname = usePathname()
  const reportedMetrics = useRef(new Set<string>())

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID

    if (!pathname || pathname.startsWith('/admin') || !gaId) {
      return
    }

    reportedMetrics.current.clear()

    const reportMetric = (metric: Metric) => {
      if (reportedMetrics.current.has(metric.name)) {
        return
      }

      reportedMetrics.current.add(metric.name)
      trackEvent('web_vitals', {
        metric_name: metric.name,
        metric_value: Number(metric.value.toFixed(2)),
        metric_id: metric.id,
        metric_rating: metric.rating,
        page_path: pathname,
        navigation_type: metric.navigationType,
      })
    }

    onCLS(reportMetric)
    onFCP(reportMetric)
    onINP(reportMetric)
    onLCP(reportMetric)
    onTTFB(reportMetric)
  }, [pathname])

  return null
}
