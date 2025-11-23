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
          exit={{ opacity: 0, scale: 0.3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <IconLogo />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
