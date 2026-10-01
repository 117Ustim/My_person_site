'use client'

import { ArrowLeft, ArrowRight, ChevronDown, Compass, ExternalLink, Info, Layers3, Sparkles, X } from 'lucide-react'
import Image, { getImageProps } from 'next/image'
import { createPortal } from 'react-dom'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as PointerEventType, type RefObject, type UIEvent, type WheelEvent as WheelEventType } from 'react'
import type { FeatureItem, PortfolioCategory, PortfolioImageSection } from '../../lib/page-data'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
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
  appStoreLabel: string
  liveSitePlaceholderLabel: string
  liveSiteInactiveLabel: string
  projectDetailsLabel: string
  closeProjectDetailsLabel: string
  projectDetailsContextLabel: string
  projectDetailsSolutionLabel: string
  projectDetailsResultLabel: string
  projectDetailsTypeLabel: string
  projectDetailsPlatformLabel: string
  projectDetailsRoleLabel: string
  projectDetailsRoleValue: string
  projectDetailsPlatforms: Readonly<Record<PortfolioCategory, string>>
  projectDetailsFallbacks: Readonly<Record<PortfolioCategory, { solution: string; result: string }>>
}

function splitReadableParagraphs(text: string) {
  const explicitParagraphs = text
    .split(/\n+/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)

  if (explicitParagraphs.length > 1) {
    return explicitParagraphs
  }

  const sentences = text.match(/[^.!?…]+(?:[.!?…]+|$)/g)?.map(sentence => sentence.trim()).filter(Boolean) ?? [text.trim()]

  if (sentences.length <= 1) {
    const clauses = text
      .split(/(?<=[,:;])\s+/)
      .map(clause => clause.trim())
      .filter(Boolean)

    return clauses.length > 1 && text.length > 180 ? clauses : [text.trim()]
  }

  const paragraphs: string[] = []
  let currentParagraph = ''

  sentences.forEach(sentence => {
    const nextParagraph = currentParagraph ? `${currentParagraph} ${sentence}` : sentence

    if (currentParagraph && nextParagraph.length > 230) {
      paragraphs.push(currentParagraph)
      currentParagraph = sentence
      return
    }

    currentParagraph = nextParagraph
  })

  if (currentParagraph) {
    paragraphs.push(currentParagraph)
  }

  return paragraphs
}

const portfolioBlurDataUrl = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23262a2e'/%3E%3C/svg%3E"
const projectDetailsCloseDuration = 460

type LazyPortfolioImageProps = {
  section: PortfolioImageSection
  alt: string
  sizes: string
  rootRef: RefObject<HTMLDivElement | null>
}

function LazyPortfolioImage({ section, alt, sizes, rootRef }: LazyPortfolioImageProps) {
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
  }, [])

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

