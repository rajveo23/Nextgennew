'use client'

import { useState, FormEvent } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function AccessibleForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t('nameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('emailInvalid')
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('phoneRequired')
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = t('phoneInvalid')
    }

    if (!formData.service) {
      newErrors.service = t('serviceSelectRequired')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('messageRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Announce errors to screen readers
      const statusEl = document.getElementById('statusMessage')
      if (statusEl) {
        statusEl.textContent = t('formErrors')
      }
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitStatus('success')
      const statusEl = document.getElementById('statusMessage')
      if (statusEl) {
        statusEl.textContent = t('formSuccess')
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
      setErrors({})
    } catch (error) {
      setSubmitStatus('error')
      const statusEl = document.getElementById('statusMessage')
      if (statusEl) {
        statusEl.textContent = t('formError')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg border-2 border-gray-400">
      <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
        {/* Name Field - WCAG 3.3.1 & 3.3.2 compliant */}
        <div className="mb-6">
          <label 
            htmlFor="name" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {t('fullName')} <span className="text-red-600" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 text-gray-900 ${
              errors.name ? 'border-red-600' : 'border-gray-400'
            }`}
            autoComplete="name"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-2 text-sm text-red-700 font-medium">
              ✗ {errors.name}
            </p>
          )}
        </div>

        {/* Email Field - WCAG 3.3.3 Error Suggestion */}
        <div className="mb-6">
          <label 
            htmlFor="email" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {t('emailAddress')} <span className="text-red-600" aria-label="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 text-gray-900 ${
              errors.email ? 'border-red-600' : 'border-gray-400'
            }`}
            autoComplete="email"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-2 text-sm text-red-700 font-medium">
              ✗ {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field - WCAG 3.3.3 Error Suggestion */}
        <div className="mb-6">
          <label 
            htmlFor="phone" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {t('phoneNumber')} <span className="text-red-600" aria-label="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 text-gray-900 ${
              errors.phone ? 'border-red-600' : 'border-gray-400'
            }`}
            autoComplete="tel"
            placeholder={t('phonePlaceholder')}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-2 text-sm text-red-700 font-medium">
              ✗ {errors.phone}
            </p>
          )}
        </div>

        {/* Service Selection - WCAG 3.3.1 & 3.3.2 compliant */}
        <div className="mb-6">
          <label 
            htmlFor="service" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {t('serviceRequired')} <span className="text-red-600" aria-label="required">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            aria-required="true"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 text-gray-900 ${
              errors.service ? 'border-red-600' : 'border-gray-400'
            }`}
          >
            <option value="">{t('selectService')}</option>
            <option value="isin-creation">{t('serviceIsin')}</option>
            <option value="demat-services">{t('serviceDemat')}</option>
            <option value="corporate-actions">{t('serviceCorporate')}</option>
            <option value="e-voting">{t('serviceEvoting')}</option>
            <option value="other">{t('serviceOther')}</option>
          </select>
          {errors.service && (
            <p id="service-error" role="alert" className="mt-2 text-sm text-red-700 font-medium">
              ✗ {errors.service}
            </p>
          )}
        </div>

        {/* Message Field - WCAG 3.3.1 & 3.3.2 compliant */}
        <div className="mb-6">
          <label 
            htmlFor="message" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {t('message')} <span className="text-red-600" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 text-gray-900 ${
              errors.message ? 'border-red-600' : 'border-gray-400'
            }`}
            placeholder={t('messagePlaceholder')}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-2 text-sm text-red-700 font-medium">
              ✗ {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed min-h-[44px] min-w-[120px]"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? t('submitButton') + '...' : t('submitButton')}
          </button>

          {submitStatus === 'success' && (
            <p className="text-green-700 font-medium" role="status">
              ✓ {t('formSubmittedSuccess')}
            </p>
          )}

          {submitStatus === 'error' && (
            <p className="text-red-600 font-medium" role="alert">
              ✗ {t('formError')}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
