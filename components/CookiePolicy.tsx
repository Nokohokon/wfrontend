import { useLanguage } from '@/contexts/LanguageContext'

export function CookiePolicy() {
  const { t } = useLanguage()

  const cookieTypes = [
    {
      name: t('cookiePolicy.essential.name'),
      description: t('cookiePolicy.essential.description'),
      duration: t('cookiePolicy.essential.duration'),
      provider: t('cookiePolicy.essential.provider'),
    },
    {
      name: t('cookiePolicy.preferences.name'),
      description: t('cookiePolicy.preferences.description'),
      duration: t('cookiePolicy.preferences.duration'),
      provider: t('cookiePolicy.preferences.provider'),
    },
  ]

  return (
    <div className="space-y-6">
      <p>{t('cookiePolicy.intro')}</p>
      {cookieTypes.map((cookie, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold">{cookie.name}</h3>
          <p>{cookie.description}</p>
          <p><strong>{t('cookiePolicy.duration')}:</strong> {cookie.duration}</p>
          <p><strong>{t('cookiePolicy.provider')}:</strong> {cookie.provider}</p>
        </div>
      ))}
    </div>
  )
}

