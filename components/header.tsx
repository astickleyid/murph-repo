'use client'

import React from 'react'

import { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { IconLogo } from '@/components/ui/icons'
import { useSidebar } from '@/components/ui/sidebar'

import GuestMenu from './guest-menu'
import { ThemeSelector } from './theme-selector'
import UserMenu from './user-menu'

interface HeaderProps {
  user: User | null
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { open } = useSidebar()
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'absolute top-0 right-0 p-2 flex justify-between items-center z-10 backdrop-blur lg:backdrop-blur-none bg-background/80 lg:bg-transparent transition-[width] duration-200 ease-linear',
        open ? 'md:w-[calc(100%-var(--sidebar-width))]' : 'md:w-full',
        'w-full'
      )}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      >
        <IconLogo />
      </motion.div>

      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      >
        <ThemeSelector />
        {user ? <UserMenu user={user} /> : <GuestMenu />}
      </motion.div>
    </motion.header>
  )
}

export default Header
