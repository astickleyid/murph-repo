'use client'

import React from 'react'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  minItemWidth?: string
  gap?: string
  staggerChildren?: boolean
}

export function ResponsiveGrid({
  children,
  className,
  minItemWidth = '280px',
  gap = '1rem',
  staggerChildren = true
}: ResponsiveGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren ? 0.1 : 0
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn('grid w-full', className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${minItemWidth}, 100%), 1fr))`,
        gap
      }}
    >
      {staggerChildren
        ? React.Children.map(children, child => (
            <motion.div variants={item}>{child}</motion.div>
          ))
        : children}
    </motion.div>
  )
}

interface MasonryGridProps {
  children: React.ReactNode
  className?: string
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: string
}

export function MasonryGrid({
  children,
  className,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = '1rem'
}: MasonryGridProps) {
  return (
    <div
      className={cn('w-full', className)}
      style={{
        columnCount: columns.sm,
        columnGap: gap
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          div {
            column-count: ${columns.md};
          }
        }
        @media (min-width: 1024px) {
          div {
            column-count: ${columns.lg};
          }
        }
        @media (min-width: 1280px) {
          div {
            column-count: ${columns.xl};
          }
        }
      `}</style>
      {React.Children.map(children, child => (
        <div
          style={{
            breakInside: 'avoid',
            marginBottom: gap
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
