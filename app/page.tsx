import type { Metadata } from 'next'
import HomePageContent from '../components/HomePageContent/HomePageContent'
import SiteShell from '../components/SiteShell/SiteShell'

export const metadata: Metadata = {
  title: 'Головна',
  description: 'Сайти, CRM-системи та мобільні застосунки для реальних бізнес-завдань.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <SiteShell>
      <HomePageContent />
    </SiteShell>
  )
}
