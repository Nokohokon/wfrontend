'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['Moderation', 'Giveaways', 'Embeds', 'Statistics']

export function IntroductionSection() {
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000) // Change word every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-center">Meet Your New Discord Companion</h2>
        <p className="text-xl mb-8 text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Our Discord bot is designed to enhance your server experience with powerful moderation tools, 
          engaging giveaways, customizable embeds, and insightful statistics. Elevate your community 
          with our versatile and user-friendly bot.
        </p>
        <div className="text-3xl font-bold text-center">
          <span >Use me for...  </span>
          <span className="inline-flex ml-2 justify-center text-left items-center relative w-[150px] h-[40px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500 dark:from-green-300 dark:to-cyan-300"
              >
                 {words[currentWord]}!
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>
    </section>
  )
}
