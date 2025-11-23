'use client'

import { Suspense } from 'react'
import Link from 'next/link'

import { motion } from 'framer-motion'
import { Bookmark, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar'

import { ChatFolders } from './sidebar/chat-folders'
import { ChatHistorySection } from './sidebar/chat-history-section'
import { ChatHistorySkeleton } from './sidebar/chat-history-skeleton'
import { SidebarSearch } from './sidebar/sidebar-search'
import { IconLogo } from './ui/icons'

export default function AppSidebar() {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="flex flex-col gap-6 py-6">
        <div className="flex flex-row justify-between items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 flex justify-center"
          >
            <Link href="/" className="flex items-center gap-2">
              <span className="text-4xl tracking-tight">
                <span className="font-normal">Stick</span>
                <span className="font-bold">GPT</span>
              </span>
            </Link>
          </motion.div>
          <SidebarTrigger className="absolute right-4" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          className="px-4"
        >
          <SidebarSearch onSearch={(query) => console.log('Search:', query)} />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col px-2 py-4 h-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="mb-2">
              <Link href="/" className="flex items-center gap-2">
                <Plus className="size-4" />
                <span>New Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="mb-2">
              <Link href="/bookmarks" className="flex items-center gap-2">
                <Bookmark className="size-4" />
                <span>Bookmarks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex-1 overflow-y-auto">
          <Suspense fallback={<ChatHistorySkeleton />}>
            <ChatHistorySection />
          </Suspense>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
