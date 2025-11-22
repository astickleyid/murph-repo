'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('relative h-4 w-4', className)} {...props}>
      <Image
        src="/logo.png"
        alt="StickGPT Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

export { IconLogo }
