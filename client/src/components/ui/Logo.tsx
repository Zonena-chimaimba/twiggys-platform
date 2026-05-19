import type { SyntheticEvent } from 'react'

interface LogoProps {
  size?: number
  className?: string
  showText?: boolean
}

export function Logo({ size = 40, className = '', showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.jpg"
        alt="Twiggy & Sithe's"
        width={size}
        height={size}
        className="object-contain rounded-lg flex-shrink-0"
        style={{ width: size, height: size }}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
          const el = e.currentTarget as HTMLImageElement
          el.style.display = 'none'
        }}
      />
      {showText && (
        <div>
          <p className="font-display text-brand-white leading-tight" style={{ fontSize: size * 0.35 }}>
            Twiggy &amp; Sithe's
          </p>
        </div>
      )}
    </div>
  )
}
