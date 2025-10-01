'use client'

import { useState, useEffect } from 'react'
import AccessibleForm from './components/AccessibleForm'
import AccessibilityStatement from './components/AccessibilityStatement'
import TextToSpeech from './components/TextToSpeech'
import LanguageSwitcher from './components/LanguageSwitcher'
import { LanguageProvider, useLanguage } from './context/LanguageContext'

function SpecialPersonWebContent() {
  const { language, t } = useLanguage()
  // Counter hook for stats
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      let startTime: number
      let animationFrame: number
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
      
      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }, [end, duration])
    
    return count
  }

  const yearsCount = useCounter(27, 2000)
  const clientsCount = useCounter(1500, 2500)
  const accuracyCount = useCounter(99, 2000)

  return (
    <>
      {/* Skip to main content link */}
      <a 
        href="#mainContent" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
      >
        {t('skipToMain')}
      </a>

      <div className="min-h-screen bg-white">
        {/* Header with semantic HTML */}
        <header role="banner" className="bg-gradient-to-r from-blue-900 to-blue-800 text-white pt-24">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-2">{t('pageTitle')}</h1>
            <p className="text-xl text-blue-100">{t('pageSubtitle')}</p>
            <p className="mt-2 text-blue-200">{t('complianceNote')}</p>
          </div>
        </header>

        {/* Navigation */}
        <nav role="navigation" aria-label="Main navigation" className="bg-blue-800 text-white border-b-2 border-blue-700">
          <div className="container mx-auto px-4">
            <ul className="flex flex-wrap gap-4 py-4">
              <li>
                <a 
                  href="#mainContent" 
                  className="hover:text-blue-200 focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded px-3 py-2 inline-block"
                >
                  {t('navHome')}
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="hover:text-blue-200 focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded px-3 py-2 inline-block"
                >
                  {t('navServices')}
                </a>
              </li>
              <li>
                <a 
                  href="#why-choose-us" 
                  className="hover:text-blue-200 focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded px-3 py-2 inline-block"
                >
                  {t('navWhyChooseUs')}
                </a>
              </li>
              <li>
                <a 
                  href="#team" 
                  className="hover:text-blue-200 focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded px-3 py-2 inline-block"
                >
                  {t('navTeam')}
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="hover:text-blue-200 focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded px-3 py-2 inline-block"
                >
                  {t('navTestimonials')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="hover:text-blue-200 focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded px-3 py-2 inline-block"
                >
                  {t('navContact')}
                </a>
              </li>
              <li>
                <a 
                  href="#accessibility" 
                  className="hover:text-blue-200 focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded px-3 py-2 inline-block"
                >
                  {t('navAccessibility')}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main id="mainContent" tabIndex={-1} className="focus:outline-none">
          {/* Status message live region */}
          <div 
            role="status" 
            aria-live="polite" 
            id="statusMessage" 
            className="sr-only"
            aria-atomic="true"
          ></div>

          {/* Hero Section */}
          <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl relative">
                {/* Language Switcher and Text-to-Speech in Top Right */}
                <div className="absolute top-0 right-0 flex items-center gap-3">
                  <LanguageSwitcher />
                  <TextToSpeech />
                </div>
                
                <h2 id="hero-heading" className="text-4xl md:text-5xl font-bold mb-6">
                  {t('heroHeading')}
                </h2>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                  {t('heroDescription')}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mb-12">
                  <a 
                    href="#contact" 
                    className="px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors min-h-[44px] inline-flex items-center"
                  >
                    {t('getStarted')}
                  </a>
                  <a 
                    href="#services" 
                    className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 focus:outline-2 focus:outline-offset-2 focus:outline-white transition-colors min-h-[44px] inline-flex items-center"
                  >
                    {t('learnMore')}
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-blue-600">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2" aria-label={`${yearsCount} plus years experience`}>
                      {yearsCount}+
                    </div>
                    <p className="text-sm text-blue-200">{t('yearsExperience')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2" aria-label={`${clientsCount} plus clients served`}>
                      {clientsCount}+
                    </div>
                    <p className="text-sm text-blue-200">{t('clientsServed')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2" aria-label="99.9 percent accuracy rate">
                      {accuracyCount}.9%
                    </div>
                    <p className="text-sm text-blue-200">{t('accuracyRate')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2" aria-label="24/7 support available">
                      24/7
                    </div>
                    <p className="text-sm text-blue-200">{t('supportAvailable')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" aria-labelledby="services-heading" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                {t('servicesHeading')}
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                {t('servicesSubheading')}
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <article className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('service1Title')}</h3>
                  <p className="text-gray-700 mb-4">
                    {t('service1Desc')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service1Point1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service1Point2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service1Point3')}</span>
                    </li>
                  </ul>
                </article>

                <article className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('service2Title')}</h3>
                  <p className="text-gray-700 mb-4">
                    {t('service2Desc')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service2Point1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service2Point2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service2Point3')}</span>
                    </li>
                  </ul>
                </article>

                <article className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('service3Title')}</h3>
                  <p className="text-gray-700 mb-4">
                    {t('service3Desc')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service3Point1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service3Point2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service3Point3')}</span>
                    </li>
                  </ul>
                </article>

                <article className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('service4Title')}</h3>
                  <p className="text-gray-700 mb-4">
                    {t('service4Desc')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service4Point1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service4Point2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                      <span>{t('service4Point3')}</span>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section id="why-choose-us" aria-labelledby="why-heading" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 id="why-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                {t('whyHeading')}
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                {t('whySubheading')}
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('why1Title')}</h3>
                  <p className="text-gray-700">
                    {t('why1Desc')}
                  </p>
                </article>

                <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('why2Title')}</h3>
                  <p className="text-gray-700">
                    {t('why2Desc')}
                  </p>
                </article>

                <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('why3Title')}</h3>
                  <p className="text-gray-700">
                    {t('why3Desc')}
                  </p>
                </article>

                <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('why4Title')}</h3>
                  <p className="text-gray-700">
                    {t('why4Desc')}
                  </p>
                </article>

                <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('why5Title')}</h3>
                  <p className="text-gray-700">
                    {t('why5Desc')}
                  </p>
                </article>

                <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('why6Title')}</h3>
                  <p className="text-gray-700">
                    {t('why6Desc')}
                  </p>
                </article>
              </div>

              {/* Mission, Vision, Values */}
              <div className="grid md:grid-cols-3 gap-8">
                <article className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('missionTitle')}</h3>
                  <p className="text-blue-50">
                    {t('missionDesc')}
                  </p>
                </article>

                <article className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('valuesTitle')}</h3>
                  <p className="text-purple-50">
                    {t('valuesDesc')}
                  </p>
                </article>

                <article className="bg-gradient-to-br from-green-600 to-green-800 text-white rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('visionTitle')}</h3>
                  <p className="text-green-50">
                    {t('visionDesc')}
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" aria-labelledby="team-heading" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 id="team-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                {t('teamHeading')}
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                {t('teamSubheading')}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <article className="bg-white border border-gray-300 rounded-lg p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('name1')}</h3>
                    <p className="text-lg text-blue-600 font-semibold mb-4">{t('directorFounder')}</p>
                    
                    <div className="space-y-2 mb-4 text-gray-700">
                      <p><strong>{t('experience')}:</strong> 24+ {t('years')}</p>
                      <p><strong>{t('education')}:</strong> {t('education1')}</p>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {t('team1Desc')}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{t('keyCertifications')}:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                          <span>{t('team1Cert1')}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                          <span>{t('team1Cert2')}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                          <span>{t('team1Cert3')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>

                <article className="bg-white border border-gray-300 rounded-lg p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('name2')}</h3>
                    <p className="text-lg text-blue-600 font-semibold mb-4">{t('executiveDirector')}</p>
                    
                    <div className="space-y-2 mb-4 text-gray-700">
                      <p><strong>{t('experience')}:</strong> 3+ {t('years')}</p>
                      <p><strong>{t('education')}:</strong> {t('education2')}</p>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {t('team2Desc')}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{t('keyCertifications')}:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                          <span>{t('team2Cert1')}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                          <span>{t('team2Cert2')}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2" aria-hidden="true">•</span>
                          <span>{t('team2Cert3')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
              </div>

              {/* Company Info */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">{t('companyInfoTitle')}</h3>
                <p className="text-lg text-center mb-6 max-w-4xl mx-auto leading-relaxed">
                  {t('companyInfoDesc')}
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-center">
                  <div>
                    <strong>CIN:</strong> U66190DL2024PTC431604
                  </div>
                  <div>
                    <strong>SEBI Regn. No.:</strong> INR000004422
                  </div>
                  <div>
                    <strong>NSDL ID:</strong> IN201177
                  </div>
                  <div>
                    <strong>CDSL ID:</strong> 000510
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" aria-labelledby="testimonials-heading" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                {t('testimonialsHeading')}
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                {t('testimonialsSubheading')}
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex mb-4" aria-label="5 star rating">
                    <span className="text-yellow-500 text-2xl" aria-hidden="true">★★★★★</span>
                  </div>
                  <p className="text-gray-700 mb-4 italic leading-relaxed">
                    "{t('testimonial1')}"
                  </p>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="font-semibold text-gray-900">{t('testimonial1Company')}</p>
                    <p className="text-sm text-gray-600">{t('testimonial1Industry')}</p>
                  </div>
                </article>

                <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex mb-4" aria-label="5 star rating">
                    <span className="text-yellow-500 text-2xl" aria-hidden="true">★★★★★</span>
                  </div>
                  <p className="text-gray-700 mb-4 italic leading-relaxed">
                    "{t('testimonial2')}"
                  </p>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="font-semibold text-gray-900">{t('testimonial2Company')}</p>
                    <p className="text-sm text-gray-600">{t('testimonial2Industry')}</p>
                  </div>
                </article>

                <article className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex mb-4" aria-label="5 star rating">
                    <span className="text-yellow-500 text-2xl" aria-hidden="true">★★★★★</span>
                  </div>
                  <p className="text-gray-700 mb-4 italic leading-relaxed">
                    "{t('testimonial3')}"
                  </p>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="font-semibold text-gray-900">{t('testimonial3Company')}</p>
                    <p className="text-sm text-gray-600">{t('testimonial3Industry')}</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Accessible Form Section */}
          <section id="contact" aria-labelledby="contact-heading" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                {t('contactHeading')}
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                {t('contactSubheading')}
              </p>
              <AccessibleForm />
            </div>
          </section>

          {/* Accessibility Statement */}
          <section id="accessibility" aria-labelledby="accessibility-heading" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 id="accessibility-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                {t('accessibilityHeading')}
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                {t('accessibilitySubheading')}
              </p>
              <AccessibilityStatement />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer role="contentinfo" className="bg-gray-900 text-white mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('footerContact')}</h3>
                <address className="not-italic text-gray-300">
                  <p>NextGen Share Registry Pvt Ltd</p>
                  <p>301, 3rd Floor, Pratap Chambers</p>
                  <p>Gurudwara Road, Karol Bagh</p>
                  <p>New Delhi - 110005</p>
                  <p className="mt-2">
                    Phone: <a href="tel:+918178653316" className="hover:text-blue-400 focus:outline-2 focus:outline-offset-2 focus:outline-white">+91-8178653316</a>
                  </p>
                  <p>
                    Email: <a href="mailto:Info@nextgenregistry.com" className="hover:text-blue-400 focus:outline-2 focus:outline-offset-2 focus:outline-white">Info@nextgenregistry.com</a>
                  </p>
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('footerQuickLinks')}</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#services" className="hover:text-blue-400 focus:outline-2 focus:outline-offset-2 focus:outline-white">{t('navServices')}</a></li>
                  <li><a href="#contact" className="hover:text-blue-400 focus:outline-2 focus:outline-offset-2 focus:outline-white">{t('navContact')}</a></li>
                  <li><a href="#accessibility" className="hover:text-blue-400 focus:outline-2 focus:outline-offset-2 focus:outline-white">{t('navAccessibility')}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('footerAccessibilitySupport')}</h3>
                <p className="text-gray-300 mb-2">
                  {t('footerAccessibilityText')}
                </p>
                <p>
                  <a 
                    href="mailto:accessibility@nextgenregistry.com" 
                    className="text-blue-400 hover:text-blue-300 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                  >
                    accessibility@nextgenregistry.com
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} NextGen Share Registry Pvt Ltd. {t('footerRights')}.</p>
              <p className="mt-2">SEBI Registration: INR000004422 | CIN: U66190DL2024PTC431604</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default function SpecialPersonWeb() {
  return (
    <LanguageProvider>
      <SpecialPersonWebContent />
    </LanguageProvider>
  )
}
