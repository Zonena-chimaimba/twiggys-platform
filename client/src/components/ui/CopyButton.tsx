import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton({ value, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
      className={`inline-flex items-center justify-center p-1 rounded transition-colors ${
        copied
          ? 'text-green-400'
          : 'text-brand-pink/50 hover:text-brand-pink'
      } ${className}`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}
