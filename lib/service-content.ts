import type { Locale } from './locale-routing'

export type ServiceSlug = 'crm-development' | 'web-development'

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

const content: Record<Locale, Record<ServiceSlug, ServiceContent>> = {
  uk: {
    'crm-development': {
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
    'web-development': {
    slug: 'web-development',
    path: '/services/web-development',
    locale: 'uk',
    breadcrumbHome: 'Головна',
    breadcrumbCurrent: 'Розробка сайтів',
    eyebrow: 'ВЕБРОЗРОБКА ДЛЯ БІЗНЕСУ',
    title: 'Розробка сайтів, які допомагають бізнесу зростати',
    description: 'Створюю корпоративні сайти, лендинги та вебплатформи з продуманою структурою, адаптивним інтерфейсом і зрозумілим шляхом до цільової дії.',
    introTitle: 'Сайт як робочий інструмент бізнесу',
    intro: 'Хороший сайт не просто показує інформацію. Він допомагає пояснити цінність продукту, відповісти на запитання клієнта та привести його до потрібної дії. Я поєдную структуру, дизайн і технічну реалізацію, щоб сайт залишався зрозумілим для людей і зручним для розвитку команди.',
    problemsTitle: 'Що вирішує продуманий сайт',
    problems: [
      { title: 'Відвідувачі не розуміють пропозицію', description: 'Вибудовуємо структуру та повідомлення так, щоб користувач швидко зрозумів продукт, послугу й наступний крок.' },
      { title: 'Сайт не приводить до дії', description: 'Проєктуємо сценарії для заявки, дзвінка, покупки, запису або іншої важливої для бізнесу дії.' },
      { title: 'Контент складно підтримувати', description: 'Створюємо зрозумілу основу, яку можна розвивати, доповнювати та підключати до потрібних сервісів.' },
    ],
    capabilitiesTitle: 'Що може входити в сайт',
    capabilities: [
      'Структура сторінок і користувацькі сценарії',
      'UX/UI-дизайн та адаптивний інтерфейс',
      'Лендинги та корпоративні сайти',
      'Каталоги, фільтри та презентація продуктів',
      'Форми заявок, інтеграції та API',
      'Frontend, backend, CMS і запуск',
    ],
    processTitle: 'Як проходить розробка сайту',
    process: [
      { title: 'Задача', description: 'Визначаємо аудиторію, цілі сайту, пропозицію та потрібну цільову дію.' },
      { title: 'Структура', description: 'Збираємо карту сторінок, контентні блоки, навігацію та логіку переходів.' },
      { title: 'Дизайн', description: 'Формуємо візуальну систему, прототипи та адаптивні сценарії для різних екранів.' },
      { title: 'Розробка', description: 'Перетворюємо дизайн на швидкий сайт, підключаємо дані, форми та інтеграції.' },
      { title: 'Запуск', description: 'Перевіряємо сторінки, адаптивність, SEO-основу та розгортаємо сайт.' },
    ],
    casesTitle: 'Сайти в портфоліо',
    casesDescription: 'Подивіться, як різні задачі бізнесу вирішуються через структуру, дизайн і технічну реалізацію сайту.',
    cases: [
      { title: 'VetScanCT', description: 'Сайт діагностичного центру з послугами, цінами, FAQ та формою заявки.', project: 'vetscanct-site' },
      { title: 'Luxury Travel', description: 'Преміальний сайт travel-агенції з готовими маршрутами та індивідуальним підбором.', project: 'luxury-travel' },
      { title: 'IDENTO', description: 'Сайт міжнародної рекрутингової агенції для кандидатів і бізнесу.', project: 'idento' },
    ],
    faqTitle: 'Поширені запитання',
    faq: [
      { question: 'Який сайт можна розробити?', answer: 'Корпоративний сайт, лендинг, каталог, презентаційний сайт бренду або складнішу вебплатформу — залежно від задачі та сценаріїв користувачів.' },
      { question: 'Чи допоможете зі структурою та контентом?', answer: 'Так. На старті визначаємо аудиторію, пропозицію, сторінки та логіку подачі інформації. Це допомагає не перетворити сайт на набір випадкових блоків.' },
      { question: 'Чи буде сайт адаптивним?', answer: 'Так, інтерфейс проєктується для різних розмірів екрана, а ключові сценарії перевіряються на мобільних і desktop-пристроях.' },
      { question: 'Чи можна підключити форму або CRM?', answer: 'Так, сайт можна поєднати з CRM, email, Telegram, платіжними сервісами та іншими системами, якщо це відповідає задачі.' },
    ],
    ctaTitle: 'Є сайт, який потрібно створити або перезапустити?',
    ctaDescription: 'Розкажіть про бізнес і ціль сайту. Разом визначимо структуру, потрібні функції та реалістичний план запуску.',
      ctaAction: 'Обговорити розробку сайту',
    },
  },
  ru: {
    'crm-development': {
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
    'web-development': {
    slug: 'web-development',
    path: '/services/web-development',
    locale: 'ru',
    breadcrumbHome: 'Главная',
    breadcrumbCurrent: 'Разработка сайтов',
    eyebrow: 'ВЕБ-РАЗРАБОТКА ДЛЯ БИЗНЕСА',
    title: 'Разработка сайтов, которые помогают бизнесу расти',
    description: 'Создаю корпоративные сайты, лендинги и веб-платформы с продуманной структурой, адаптивным интерфейсом и понятным путём к целевому действию.',
    introTitle: 'Сайт как рабочий инструмент бизнеса',
    intro: 'Хороший сайт не просто показывает информацию. Он помогает объяснить ценность продукта, ответить на вопросы клиента и привести его к нужному действию. Я объединяю структуру, дизайн и техническую реализацию, чтобы сайт оставался понятным для людей и удобным для развития команды.',
    problemsTitle: 'Что решает продуманный сайт',
    problems: [
      { title: 'Посетители не понимают предложение', description: 'Выстраиваем структуру и сообщения так, чтобы пользователь быстро понял продукт, услугу и следующий шаг.' },
      { title: 'Сайт не приводит к действию', description: 'Проектируем сценарии для заявки, звонка, покупки, записи или другого важного для бизнеса действия.' },
      { title: 'Контент сложно поддерживать', description: 'Создаём понятную основу, которую можно развивать, дополнять и подключать к нужным сервисам.' },
    ],
    capabilitiesTitle: 'Что может входить в сайт',
    capabilities: [
      'Структура страниц и пользовательские сценарии',
      'UX/UI-дизайн и адаптивный интерфейс',
      'Лендинги и корпоративные сайты',
      'Каталоги, фильтры и презентация продуктов',
      'Формы заявок, интеграции и API',
      'Frontend, backend, CMS и запуск',
    ],
    processTitle: 'Как проходит разработка сайта',
    process: [
      { title: 'Задача', description: 'Определяем аудиторию, цели сайта, предложение и нужное целевое действие.' },
      { title: 'Структура', description: 'Собираем карту страниц, контентные блоки, навигацию и логику переходов.' },
      { title: 'Дизайн', description: 'Формируем визуальную систему, прототипы и адаптивные сценарии для разных экранов.' },
      { title: 'Разработка', description: 'Превращаем дизайн в быстрый сайт, подключаем данные, формы и интеграции.' },
      { title: 'Запуск', description: 'Проверяем страницы, адаптивность, SEO-основу и разворачиваем сайт.' },
    ],
    casesTitle: 'Сайты в портфолио',
    casesDescription: 'Посмотрите, как разные задачи бизнеса решаются через структуру, дизайн и техническую реализацию сайта.',
    cases: [
      { title: 'VetScanCT', description: 'Сайт диагностического центра с услугами, ценами, FAQ и формой заявки.', project: 'vetscanct-site' },
      { title: 'Luxury Travel', description: 'Премиальный сайт travel-агентства с готовыми маршрутами и индивидуальным подбором.', project: 'luxury-travel' },
      { title: 'IDENTO', description: 'Сайт международного рекрутингового агентства для кандидатов и бизнеса.', project: 'idento' },
    ],
    faqTitle: 'Частые вопросы',
    faq: [
      { question: 'Какой сайт можно разработать?', answer: 'Корпоративный сайт, лендинг, каталог, презентационный сайт бренда или более сложную веб-платформу — в зависимости от задачи и пользовательских сценариев.' },
      { question: 'Поможете со структурой и контентом?', answer: 'Да. В начале определяем аудиторию, предложение, страницы и логику подачи информации. Это помогает не превращать сайт в набор случайных блоков.' },
      { question: 'Сайт будет адаптивным?', answer: 'Да, интерфейс проектируется для разных размеров экрана, а ключевые сценарии проверяются на мобильных и desktop-устройствах.' },
      { question: 'Можно подключить форму или CRM?', answer: 'Да, сайт можно связать с CRM, email, Telegram, платёжными сервисами и другими системами, если это соответствует задаче.' },
    ],
    ctaTitle: 'Есть сайт, который нужно создать или перезапустить?',
    ctaDescription: 'Расскажите о бизнесе и цели сайта. Вместе определим структуру, нужные функции и реалистичный план запуска.',
      ctaAction: 'Обсудить разработку сайта',
    },
  },
  en: {
    'crm-development': {
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
    'web-development': {
    slug: 'web-development',
    path: '/services/web-development',
    locale: 'en',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Website development',
    eyebrow: 'WEB DEVELOPMENT FOR BUSINESS',
    title: 'Website development that helps your business grow',
    description: 'I create corporate websites, landing pages, and web platforms with clear structure, responsive interfaces, and a focused path to the next action.',
    introTitle: 'A website as a working business tool',
    intro: 'A good website does more than present information. It explains the value of a product, answers customer questions, and guides people towards the right action. I combine structure, design, and engineering so the website stays clear for people and practical for the team to develop.',
    problemsTitle: 'What a well-designed website solves',
    problems: [
      { title: 'Visitors do not understand the offer', description: 'We build the structure and messaging so users can quickly understand the product, service, and next step.' },
      { title: 'The website does not drive action', description: 'We design flows for a lead, call, purchase, booking, or another action that matters to the business.' },
      { title: 'Content is difficult to maintain', description: 'We create a clear foundation that can grow, be extended, and connect to the services your team needs.' },
    ],
    capabilitiesTitle: 'What the website can include',
    capabilities: [
      'Page structure and user scenarios',
      'UX/UI design and responsive interface',
      'Landing pages and corporate websites',
      'Catalogues, filters, and product presentation',
      'Lead forms, integrations, and APIs',
      'Frontend, backend, CMS, and launch',
    ],
    processTitle: 'How website development works',
    process: [
      { title: 'The goal', description: 'We define the audience, website goals, offer, and the action the user should take.' },
      { title: 'The structure', description: 'We map pages, content blocks, navigation, and the logic behind the user journey.' },
      { title: 'The design', description: 'We create the visual system, prototypes, and responsive scenarios for different screens.' },
      { title: 'The build', description: 'We turn the design into a fast website and connect data, forms, and integrations.' },
      { title: 'The launch', description: 'We check pages, responsiveness, the SEO foundation, and deploy the website.' },
    ],
    casesTitle: 'Websites in the portfolio',
    casesDescription: 'See how different business goals are solved through website structure, design, and engineering.',
    cases: [
      { title: 'VetScanCT', description: 'A diagnostic centre website with services, pricing, FAQ, and a request form.', project: 'vetscanct-site' },
      { title: 'Luxury Travel', description: 'A premium travel agency website with ready-made routes and individual trip selection.', project: 'luxury-travel' },
      { title: 'IDENTO', description: 'An international recruitment agency website for candidates and businesses.', project: 'idento' },
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { question: 'What kind of website can you build?', answer: 'A corporate website, landing page, catalogue, product presentation site, or a more complex web platform, depending on the goals and user scenarios.' },
      { question: 'Can you help with structure and content?', answer: 'Yes. We define the audience, offer, pages, and information flow at the start. This keeps the website from becoming a collection of disconnected blocks.' },
      { question: 'Will the website be responsive?', answer: 'Yes. The interface is designed for different screen sizes, and key user scenarios are checked on mobile and desktop devices.' },
      { question: 'Can the website connect to a form or CRM?', answer: 'Yes. A website can connect to a CRM, email, Telegram, payment services, and other systems when that supports the business goal.' },
    ],
    ctaTitle: 'Do you need to create or relaunch a website?',
    ctaDescription: 'Tell me about the business and the website goal. We will define the structure, required features, and a realistic launch plan.',
      ctaAction: 'Discuss website development',
    },
  },
}

export function getServiceContent(locale: Locale, slug: ServiceSlug): ServiceContent {
  const service = content[locale][slug]

  if (!service) {
    throw new Error(`Unknown service: ${slug}`)
  }

  return service
}
