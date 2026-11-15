'use client'

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!pathname || pathname.startsWith('/admin') || !gaId) {
    return null
  }

  return <NextGoogleAnalytics gaId={gaId} />
}
