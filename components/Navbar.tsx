'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun, Globe, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Navbar: React.FC = () => {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const navItems = [
    { href: '/', label: 'Discord Bot' },
    { href: '/dashboard', label: t('nav.dashboard') },
    { href: '/blog', label: t('nav.blog') },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-accent/10 backdrop-blur-sm border-b border-primary transition-all duration-300 ${isScrolled ? 'md:opacity-0 md:pointer-events-none' : ''}`}>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-lg font-bold text-primary">
            Wanderlust
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-primary">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">{t('theme.toggle')}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
            className="text-primary"
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">{t('lang.toggle')}</span>
          </Button>

          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  {user ? (
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem onSelect={() => router.push('/profile')}>
                      {t('nav.profile')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleLogout}>
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onSelect={() => router.push('/login')}>
                    {t('nav.login')}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-lg">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <nav className="mt-8 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-lg font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-primary">
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 mb-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                    <Link
                      href="/profile"
                      className="block text-lg font-medium hover:text-primary mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-0 text-lg font-medium hover:text-primary"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      {t('nav.logout')}
                    </Button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

      <div className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${
        isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } hidden md:block`}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-64 bg-background p-6 shadow-lg transition-transform duration-300 transform md:translate-x-0 hidden md:block">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <nav className="mt-8 space-y-6">
            <div className="flex justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-primary">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">{t('theme.toggle')}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                className="text-primary"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t('lang.toggle')}</span>
              </Button>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block text-lg font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.profile')}
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start p-0 text-lg font-medium hover:text-primary"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                className="block text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.login')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  )
}

