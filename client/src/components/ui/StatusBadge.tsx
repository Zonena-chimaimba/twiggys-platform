import type { SubmissionStatus } from '@/types'

interface StatusBadgeProps {
  status: SubmissionStatus
}

const CONFIG: Record<SubmissionStatus, { label: string; classes: string }> = {
  pending: { label: 'Pending', classes: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  reviewing: { label: 'Reviewing', classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  confirmed: { label: 'Confirmed', classes: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  processing: { label: 'Processing', classes: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  completed: { label: 'Completed', classes: 'bg-green-500/10 text-green-400 border-green-500/20' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, classes } = CONFIG[status] ?? CONFIG.pending
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium border whitespace-nowrap ${classes}`}>
      {label}
    </span>
  )
}
