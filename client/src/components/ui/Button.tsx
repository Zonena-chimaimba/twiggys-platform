import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Spinner } from './Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

const VARIANT_CLASSES = {
  primary: 'bg-brand-pink text-white hover:bg-brand-pink/90 disabled:bg-brand-pink/40',
  ghost: 'bg-white/5 border border-white/10 text-brand-white/70 hover:text-brand-white hover:bg-white/10',
  danger: 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20',
}

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-body font-medium
        rounded-full transition-all duration-150 focus:outline-none
        disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && <Spinner size={15} />}
      {children}
    </button>
  )
}
