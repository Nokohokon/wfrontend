'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { EmbedCreator } from '@/components/EmbedCreator'
import { Moderation } from '@/components/Moderation'
import { Giveaways } from '@/components/Giveaways'
import { ServerSettings } from '@/components/ServerSettings'
import { ServerLogs } from '@/components/ServerLogs'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { ServerStatistics } from '@/components/ServerStatistics'
import { PinnedMessages } from '@/components/PinnedMessages'
import { Separator } from '@/components/ui/separator'

export default function ServerDashboardPage() {
  const router = useRouter()
  const params = useParams()
  const { t } = useLanguage()
  const { user } = useAuth()
  const [server, setServer] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('statistics')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (params && params.server) {
      setServer(decodeURIComponent(params.server as string))
    }
  }, [user, router, params])

  if (!server) {
    return <div className="text-center text-primary">{t('dashboard.loading')}</div>
  }

  const tabItems = [
    { value: 'statistics', label: t('dashboard.statistics') },
    { value: 'embed-creator', label: t('dashboard.embedCreator') },
    { value: 'moderation', label: t('dashboard.moderation') },
    { value: 'giveaways', label: t('dashboard.giveaways') },
    { value: 'pinned-messages', label: t('dashboard.pinnedMessages') },
    { value: 'settings', label: t('dashboard.settings') },
    { value: 'logs', label: t('dashboard.logs') },
  ]

  return (
    <div className="space-y-8 p-6 bg-accent/5 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary">{t('dashboard.managingServer', { server })}</h1>
      
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tabItems.map((item, index) => (
          <div key={item.value} className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => setActiveTab(item.value)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === item.value
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {item.label}
          </Button>

            {index < tabItems.length - 1 && (
              <Separator orientation="vertical" className="h-6 mx-2" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'statistics' && <ServerStatistics server={server} />}
        {activeTab === 'embed-creator' && <EmbedCreator server={server} />}
        {activeTab === 'moderation' && <Moderation server={server} />}
        {activeTab === 'giveaways' && <Giveaways server={server} />}
        {activeTab === 'pinned-messages' && <PinnedMessages server={server} />}
        {activeTab === 'settings' && <ServerSettings server={server} />}
        {activeTab === 'logs' && <ServerLogs server={server} />}
      </div>
    </div>
  )
}

