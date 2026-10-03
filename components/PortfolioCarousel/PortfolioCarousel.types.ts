import type { FeatureItem, PortfolioCategory } from '../../lib/page-data'

export type PortfolioCarouselProps = {
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
