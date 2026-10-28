import { sendGAEvent } from '@next/third-parties/google'

type AnalyticsEventParams = Record<string, string | number | boolean>

export function trackEvent(eventName: string, params?: AnalyticsEventParams) {
  if (typeof window === 'undefined') return

  if (params) {
    sendGAEvent('event', eventName, params)
    return
  }

  sendGAEvent('event', eventName)
}
