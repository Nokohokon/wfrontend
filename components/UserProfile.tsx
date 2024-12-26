'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

type User = {
  id: string
  name: string
  avatar: string
}

type Punishment = {
  id: string
  type: string
  reason: string
  date: string
  moderator: string
}

type UserProfileProps = {
  user: User
  onClose: () => void
  server: string
}

export function UserProfile({ user, onClose, server }: UserProfileProps) {
  const { t } = useLanguage()
  const [userDetails, setUserDetails] = useState<any>(null)
  const [punishments, setPunishments] = useState<Punishment[]>([])

  useEffect(() => {
    fetchUserDetails()
    fetchPunishments()
  }, [user.id, server])

  const fetchUserDetails = async () => {
    // In a real application, this would be an API call to your backend
    setUserDetails({
      id: user.id,
      name: user.name,
      discriminator: '1234',
      joinedAt: '2023-01-01T00:00:00Z',
      roles: ['Member', 'Contributor'],
    })
  }

  const fetchPunishments = async () => {
    // In a real application, this would be an API call to your backend
    setPunishments([
      { id: '1', type: 'warn', reason: 'Spamming', date: '2023-04-01T10:00:00Z', moderator: 'Mod1' },
      { id: '2', type: 'mute', reason: 'Inappropriate language', date: '2023-04-15T14:30:00Z', moderator: 'Mod2' },
    ])
  }

  if (!userDetails) {
    return <div>{t('profile.loading')}</div>
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('profile.userProfile')}</CardTitle>
          <Button variant="ghost" onClick={onClose}>{t('profile.close')}</Button>
        </div>
        <CardDescription>{t('profile.userProfileDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{user.name}#{userDetails.discriminator}</h3>
            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p><strong>{t('profile.joinedServer')}:</strong> {new Date(userDetails.joinedAt).toLocaleString()}</p>
          <p><strong>{t('profile.roles')}:</strong> {userDetails.roles.join(', ')}</p>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">{t('profile.punishmentHistory')}</h4>
          {punishments.length > 0 ? (
            <ul className="space-y-2">
              {punishments.map((punishment) => (
                <li key={punishment.id} className="bg-accent p-2 rounded">
                  <p><strong>{t('profile.punishmentType')}:</strong> {punishment.type}</p>
                  <p><strong>{t('profile.reason')}:</strong> {punishment.reason}</p>
                  <p><strong>{t('profile.date')}:</strong> {new Date(punishment.date).toLocaleString()}</p>
                  <p><strong>{t('profile.moderator')}:</strong> {punishment.moderator}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>{t('profile.noPunishments')}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

