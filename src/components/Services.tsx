'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  DocumentTextIcon, 
  ChartBarIcon, 
  CogIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline'

const services = [
  {
    icon: DocumentTextIcon,
    title: 'ISIN Creation Expertise',
    description: 'Specialized in ISIN generation for equities, preference shares, debentures, and AIFs with unmatched speed and accuracy.',
    features: ['Fastest turnaround time', 'SEBI compliant process', 'Expert handling']
  },
  {
    icon: ChartBarIcon,
    title: 'Maintenance of Demat Scrips',
    description: 'Complete maintenance of demat scrips in depository with regular updates and seamless connectivity.',
    features: ['Regular data updates', 'NSDL connectivity', 'Real-time monitoring']
  },
  {
    icon: CogIcon,
    title: 'Corporate Actions',
    description: 'Expert handling of complex corporate actions including dividend payments, bonus issues, and rights offerings.',
    features: ['Complex action handling', 'Timely execution', 'Regulatory compliance']
  },
  {
    icon: ShieldCheckIcon,
    title: 'E-Voting Events',
    description: 'Seamless organization of e-voting events for issuer companies with complete technical support.',
    features: ['End-to-end support', 'Secure platform', 'Real-time reporting']
  }
]

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">RTA Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive Registrar and Share Transfer Agent services with 27+ years of capital market experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="card p-6 text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              tabIndex={0}
              role="article"
              aria-label={service.title}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-primary-600 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-700 mb-6">
            Need RTA services? Contact NextGen Share Registry for expert assistance
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/contact#contact-form"
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              Get Started Today
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
