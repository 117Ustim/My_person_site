import type { Metadata } from 'next'
import AboutLongform from '../../components/AboutLongform/AboutLongform'
import SiteShell from '../../components/SiteShell/SiteShell'

export const metadata: Metadata = {
  title: 'Про мене — full-stack розробник',
  description: 'Створюю сайти, CRM-системи та мобільні застосунки від ідеї до запуску.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutLongform />
    </SiteShell>
  )
}
