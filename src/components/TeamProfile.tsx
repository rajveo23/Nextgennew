'use client'

import { motion } from 'framer-motion'
import { AcademicCapIcon, BriefcaseIcon, TrophyIcon } from '@heroicons/react/24/outline'

const teamMembers = [
  {
    name: 'Mr. Shaivi Bansal',
    role: 'Director & Founder',
    experience: '24+ Years',
    education: 'Commerce Graduate, MBA',
    description: 'Seasoned commerce graduate with an MBA and over 24 years of experience in capital markets. He has been a Board Director at a leading stockbroking and depository firm for over 14 years, managing compliance and the Depository Division.',
    certifications: ['Multiple NISM Certifications', 'Board Director Experience', 'Compliance Expert'],
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Mr. Shivansh Bansal',
    role: 'Executive Director',
    experience: '3+ Years',
    education: 'B.COM(H), FRM, CFA Level 2',
    description: 'B.COM(H) commerce graduate with a focus on capital markets and finance, holding FRM certification and having cleared Level 2 of the CFA program. He has 3 years of capital markets experience and works in an executive role at a stockbroking and depository firm.',
    certifications: ['FRM Certification', 'CFA Level 2', 'Multiple NISM Certifications'],
    image: '/api/placeholder/300/300'
  }
]

export default function TeamProfile() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-gradient">Leadership</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced professionals with deep capital market expertise leading NextGen Registry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="card p-8 group"
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-4xl font-bold group-hover:scale-105 transition-transform duration-300">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                    <div className="flex items-center text-primary-600">
                      <BriefcaseIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{member.role}</span>
                    </div>
                    <div className="flex items-center text-secondary-600">
                      <TrophyIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{member.experience}</span>
                    </div>
                    <div className="flex items-center text-purple-600">
                      <AcademicCapIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{member.education}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {member.description}
                  </p>

                  {/* Certifications */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Certifications & Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.certifications.map((cert, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">About NextGen Share Registry Pvt Ltd</h3>
            <p className="text-lg mb-6 max-w-4xl mx-auto leading-relaxed">
              With over 27 years of cumulative Capital Market Experience, NextGen RTA strives to bring a change in the RTA industry by making it more transparent and easier for companies to operate in this space by appointing a reputable and capable RTA.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <strong>CIN:</strong> U66190DL2024PTC431604
              </div>
              <div>
                <strong>SEBI Regn. No.:</strong> INR000004422
              </div>
              <div>
                <strong>NSDL ID:</strong> IN201177
              </div>
              <div>
                <strong>Location:</strong> New Delhi, India
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
