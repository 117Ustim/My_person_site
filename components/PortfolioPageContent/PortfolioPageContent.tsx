'use client'

import { useI18n } from '../../lib/i18n'
import { createPortfolioProjects, preparePortfolioProjects } from '../../lib/portfolio-projects'
import MarketingHero from '../MarketingHero/MarketingHero'
import PortfolioCarousel from '../PortfolioCarousel/PortfolioCarousel'
import PortfolioCta from '../PortfolioCta/PortfolioCta'
import styles from '../MarketingPages/MarketingPages.module.css'

export default function PortfolioPageContent() {
  const { locale, t } = useI18n()
  const projects = preparePortfolioProjects(createPortfolioProjects(locale, t))

  return (
    <main className={styles.main}>
      <MarketingHero compact variant="portfolio" eyebrow={t('portfolio.eyebrow')} title={t('portfolio.title')} description={t('portfolio.description')} actionLabel="" />
      <PortfolioCarousel
        projects={projects}
        heading={t('portfolio.sectionTitle')}
        actionLabel={t('portfolio.projectCta')}
        previousLabel={t('portfolio.previousProject')}
        nextLabel={t('portfolio.nextProject')}
        selectProjectLabel={t('portfolio.selectProject')}
        scrollHintLabel={t('portfolio.scrollHint')}
        liveSiteLabel={t('portfolio.liveSiteLabel')}
        appStoreLabel={t('portfolio.appStoreLabel')}
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
          { id: 'sites', label: t('portfolio.categorySites') },
          { id: 'crm', label: t('portfolio.categoryCrm') },
          { id: 'mobile', label: t('portfolio.categoryMobile') },
        ]}
      />
      <PortfolioCta />
    </main>
  )
}