function ResponsivePreviewImage({ desktopSrc, mobileSrc, className, sizes }: ResponsivePreviewImageProps) {
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
      {mobileImage ? <source media="(max-width: 700px)" srcSet={mobileImage.props.srcSet} sizes="34vw" /> : null}
      <img {...desktopImage.props} className={className} />
    </picture>
  )
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
  const isVetScanProject = activeProject.portfolioProject === 'vetscanct'
  const isVetScanSiteProject = activeProject.portfolioProject === 'vetscanct-site'
  const isLuxuryTravelProject = activeProject.portfolioProject === 'luxury-travel'
  const isOliveOilProject = activeProject.portfolioProject === 'olive-oil'
  const isModularHouseProject = activeProject.portfolioProject === 'modular-house'
  const isBoostifyProject = activeProject.portfolioProject === 'boostify'
  const isDiamantProject = activeProject.portfolioProject === 'diamant'
  const isBeautyMasterProject = activeProject.portfolioProject === 'beauty-master-crm'
  const isAutoServiceProject = activeProject.portfolioProject === 'auto-service-crm'
  const isSportBaseProject = activeProject.portfolioProject === 'sport-base-crm'
  const isSportsMobileProject = activeProject.portfolioProject === 'sports-crm'
  const isMedScannerProject = activeProject.portfolioProject === 'medscanner'
  const isAirScannerProject = activeProject.portfolioProject === 'air-scanner'
  const isSwipeShotProject = activeProject.portfolioProject === 'swipeshot'
  const projectDetailsPlatform = isSwipeShotProject ? 'iOS · Swift' : projectDetailsPlatforms[activeProjectCategory]
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
  const projectDetailSectionIcons = [Compass, Layers3, Sparkles]
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
                    sizes="(max-width: 700px) calc(100vw - 32px), 960px"
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
                sizes="(max-width: 700px) calc(100vw - 32px), 960px"
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
                sizes="(max-width: 700px) calc(100vw - 32px), 960px"
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

        <div className={`${styles.previewRailShell} ${categoryProjects.length === 1 ? styles.previewRailShellSingle : ''}`}>
          <div
            ref={previewRailRef}
            className={`${styles.previewRail} ${previewRailScrollable ? styles.previewRailScrollable : ''}`}
            aria-label={heading}
            data-lenis-prevent={previewRailScrollable || undefined}
            onScroll={previewRailScrollable ? handlePreviewRailScroll : undefined}
            onWheel={previewRailScrollable ? handlePreviewRailWheel : undefined}
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
                aria-label={`${selectProjectLabel}: ${project.title}`}
                aria-pressed={projectIndex === activeIndex}
              >
                <span className={styles.previewMedia} aria-hidden="true">
                  {!usesCardFrame ? (
                    <ResponsivePreviewImage
                      desktopSrc={previewSource}
                      mobileSrc={project.previewImageMobile ? previewSourceMobile : undefined}
                      className={styles.previewBackdrop}
                      sizes="(max-width: 700px) 34vw, 190px"
                    />
                  ) : null}
                  <ResponsivePreviewImage
                    desktopSrc={previewSource}
                    mobileSrc={project.previewImageMobile ? previewSourceMobile : undefined}
                    className={styles.previewImage}
                    sizes="(max-width: 700px) 34vw, 190px"
                  />
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

      <button className={`${styles.action} ${styles.mobileAction}`} type="button" onClick={openInquiry}>
        {actionLabel}
      </button>

      {isMediaFullscreenOpen && typeof document !== 'undefined' ? createPortal(
        <div
          className={styles.mediaFullscreenOverlay}
          data-lenis-prevent="true"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) {
              closeMediaFullscreen()
            }
          }}
        >
          <div
            className={styles.mediaFullscreenDialog}
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
          >
            <button
              ref={mediaFullscreenCloseButtonRef}
              className={styles.mediaFullscreenClose}
              type="button"
              aria-label={closeProjectDetailsLabel}
              onClick={closeMediaFullscreen}
            >
              <X size={20} strokeWidth={1.8} aria-hidden="true" />
            </button>

            <div ref={mediaFullscreenViewportRef} className={styles.mediaFullscreenViewport}>
              {activeProject.scrollable && activeProject.imageSections?.length ? (
                <div className={styles.scrollableImageStack}>
                  {activeProject.imageSections.map((section, sectionIndex) => (
                    <LazyPortfolioImage
                      key={section.src}
                      section={section}
                      alt={sectionIndex === 0 ? activeProject.imageAlt : ''}
                      sizes="100vw"
                      rootRef={mediaFullscreenViewportRef}
                    />
                  ))}
                </div>
              ) : (
                <Image
                  className={styles.mediaFullscreenImage}
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  width={activeProject.imageWidth ?? 1640}
                  height={activeProject.imageHeight ?? 5037}
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={portfolioBlurDataUrl}
                  quality={75}
                  sizes="100vw"
                />
              )}
            </div>
          </div>
        </div>,
        document.body,
      ) : null}

      {isProjectDetailsOpen && typeof document !== 'undefined' ? createPortal(
        <div
          className={`${styles.projectDetailsOverlay} ${isProjectDetailsClosing ? styles.projectDetailsOverlayClosing : ''}`}
          data-lenis-prevent="true"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) {
              closeProjectDetails()
            }
          }}
        >
          <article
            className={`${styles.projectDetailsDialog} ${isProjectDetailsClosing ? styles.projectDetailsDialogClosing : ''} ${isVetScanProject ? styles.projectDetailsDialogVet : ''} ${isVetScanSiteProject ? styles.projectDetailsDialogVetSite : ''} ${isLuxuryTravelProject ? styles.projectDetailsDialogLuxury : ''} ${isOliveOilProject ? styles.projectDetailsDialogOlive : ''} ${isModularHouseProject ? styles.projectDetailsDialogModularHouse : ''} ${isBoostifyProject ? styles.projectDetailsDialogBoostify : ''} ${isDiamantProject ? styles.projectDetailsDialogDiamant : ''} ${isBeautyMasterProject ? styles.projectDetailsDialogBeauty : ''} ${isAutoServiceProject ? styles.projectDetailsDialogAuto : ''} ${isSportBaseProject || isSportsMobileProject ? styles.projectDetailsDialogSport : ''} ${isMedScannerProject ? styles.projectDetailsDialogMedScanner : ''} ${isAirScannerProject ? styles.projectDetailsDialogAir : ''} ${isSwipeShotProject ? styles.projectDetailsDialogSwipeShot : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
          >
            <button
              ref={projectDetailsCloseButtonRef}
              className={styles.projectDetailsClose}
              type="button"
              aria-label={closeProjectDetailsLabel}
              onClick={closeProjectDetails}
            >
              <X size={18} strokeWidth={1.7} aria-hidden="true" />
            </button>

            <div className={styles.projectDetailsHero}>
              <div className={styles.projectDetailsVisual}>
                <Image
                  className={styles.projectDetailsVisualImage}
                  src={activeProjectPreview}
                  alt={activeProject.imageAlt}
                  fill
                  sizes="(max-width: 980px) calc(100vw - 72px), 600px"
                  quality={75}
                />
                <span className={styles.projectDetailsEyebrow}>{projectDetailsLabel}</span>
              </div>

              <div className={styles.projectDetailsIntro}>
                <span className={styles.projectDetailsRibbon} aria-hidden="true" />
                <span className={styles.projectDetailsType}>{activeProjectTypeLabel}</span>
                <h2 id="project-details-title" className={styles.projectDetailsTitle}>{activeProject.title}</h2>
                <p className={styles.projectDetailsDescription}>{activeProject.description}</p>
              </div>
            </div>

            <div className={styles.projectDetailsSections}>
              {projectDetailSections.map((section, index) => (
                <section className={styles.projectDetailsSection} key={section.label}>
                  <span className={styles.projectDetailsSectionIndex}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {(() => {
                      const SectionIcon = projectDetailSectionIcons[index]
                      return <SectionIcon size={14} strokeWidth={1.5} aria-hidden="true" />
                    })()}
                  </span>
                  <h3 className={styles.projectDetailsSectionTitle}>{section.label}</h3>
                  <div className={styles.projectDetailsSectionDescription}>
                    {splitReadableParagraphs(section.description).map((paragraph, paragraphIndex) => (
                      <p key={`${section.label}-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <dl className={styles.projectDetailsMeta}>
              <div className={styles.projectDetailsMetaItem}>
                <dt>{projectDetailsTypeLabel}</dt>
                <dd>{activeProjectTypeLabel}</dd>
              </div>
              <div className={styles.projectDetailsMetaItem}>
                <dt>{projectDetailsPlatformLabel}</dt>
                <dd>{projectDetailsPlatform}</dd>
              </div>
              <div className={styles.projectDetailsMetaItem}>
                <dt>{projectDetailsRoleLabel}</dt>
                <dd>{projectDetailsRoleValue}</dd>
              </div>
            </dl>
          </article>
        </div>,
        document.body,
      ) : null}

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
