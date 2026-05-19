import { useState, useEffect, useCallback } from 'react'
import { adminApi } from '@/api/admin'
import type { Submission, Pagination } from '@/types'

interface UseSubmissionsOptions {
  page?: number
  limit?: number
  status?: string
  search?: string
}

interface UseSubmissionsReturn {
  submissions: Submission[]
  pagination: Pagination | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useSubmissions(options: UseSubmissionsOptions = {}): UseSubmissionsReturn {
  const { page = 1, limit = 20, status, search } = options

  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    adminApi
      .getSubmissions({
        page,
        limit,
        status: status || undefined,
        search: search || undefined,
      })
      .then((result) => {
        if (cancelled) return
        setSubmissions(result.submissions)
        setPagination(result.pagination)
      })
      .catch(() => {
        if (cancelled) return
        setError('Failed to load submissions')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [page, limit, status, search, tick])

  return { submissions, pagination, loading, error, refetch }
}
