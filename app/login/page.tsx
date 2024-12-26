'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { t } = useLanguage()

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      // In a real application, this would be a call to Discord's OAuth2 API
      // For demonstration purposes, we'll simulate a login after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulated user data
      const userData = {
        id: '123456789',
        name: 'Demo User',
        avatar: '/placeholder.svg?height=40&width=40'
      }
      
      login(userData)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      alert(t('login.failed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">{t('login.welcome', { botName: 'Wanderlust' })}</h1>
      <Button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? t('login.loggingIn') : t('login.loginWithDiscord')}
      </Button>
    </div>
  )
}

