'use client'

import React, { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { Navbar } from './components/Navbar'
import { EmbedCreator } from './components/EmbedCreator'
import { Preview } from './components/Preview'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { DiscordMessage, Embed } from './types/discord'

const defaultEmbed: Embed = {
  title: '',
  titleUrl: '',
  description: '',
  color: '#000000',
  authorName: '',
  authorIconUrl: '',
  thumbnail: '',
  image: '',
  footer: '',
  footerIconUrl: '',
  fields: [],
}

function DashboardContent() {
  const [message, setMessage] = useState<DiscordMessage>({
    content: '',
    embeds: [],
  })

  const handleMessageContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(prev => ({ ...prev, content: e.target.value }))
  }

  const addEmbed = () => {
    setMessage(prev => ({
      ...prev,
      embeds: [...prev.embeds, { ...defaultEmbed }],
    }))
  }

  const updateEmbed = (index: number, updatedEmbed: Embed) => {
    setMessage(prev => {
      const newEmbeds = [...prev.embeds]
      newEmbeds[index] = updatedEmbed
      return { ...prev, embeds: newEmbeds }
    })
  }

  const removeEmbed = (index: number) => {
    setMessage(prev => ({
      ...prev,
      embeds: prev.embeds.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="messageContent">Message Content</Label>
            <Textarea
              id="messageContent"
              value={message.content}
              onChange={handleMessageContentChange}
              placeholder="Enter your message content"
              rows={4}
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Embeds</h2>
              <Button onClick={addEmbed}>Add Embed</Button>
            </div>
            {message.embeds.map((embed, index) => (
              <EmbedCreator
                key={index}
                embed={embed}
                onEmbedChange={(updatedEmbed) => updateEmbed(index, updatedEmbed)}
                onRemove={() => removeEmbed(index)}
                index={index}
              />
            ))}
          </div>
          <Preview message={message} />
        </div>
      </main>
    </div>
  )
}

export default function Dashboard() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <DashboardContent />
      </ThemeProvider>
    </LanguageProvider>
  )
}

