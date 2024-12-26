'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ProfileData = {
  username: string
  avatar: string
  discriminator: string
  id: string
  joinedAt: string
  roles: string[]
}

export function ProfileOverview() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    if (user) {
      // In a real application, you would fetch this data from your backend
      setProfile({
        username: user.name,
        avatar: user.avatar,
        discriminator: '1234',
        id: '123456789',
        joinedAt: '2023-01-01T00:00:00Z',
        roles: ['Member', 'Contributor']
      })
    }
  }, [user])


  if (!profile) {
    return <div>{t('profile.loading')}</div>
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('profile.title')}</CardTitle>
        <CardDescription>{t('profile.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.avatar} alt={profile.username} />
            <AvatarFallback>{profile.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{profile.username}#{profile.discriminator}</h3>
          </div>
        </div>
        <div className="space-y-2">
          <p><strong>{t('profile.username')}:</strong> {profile.username}</p>
          <p><strong>{t('profile.discordId')}:</strong> {profile.id}</p>
          <p><strong>{t('profile.joinedDiscord')}:</strong> {new Date(profile.joinedAt).toLocaleString()}</p>
          <p><strong>{t('profile.roles')}:</strong> {profile.roles.join(', ')}</p>
        </div>
      </CardContent>
    </Card>
  )
}

