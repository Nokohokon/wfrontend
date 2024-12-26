'use client'
import { Facebook, Twitter, Instagram, Github, BadgeHelp } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/imprint" className="text-sm text-muted-foreground hover:text-foreground mr-4">
              {t('footer.imprint')}
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground mr-4">
              {t('footer.privacy')}
            </Link>
            <Link href="/tos" className="text-sm text-muted-foreground hover:text-foreground">
              {t('footer.tos')}
            </Link>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Instagram size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Github size={20} />
            </a>
            <a href="https://discord.konja.xyz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <BadgeHelp size={20} />
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Wanderlust. {t('footer.allRightsReserved')}
        </div>
      </div>
    </footer>
  )
}

