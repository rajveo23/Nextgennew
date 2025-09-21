'use client'

import { motion } from 'framer-motion'
import { 
  TrophyIcon, 
  ShieldCheckIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const milestones = [
  {
    year: '1997',
    title: 'Foundation Years',
    description: 'Started our journey in capital markets with a vision to transform the RTA industry.'
  },
  {
    year: '2010',
    title: 'SEBI Registration',
    description: 'Obtained SEBI registration as Registrar & Share Transfer Agent (INR000004422).'
  },
  {
    year: '2015',
    title: 'Technology Integration',
    description: 'Implemented advanced technology solutions for faster and more accurate services.'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Launched comprehensive digital platforms for seamless client experience.'
  },
  {
    year: '2024',
    title: 'NextGen Registry',
    description: 'Established NextGen Share Registry Pvt Ltd to lead the next generation of RTA services.'
  }
]

const values = [
  {
    icon: ShieldCheckIcon,
    title: 'Transparency',
    description: 'We believe in complete transparency in all our operations and client interactions.'
  },
  {
    icon: TrophyIcon,
    title: 'Excellence',
    description: 'Committed to delivering excellence in every service we provide to our clients.'
  },
  {
    icon: UserGroupIcon,
    title: 'Client-Centric',
    description: 'Our clients are at the center of everything we do, driving our service innovation.'
  },
  {
    icon: ClockIcon,
    title: 'Reliability',
    description: 'Dependable services with consistent quality and timely delivery every time.'
  },
  {
    icon: ChartBarIcon,
    title: 'Innovation',
    description: 'Continuously innovating to provide cutting-edge solutions in the RTA space.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Integrity',
    description: 'Maintaining the highest standards of professional integrity and ethical practices.'
  }
]

export default function AboutPage() {
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
              About <span className="text-secondary-300">NextGen Registry</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Transforming the RTA industry with 27+ years of capital market experience, 
              making it more transparent and accessible for companies across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  With over 27 years of cumulative Capital Market Experience, NextGen RTA was founded 
                  with a mission to revolutionize the Registrar and Transfer Agent industry in India. 
                  We recognized the need for more transparent, efficient, and reliable RTA services.
                </p>
                <p>
                  Our journey began with a simple yet powerful vision: to make it easier for companies 
                  to operate in the capital markets space by providing them with a reputable and capable 
                  RTA partner. Today, we stand as a testament to that vision.
                </p>
                <p>
                  NextGen strives to be the most renowned Registrars to an Issue and Share Transfer Agent 
                  in India, backed by a capable team of MBAs, CFAs, FRMs, and industry experts who bring 
                  immense capabilities to ensure our clients are in the right hands.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Company Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                    <span>SEBI Registered (INR000004422)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                    <span>NSDL ID: IN201177</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                    <span>CIN: U66190DL2024PTC431604</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                    <span>PAN India Service Coverage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                    <span>Expert Team of Certified Professionals</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in our evolution as a leading RTA service provider
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card p-6">
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="card p-6 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the NextGen Difference?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Join hundreds of companies who trust NextGen Registry for their RTA needs
            </p>
            <motion.a 
              href="https://api.whatsapp.com/send/?phone=8178653316&text=Hi%2C+I+am+interested+in+RTA+Services&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us Today
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
