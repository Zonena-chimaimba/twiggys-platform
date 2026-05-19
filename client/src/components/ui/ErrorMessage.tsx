import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  className?: string
}

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div className={`flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 font-body text-sm ${className}`}>
      <AlertCircle size={16} className="flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}
