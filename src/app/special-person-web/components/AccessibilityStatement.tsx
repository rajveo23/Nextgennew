'use client'

import { useLanguage } from '../context/LanguageContext'

export default function AccessibilityStatement() {
  const { t } = useLanguage()
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
      <div className="prose max-w-none">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('accessibilityCommitment')}</h3>
        
        <p className="text-gray-700 mb-4">
          {t('accessibilityIntro')}
        </p>

        <h4 className="text-lg font-semibold text-gray-900 mb-3 mt-6">{t('conformanceStatus')}</h4>
        <p className="text-gray-700 mb-4">
          {t('conformanceIntro')}
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
          <li>{t('wcagCompliance')}</li>
          <li>{t('gigwCompliance')}</li>
          <li>{t('isCompliance')}</li>
          <li>{t('rpwdCompliance')}</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-900 mb-3 mt-6">{t('accessibilityFeaturesTitle')}</h4>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
          <li>{t('feature1')}</li>
          <li>{t('feature2')}</li>
          <li>{t('feature3')}</li>
          <li>{t('feature4')}</li>
          <li>{t('feature5')}</li>
          <li>{t('feature6')}</li>
        </ul>
      </div>
    </div>
  )
}
