import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/LanguageContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PinnedMessage = {
  id: string
  content: string
  channel: string
  author: string
  pinnedAt: string
}

type PinnedMessagesProps = {
  server: string
}

export function PinnedMessages({ server }: PinnedMessagesProps) {
  const { t } = useLanguage()
  const [pinnedMessages, setPinnedMessages] = useState<PinnedMessage[]>([])
  const [filteredMessages, setFilteredMessages] = useState<PinnedMessage[]>([])
  const [filter, setFilter] = useState('')
  const [channelFilter, setChannelFilter] = useState('all') // Updated initial state

  useEffect(() => {
    fetchPinnedMessages()
  }, [server])

  useEffect(() => {
    filterMessages()
  }, [pinnedMessages, filter, channelFilter])

  const fetchPinnedMessages = async () => {
    // In a real application, this would be an API call to your backend
    setPinnedMessages([
      { id: '1', content: 'Important announcement', channel: 'general', author: 'Admin', pinnedAt: '2023-05-01T10:00:00Z' },
      { id: '2', content: 'Server rules', channel: 'rules', author: 'Moderator', pinnedAt: '2023-05-02T14:30:00Z' },
      { id: '3', content: 'Welcome message', channel: 'welcome', author: 'Bot', pinnedAt: '2023-05-03T09:15:00Z' },
    ])
  }

  const filterMessages = () => {
    let filtered = pinnedMessages
    if (filter) {
      filtered = filtered.filter(msg => 
        msg.content.toLowerCase().includes(filter.toLowerCase()) ||
        msg.author.toLowerCase().includes(filter.toLowerCase())
      )
    }
    if (channelFilter && channelFilter !== 'all') { // Updated filter condition
      filtered = filtered.filter(msg => msg.channel === channelFilter)
    }
    setFilteredMessages(filtered)
  }

  const channels: SelectItem[] = [
    { value: '', label: t('pinnedMessages.allChannels') },
    ...Array.from(new Set(pinnedMessages.map(msg => msg.channel))).map(channel => ({
      value: channel,
      label: channel
    }))
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('pinnedMessages.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Input
            placeholder={t('pinnedMessages.filterPlaceholder')}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t('pinnedMessages.filterByChannel')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('pinnedMessages.allChannels')}</SelectItem> {/* Updated Select component */}
              {Array.from(new Set(pinnedMessages.map(msg => msg.channel))).map(channel => (
                <SelectItem key={channel} value={channel}>
                  {channel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('pinnedMessages.content')}</TableHead>
              <TableHead>{t('pinnedMessages.channel')}</TableHead>
              <TableHead>{t('pinnedMessages.author')}</TableHead>
              <TableHead>{t('pinnedMessages.pinnedAt')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell>{msg.content}</TableCell>
                <TableCell>{msg.channel}</TableCell>
                <TableCell>{msg.author}</TableCell>
                <TableCell>{new Date(msg.pinnedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

