import Image from 'next/image'
import Link from 'next/link'
import BrandLogo from '../BrandLogo/BrandLogo'
import styles from './SiteFooter.module.css'

const productLinks = [
  { label: 'AI Practice Management', href: '/what-we-offer/ai-crm-for-financial-advisors' },
  { label: 'Execution & Custody', href: '/what-we-offer/custody-and-execution' },
  { label: 'Integrations', href: '/integrations' },
]

const companyLinks = [
  { label: 'Media Center', href: '/press/media-center' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: 'mailto:support@obsidianos.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/obsidianos' },
]

const otherLinks = [
  { label: 'Legal', href: '/legal' },
  { label: 'Security', href: '/security' },
  { label: 'Subprocessors', href: '/security/subprocessors' },
  { label: 'Cookie Settings', href: '/legal/cookie-policy' },
]

const badges = [
  ['0060-badge-gdpr.BEZxU5Ip_1Km20W-5977f7086e.svg', 'GDPR compliant'],
  ['0062-badge-pentesting-05169119fa.svg', 'Penetration tested'],
  ['0064-badge-soc2-f4ce5eedad.svg', 'SOC 2 Type 2'],
  ['0063-badge-iso-27001-88183a925a.svg', 'ISO 27001'],
  ['0061-badge-iso-22301-59716e8d63.svg', 'ISO 22301'],
] as const

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.disclaimerRow}>
        <p className={styles.disclaimer}>
          Obsidian Securities Limited is not yet authorised by the Financial Conduct Authority. Prior to becoming authorised no information regarding the future provision of custody and execution services is intended as an invitation or inducement to apply for these services, nor does it constitute financial advice.
        </p>
        <div className={styles.poweredBy}>
          <span>Powered by</span>
          <Image src="/sitegrab/assets/0059-rockcore.CZaptKSp_52fus-1cbf762eae.svg" alt="RockCore" width={130} height={25} />
        </div>
      </div>

      <div className={styles.footerGrid}>
        <div className={styles.companyColumn}>
          <Link className={styles.footerBrand} href="/" aria-label="Obsidian home">
            <BrandLogo className={styles.footerLogo} aria-label="Obsidian" />
          </Link>
          <p className={styles.companyText}>
            Obsidian Technologies Limited is a company registered in England & Wales with company number 16326982. Our office is located at 30 Churchill Place, Canary Wharf, London, England, E14 5RE.
          </p>
          <div className={styles.badges}>
            {badges.map(([file, alt]) => (
              <Link href="/security" key={file} aria-label={alt}>
                <Image src={`/sitegrab/assets/${file}`} alt={alt} width={60} height={60} />
              </Link>
            ))}
          </div>
          <p className={styles.copyright}>© 2026 Obsidian Technologies Limited. Obsidian & RockCore are registered trademarks of Obsidian Technologies Limited.</p>
        </div>

        <FooterLinkColumn title="Product" links={productLinks} />
        <FooterLinkColumn title="Obsidian" links={companyLinks} externalLinks />
        <FooterLinkColumn title="Others" links={otherLinks} />
      </div>

      <Image
        className={styles.watermark}
        src="/sitegrab/assets/0011-obsidian-watermark-922fe0ce4b.svg"
        alt=""
        aria-hidden="true"
        width={1428}
        height={290}
      />
    </footer>
  )
}

type FooterLinkColumnProps = {
  title: string
  links: ReadonlyArray<{ label: string; href: string }>
  externalLinks?: boolean
}

function FooterLinkColumn({ title, links, externalLinks = false }: FooterLinkColumnProps) {
  return (
    <div className={styles.linkColumn}>
      <h2 className={styles.columnTitle}>{title}</h2>
      <ul className={styles.linkList}>
        {links.map(link => (
          <li key={link.href}>
            {externalLinks && link.href.startsWith('http') ? (
              <a className={styles.footerLink} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ) : link.href.startsWith('mailto:') ? (
              <a className={styles.footerLink} href={link.href}>
                {link.label}
              </a>
            ) : (
              <Link className={styles.footerLink} href={link.href}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
