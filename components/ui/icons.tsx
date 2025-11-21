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
      {/* Modern, minimalistic "S" shape representing StickGPT */}
      <path
        d="M 128 40 L 180 80 L 180 120 L 128 140 L 76 120 L 76 80 Z M 128 140 L 180 160 L 180 200 L 128 216 L 76 200 L 76 160 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { IconLogo }
