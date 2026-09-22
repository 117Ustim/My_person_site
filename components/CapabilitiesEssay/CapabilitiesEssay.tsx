'use client'

import Image from 'next/image'
import { useI18n } from '../../lib/i18n'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
import styles from './CapabilitiesEssay.module.css'

type CapabilitySection = {
  number: string
  category: string
  title: string
  paragraphs: string[]
}

const sections: CapabilitySection[] = [
  {
    number: '01',
    category: 'ВЕБ',
    title: 'Вебсайти',
    paragraphs: [
      'Люблю сайти, у яких немає випадкових деталей. Коли типографіка, відступи, анімація і контент працюють разом, а не просто красиво виглядають окремо.',
      'Розробляю лендинги, корпоративні сайти та вебплатформи. Особливу увагу приділяю адаптивності, швидкості, поведінці інтерфейсу і тому, наскільки легко користувачеві зрозуміти, куди рухатися далі.',
    ],
  },
  {
    number: '02',
    category: 'СИСТЕМИ',
    title: 'CRM та бізнес-системи',
    paragraphs: [
      'Розробляю CRM та внутрішні системи під реальні процеси конкретного бізнесу.',
      'Це може бути робота з клієнтами, записи, платежі, співробітники, ролі доступу, звітність, аналітика, нагадування або автоматизація внутрішніх процесів.',
      'Мені важливо не просто перенести існуючу роботу бізнесу в інтерфейс, а зробити так, щоб після цього з системою справді стало простіше працювати.',
    ],
  },
  {
    number: '03',
    category: 'MOBILE',
    title: 'Мобільні застосунки',
    paragraphs: [
      'Створюю застосунки для iOS та Android: від невеликих сервісів до продуктів із власною серверною логікою.',
      'Авторизація, особисті кабінети, підписки, push-сповіщення, робота з камерою, документами, API та синхронізацією даних. Тут для мене теж важливо, щоб складна функціональність не відчувалася складною для людини, яка тримає телефон у руках.',
    ],
  },
  {
    number: '04',
    category: 'DETAILS',
    title: 'Дизайн і деталі',
    paragraphs: [
      'Для мене хороший продукт має бути не тільки функціональним, а й візуально цілісним. Я уважно ставлюся до композиції, типографіки, пропорцій, анімацій і загального відчуття від інтерфейсу.',
      'Я перфекціоніст у деталях і не люблю залишати рішення на рівні «і так нормально». Якщо бачу, що щось можна зробити чистіше, точніше або виразніше, я доводжу це до результату, який самому хочеться показувати.',
      'Саме тому дизайн для мене не окремий етап, а частина всього продукту.',
    ],
  },
  {
    number: '05',
    category: 'FULL-STACK',
    title: 'Frontend + Backend',
    paragraphs: [
      'Я можу взяти на себе всю технічну частину проєкту, а не тільки окремий frontend або backend.',
      'Інтерфейс, серверна логіка, база даних, API, авторизація, інтеграції, робота із сервером і deployment. Для клієнта це означає менше зайвих ланок у розробці і значно менше ситуацій, коли одна частина продукту живе окремо від іншої.',
    ],
  },
]

const technologies = ['React', 'Next.js', 'TypeScript', 'React Native', 'NestJS', 'PostgreSQL', 'Firebase', 'Docker']

export default function CapabilitiesEssay() {
  const { localize, t } = useI18n()
  const { openInquiry } = useProjectInquiry()

  return (
    <div className={styles.essay}>
      <div className={styles.headingBlock}>
        <div className={styles.headingCopy}>
          <p className={styles.eyebrow}>{localize('Мій підхід')}</p>
          <h2>{localize('Від ідеї до продукту, яким хочеться користуватися')}</h2>
        </div>
        <div className={styles.portraitFrame}>
          <Image
            className={styles.portrait}
            src="/assets/founder-avatar.png"
            alt={localize('Портрет автора')}
            fill
            sizes="132px"
          />
        </div>
      </div>

      <div className={styles.intro}>
        <div className={styles.introMeta}>
          <span>00</span>
          <span>{localize('ПІДХІД')}</span>
        </div>
        <div className={styles.introCopy}>
          <p className={styles.lead}>{localize('Мені завжди було мало просто «написати код і щоб працювало». Перед початком я намагаюся зрозуміти саму логіку проєкту: як людина буде ним користуватися, де можна прибрати зайві дії, що варто автоматизувати і як зробити систему зрозумілою ще до того, як користувач почне в ній розбиратися.')}</p>
          <p>{localize('Я створюю сайти, CRM-системи та мобільні застосунки і можу вести проєкт практично повністю: від структури та інтерфейсу до frontend, backend, бази даних, інтеграцій і запуску.')}</p>
        </div>
      </div>

      <div className={styles.capabilityList}>
        {sections.map(section => (
          <article className={styles.capability} key={section.number}>
            <div className={styles.capabilityMeta}>
              <span className={styles.number}>{section.number}</span>
              <span className={styles.category}>{localize(section.category)}</span>
            </div>
            <div className={styles.capabilityCopy}>
              <h3>{localize(section.title)}</h3>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{localize(paragraph)}</p>)}
            </div>
          </article>
        ))}
      </div>

      <div className={styles.conclusion}>
        <p className={styles.conclusionLabel}>{localize('ВИСНОВОК')}</p>
        <div className={styles.conclusionCopy}>
          <p>{localize('Для мене хороший продукт не закінчується на моменті, коли все просто «працює». Важливо, щоб ним було приємно користуватися сьогодні, легко розвивати завтра і не хотілося повністю переробляти через рік.')}</p>
          <p>{localize('Саме до такого результату я й намагаюся доводити кожен проєкт.')}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <div>
          <p className={styles.footerLabel}>{localize('Технології')}</p>
          <div className={styles.technologies} aria-label={t('capability.technologies')}>
            {technologies.map(technology => <span key={technology}>{technology}</span>)}
          </div>
        </div>
        <button className={styles.cta} type="button" onClick={openInquiry}>
          {t('nav.discussProject')} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
