'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function FocusHandler() {
  const pathname = usePathname()

  useEffect(() => {
    // Focus main content on route change
    const main = document.getElementById('mainContent')
    if (main) {
      main.focus()
    }
  }, [pathname])

  return null
}
