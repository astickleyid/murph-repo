'use client'

// import Link from 'next/link' // No longer needed directly here for Sign In button
import React from 'react'

import { User } from '@supabase/supabase-js'

import { cn } from '@/lib/utils'

import { useSidebar } from '@/components/ui/sidebar'

// import { Button } from './ui/button' // No longer needed directly here for Sign In button
import GuestMenu from './guest-menu' // Import the new GuestMenu component
import UserMenu from './user-menu'

interface HeaderProps {
  user: User | null
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { open } = useSidebar()
  return (
    <header
      className={cn(
        'absolute top-0 right-0 p-3 flex justify-between items-center z-10 backdrop-blur-md bg-background/70 border-b border-border/50 transition-all duration-200 ease-linear',
        open ? 'md:w-[calc(100%-var(--sidebar-width))]' : 'md:w-full',
        'w-full'
      )}
    >
      {/* Logo or title on the left for mobile when sidebar is closed */}
      <div className="flex items-center">
        {/* You can add a tagline or status indicator here */}
      </div>

      <div className="flex items-center gap-3">
        {user ? <UserMenu user={user} /> : <GuestMenu />}
      </div>
    </header>
  )
}

export default Header
