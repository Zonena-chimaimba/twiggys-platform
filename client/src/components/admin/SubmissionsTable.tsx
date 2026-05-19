import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { Submission } from '@/types'
import { formatCurrency, formatDate, PAYMENT_METHOD_LABELS } from '@/utils/formatting'

interface SubmissionsTableProps {
  submissions: Submission[]
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  if (submissions.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-body text-brand-white/30 text-sm">No submissions found</p>
      </div>
    )
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Customer', 'Phone', 'Method', 'Amount', 'Status', 'Date', ''].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left font-body text-[10px] tracking-widest uppercase text-brand-white/25"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {submissions.map((sub) => (
              <tr key={sub.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4 font-body text-sm text-brand-white font-medium">
                  {sub.customerName}
                </td>
                <td className="px-5 py-4 font-body text-sm text-brand-white/50">
                  {sub.phoneNumber}
                </td>
                <td className="px-5 py-4 font-body text-sm text-brand-white/50">
                  {PAYMENT_METHOD_LABELS[sub.paymentMethod]}
                </td>
                <td className="px-5 py-4 font-mono text-sm text-brand-white/70">
                  {formatCurrency(Number(sub.amountPaid))}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={sub.status} />
                </td>
                <td className="px-5 py-4 font-body text-xs text-brand-white/30">
                  {formatDate(sub.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <Link
                    to={`/admin/submissions/${sub.id}`}
                    className="text-brand-white/20 group-hover:text-brand-pink transition-colors"
                    aria-label={`View ${sub.customerName}`}
                  >
                    <ArrowRight size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-white/[0.06]">
        {submissions.map((sub) => (
          <Link
            key={sub.id}
            to={`/admin/submissions/${sub.id}`}
            className="flex items-center justify-between px-4 py-4 hover:bg-white/[0.02] transition-colors"
          >
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm text-brand-white font-medium truncate">
                {sub.customerName}
              </p>
              <p className="font-body text-xs text-brand-white/30 mt-0.5">{sub.phoneNumber}</p>
              <div className="flex items-center gap-2 mt-2">
                <StatusBadge status={sub.status} />
                <span className="font-mono text-brand-white/40 text-xs">
                  {formatCurrency(Number(sub.amountPaid))}
                </span>
              </div>
            </div>
            <ArrowRight size={16} className="text-brand-white/20 flex-shrink-0 ml-4" />
          </Link>
        ))}
      </div>
    </>
  )
}
