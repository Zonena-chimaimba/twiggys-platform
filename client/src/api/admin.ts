import { api } from './client'
import type {
  Admin,
  Submission,
  SubmissionStatus,
  DashboardStats,
  Pagination,
} from '@/types'

export const adminApi = {
  login: async (
    username: string,
    password: string
  ): Promise<{ token: string; admin: Admin }> => {
    const { data } = await api.post('/admin/login', {username, password })
    return data.data as { token: string; admin: Admin }
  },

  getMe: async (): Promise<Admin> => {
    const { data } = await api.get('/admin/me')
    return data.data.admin as Admin
  },

  getStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get('/admin/stats')
    return data.data.stats as DashboardStats
  },

  getSubmissions: async (params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }): Promise<{ submissions: Submission[]; pagination: Pagination }> => {
    const { data } = await api.get('/admin/submissions', { params })
    return data.data as { submissions: Submission[]; pagination: Pagination }
  },

  getSubmission: async (id: string): Promise<Submission> => {
    const { data } = await api.get(`/admin/submissions/${id}`)
    return data.data.submission as Submission
  },

  updateStatus: async (
    id: string,
    status: SubmissionStatus
  ): Promise<Submission> => {
    const { data } = await api.patch(`/admin/submissions/${id}/status`, {
      status,
    })
    return data.data.submission as Submission
  },

  getMessages: async (params?: {
    page?: number
    unread?: boolean
  }): Promise<{ messages: unknown[]; pagination: Pagination }> => {
    const { data } = await api.get('/admin/messages', { params })
    return data.data as { messages: unknown[]; pagination: Pagination }
  },

  markMessageRead: async (id: string): Promise<void> => {
    await api.patch(`/admin/messages/${id}/read`)
  },
}
