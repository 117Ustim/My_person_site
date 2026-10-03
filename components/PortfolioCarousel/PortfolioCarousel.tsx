'use client'

import { ChevronDown, ExternalLink, Info, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as PointerEventType, type UIEvent, type WheelEvent as WheelEventType } from 'react'
import type { PortfolioCategory } from '../../lib/page-data'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
import { PortfolioCategoryTabs, PortfolioControls, PortfolioPreviewRail } from './PortfolioCarouselNavigation'
import { PortfolioDialogs } from './PortfolioCarouselDialogs'
import { LazyPortfolioImage } from './PortfolioCarouselImages'
import { projectDetailsCloseDuration, portfolioBlurDataUrl } from './PortfolioCarousel.utils'
import type { PortfolioCarouselProps } from './PortfolioCarousel.types'
import styles from './PortfolioCarousel.module.css'

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
  appStoreLabel,
  liveSitePlaceholderLabel,
  liveSiteInactiveLabel,
  projectDetailsLabel,
  closeProjectDetailsLabel,
  projectDetailsContextLabel,
  projectDetailsSolutionLabel,
  projectDetailsResultLabel,
  projectDetailsTypeLabel,
  projectDetailsPlatformLabel,
  projectDetailsRoleLabel,
  projectDetailsRoleValue,
  projectDetailsPlatforms,
  projectDetailsFallbacks,
}: PortfolioCarouselProps) {
  const { openInquiry } = useProjectInquiry()
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('sites')
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [previewRailAtEnd, setPreviewRailAtEnd] = useState(false)
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false)
  const [isProjectDetailsClosing, setIsProjectDetailsClosing] = useState(false)
  const [isMediaFullscreenOpen, setIsMediaFullscreenOpen] = useState(false)
  const [isInactiveSiteNoticeOpen, setIsInactiveSiteNoticeOpen] = useState(false)
  const carouselRef = useRef<HTMLElement>(null)
  const mediaViewportRef = useRef<HTMLDivElement>(null)
  const mediaFullscreenViewportRef = useRef<HTMLDivElement>(null)
  const previewRailRef = useRef<HTMLDivElement>(null)
  const projectDetailsCloseButtonRef = useRef<HTMLButtonElement>(null)
  const mediaFullscreenCloseButtonRef = useRef<HTMLButtonElement>(null)
  const projectDetailsCloseTimerRef = useRef<number | null>(null)
  const categoryTabsRef = useRef<HTMLDivElement>(null)
  const categoryTabRefs = useRef<Partial<Record<PortfolioCategory, HTMLButtonElement | null>>>({})
  const categoryProjects = projects.filter(project => project.category === activeCategory)
  const openProjectDetails = useCallback(() => {
    if (projectDetailsCloseTimerRef.current !== null) {
      window.clearTimeout(projectDetailsCloseTimerRef.current)
      projectDetailsCloseTimerRef.current = null
    }

    setIsProjectDetailsClosing(false)
    setIsProjectDetailsOpen(true)
  }, [])

  const closeProjectDetails = useCallback(() => {
    if (!isProjectDetailsOpen || isProjectDetailsClosing) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsProjectDetailsOpen(false)
      return
    }

    setIsProjectDetailsClosing(true)
    projectDetailsCloseTimerRef.current = window.setTimeout(() => {
      setIsProjectDetailsOpen(false)
      setIsProjectDetailsClosing(false)
      projectDetailsCloseTimerRef.current = null
    }, projectDetailsCloseDuration)
  }, [isProjectDetailsClosing, isProjectDetailsOpen])

  const openMediaFullscreen = useCallback(() => {
    setIsMediaFullscreenOpen(true)
  }, [])

  const closeMediaFullscreen = useCallback(() => {
    setIsMediaFullscreenOpen(false)
  }, [])

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
    return () => {
      if (projectDetailsCloseTimerRef.current !== null) {
        window.clearTimeout(projectDetailsCloseTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (projectDetailsCloseTimerRef.current !== null) {
      window.clearTimeout(projectDetailsCloseTimerRef.current)
      projectDetailsCloseTimerRef.current = null
    }

    setIsProjectDetailsOpen(false)
    setIsProjectDetailsClosing(false)
    setIsMediaFullscreenOpen(false)
    setIsInactiveSiteNoticeOpen(false)
  }, [activeCategory, activeIndex])

  useEffect(() => {
    if (!isInactiveSiteNoticeOpen) return

    const timeoutId = window.setTimeout(() => {
      setIsInactiveSiteNoticeOpen(false)
    }, 5200)

    return () => window.clearTimeout(timeoutId)
  }, [isInactiveSiteNoticeOpen])

  useEffect(() => {
    if (!isProjectDetailsOpen) return

    const handleDetailsKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectDetails()
      }
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousDocumentOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', handleDetailsKeyDown)
    projectDetailsCloseButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleDetailsKeyDown)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousDocumentOverflow
    }
  }, [closeProjectDetails, isProjectDetailsOpen])

  useEffect(() => {
    if (!isMediaFullscreenOpen) return

    const handleFullscreenKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMediaFullscreen()
      }
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousDocumentOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', handleFullscreenKeyDown)
    mediaFullscreenCloseButtonRef.current?.focus()
    mediaFullscreenViewportRef.current?.scrollTo({ top: 0, behavior: 'auto' })

    return () => {
      document.removeEventListener('keydown', handleFullscreenKeyDown)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousDocumentOverflow
    }
  }, [closeMediaFullscreen, isMediaFullscreenOpen])

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

  const scrollPreviewToIndex = useCallback((index: number) => {
    const rail = previewRailRef.current
    const preview = rail?.children[index] as HTMLElement | undefined

    if (!rail || !preview) return

    const isHorizontal = rail.scrollWidth > rail.clientWidth
    const targetPosition = isHorizontal
      ? preview.offsetLeft - (rail.clientWidth - preview.offsetWidth) / 2
      : preview.offsetTop - (rail.clientHeight - preview.offsetHeight) / 2
    const safePosition = Math.max(0, targetPosition)

    rail.scrollTo({
      left: isHorizontal ? safePosition : rail.scrollLeft,
      top: isHorizontal ? rail.scrollTop : safePosition,
      behavior: 'smooth',
    })

    window.setTimeout(() => {
      if (!rail.isConnected) return

      if (isHorizontal) {
        rail.scrollLeft = safePosition
      } else {
        rail.scrollTop = safePosition
      }
    }, 320)
  }, [])

  const changeProject = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndex) return

    setActiveIndex(nextIndex)
    window.requestAnimationFrame(() => scrollPreviewToIndex(nextIndex))
  }, [activeIndex, scrollPreviewToIndex])

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

  const handlePreviewRailWheel = (event: WheelEventType<HTMLDivElement>) => {
    const target = event.currentTarget
    const hasVerticalOverflow = target.scrollHeight > target.clientHeight
    const hasHorizontalOverflow = target.scrollWidth > target.clientWidth

    if (!hasVerticalOverflow && !hasHorizontalOverflow) return

    event.preventDefault()
    event.stopPropagation()

    if (hasVerticalOverflow) {
      target.scrollTop += event.deltaY
      return
    }

    target.scrollLeft += event.deltaY
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
  const activeProjectCategory = activeProject.category ?? 'sites'
  const activeProjectTypeLabel = categoryOptions.find(option => option.id === activeProjectCategory)?.label ?? ''
  const activeProjectPreview = activeProject.previewImage ?? activeProject.image
  const projectDetailsPlatform = activeProject.portfolioProject === 'swipeshot' ? 'iOS · Swift' : projectDetailsPlatforms[activeProjectCategory]
  const isInactiveSiteProject = ['luxury-travel', 'childrens-party', 'diamant', 'boostify'].includes(activeProject.portfolioProject ?? '')
  const detailParagraphs = (activeProject.details ?? '')
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
  const fallbackDetails = projectDetailsFallbacks[activeProjectCategory]
  const teamContribution = activeProject.portfolioProject === 'olive-oil' ? detailParagraphs[4] : undefined
  const projectDetailSections = [
    {
      label: projectDetailsContextLabel,
      description: detailParagraphs[1] ?? activeProject.description,
    },
    {
      label: projectDetailsSolutionLabel,
      description: detailParagraphs[2] ?? fallbackDetails.solution,
    },
    {
      label: projectDetailsResultLabel,
      description: [detailParagraphs[3] ?? fallbackDetails.result, teamContribution].filter(Boolean).join('\n\n'),
    },
  ]
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
              <div className={styles.projectActions}>
                {activeProject.liveUrl ? (
                  <a
                    className={styles.liveSiteAction}
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={activeProject.category === 'mobile' ? appStoreLabel : liveSiteLabel}
                    data-tooltip={activeProject.category === 'mobile' ? appStoreLabel : liveSiteLabel}
                  >
                    <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                ) : activeProject.category === 'sites' ? (
                  <button
                    className={styles.liveSiteAction}
                    type="button"
                    aria-disabled={!isInactiveSiteProject ? 'true' : undefined}
                    aria-label={liveSitePlaceholderLabel}
                    data-tooltip={isInactiveSiteProject ? liveSiteLabel : liveSitePlaceholderLabel}
                    onClick={isInactiveSiteProject ? () => setIsInactiveSiteNoticeOpen(true) : undefined}
                  >
                    <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                ) : null}
                <button
                  className={`${styles.liveSiteAction} ${styles.projectDetailsAction}`}
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={projectDetailsLabel}
                  data-tooltip={projectDetailsLabel}
                  onClick={openProjectDetails}
                >
                  <Info size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
              {isInactiveSiteNoticeOpen ? (
                <div className={styles.inactiveSiteNotice} role="status">
                  <Info size={15} strokeWidth={1.8} aria-hidden="true" />
                  <span>{liveSiteInactiveLabel}</span>
                  <button
                    className={styles.inactiveSiteNoticeClose}
                    type="button"
                    aria-label={closeProjectDetailsLabel}
                    onClick={() => setIsInactiveSiteNoticeOpen(false)}
                  >
                    <X size={13} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
              ) : null}
            </div>
            <div className={styles.meta}>
              <h2 className={styles.heading}>{heading}</h2>
              <span className={styles.counter} aria-live="polite">
                {String(activeIndex + 1).padStart(2, '0')} / {String(categoryProjects.length).padStart(2, '0')}
              </span>
            </div>
            <h2 className={styles.title}>{activeProject.title}</h2>
            <p className={styles.description}>{activeProject.description}</p>
            <button className={styles.action} type="button" onClick={openInquiry}>
              {actionLabel}
            </button>
          </div>
        </div>

        <div className={styles.mediaColumn}>
          <PortfolioCategoryTabs
            categoryOptions={categoryOptions}
            activeCategory={activeCategory}
            heading={heading}
            categoryTabsRef={categoryTabsRef}
            categoryTabRefs={categoryTabRefs}
            selectCategory={selectCategory}
            handleTabPointerMove={handleTabPointerMove}
            resetTabPointer={resetTabPointer}
          />

          <div
            className={styles.mainMediaFrame}
            role="button"
            tabIndex={0}
            aria-label={`${selectProjectLabel}: ${activeProject.title}`}
            onClick={openMediaFullscreen}
            onKeyDown={event => {
              if (event.target !== event.currentTarget) return

              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openMediaFullscreen()
              }
            }}
          >
          <span className={styles.mediaFullscreenHint} aria-hidden="true">⛶</span>
          <div
            ref={mediaViewportRef}
            className={`${styles.mediaViewport} ${activeProject.scrollable ? styles.scrollableViewport : ''}`}
            data-lenis-prevent={activeProject.scrollable || undefined}
            onScroll={activeProject.scrollable ? handleMediaScroll : undefined}
            tabIndex={activeProject.scrollable ? 0 : undefined}
          >
            {activeProject.scrollable && activeProject.imageSections?.length ? (
              <div className={styles.scrollableImageStack}>
                {activeProject.imageSections.map((section, sectionIndex) => (
                  <LazyPortfolioImage
                    key={section.src}
                    section={section}
                    alt={sectionIndex === 0 ? activeProject.imageAlt : ''}
                    sizes="(max-width: 760px) calc(100vw - 32px), 960px"
                    rootRef={mediaViewportRef}
                  />
                ))}
              </div>
            ) : activeProject.scrollable ? (
              <Image
                className={styles.scrollableImage}
                key={activeProject.image}
                src={activeProject.image}
                alt={activeProject.imageAlt}
                width={activeProject.imageWidth ?? 1640}
                height={activeProject.imageHeight ?? 5037}
                loading="lazy"
                placeholder="blur"
                blurDataURL={portfolioBlurDataUrl}
                quality={70}
                sizes="(max-width: 760px) calc(100vw - 32px), 960px"
              />
            ) : (
              <Image
                className={styles.backgroundImage}
                key={activeProject.image}
                src={activeProject.image}
                alt={activeProject.imageAlt}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={portfolioBlurDataUrl}
                quality={70}
                sizes="(max-width: 760px) calc(100vw - 32px), 960px"
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
              <span className={styles.scrollCueMobileArrows} aria-hidden="true">
                <ChevronDown className={styles.scrollCueMobileIcon} strokeWidth={2.5} />
                <ChevronDown className={styles.scrollCueMobileIcon} strokeWidth={2.5} />
                <ChevronDown className={styles.scrollCueMobileIcon} strokeWidth={2.5} />
              </span>
            </div>
          ) : null}
          </div>
        </div>

        <PortfolioPreviewRail
          projects={categoryProjects}
          activeIndex={activeIndex}
          heading={heading}
          selectProjectLabel={selectProjectLabel}
          previewRailRef={previewRailRef}
          previewRailAtEnd={previewRailAtEnd}
          previewRailScrollable={previewRailScrollable}
          changeProject={changeProject}
          handlePreviewRailScroll={handlePreviewRailScroll}
          handlePreviewRailWheel={handlePreviewRailWheel}
        />
      </div>

      <button className={`${styles.action} ${styles.mobileAction}`} type="button" onClick={openInquiry}>
        {actionLabel}
      </button>

      <PortfolioDialogs
        activeProject={activeProject}
        activeProjectPreview={activeProjectPreview}
        activeProjectTypeLabel={activeProjectTypeLabel}
        projectDetailsLabel={projectDetailsLabel}
        closeProjectDetailsLabel={closeProjectDetailsLabel}
        projectDetailsTypeLabel={projectDetailsTypeLabel}
        projectDetailsPlatformLabel={projectDetailsPlatformLabel}
        projectDetailsRoleLabel={projectDetailsRoleLabel}
        projectDetailsRoleValue={projectDetailsRoleValue}
        projectDetailsPlatform={projectDetailsPlatform}
        projectDetailSections={projectDetailSections}
        isMediaFullscreenOpen={isMediaFullscreenOpen}
        isProjectDetailsOpen={isProjectDetailsOpen}
        isProjectDetailsClosing={isProjectDetailsClosing}
        mediaFullscreenViewportRef={mediaFullscreenViewportRef}
        mediaFullscreenCloseButtonRef={mediaFullscreenCloseButtonRef}
        projectDetailsCloseButtonRef={projectDetailsCloseButtonRef}
        closeMediaFullscreen={closeMediaFullscreen}
        closeProjectDetails={closeProjectDetails}
      />

      <PortfolioControls heading={heading} previousLabel={previousLabel} nextLabel={nextLabel} move={move} />
    </section>
  )
}
