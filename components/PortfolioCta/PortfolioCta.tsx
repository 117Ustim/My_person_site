'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type PointerEvent } from 'react'

import { useI18n } from '../../lib/i18n'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
import styles from './PortfolioCta.module.css'

export default function PortfolioCta() {
  const { t } = useI18n()
  const { openInquiry } = useProjectInquiry()
  const [activeProject, setActiveProject] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const launchTimer = useRef<number | null>(null)

  const projects = [
    {
      title: 'Luxury Travel',
      category: t('portfolio.categorySites'),
      image: '/assets/portfolio/luxury-travel.webp',
      imageAlt: t('portfolio.projectTravelAlt'),
      width: 1448,
      height: 1086,
    },
    {
      title: 'VetScanCT',
      category: t('portfolio.categoryCrm'),
      image: '/assets/portfolio/vetscanct-crm.webp',
      imageAlt: t('portfolio.projectVetAlt'),
      width: 1671,
      height: 941,
    },
    {
      title: 'Beauty Master CRM',
      category: t('portfolio.categoryCrm'),
      image: '/assets/portfolio/beauty-master-crm.webp',
      imageAlt: t('portfolio.projectBeautyAlt'),
      width: 1536,
      height: 1024,
    },
  ]

  useEffect(() => () => {
    if (launchTimer.current !== null) window.clearTimeout(launchTimer.current)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasEntered(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setHasEntered(true)
      observer.disconnect()
    }, { threshold: 0.35 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused || isLaunching || !hasEntered) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rotationTimer = window.setInterval(() => {
      setActiveProject(current => (current + 1) % projects.length)
    }, 4000)

    return () => window.clearInterval(rotationTimer)
  }, [hasEntered, isLaunching, isPaused, projects.length])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * 100
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * 100
    const rotateY = (pointerX - 50) * 0.05
    const rotateX = (50 - pointerY) * 0.04

    event.currentTarget.style.setProperty('--pointer-x', `${pointerX}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${pointerY}%`)
    event.currentTarget.style.setProperty('--deck-rotate-x', `${rotateX}deg`)
    event.currentTarget.style.setProperty('--deck-rotate-y', `${rotateY}deg`)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty('--pointer-x')
    event.currentTarget.style.removeProperty('--pointer-y')
    event.currentTarget.style.removeProperty('--deck-rotate-x')
    event.currentTarget.style.removeProperty('--deck-rotate-y')
  }

  const handleOpenInquiry = () => {
    if (isLaunching) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      openInquiry()
      return
    }

    setIsLaunching(true)
    launchTimer.current = window.setTimeout(() => {
      openInquiry()
      setIsLaunching(false)
      launchTimer.current = null
    }, 360)
  }

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="portfolio-cta-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={`${styles.card} ${hasEntered ? styles.entered : ''} ${isLaunching ? styles.launching : ''}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{t('portfolio.ctaEyebrow')}</p>
          <h2 id="portfolio-cta-title">{t('portfolio.ctaTitle')}</h2>
          <p className={styles.description}>{t('portfolio.ctaDescription')}</p>
          <button className={styles.action} type="button" onClick={handleOpenInquiry} disabled={isLaunching}>
            <span>{t('portfolio.ctaAction')}</span>
            <span className={styles.actionArrow} aria-hidden="true">↗</span>
          </button>
          <p className={styles.note}>{t('portfolio.ctaNote')}</p>
        </div>

        <div
          className={styles.visual}
          role="group"
          aria-label={t('portfolio.ctaProjectsLabel')}
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className={styles.deck}>
            {projects.map((project, index) => {
              const slot = (index - activeProject + projects.length) % projects.length
              const slotClass = slot === 0 ? styles.frontCard : slot === 1 ? styles.middleCard : styles.backCard
              const itemSlotClass = slot === 0 ? styles.frontItem : slot === 1 ? styles.middleItem : styles.backItem

              return (
                <div className={`${styles.deckItem} ${itemSlotClass}`} key={project.title}>
                  <button
                    className={`${styles.projectCard} ${slotClass}`}
                    type="button"
                    aria-label={`${t('portfolio.ctaSelectProject')} ${project.title}`}
                    aria-pressed={slot === 0}
                    onClick={() => setActiveProject(index)}
                  >
                    <span className={styles.projectImage}>
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={project.width}
                        height={project.height}
                        className={`${styles.projectImageAsset} ${project.title === 'VetScanCT' ? styles.projectImageAssetVet : ''}`}
                        loading="lazy"
                        quality={65}
                      />
                    </span>
                    <span className={styles.projectMeta}>
                      <span className={styles.projectHeading}>
                        <strong>{project.title}</strong>
                        <span>{project.category}</span>
                      </span>
                      <span className={styles.projectDetails}>{t('portfolio.ctaProjectStack')}</span>
                      <span className={styles.projectFooter}>
                        <span>{t('portfolio.ctaProjectStatus')}</span>
                        <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                      </span>
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
