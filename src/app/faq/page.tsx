'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { AdminDataManager, FAQ } from '@/lib/adminData'
import { 
  ChevronDownIcon, 
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

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

const faqs = {
  general: [
    {
      question: 'What is a Registrar and Transfer Agent (RTA)?',
      answer: 'A Registrar and Transfer Agent (RTA) is a SEBI-registered entity that maintains records of shareholders and handles various services like share transfers, dividend payments, and other corporate actions on behalf of companies.'
    },
    {
      question: 'What services does NextGen Registry provide?',
      answer: 'NextGen Registry provides comprehensive RTA services including ISIN creation, maintenance of demat scrips, corporate actions, e-voting events, shareholder management, and regulatory compliance services.'
    },
    {
      question: 'How is NextGen Registry different from other RTAs?',
      answer: 'NextGen Registry stands out with 27+ years of capital market experience, fastest turnaround times in the industry, 100% SEBI compliance, and a team of certified professionals (MBAs, CFAs, FRMs) ensuring expert service delivery.'
    },
    {
      question: 'Which companies can avail NextGen Registry services?',
      answer: 'We serve listed companies, private companies, mutual funds, NBFCs, and other entities requiring RTA services across various industries throughout India.'
    },
    {
      question: 'How do I contact NextGen Registry for services?',
      answer: 'You can contact us at Info@nextgenregistry.com, call +91-8178653316 / 011-45060667, or visit our office at 301, 3rd Floor, Pratap Chambers, Gurudwara Road, Karol Bagh, New Delhi.'
    }
  ],
  isin: [
    {
      question: 'What is ISIN and why is it required?',
      answer: 'ISIN (International Securities Identification Number) is a unique 12-character code that identifies securities. It is mandatory for all securities to be traded or held in demat form and is required for listing on stock exchanges.'
    },
    {
      question: 'How long does ISIN creation take?',
      answer: 'NextGen Registry provides the fastest ISIN creation service in the industry. Typically, ISIN creation takes 3-5 working days from the submission of complete documents, subject to regulatory approvals.'
    },
    {
      question: 'What documents are required for ISIN creation?',
      answer: 'Required documents include company incorporation certificate, MOA & AOA, board resolution, auditor certificate, specimen signatures, and other specific documents based on the type of security.'
    },
    {
      question: 'Can ISIN be created for all types of securities?',
      answer: 'Yes, we create ISIN for various securities including equity shares, preference shares, debentures, bonds, mutual fund units, and Alternative Investment Fund (AIF) units.'
    },
    {
      question: 'What is the cost of ISIN creation?',
      answer: 'ISIN creation costs vary based on the type of security and specific requirements. Please contact us for detailed pricing information tailored to your needs.'
    }
  ],
  compliance: [
    {
      question: 'Is NextGen Registry SEBI registered?',
      answer: 'Yes, NextGen Registry is fully SEBI registered with registration number INR000004422 and complies with all SEBI regulations and guidelines.'
    },
    {
      question: 'How does NextGen ensure regulatory compliance?',
      answer: 'We maintain 100% compliance through regular updates on regulatory changes, automated compliance monitoring systems, and a dedicated compliance team with extensive regulatory knowledge.'
    },
    {
      question: 'What is the grievance redressal mechanism?',
      answer: 'Investors can raise grievances through nextgen.rta.investor@gmail.com, SEBI SCORES portal (https://scores.sebi.gov.in/), or Smart ODR platform (https://smartodr.in/login).'
    },
    {
      question: 'How are investor complaints handled?',
      answer: 'All investor complaints are handled promptly with acknowledgment within 24 hours and resolution within the prescribed timelines as per SEBI guidelines.'
    },
    {
      question: 'What regulatory reporting does NextGen handle?',
      answer: 'We handle all mandatory regulatory reporting including periodic returns to SEBI, stock exchanges, and depositories, ensuring timely and accurate submissions.'
    }
  ],
  process: [
    {
      question: 'What is the typical process timeline for RTA services?',
      answer: 'Process timelines vary by service: ISIN creation (3-5 days), corporate actions (as per timeline), shareholder services (1-3 days), and compliance reporting (as per regulatory schedule).'
    },
    {
      question: 'How does the onboarding process work?',
      answer: 'Onboarding involves initial consultation, documentation review, agreement signing, system setup, and service commencement. The entire process typically takes 7-10 working days.'
    },
    {
      question: 'What is the process for corporate actions?',
      answer: 'Corporate actions involve board approval, regulatory filings, record date fixation, investor communication, execution, and post-action reporting - all handled seamlessly by our team.'
    },
    {
      question: 'How are shareholders notified about corporate actions?',
      answer: 'Shareholders are notified through multiple channels including physical letters, emails, SMS, newspaper advertisements, and company website as per regulatory requirements.'
    },
    {
      question: 'What support is provided during the service period?',
      answer: 'We provide dedicated relationship management, 24/7 technical support, regular status updates, compliance monitoring, and expert consultation throughout the service period.'
    }
  ]
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load FAQs from admin data
    const loadFAQs = async () => {
      await AdminDataManager.initializeData()
      const adminFaqs: FAQ[] = await AdminDataManager.getFAQs()
    
    // Filter only active FAQs
    const activeFaqs = adminFaqs.filter((faq: FAQ) => faq.isActive)
    setFaqs(activeFaqs)
    setLoading(false)
    }
    loadFAQs()
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // Get unique categories from FAQs
  const availableCategories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]
  
  // Filter FAQs by active category
  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
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
              Find answers to common questions about our RTA services, processes, and compliance requirements
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-xl text-gray-600">
              Select a category to view related questions and answers
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {availableCategories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: activeCategory === category ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-semibold text-center">{category}</h3>
              </motion.button>
            ))}
          </div>

          {/* FAQ List */}
          <motion.div 
            className="max-w-4xl mx-auto"
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="card overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDownIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
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
