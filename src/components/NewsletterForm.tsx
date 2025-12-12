'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AdminDataManager } from '../lib/adminData'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage('Please enter your email address')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Initialize data manager
      await AdminDataManager.initializeData()

      // Save newsletter subscription
      await AdminDataManager.saveNewsletterSubscription({
        email: email,
        timestamp: new Date().toISOString(),
        status: 'active',
        source: 'blog_page'
      })

      // Also save as contact submission for admin panel
      await AdminDataManager.saveContactSubmission({
        name: 'Newsletter Subscriber',
        email: email,
        message: 'Newsletter subscription from blog page',
        timestamp: new Date().toISOString(),
        status: 'new',
        source: 'newsletter',
        newsletter: true
      })

      setSubmitStatus('success')
      setEmail('')
    } catch (error) {
      setSubmitStatus('error')
      console.error('Newsletter subscription error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center"
      >
        <div className="bg-green-100 border border-green-300 text-green-700 px-6 py-4 rounded-lg">
          <h3 className="font-semibold mb-2">Successfully Subscribed!</h3>
          <p className="text-sm">Thank you for subscribing to our newsletter. You'll receive updates on RTA services and industry insights.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          disabled={isSubmitting}
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-400 disabled:opacity-50"
          aria-label="Email address for newsletter subscription"
        />
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 whitespace-nowrap rounded-lg font-semibold text-white transition-all duration-300 transform shadow-lg hover:shadow-xl ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          style={{ backgroundColor: '#12823B' }}
          onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#0f6b2f')}
          onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#12823B')}
          whileHover={!isSubmitting ? { scale: 1.05 } : {}}
          whileTap={!isSubmitting ? { scale: 0.95 } : {}}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </motion.button>
      </form>

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center"
        >
          <p className="text-sm text-red-300">
            Sorry, there was an error. Please try again.
          </p>
        </motion.div>
      )}

      <p className="text-sm mt-3 text-center" style={{ color: '#46494e' }}>
        No spam, unsubscribe at any time.
      </p>
    </div>
  )
}
