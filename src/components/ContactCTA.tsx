'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function ContactCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-48 h-48 bg-secondary-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Contact NextGen Share Registry for expert RTA services and experience the difference of working with industry leaders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8 max-w-md mx-auto lg:mx-0">
              <div className="flex items-start space-x-4 justify-center lg:justify-start">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                  <p className="text-gray-200">+91-8178653316</p>
                  <p className="text-gray-200">011-45060667</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 justify-center lg:justify-start">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                  <p className="text-gray-200">Info@nextgenregistry.com</p>
                  <p className="text-gray-200 text-sm mt-1">
                    Grievances: nextgen.rta.investor@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 justify-center lg:justify-start">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
                  <p className="text-gray-200 leading-relaxed">
                    301, 3RD FLOOR, PRATAP CHAMBERS,<br />
                    GURUDWARA ROAD, KAROL BAGH,<br />
                    New Delhi, 110005
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 max-w-md mx-auto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="btn-secondary text-lg px-8 py-4 inline-block w-full sm:w-auto">
                  Contact Us Today
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/rta-forms" className="btn-outline text-white border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 inline-block w-full sm:w-auto">
                  Download RTA Forms
                </Link>
              </motion.div>

              <div className="pt-6 border-t border-white/20">
                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Link href="https://scores.sebi.gov.in/" className="text-gray-200 hover:text-white transition-colors">
                    SEBI SCORES
                  </Link>
                  <Link href="https://smartodr.in/login" className="text-gray-200 hover:text-white transition-colors">
                    Smart ODR
                  </Link>
                  <Link href="/faq" className="text-gray-200 hover:text-white transition-colors">
                    FAQ
                  </Link>
                  <Link href="/blog" className="text-gray-200 hover:text-white transition-colors">
                    Blog
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Regulatory Links */}
        <motion.div 
          className="mt-16 pt-8 border-t border-white/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="text-center text-lg font-semibold text-white mb-6">Regulatory Partners</h4>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { name: 'SEBI', url: 'https://www.sebi.gov.in/' },
              { name: 'NSE', url: 'https://www.nseindia.com/' },
              { name: 'BSE', url: 'https://www.bseindia.com/' },
              { name: 'NCDEX', url: 'https://www.ncdex.com/' },
              { name: 'MCX', url: 'https://www.mcxindia.com/' },
              { name: 'RBI', url: 'https://www.rbi.org.in/' }
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.url}
                className="text-gray-200 hover:text-white transition-colors px-3 py-1 border border-white/20 rounded-full hover:border-white/40"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
