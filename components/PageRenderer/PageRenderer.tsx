import type { SiteRoute } from '../../lib/site-content'
import { getArticleDefinition, getIntegrationDefinition, integrationDefinitions } from '../../lib/page-data'
import ArticlePage from '../ArticlePage/ArticlePage'
import IntegrationDetail from '../IntegrationDetail/IntegrationDetail'
import IntegrationsPage from '../IntegrationsPage/IntegrationsPage'
import LegalIndex from '../LegalIndex/LegalIndex'
import { AboutPageContent, AiPracticePageContent, ConsolidatorsPageContent, CustodyPageContent, HomePageContent, IndependentFirmsPageContent, MediaPageContent, PortfolioPageContent, PricingPageContent, SecurityPageContent } from '../MarketingPages/MarketingPages'

type PageRendererProps = {
  route: SiteRoute
}

export default function PageRenderer({ route }: PageRendererProps) {
  if (route.path === '/') return <HomePageContent />
  if (route.path === '/portfolio') return <PortfolioPageContent />
  if (route.path === '/what-we-offer/ai-crm-for-financial-advisors') return <AiPracticePageContent />
  if (route.path === '/what-we-offer/custody-and-execution') return <CustodyPageContent />
  if (route.path === '/whos-it-for/independent-firms') return <IndependentFirmsPageContent />
  if (route.path === '/whos-it-for/consolidators') return <ConsolidatorsPageContent />
  if (route.path === '/integrations') return <IntegrationsPage integrations={integrationDefinitions} />
  if (route.path.startsWith('/integrations/')) {
    const slug = route.path.slice('/integrations/'.length)
    const integration = getIntegrationDefinition(slug)
    return integration ? <IntegrationDetail integration={integration} /> : null
  }
  if (route.path === '/security') return <SecurityPageContent />
  if (route.path === '/pricing') return <PricingPageContent />
  if (route.path === '/about') return <AboutPageContent />
  if (route.path === '/press/media-center') return <MediaPageContent />
  if (route.path === '/legal') return <LegalIndex />

  const article = getArticleDefinition(route.path)
  return article ? <ArticlePage article={article} /> : null
}
