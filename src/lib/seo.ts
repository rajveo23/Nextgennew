export const seoConfig = {
  title: 'NextGen Registry - SEBI Registered RTA for Demat & ISIN Services',
  description: 'SEBI Registered RTA specializing in ISIN generation, demat services, and corporate actions. 27+ years experience in share registry services across India.',
  keywords: [
    'NextGen RTA',
    'NextGen Registry',
    'RTA services Delhi',
    'ISIN creation',
    'Share registry services',
    'Demat services',
    'SEBI registered RTA',
    'Registrar Transfer Agent',
    'Corporate actions',
    'Shareholder services',
    'NSDL',
    'CDSL',
    'Bond debentures',
    'Equity shares',
    'Preference shares',
    'AIF services'
  ],
  author: 'NextGen Share Registry Pvt Ltd',
  siteUrl: 'https://www.nextgenregistry.com',
  image: '/assets/images/new-logo.png',
  twitterHandle: '@nextgenregistry',
  
  // Company Information
  company: {
    name: 'NextGen Share Registry Pvt Ltd',
    legalName: 'NEXTGEN SHARE REGISTRY PVT. LTD.',
    description: 'SEBI Registered Registrar & Share Transfer Agent with 27+ years of capital market experience. Providing transparent, reliable, and efficient RTA services across India.',
    founded: '2010',
    address: {
      street: '301, 3RD FLOOR, PRATAP CHAMBERS, GURUDWARA ROAD, KAROL BAGH',
      city: 'New Delhi',
      state: 'Delhi',
      postalCode: '110005',
      country: 'India'
    },
    contact: {
      phone: '+91-8178653316',
      email: 'Info@nextgenregistry.com',
      website: 'https://www.nextgenregistry.com'
    },
    registration: {
      cin: 'U66190DL2024PTC431604',
      sebi: 'INR000004422',
      nsdl: 'IN201177',
      cdsl: '000510'
    }
  },

  // Structured Data
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'NextGen Share Registry Pvt Ltd',
    alternateName: 'NextGen RTA',
    description: 'SEBI Registered Registrar & Share Transfer Agent specializing in ISIN generation, demat services, and corporate actions with 27+ years of experience.',
    url: 'https://www.nextgenregistry.com',
    logo: 'https://www.nextgenregistry.com/assets/images/new-logo.png',
    image: 'https://www.nextgenregistry.com/assets/images/new-logo.png',
    telephone: '+91-8178653316',
    email: 'Info@nextgenregistry.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '301, 3RD FLOOR, PRATAP CHAMBERS, GURUDWARA ROAD, KAROL BAGH',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110005',
      addressCountry: 'IN'
    },
    foundingDate: '2010',
    numberOfEmployees: '50-100',
    serviceArea: {
      '@type': 'Country',
      name: 'India'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'RTA Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ISIN Creation Services',
            description: 'Complete ISIN generation for equities, preference shares, debentures, and AIFs'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Demat Services',
            description: 'Comprehensive dematerialization services and maintenance'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate Actions',
            description: 'Complete corporate action processing and management'
          }
        }
      ]
    },
    sameAs: [
      'https://www.sebi.gov.in/',
      'https://www.nsdl.co.in/',
      'https://www.cdsl.co.in/'
    ]
  }
}

export const generateMetadata = (page?: {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
}) => {
  const title = page?.title 
    ? `${page.title} | ${seoConfig.company.name}`
    : seoConfig.title
  
  const description = page?.description || seoConfig.description
  const keywords = page?.keywords 
    ? [...seoConfig.keywords, ...page.keywords]
    : seoConfig.keywords
  const image = page?.image || seoConfig.image
  const url = page?.url 
    ? `${seoConfig.siteUrl}${page.url}`
    : seoConfig.siteUrl

  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.author,
    publisher: seoConfig.company.name,
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      title,
      description,
      siteName: seoConfig.company.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${seoConfig.company.name} - ${title}`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: seoConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  }
}
