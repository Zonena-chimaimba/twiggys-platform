import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { adminApi } from '@/api/admin'
import { StatCard } from '@/components/admin/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import type { DashboardStats, Submission } from '@/types'
import { formatCurrency, formatDate } from '@/utils/formatting'

export default function AdminDashboardPage() {
  const [stats, setStats]   = useState<DashboardStats | null>(null)
  const [recent, setRecent] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState('')

  useEffect(() => {
    Promise.all([
      adminApi.getStats(),
      adminApi.getSubmissions({ limit: 5, page: 1 }),
    ])
      .then(([s, r]) => {
        setStats(s)
        setRecent(r.submissions)
      })
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={28} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md">
        <ErrorMessage message={error} />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-brand-white font-light">Dashboard</h1>
        <p className="font-body text-brand-white/35 text-sm mt-1">
          Overview of all order submissions
        </p>
      </div>

      {/* Stats grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Orders"  value={stats.total}     valueColor="text-brand-white" />
          <StatCard label="Pending"       value={stats.pending}   valueColor="text-yellow-400" />
          <StatCard label="Reviewing"     value={stats.reviewing} valueColor="text-blue-400" />
          <StatCard label="Completed"     value={stats.completed} valueColor="text-green-400" />
        </div>
      )}

      {/* Recent submissions */}
      <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h2 className="font-body text-brand-white font-medium text-sm">Recent Submissions</h2>
          <Link
            to="/admin/submissions"
            className="font-body text-brand-pink/70 hover:text-brand-pink text-xs flex items-center gap-1.5 transition-colors"
          >
            View all
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* List */}
        {recent.length === 0 ? (
          <div className="py-14 text-center">
            <p className="font-body text-brand-white/25 text-sm">No submissions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {recent.map((sub) => (
              <Link
                key={sub.id}
                to={`/admin/submissions/${sub.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-body text-brand-white text-sm font-medium group-hover:text-brand-pink transition-colors truncate">
                    {sub.customerName}
                  </p>
                  <p className="font-body text-brand-white/30 text-xs mt-0.5">
                    {sub.phoneNumber} · {formatDate(sub.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                  <span className="font-mono text-brand-white/55 text-sm hidden sm:block">
                    {formatCurrency(Number(sub.amountPaid))}
                  </span>
                  <StatusBadge status={sub.status} />
                  <ArrowRight
                    size={14}
                    className="text-brand-white/15 group-hover:text-brand-pink transition-colors"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
