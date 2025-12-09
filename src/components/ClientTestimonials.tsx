'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    company: 'Leading IT Company',
    industry: 'Information Technology',
    testimonial: 'NextGen Registry has been instrumental in managing our shareholder base efficiently. Their expertise in ISIN creation and corporate actions is unmatched.',
    rating: 5
  },
  {
    company: 'Major NBFC',
    industry: 'Financial Services',
    testimonial: 'The team at NextGen provides exceptional service quality. Their turnaround time for debenture management is the fastest in the industry.',
    rating: 5
  },
  {
    company: 'Pharmaceutical Giant',
    industry: 'Healthcare',
    testimonial: 'Professional, reliable, and transparent - NextGen Registry has exceeded our expectations in every aspect of RTA services.',
    rating: 5
  }
]

export default function ClientTestimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 focus:outline-2 focus:outline-offset-2 focus:outline-primary-600 rounded-lg" tabIndex={0}>
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600">
            What our clients say about our services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.company}
              className="card p-6 focus:outline-2 focus:outline-offset-2 focus:outline-primary-600"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              tabIndex={0}
              role="article"
              aria-label={`Testimonial from ${testimonial.company}`}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              <p className="text-gray-600 mb-4 italic leading-relaxed">
                "{testimonial.testimonial}"
              </p>

              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.company}</div>
                <div className="text-sm text-gray-500">{testimonial.industry}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
