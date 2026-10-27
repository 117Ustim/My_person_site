import type { Locale } from './locale-routing'

export type ServiceSlug = 'crm-development'

export type ServiceContent = {
  slug: ServiceSlug
  path: string
  locale: Locale
  breadcrumbHome: string
  breadcrumbCurrent: string
  eyebrow: string
  title: string
  description: string
  introTitle: string
  intro: string
  problemsTitle: string
  problems: Array<{ title: string; description: string }>
  capabilitiesTitle: string
  capabilities: string[]
  processTitle: string
  process: Array<{ title: string; description: string }>
  casesTitle: string
  casesDescription: string
  cases: Array<{ title: string; description: string; project: string }>
  faqTitle: string
  faq: Array<{ question: string; answer: string }>
  ctaTitle: string
  ctaDescription: string
  ctaAction: string
}

const basePath = '/services/crm-development'

const content: Record<Locale, ServiceContent> = {
  uk: {
    slug: 'crm-development',
    path: basePath,
    locale: 'uk',
    breadcrumbHome: 'Головна',
    breadcrumbCurrent: 'Розробка CRM-систем',
    eyebrow: 'CRM ДЛЯ БІЗНЕСУ',
    title: 'Розробка CRM-систем під ваші бізнес-процеси',
    description: 'Проєктую та розробляю CRM-системи, які об’єднують клієнтів, заявки, записи, оплати, ролі та звіти в одному робочому просторі.',
    introTitle: 'CRM, яка працює за логікою вашої команди',
    intro: 'Готова CRM не завжди відповідає тому, як насправді працює бізнес. Я розбираюся в процесах, проєктую зрозумілий інтерфейс і створюю систему під конкретні сценарії команди — від першої заявки до звіту та повторного контакту з клієнтом.',
    problemsTitle: 'Що допомагає вирішити CRM',
    problems: [
      { title: 'Дані в таблицях і чатах', description: 'Збираємо клієнтів, історію взаємодії та документи в одному доступному просторі.' },
      { title: 'Заявки губляться', description: 'Фіксуємо ліди, статуси, відповідальних і наступні дії, щоб команда бачила повний процес.' },
      { title: 'Робота залежить від ручних дій', description: 'Автоматизуємо повторювані операції, нагадування, повідомлення та підготовку звітів.' },
    ],
    capabilitiesTitle: 'Функції під вашу задачу',
    capabilities: [
      'Клієнти, контакти та історія взаємодії',
      'Ліди, воронка продажів і статуси',
      'Записи, замовлення та робочі календарі',
      'Ролі, права доступу та командна робота',
      'Оплати, звіти та операційна аналітика',
      'Інтеграції, сповіщення та API',
    ],
    processTitle: 'Як проходить розробка',
    process: [
      { title: 'Дослідження', description: 'Фіксуємо бізнес-цілі, ролі користувачів, дані та критичні сценарії.' },
      { title: 'Структура', description: 'Проєктуємо навігацію, сутності, права доступу та ключові екрани.' },
      { title: 'Розробка', description: 'Збираємо frontend, backend, базу даних та інтеграції в узгоджених ітераціях.' },
      { title: 'Перевірка', description: 'Тестуємо сценарії, ролі та дані перед передачею системи команді.' },
      { title: 'Запуск', description: 'Розгортаємо продукт, передаємо доступи та за потреби продовжуємо підтримку.' },
    ],
    casesTitle: 'CRM-проєкти в портфоліо',
    casesDescription: 'Подивіться, як CRM допомагає організувати роботу ветеринарної клініки, автосервісу та приватного спеціаліста.',
    cases: [
      { title: 'VetScanCT', description: 'Клієнти, тварини, прийоми, оплати та ролі працівників ветеринарної клініки.', project: 'vetscanct' },
      { title: 'Auto Service CRM', description: 'Замовлення-наряди, механіки, запчастини, склад і виплати автосервісу.', project: 'auto-service-crm' },
      { title: 'Beauty Master CRM', description: 'Записи клієнтів, календар, нагадування, оплати та історія візитів.', project: 'beauty-master-crm' },
    ],
    faqTitle: 'Поширені запитання',
    faq: [
      { question: 'Для якого бізнесу підходить кастомна CRM?', answer: 'Для команд, у яких є власні процеси, ролі, правила роботи з клієнтами або потреба об’єднати кілька інструментів в одній системі.' },
      { question: 'Чи можна інтегрувати CRM з іншими сервісами?', answer: 'Так, якщо сервіс має API або інший надійний спосіб обміну даними. Інтеграції визначаємо після аналізу процесів і технічних обмежень.' },
      { question: 'Скільки часу займає розробка?', answer: 'Термін залежить від кількості ролей, модулів, інтеграцій і глибини автоматизації. Після уточнення задачі можна скласти реалістичний план робіт.' },
      { question: 'Чи можна почати з MVP?', answer: 'Так. Спочатку визначаємо найважливіші сценарії, запускаємо першу версію і залишаємо основу для подальшого розвитку системи.' },
    ],
    ctaTitle: 'Є процес, який час зібрати в одну систему?',
    ctaDescription: 'Розкажіть, як зараз працює ваша команда. Разом визначимо, якою має бути CRM і з чого краще почати.',
    ctaAction: 'Обговорити CRM-проєкт',
  },
  ru: {
    slug: 'crm-development',
    path: basePath,
    locale: 'ru',
    breadcrumbHome: 'Главная',
    breadcrumbCurrent: 'Разработка CRM-систем',
    eyebrow: 'CRM ДЛЯ БИЗНЕСА',
    title: 'Разработка CRM-систем под ваши бизнес-процессы',
    description: 'Проектирую и разрабатываю CRM-системы, которые объединяют клиентов, заявки, записи, оплаты, роли и отчёты в одном рабочем пространстве.',
    introTitle: 'CRM, которая работает по логике вашей команды',
    intro: 'Готовая CRM не всегда подходит под то, как действительно работает бизнес. Я разбираюсь в процессах, проектирую понятный интерфейс и создаю систему под конкретные сценарии команды — от первой заявки до отчёта и повторного контакта с клиентом.',
    problemsTitle: 'Какие задачи помогает решить CRM',
    problems: [
      { title: 'Данные в таблицах и чатах', description: 'Собираем клиентов, историю взаимодействия и документы в одном доступном пространстве.' },
      { title: 'Заявки теряются', description: 'Фиксируем лиды, статусы, ответственных и следующие действия, чтобы команда видела весь процесс.' },
      { title: 'Работа зависит от ручных действий', description: 'Автоматизируем повторяющиеся операции, напоминания, уведомления и подготовку отчётов.' },
    ],
    capabilitiesTitle: 'Функции под вашу задачу',
    capabilities: [
      'Клиенты, контакты и история взаимодействия',
      'Лиды, воронка продаж и статусы',
      'Записи, заказы и рабочие календари',
      'Роли, права доступа и командная работа',
      'Оплаты, отчёты и операционная аналитика',
      'Интеграции, уведомления и API',
    ],
    processTitle: 'Как проходит разработка',
    process: [
      { title: 'Исследование', description: 'Фиксируем бизнес-цели, роли пользователей, данные и критические сценарии.' },
      { title: 'Структура', description: 'Проектируем навигацию, сущности, права доступа и ключевые экраны.' },
      { title: 'Разработка', description: 'Собираем frontend, backend, базу данных и интеграции согласованными итерациями.' },
      { title: 'Проверка', description: 'Тестируем сценарии, роли и данные перед передачей системы команде.' },
      { title: 'Запуск', description: 'Разворачиваем продукт, передаём доступы и при необходимости продолжаем поддержку.' },
    ],
    casesTitle: 'CRM-проекты в портфолио',
    casesDescription: 'Посмотрите, как CRM помогает организовать работу ветеринарной клиники, автосервиса и частного специалиста.',
    cases: [
      { title: 'VetScanCT', description: 'Клиенты, животные, приёмы, оплаты и роли сотрудников ветеринарной клиники.', project: 'vetscanct' },
      { title: 'Auto Service CRM', description: 'Заказ-наряды, механики, запчасти, склад и выплаты автосервиса.', project: 'auto-service-crm' },
      { title: 'Beauty Master CRM', description: 'Записи клиентов, календарь, напоминания, оплаты и история визитов.', project: 'beauty-master-crm' },
    ],
    faqTitle: 'Частые вопросы',
    faq: [
      { question: 'Для какого бизнеса подходит кастомная CRM?', answer: 'Для команд со своими процессами, ролями, правилами работы с клиентами или потребностью объединить несколько инструментов в одной системе.' },
      { question: 'Можно ли интегрировать CRM с другими сервисами?', answer: 'Да, если сервис имеет API или другой надёжный способ обмена данными. Интеграции определяем после анализа процессов и технических ограничений.' },
      { question: 'Сколько времени занимает разработка?', answer: 'Срок зависит от количества ролей, модулей, интеграций и глубины автоматизации. После уточнения задачи можно составить реалистичный план работ.' },
      { question: 'Можно начать с MVP?', answer: 'Да. Сначала определяем самые важные сценарии, запускаем первую версию и оставляем основу для дальнейшего развития системы.' },
    ],
    ctaTitle: 'Есть процесс, который пора собрать в одну систему?',
    ctaDescription: 'Расскажите, как сейчас работает ваша команда. Вместе определим, какой должна быть CRM и с чего лучше начать.',
    ctaAction: 'Обсудить CRM-проект',
  },
  en: {
    slug: 'crm-development',
    path: basePath,
    locale: 'en',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'CRM development',
    eyebrow: 'CRM FOR BUSINESS',
    title: 'Custom CRM development for your business processes',
    description: 'I design and develop CRM systems that bring customers, leads, appointments, payments, roles, and reporting into one workspace.',
    introTitle: 'A CRM built around how your team works',
    intro: 'Off-the-shelf CRM does not always match the way a business actually operates. I map the processes, design a clear interface, and build a system around the team’s real scenarios — from the first lead to reporting and the next customer conversation.',
    problemsTitle: 'What a CRM can help solve',
    problems: [
      { title: 'Data across spreadsheets and chats', description: 'Bring customers, interaction history, and documents into one accessible workspace.' },
      { title: 'Leads getting lost', description: 'Track leads, statuses, owners, and next actions so the team can see the full process.' },
      { title: 'Too many manual steps', description: 'Automate recurring operations, reminders, notifications, and reporting workflows.' },
    ],
    capabilitiesTitle: 'Capabilities shaped around your needs',
    capabilities: [
      'Customers, contacts, and interaction history',
      'Leads, sales pipelines, and statuses',
      'Appointments, orders, and work calendars',
      'Roles, permissions, and team workflows',
      'Payments, reports, and operational analytics',
      'Integrations, notifications, and APIs',
    ],
    processTitle: 'How the development works',
    process: [
      { title: 'Discovery', description: 'We define business goals, user roles, data, and the critical workflows.' },
      { title: 'Structure', description: 'We design navigation, entities, permissions, and the core screens.' },
      { title: 'Development', description: 'Frontend, backend, database, and integrations are built in agreed iterations.' },
      { title: 'Validation', description: 'We test workflows, roles, and data before handing the system to the team.' },
      { title: 'Launch', description: 'We deploy the product, transfer access, and continue support when needed.' },
    ],
    casesTitle: 'CRM projects in the portfolio',
    casesDescription: 'See how CRM systems organise work for a veterinary clinic, an auto service, and an independent specialist.',
    cases: [
      { title: 'VetScanCT', description: 'Clients, animals, appointments, payments, and staff roles for a veterinary clinic.', project: 'vetscanct' },
      { title: 'Auto Service CRM', description: 'Work orders, mechanics, parts, inventory, and payouts for an auto service.', project: 'auto-service-crm' },
      { title: 'Beauty Master CRM', description: 'Client bookings, calendar, reminders, payments, and visit history.', project: 'beauty-master-crm' },
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { question: 'What kind of business needs a custom CRM?', answer: 'Teams with their own processes, roles, customer workflows, or a need to bring several tools into one system.' },
      { question: 'Can a CRM integrate with other services?', answer: 'Yes, when a service provides an API or another reliable data exchange method. Integrations are defined after reviewing the workflow and technical constraints.' },
      { question: 'How long does development take?', answer: 'The timeline depends on the number of roles, modules, integrations, and the depth of automation. A realistic plan follows the initial requirements review.' },
      { question: 'Can we start with an MVP?', answer: 'Yes. We define the most important workflows, launch the first version, and keep a foundation for future product growth.' },
    ],
    ctaTitle: 'Is there a process your team should bring into one system?',
    ctaDescription: 'Tell me how your team works today. We will define what the CRM should do and where to start.',
    ctaAction: 'Discuss a CRM project',
  },
}

export function getServiceContent(locale: Locale, slug: ServiceSlug): ServiceContent {
  const service = content[locale]

  if (service.slug !== slug) {
    throw new Error(`Unknown service: ${slug}`)
  }

  return service
}
