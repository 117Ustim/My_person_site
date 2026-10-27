'use client'

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'

type GoogleAnalyticsProps = {
  gaId: string
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return <NextGoogleAnalytics gaId={gaId} />
}
