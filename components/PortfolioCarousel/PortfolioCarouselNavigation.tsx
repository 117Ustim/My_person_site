'use client'

import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
import { type PointerEvent as PointerEventType, type RefObject, type UIEvent, type WheelEvent as WheelEventType } from 'react'
import type { FeatureItem, PortfolioCategory } from '../../lib/page-data'
import { ResponsivePreviewImage } from './PortfolioCarouselImages'
import baseStyles from './PortfolioCarousel.module.css'
import navigationStyles from './PortfolioCarouselNavigation.module.css'

const styles = { ...baseStyles, ...navigationStyles }

type CategoryTabsProps = {
  categoryOptions: ReadonlyArray<{ id: PortfolioCategory; label: string }>
  activeCategory: PortfolioCategory
  heading: string
  categoryTabsRef: RefObject<HTMLDivElement | null>
  categoryTabRefs: RefObject<Partial<Record<PortfolioCategory, HTMLButtonElement | null>>>
  selectCategory: (category: PortfolioCategory) => void
  handleTabPointerMove: (event: PointerEventType<HTMLButtonElement>) => void
  resetTabPointer: (event: PointerEventType<HTMLButtonElement>) => void
}

export function PortfolioCategoryTabs({
  categoryOptions,
  activeCategory,
  heading,
  categoryTabsRef,
  categoryTabRefs,
  selectCategory,
  handleTabPointerMove,
  resetTabPointer,
}: CategoryTabsProps) {
  return (
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
  )
}

type PreviewRailProps = {
  projects: ReadonlyArray<FeatureItem>
  activeIndex: number
  heading: string
  selectProjectLabel: string
  previewRailRef: RefObject<HTMLDivElement | null>
  previewRailAtEnd: boolean
  previewRailScrollable: boolean
  changeProject: (index: number) => void
  handlePreviewRailScroll: (event: UIEvent<HTMLDivElement>) => void
  handlePreviewRailWheel: (event: WheelEventType<HTMLDivElement>) => void
}

export function PortfolioPreviewRail({
  projects,
  activeIndex,
  heading,
  selectProjectLabel,
  previewRailRef,
  previewRailAtEnd,
  previewRailScrollable,
  changeProject,
  handlePreviewRailScroll,
  handlePreviewRailWheel,
}: PreviewRailProps) {
  return (
    <div className={`${styles.previewRailShell} ${projects.length === 1 ? styles.previewRailShellSingle : ''}`}>
      <div
        ref={previewRailRef}
        className={`${styles.previewRail} ${previewRailScrollable ? styles.previewRailScrollable : ''}`}
        aria-label={heading}
        data-lenis-prevent={previewRailScrollable || undefined}
        onScroll={previewRailScrollable ? handlePreviewRailScroll : undefined}
        onWheel={previewRailScrollable ? handlePreviewRailWheel : undefined}
        tabIndex={previewRailScrollable ? 0 : undefined}
      >
        {projects.map((project, projectIndex) => {
          const previewSource = project.previewImage ?? project.image
          const previewSourceMobile = project.previewImageMobile ?? previewSource
          const usesCardFrame = projects.length > 1 && Boolean(project.previewImage)

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
                    sizes="(max-width: 760px) 34vw, 190px"
                  />
                ) : null}
                <ResponsivePreviewImage
                  desktopSrc={previewSource}
                  mobileSrc={project.previewImageMobile ? previewSourceMobile : undefined}
                  className={styles.previewImage}
                  sizes="(max-width: 760px) 34vw, 190px"
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
  )
}

type PortfolioControlsProps = {
  heading: string
  previousLabel: string
  nextLabel: string
  move: (direction: -1 | 1) => void
}

export function PortfolioControls({ heading, previousLabel, nextLabel, move }: PortfolioControlsProps) {
  return (
    <nav className={styles.controls} aria-label={heading}>
      <button className={styles.control} type="button" onClick={() => move(-1)} aria-label={previousLabel}>
        <ArrowLeft aria-hidden="true" strokeWidth={1.6} />
      </button>
      <button className={styles.control} type="button" onClick={() => move(1)} aria-label={nextLabel}>
        <ArrowRight aria-hidden="true" strokeWidth={1.6} />
      </button>
    </nav>
  )
}
