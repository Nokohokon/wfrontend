import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

type ServerStats = {
  userCount: number
  channelCount: number
  roleCount: number
  emojiCount: number
  boostLevel: number
}

type ServerStatisticsProps = {
  server: string
}

export function ServerStatistics({ server }: ServerStatisticsProps) {
  const { t } = useLanguage()
  const [stats, setStats] = useState<ServerStats | null>(null)

  useEffect(() => {
    fetchServerStats()
  }, [server])

  const fetchServerStats = async () => {
    // In a real application, this would be an API call to your backend
    setStats({
      userCount: 1000,
      channelCount: 20,
      roleCount: 15,
      emojiCount: 50,
      boostLevel: 2
    })
  }

  if (!stats) {
    return <div className="text-center">{t('serverStatistics.loading')}</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('serverStatistics.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatItem label={t('serverStatistics.users')} value={stats.userCount} />
          <StatItem label={t('serverStatistics.channels')} value={stats.channelCount} />
          <StatItem label={t('serverStatistics.roles')} value={stats.roleCount} />
          <StatItem label={t('serverStatistics.emojis')} value={stats.emojiCount} />
          <StatItem label={t('serverStatistics.boostLevel')} value={stats.boostLevel} />
        </div>
      </CardContent>
    </Card>
  )
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-accent rounded-lg p-4">
      <p className="font-semibold text-lg">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

