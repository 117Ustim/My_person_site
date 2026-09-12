import Image from 'next/image'
import styles from './LogoStrip.module.css'

type LogoStripProps = {
  logos: ReadonlyArray<readonly [string, string]>
  label?: string
}

export default function LogoStrip({ logos, label = 'Trusted by people from' }: LogoStripProps) {
  return (
    <section className={styles.section} aria-label={label}>
      <p className={styles.label}>{label}</p>
      <div className={styles.logos}>
        {logos.map(([name, image]) => (
          <div className={styles.logo} key={name}>
            <Image src={image} alt={name} width={150} height={42} />
          </div>
        ))}
      </div>
    </section>
  )
}
