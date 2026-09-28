'use client'

import { useI18n } from '../../lib/i18n'
import type { FeatureItem, PortfolioCategory, PortfolioImageSection } from '../../lib/page-data'

const portfolioSectionHeight = 1400
const portfolioSectionWidth = 1400

const createPortfolioImageSections = (image: string, sourceWidth: number, sourceHeight: number): ReadonlyArray<PortfolioImageSection> => {
  const width = Math.min(portfolioSectionWidth, sourceWidth)
  const height = Math.round(sourceHeight * width / sourceWidth)
  const sectionCount = Math.ceil(height / portfolioSectionHeight)
  const basePath = image.replace(/\.[^.]+$/, '')

  return Array.from({ length: sectionCount }, (_, index) => ({
    src: `${basePath}-part-${String(index + 1).padStart(2, '0')}.webp`,
    width,
    height: Math.min(portfolioSectionHeight, height - index * portfolioSectionHeight),
  }))
}
import MarketingHero from '../MarketingHero/MarketingHero'
import PortfolioCarousel from '../PortfolioCarousel/PortfolioCarousel'
import PortfolioCta from '../PortfolioCta/PortfolioCta'
import styles from '../MarketingPages/MarketingPages.module.css'

export default function PortfolioPageContent() {
  const { locale, t } = useI18n()
  const projects: FeatureItem[] = [
    {
      title: t('portfolio.projectBeautyTitle'),
      description: t('portfolio.projectBeautyDescription'),
      details: t('portfolio.projectBeautyDetails'),
      portfolioProject: 'beauty-master-crm',
      image: '/assets/portfolio/beauty-master-crm-portfolio.webp',
      previewImage: '/assets/portfolio/beauty-master-crm-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/beauty-master-crm-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1600,
      imageHeight: 7240,
      category: 'crm',
      imageAlt: t('portfolio.projectBeautyAlt'),
    },
    {
      title: t('portfolio.projectVetTitle'),
      description: t('portfolio.projectVetDescription'),
      details: t('portfolio.projectVetDetails'),
      image: '/assets/portfolio/vetscanct-crm-portfolio.webp',
      previewImage: '/assets/portfolio/vetscanct-crm-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/vetscanct-crm-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1640,
      imageHeight: 5037,
      category: 'crm',
      portfolioProject: 'vetscanct',
      imageAlt: t('portfolio.projectVetAlt'),
    },
    {
      title: t('portfolio.projectTravelTitle'),
      description: t('portfolio.projectTravelDescription'),
      details: t('portfolio.projectTravelDetails'),
      image: '/assets/portfolio/luxury-travel-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/luxury-travel-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/luxury-travel-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1528,
      imageHeight: 6798,
      category: 'sites',
      portfolioProject: 'luxury-travel',
      imageAlt: t('portfolio.projectTravelAlt'),
    },
    {
      title: t('portfolio.projectVetSiteTitle'),
      description: t('portfolio.projectVetSiteDescription'),
      details: t('portfolio.projectVetSiteDetails'),
      image: '/assets/portfolio/vetscanct-site-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/vetscanct-site-preview-card-ua.jpg',
      previewImageMobile: '/assets/portfolio/vetscanct-site-preview-card-ua-mobile.jpg',
      scrollable: true,
      imageWidth: 2112,
      imageHeight: 7010,
      category: 'sites',
      portfolioProject: 'vetscanct-site',
      liveUrl: 'https://vetscanct.com.ua/',
      imageAlt: t('portfolio.projectVetSiteAlt'),
    },
    {
      title: t('portfolio.projectChildrenTitle'),
      description: t('portfolio.projectChildrenDescription'),
      details: t('portfolio.projectChildrenDetails'),
      image: '/assets/portfolio/childrens-party-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/childrens-party-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/childrens-party-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1496,
      imageHeight: 5194,
      category: 'sites',
      portfolioProject: 'childrens-party',
      imageAlt: t('portfolio.projectChildrenAlt'),
    },
    {
      title: t('portfolio.projectOliveTitle'),
      description: t('portfolio.projectOliveDescription'),
      details: t('portfolio.projectOliveDetails'),
      image: '/assets/portfolio/olive-oil-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/olive-oil-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/olive-oil-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1496,
      imageHeight: 4490,
      category: 'sites',
      portfolioProject: 'olive-oil',
      liveUrl: 'https://www.konstolymp.gr/',
      imageAlt: t('portfolio.projectOliveAlt'),
    },
    {
      title: t('portfolio.projectModularHouseTitle'),
      description: t('portfolio.projectModularHouseDescription'),
      details: t('portfolio.projectModularHouseDetails'),
      image: '/assets/portfolio/modular-house-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/modular-house-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/modular-house-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1604,
      imageHeight: 5540,
      category: 'sites',
      portfolioProject: 'modular-house',
      liveUrl: 'https://bazainvest.com.ua/',
      imageAlt: t('portfolio.projectModularHouseAlt'),
    },
    {
      title: t('portfolio.projectDiamantTitle'),
      description: t('portfolio.projectDiamantDescription'),
      details: t('portfolio.projectDiamantDetails'),
      image: locale === 'en' ? '/assets/portfolio/diamant-website-screens-collage-en.png' : '/assets/portfolio/diamant-ukr-portfolio.png',
      previewImage: locale === 'en' ? '/assets/portfolio/diamant-natural-cosmetics-ad-en-3d.png' : '/assets/portfolio/diamant-ukr-card.png',
      scrollable: true,
      imageWidth: 2200,
      imageHeight: 9390,
      category: 'sites',
      portfolioProject: 'diamant',
      imageAlt: t('portfolio.projectDiamantAlt'),
    },
    {
      title: t('portfolio.projectIdentoTitle'),
      description: t('portfolio.projectIdentoDescription'),
      details: t('portfolio.projectIdentoDetails'),
      image: '/assets/portfolio/idento-vertical-collage.webp',
      previewImage: '/assets/portfolio/idento-presentation-dark-preview.webp',
      scrollable: true,
      imageWidth: 1623,
      imageHeight: 5197,
      category: 'sites',
      portfolioProject: 'idento',
      liveUrl: 'https://employment-2.vercel.app/',
      imageAlt: t('portfolio.projectIdentoAlt'),
    },
    {
      title: t('portfolio.projectBoostifyTitle'),
      description: t('portfolio.projectBoostifyDescription'),
      details: t('portfolio.projectBoostifyDetails'),
      image: '/assets/portfolio/boostify-website-screens-collage.png',
      previewImage: locale === 'en' ? '/assets/portfolio/boostify-advertising-cover-en-strict-3d.png' : '/assets/portfolio/boostify-ukr-card.png',
      scrollable: true,
      imageWidth: 2200,
      imageHeight: 5975,
      category: 'sites',
      portfolioProject: 'boostify',
      imageAlt: t('portfolio.projectBoostifyAlt'),
    },
    {
      title: t('portfolio.projectSportBaseTitle'),
      description: t('portfolio.projectSportBaseDescription'),
      details: t('portfolio.projectSportBaseDetails'),
      image: '/assets/portfolio/sport-base-crm-vertical-portfolio-1600.webp',
      previewImage: '/assets/portfolio/sports-crm-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/sports-crm-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1600,
      imageHeight: 13984,
      category: 'crm',
      portfolioProject: 'sport-base-crm',
      imageAlt: t('portfolio.projectSportBaseAlt'),
    },
    {
      title: t('portfolio.projectAutoTitle'),
      description: t('portfolio.projectAutoDescription'),
      details: t('portfolio.projectAutoDetails'),
      image: '/assets/portfolio/ukr-auto-service-crm-vertical-portfolio.webp',
      previewImage: '/assets/portfolio/auto-service-crm-promo-uk-preview-card.jpg',
      previewImageMobile: '/assets/portfolio/auto-service-crm-promo-uk-preview-card-mobile.jpg',
      scrollable: true,
      imageWidth: 1600,
      imageHeight: 7550,
      category: 'crm',
      portfolioProject: 'auto-service-crm',
      imageAlt: t('portfolio.projectAutoAlt'),
    },
    {
      title: t('portfolio.projectMedScannerTitle'),
      description: t('portfolio.projectMedScannerDescription'),
      details: t('portfolio.projectMedScannerDetails'),
      image: locale === 'en' ? '/assets/portfolio/medtracker-iphone-screens-collage-en.png' : '/assets/portfolio/medtracker-iphone-ukr.png',
      previewImage: locale === 'en' ? '/assets/portfolio/medscanner-ad-en-3d.png' : '/assets/portfolio/medscanner-ukr.png',
      scrollable: true,
      imageWidth: 2000,
      imageHeight: 11448,
      category: 'mobile',
      portfolioProject: 'medscanner',
      imageAlt: t('portfolio.projectMedScannerAlt'),
    },
    {
      title: t('portfolio.projectSportsTitle'),
      description: t('portfolio.projectSportsDescription'),
      details: t('portfolio.projectSportsDetails'),
      image: locale === 'en' ? '/assets/portfolio/fitness-iphone-grid-english.png' : '/assets/portfolio/iphone-ukr-collage.png',
      previewImage: locale === 'en' ? '/assets/portfolio/fitness-mobile-app-en.png' : '/assets/portfolio/fitness-mobile-app-ukr.png',
      previewImageMobile: locale === 'en' ? '/assets/portfolio/fitness-mobile-app-en.png' : '/assets/portfolio/fitness-mobile-app-ukr.png',
      scrollable: true,
      imageWidth: locale === 'en' ? 2136 : 2160,
      imageHeight: locale === 'en' ? 13010 : 12898,
      category: 'mobile',
      portfolioProject: 'sports-crm',
      imageAlt: t('portfolio.projectSportsAlt'),
    },
    {
      title: t('portfolio.projectAirScannerTitle'),
      description: t('portfolio.projectAirScannerDescription'),
      details: t('portfolio.projectAirScannerDetails'),
      image: locale === 'en' ? '/assets/portfolio/air-scanner-iphone-vertical-collage-batch2.png' : '/assets/portfolio/air-scanner-iphone-vertical-collage-v2.png',
      previewImage: locale === 'en' ? '/assets/portfolio/air-scanner-mobile-ad-en-3d.png' : '/assets/portfolio/air-scanner-mobile-ad-ua-3d.png',
      previewImageMobile: locale === 'en' ? '/assets/portfolio/air-scanner-mobile-ad-en-3d.png' : '/assets/portfolio/air-scanner-mobile-ad-ua-3d.png',
      scrollable: true,
      imageWidth: 1282,
      imageHeight: 4860,
      category: 'mobile',
      portfolioProject: 'air-scanner',
      imageAlt: t('portfolio.projectAirScannerAlt'),
    },
    {
      title: t('portfolio.projectSwipeShotTitle'),
      description: t('portfolio.projectSwipeShotDescription'),
      details: t('portfolio.projectSwipeShotDetails'),
      image: locale === 'en' ? '/assets/portfolio/swipeshot-iphone-vertical-collage-v2.png' : '/assets/portfolio/swipeshot-ukr-vertical-collage.png',
      previewImage: locale === 'en' ? '/assets/portfolio/swipeshot-mobile-ad-en-3d.png' : '/assets/portfolio/swipeshot-mobile-ad-ua-3d.png',
      scrollable: true,
      imageWidth: 1260,
      imageHeight: 3755,
      category: 'mobile',
      portfolioProject: 'swipeshot',
      imageAlt: t('portfolio.projectSwipeShotAlt'),
    },
  ]

  const preparedProjects = projects.map(project => {
    if (!project.scrollable || !project.imageWidth || !project.imageHeight) {
      return project
    }

    return {
      ...project,
      imageSections: createPortfolioImageSections(project.image, project.imageWidth, project.imageHeight),
    }
  })

  return (
    <main className={styles.main}>
      <MarketingHero compact variant="portfolio" eyebrow={t('portfolio.eyebrow')} title={t('portfolio.title')} description={t('portfolio.description')} actionLabel="" />
      <PortfolioCarousel
        projects={preparedProjects}
        heading={t('portfolio.sectionTitle')}
        actionLabel={t('portfolio.projectCta')}
        previousLabel={t('portfolio.previousProject')}
        nextLabel={t('portfolio.nextProject')}
        selectProjectLabel={t('portfolio.selectProject')}
        scrollHintLabel={t('portfolio.scrollHint')}
        liveSiteLabel={t('portfolio.liveSiteLabel')}
        liveSitePlaceholderLabel={t('portfolio.liveSitePlaceholder')}
        liveSiteInactiveLabel={t('portfolio.liveSiteInactive')}
        projectDetailsLabel={t('portfolio.projectDetailsLabel')}
        closeProjectDetailsLabel={t('portfolio.closeProjectDetails')}
        projectDetailsContextLabel={t('portfolio.projectDetailsContext')}
        projectDetailsSolutionLabel={t('portfolio.projectDetailsSolution')}
        projectDetailsResultLabel={t('portfolio.projectDetailsResult')}
        projectDetailsTypeLabel={t('portfolio.projectDetailsType')}
        projectDetailsPlatformLabel={t('portfolio.projectDetailsPlatform')}
        projectDetailsRoleLabel={t('portfolio.projectDetailsRole')}
        projectDetailsRoleValue={t('portfolio.projectDetailsRoleValue')}
        projectDetailsPlatforms={{
          sites: t('portfolio.projectDetailsPlatformWeb'),
          crm: t('portfolio.projectDetailsPlatformWeb'),
          mobile: t('portfolio.projectDetailsPlatformMobile'),
        }}
        projectDetailsFallbacks={{
          sites: {
            solution: t('portfolio.projectDetailsFallbackSitesSolution'),
            result: t('portfolio.projectDetailsFallbackSitesResult'),
          },
          crm: {
            solution: t('portfolio.projectDetailsFallbackCrmSolution'),
            result: t('portfolio.projectDetailsFallbackCrmResult'),
          },
          mobile: {
            solution: t('portfolio.projectDetailsFallbackMobileSolution'),
            result: t('portfolio.projectDetailsFallbackMobileResult'),
          },
        }}
        categoryOptions={[
          { id: 'sites' satisfies PortfolioCategory, label: t('portfolio.categorySites') },
          { id: 'crm' satisfies PortfolioCategory, label: t('portfolio.categoryCrm') },
          { id: 'mobile' satisfies PortfolioCategory, label: t('portfolio.categoryMobile') },
        ]}
      />
      <PortfolioCta />
    </main>
  )
}
