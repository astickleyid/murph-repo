import { ArrowRight, Sparkles, TrendingUp, Globe, BookOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'

const exampleMessages = [
  {
    heading: 'Explain quantum computing in simple terms',
    message: 'Explain quantum computing in simple terms',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    heading: 'What are the latest AI breakthroughs?',
    message: 'What are the latest AI breakthroughs?',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    heading: 'Compare electric vehicles: Tesla vs Rivian',
    message: 'Compare electric vehicles: Tesla vs Rivian',
    icon: Globe,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    heading: 'Summarize: https://arxiv.org/pdf/2501.05707',
    message: 'Summary: https://arxiv.org/pdf/2501.05707',
    icon: BookOpen,
    gradient: 'from-orange-500 to-red-500'
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
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        {/* Welcome Header */}
        <div className="mb-8 text-center space-y-3">
          <h1 className="text-4xl font-bold gradient-text">
            Welcome to NexusAI
          </h1>
          <p className="text-muted-foreground text-lg">
            Ask anything. Get intelligent, comprehensive answers powered by advanced AI.
          </p>
        </div>

        {/* Example Prompts */}
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {exampleMessages.map((message, index) => {
            const Icon = message.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-left justify-start hover:border-primary/50 transition-all-smooth hover:shadow-lg group"
                name={message.message}
                onClick={async () => {
                  submitMessage(message.message)
                }}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${message.gradient} text-white`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {message.heading}
                  </span>
                  <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
            )
          })}
        </div>

        {/* Features hint */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>✨ Powered by multiple AI models • 🔍 Real-time web search • 🎨 Beautiful generative UI</p>
        </div>
      </div>
    </div>
  )
}
