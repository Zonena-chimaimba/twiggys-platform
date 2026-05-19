import { CopyButton } from '@/components/ui/CopyButton'
import type { PaymentMethod } from '@/types'

interface PaymentMethodInfo {
  id: PaymentMethod
  name: string
  number: string
  owner: string
  icon: string
  gradientFrom: string
  accentColor: string
  numberLabel: string
}

export const PAYMENT_METHODS: PaymentMethodInfo[] = [
  {
    id: 'mpamba',
    name: 'TNM Mpamba',
    number: '1603380',
    owner: 'Tamara Gwamba',
    icon: '📱',
    gradientFrom: 'from-rose-950/60',
    accentColor: '#D4216B',
    numberLabel: 'Mpamba Number',
  },
  {
    id: 'airtel_money',
    name: 'Airtel Money',
    number: '10175450',
    owner: 'Tamara Gwamba',
    icon: '💳',
    gradientFrom: 'from-red-950/60',
    accentColor: '#EF4444',
    numberLabel: 'Airtel Number',
  },
  {
    id: 'national_bank',
    name: 'National Bank',
    number: '1001223883',
    owner: 'Tamara Gwamba',
    icon: '🏦',
    gradientFrom: 'from-slate-800/60',
    accentColor: '#94A3B8',
    numberLabel: 'Account Number',
  },
]

interface PaymentMethodCardProps {
  method: PaymentMethodInfo
}

export function PaymentMethodCard({ method }: PaymentMethodCardProps) {
  return (
    <div
      className={`relative bg-gradient-to-b ${method.gradientFrom} to-brand-black border border-white/[0.08] rounded-2xl p-6 overflow-hidden group hover:border-white/[0.15] transition-all duration-300`}
    >
      <div className="text-3xl mb-5">{method.icon}</div>
      <h3 className="font-display text-xl text-brand-white font-light mb-5">{method.name}</h3>
      <div className="mb-4">
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/30 mb-1.5">
          {method.numberLabel}
        </p>
        <div className="flex items-center gap-1">
          <span className="font-mono text-brand-white font-medium tracking-widest text-sm">
            {method.number}
          </span>
          <CopyButton value={method.number} />
        </div>
      </div>
      <div>
        <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/30 mb-1.5">
          Registered Name
        </p>
        <p className="font-body text-brand-white/70 text-sm">{method.owner}</p>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-50"
        style={{
          background: `linear-gradient(to right, transparent, ${method.accentColor}, transparent)`,
        }}
      />
    </div>
  )
}
