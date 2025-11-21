import { cn } from '@/lib/utils'

interface FeatureBadgeProps {
  children: React.ReactNode
  variant?: 'new' | 'beta' | 'pro' | 'soon'
  className?: string
}

export function FeatureBadge({
  children,
  variant = 'new',
  className
}: FeatureBadgeProps) {
  const variants = {
    new: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    beta: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    pro: 'gradient-primary text-white',
    soon: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
