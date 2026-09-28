'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: false,
      lerp: 0.12,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      wheelMultiplier: 0.7,
      prevent: node => Boolean(node.closest('[data-lenis-prevent]')),
    })

    return () => lenis.destroy()
  }, [])

  return null
}
