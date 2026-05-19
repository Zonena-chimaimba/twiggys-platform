interface SpinnerProps {
  size?: number
  className?: string
}

export function Spinner({ size = 20, className = '' }: SpinnerProps) {
  return (
    <div
      className={`rounded-full border-2 border-brand-pink/20 border-t-brand-pink animate-spin ${className}`}
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  )
}
