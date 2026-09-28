'use client'

import { useEffect, useRef } from 'react'

const SOURCE_ASSET = '/assets/about/variant-4-hero-accent-turning-ideas.png'
const REVEAL_MAP_ASSET = '/assets/about/variant-4-hero-accent-turning-ideas-reveal-map.png'
const CANVAS_WIDTH = 672
const CANVAS_HEIGHT = 586
const START_DELAY_MS = 0
const DRAW_DURATION_MS = 6960
const EDGE_FEATHER = 128

type HandwrittenAccentProps = {
  className: string
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Не удалось загрузить изображение: ${src}`))
    image.src = src
  })
}

export default function HandwrittenAccent({ className }: HandwrittenAccentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrame = 0
    let cancelled = false

    const prepareAnimation = async () => {
      const [sourceImage, revealMapImage] = await Promise.all([
        loadImage(SOURCE_ASSET),
        loadImage(REVEAL_MAP_ASSET),
      ])

      if (cancelled) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        context.drawImage(sourceImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        return
      }

      const sourceCanvas = document.createElement('canvas')
      const revealCanvas = document.createElement('canvas')
      sourceCanvas.width = CANVAS_WIDTH
      sourceCanvas.height = CANVAS_HEIGHT
      revealCanvas.width = CANVAS_WIDTH
      revealCanvas.height = CANVAS_HEIGHT

      const sourceContext = sourceCanvas.getContext('2d', { willReadFrequently: true })
      const revealContext = revealCanvas.getContext('2d', { willReadFrequently: true })
      if (!sourceContext || !revealContext) return

      sourceContext.drawImage(sourceImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      revealContext.drawImage(revealMapImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      const sourcePixels = sourceContext.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      const revealPixels = revealContext.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      const outputPixels = context.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT)
      const visiblePixelIndexes: number[] = []

      for (let pixelIndex = 0; pixelIndex < CANVAS_WIDTH * CANVAS_HEIGHT; pixelIndex += 1) {
        const offset = pixelIndex * 4
        const alpha = sourcePixels.data[offset + 3]
        if (alpha < 16) continue

        outputPixels.data[offset] = sourcePixels.data[offset]
        outputPixels.data[offset + 1] = sourcePixels.data[offset + 1]
        outputPixels.data[offset + 2] = sourcePixels.data[offset + 2]
        visiblePixelIndexes.push(pixelIndex)
      }

      const animationStart = performance.now() + START_DELAY_MS

      const drawFrame = (timestamp: number) => {
        if (cancelled) return

        if (timestamp < animationStart) {
          animationFrame = requestAnimationFrame(drawFrame)
          return
        }

        const progress = Math.min(1, (timestamp - animationStart) / DRAW_DURATION_MS)
        const revealLevel = progress * 65534

        for (const pixelIndex of visiblePixelIndexes) {
          const offset = pixelIndex * 4
          const threshold = revealPixels.data[offset] * 256 + revealPixels.data[offset + 1]
          const coverage = Math.max(0, Math.min(1, (revealLevel - threshold) / EDGE_FEATHER))
          outputPixels.data[offset + 3] = Math.round(sourcePixels.data[offset + 3] * coverage)
        }

        context.putImageData(outputPixels, 0, 0)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(drawFrame)
          return
        }

        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        context.drawImage(sourceImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      }

      animationFrame = requestAnimationFrame(drawFrame)
    }

    prepareAnimation().catch(() => {
      if (cancelled) return

      loadImage(SOURCE_ASSET).then(sourceImage => {
        if (!cancelled) context.drawImage(sourceImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      }).catch(() => undefined)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      aria-hidden="true"
    />
  )
}
