'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Giveaway = {
  id: string
  prize: string
  winners: number
  endsAt: string
  description: string
  channel: string
}

type Channel = {
  id: string
  name: string
}

type GiveawaysProps = {
  server: string
}

export function Giveaways({ server }: GiveawaysProps) {
  const { t } = useLanguage()
  const [giveaways, setGiveaways] = useState<Giveaway[]>([])
  const [endedGiveaways, setEndedGiveaways] = useState<Giveaway[]>([])
  const [newGiveaway, setNewGiveaway] = useState<Giveaway>({
    id: '',
    prize: '',
    winners: 1,
    endsAt: '',
    description: '',
    channel: '',
  })
  const [editingGiveaway, setEditingGiveaway] = useState<Giveaway | null>(null)
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    fetchGiveaways()
    fetchChannels()
  }, [server])

  const fetchGiveaways = async () => {
    // In a real app, you'd fetch this data from your backend
    setGiveaways([
      { id: '1', prize: 'Discord Nitro', winners: 1, endsAt: '2023-06-01T00:00:00Z', description: 'Monthly giveaway', channel: '1' },
      { id: '2', prize: 'Steam Game', winners: 2, endsAt: '2023-05-15T00:00:00Z', description: 'Random steam game', channel: '2' },
    ])
    setEndedGiveaways([
      { id: '3', prize: 'Amazon Gift Card', winners: 1, endsAt: '2023-04-30T00:00:00Z', description: 'Past giveaway', channel: '1' },
    ])
  }

  const fetchChannels = async () => {
    // In a real app, you'd fetch this data from your backend
    setChannels([
      { id: '1', name: 'general' },
      { id: '2', name: 'giveaways' },
      { id: '3', name: 'announcements' },
    ])
  }

  const handleCreateGiveaway = () => {
    // In a real app, you'd send this data to your backend
    console.log('Creating giveaway:', newGiveaway)
    setGiveaways([...giveaways, { ...newGiveaway, id: Date.now().toString() }])
    setNewGiveaway({ id: '', prize: '', winners: 1, endsAt: '', description: '', channel: '' })
    alert(t('giveaways.created'))
  }

  const handleEditGiveaway = () => {
    if (editingGiveaway) {
      // In a real app, you'd send this data to your backend
      console.log('Editing giveaway:', editingGiveaway)
      setGiveaways(giveaways.map(g => g.id === editingGiveaway.id ? editingGiveaway : g))
      setEndedGiveaways(endedGiveaways.map(g => g.id === editingGiveaway.id ? editingGiveaway : g))
      setEditingGiveaway(null)
      alert(t('giveaways.edited'))
    }
  }

  const handleEndGiveaway = (id: string) => {
    // In a real app, you'd send this request to your backend
    const giveaway = giveaways.find(g => g.id === id)
    if (giveaway) {
      setGiveaways(giveaways.filter(g => g.id !== id))
      setEndedGiveaways([...endedGiveaways, giveaway])
      alert(t('giveaways.endednow'))
    }
  }

  const handleDeleteGiveaway = (id: string, isEnded: boolean) => {
    // In a real app, you'd send this request to your backend
    if (isEnded) {
      setEndedGiveaways(endedGiveaways.filter(g => g.id !== id))
    } else {
      setGiveaways(giveaways.filter(g => g.id !== id))
    }
    alert(t('giveaways.deleted'))
  }

  const handleRerollGiveaway = (id: string) => {
    // In a real app, you'd send this request to your backend
    console.log('Rerolling giveaway:', id)
    alert(t('giveaways.rerolled'))
  }

  const GiveawayForm = ({ giveaway, setGiveaway, onSubmit, submitText }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prize">{t('giveaways.prize')}</Label>
        <Input
          id="prize"
          value={giveaway.prize}
          onChange={(e) => setGiveaway({ ...giveaway, prize: e.target.value })}
          placeholder={t('giveaways.enterPrize')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="winners">{t('giveaways.winners')}</Label>
        <Input
          id="winners"
          type="number"
          min="1"
          value={giveaway.winners}
          onChange={(e) => setGiveaway({ ...giveaway, winners: parseInt(e.target.value) })}
          placeholder={t('giveaways.enterWinners')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endsAt">{t('giveaways.endsAt')}</Label>
        <Input
          id="endsAt"
          type="datetime-local"
          value={giveaway.endsAt}
          onChange={(e) => setGiveaway({ ...giveaway, endsAt: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">{t('giveaways.description')}</Label>
        <Input
          id="description"
          value={giveaway.description}
          onChange={(e) => setGiveaway({ ...giveaway, description: e.target.value })}
          placeholder={t('giveaways.enterDescription')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="channel">{t('giveaways.channel')}</Label>
        <Select value={giveaway.channel} onValueChange={(value) => setGiveaway({ ...giveaway, channel: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t('giveaways.selectChannel')} />
          </SelectTrigger>
          <SelectContent>
            {channels.map((channel) => (
              <SelectItem key={channel.id} value={channel.id}>
                {channel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSubmit} className="w-full">{submitText}</Button>
    </div>
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('giveaways.title')}</h2>
      <Card>
        <CardHeader>
          <CardTitle>{t('giveaways.create')}</CardTitle>
          <CardDescription>{t('giveaways.createDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <GiveawayForm
            giveaway={newGiveaway}
            setGiveaway={setNewGiveaway}
            onSubmit={handleCreateGiveaway}
            submitText={t('giveaways.createGiveaway')}
          />
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('giveaways.active')}</h3>
        {giveaways.map((giveaway) => (
          <Card key={giveaway.id}>
            <CardHeader>
              <CardTitle>{giveaway.prize}</CardTitle>
              <CardDescription>{giveaway.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>{t('giveaways.winners')}:</strong> {giveaway.winners}</p>
              <p><strong>{t('giveaways.endsAt')}:</strong> {new Date(giveaway.endsAt).toLocaleString()}</p>
              <p><strong>{t('giveaways.channel')}:</strong> {channels.find(c => c.id === giveaway.channel)?.name}</p>
              <div className="flex space-x-2 mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingGiveaway(giveaway)}>
                      {t('giveaways.edit')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('giveaways.edit')}</DialogTitle>
                    </DialogHeader>
                    {editingGiveaway && (
                      <GiveawayForm
                        giveaway={editingGiveaway}
                        setGiveaway={setEditingGiveaway}
                        onSubmit={handleEditGiveaway}
                        submitText={t('giveaways.saveChanges')}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <Button onClick={() => handleEndGiveaway(giveaway.id)}>{t('giveaways.end')}</Button>
                <Button variant="destructive" onClick={() => handleDeleteGiveaway(giveaway.id, false)}>{t('giveaways.delete')}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('giveaways.ended')}</h3>
        {endedGiveaways.map((giveaway) => (
          <Card key={giveaway.id}>
            <CardHeader>
              <CardTitle>{giveaway.prize}</CardTitle>
              <CardDescription>{giveaway.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>{t('giveaways.winners')}:</strong> {giveaway.winners}</p>
              <p><strong>{t('giveaways.endedAt')}:</strong> {new Date(giveaway.endsAt).toLocaleString()}</p>
              <p><strong>{t('giveaways.channel')}:</strong> {channels.find(c => c.id === giveaway.channel)?.name}</p>
              <div className="flex space-x-2 mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingGiveaway(giveaway)}>
                      {t('giveaways.edit')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('giveaways.edit')}</DialogTitle>
                    </DialogHeader>
                    {editingGiveaway && (
                      <GiveawayForm
                        giveaway={editingGiveaway}
                        setGiveaway={setEditingGiveaway}
                        onSubmit={handleEditGiveaway}
                        submitText={t('giveaways.saveChanges')}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <Button onClick={() => handleRerollGiveaway(giveaway.id)}>{t('giveaways.reroll')}</Button>
                <Button variant="destructive" onClick={() => handleDeleteGiveaway(giveaway.id, true)}>{t('giveaways.delete')}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

