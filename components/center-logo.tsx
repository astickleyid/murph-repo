'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence,motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { IconLogo } from './ui/icons'

interface CenterLogoProps {
  hasMessages: boolean
}

export function CenterLogo({ hasMessages }: CenterLogoProps) {
  const [isVisible, setIsVisible] = useState(!hasMessages)

  useEffect(() => {
    setIsVisible(!hasMessages)
  }, [hasMessages])

  return (
    <AnimatePresence mode="wait">
      {!hasMessages ? (
        // Above "How can I help" text when no messages
        <motion.div
          key="center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, x: -200, y: -100 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <IconLogo />
        </motion.div>
      ) : (
        // Top-left corner when messages exist
        <motion.div
          key="corner"
          initial={{ opacity: 0, scale: 0.5, x: 200, y: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={cn(
            'fixed top-20 left-6 z-10',
            'lg:left-[calc(var(--sidebar-width)+2rem)]'
          )}
        >
          <IconLogo className="scale-[0.4]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
