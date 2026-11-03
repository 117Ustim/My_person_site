import type { Locale } from './locale-routing'

export const portfolioCaseSlugs = ['vetscanct', 'auto-service-crm'] as const

export type PortfolioCaseSlug = (typeof portfolioCaseSlugs)[number]

export type PortfolioCaseContent = {
  slug: PortfolioCaseSlug
  locale: Locale
  path: string
  metaTitle: string
  metaDescription: string
  breadcrumbHome: string
  breadcrumbCurrent: string
  eyebrow: string
  title: string
  description: string
  heroImage: string
  imageAlt: string
  detailsTitle: string
  details: string[]
  highlightsTitle: string
  highlights: string[]
  relatedServicePath: string
  relatedServiceLabel: string
  portfolioLabel: string
  ctaTitle: string
  ctaDescription: string
  ctaAction: string
}

const visuals = {
  vetscanct: {
    path: '/portfolio/vetscanct',
    heroImage: '/assets/portfolio/vetscanct-crm-preview-card.jpg',
    relatedServicePath: '/services/crm-development',
  },
  'auto-service-crm': {
    path: '/portfolio/auto-service-crm',
    heroImage: '/assets/portfolio/auto-service-crm-promo-uk-preview-card.jpg',
    relatedServicePath: '/services/crm-development',
  },
} as const

