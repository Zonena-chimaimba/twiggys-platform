import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Sidebar } from '@/components/admin/Sidebar'
import { Logo } from '@/components/ui/Logo'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-brand-black flex">

      {/* ── Desktop sidebar (always visible) ────────────────────────────────── */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* ── Mobile sidebar overlay ───────────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="relative z-10 animate-fade-in">
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
          {/* Close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-brand-white/50 hover:text-brand-white z-20"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* ── Main content area ────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-brand-black-card">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-brand-white/50 hover:text-brand-white transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <Logo size={26} showText />
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
