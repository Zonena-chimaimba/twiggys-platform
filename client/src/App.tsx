import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/shared/ProtectedRoute'
import LandingPage from '@/pages/public/LandingPage'
import AdminLoginPage from '@/pages/admin/AdminLoginPage'
import AdminLayout from '@/pages/admin/AdminLayout'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminSubmissionsPage from '@/pages/admin/AdminSubmissionsPage'
import AdminSubmissionDetailPage from '@/pages/admin/AdminSubmissionDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Public ── */}
          <Route path="/" element={<LandingPage />} />

          {/* ── Admin auth ── */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* ── Admin (protected, nested layout) ── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="submissions" element={<AdminSubmissionsPage />} />
            <Route path="submissions/:id" element={<AdminSubmissionDetailPage />} />
          </Route>

          {/* ── Catch-all ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
