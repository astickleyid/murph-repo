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
          exit={{ opacity: 0, scale: 0.8, x: -300, y: -300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <IconLogo className="scale-75" />
        </motion.div>
      ) : (
        // Top-left corner when messages exist - better positioning
        <motion.div
          key="corner"
          initial={{ opacity: 0, x: -300, y: -300 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
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
