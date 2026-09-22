import Image from 'next/image'
import styles from './BrandLogo.module.css'

type BrandLogoProps = {
  className?: string
  'aria-label'?: string
}

export default function BrandLogo({ className, 'aria-label': ariaLabel }: BrandLogoProps) {
  return (
    <span className={`${styles.logo} ${className ?? ''}`} role="img" aria-label={ariaLabel}>
      <Image className={styles.auMark} src="/assets/au-logo-transparent.png" alt="" width={737} height={438} />
      <Image className={styles.studioWordmark} src="/assets/studio-logo-transparent.png" alt="" width={941} height={249} />
    </span>
  )
}
