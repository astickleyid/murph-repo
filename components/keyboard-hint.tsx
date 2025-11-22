'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence,motion } from 'framer-motion'
import { Command } from 'lucide-react'

import { cn } from '@/lib/utils'

export function KeyboardHint() {
  const [show, setShow] = useState(false)
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform))
    
    // Show hint after 3 seconds, hide after 8 seconds
    const showTimer = setTimeout(() => setShow(true), 3000)
    const hideTimer = setTimeout(() => setShow(false), 8000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-4 z-50 pointer-events-none"
        >
          <div className="glass-strong rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">
                {isMac ? '⌘' : 'Ctrl'}
              </kbd>
              <span className="text-muted-foreground">+</span>
              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">K</kbd>
            </div>
            <span className="text-muted-foreground">for commands</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
