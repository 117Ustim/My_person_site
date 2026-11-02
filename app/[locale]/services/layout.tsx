import type { ReactNode } from 'react'
import SiteShell from '../../../components/SiteShell/SiteShell'

export default function LocalizedServicesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteShell>{children}</SiteShell>
}
