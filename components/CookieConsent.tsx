'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import Cookies from 'js-cookie'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CookiePolicy } from './CookiePolicy'

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const consent = Cookies.get('cookie-consent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    Cookies.set('cookie-consent', 'true', { expires: 365 })
    Cookies.set('cookie-preferences', 'true', { expires: 365 })
    setShowConsent(false)
  }

  const handleDecline = () => {
    Cookies.set('cookie-consent', 'true', { expires: 365 })
    Cookies.set('cookie-preferences', 'false', { expires: 365 })
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          {t('cookieConsent.message')}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="p-0 h-auto font-normal text-sm underline">
                {t('cookieConsent.learnMore')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t('cookiePolicy.title')}</DialogTitle>
                <DialogDescription>
                  {t('cookiePolicy.description')}
                </DialogDescription>
              </DialogHeader>
              <CookiePolicy />
            </DialogContent>
          </Dialog>
        </p>
        <div className="flex gap-2">
          <Button onClick={handleDecline} variant="outline">
            {t('cookieConsent.decline')}
          </Button>
          <Button onClick={handleAccept}>
            {t('cookieConsent.accept')}
          </Button>
        </div>
      </div>
    </div>
  )
}

