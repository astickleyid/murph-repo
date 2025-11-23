'use client'

import { useEffect, useState } from 'react'

import { Brain } from 'lucide-react'

import { defaultLogoSettings,LogoSettings } from '@/lib/themes'
import { cn } from '@/lib/utils'

const LOGO_SETTINGS_KEY = 'stickgpt-logo-settings'

function IconLogo({ className, ...props }: React.ComponentProps<'div'>) {
  const [logoSettings, setLogoSettings] = useState<LogoSettings>(defaultLogoSettings)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOGO_SETTINGS_KEY)
      if (stored) {
        setLogoSettings(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load logo settings:', error)
    }
  }, [])
  
  const sizeMap = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-14 w-14'
  }
  
  return (
    <div 
      className={cn(
        'relative rounded-xl p-2.5 bg-gradient-to-br from-primary/10 to-primary/5',
        'border border-primary/20 shadow-sm',
        className
      )} 
      {...props}
    >
      <Brain className={cn(sizeMap[logoSettings.size], 'text-primary')} strokeWidth={1.5} />
    </div>
  )
}

export { IconLogo }
