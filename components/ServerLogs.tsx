'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Log = {
  id: string
  timestamp: string
  action: string
  user: string
  details: string
}

type ServerLogsProps = {
  server: string
}

export function ServerLogs({ server }: ServerLogsProps) {
  const { t } = useLanguage()
  const [logs, setLogs] = useState<Log[]>([])
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([])
  const [filter, setFilter] = useState('')
  const [actionFilter, setActionFilter] = useState('')

  useEffect(() => {
    fetchLogs()
  }, [server])

  useEffect(() => {
    filterLogs()
  }, [logs, filter, actionFilter])

  const fetchLogs = async () => {
    // In a real application, this would be an API call to your backend
    setLogs([
      { id: '1', timestamp: '2023-05-01 10:00:00', action: 'Command Used', user: 'User1', details: 'Used !help command' },
      { id: '2', timestamp: '2023-05-01 10:05:00', action: 'Moderation', user: 'Mod1', details: 'Warned User2 for spamming' },
      { id: '3', timestamp: '2023-05-01 10:10:00', action: 'Giveaway', user: 'Bot', details: 'Started a new giveaway' },
    ])
  }

  const filterLogs = () => {
    let filtered = logs
    if (filter) {
      filtered = filtered.filter(log => 
        log.user.toLowerCase().includes(filter.toLowerCase()) ||
        log.details.toLowerCase().includes(filter.toLowerCase())
      )
    }
    if (actionFilter && actionFilter !== 'all') {
      filtered = filtered.filter(log => log.action === actionFilter)
    }
    setFilteredLogs(filtered)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('serverLogs.title', { server })}</h2>
      <div className="flex space-x-4">
        <Input
          placeholder={t('serverLogs.filterPlaceholder')}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Select onValueChange={setActionFilter} value={actionFilter}>
          <SelectTrigger>
            <SelectValue placeholder={t('serverLogs.filterByAction')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('serverLogs.allActions')}</SelectItem>
            <SelectItem value="Command Used">{t('serverLogs.commandUsed')}</SelectItem>
            <SelectItem value="Moderation">{t('serverLogs.moderation')}</SelectItem>
            <SelectItem value="Giveaway">{t('serverLogs.giveaway')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('serverLogs.timestamp')}</TableHead>
            <TableHead>{t('serverLogs.action')}</TableHead>
            <TableHead>{t('serverLogs.user')}</TableHead>
            <TableHead>{t('serverLogs.details')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

