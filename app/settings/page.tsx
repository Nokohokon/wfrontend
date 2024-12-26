'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SettingsPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [botNickname, setBotNickname] = useState('')
  const [commandPrefix, setCommandPrefix] = useState('!')
  const [activityStatus, setActivityStatus] = useState('online')

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (!loggedIn) {
      router.push('/login')
    } else {
      setIsLoggedIn(true)
      // In a real app, you'd fetch these settings from your backend
      setBotNickname('MyAwesomeBot')
      setCommandPrefix('!')
      setActivityStatus('online')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  const handleSaveSettings = () => {
    // In a real app, you'd save these settings to your backend
    console.log('Saving settings:', { botNickname, commandPrefix, activityStatus })
    alert('Settings saved successfully!')
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bot-nickname">{t('settings.botNickname')}</Label>
          <Input
            id="bot-nickname"
            value={botNickname}
            onChange={(e) => setBotNickname(e.target.value)}
            placeholder={t('settings.botNicknamePlaceholder')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="command-prefix">{t('settings.commandPrefix')}</Label>
          <Input
            id="command-prefix"
            value={commandPrefix}
            onChange={(e) => setCommandPrefix(e.target.value)}
            placeholder={t('settings.commandPrefixPlaceholder')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="activity-status">{t('settings.activityStatus')}</Label>
          <Select onValueChange={setActivityStatus} value={activityStatus}>
            <SelectTrigger id="activity-status">
              <SelectValue placeholder={t('settings.selectStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">{t('settings.statusOnline')}</SelectItem>
              <SelectItem value="idle">{t('settings.statusIdle')}</SelectItem>
              <SelectItem value="dnd">{t('settings.statusDnd')}</SelectItem>
              <SelectItem value="invisible">{t('settings.statusInvisible')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="theme-toggle">{t('settings.darkMode')}</Label>
          <Switch
            id="theme-toggle"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="language-toggle">{t('settings.language')}</Label>
          <Switch
            id="language-toggle"
            checked={language === 'de'}
            onCheckedChange={() => setLanguage(language === 'en' ? 'de' : 'en')}
          />
        </div>
      </div>
      <div className="space-y-4">
        <Button onClick={handleSaveSettings} className="w-full">{t('settings.saveSettings')}</Button>
        <Button onClick={handleLogout} variant="destructive" className="w-full">{t('settings.logout')}</Button>
      </div>
    </div>
  )
}

