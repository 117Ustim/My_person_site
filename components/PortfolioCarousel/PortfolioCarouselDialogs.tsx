'use client'

import { Compass, Layers3, Sparkles, X, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import type { RefObject } from 'react'
import type { FeatureItem } from '../../lib/page-data'
import { LazyPortfolioImage } from './PortfolioCarouselImages'
import { portfolioBlurDataUrl, splitReadableParagraphs } from './PortfolioCarousel.utils'
import baseStyles from './PortfolioCarousel.module.css'
import dialogStyles from './PortfolioCarouselDialogs.module.css'

const styles = { ...baseStyles, ...dialogStyles }

export type ProjectDetailSection = {
  label: string
  description: string
}

type PortfolioDialogsProps = {
  activeProject: FeatureItem
  activeProjectPreview: string
  activeProjectTypeLabel: string
  projectDetailsLabel: string
  closeProjectDetailsLabel: string
  projectDetailsTypeLabel: string
  projectDetailsPlatformLabel: string
  projectDetailsRoleLabel: string
  projectDetailsRoleValue: string
  projectDetailsPlatform: string
  projectDetailSections: ReadonlyArray<ProjectDetailSection>
  isMediaFullscreenOpen: boolean
  isProjectDetailsOpen: boolean
  isProjectDetailsClosing: boolean
  mediaFullscreenViewportRef: RefObject<HTMLDivElement | null>
  mediaFullscreenCloseButtonRef: RefObject<HTMLButtonElement | null>
  projectDetailsCloseButtonRef: RefObject<HTMLButtonElement | null>
  closeMediaFullscreen: () => void
  closeProjectDetails: () => void
}

function getProjectDetailsVariantClassName(projectId?: string) {
  const variants = [
    projectId === 'vetscanct' ? styles.projectDetailsDialogVet : '',
    projectId === 'vetscanct-site' ? styles.projectDetailsDialogVetSite : '',
    projectId === 'luxury-travel' ? styles.projectDetailsDialogLuxury : '',
    projectId === 'olive-oil' ? styles.projectDetailsDialogOlive : '',
    projectId === 'modular-house' ? styles.projectDetailsDialogModularHouse : '',
    projectId === 'boostify' ? styles.projectDetailsDialogBoostify : '',
    projectId === 'diamant' ? styles.projectDetailsDialogDiamant : '',
    projectId === 'beauty-master-crm' ? styles.projectDetailsDialogBeauty : '',
    projectId === 'auto-service-crm' ? styles.projectDetailsDialogAuto : '',
    projectId === 'sport-base-crm' || projectId === 'sports-crm' ? styles.projectDetailsDialogSport : '',
    projectId === 'medscanner' ? styles.projectDetailsDialogMedScanner : '',
    projectId === 'air-scanner' ? styles.projectDetailsDialogAir : '',
    projectId === 'swipeshot' ? styles.projectDetailsDialogSwipeShot : '',
  ]

  return variants.filter(Boolean).join(' ')
}

export function PortfolioDialogs({
  activeProject,
  activeProjectPreview,
  activeProjectTypeLabel,
  projectDetailsLabel,
  closeProjectDetailsLabel,
  projectDetailsTypeLabel,
  projectDetailsPlatformLabel,
  projectDetailsRoleLabel,
  projectDetailsRoleValue,
  projectDetailsPlatform,
  projectDetailSections,
  isMediaFullscreenOpen,
  isProjectDetailsOpen,
  isProjectDetailsClosing,
  mediaFullscreenViewportRef,
  mediaFullscreenCloseButtonRef,
  projectDetailsCloseButtonRef,
  closeMediaFullscreen,
  closeProjectDetails,
}: PortfolioDialogsProps) {
  const projectDetailSectionIcons: LucideIcon[] = [Compass, Layers3, Sparkles]
  const projectDetailsVariantClassName = getProjectDetailsVariantClassName(activeProject.portfolioProject)

  return (
    <>
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
                      sizes="(min-width: 1200px) 1400px, 100vw"
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
                  sizes="(min-width: 1200px) 1400px, 100vw"
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
            className={`${styles.projectDetailsDialog} ${isProjectDetailsClosing ? styles.projectDetailsDialogClosing : ''} ${projectDetailsVariantClassName}`}
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
              {projectDetailSections.map((section, index) => {
                const SectionIcon = projectDetailSectionIcons[index]

                return (
                  <section className={styles.projectDetailsSection} key={section.label}>
                    <span className={styles.projectDetailsSectionIndex}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {SectionIcon ? <SectionIcon size={14} strokeWidth={1.5} aria-hidden="true" /> : null}
                    </span>
                    <h3 className={styles.projectDetailsSectionTitle}>{section.label}</h3>
                    <div className={styles.projectDetailsSectionDescription}>
                      {splitReadableParagraphs(section.description).map((paragraph, paragraphIndex) => (
                        <p key={`${section.label}-${paragraphIndex}`}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                )
              })}
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
    </>
  )
}
