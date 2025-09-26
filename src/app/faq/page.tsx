'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ChevronDownIcon, 
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const faqCategories = [
  {
    id: 'general',
    title: 'General RTA Services',
    icon: QuestionMarkCircleIcon,
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'isin',
    title: 'ISIN Creation',
    icon: DocumentTextIcon,
    color: 'from-green-500 to-green-700'
  },
  {
    id: 'compliance',
    title: 'Compliance & Regulations',
    icon: ShieldCheckIcon,
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 'process',
    title: 'Process & Timeline',
    icon: ClockIcon,
    color: 'from-orange-500 to-orange-700'
  }
]

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('/api/faqs')
        if (response.ok) {
          const data = await response.json()
          setFaqs(data)
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFAQs()
  }, [])

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]
  
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs.filter(faq => faq.isActive)
    : faqs.filter(faq => faq.category === selectedCategory && faq.isActive)

  const sortedFAQs = filteredFAQs.sort((a, b) => a.order - b.order)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section - Same as RTA Forms */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-secondary-300">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Find answers to common questions about our RTA services, ISIN creation, and compliance requirements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter - Same style as RTA Forms */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* FAQ List */}
        <div className="space-y-4">
          {sortedFAQs.length === 0 ? (
            <div className="text-center py-12">
              <QuestionMarkCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No FAQs found for the selected category.</p>
            </div>
          ) : (
            sortedFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDownIcon 
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      expandedFAQ === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-200"
                    >
                      <div className="px-6 py-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                        {faq.category && (
                          <div className="mt-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              {faq.category}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <QuestionMarkCircleIcon className="w-16 h-16 mx-auto mb-6 text-primary-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Can't find the answer you're looking for? Our expert team is here to help you with any queries about our RTA services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact"
                  className="btn-primary text-lg px-8 py-4 inline-block"
                >
                  Contact Support
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact#contact-form"
                  className="btn-outline text-lg px-8 py-4 inline-block"
                >
                  Schedule Call
                </Link>
              </motion.div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Contact</h4>
              <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-600">
                <div>📧 Info@nextgenregistry.com</div>
                <div>📞 +91-8178653316 / 011-45060667</div>
                <div>🕒 Mon-Fri: 9:00 AM - 6:00 PM</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
