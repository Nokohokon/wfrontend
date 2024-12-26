'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Server = {
  id: string
  name: string
  icon: string
}

export default function DashboardPage() {
  const [servers, setServers] = useState<Server[]>([])
  const router = useRouter()
  const { t } = useLanguage()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      fetchServers()
    }
  }, [user, router])

  const fetchServers = async () => {
    // In a real application, this would be an API call to your backend
    setServers([
      { id: '1', name: 'Server 1', icon: '/placeholder.svg?height=40&width=40' },
      { id: '2', name: 'Server 2', icon: '/placeholder.svg?height=40&width=40' },
      { id: '3', name: 'Server 3', icon: '/placeholder.svg?height=40&width=40' },
    ])
  }

  const handleServerSelect = (server: Server) => {
    router.push(`/dashboard/${encodeURIComponent(server.id)}`)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold">{t('dashboard.selectServer')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((server) => (
          <Card
  key={server.id}
  className="cursor-pointer transition-colors"
>
  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
    <Avatar className="h-12 w-12">
      <AvatarImage src={server.icon} alt={server.name} />
      <AvatarFallback>{server.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <CardTitle className="text-xl">{server.name}</CardTitle>
  </CardHeader>
  <CardContent>
    <CardDescription className="mb-4">{t('dashboard.clickToManage')}</CardDescription>
    <Button 
      className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600"
      onClick={() => handleServerSelect(server)}
    >
      {t('dashboard.manage')}
    </Button>
  </CardContent>
</Card>

        ))}
      </div>
    </div>
  )
}

