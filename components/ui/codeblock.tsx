// Referenced from Vercel's AI Chatbot and modified to fit the needs of this project
// https://github.com/vercel/ai-chatbot/blob/c2757f87f986b7f15fdf75c4c89cb2219745c53f/components/ui/codeblock.tsx

'use client'

import { FC, memo, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkCold,coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from 'next-themes'

import { generateId } from 'ai'
import { Check, Copy, Download, Maximize2, Minimize2,WrapText } from 'lucide-react'

import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface Props {
  language: string
  value: string
}

interface languageMap {
  [key: string]: string | undefined
}

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css'
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const { resolvedTheme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [wordWrap, setWordWrap] = useState(false)

  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return
    }
    const fileExtension = programmingLanguages[language] || '.file'
    const suggestedFileName = `file-${generateId()}${fileExtension}`
    const fileName = window.prompt('Enter file name', suggestedFileName)

    if (!fileName) {
      // User pressed cancel on prompt.
      return
    }

    const blob = new Blob([value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = fileName
    link.href = url
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(value)
  }

  const isDark = resolvedTheme === 'dark'
  const syntaxTheme = isDark ? coldarkDark : coldarkCold
  const lineCount = value.split('\n').length
  const isLong = lineCount > 20

  return (
    <div className={cn(
      "relative w-full font-sans codeblock rounded-xl overflow-hidden border transition-all",
      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
    )}>
      <div className={cn(
        "flex items-center justify-between w-full px-4 py-2 border-b",
        isDark ? 'bg-neutral-800 border-neutral-700 text-zinc-100' : 'bg-neutral-100 border-neutral-200 text-zinc-900'
      )}>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded",
            isDark ? 'bg-neutral-700' : 'bg-neutral-200'
          )}>
            {language}
          </span>
          <span className="text-xs text-muted-foreground">
            {lineCount} {lineCount === 1 ? 'line' : 'lines'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-accent"
            onClick={() => setWordWrap(!wordWrap)}
            title="Toggle word wrap"
          >
            <WrapText className={cn("w-4 h-4", wordWrap && "text-primary")} />
          </Button>
          {isLong && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-accent"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-accent"
            onClick={downloadAsFile}
            title="Download"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-accent"
            onClick={onCopy}
            title="Copy code"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      <div className={cn(
        "relative overflow-hidden transition-all",
        isExpanded ? "max-h-none" : isLong ? "max-h-[500px]" : "max-h-none"
      )}>
        <SyntaxHighlighter
          language={language}
          style={syntaxTheme}
          PreTag="div"
          showLineNumbers
          wrapLines={wordWrap}
          wrapLongLines={wordWrap}
          customStyle={{
            margin: 0,
            width: '100%',
            background: 'transparent',
            padding: '1.5rem 1rem',
            fontSize: '0.875rem'
          }}
          lineNumberStyle={{
            userSelect: 'none',
            minWidth: '3em',
            paddingRight: '1em',
            opacity: 0.5
          }}
          codeTagProps={{
            style: {
              fontSize: '0.875rem',
              fontFamily: 'var(--font-mono)',
              lineHeight: '1.7'
            }
          }}
        >
          {value}
        </SyntaxHighlighter>
        {isLong && !isExpanded && (
          <div className={cn(
            "absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center pb-4",
            "bg-gradient-to-t pointer-events-none",
            isDark ? 'from-neutral-900 via-neutral-900/80 to-transparent' : 'from-neutral-50 via-neutral-50/80 to-transparent'
          )}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="pointer-events-auto"
            >
              <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
              Show all {lineCount} lines
            </Button>
          </div>
        )}
      </div>
    </div>
  )
})
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