const content: Record<Locale, Record<PortfolioCaseSlug, PortfolioCaseContent>> = {
  uk: {
    vetscanct: {
      ...visuals.vetscanct,
      slug: 'vetscanct',
      locale: 'uk',
      metaTitle: 'VetScanCT: CRM для ветеринарної клініки | AU Studio',
      metaDescription: 'Кейс VetScanCT: CRM для ветеринарної клініки із записами, картками тварин, оплатами, SMS-нагадуваннями та ролями працівників.',
      breadcrumbHome: 'Головна',
      breadcrumbCurrent: 'VetScanCT',
      eyebrow: 'CRM-ПРОЄКТ',
      title: 'VetScanCT — CRM для ветеринарної клініки',
      description: 'Єдина система для клієнтів, тварин, прийомів, оплат, SMS-нагадувань і керування доступами працівників.',
      heroImage: visuals.vetscanct.heroImage,
      imageAlt: 'CRM VetScanCT для записів, пацієнтів, платежів і персоналу',
      detailsTitle: 'Задача та рішення',
      details: [
        'VetScanCT CRM об’єднує щоденну роботу ветеринарної клініки в одному інтерфейсі: клієнтів, тварин, прийоми, оплати та доступи працівників.',
        'Клініці була потрібна єдина CRM-система для керування клієнтами, тваринами, прийомами та оплатами. Один власник може мати кілька тварин, а для кожного пацієнта зберігаються порода, вік, щеплення, діагнози, призначене лікування, історія візитів і документи.',
        'Рецепціоніст або уповноважений працівник створює запис на прийом, призначає дату, час, лікаря та послугу. Усі записи відображаються в календарі з вільними часовими інтервалами.',
        'Після прийому працівник фіксує оплату, клієнти отримують SMS-сповіщення, а розділ партнерів допомагає враховувати направлених клієнтів і договірні відносини з організаціями.',
        'Директор контролює роботу клініки через звіти й налаштовує права доступу. CRM об’єднує дані власників і тварин, історію візитів, розклад, оплати та партнерські нарахування в одному місці.',
      ],
      highlightsTitle: 'Що реалізовано',
      highlights: [
        'Картки власників і тварин з історією лікування',
        'Календар прийомів із лікарями, послугами та вільними слотами',
        'Ролі працівників і права доступу',
        'Оплати, зміни, SMS-нагадування та звіти',
        'Партнерські направлення й автоматичні резервні копії',
      ],
      relatedServiceLabel: 'Розробка CRM-систем',
      portfolioLabel: 'Портфоліо',
      ctaTitle: 'Потрібна CRM під ваш процес?',
      ctaDescription: 'Розкажіть, які дані, ролі та операції потрібно об’єднати в одній системі.',
      ctaAction: 'Обговорити CRM-проєкт',
    },
    'auto-service-crm': {
      ...visuals['auto-service-crm'],
      slug: 'auto-service-crm',
      locale: 'uk',
      metaTitle: 'Auto Service CRM: CRM для автосервісу | AU Studio',
      metaDescription: 'Кейс Auto Service CRM: замовлення-наряди, механіки, запчастини, склад, ролі, історія ремонту та виплати в одній системі.',
      breadcrumbHome: 'Головна',
      breadcrumbCurrent: 'Auto Service CRM',
      eyebrow: 'CRM-ПРОЄКТ',
      title: 'Auto Service CRM — система для автосервісу',
      description: 'CRM для замовлень-нарядів, механіків, запчастин, складу, історії ремонту та виплат працівникам.',
      heroImage: visuals['auto-service-crm'].heroImage,
      imageAlt: 'Auto Service CRM для замовлень-нарядів, команди, складу та виплат',
      detailsTitle: 'Задача та рішення',
      details: [
        'Auto Service CRM об’єднує роботу автосервісу в одній системі: клієнти, автомобілі, замовлення-наряди, склад і виплати працівникам.',
        'Автосервісу потрібна була CRM-система для керування одним сервісом і чотирма ролями: адміністратором, менеджером, механіком та завідувачем складу. Для кожної ролі налаштовані окремі права доступу.',
        'У картці автомобіля зберігаються марка, модель, номер, пробіг, VIN, історія ремонтів, дати обслуговування та виконані роботи.',
        'Менеджер додає клієнта й автомобіль, фіксує проблему, пробіг і призначає механіка. Замовлення-наряд проходить етапи: нове, в роботі, очікування запчастин і завершено.',
        'Механік вносить виконані роботи та використані запчастини. Склад резервує і списує деталі, а керівник бачить завантаження, вартість робіт, залишки та виплати без окремих таблиць.',
      ],
      highlightsTitle: 'Що реалізовано',
      highlights: [
        'Чотири ролі з окремими правами доступу',
        'Картки автомобілів із VIN та історією ремонтів',
        'Замовлення-наряди зі статусами й призначенням механіків',
        'Облік робіт, запчастин, складу та знижок',
        'Розрахунок виплат механікам і операційні дані для керівника',
      ],
      relatedServiceLabel: 'Розробка CRM-систем',
      portfolioLabel: 'Портфоліо',
      ctaTitle: 'Потрібна система для операційної роботи?',
      ctaDescription: 'Розкажіть, як команда працює зараз. Разом визначимо ролі, дані та ключові етапи процесу.',
      ctaAction: 'Обговорити CRM-проєкт',
    },
  },
  ru: {
    vetscanct: {
      ...visuals.vetscanct,
      slug: 'vetscanct',
      locale: 'ru',
      metaTitle: 'VetScanCT: CRM для ветеринарной клиники | AU Studio',
      metaDescription: 'Кейс VetScanCT: CRM для ветеринарной клиники с записями, карточками животных, оплатами, SMS-напоминаниями и ролями сотрудников.',
      breadcrumbHome: 'Главная',
      breadcrumbCurrent: 'VetScanCT',
      eyebrow: 'CRM-ПРОЕКТ',
      title: 'VetScanCT — CRM для ветеринарной клиники',
      description: 'Единая система для клиентов, животных, приёмов, оплат, SMS-напоминаний и управления доступами сотрудников.',
      heroImage: visuals.vetscanct.heroImage,
      imageAlt: 'CRM VetScanCT для записей, пациентов, платежей и персонала',
      detailsTitle: 'Задача и решение',
      details: [
        'VetScanCT CRM объединяет ежедневную работу ветеринарной клиники в одном интерфейсе: клиентов, животных, приёмы, оплаты и доступы сотрудников.',
        'Клинике нужна была единая CRM-система для управления клиентами, животными, приёмами и оплатами. Один владелец может иметь несколько животных, а для каждого пациента хранятся порода, возраст, прививки, диагнозы, назначенное лечение, история визитов и документы.',
        'Рецепционист или уполномоченный сотрудник создаёт запись на приём, назначает дату, время, врача и услугу. Все записи отображаются в календаре со свободными временными интервалами.',
        'После приёма сотрудник фиксирует оплату, клиенты получают SMS-уведомления, а раздел партнёров помогает учитывать направленных клиентов и договорные отношения с организациями.',
        'Директор контролирует работу клиники через отчёты и настраивает права доступа. CRM объединяет данные владельцев и животных, историю визитов, расписание, оплаты и партнёрские начисления в одном месте.',
      ],
      highlightsTitle: 'Что реализовано',
      highlights: [
        'Карточки владельцев и животных с историей лечения',
        'Календарь приёмов с врачами, услугами и свободными слотами',
        'Роли сотрудников и права доступа',
        'Оплаты, смены, SMS-напоминания и отчёты',
        'Партнёрские направления и автоматические резервные копии',
      ],
      relatedServiceLabel: 'Разработка CRM-систем',
      portfolioLabel: 'Портфолио',
      ctaTitle: 'Нужна CRM под ваши процессы?',
      ctaDescription: 'Расскажите, какие данные, роли и операции нужно объединить в одной системе.',
      ctaAction: 'Обсудить CRM-проект',
    },
    'auto-service-crm': {
      ...visuals['auto-service-crm'],
      slug: 'auto-service-crm',
      locale: 'ru',
      metaTitle: 'Auto Service CRM: CRM для автосервиса | AU Studio',
      metaDescription: 'Кейс Auto Service CRM: заказ-наряды, механики, запчасти, склад, роли, история ремонта и выплаты в одной системе.',
      breadcrumbHome: 'Главная',
      breadcrumbCurrent: 'Auto Service CRM',
      eyebrow: 'CRM-ПРОЕКТ',
      title: 'Auto Service CRM — система для автосервиса',
      description: 'CRM для заказ-нарядов, механиков, запчастей, склада, истории ремонта и выплат сотрудникам.',
      heroImage: visuals['auto-service-crm'].heroImage,
      imageAlt: 'Auto Service CRM для заказ-нарядов, команды, склада и выплат',
      detailsTitle: 'Задача и решение',
      details: [
        'Auto Service CRM объединяет работу автосервиса в одной системе: клиентов, автомобили, заказ-наряды, склад и выплаты сотрудникам.',
        'Автосервису нужна была CRM-система для управления одним сервисом и четырьмя ролями: администратором, менеджером, механиком и заведующим складом. Для каждой роли настроены отдельные права доступа.',
        'В карточке автомобиля хранятся марка, модель, номер, пробег, VIN, история ремонтов, даты обслуживания и выполненные работы.',
        'Менеджер добавляет клиента и автомобиль, фиксирует проблему, пробег и назначает механика. Заказ-наряд проходит этапы: новый, в работе, ожидание запчастей и завершено.',
        'Механик вносит выполненные работы и использованные запчасти. Склад резервирует и списывает детали, а руководитель видит загрузку, стоимость работ, остатки и выплаты без отдельных таблиц.',
      ],
      highlightsTitle: 'Что реализовано',
      highlights: [
        'Четыре роли с отдельными правами доступа',
        'Карточки автомобилей с VIN и историей ремонтов',
        'Заказ-наряды со статусами и назначением механиков',
        'Учёт работ, запчастей, склада и скидок',
        'Расчёт выплат механикам и операционные данные для руководителя',
      ],
      relatedServiceLabel: 'Разработка CRM-систем',
      portfolioLabel: 'Портфолио',
      ctaTitle: 'Нужна система для операционной работы?',
      ctaDescription: 'Расскажите, как команда работает сейчас. Вместе определим роли, данные и ключевые этапы процесса.',
      ctaAction: 'Обсудить CRM-проект',
    },
  },
  en: {
    vetscanct: {
      ...visuals.vetscanct,
      slug: 'vetscanct',
      locale: 'en',
      metaTitle: 'VetScanCT: Veterinary Clinic CRM | AU Studio',
      metaDescription: 'VetScanCT case study: a veterinary clinic CRM with appointments, animal records, payments, SMS reminders, and staff roles.',
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'VetScanCT',
      eyebrow: 'CRM PROJECT',
      title: 'VetScanCT — CRM for a veterinary clinic',
      description: 'One system for clients, animals, appointments, payments, SMS reminders, and employee access management.',
      heroImage: visuals.vetscanct.heroImage,
      imageAlt: 'VetScanCT CRM for appointments, patient records, payments, and staff management',
      detailsTitle: 'The challenge and solution',
      details: [
        'VetScanCT CRM brings a veterinary clinic’s daily operations into one interface: clients, animals, appointments, payments, and employee access.',
        'The clinic needed one CRM system to manage clients, animals, appointments, and payments. One owner can have several animals, while each patient record stores the breed, age, vaccinations, diagnoses, prescribed treatment, visit history, and documents.',
        'A receptionist or authorised employee creates an appointment, selects the date, time, doctor, and service, and keeps all appointments visible in a calendar with available time slots.',
        'After the visit, an employee records the payment, clients receive SMS notifications, and the partner section tracks referred clients and contractual relationships with organisations.',
        'The director monitors the clinic through reports and manages employee access rights. The CRM brings owner and animal data, visit history, schedules, payments, and partner accruals into one workspace.',
      ],
      highlightsTitle: 'What was built',
      highlights: [
        'Owner and animal records with treatment history',
        'Appointment calendar with doctors, services, and available slots',
        'Employee roles and access permissions',
        'Payments, shifts, SMS reminders, and reports',
        'Partner referrals and automatic backups',
      ],
      relatedServiceLabel: 'Custom CRM development',
      portfolioLabel: 'Portfolio',
      ctaTitle: 'Need a CRM built around your workflow?',
      ctaDescription: 'Tell me which data, roles, and operations your team needs to bring into one system.',
      ctaAction: 'Discuss a CRM project',
    },
    'auto-service-crm': {
      ...visuals['auto-service-crm'],
      slug: 'auto-service-crm',
      locale: 'en',
      metaTitle: 'Auto Service CRM: Automotive Service System | AU Studio',
      metaDescription: 'Auto Service CRM case study: work orders, mechanics, parts, inventory, roles, repair history, and payouts in one system.',
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Auto Service CRM',
      eyebrow: 'CRM PROJECT',
      title: 'Auto Service CRM — system for an automotive service',
      description: 'A CRM for work orders, mechanics, parts, inventory, repair history, and employee payouts.',
      heroImage: visuals['auto-service-crm'].heroImage,
      imageAlt: 'Auto Service CRM for work orders, teams, inventory, and payouts',
      detailsTitle: 'The challenge and solution',
      details: [
        'Auto Service CRM brings an auto service’s work into one system: customers, vehicles, work orders, inventory, and employee payouts.',
        'The service needed a CRM for one workshop and four roles: administrator, manager, mechanic, and warehouse manager. Each role has separate access rights.',
        'A vehicle record stores the make, model, plate number, mileage, VIN, repair history, service dates, and completed work.',
        'The manager adds the customer and vehicle, records the problem and mileage, and assigns a mechanic. A work order moves through four stages: new, in progress, waiting for parts, and completed.',
        'The mechanic records completed work and used parts. The warehouse reserves and writes off parts, while management sees workload, labour costs, stock levels, and payouts without separate spreadsheets.',
      ],
      highlightsTitle: 'What was built',
      highlights: [
        'Four roles with separate access permissions',
        'Vehicle records with VIN and repair history',
        'Work orders with statuses and mechanic assignments',
        'Labour, parts, inventory, and discount tracking',
        'Mechanic payout calculations and operational reporting',
      ],
      relatedServiceLabel: 'Custom CRM development',
      portfolioLabel: 'Portfolio',
      ctaTitle: 'Need a system for operational work?',
      ctaDescription: 'Tell me how the team works today. We will define the roles, data, and key workflow stages.',
      ctaAction: 'Discuss a CRM project',
    },
  },
}

export function isPortfolioCaseSlug(value: string): value is PortfolioCaseSlug {
  return portfolioCaseSlugs.includes(value as PortfolioCaseSlug)
}

export function getPortfolioCaseContent(locale: Locale, slug: PortfolioCaseSlug): PortfolioCaseContent {
  return content[locale][slug]
}
