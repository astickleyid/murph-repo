'use client'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 256 256"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      {/* Modern "S" with gradient and dynamic feel for StickGPT */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Outer ring/circle */}
      <circle
        cx="128"
        cy="128"
        r="108"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="8"
        opacity="0.3"
      />
      {/* Dynamic S shape with modern curves */}
      <path
        d="M 180 70 Q 180 50 155 45 L 100 45 Q 70 50 70 75 Q 70 95 95 100 L 160 115 Q 185 120 185 145 Q 185 170 160 175 L 100 175 Q 75 170 75 150"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Accent dots for tech/AI feel */}
      <circle cx="190" cy="128" r="6" fill="currentColor" opacity="0.8" />
      <circle cx="66" cy="128" r="6" fill="currentColor" opacity="0.8" />
    </svg>
  )
}

export { IconLogo }
