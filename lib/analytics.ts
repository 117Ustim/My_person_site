type AnalyticsEventParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (command: string, eventName: string, params?: AnalyticsEventParams) => void
  }
}

export function trackEvent(eventName: string, params?: AnalyticsEventParams) {
  if (typeof window === 'undefined') return

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
    return
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(['event', eventName, params])
}
