import { useState, useEffect } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { SubmissionsTable } from '@/components/admin/SubmissionsTable'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { useSubmissions } from '@/hooks/useSubmissions'
import type { SubmissionStatus } from '@/types'

// ─── Filter config ────────────────────────────────────────────────────────────

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: 'All',        value: '' },
  { label: 'Pending',    value: 'pending' },
  { label: 'Reviewing',  value: 'reviewing' },
  { label: 'Confirmed',  value: 'confirmed' },
  { label: 'Processing', value: 'processing' },
  { label: 'Completed',  value: 'completed' },
  { label: 'Cancelled',  value: 'cancelled' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminSubmissionsPage() {
  const [page, setPage]     = useState(1)
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(timer)
  }, [search])

  // Reset to page 1 whenever filters change
  useEffect(() => { setPage(1) }, [status, debouncedSearch])

  const { submissions, pagination, loading, error } = useSubmissions({
    page,
    limit: 20,
    status: status as SubmissionStatus | undefined || undefined,
    search: debouncedSearch || undefined,
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-brand-white font-light">Submissions</h1>
        <p className="font-body text-brand-white/35 text-sm mt-1">
          {pagination ? `${pagination.total} total orders` : 'Loading…'}
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Search input */}
        <div className="relative flex-1 min-w-0">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-white/25 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-black-card border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 font-body text-sm text-brand-white placeholder-white/20 focus:outline-none focus:border-brand-pink/40 transition-colors"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setStatus(value)}
              className={`px-3 py-2 rounded-xl font-body text-xs font-medium transition-all ${
                status === value
                  ? 'bg-brand-pink text-white'
                  : 'bg-brand-black-card border border-white/[0.08] text-brand-white/45 hover:text-brand-white hover:border-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="bg-brand-black-card border border-white/[0.08] rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-44">
              <Spinner size={24} />
            </div>
          ) : (
            <SubmissionsTable submissions={submissions} />
          )}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="p-2 rounded-xl bg-brand-black-card border border-white/[0.08] text-brand-white/45 hover:text-brand-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-body text-brand-white/35 text-sm">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page === pagination.totalPages}
            aria-label="Next page"
            className="p-2 rounded-xl bg-brand-black-card border border-white/[0.08] text-brand-white/45 hover:text-brand-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
