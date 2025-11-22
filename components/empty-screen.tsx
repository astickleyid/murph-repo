'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

const exampleMessages = [
  {
    heading: 'What is DeepSeek R1?',
    message: 'What is DeepSeek R1?'
  },
  {
    heading: 'Why is Nvidia growing rapidly?',
    message: 'Why is Nvidia growing rapidly?'
  },
  {
    heading: 'Tesla vs Rivian',
    message: 'Tesla vs Rivian'
  },
  {
    heading: 'Summary: https://arxiv.org/pdf/2501.05707',
    message: 'Summary: https://arxiv.org/pdf/2501.05707'
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mx-auto w-full transition-all ${className}`}
    >
      <div className="bg-background p-2">
        <div className="mt-2 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="w-full"
            >
              <Button
                variant="link"
                className="h-auto p-0 text-base"
                name={message.message}
                onClick={async () => {
                  submitMessage(message.message)
                }}
              >
                <ArrowRight size={16} className="mr-2 text-muted-foreground" />
                {message.heading}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
