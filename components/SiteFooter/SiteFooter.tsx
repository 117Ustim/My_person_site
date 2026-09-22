'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useI18n } from '../../lib/i18n'
import BrandLogo from '../BrandLogo/BrandLogo'
import FooterProcess from '../FooterProcess/FooterProcess'
import styles from './SiteFooter.module.css'

type FooterBadge = {
  src: string
  label: string
  isI18nKey?: boolean
}

const badges: ReadonlyArray<FooterBadge> = [
  {
    src: '/sitegrab/assets/0060-badge-gdpr.BEZxU5Ip_1Km20W-5977f7086e.svg',
    label: 'footer.gdpr',
    isI18nKey: true,
  },
  { src: '/assets/badges/full-stack-development.png', label: 'Full-stack development' },
  { src: '/assets/badges/secure-api.png', label: 'Secure API' },
  { src: '/assets/badges/responsive-design.png', label: 'Responsive design' },
  { src: '/assets/badges/ios-android-development.png', label: 'iOS and Android development' },
  { src: '/assets/badges/production-deployment.png', label: 'Production deployment' },
]

export default function SiteFooter() {
  const { t } = useI18n()

  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.companyColumn}>
          <Link className={styles.footerBrand} href="/" aria-label={t('common.auHome')}>
            <BrandLogo className={styles.footerLogo} aria-label={t('common.auStudio')} />
          </Link>
          <p className={styles.companyText}>{t('footer.companyText')}</p>
          <div className={styles.contactBlock}>
            <p className={styles.contactLabel}>{t('footer.contactHeading')}</p>
            <div className={styles.contactLinks}>
              <p className={styles.contactLocation}>
                <span className={styles.contactLinkLabel}>{t('footer.locationLabel')}</span>
                <span>{t('footer.location')}</span>
              </p>
              <a className={styles.contactLink} href="mailto:ustik72@gmail.com">
                <span className={styles.contactLinkLabel}>{t('footer.email')}</span>
                <span>ustik72@gmail.com</span>
              </a>
            </div>
            <div className={styles.contactSocials}>
              <a
                className={styles.contactSocialLink}
                href="https://t.me/+380673276040"
                target="_blank"
                rel="noreferrer"
                aria-label={t('footer.telegram')}
                title={t('footer.telegram')}
              >
                <TelegramIcon />
                <span>{t('footer.telegram')}</span>
              </a>
              <a
                className={styles.contactSocialLink}
                href="viber://chat?number=%2B380673276040"
                aria-label={t('footer.viber')}
                title={t('footer.viber')}
              >
                <ViberIcon />
                <span>{t('footer.viber')}</span>
              </a>
            </div>
          </div>
          <div className={styles.badges}>
            {badges.map(badge => {
              const label = badge.isI18nKey ? t(badge.label) : badge.label

              return (
                <Image
                  className={badge.isI18nKey ? styles.badgeImage : styles.badgeImageExpanded}
                  key={badge.src}
                  src={badge.src}
                  alt={label}
                  width={badge.isI18nKey ? 60 : 72}
                  height={badge.isI18nKey ? 60 : 72}
                />
              )
            })}
          </div>
        </div>

        <FooterProcess />
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>{t('footer.copyright')}</p>
        <p className={styles.credit}>
          <span>{t('footer.createdBy')}</span>
          <BrandLogo className={styles.creditLogo} aria-label={t('common.auStudio')} />
        </p>
      </div>

    </footer>
  )
}

function TelegramIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21.3 3.2-18.5 7.1c-1.3.5-1.3 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.3.8.7.8.3 0 .5-.1.7-.3l2.3-2.2 4.8 3.5c.9.5 1.5.3 1.7-.8l3.1-14.5c.3-1.4-.5-2-1.6-1.5Zm-11 9.8 9.3-5.9c.5-.3.9-.1.5.2l-7.6 6.8-.3 3.4-1.9-4.5Z" />
    </svg>
  )
}

function ViberIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.4 2.8c-3.4-1.6-8.3-1.3-11.2.9-2.3 1.8-3.2 4.5-2.7 7.4.3 1.7 1.2 3.5 2.5 5.1l-1 3.4c-.2.7.5 1.3 1.2 1l3.4-1.2c2.4 1.2 5.3 1.5 7.8.7 3.3-1.1 5.2-3.7 5.4-7.5.2-4.5-1.6-7.9-5.4-9.8Zm-4.9 4.1c.4-.2.8-.1 1 .3l.8 1.5c.2.4.1.8-.2 1l-.7.5c.5 1 1.3 1.8 2.3 2.4l.5-.7c.2-.3.6-.4 1-.2l1.5.8c.4.2.5.6.3 1-.4.8-1.1 1.4-2 1.5-1.3.1-3-.8-4.6-2.4-1.6-1.6-2.5-3.3-2.4-4.6.1-1 .7-1.7 1.5-2.1Z" />
    </svg>
  )
}
