interface StatCardProps {
  label: string
  value: number
  valueColor?: string
}

export function StatCard({ label, value, valueColor = 'text-brand-white' }: StatCardProps) {
  return (
    <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl p-5">
      <p className="font-body text-[10px] tracking-widest uppercase text-brand-white/30 mb-3">
        {label}
      </p>
      <p className={`font-display text-4xl font-light ${valueColor}`}>{value}</p>
    </div>
  )
}
