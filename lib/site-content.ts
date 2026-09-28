export type SiteRouteKind = 'page'

export type SiteRoute = {
  path: string
  kind: SiteRouteKind
  title: string
  description: string
}

export const pageRoutes: SiteRoute[] = [
  {
    path: '/',
    kind: 'page',
    title: 'Головна — цифрові продукти та розробка',
    description: 'Сайти, CRM-системи та мобільні застосунки для реальних бізнес-завдань.',
  },
  {
    path: '/portfolio',
    kind: 'page',
    title: 'Портфоліо — цифрові продукти та розробка',
    description: 'Вибрані сайти, CRM-системи та мобільні застосунки.',
  },
  {
    path: '/about',
    kind: 'page',
    title: 'Про мене — full-stack розробник',
    description: 'Створюю сайти, CRM-системи та мобільні застосунки від ідеї до запуску.',
  },
]
