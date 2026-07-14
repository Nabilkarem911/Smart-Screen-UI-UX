import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Monitor,
  Tablet,
  Image,
  Settings,
  CreditCard,
  FolderTree,
  Users,
  GraduationCap,
  ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'الرئيسية', labelEn: 'Dashboard' },
  { to: '/screens', icon: Monitor, label: 'الشاشات', labelEn: 'Screens' },
  { to: '/devices', icon: Tablet, label: 'الأجهزة', labelEn: 'Devices' },
  { to: '/media', icon: Image, label: 'مكتبة الميديا', labelEn: 'Media Library' },
  { to: '/groups', icon: FolderTree, label: 'المجموعات', labelEn: 'Groups' },
  { to: '/users', icon: Users, label: 'المستخدمين', labelEn: 'Users' },
  { to: '/subscriptions', icon: CreditCard, label: 'الاشتراكات', labelEn: 'Subscriptions' },
  { to: '/settings', icon: Settings, label: 'الإعدادات', labelEn: 'Settings' },
  { to: '/tutorials', icon: GraduationCap, label: 'الشروحات', labelEn: 'Tutorials' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed top-0 right-0 h-screen z-50 flex flex-col',
        'bg-white/90 backdrop-blur-2xl border-l border-slate-200/60',
        'transition-all duration-300',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b border-slate-200/40">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
          <img src="/logo.png" alt="SmartScreen" className="w-7 h-7 object-contain" />
        </div>
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <h1 className="text-slate-900 font-bold text-lg leading-tight">SmartScreen</h1>
            <p className="text-slate-400 text-xs">نظام إدارة الشاشات</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-slate-400',
            'hover:text-slate-900 hover:bg-slate-200 transition-all',
            'flex items-center justify-center'
          )}
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn('nav-item', isActive && 'nav-item-active', collapsed && 'justify-center px-2')
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200/40">
          <div className="glass-card p-4 text-center">
            <p className="text-gold-600 text-xs font-semibold mb-1">النسخة التجريبية</p>
            <p className="text-slate-400 text-xs">SmartScreen v1.0.0</p>
          </div>
        </div>
      )}
    </aside>
  )
}
