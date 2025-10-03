import { Metadata } from 'next'
import Hero from '../components/Hero'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import TeamProfile from '../components/TeamProfile'
import ClientTestimonials from '../components/ClientTestimonials'
import ContactCTA from '../components/ContactCTA'
import { generateMetadata as generateSEOMetadata } from '../lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'NextGen Registry: SEBI Registered RTA for ISIN & Demat Services',
  description: 'Your trusted RTA in Delhi with 27+ years of experience. We provide fast, accurate ISIN generation for equities, debentures, AIFs, and all Demat services.',
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
