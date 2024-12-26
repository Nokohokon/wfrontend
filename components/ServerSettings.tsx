'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLanguage } from '@/contexts/LanguageContext'

type ServerSettingsProps = {
  server: string
}

export function ServerSettings({ server }: ServerSettingsProps) {
  const { t } = useLanguage()
  const [botNickname, setBotNickname] = useState('')
  const [botCommanderRole, setBotCommanderRole] = useState('')
  const [roles, setRoles] = useState(['Admin', 'Moderator', 'Member']) // This would be fetched from the server in a real app

  const handleSaveSettings = () => {
    // In a real app, you'd send this data to your backend
    console.log('Saving settings:', { botNickname, botCommanderRole })
    alert(t('settings.saved'))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('settings.serverSettings', { server })}</h2>
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
          <Label htmlFor="bot-commander-role">{t('settings.botCommanderRole')}</Label>
          <Select onValueChange={setBotCommanderRole} value={botCommanderRole}>
            <SelectTrigger id="bot-commander-role">
              <SelectValue placeholder={t('settings.selectRole')} />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleSaveSettings}>{t('settings.saveSettings')}</Button>
    </div>
  )
}

