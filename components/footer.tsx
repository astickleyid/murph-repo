import Link from 'next/link'

import { Github, Heart, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-background/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Built with{' '}
              <Heart className="inline-block h-3 w-3 text-red-500 fill-red-500" />{' '}
              by the{' '}
              <span className="font-semibold gradient-text">NexusAI</span> team
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/miurla/morphic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NexusAI. All rights reserved.
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mt-4 text-xs text-muted-foreground">
          <p>
            Powered by advanced AI • Real-time web search • Beautiful generative
            UI
          </p>
        </div>
      </div>
    </footer>
  )
}
