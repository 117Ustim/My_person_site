'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { aboutContent } from '../../lib/about-content'
import { type Locale, useI18n } from '../../lib/i18n'
import { useProjectInquiry } from '../ProjectInquiry/ProjectInquiry'
import HandwrittenAccent from './HandwrittenAccent'
import styles from './AboutLongform.module.css'

type ChapterKey = 'projects' | 'process' | 'design' | 'technical' | 'experience' | 'education' | 'sport' | 'certificates' | 'result' | 'contact'

function useRevealOnView<T extends HTMLElement>() {
  const elementRef = useRef<T>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true)
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)

      if (!entry.isIntersecting) {
        return
      }

      setIsRevealed(true)
      observer.disconnect()
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.22 })

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { elementRef, isRevealed, isInView }
}

function renderEmphasizedText(text: string, phrases?: string | string[]): ReactNode {
  const normalizedPhrases = (Array.isArray(phrases) ? phrases : phrases ? [phrases] : [])
    .filter(Boolean)

  if (!normalizedPhrases.length) {
    return text
  }

  const match = normalizedPhrases
    .map(phrase => ({ phrase, index: text.indexOf(phrase) }))
    .filter(({ index }) => index >= 0)
    .sort((first, second) => first.index - second.index)[0]

  if (!match) {
    return text
  }

  return (
    <>
      {text.slice(0, match.index)}
      <strong>{match.phrase}</strong>
      {renderEmphasizedText(text.slice(match.index + match.phrase.length), normalizedPhrases)}
    </>
  )
}

const chapterLabels = {
  uk: {
    projects: 'ПРОЄКТИ',
    process: 'ПРОЦЕС',
    design: 'ДИЗАЙН',
    technical: 'СТЕК',
    experience: 'ДОСВІД',
    education: 'ОСВІТА',
    sport: 'СПОРТ',
    certificates: 'СЕРТИФІКАТИ',
    result: 'РЕЗУЛЬТАТ',
    contact: 'КОНТАКТ',
  },
  ru: {
    projects: 'ПРОЕКТЫ',
    process: 'ПРОЦЕСС',
    design: 'ДИЗАЙН',
    technical: 'СТЕК',
    experience: 'ОПЫТ',
    education: 'ОБРАЗОВАНИЕ',
    sport: 'СПОРТ',
    certificates: 'СЕРТИФИКАТЫ',
    result: 'РЕЗУЛЬТАТ',
    contact: 'КОНТАКТ',
  },
  en: {
    projects: 'PROJECTS',
    process: 'PROCESS',
    design: 'DESIGN',
    technical: 'TECH',
    experience: 'EXPERIENCE',
    education: 'EDUCATION',
    sport: 'SPORT',
    certificates: 'CERTIFICATES',
    result: 'RESULT',
    contact: 'CONTACT',
  },
} satisfies Record<Locale, Record<ChapterKey, string>>

