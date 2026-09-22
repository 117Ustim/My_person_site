export type SiteRouteKind = 'page'

export type SiteRoute = {
  path: string
  kind: SiteRouteKind
  title: string
  description: string
}

export const integrationRoutes = [
  ['gmail-and-google-calendar', 'Gmail & Google Calendar'],
  ['outlook', 'Outlook'],
  ['intelliflo', 'Intelliflo'],
  ['salesforce', 'Salesforce'],
  ['onedrive', 'OneDrive'],
  ['sharepoint', 'SharePoint'],
  ['seven-im', '7IM'],
  ['abrdn-wrap', 'ABRDN Wrap'],
  ['abrdn-elevate', 'ABRDN Elevate'],
  ['aegon', 'Aegon'],
  ['aj-bell', 'AJ Bell'],
  ['aviva', 'Aviva'],
  ['brewin-dolphin', 'Brewin Dolphin'],
  ['canada-life', 'Canada Life'],
  ['cofunds', 'Cofunds'],
  ['fidelity', 'Fidelity'],
  ['host-capital', 'Host Capital'],
  ['james-hay', 'James Hay'],
  ['mg-wealth', 'M&G Wealth'],
  ['nucleus', 'Nucleus'],
  ['parmenion', 'Parmenion'],
  ['quilter', 'Quilter'],
  ['raymond-james', 'Raymond James'],
  ['ssc-hubwise', 'SS&C Hubwise'],
  ['scottish-widows', 'Scottish Widows'],
  ['transact', 'Transact'],
  ['wealthtime', 'Wealthtime'],
  ['wealthtime-classic', 'Wealthtime Classic'],
  ['standard-life', 'Standard Life'],
  ['royal-london', 'Royal London'],
  ['prudential', 'Prudential'],
  ['claude', 'Claude'],
] as const

export const siteRoutes: SiteRoute[] = [
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
    description: 'Вибрані сайти, CRM-системи, мобільні застосунки та backend-рішення.',
  },
  {
    path: '/what-we-offer/ai-crm-for-financial-advisors',
    kind: 'page',
    title: 'AI Practice Management for Financial Advisors — Obsidian',
    description: 'Client records, meeting notes, and tasks — captured automatically, searchable instantly.',
  },
  {
    path: '/what-we-offer/custody-and-execution',
    kind: 'page',
    title: 'Custody & Execution — Obsidian',
    description: 'Trade, rebalance, and custody — all in one place, with instant account opening.',
  },
  {
    path: '/whos-it-for/independent-firms',
    kind: 'page',
    title: 'Independent Firms — Obsidian',
    description: 'Spend less time on admin and more time delivering advice that matters.',
  },
  {
    path: '/whos-it-for/consolidators',
    kind: 'page',
    title: 'Consolidators — Obsidian',
    description: 'Unify firms, data, and controls to scale faster — without operational drag.',
  },
  {
    path: '/integrations',
    kind: 'page',
    title: 'Integrations — Obsidian',
    description: 'Connect Obsidian to the tools financial advisers already use every day.',
  },
  {
    path: '/security',
    kind: 'page',
    title: 'Security & Privacy — Obsidian',
    description: 'The most private AI for advisers.',
  },
  {
    path: '/pricing',
    kind: 'page',
    title: 'Pricing — Obsidian',
    description: 'Always free for advisers.',
  },
  {
    path: '/about',
    kind: 'page',
    title: 'Про мене — full-stack розробник',
    description: 'Створюю сайти, CRM-системи та мобільні застосунки від ідеї до запуску.',
  },
  {
    path: '/press/media-center',
    kind: 'page',
    title: 'Media Center — Obsidian',
    description: 'News, updates, and media resources from Obsidian.',
  },
  {
    path: '/legal',
    kind: 'page',
    title: 'Legal — Obsidian',
    description: 'Legal agreements, policies, and compliance information.',
  },
  {
    path: '/security/subprocessors',
    kind: 'page',
    title: 'Subprocessors — Obsidian',
    description: 'How Obsidian works with trusted subprocessors.',
  },
  {
    path: '/legal/cookie-policy',
    kind: 'page',
    title: 'Cookie Policy — Obsidian',
    description: 'How Obsidian uses cookies and similar technologies.',
  },
  ...integrationRoutes.map(([slug, name]) => ({
    path: `/integrations/${slug}`,
    kind: 'page' as const,
    title: `${name} Integration — Obsidian`,
    description: `Connect ${name} with Obsidian for a smoother advice workflow.`,
  })),
  {
    path: '/legal/privacy-policy',
    kind: 'page',
    title: 'Privacy Policy — Obsidian',
    description: 'Privacy policy for Obsidian. Learn how we collect, use, and protect your data.',
  },
  {
    path: '/legal/terms-of-service',
    kind: 'page',
    title: 'Terms of Service — Obsidian',
    description: 'Terms governing the use of Obsidian services.',
  },
]

export const pageRoutes = siteRoutes
export const dynamicRoutes = siteRoutes.filter(route => route.path !== '/')

export function getRouteByPath(path: string) {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '')
  return siteRoutes.find(route => route.path === normalizedPath)
}
