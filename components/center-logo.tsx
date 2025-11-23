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
      {isVisible ? (
        // Center position when no messages
        <motion.div
          key="center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, x: -200, y: -200 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <IconLogo className="scale-75" />
        </motion.div>
      ) : (
        // Top-left corner when messages exist
        <motion.div
          key="corner"
          initial={{ opacity: 0, x: -200, y: -200 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={cn(
            'fixed top-4 left-4 z-10',
            'lg:left-[calc(var(--sidebar-width)+1rem)]'
          )}
        >
          <IconLogo className="scale-50" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
