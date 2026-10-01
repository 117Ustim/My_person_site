'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

export default function LenisScroll() {
  useEffect(() => {
    const preventPinchZoom = (event: Event) => event.preventDefault()
    const preventMultiTouchZoom = (event: TouchEvent) => {
      if (event.touches.length > 1) event.preventDefault()
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: false,
      lerp: 0.12,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      wheelMultiplier: 0.7,
      prevent: node => Boolean(node.closest('[data-lenis-prevent]')),
    })

    document.addEventListener('gesturestart', preventPinchZoom)
    document.addEventListener('gesturechange', preventPinchZoom)
    document.addEventListener('gestureend', preventPinchZoom)
    document.addEventListener('touchmove', preventMultiTouchZoom, { passive: false })

    return () => {
      document.removeEventListener('gesturestart', preventPinchZoom)
      document.removeEventListener('gesturechange', preventPinchZoom)
      document.removeEventListener('gestureend', preventPinchZoom)
      document.removeEventListener('touchmove', preventMultiTouchZoom)
      lenis.destroy()
    }
  }, [])

  return null
}
