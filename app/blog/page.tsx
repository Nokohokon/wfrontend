'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'

export default function BlogPage() {
  const { t } = useTranslation()
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const response = await fetch('/api/blog') // Endpunkt für alle Blogposts
      const data = await response.json()
      setBlogPosts(data)
    }

    fetchBlogPosts()
  }, [])

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-turquoise-dark">{t('blog.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <BlogPostCard key={post._id} {...post} />
        ))}
      </div>
    </div>
  )
}

function BlogPostCard({ _id, title, date, excerpt }) {
  const { t } = useTranslation()

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotate: -1,
        transition: { duration: 0.3 }
      }}
      className="bg-background"
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold text-turquoise-dark mb-2">{title}</h3>
        <p className="text-lg text-gray-500 mb-4">{date}</p>
        <p className="text-xl mb-6">{excerpt}</p>
        <Button asChild variant="link" className="text-xl text-turquoise-dark hover:text-turquoise-light p-0">
          <Link href={`/blog/${_id}`}>{t('blog.readMore')}</Link>
        </Button>
      </div>
    </motion.div>
  )
}
