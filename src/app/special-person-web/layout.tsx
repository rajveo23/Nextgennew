import type { Metadata } from 'next'
import FocusHandler from './components/FocusHandler'
import './styles.css'

export const metadata: Metadata = {
  title: 'Accessible Portal | NextGen Registry',
  description: 'WCAG 2.1 AA compliant accessible portal for NextGen Share Registry services. SEBI Registered RTA with enhanced accessibility features.',
  keywords: 'accessible RTA, WCAG compliant, NextGen Registry, accessible ISIN services, disability-friendly RTA',
}

export default function SpecialPersonWebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <FocusHandler />
      {children}
    </>
  )
}
