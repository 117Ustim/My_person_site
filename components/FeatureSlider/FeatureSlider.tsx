'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
}

const duration = 10_000

export default function FeatureSlider({ items, label, title, description, reverse = false, compact = false, headingGap, scrollableControls = false }: FeatureSliderProps) {
  const { t } = useI18n()
  const resolvedLabel = label ?? t('common.features')
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(slider)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (items.length < 2 || !isVisible) return

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
  }, [activeIndex, isVisible, items.length])

  const chooseSlide = (index: number) => {
    setProgress(0)
    setActiveIndex(index)
  }

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
    </div>
  )
}
