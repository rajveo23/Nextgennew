'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// Counter Animation Hook
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

export default function Hero() {
  const yearsCount = useCounter(27, 2000)
  const clientsCount = useCounter(1500, 2500)
  const accuracyCount = useCounter(99.9, 2000)

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              NextGen - RTA<br />
              <span className="text-emerald-300">SEBI Registered</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Premier Registrar & Share Transfer Agent for Demat & ISIN Services. Specializing in ISIN generation, demat services, corporate actions, and e-voting with 27+ years experience
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/contact"
                className="px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-center focus:outline-2 focus:outline-offset-2 focus:outline-white min-h-[44px] flex items-center justify-center"
                aria-label="Get Started - Contact us for RTA services"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-center focus:outline-2 focus:outline-offset-2 focus:outline-white min-h-[44px] flex items-center justify-center"
                aria-label="Learn More - About NextGen Registry"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-4 gap-6 pt-8 border-t border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center focus:outline-2 focus:outline-offset-2 focus:outline-white rounded-lg p-2" tabIndex={0} role="group" aria-label="27 plus years of experience">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-2xl font-bold text-white">{yearsCount}+</span>
                </div>
                <p className="text-xs text-gray-100">Years Experience</p>
              </div>
              <div className="text-center focus:outline-2 focus:outline-offset-2 focus:outline-white rounded-lg p-2" tabIndex={0} role="group" aria-label="1500 plus clients served">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-2xl font-bold text-white">{clientsCount}+</span>
                </div>
                <p className="text-xs text-gray-100">Clients Served</p>
              </div>
              <div className="text-center focus:outline-2 focus:outline-offset-2 focus:outline-white rounded-lg p-2" tabIndex={0} role="group" aria-label="99 percent accuracy rate">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-2xl font-bold text-white">{accuracyCount}%</span>
                </div>
                <p className="text-xs text-gray-100">Accuracy Rate</p>
              </div>
              <div className="text-center focus:outline-2 focus:outline-offset-2 focus:outline-white rounded-lg p-2" tabIndex={0} role="group" aria-label="24/7 support available">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-2xl font-bold text-white">24/7</span>
                </div>
                <p className="text-xs text-gray-100">Support Available</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main Container */}
              <div className="relative z-10 flex items-center justify-center">
                {/* Clipboard */}
                <motion.div
                  className="relative mr-8"
                  animate={{
                    rotateZ: [-2, 2, -2],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Clipboard Background */}
                  <div className="w-48 h-64 bg-white/95 rounded-lg shadow-2xl border-4 border-primary-600 relative transform rotate-[-8deg]">
                    {/* Clipboard Clip */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-primary-600 rounded-t-lg shadow-lg"></div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-primary-700 rounded-sm"></div>

                    {/* Document Content */}
                    <div className="p-6 pt-8">
                      {/* Header Lines */}
                      <div className="space-y-3 mb-6">
                        <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-3/4"></div>
                        <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-full"></div>
                        <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-5/6"></div>
                      </div>

                      {/* Content Box */}
                      <div className="w-16 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded mb-4 shadow-sm"></div>
                      <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-2/3 mb-2"></div>
                      <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-1/2"></div>

                      {/* Checkmark */}
                      <div className="absolute bottom-6 right-6">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Phone */}
                <motion.div
                  className="relative"
                  animate={{
                    rotateZ: [3, -3, 3],
                    y: [0, 8, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Phone Frame */}
                  <div className="w-32 h-56 bg-gradient-to-b from-primary-600 to-primary-700 rounded-2xl shadow-2xl relative overflow-hidden transform rotate-[12deg]">
                    {/* Screen */}
                    <div className="absolute inset-2 bg-white rounded-xl overflow-hidden shadow-inner">
                      {/* Status Bar */}
                      <div className="h-6 bg-gradient-to-r from-gray-50 to-gray-100"></div>

                      {/* Chart Content */}
                      <div className="p-4 h-full">
                        {/* Chart Bars */}
                        <div className="flex items-end justify-center space-x-2 h-20 mb-4">
                          <motion.div
                            className="w-4 bg-gradient-to-t from-blue-400 to-blue-300 rounded-t"
                            animate={{ height: [32, 40, 32] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <motion.div
                            className="w-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                            animate={{ height: [48, 56, 48] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                          />
                          <motion.div
                            className="w-4 bg-gradient-to-t from-blue-600 to-blue-500 rounded-t"
                            animate={{ height: [64, 72, 64] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                          />
                          <motion.div
                            className="w-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                            animate={{ height: [40, 48, 40] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                          />
                        </div>

                        {/* Growth Arrow */}
                        <div className="flex justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Home Button */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-primary-800 rounded-full"></div>
                  </div>
                </motion.div>
              </div>

              {/* Dollar Sign Circle - Positioned like in reference */}
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white z-20">
                <span className="text-3xl font-bold text-white">$</span>
              </div>

              {/* Background Decorations */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-400/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-400/10 rounded-full"></div>
              <div className="absolute top-1/2 -right-4 w-16 h-16 bg-secondary-400/10 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
