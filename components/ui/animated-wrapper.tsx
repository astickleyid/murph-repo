'use client'

import React from 'react'

import { motion } from 'framer-motion'

interface AnimatedWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedWrapper({
  children,
  className,
  delay = 0
}: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({
  children,
  className,
  delay = 0
}: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({
  children,
  className,
  delay = 0,
  direction = 'left'
}: AnimatedWrapperProps & { direction?: 'left' | 'right' | 'up' | 'down' }) {
  const directionConfig = {
    left: { x: -20, y: 0 },
    right: { x: 20, y: 0 },
    up: { x: 0, y: -20 },
    down: { x: 0, y: 20 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionConfig[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
