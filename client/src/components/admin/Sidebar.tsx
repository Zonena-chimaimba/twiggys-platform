import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Inbox, LogOut } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { useAuth } from '@/context/AuthContext'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/submissions', label: 'Submissions', icon: Inbox, end: false },
]

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <aside className="flex flex-col h-full w-60 bg-brand-black-card border-r border-white/[0.06] p-5">
      <div className="flex items-center gap-3 mb-8">
        <Logo size={36} />
        <div>
          <p className="font-display text-brand-white text-sm leading-tight">Twiggy &amp; Sithe's</p>
          <p className="font-body text-brand-white/25 text-[10px] tracking-widest uppercase mt-0.5">
            Admin
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all ${
                isActive
                  ? 'bg-brand-pink/15 text-brand-pink border border-brand-pink/20'
                  : 'text-brand-white/45 hover:text-brand-white hover:bg-white/[0.05]'
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/[0.06] pt-4 mt-4 space-y-3">
        {admin && (
          <p className="font-body text-brand-white/25 text-xs truncate">{admin.email}</p>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-brand-white/35 hover:text-red-400 font-body text-sm transition-colors w-full"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
