'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            NextGen Share Registry Pvt Ltd
            <br />
            <span className="text-secondary-300">
              SEBI Registered
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Registrar & Share Transfer Agent for PAN India's Shareholders
            <br />
            <span className="text-lg text-gray-300 mt-2 block">
              Specializing in ISIN generation, demat services, and e-voting events with unmatched speed and accuracy
            </span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
              Get Started
            </Link>
            <Link href="/about" className="btn-outline text-white border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
              Learn More
            </Link>
          </motion.div>

          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-300 mb-2">27+</div>
              <div className="text-gray-300">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-300 mb-2">PAN India</div>
              <div className="text-gray-300">Service Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-300 mb-2">SEBI</div>
              <div className="text-gray-300">Registered & Compliant</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}
