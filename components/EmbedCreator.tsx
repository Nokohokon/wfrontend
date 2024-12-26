'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useLanguage } from '@/contexts/LanguageContext'
import { Embed, EmbedField } from '@/types/discord'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Preview } from '@/components/Preview'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Channel = {
  id: string
  name: string
}

type Message = {
  id: string
  content: string
}

type EmbedCreatorProps = {
  server: string
}

export const EmbedCreator: React.FC<EmbedCreatorProps> = ({ server }) => {
  const { t } = useLanguage()
  const [channels, setChannels] = useState<Channel[]>([])
  const [selectedChannel, setSelectedChannel] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [isNewMessage, setIsNewMessage] = useState(true)
  const [messageContent, setMessageContent] = useState('')
  const [embeds, setEmbeds] = useState<Embed[]>([])

  useEffect(() => {
    fetchChannels()
  }, [server])

  useEffect(() => {
    if (selectedChannel) {
      fetchMessages()
    }
  }, [selectedChannel])

  const fetchChannels = async () => {
    // In a real app, this would be an API call to your backend
    setChannels([
      { id: '1', name: 'general' },
      { id: '2', name: 'announcements' },
      { id: '3', name: 'off-topic' },
    ])
  }

  const fetchMessages = async () => {
    // In a real app, this would be an API call to your backend
    setMessages([
      { id: '1', content: 'First message' },
      { id: '2', content: 'Second message' },
      { id: '3', content: 'Third message' },
    ])
  }

  const handleChannelChange = (channelId: string) => {
    setSelectedChannel(channelId)
    setSelectedMessageId(null)
    setIsNewMessage(true)
    setMessageContent('')
    setEmbeds([])
  }

  const handleMessageChange = (messageId: string) => {
    setSelectedMessageId(messageId)
    // In a real app, you would fetch the message content and embeds here
    const selectedMsg = messages.find(msg => msg.id === messageId)
    if (selectedMsg) {
      setMessageContent(selectedMsg.content)
      // For this example, we'll just set an empty embed
      setEmbeds([{
        title: '',
        description: '',
        color: '#000000',
        fields: []
      }])
    }
  }

  const addEmbed = () => {
    setEmbeds([...embeds, {
      title: '',
      description: '',
      color: '#000000',
      fields: []
    }])
  }

  const updateEmbed = (index: number, updatedEmbed: Embed) => {
    const newEmbeds = [...embeds]
    newEmbeds[index] = updatedEmbed
    setEmbeds(newEmbeds)
  }

  const removeEmbed = (index: number) => {
    setEmbeds(embeds.filter((_, i) => i !== index))
  }

  const handleSend = () => {
    // In a real app, you would send this data to your backend
    console.log('Sending message:', {
      channelId: selectedMessageId === 'new' ? selectedChannel : null,
      messageId: selectedMessageId === 'new' ? null : selectedMessageId,
      content: messageContent,
      embeds: embeds
    })
    alert(t('embedCreator.messageSent'))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('embedCreator.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message-select">{t('embedCreator.selectMessage')}</Label>
            <Select value={selectedMessageId || ''} onValueChange={handleMessageChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('embedCreator.selectMessagePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">{t('embedCreator.newMessage')}</SelectItem>
                {messages.map((message) => (
                  <SelectItem key={message.id} value={message.id}>
                    {message.content}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedMessageId === 'new' && (
            <div className="space-y-2">
              <Label htmlFor="channel-select">{t('embedCreator.selectChannel')}</Label>
              <Select value={selectedChannel} onValueChange={handleChannelChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('embedCreator.selectChannelPlaceholder')} />
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
          )}

          <div className="space-y-2">
            <Label htmlFor="message-content">{t('embedCreator.messageContent')}</Label>
            <Textarea
              id="message-content"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder={t('embedCreator.messageContentPlaceholder')}
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t('embedCreator.embeds')}</h3>
              <Button onClick={addEmbed} className="bg-primary text-primary-foreground hover:bg-primary/90">{t('embedCreator.addEmbed')}</Button>
            </div>
            {embeds.map((embed, index) => (
              <EmbedEditor
                key={index}
                embed={embed}
                onEmbedChange={(updatedEmbed) => updateEmbed(index, updatedEmbed)}
                onRemove={() => removeEmbed(index)}
                index={index}
              />
            ))}
          </div>

          <Button onClick={handleSend} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">{t('embedCreator.sendMessage')}</Button>
        </CardContent>
      </Card>

      <Preview message={{ content: messageContent, embeds }} />
    </div>
  )
}

type EmbedEditorProps = {
  embed: Embed
  onEmbedChange: (embed: Embed) => void
  onRemove: () => void
  index: number
}

const EmbedEditor: React.FC<EmbedEditorProps> = ({ embed, onEmbedChange, onRemove, index }) => {
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onEmbedChange({ ...embed, [name]: value })
  }

  const addField = () => {
    onEmbedChange({
      ...embed,
      fields: [...(embed.fields || []), { name: '', value: '', inline: false }],
    })
  }

  const updateField = (index: number, key: keyof EmbedField, value: string | boolean) => {
    const newFields = [...(embed.fields || [])]
    newFields[index] = { ...newFields[index], [key]: value }
    onEmbedChange({ ...embed, fields: newFields })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{t('embedCreator.embed')} {index + 1}</CardTitle>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </Button>
            <Button variant="destructive" size="sm" onClick={onRemove}>
              {t('embedCreator.removeEmbed')}
            </Button>
          </div>
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`title-${index}`}>{t('embedCreator.emtitle')}</Label>
            <Input id={`title-${index}`} name="title" value={embed.title} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>{t('embedCreator.description')}</Label>
            <Textarea id={`description-${index}`} name="description" value={embed.description} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`color-${index}`}>{t('embedCreator.color')}</Label>
            <Input id={`color-${index}`} name="color" type="color" value={embed.color} onChange={handleChange} />
          </div>
          <div>
            <Button onClick={addField}>{t('embedCreator.addField')}</Button>
          </div>
          {embed.fields && embed.fields.map((field, fieldIndex) => (
            <div key={fieldIndex} className="space-y-2 p-2 border rounded">
              <Input
                placeholder={t('embedCreator.fieldName')}
                value={field.name}
                onChange={e => updateField(fieldIndex, 'name', e.target.value)}
              />
              <Input
                placeholder={t('embedCreator.fieldValue')}
                value={field.value}
                onChange={e => updateField(fieldIndex, 'value', e.target.value)}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`inline-${index}-${fieldIndex}`}
                  checked={field.inline}
                  onCheckedChange={checked => updateField(fieldIndex, 'inline', checked as boolean)}
                />
                <Label htmlFor={`inline-${index}-${fieldIndex}`}>{t('embedCreator.fieldInline')}</Label>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  )
}

