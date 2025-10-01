import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageTransitionProvider from '../components/PageTransitionProvider'
import FloatingAccessibilityButton from '../components/FloatingAccessibilityButton'
import { generateMetadata as generateSEOMetadata, seoConfig } from '../lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  ...generateSEOMetadata(),
  icons: {
    icon: '/assets/images/nextgen-logo.svg',
    shortcut: '/assets/images/nextgen-logo.svg',
    apple: '/assets/images/nextgen-logo.svg',
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  other: {
    'google-site-verification': 'your-google-verification-code', // Add your verification code here
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.structuredData),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <PageTransitionProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </PageTransitionProvider>
        <Footer />
        <FloatingAccessibilityButton />
      </body>
    </html>
  )
}
