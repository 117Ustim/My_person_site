'use client'

import { ArrowLeft, ArrowRight, ChevronDown, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as PointerEventType, type UIEvent } from 'react'
import type { FeatureItem, PortfolioCategory } from '../../lib/page-data'
import styles from './PortfolioCarousel.module.css'

type PortfolioCarouselProps = {
  projects: ReadonlyArray<FeatureItem>
  categoryOptions: ReadonlyArray<{ id: PortfolioCategory; label: string }>
  heading: string
  actionLabel: string
  previousLabel: string
  nextLabel: string
  selectProjectLabel: string
  scrollHintLabel: string
  liveSiteLabel: string
  liveSitePlaceholderLabel: string
}

export default function PortfolioCarousel({
  projects,
  categoryOptions,
  heading,
  actionLabel,
  previousLabel,
  nextLabel,
  selectProjectLabel,
  scrollHintLabel,
  liveSiteLabel,
  liveSitePlaceholderLabel,
}: PortfolioCarouselProps) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('sites')
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [previewRailAtEnd, setPreviewRailAtEnd] = useState(false)
  const carouselRef = useRef<HTMLElement>(null)
  const mediaViewportRef = useRef<HTMLDivElement>(null)
  const previewRailRef = useRef<HTMLDivElement>(null)
  const categoryTabsRef = useRef<HTMLDivElement>(null)
  const categoryTabRefs = useRef<Partial<Record<PortfolioCategory, HTMLButtonElement | null>>>({})
  const prefetchedImagesRef = useRef(new Set<string>())
  const categoryProjects = projects.filter(project => project.category === activeCategory)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedProject = params.get('project')
    const requestedCategory = params.get('category') as PortfolioCategory | null
    const targetCategory: PortfolioCategory = requestedCategory && ['sites', 'crm', 'mobile'].includes(requestedCategory) ? requestedCategory : 'crm'

    if (!requestedProject) return

    const targetIndex = projects
      .filter(project => project.category === targetCategory)
      .findIndex(project => project.portfolioProject === requestedProject)

    if (targetIndex >= 0) {
      setActiveCategory(targetCategory)
      setActiveIndex(targetIndex)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          carouselRef.current?.scrollIntoView({ behavior: 'auto', block: 'center' })
        })
      })
    }
  }, [projects])

  useEffect(() => {
    const mediaViewport = mediaViewportRef.current

    if (!mediaViewport) return

    mediaViewport.scrollTop = 0
    setScrollProgress(0)
  }, [activeIndex])

  useEffect(() => {
    const previewRail = previewRailRef.current

    if (previewRail) {
      previewRail.scrollTop = 0
    }

    setPreviewRailAtEnd(false)
  }, [activeCategory])

  useEffect(() => {
    const tabs = categoryTabsRef.current
    const activeTab = categoryTabRefs.current[activeCategory]

    if (!tabs || !activeTab) return

    const updateIndicator = () => {
      tabs.style.setProperty('--tab-indicator-x', `${activeTab.offsetLeft}px`)
      tabs.style.setProperty('--tab-indicator-width', `${activeTab.offsetWidth}px`)
    }

    const frame = window.requestAnimationFrame(updateIndicator)
    const resizeObserver = new ResizeObserver(updateIndicator)
    resizeObserver.observe(tabs)
    resizeObserver.observe(activeTab)
    window.addEventListener('resize', updateIndicator)

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeCategory, categoryOptions])

  const selectCategory = useCallback((category: PortfolioCategory) => {
    if (category === activeCategory) return

    setActiveCategory(category)
    setActiveIndex(0)
  }, [activeCategory])

  const changeProject = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndex) return

    setActiveIndex(nextIndex)
  }, [activeIndex])

  const prefetchProjectImage = useCallback((project: FeatureItem) => {
    if (prefetchedImagesRef.current.has(project.image)) return

    const image = new window.Image()
    image.decoding = 'async'
    image.src = project.image
    prefetchedImagesRef.current.add(project.image)
  }, [])

  const move = useCallback((direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + categoryProjects.length) % categoryProjects.length
    changeProject(nextIndex)
  }, [activeIndex, categoryProjects.length, changeProject])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      move(-1)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      move(1)
    }
  }

  const handleMediaScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const maximumScroll = target.scrollHeight - target.clientHeight

    setScrollProgress(maximumScroll > 0 ? target.scrollTop / maximumScroll : 0)
  }

  const handlePreviewRailScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const maximumScroll = target.scrollHeight - target.clientHeight

    setPreviewRailAtEnd(maximumScroll <= 2 || target.scrollTop >= maximumScroll - 4)
  }

  const handleTabPointerMove = (event: PointerEventType<HTMLButtonElement>) => {
    const target = event.currentTarget
    const bounds = target.getBoundingClientRect()
    const localX = event.clientX - bounds.left
    const localY = event.clientY - bounds.top
    const tiltX = ((bounds.width / 2 - localX) / bounds.width) * 1.8
    const tiltY = ((localY - bounds.height / 2) / bounds.height) * 1.4

    target.style.setProperty('--tab-pointer-x', `${localX}px`)
    target.style.setProperty('--tab-pointer-y', `${localY}px`)
    target.style.setProperty('--tab-pointer-opacity', '1')
    target.style.setProperty('--tab-tilt-x', `${tiltX.toFixed(2)}deg`)
    target.style.setProperty('--tab-tilt-y', `${tiltY.toFixed(2)}deg`)
  }

  const resetTabPointer = (event: PointerEventType<HTMLButtonElement>) => {
    const target = event.currentTarget

    target.style.setProperty('--tab-pointer-opacity', '0')
    target.style.setProperty('--tab-tilt-x', '0deg')
    target.style.setProperty('--tab-tilt-y', '0deg')
  }

  if (projects.length === 0) {
    return null
  }

  if (categoryProjects.length === 0) {
    return null
  }

  const activeProject = categoryProjects[activeIndex]
  const previewIndexes = categoryProjects.map((_, projectIndex) => projectIndex)
  const previewRailScrollable = categoryProjects.length > 4

  return (
    <section
      ref={carouselRef}
      className={styles.carousel}
      aria-label={heading}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.imageFrame}>
        <div className={styles.content}>
          <div className={styles.projectCopy}>
            <div className={styles.projectTopAction}>
              {activeProject.liveUrl ? (
                <a
                  className={styles.liveSiteAction}
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={liveSiteLabel}
                  data-tooltip={liveSiteLabel}
                >
                  <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />
                </a>
              ) : (
                <button
                  className={styles.liveSiteAction}
                  type="button"
                  aria-disabled="true"
                  aria-label={liveSitePlaceholderLabel}
                  data-tooltip={liveSiteLabel}
                >
                  <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />
                </button>
              )}
            </div>
            <div className={styles.meta}>
              <h1 className={styles.heading}>{heading}</h1>
              <span className={styles.counter} aria-live="polite">
                {String(activeIndex + 1).padStart(2, '0')} / {String(categoryProjects.length).padStart(2, '0')}
              </span>
            </div>
            <h2 className={styles.title}>{activeProject.title}</h2>
            <p className={styles.description}>{activeProject.description}</p>
            <Link className={styles.action} href="#contacts">
              {actionLabel}
            </Link>
          </div>
        </div>

        <div className={styles.mediaColumn}>
          <div ref={categoryTabsRef} className={styles.categoryTabs} role="tablist" aria-label={heading}>
            <span className={styles.categoryTabIndicator} aria-hidden="true" />
            {categoryOptions.map(option => (
              <button
                className={`${styles.categoryTab} ${option.id === activeCategory ? styles.categoryTabActive : ''}`}
                key={option.id}
                ref={element => { categoryTabRefs.current[option.id] = element }}
                type="button"
                role="tab"
                aria-selected={option.id === activeCategory}
                onClick={() => selectCategory(option.id)}
                onPointerMove={handleTabPointerMove}
                onPointerLeave={resetTabPointer}
              >
                <span className={styles.categoryTabLabel}>{option.label}</span>
              </button>
            ))}
          </div>

          <div
            className={styles.mainMediaFrame}
            role={activeProject.scrollable ? 'region' : undefined}
            aria-label={activeProject.scrollable ? activeProject.imageAlt : undefined}
          >
          <div
            ref={mediaViewportRef}
            className={`${styles.mediaViewport} ${activeProject.scrollable ? styles.scrollableViewport : ''}`}
            onScroll={activeProject.scrollable ? handleMediaScroll : undefined}
            tabIndex={activeProject.scrollable ? 0 : undefined}
          >
            {activeProject.scrollable ? (
              <Image
                className={styles.scrollableImage}
                key={activeProject.image}
                src={activeProject.image}
                alt={activeProject.imageAlt}
                width={activeProject.imageWidth ?? 1640}
                height={activeProject.imageHeight ?? 5037}
                loading="lazy"
                quality={70}
                unoptimized
                sizes="(max-width: 700px) calc(100vw - 32px), 52vw"
              />
            ) : (
              <Image
                className={styles.backgroundImage}
                key={activeProject.image}
                src={activeProject.image}
                alt={activeProject.imageAlt}
                fill
                loading="lazy"
                quality={70}
                unoptimized
                sizes="(max-width: 700px) calc(100vw - 32px), 52vw"
              />
            )}
          </div>
          {activeProject.scrollable ? (
            <div
              className={`${styles.scrollCue} ${scrollProgress > 0.94 ? styles.scrollCueComplete : ''}`}
              aria-hidden={scrollProgress > 0.94}
            >
              <span className={styles.scrollCueLabel}>{scrollHintLabel}</span>
              <span className={styles.scrollCueTrack}>
                <span
                  className={styles.scrollCueProgress}
                  style={{ height: `${Math.max(12, scrollProgress * 100)}%` } as CSSProperties}
                />
              </span>
              <ChevronDown className={styles.scrollCueIcon} aria-hidden="true" strokeWidth={1.5} />
            </div>
          ) : null}
          </div>
        </div>

        <div className={`${styles.previewRailShell} ${categoryProjects.length === 1 ? styles.previewRailShellSingle : ''}`}>
          <div
            ref={previewRailRef}
            className={`${styles.previewRail} ${previewRailScrollable ? styles.previewRailScrollable : ''}`}
            aria-label={heading}
            onScroll={previewRailScrollable ? handlePreviewRailScroll : undefined}
            tabIndex={previewRailScrollable ? 0 : undefined}
          >
          {previewIndexes.map(projectIndex => {
            const project = categoryProjects[projectIndex]
            const previewSource = project.previewImage ?? project.image
            const previewSourceMobile = project.previewImageMobile ?? previewSource
            const usesCardFrame = categoryProjects.length > 1 && Boolean(project.previewImage)

            return (
              <button
                className={`${styles.preview} ${usesCardFrame ? styles.previewHasCardImage : ''} ${project.previewImageMobile ? styles.previewHasMobileImage : ''} ${projectIndex === activeIndex ? styles.previewActive : ''}`}
                key={project.previewImage ?? project.image}
                type="button"
                onClick={() => changeProject(projectIndex)}
                onPointerEnter={() => prefetchProjectImage(project)}
                onFocus={() => prefetchProjectImage(project)}
                aria-label={`${selectProjectLabel}: ${project.title}`}
                aria-pressed={projectIndex === activeIndex}
              >
                <span className={styles.previewMedia} aria-hidden="true">
                  {!usesCardFrame ? (
                    <Image
                      className={styles.previewBackdrop}
                      src={previewSource}
                      alt=""
                      fill
                      loading="lazy"
                      quality={60}
                      sizes="(max-width: 700px) 34vw, (max-width: 980px) 18vw, 18vw"
                    />
                  ) : null}
                  {!usesCardFrame && project.previewImageMobile ? (
                    <Image
                      className={styles.previewBackdropMobile}
                      src={previewSourceMobile}
                      alt=""
                      fill
                      loading="lazy"
                      quality={60}
                      sizes="34vw"
                    />
                  ) : null}
                  <Image
                    className={styles.previewImage}
                    src={previewSource}
                    alt=""
                    fill
                    loading="lazy"
                    quality={60}
                    sizes="(max-width: 700px) 34vw, (max-width: 980px) 18vw, 18vw"
                  />
                  {project.previewImageMobile ? (
                    <Image
                      className={styles.previewImageMobile}
                      src={previewSourceMobile}
                      alt=""
                      fill
                      loading="lazy"
                      quality={60}
                      sizes="34vw"
                    />
                  ) : null}
                </span>
              </button>
            )
          })}
          </div>
          {previewRailScrollable ? (
            <span
              className={`${styles.previewRailScrollHint} ${previewRailAtEnd ? styles.previewRailScrollHintComplete : ''}`}
              aria-hidden="true"
            >
              <ChevronDown strokeWidth={1.6} />
            </span>
          ) : null}
        </div>
      </div>

      <nav className={styles.controls} aria-label={heading}>
        <button className={styles.control} type="button" onClick={() => move(-1)} aria-label={previousLabel}>
          <ArrowLeft aria-hidden="true" strokeWidth={1.6} />
        </button>
        <button className={styles.control} type="button" onClick={() => move(1)} aria-label={nextLabel}>
          <ArrowRight aria-hidden="true" strokeWidth={1.6} />
        </button>
      </nav>
    </section>
  )
}
