'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'
import { IntroductionSection } from '@/components/IntroductionSection'
import moderationImg from '@/images/manage_server.png'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/80">
      <h1 className="text-6xl font-bold mb-16 text-center text-primary">{t('home.welcome', { botName: 'Wanderlust' })}</h1>
      
      <IntroductionSection />

      <div className="space-y-12 md:space-y-32 mb-24 w-full max-w-5xl px-4 md:px-0">
        <FeatureCard
          title={t('home.embedCreator.title')}
          description={t('home.embedCreator.description')}
          imageSrc="/placeholder.svg?height=400&width=400"
          icon="📝"
          imagePosition="left"
          t={t}
        />
        <FeatureCard
          title={t('home.moderationTools.title')}
          description={t('home.moderationTools.description')}
          imageSrc={moderationImg}
          icon="🛡️"
          imagePosition="right"
          t={t}
        />
        <FeatureCard
          title={t('home.giveawaySystem.title')}
          description={t('home.giveawaySystem.description')}
          imageSrc="/placeholder.svg?height=400&width=400"
          icon="🎉"
          imagePosition="left"
          t={t}
        />
      </div>
      <div className="space-y-4 md:space-x-6 md:space-y-0">
        <Button asChild size="lg" className="w-full md:w-auto text-xl px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/login">{t('home.login')}</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full md:w-auto text-xl px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Link href="/dashboard">{t('home.dashboard')}</Link>
        </Button>
      </div>
      <div className="mt-32 w-full max-w-5xl px-4 md:px-0">
        <h2 className="text-5xl font-semibold mb-12 text-center text-primary">{t('home.latestUpdates')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <BlogPostCard
            title={t('home.blogPost1.title')}
            date={t('home.blogPost1.date')}
            excerpt={t('home.blogPost1.excerpt')}
            href="/blog/new-embed-creator"
            t={t}
          />
          <BlogPostCard
            title={t('home.blogPost2.title')}
            date={t('home.blogPost2.date')}
            excerpt={t('home.blogPost2.excerpt')}
            href="/blog/upcoming-analytics"
            t={t}
          />
        </div>
        <div className="text-center mt-16">
          <Button asChild variant="link" size="lg" className="text-2xl text-primary hover:text-primary/80">
            <Link href="/blog">{t('home.viewAllUpdates')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, imageSrc, icon, imagePosition, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ 
        scale: 1.03, 
        rotate: imagePosition === 'left' ? -1 : 1,
        transition: { duration: 0.3 }
      }}
      className="overflow-hidden bg-background rounded-lg shadow-lg"
    >
      <div className={`flex flex-col md:flex-row items-center ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-4xl md:text-5xl text-primary">{icon}</span>
            <h3 className="text-2xl md:text-4xl font-bold text-primary">{title}</h3>
          </div>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300">{description}</p>
        </div>
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full h-64 md:h-80 flex justify-center items-center">
            <Image 
              src={imageSrc} 
              alt={`${title} preview`} 
              layout="intrinsic" 
              width={500}  // Hier die Breite anpassen
              height={300}  // Hier die Höhe anpassen
              objectFit="contain"  // Verhindert das Abschneiden
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}



function BlogPostCard({ title, date, excerpt, href, t }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotate: -1,
        transition: { duration: 0.3 }
      }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-primary"
    >
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-sm md:text-lg text-gray-500 mb-4">{date}</p>
        <p className="text-base md:text-xl mb-6 text-gray-600 dark:text-gray-300">{excerpt}</p>
        <Button asChild variant="link" className="text-lg md:text-xl text-primary hover:text-primary/80 p-0">
          <Link href={href}>{t('home.readMore')}</Link>
        </Button>
      </div>
    </motion.div>
  )
}

