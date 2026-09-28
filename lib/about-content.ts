import type { Locale } from './i18n'

type EducationEntry = {
  institution: string[]
  programme: string
  period: string
  paragraphs: string[]
}

type Certificate = {
  title: string
  description: string
}

type ProjectCategory = {
  title: string
  description: string
}

type StackGroup = {
  title: string
  value: string
}

export type AboutContent = {
  title: string
  intro: string[]
  introEmphasisIndex?: number
  projects: {
    title: string
    intro: string
    items: string[]
    categories?: ProjectCategory[]
    emphasisPhrase?: string
    paragraphs: string[]
  }
  process: {
    title: string
    paragraphs: string[]
    emphasisPhrase?: string
    lead: string
    steps: string[]
    closing: string[]
  }
  design: {
    title: string
    paragraphs: string[]
    conclusion: string
  }
  technical: {
    title: string
    stackLead: string
    stackGroups: StackGroup[]
    conclusion: string
  }
  experience: {
    title: string
    highlight?: string
    paragraphs: string[]
  }
  education: {
    title: string
    entries: EducationEntry[]
  }
  certificates: {
    title: string
    intro: string
    items: Certificate[]
  }
  result: {
    title: string
    contactTitle: string
    paragraphs: string[]
    contactParagraphs: string[]
    contactHighlight?: string
  }
}

