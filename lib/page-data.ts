export const asset = (file: string) => `/site-assets/assets/${file}`

export type PortfolioCategory = 'sites' | 'crm' | 'mobile'

export type PortfolioImageSection = {
  src: string
  width: number
  height: number
}

export type FeatureItem = {
  title: string
  description: string
  details?: string
  image: string
  liveUrl?: string
  previewImage?: string
  previewImageMobile?: string
  scrollable?: boolean
  imageWidth?: number
  imageHeight?: number
  imageSections?: ReadonlyArray<PortfolioImageSection>
  imageFit?: 'cover' | 'contain'
  imagePosition?: 'center' | 'top'
  imageSized?: boolean
  frameTone?: 'default' | 'coral'
  showPortfolioCard?: boolean
  category?: PortfolioCategory
  portfolioProject?: string
  imageAlt: string
}

export type CapabilityItem = {
  number: string
  category: string
  title: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: 'center' | 'top'
  imageDimmed?: 'light' | 'medium' | 'strong'
  technologies: string[]
}

export const homeCapabilities: CapabilityItem[] = [
  {
    number: '01',
    category: 'Веб',
    title: 'Вебсайти та вебзастосунки',
    description: 'Сучасні сайти й цифрові продукти для бізнесу, експертів і персональних брендів.',
    image: '/assets/portfolio/luxury-travel.png',
    imageAlt: 'Преміумсайт туристичної агенції Luxury Travel',
    imagePosition: 'top',
    imageDimmed: 'light',
    technologies: ['Next.js', 'React', 'TypeScript'],
  },
  {
    number: '02',
    category: 'CRM',
    title: 'CRM-системи та внутрішні кабінети',
    description: 'Цифрові інструменти для записів, клієнтів, оплат, задач і внутрішніх процесів.',
    image: '/assets/portfolio/beauty-master-crm.png',
    imageAlt: 'CRM для керування записами, клієнтами та оплатами',
    imageDimmed: 'medium',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Firebase'],
  },
  {
    number: '03',
    category: 'Mobile',
    title: 'Мобільні застосунки',
    description: 'Зручні мобільні продукти для iOS та Android із продуманим користувацьким досвідом.',
    image: '/assets/portfolio/fitness-mobile-app.png',
    imageAlt: 'Мобільний застосунок для тренерів і клієнтів',
    imagePosition: 'top',
    technologies: ['React Native', 'Swift', 'Firebase'],
  },
  {
    number: '04',
    category: 'Backend',
    title: 'Серверна частина та інфраструктура',
    description: 'API, бази даних, авторизація, деплой і стабільна робота цифрових продуктів.',
    image: '/assets/portfolio/docker-desktop.png',
    imageAlt: 'Docker Desktop для керування контейнерами та образами',
    imagePosition: 'top',
    imageDimmed: 'strong',
    technologies: ['Node.js', 'PostgreSQL', 'Firebase', 'GitHub', 'Docker'],
  },
]

export const homeTechnologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'React Native',
  'Swift',
  'Firebase',
  'PostgreSQL',
  'GitHub',
] as const
