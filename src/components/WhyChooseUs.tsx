'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  ClockIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

const reasons = [
  {
    icon: ClockIcon,
    title: 'Fastest Turnaround Time',
    description: 'Industry-leading speed in ISIN creation and RTA services with unmatched efficiency.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'SEBI Compliance',
    description: 'Fully SEBI registered and compliant with all regulatory requirements and standards.'
  },
  {
    icon: UserGroupIcon,
    title: 'Expert Team',
    description: 'Team of MBAs, CFAs, FRMs with deep capital market expertise and experience.'
  },
  {
    icon: ChartBarIcon,
    title: 'Data Analysis',
    description: 'Advanced data analysis capabilities for better decision making and insights.'
  },
  {
    icon: GlobeAltIcon,
    title: 'PAN India Coverage',
    description: 'Comprehensive service coverage across India with local expertise and support.'
  },
  {
    icon: AcademicCapIcon,
    title: '27+ Years Experience',
    description: 'Cumulative capital market experience bringing stability and reliability.'
  }
]

const values = [
  {
    title: 'Our Mission',
    description: 'To revolutionize the RTA industry by making it more transparent and easier for companies to operate with a reputable and capable RTA partner.',
    color: 'from-primary-500 to-primary-700'
  },
  {
    title: 'Our Values',
    description: 'Transparency, reliability, and excellence in every service we provide, ensuring the highest standards of professional integrity.',
    color: 'from-secondary-500 to-secondary-700'
  },
  {
    title: 'Our Vision',
    description: 'To be the most renowned Registrars to an Issue and Share Transfer Agent in India, setting new benchmarks in the industry.',
    color: 'from-purple-500 to-purple-700'
  }
]

export default function WhyChooseUs() {
  // Counter animation that starts only when active is true (in-view)
  const useCounter = (end: number, duration: number, active: boolean) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!active) {
        setCount(0)
        return
      }

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
    }, [end, duration, active])

    return count
  }

  // Observe stats section visibility
  const statsRef = useRef<HTMLDivElement | null>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  const yearsCount = useCounter(27, 2000, statsInView)
  const clientsCount = useCounter(1500, 2500, statsInView)
  const accuracyCount = useCounter(100, 2000, statsInView) // animate to 100, show 99.9%
  return (
    <section aria-labelledby="whychoose-heading" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Choose Us Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 id="whychoose-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-gradient">NextGen</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            As your Registrar & Transfer Agent, we bring unmatched expertise and reliability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card p-6 h-full focus:outline-2 focus:outline-offset-2 focus:outline-primary-600" tabIndex={0} role="article" aria-label={reason.title}>
                <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <reason.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {reason.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission, Values, Vision Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">Foundation</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="relative overflow-hidden rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`bg-gradient-to-br ${value.color} p-8 text-white h-full focus:outline-2 focus:outline-offset-2 focus:outline-white rounded-xl`} tabIndex={0} role="article" aria-label={value.title}>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-white/90 leading-relaxed">{value.description}</p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" aria-hidden="true"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" aria-hidden="true"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-20 bg-gray-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 rounded-lg p-2" tabIndex={0} role="group" aria-label="27 plus years experience">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{yearsCount}+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 rounded-lg p-2" tabIndex={0} role="group" aria-label="1500 plus clients served">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{clientsCount}+</div>
              <div className="text-gray-600">Clients Served</div>
            </div>
            <div className="focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 rounded-lg p-2" tabIndex={0} role="group" aria-label="99.9 percent accuracy rate">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{Math.min(99.9, accuracyCount)}%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 rounded-lg p-2" tabIndex={0} role="group" aria-label="24/7 support available">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