export const aboutContent: Record<Locale, AboutContent> = {
  ru: {
    title: 'Обо мне',
    introEmphasisIndex: 3,
    intro: [
      'Я Full-Stack Developer из Киева. Создаю цифровые продукты для ситуаций, когда бизнесу нужно запустить новый сервис, автоматизировать ручную работу, перенести процессы в онлайн, сделать удобный инструмент для команды или реализовать идею нового продукта.',
      'Это может быть сайт, web-сервис, CRM, внутренняя система, мобильное приложение для iOS и Android или desktop-решение.',
      'В профессиональной разработке с 2019 года. Могу пройти с проектом весь путь: от понимания задачи и структуры до дизайна, frontend, backend, базы данных, интеграций, deployment и запуска.',
      'Для меня важно не просто реализовать список функций. Важно понять, для чего создаётся продукт и что должно измениться после его запуска.',
    ],
    projects: {
      title: 'Какие задачи я помогаю решать',
      intro: 'Иногда бизнесу нужен сайт, чтобы понятно представить услугу и получать обращения. Иногда CRM, чтобы перестать вести клиентов, записи, оплату и отчётность в таблицах и мессенджерах. В другом случае нужно мобильное приложение, чтобы пользователь мог работать с сервисом в любой момент.',
      items: [],
      emphasisPhrase: 'какую работу продукт должен выполнять для бизнеса или пользователя',
      paragraphs: [
        'Поэтому я не начинаю с вопроса «какой функционал нужно написать». Сначала стараюсь понять, какую работу продукт должен выполнять для бизнеса или пользователя.',
        'Я разрабатываю корпоративные и сервисные сайты, web-платформы, CRM и внутренние системы, личные кабинеты, мобильные приложения для iOS и Android, backend-сервисы и desktop-решения.',
        'Могу создать продукт с нуля или подключиться к уже существующему: переделать неудобный интерфейс, добавить новый функционал, автоматизировать процесс, интегрировать сторонние сервисы или продолжить развитие системы.',
      ],
    },
    process: {
      title: 'Как я работаю',
      paragraphs: [
        'Перед началом работы мне важно понять не только, что нужно сделать, но и зачем это нужно.',
        'Кто будет пользоваться продуктом? Что сейчас занимает слишком много времени? Где возникают ошибки? Какое действие пользователь должен выполнять проще? Что должно измениться для бизнеса после запуска?',
        'Иногда после такого разбора оказывается, что часть запланированных функций вообще не нужна, а задачу можно решить проще.',
      ],
      emphasisPhrase: 'зачем это нужно',
      lead: '',
      steps: [
        'Обсуждаем задачу, пользователей и желаемый результат.',
        'Определяем основной сценарий продукта и необходимый функционал.',
        'Формирую структуру, дизайн и логику взаимодействия.',
        'Разрабатываю web-, mobile- или frontend-часть продукта.',
        'При необходимости создаю backend, базу данных, API и интеграции.',
        'Проверяю основные сценарии, адаптивность и работу на нужных устройствах.',
        'Готовлю продукт к deployment, публикации или запуску.',
      ],
      closing: [
        'На ключевых этапах вы видите результат и можете вносить изменения ещё в процессе работы. Поэтому не нужно ждать финала, чтобы понять, решает ли продукт именно ту задачу, ради которой он создавался.',
      ],
    },
    design: {
      title: 'Разработка и дизайн',
      paragraphs: [
        'Дизайну я уделяю много времени, потому что именно через интерфейс пользователь взаимодействует с продуктом.',
        'Даже хорошая функциональность теряет ценность, если человеку сложно понять, куда нажать, где найти нужную информацию или что делать дальше.',
        'Поэтому я продумываю не только внешний вид, но и структуру экранов, навигацию, типографику, отступы, адаптивность, анимации и поведение элементов. Часто возвращаюсь к уже готовым решениям и дорабатываю их, если вижу, что взаимодействие можно сделать проще или визуально сильнее.',
        'Мне важно, чтобы продукт не просто работал, а выглядел современно, целостно и профессионально.',
      ],
      conclusion: 'Хороший продукт должен не только работать. Им должно хотеться пользоваться.',
    },
    technical: {
      title: 'Технический опыт',
      stackLead: 'Технологии для меня — инструмент, а не цель проекта. Клиенту нужен не React, PostgreSQL или Swift сами по себе. Ему нужен продукт, который стабильно работает, может развиваться и не создаёт проблем через несколько месяцев после запуска.',
      stackGroups: [
        { title: 'Web-разработка', value: 'React · Next.js · TypeScript · JavaScript' },
        { title: 'Mobile', value: 'React Native · Expo · Swift · SwiftUI · iOS · Android' },
        { title: 'Backend и данные', value: 'NestJS · Node.js · PostgreSQL · Firebase · REST API' },
        { title: 'Инфраструктура', value: 'Docker · VPS · сторонние API и сервисы' },
        { title: 'Desktop', value: 'Tauri · macOS' },
      ],
      conclusion: 'Стек подбираю под конкретную задачу, масштаб продукта, дальнейшую поддержку и возможность развития.',
    },
    experience: {
      title: 'Опыт работы',
      highlight: 'В профессиональной разработке я с 2019 года.',
      paragraphs: [
        'За это время я работал над разными задачами: от сайтов и мобильных приложений до CRM, внутренних бизнес-систем и продуктов, где нужно было объединить frontend, backend, базу данных и сторонние сервисы в единую систему.',
        'Работаю как независимый Full-Stack Developer, а также имею опыт работы в профессиональных IT-командах. Сотрудничал с клиентами из Украины, США, Великобритании, Германии, Объединённых Арабских Эмиратов и Греции.',
        'Для меня хороший результат проекта — это не количество написанного кода. Это ситуация, когда продукт действительно начинают использовать для той задачи, ради которой его создавали.',
      ],
    },
    education: {
      title: 'Образование',
      entries: [
        {
          institution: ['Национальный технический университет Украины', '«Киевский политехнический институт имени Игоря Сикорского»'],
          programme: 'Software Engineering',
          period: '2012–2015',
          paragraphs: [
            'Образование дало мне фундаментальное понимание программирования, структуры программных систем и принципов разработки, которое сегодня дополняю практическим опытом работы над реальными продуктами.',
          ],
        },
        {
          institution: ['Национальный университет физического воспитания и спорта Украины'],
          programme: 'Тренерская деятельность в спорте — пауэрлифтинг',
          period: '1995–2000',
          paragraphs: [
            'До IT значительную часть моей жизни занимал профессиональный спорт.',
            'Я профессионально занимался пауэрлифтингом, получил звание мастера спорта международного класса и имею многолетний опыт тренерской работы.',
            'Думаю, именно спорт во многом сформировал мой подход к работе: дисциплину, системность, внимание к прогрессу и привычку доводить долгие проекты до результата.',
          ],
        },
      ],
    },
    certificates: {
      title: 'Профессиональные сертификаты',
      intro: 'Помимо практического опыта, я продолжаю развивать техническую квалификацию и подтверждать знания профессиональными сертификациями.',
      items: [
        {
          title: 'AWS Certified Developer – Associate, 2021',
          description: 'Сертификация AWS по разработке и сопровождению приложений в облачной инфраструктуре AWS: сервисы AWS, API, deployment, мониторинг и cloud-based архитектура.',
        },
        {
          title: 'EDB Certified Associate – PostgreSQL 13, 2023',
          description: 'Сертификация по PostgreSQL: реляционные базы данных, SQL, структура данных, администрирование и основные возможности PostgreSQL.',
        },
        {
          title: 'Meta React Native Specialization, 2023',
          description: 'Специализация Meta по мобильной разработке: JavaScript, React, React Native, работа с данными, version control, основы UX/UI и создание мобильных приложений.',
        },
        {
          title: 'Microsoft Certified: Power Platform Developer Associate, 2025',
          description: 'Сертификация Microsoft по разработке бизнес-решений на Power Platform: приложения, автоматизация процессов, интеграция данных и создание компонентов для корпоративных систем.',
        },
      ],
    },
    result: {
      title: 'Если вам нужен не просто «ещё один такой же продукт»',
      contactTitle: 'Есть задача, но ещё нет готового ТЗ?',
      paragraphs: [
        'Мне особенно интересны проекты, где стандартного решения недостаточно.',
        'Когда сайт, сервис или приложение должны не просто выполнять функцию, а создавать определённое впечатление, отличаться от конкурентов, иметь собственный характер или предлагать необычный способ взаимодействия с пользователем.',
        'В таких проектах мне нравится искать решения в дизайне, анимации, структуре, логике работы и мелких деталях, которые в итоге формируют ощущение от продукта.',
        'При этом нестандартность не должна существовать ради эффекта. Если какое-то решение не помогает пользователю или бизнесу, оно не нужно.',
        'Создадим продукт, у которого будет собственный характер и который не затеряется среди десятков похожих решений.',
      ],
      contactParagraphs: [
        'Это нормально.',
        'Достаточно рассказать, что вы хотите изменить, упростить или создать. Например: перестать вести работу вручную, запустить новый сервис, сделать мобильный продукт, переработать существующий сайт или реализовать идею, которой ещё нет в готовом виде.',
        'Я помогу разобраться в задаче, определить, что действительно нужно продукту, и предложу вариант реализации.',
      ],
      contactHighlight: 'Вы приносите задачу. Я помогаю превратить её в продукт, которым можно пользоваться.',
    },
  },
  uk: {
    title: 'Про мене',
    introEmphasisIndex: 3,
    intro: [
      'Я Full-Stack Developer із Києва. Створюю цифрові продукти для ситуацій, коли бізнесу потрібно запустити новий сервіс, автоматизувати ручну роботу, перенести процеси в онлайн, зробити зручний інструмент для команди або реалізувати ідею нового продукту.',
      'Це може бути сайт, web-сервіс, CRM, внутрішня система, мобільний застосунок для iOS та Android або desktop-рішення.',
      'У професійній розробці з 2019 року. Можу пройти з проєктом весь шлях: від розуміння задачі та структури до дизайну, frontend, backend, бази даних, інтеграцій, deployment і запуску.',
      'Для мене важливо не просто реалізувати список функцій. Важливо зрозуміти, для чого створюється продукт і що має змінитися після його запуску.',
    ],
    projects: {
      title: 'Які задачі я допомагаю вирішувати',
      intro: 'Іноді бізнесу потрібен сайт, щоб зрозуміло представити послугу й отримувати звернення. Іноді CRM, щоб перестати вести клієнтів, записи, оплату та звітність у таблицях і месенджерах. В іншому випадку потрібен мобільний застосунок, щоб користувач міг працювати з сервісом у будь-який момент.',
      items: [],
      emphasisPhrase: 'яку роботу продукт повинен виконувати для бізнесу або користувача',
      paragraphs: [
        'Тому я не починаю з питання «який функціонал потрібно написати». Спочатку намагаюся зрозуміти, яку роботу продукт повинен виконувати для бізнесу або користувача.',
        'Я розробляю корпоративні та сервісні сайти, web-платформи, CRM і внутрішні системи, особисті кабінети, мобільні застосунки для iOS та Android, backend-сервіси та desktop-рішення.',
        'Можу створити продукт з нуля або підключитися до вже існуючого: переробити незручний інтерфейс, додати новий функціонал, автоматизувати процес, інтегрувати сторонні сервіси або продовжити розвиток системи.',
      ],
    },
    process: {
      title: 'Як я працюю',
      paragraphs: [
        'Перед початком роботи мені важливо зрозуміти не лише те, що потрібно зробити, а й чому це потрібно.',
        'Хто буде користуватися продуктом? Що зараз займає занадто багато часу? Де виникають помилки? Яку дію користувач повинен виконувати простіше? Що має змінитися для бізнесу після запуску?',
        'Іноді після такого розбору виявляється, що частина запланованих функцій взагалі не потрібна, а задачу можна вирішити простіше.',
      ],
      emphasisPhrase: 'чому це потрібно',
      lead: '',
      steps: [
        'Обговорюємо задачу, користувачів і бажаний результат.',
        'Визначаємо основний сценарій продукту та необхідний функціонал.',
        'Формую структуру, дизайн і логіку взаємодії.',
        'Розробляю web, mobile або frontend-частину продукту.',
        'За потреби створюю backend, базу даних, API та інтеграції.',
        'Перевіряю основні сценарії, адаптивність і роботу на потрібних пристроях.',
        'Готую продукт до deployment, публікації або запуску.',
      ],
      closing: [
        'На ключових етапах ви бачите результат і можете вносити зміни ще в процесі роботи. Тому не потрібно чекати фіналу, щоб зрозуміти, чи вирішує продукт саме ту задачу, заради якої він створювався.',
      ],
    },
    design: {
      title: 'Розробка й дизайн',
      paragraphs: [
        'Дизайну я приділяю багато часу, тому що саме через інтерфейс користувач взаємодіє з продуктом.',
        'Навіть хороша функціональність втрачає цінність, якщо людині складно зрозуміти, куди натиснути, де знайти потрібну інформацію або що робити далі.',
        'Тому я продумую не лише зовнішній вигляд, а й структуру екранів, навігацію, типографіку, відступи, адаптивність, анімації та поведінку елементів. Часто повертаюся до вже готових рішень і доопрацьовую їх, якщо бачу, що взаємодію можна зробити простішою або візуально сильнішою.',
        'Мені важливо, щоб продукт не просто працював, а виглядав сучасно, цілісно й професійно.',
      ],
      conclusion: 'Хороший продукт має не тільки працювати. Ним має хотітися користуватися.',
    },
    technical: {
      title: 'Технічний досвід',
      stackLead: 'Технології для мене є інструментом, а не метою проєкту. Клієнту потрібен не React, PostgreSQL або Swift самі по собі. Йому потрібен продукт, який стабільно працює, може розвиватися й не створює проблем через кілька місяців після запуску.',
      stackGroups: [
        { title: 'Web-розробка', value: 'React · Next.js · TypeScript · JavaScript' },
        { title: 'Mobile', value: 'React Native · Expo · Swift · SwiftUI · iOS · Android' },
        { title: 'Backend та дані', value: 'NestJS · Node.js · PostgreSQL · Firebase · REST API' },
        { title: 'Інфраструктура', value: 'Docker · VPS · сторонні API та сервіси' },
        { title: 'Desktop', value: 'Tauri · macOS' },
      ],
      conclusion: 'Стек підбираю під конкретну задачу, масштаб продукту, подальшу підтримку та можливість розвитку.',
    },
    experience: {
      title: 'Досвід роботи',
      highlight: 'У професійній розробці я з 2019 року.',
      paragraphs: [
        "За цей час працював над різними задачами: від сайтів і мобільних застосунків до CRM, внутрішніх бізнес-систем та продуктів, де потрібно було об'єднати frontend, backend, базу даних і сторонні сервіси в одну систему.",
        'Працюю як незалежний Full-Stack Developer, а також маю досвід роботи в професійних IT-командах. Співпрацював із клієнтами з України, США, Великої Британії, Німеччини, Об’єднаних Арабських Еміратів та Греції.',
        'Для мене хороший результат проєкту — це не кількість написаного коду. Це ситуація, коли продукт реально починають використовувати для тієї задачі, заради якої його створювали.',
      ],
    },
    education: {
      title: 'Освіта',
      entries: [
        {
          institution: ['Національний технічний університет України', '«Київський політехнічний інститут імені Ігоря Сікорського»'],
          programme: 'Software Engineering',
          period: '2012–2015',
          paragraphs: [
            'Освіта дала мені фундаментальне розуміння програмування, структури програмних систем та принципів розробки, яке сьогодні доповнюю практичним досвідом роботи над реальними продуктами.',
          ],
        },
        {
          institution: ['Національний університет фізичного виховання і спорту України'],
          programme: 'Тренерська діяльність у спорті — пауерліфтинг',
          period: '1995–2000',
          paragraphs: [
            'До IT значну частину мого життя займав професійний спорт.',
            'Я професійно займався пауерліфтингом, отримав звання майстра спорту міжнародного класу та маю багаторічний досвід тренерської роботи.',
            'Думаю, саме спорт багато в чому сформував мій підхід до роботи: дисципліну, системність, увагу до прогресу та звичку доводити довгі проєкти до результату.',
          ],
        },
      ],
    },
    certificates: {
      title: 'Професійні сертифікати',
      intro: 'Окрім практичного досвіду, я продовжую розвивати технічну кваліфікацію та підтверджувати знання професійними сертифікаціями.',
      items: [
        {
          title: 'AWS Certified Developer – Associate, 2021',
          description: 'Сертифікація AWS з розробки та супроводу застосунків у хмарній інфраструктурі AWS: сервіси AWS, API, deployment, моніторинг і cloud-based архітектура.',
        },
        {
          title: 'EDB Certified Associate – PostgreSQL 13, 2023',
          description: 'Сертифікація з PostgreSQL: реляційні бази даних, SQL, структура даних, адміністрування та основні можливості PostgreSQL.',
        },
        {
          title: 'Meta React Native Specialization, 2023',
          description: 'Спеціалізація Meta з мобільної розробки: JavaScript, React, React Native, робота з даними, version control, основи UX/UI та створення мобільних застосунків.',
        },
        {
          title: 'Microsoft Certified: Power Platform Developer Associate, 2025',
          description: 'Сертифікація Microsoft з розробки бізнес-рішень на Power Platform: застосунки, автоматизація процесів, інтеграція даних і створення компонентів для корпоративних систем.',
        },
      ],
    },
    result: {
      title: 'Якщо вам потрібен не просто «ще один такий самий продукт»',
      contactTitle: 'Є задача, але ще немає готового ТЗ?',
      paragraphs: [
        'Мені особливо цікаві проєкти, де стандартного рішення недостатньо.',
        'Коли сайт, сервіс або застосунок має не просто виконувати функцію, а створювати певне враження, відрізнятися від конкурентів, мати власний характер або пропонувати незвичайний спосіб взаємодії з користувачем.',
        'У таких проєктах я люблю шукати рішення в дизайні, анімації, структурі, логіці роботи та дрібних деталях, які в результаті формують відчуття від продукту.',
        'При цьому нестандартність не повинна існувати заради ефекту. Якщо якесь рішення не допомагає користувачу або бізнесу, воно не потрібне.',
        'Створімо продукт, який матиме власний характер і не загубиться серед десятків схожих рішень.',
      ],
      contactParagraphs: [
        'Це нормально.',
        'Достатньо розповісти, що ви хочете змінити, спростити або створити. Наприклад: перестати вести роботу вручну, запустити новий сервіс, зробити мобільний продукт, переробити існуючий сайт або реалізувати ідею, якої ще немає у готовому вигляді.',
        'Я допоможу розібрати задачу, визначити, що дійсно потрібно продукту, і запропоную варіант реалізації.',
      ],
      contactHighlight: 'Ви приносите задачу. Я допомагаю перетворити її на продукт, яким можна користуватися.',
    },
  },
  en: {
    title: 'About me',
    introEmphasisIndex: 3,
    intro: [
      'I am a Full-Stack Developer from Kyiv. I create digital products for situations where a business needs to launch a new service, automate manual work, move processes online, build a convenient tool for its team, or bring a new product idea to life.',
      'This may be a website, web service, CRM, internal system, mobile app for iOS and Android, or a desktop solution.',
      'I have been working professionally in development since 2019. I can take a project through the entire journey: from understanding the task and defining the structure to design, frontend, backend, database, integrations, deployment, and launch.',
      'For me, it is important not just to implement a list of features. It is important to understand why the product is being created and what should change after it launches.',
    ],
    projects: {
      title: 'What problems I help solve',
      intro: 'Sometimes a business needs a website to present its service clearly and generate inquiries. Sometimes it needs a CRM to stop managing clients, appointments, payments, and reporting in spreadsheets and messengers. In other cases, it needs a mobile app so users can work with the service at any time.',
      items: [],
      emphasisPhrase: 'what work the product should perform for the business or the user',
      paragraphs: [
        'That is why I do not start with the question, “What functionality needs to be built?” First, I try to understand what work the product should perform for the business or the user.',
        'I develop corporate and service websites, web platforms, CRMs and internal systems, client portals, mobile apps for iOS and Android, backend services, and desktop solutions.',
        'I can create a product from scratch or join an existing one: redesign an inconvenient interface, add new functionality, automate a process, integrate third-party services, or continue developing the system.',
      ],
    },
    process: {
      title: 'How I work',
      paragraphs: [
        'Before work begins, it is important for me to understand not only what needs to be done, but also why it needs to be done.',
        'Who will use the product? What currently takes too much time? Where do errors occur? Which action should the user be able to perform more easily? What should change for the business after launch?',
        'Sometimes this analysis shows that some of the planned features are not needed at all and that the task can be solved more simply.',
      ],
      emphasisPhrase: 'why it needs to be done',
      lead: '',
      steps: [
        'Discuss the task, users, and desired outcome.',
        'Define the product’s core user flow and required functionality.',
        'Shape the structure, design, and interaction logic.',
        'Develop the web, mobile, or frontend part of the product.',
        'When needed, build the backend, database, API, and integrations.',
        'Check the main user flows, responsiveness, and operation on the required devices.',
        'Prepare the product for deployment, publication, or launch.',
      ],
      closing: [
        'At key stages, you see the result and can make changes while the work is still in progress. This means you do not have to wait until the end to understand whether the product solves the very problem it was created to solve.',
      ],
    },
    design: {
      title: 'Development and design',
      paragraphs: [
        'I spend a lot of time on design because the interface is where users interact with the product.',
        'Even strong functionality loses its value if it is difficult for people to understand where to click, where to find the information they need, or what to do next.',
        'That is why I think through not only the visual appearance, but also the structure of screens, navigation, typography, spacing, responsiveness, animations, and element behaviour. I often return to finished solutions and refine them when I see that the interaction can be made simpler or visually stronger.',
        'It is important to me that a product does not just work, but looks modern, cohesive, and professional.',
      ],
      conclusion: 'A good product should not only work. People should want to use it.',
    },
    technical: {
      title: 'Technical experience',
      stackLead: 'Technology is a tool for me, not the goal of a project. A client does not need React, PostgreSQL, or Swift for their own sake. They need a product that works reliably, can evolve, and does not create problems a few months after launch.',
      stackGroups: [
        { title: 'Web development', value: 'React · Next.js · TypeScript · JavaScript' },
        { title: 'Mobile', value: 'React Native · Expo · Swift · SwiftUI · iOS · Android' },
        { title: 'Backend & data', value: 'NestJS · Node.js · PostgreSQL · Firebase · REST API' },
        { title: 'Infrastructure', value: 'Docker · VPS · third-party APIs and services' },
        { title: 'Desktop', value: 'Tauri · macOS' },
      ],
      conclusion: 'I choose the stack based on the specific task, product scale, future maintenance, and room for growth.',
    },
    experience: {
      title: 'Work experience',
      highlight: 'I have been working in professional development since 2019.',
      paragraphs: [
        'During that time, I have worked on a range of tasks: from websites and mobile applications to CRMs, internal business systems, and products that required bringing the frontend, backend, database, and third-party services together into one system.',
        'I work as an independent Full-Stack Developer and also have experience working in professional IT teams. I have collaborated with clients from Ukraine, the United States, the United Kingdom, Germany, the United Arab Emirates, and Greece.',
        'For me, a good project outcome is not measured by the amount of code written. It is when people actually start using the product for the task it was created to solve.',
      ],
    },
    education: {
      title: 'Education',
      entries: [
        {
          institution: ['National Technical University of Ukraine', '“Kyiv Polytechnic Institute named after Igor Sikorsky”'],
          programme: 'Software Engineering',
          period: '2012–2015',
          paragraphs: [
            'My education gave me a fundamental understanding of programming, software system structures, and development principles, which I now complement with practical experience working on real-world products.',
          ],
        },
        {
          institution: ['National University of Physical Education and Sport of Ukraine'],
          programme: 'Coaching in sport — powerlifting',
          period: '1995–2000',
          paragraphs: [
            'Before IT, professional sport occupied a significant part of my life.',
            'I trained in powerlifting professionally, earned the title of Master of Sport of International Class, and have many years of coaching experience.',
            'I believe sport shaped my approach to work in many ways: discipline, systematic thinking, attention to progress, and the habit of seeing long-term projects through to the result.',
          ],
        },
      ],
    },
    certificates: {
      title: 'Professional certificates',
      intro: 'In addition to practical experience, I continue to develop my technical qualifications and confirm my knowledge through professional certifications.',
      items: [
        {
          title: 'AWS Certified Developer – Associate, 2021',
          description: 'AWS certification in developing and maintaining applications in AWS cloud infrastructure: AWS services, APIs, deployment, monitoring, and cloud-based architecture.',
        },
        {
          title: 'EDB Certified Associate – PostgreSQL 13, 2023',
          description: 'PostgreSQL certification: relational databases, SQL, data structure, administration, and core PostgreSQL capabilities.',
        },
        {
          title: 'Meta React Native Specialization, 2023',
          description: 'Meta specialisation in mobile development: JavaScript, React, React Native, working with data, version control, UX/UI fundamentals, and creating mobile applications.',
        },
        {
          title: 'Microsoft Certified: Power Platform Developer Associate, 2025',
          description: 'Microsoft certification in developing business solutions on Power Platform: applications, process automation, data integration, and creating components for enterprise systems.',
        },
      ],
    },
    result: {
      title: 'If you need more than “just another product like the rest”',
      contactTitle: 'Do you have a task but no finished specification yet?',
      paragraphs: [
        'I am especially interested in projects where a standard solution is not enough.',
        'When a website, service, or app needs to do more than perform a function: it should create a certain impression, stand out from competitors, have its own character, or offer an unusual way for users to interact with it.',
        'In these projects, I enjoy looking for solutions in design, animation, structure, logic, and the small details that ultimately shape how the product feels.',
        'At the same time, unconventional ideas should not exist for effect alone. If a solution does not help the user or the business, it is not needed.',
        'Let’s create a product with its own character — one that will not get lost among dozens of similar solutions.',
      ],
      contactParagraphs: [
        'That is normal.',
        'It is enough to explain what you want to change, simplify, or create. For example: stop managing work manually, launch a new service, build a mobile product, redesign an existing website, or bring an idea to life before it has taken a finished form.',
        'I will help break down the task, define what the product truly needs, and suggest an implementation approach.',
      ],
      contactHighlight: 'You bring the task. I help turn it into a product people can use.',
    },
  },
}
