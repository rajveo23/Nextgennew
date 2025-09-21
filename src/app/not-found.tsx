'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Animation */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text">
              404
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sorry, we couldn't find the page you're looking for. 
              The page might have been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-all duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div 
            className="mt-12 pt-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Pages
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/about" className="text-primary-600 hover:text-primary-700 transition-colors">
                About Us
              </Link>
              <Link href="/services" className="text-primary-600 hover:text-primary-700 transition-colors">
                Our Services
              </Link>
              <Link href="/contact" className="text-primary-600 hover:text-primary-700 transition-colors">
                Contact Us
              </Link>
              <Link href="/rta-forms" className="text-primary-600 hover:text-primary-700 transition-colors">
                RTA Forms
              </Link>
              <Link href="/faq" className="text-primary-600 hover:text-primary-700 transition-colors">
                FAQ
              </Link>
              <Link href="/blog" className="text-primary-600 hover:text-primary-700 transition-colors">
                Blog
              </Link>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="mt-8 p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
            <p className="text-gray-600 text-sm mb-3">
              If you believe this is an error, please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-600">
              <div>📧 Info@nextgenregistry.com</div>
              <div>📞 +91-8178653316</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
