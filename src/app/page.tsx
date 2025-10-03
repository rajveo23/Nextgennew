import { Metadata } from 'next'
import Hero from '../components/Hero'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import TeamProfile from '../components/TeamProfile'
import ClientTestimonials from '../components/ClientTestimonials'
import ContactCTA from '../components/ContactCTA'
import { generateMetadata as generateSEOMetadata } from '../lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Home',
  description: 'SEBI Registered RTA specializing in ISIN generation, demat services, and corporate actions. 27+ years experience in share registry services across India.',
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
