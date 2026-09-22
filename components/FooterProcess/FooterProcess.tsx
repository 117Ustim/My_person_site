'use client'

import { useEffect, useRef, useState, type FocusEvent } from 'react'
import { useI18n } from '../../lib/i18n'
import styles from './FooterProcess.module.css'

const processSteps = [
  {
    titleKey: 'footer.processIdea',
    descriptionKey: 'footer.processIdeaDescription',
  },
  {
    titleKey: 'footer.processStructure',
    descriptionKey: 'footer.processStructureDescription',
  },
  {
    titleKey: 'footer.processDesign',
    descriptionKey: 'footer.processDesignDescription',
  },
  {
    titleKey: 'footer.processDevelopment',
    descriptionKey: 'footer.processDevelopmentDescription',
  },
  {
    titleKey: 'footer.processLaunch',
    descriptionKey: 'footer.processLaunchDescription',
  },
] as const

const PROCESS_LINE_DURATION = 20000
const PROCESS_STEP_DURATION = PROCESS_LINE_DURATION / processSteps.length
const PROCESS_TOUCH_LEAD = 320

export default function FooterProcess() {
  const { t } = useI18n()
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const processElapsed = useRef(0)
  const lastFrameTimestamp = useRef<number | null>(null)
  const lightPulseRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReduceMotion(motionPreference.matches)

    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)

    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      return
    }

    const animateProcess = (timestamp: number) => {
      if (lastFrameTimestamp.current === null) {
        lastFrameTimestamp.current = timestamp
      }

      if (isPaused) {
        lastFrameTimestamp.current = timestamp
      } else {
        processElapsed.current = (processElapsed.current + timestamp - lastFrameTimestamp.current) % PROCESS_LINE_DURATION
        lastFrameTimestamp.current = timestamp

        const currentStep = Math.min(Math.floor(processElapsed.current / PROCESS_STEP_DURATION), processSteps.length - 1)
        const stepProgress = currentStep === processSteps.length - 1
          ? 0
          : (processElapsed.current % PROCESS_STEP_DURATION) / PROCESS_STEP_DURATION
        const pulsePosition = currentStep === processSteps.length - 1
          ? 100
          : ((currentStep + stepProgress) / (processSteps.length - 1)) * 100
        const nextStep = Math.min(
          Math.floor((processElapsed.current + PROCESS_TOUCH_LEAD) / PROCESS_STEP_DURATION),
          processSteps.length - 1,
        )

        lightPulseRef.current?.style.setProperty('--pulse-position', `${pulsePosition}%`)
        setActiveStep(previousStep => previousStep === nextStep ? previousStep : nextStep)
      }

      frameId = window.requestAnimationFrame(animateProcess)
    }

    let frameId = window.requestAnimationFrame(animateProcess)

    return () => window.cancelAnimationFrame(frameId)
  }, [isPaused, reduceMotion])

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget

    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setIsPaused(false)
    }
  }

  return (
    <section
      className={`${styles.process} ${isPaused ? styles.paused : ''}`}
      aria-labelledby="footer-process-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlur}
    >
      <div className={styles.headingRow}>
        <p className={styles.eyebrow}>{t('footer.processEyebrow')}</p>
        <h2 id="footer-process-title" className={styles.heading}>
          {t('footer.processHeading')}
        </h2>
      </div>

      <div className={styles.trackWrap}>
        <span className={styles.trackLine} aria-hidden="true">
          <span ref={lightPulseRef} className={styles.lightPulse} />
        </span>

        <ol className={styles.stepList}>
          {processSteps.map((step, index) => {
            const isActive = index === activeStep

            return (
              <li className={`${styles.step} ${isActive ? styles.activeStep : ''}`} key={step.titleKey}>
                <button
                  className={styles.stepButton}
                  type="button"
                  aria-current={isActive ? 'step' : undefined}
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                >
                  <span className={styles.node} aria-hidden="true">
                    <span className={styles.nodeCore} />
                  </span>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.stepTitle}>{t(step.titleKey)}</span>
                  <span className={styles.stepDescription}>{t(step.descriptionKey)}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
