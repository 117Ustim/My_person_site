import type { ReactNode } from 'react'
import SiteShell from '../../../components/SiteShell/SiteShell'

export default function UkrainianServicesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteShell>{children}</SiteShell>
}
