import type { Metadata } from 'next'
import PortfolioPageContent from '../../components/PortfolioPageContent/PortfolioPageContent'
import SiteShell from '../../components/SiteShell/SiteShell'

export const metadata: Metadata = {
  title: 'Портфоліо — цифрові продукти та розробка',
  description: 'Вибрані сайти, CRM-системи та мобільні застосунки.',
  alternates: { canonical: '/portfolio' },
}

export default function PortfolioPage() {
  return (
    <SiteShell>
      <PortfolioPageContent />
    </SiteShell>
  )
}
