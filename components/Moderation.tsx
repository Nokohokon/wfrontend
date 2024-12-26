'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLanguage } from '@/contexts/LanguageContext'
import { UserProfile } from './UserProfile'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type User = {
  id: string
  name: string
  avatar: string
}

type ModerationProps = {
  server: string
}

export function Moderation({ server }: ModerationProps) {
  const { t } = useLanguage()
  const [action, setAction] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [reason, setReason] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [showUserProfile, setShowUserProfile] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [server])

  const fetchUsers = async () => {
    // In a real application, this would be an API call to your backend
    setUsers([
      { id: '1', name: 'User 1', avatar: '/placeholder.svg?height=40&width=40' },
      { id: '2', name: 'User 2', avatar: '/placeholder.svg?height=40&width=40' },
      { id: '3', name: 'User 3', avatar: '/placeholder.svg?height=40&width=40' },
    ])
  }

  const handleModeration = () => {
    if (!selectedUser) {
      alert(t('moderation.selectUser'))
      return
    }
    // In a real app, you'd send this data to your backend
    console.log('Moderation action:', { action, userId: selectedUser.id, reason })
    alert(t('moderation.actionTaken'))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('moderation.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('moderation.userList')}</CardTitle>
            <CardDescription>{t('moderation.selectUserDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                    selectedUser?.id === user.id ? 'bg-accent' : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedUser(user)
                      setShowUserProfile(true)
                    }}
                  >
                    {t('moderation.viewProfile')}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('moderation.takeAction')}</CardTitle>
            <CardDescription>{t('moderation.actionDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="action">{t('moderation.action')}</Label>
                <Select onValueChange={setAction} value={action}>
                  <SelectTrigger id="action">
                    <SelectValue placeholder={t('moderation.selectAction')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warn">{t('moderation.warn')}</SelectItem>
                    <SelectItem value="mute">{t('moderation.mute')}</SelectItem>
                    <SelectItem value="kick">{t('moderation.kick')}</SelectItem>
                    <SelectItem value="ban">{t('moderation.ban')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">{t('moderation.reason')}</Label>
                <Input
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t('moderation.enterReason')}
                />
              </div>
              <Button onClick={handleModeration} className="w-full">{t('moderation.takeAction')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={showUserProfile} onOpenChange={setShowUserProfile}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t('profile.userProfile')}</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <UserProfile
              user={selectedUser}
              onClose={() => setShowUserProfile(false)}
              server={server}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

