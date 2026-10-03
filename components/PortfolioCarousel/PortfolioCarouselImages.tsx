'use client'

import Image, { getImageProps } from 'next/image'
import { useEffect, useRef, useState, type RefObject } from 'react'
import type { PortfolioImageSection } from '../../lib/page-data'
import baseStyles from './PortfolioCarousel.module.css'
import navigationStyles from './PortfolioCarouselNavigation.module.css'
import { portfolioBlurDataUrl } from './PortfolioCarousel.utils'

const styles = { ...baseStyles, ...navigationStyles }

type LazyPortfolioImageProps = {
  section: PortfolioImageSection
  alt: string
  sizes: string
  rootRef: RefObject<HTMLDivElement | null>
}

export function LazyPortfolioImage({ section, alt, sizes, rootRef }: LazyPortfolioImageProps) {
  const slotRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const slot = slotRef.current

    if (!slot || typeof IntersectionObserver === 'undefined') {
      setIsReady(true)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setIsReady(true)
          observer.disconnect()
        }
      },
      { root: rootRef.current, rootMargin: '600px 0px' },
    )

    observer.observe(slot)

    return () => observer.disconnect()
  }, [rootRef])

  return (
    <div
      ref={slotRef}
      className={styles.scrollableImageSlot}
      style={{ aspectRatio: `${section.width} / ${section.height}` }}
    >
      {isReady ? (
        <Image
          className={styles.scrollableImage}
          src={section.src}
          alt={alt}
          width={section.width}
          height={section.height}
          loading="lazy"
          placeholder="blur"
          blurDataURL={portfolioBlurDataUrl}
          quality={70}
          sizes={sizes}
        />
      ) : (
        <span className={styles.scrollableImagePlaceholder} aria-hidden="true" />
      )}
    </div>
  )
}

type ResponsivePreviewImageProps = {
  desktopSrc: string
  mobileSrc?: string
  className: string
  sizes: string
}

export function ResponsivePreviewImage({ desktopSrc, mobileSrc, className, sizes }: ResponsivePreviewImageProps) {
  const desktopImage = getImageProps({
    src: desktopSrc,
    alt: '',
    width: 800,
    height: 540,
    loading: 'lazy',
    quality: 60,
    sizes,
  })
  const mobileImage = mobileSrc
    ? getImageProps({
        src: mobileSrc,
        alt: '',
        width: 800,
        height: 540,
        loading: 'lazy',
        quality: 60,
        sizes: '34vw',
      })
    : null

  return (
    <picture className={styles.previewPicture}>
      {mobileImage ? <source media="(max-width: 760px)" srcSet={mobileImage.props.srcSet} sizes="34vw" /> : null}
      <img {...desktopImage.props} className={className} />
    </picture>
  )
}
