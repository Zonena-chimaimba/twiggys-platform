import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-brand-black-card border border-white/[0.08] rounded-2xl
        ${hover ? 'transition-colors hover:border-white/15' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

interface CardSectionProps {
  children: ReactNode
  className?: string
  label?: string
}

export function CardSection({ children, className = '', label }: CardSectionProps) {
  return (
    <div className={`p-5 ${className}`}>
      {label && (
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/30 mb-4">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}