export default function AboutLongform() {
  const { locale, t } = useI18n()
  const { openInquiry } = useProjectInquiry()
  const content = aboutContent[locale]
  const labels = chapterLabels[locale]
  const [technicalEducation, sportEducation] = content.education.entries
  const resultParagraphs = content.result.paragraphs
  const contactParagraphs = content.result.contactParagraphs

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.hero}>
          <div className={styles.portraitWrap}>
            <Image className={styles.portrait} src="/assets/founder-avatar.png?v=20260926-2" alt="" fill priority sizes="(max-width: 680px) 62vw, (max-width: 900px) 250px, 470px" />
          </div>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>PEOPLE&nbsp;&nbsp; IDEAS&nbsp;&nbsp; PRODUCTS</p>
            <h1>{content.title}</h1>
            <div className={styles.heroIntro}>
              {content.intro.map((paragraph, index) => (
                <p key={paragraph}>{index === content.introEmphasisIndex ? <strong>{paragraph}</strong> : paragraph}</p>
              ))}
            </div>
          </div>
          <HandwrittenAccent className={styles.heroAccent} />
        </header>

        <div className={styles.chapters}>
          <ReadingSection number="01" label={labels.projects} title={content.projects.title}>
            <p>{content.projects.intro}</p>
            {content.projects.categories?.length ? (
              <ul className={styles.projectCategories}>
                {content.projects.categories.map(category => (
                  <li className={styles.projectCategory} key={category.title}>
                    <strong>{category.title}</strong>
                    <span>{category.description}</span>
                  </li>
                ))}
              </ul>
            ) : content.projects.items.length ? (
              <ul className={styles.projectList}>{content.projects.items.map(item => <li key={item}>{item}</li>)}</ul>
            ) : null}
            {content.projects.paragraphs.map((paragraph, index) => (
              <p key={paragraph}>{renderEmphasizedText(paragraph, index === 0 ? content.projects.emphasisPhrase : undefined)}</p>
            ))}
          </ReadingSection>

          <ReadingSection number="02" label={labels.process} title={content.process.title}>
            {content.process.paragraphs.map((paragraph, index) => (
              <p key={paragraph}>{renderEmphasizedText(paragraph, index === 0 ? content.process.emphasisPhrase : undefined)}</p>
            ))}
            {content.process.lead ? <p className={styles.processLead}>{content.process.lead}</p> : null}
            <ol className={styles.processList}>{content.process.steps.map(step => <li key={step}>{step}</li>)}</ol>
            {content.process.closing.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </ReadingSection>

          <ReadingSection number="03" label={labels.design} title={content.design.title}>
            {content.design.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <p className={styles.conclusion}><strong>{content.design.conclusion}</strong></p>
          </ReadingSection>

          <ReadingSection number="04" label={labels.technical} title={content.technical.title} variant="technical">
            <p className={styles.technicalLead}>{content.technical.stackLead}</p>
            <div className={styles.stackGroups}>
              {content.technical.stackGroups.map(group => (
                <div className={styles.stackGroup} key={group.title}>
                  <strong>{group.title}</strong>
                  <span>{group.value}</span>
                </div>
              ))}
            </div>
            <p className={styles.technicalConclusion}>{content.technical.conclusion}</p>
          </ReadingSection>

          <ReadingSection number="05" label={labels.experience} title={content.experience.title}>
            {content.experience.highlight ? <p className={styles.experienceLead}>{content.experience.highlight}</p> : null}
            {content.experience.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </ReadingSection>

          <ReadingSection number="06" label={labels.education} title={content.education.title}>
            <EducationRecord entry={technicalEducation} />
          </ReadingSection>

          <ReadingSection number="07" label={labels.sport} title={sportEducation.programme}>
            <EducationRecord entry={sportEducation} showProgramme={false} />
          </ReadingSection>

          <ReadingSection number="08" label={labels.certificates} title={content.certificates.title} variant="certificates">
            <p>{content.certificates.intro}</p>
            <div className={styles.certificateGrid}>
              {content.certificates.items.map((item, index) => {
                const certificateImage = index === 0
                  ? { src: '/assets/about/aws-certified-developer-associate-2021.jpeg', width: 1200, height: 891 }
                  : index === 1
                    ? { src: '/assets/about/edb-certified-associate-postgresql-13-2023.jpeg', width: 1181, height: 912 }
                    : index === 2
                      ? { src: '/assets/about/meta-react-native-specialization-2023.jpeg', width: 1179, height: 912 }
                      : index === 3
                        ? { src: '/assets/about/microsoft-power-platform-developer-associate-2025.jpeg', width: 1181, height: 912 }
                      : null

                return (
                  <article className={styles.certificateCard} key={item.title}>
                    <div className={`${styles.certificateFrame} ${certificateImage ? styles.certificateImageFrame : ''}`} aria-hidden={certificateImage ? undefined : true}>
                      <Image
                        className={certificateImage ? styles.certificateImage : styles.certificatePlaceholder}
                        src={certificateImage?.src ?? '/assets/about/variant-4-certificate-placeholder.png'}
                        alt={certificateImage ? item.title : ''}
                        width={certificateImage?.width ?? 64}
                        height={certificateImage?.height ?? 64}
                      />
                    </div>
                    <div className={styles.certificateContent}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </ReadingSection>

          <ReadingSection number="09" label={labels.result} title={content.result.title}>
            {resultParagraphs.map((paragraph, index) => <p className={index === resultParagraphs.length - 1 ? styles.resultHighlight : undefined} key={paragraph}>{paragraph}</p>)}
          </ReadingSection>

          <ReadingSection number="10" label={labels.contact} title={content.result.contactTitle} variant="contact" isLast>
            {contactParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {content.result.contactHighlight ? <p className={styles.contactHighlight}>{content.result.contactHighlight}</p> : null}
            <div className={styles.actionSignal}>
              <span className={styles.incomingArrow} aria-hidden="true">
                <span className={styles.incomingArrowTail} />
                <ArrowDown className={styles.incomingArrowHead} strokeWidth={1.8} />
              </span>
              <button className={styles.action} type="button" onClick={openInquiry}>
                <span>{t('nav.discussProject')}</span>
                <ArrowRight aria-hidden="true" strokeWidth={1.75} />
              </button>
              <span className={styles.signalLine} aria-hidden="true">
                <span className={styles.signalPulse} />
              </span>
              <span className={styles.signalImpact} aria-hidden="true" />
              <span className={styles.signalWave} aria-hidden="true" />
            </div>
          </ReadingSection>
        </div>
      </article>
    </main>
  )
}

function EducationRecord({
  entry,
  showProgramme = true,
}: {
  entry: (typeof aboutContent)[Locale]['education']['entries'][number]
  showProgramme?: boolean
}) {
  return (
    <section className={styles.educationEntry}>
      <div className={styles.educationMeta}>
        {entry.institution.map(institution => <h3 key={institution}>{institution}</h3>)}
        {showProgramme ? <strong>{entry.programme}</strong> : null}
        <span>{entry.period}</span>
      </div>
      <div className={styles.educationCopy}>
        {entry.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  )
}

function ReadingSection({
  children,
  number,
  label,
  title,
  variant,
  isLast = false,
}: {
  children: ReactNode
  number: string
  label: string
  title: string
  variant?: 'technical' | 'certificates' | 'contact'
  isLast?: boolean
}) {
  const { elementRef, isRevealed, isInView } = useRevealOnView<HTMLElement>()
  const animationIsActive = number === '10' && isInView
  const sectionClassName = `${styles.readingSection} ${variant === 'technical' ? styles.technicalSection : ''} ${variant === 'certificates' ? styles.certificatesSection : ''} ${variant === 'contact' ? styles.contactSection : ''} ${isLast ? styles.lastSection : ''} ${isRevealed ? styles.isRevealed : ''} ${animationIsActive ? styles.isAnimationActive : ''}`

  return (
    <section ref={elementRef} className={sectionClassName}>
      <div className={styles.chapterMarker} aria-hidden="true">
        <span>{number}</span>
        <small>{label}</small>
      </div>
      <div className={styles.sectionInner}>
        <h2>{title}</h2>
        <div className={styles.sectionCopy}>{children}</div>
      </div>
    </section>
  )
}
