'use client'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 256 256"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#d946ef', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle cx="128" cy="128" r="128" fill="url(#logoGradient)"></circle>
      <path
        d="M 90 110 Q 128 80 166 110"
        stroke="white"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="95" cy="130" r="12" fill="white"></circle>
      <circle cx="161" cy="130" r="12" fill="white"></circle>
      <path
        d="M 80 155 Q 128 180 176 155"
        stroke="white"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  )
}

function IconSparkles({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.122 2.122m12.728 0l-2.121-2.122M8.757 8.757L6.636 6.636" />
    </svg>
  )
}

export { IconLogo, IconSparkles }
