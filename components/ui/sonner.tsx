'use client'

import { useTheme } from 'next-themes'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-2xl group-[.toaster]:backdrop-blur-md',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:gradient-primary group-[.toast]:text-primary-foreground group-[.toast]:shadow-md',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-green-500',
          error: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-destructive',
          warning: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-orange-500',
          info: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-primary'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
