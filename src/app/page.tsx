import { Metadata } from 'next'
import Hero from '../components/Hero'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import TeamProfile from '../components/TeamProfile'
import ClientTestimonials from '../components/ClientTestimonials'
import ContactCTA from '../components/ContactCTA'
import { generateMetadata as generateSEOMetadata } from '../lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'NextGen Registry: BEST RTA in Delhi For Demat & ISIN Services',
  description: 'At NextGen Share Registry, we specialize in ISIN generation for equities, preference shares, debentures, and AIFs with unmatched speed and accuracy. SEBI Registered RTA with 27+ years experience.',
  keywords: ['NextGen RTA', 'ISIN creation Delhi', 'RTA services', 'Demat services', 'SEBI registered', 'Share registry'],
  url: '/'
})

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <TeamProfile />
      <ClientTestimonials />
      <ContactCTA />
    </>
  )
}
