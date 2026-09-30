'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { UIEvent } from 'react'
import { useI18n } from '../../lib/i18n'
import type { FeatureItem } from '../../lib/page-data'
import styles from './FeatureSlider.module.css'

type FeatureSliderProps = {
  items: FeatureItem[]
  label?: string
  title?: string
  description?: string
  reverse?: boolean
  compact?: boolean
  headingGap?: 'spacious'
  scrollableControls?: boolean
  mobileCategoryGroups?: ReadonlyArray<{
    id: string
    label: string
    items: ReadonlyArray<FeatureItem>
  }>
}

const duration = 10_000

export default function FeatureSlider({ items, label, title, description, reverse = false, compact = false, headingGap, scrollableControls = false, mobileCategoryGroups }: FeatureSliderProps) {
  const { t } = useI18n()
  const resolvedLabel = label ?? t('common.features')
  const sliderRef = useRef<HTMLDivElement>(null)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mobileCategoryIndex, setMobileCategoryIndex] = useState(0)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  const mobileCategories = mobileCategoryGroups?.length
    ? mobileCategoryGroups
    : [{ id: 'default', label: title ?? resolvedLabel, items }]
  const activeMobileCategory = mobileCategories[mobileCategoryIndex] ?? mobileCategories[0]
  const mobileItems = activeMobileCategory.items

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 820px)')
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)

    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.45)
    }, { threshold: 0.45 })
    observer.observe(slider)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (items.length < 2 || !isVisible || isMobileViewport) return

    let frame = 0
    const startedAt = window.performance.now()

    const update = (timestamp: number) => {
      const elapsed = Math.min(timestamp - startedAt, duration)
      setProgress(elapsed / duration)

      if (elapsed >= duration) {
        setProgress(0)
        setActiveIndex(current => (current + 1) % items.length)
        return
      }

      frame = window.requestAnimationFrame(update)
    }

    frame = window.requestAnimationFrame(update)
    return () => window.cancelAnimationFrame(frame)
  }, [activeIndex, isMobileViewport, isVisible, items.length])

  const chooseSlide = (index: number) => {
    setProgress(0)
    setActiveIndex(index)
  }

  const chooseMobileCategory = (index: number) => {
    if (index === mobileCategoryIndex) return

    setMobileCategoryIndex(index)
    setMobileActiveIndex(0)
  }

  const chooseMobileSlide = (index: number) => {
    setMobileActiveIndex(index)

    const carousel = mobileCarouselRef.current
    const slide = carousel?.children[index]

    if (slide instanceof HTMLElement) {
      carousel?.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
    }
  }

  const handleMobileCarouselScroll = (event: UIEvent<HTMLDivElement>) => {
    const carousel = event.currentTarget
    const firstSlide = carousel.firstElementChild

    if (!(firstSlide instanceof HTMLElement)) return

    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || '0')
    const slideStep = firstSlide.offsetWidth + gap
    const nextIndex = slideStep > 0 ? Math.round(carousel.scrollLeft / slideStep) : 0
    const boundedIndex = Math.min(Math.max(nextIndex, 0), mobileItems.length - 1)

    setMobileActiveIndex(currentIndex => currentIndex === boundedIndex ? currentIndex : boundedIndex)
  }

  useEffect(() => {
    const carousel = mobileCarouselRef.current

    if (carousel) {
      carousel.scrollTo({ left: 0, behavior: 'auto' })
    }
  }, [mobileCategoryIndex])

  const imageSized = items.some(item => item.imageFit === 'contain' || item.imageSized)

  return (
    <div className={`${styles.slider} ${reverse ? styles.reversed : ''} ${compact ? styles.compact : ''} ${imageSized ? styles.imageSized : ''} ${headingGap === 'spacious' ? styles.spaciousHeadingGap : ''}`} ref={sliderRef} aria-label={resolvedLabel}>
      <div className={styles.leftColumn}>
        {title ? (
          <div className={styles.sliderHeading}>
            <h3>{title}</h3>
            {description ? <p>{description}</p> : null}
          </div>
        ) : null}
        <div className={`${styles.controls} ${scrollableControls ? styles.scrollableControls : ''}`} role="tablist" aria-label={resolvedLabel}>
          {items.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <button
                className={`${styles.control} ${isActive ? styles.activeControl : ''}`}
                key={item.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => chooseSlide(index)}
              >
                <span className={styles.controlContent}>
                  <span className={styles.controlTitle}>{item.title}</span>
                  <span className={styles.controlDescription}>
                    <span className={styles.descriptionInner}>{item.description}</span>
                  </span>
                </span>
                <span className={styles.track} aria-hidden="true">
                  {isActive ? <span className={styles.progress} style={{ transform: `scaleX(${progress})` }} /> : null}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className={`${styles.visual} ${items[activeIndex].frameTone === 'coral' ? styles.coralVisual : ''}`}>
        {items.map((item, index) => (
          <div className={`${styles.slide} ${index === activeIndex ? styles.activeSlide : ''}`} key={`${item.title}-${item.image}`} aria-hidden={index !== activeIndex}>
            <Image className={`${item.imageFit === 'contain' ? styles.containImage : ''} ${item.imagePosition === 'top' ? styles.topImage : ''}`} src={item.image} alt={item.imageAlt} fill sizes="(max-width: 820px) 100vw, 58vw" />
            {item.portfolioProject || item.showPortfolioCard ? (
              <Link
                className={styles.portfolioCard}
                href={item.portfolioProject ? `/portfolio?category=${item.category ?? 'crm'}&project=${encodeURIComponent(item.portfolioProject)}` : '/portfolio'}
                aria-label={`${t('portfolio.selectProject')}: ${item.title}`}
              >
                <span className={styles.portfolioCardCopy}>
                  <span className={styles.portfolioCardTitle}>{item.title}</span>
                  <span className={styles.portfolioCardAction}>{t('portfolio.selectProject')}</span>
                </span>
                <ArrowUpRight className={styles.portfolioCardIcon} aria-hidden="true" strokeWidth={1.6} />
              </Link>
            ) : null}
          </div>
        ))}
      </div>

      <div className={styles.mobileExperience} aria-label={resolvedLabel}>
        {mobileCategoryGroups?.length ? (
          <div className={styles.mobileCategoryTabs} role="tablist" aria-label={resolvedLabel}>
            {mobileCategories.map((category, index) => (
              <button
                className={`${styles.mobileCategoryTab} ${index === mobileCategoryIndex ? styles.mobileCategoryTabActive : ''}`}
                key={category.id}
                type="button"
                role="tab"
                aria-selected={index === mobileCategoryIndex}
                onClick={() => chooseMobileCategory(index)}
              >
                {category.label}
              </button>
            ))}
          </div>
        ) : null}

        <div className={styles.mobileProjectMenu} role="tablist" aria-label={activeMobileCategory.label}>
          {mobileItems.map((item, index) => (
            <button
              className={`${styles.mobileProjectTab} ${index === mobileActiveIndex ? styles.mobileProjectTabActive : ''}`}
              key={`${item.title}-${item.image}`}
              type="button"
              role="tab"
              aria-selected={index === mobileActiveIndex}
              onClick={() => chooseMobileSlide(index)}
            >
              {item.mobileLabel ?? item.title.split(' — ')[0]}
            </button>
          ))}
        </div>

        <div
          ref={mobileCarouselRef}
          className={styles.mobileCarousel}
          onScroll={handleMobileCarouselScroll}
          aria-label={activeMobileCategory.label}
        >
          {mobileItems.map(item => (
            <article className={styles.mobileSlide} key={`${item.title}-${item.image}`}>
              <div className={`${styles.mobileVisual} ${item.frameTone === 'coral' ? styles.coralVisual : ''}`}>
                <Image
                  className={`${item.imageFit === 'contain' ? styles.mobileContainImage : ''} ${item.imagePosition === 'top' ? styles.mobileTopImage : ''}`}
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 820px) calc(100vw - 48px), 100vw"
                />
                {item.portfolioProject || item.showPortfolioCard ? (
                  <Link
                    className={styles.portfolioCard}
                    href={item.portfolioProject ? `/portfolio?category=${item.category ?? 'crm'}&project=${encodeURIComponent(item.portfolioProject)}` : '/portfolio'}
                    aria-label={`${t('portfolio.selectProject')}: ${item.title}`}
                  >
                    <span className={styles.portfolioCardCopy}>
                      <span className={styles.portfolioCardTitle}>{item.title}</span>
                      <span className={styles.portfolioCardAction}>{t('portfolio.selectProject')}</span>
                    </span>
                    <ArrowUpRight className={styles.portfolioCardIcon} aria-hidden="true" strokeWidth={1.6} />
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.mobileCarouselFooter}>
          <span className={styles.mobileCounter} aria-live="polite">
            {String(mobileActiveIndex + 1).padStart(2, '0')} / {String(mobileItems.length).padStart(2, '0')}
          </span>
          <span className={styles.mobileDots} aria-hidden="true">
            {mobileItems.map((item, index) => (
              <span className={index === mobileActiveIndex ? styles.mobileDotActive : ''} key={`${item.title}-dot`} />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}
