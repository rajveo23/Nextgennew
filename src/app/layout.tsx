import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageTransitionProvider from '../components/PageTransitionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextGen Registry - SEBI Registered Registrar & Share Transfer Agent',
  description: 'NextGen Registry offers best RTA services including ISIN creation, demat services, and e-voting events with fastest turnaround time in the industry.',
  keywords: 'RTA, Registrar, Share Transfer Agent, ISIN, Demat, SEBI, NextGen Registry',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <PageTransitionProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </PageTransitionProvider>
        <Footer />
      </body>
    </html>
  )
}
