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
  BarChart3,
  Calendar,
  User,
  Bell,
  Shield,
  HelpCircle,
  Download,
  Webhook,
  Activity,
  Sparkles,
  Lightbulb,
  Tags,
  FlaskConical,
  Flame,
  QrCode,
  Calculator,
  Store,
  Layout,
  Zap,
  Layers,
  ClipboardCheck,
  Siren,
  Heart,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/context/I18nContext'

const navItems = [
  { to: '/', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { to: '/screens', icon: Monitor, labelKey: 'nav.screens' },
  { to: '/devices', icon: Tablet, labelKey: 'nav.devices' },
  { to: '/media', icon: Image, labelKey: 'nav.media' },
  { to: '/groups', icon: FolderTree, labelKey: 'nav.groups' },
  { to: '/analytics', icon: BarChart3, labelKey: 'nav.analytics' },
  { to: '/ai-generator', icon: Sparkles, labelKey: 'nav.aiGenerator' },
  { to: '/ai-recommendations', icon: Lightbulb, labelKey: 'nav.aiRecommendations' },
  { to: '/auto-tagging', icon: Tags, labelKey: 'nav.autoTagging' },
  { to: '/ab-testing', icon: FlaskConical, labelKey: 'nav.abTesting' },
  { to: '/heatmaps', icon: Flame, labelKey: 'nav.heatmaps' },
  { to: '/qr-analytics', icon: QrCode, labelKey: 'nav.qrAnalytics' },
  { to: '/roi-calculator', icon: Calculator, labelKey: 'nav.roiCalculator' },
  { to: '/templates', icon: Store, labelKey: 'nav.templates' },
  { to: '/screen-builder', icon: Layout, labelKey: 'nav.screenBuilder' },
  { to: '/multi-zone', icon: Layout, labelKey: 'nav.multiZone' },
  { to: '/widgets', icon: Zap, labelKey: 'nav.widgets' },
  { to: '/bulk-operations', icon: Layers, labelKey: 'nav.bulkOperations' },
  { to: '/approval-workflow', icon: ClipboardCheck, labelKey: 'nav.approvalWorkflow' },
  { to: '/emergency-broadcast', icon: Siren, labelKey: 'nav.emergencyBroadcast' },
  { to: '/health-monitoring', icon: Heart, labelKey: 'nav.healthMonitoring' },
  { to: '/calendar', icon: Calendar, labelKey: 'nav.calendar' },
  { to: '/users', icon: Users, labelKey: 'nav.users' },
  { to: '/notifications', icon: Bell, labelKey: 'nav.notifications' },
  { to: '/audit-logs', icon: Shield, labelKey: 'nav.auditLogs' },
  { to: '/timeline', icon: Activity, labelKey: 'nav.timeline' },
  { to: '/export-import', icon: Download, labelKey: 'nav.exportImport' },
  { to: '/webhooks', icon: Webhook, labelKey: 'nav.webhooks' },
  { to: '/subscriptions', icon: CreditCard, labelKey: 'nav.subscriptions' },
  { to: '/profile', icon: User, labelKey: 'nav.profile' },
  { to: '/settings', icon: Settings, labelKey: 'nav.settings' },
  { to: '/help', icon: HelpCircle, labelKey: 'nav.help' },
  { to: '/tutorials', icon: GraduationCap, labelKey: 'nav.tutorials' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { t } = useI18n()
  return (
    <aside
      className={cn(
        'fixed top-0 right-0 h-screen z-50 flex flex-col',
        'bg-white/90 backdrop-blur-2xl border-l border-slate-200/60',
        'transition-all duration-300',
        collapsed ? 'lg:w-20' : 'lg:w-72',
        'w-72',
        mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
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
            onClick={onMobileClose}
            className={({ isActive }) =>
              cn('nav-item', isActive && 'nav-item-active', collapsed && 'justify-center px-2')
            }
            title={collapsed ? t(item.labelKey) : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{t(item.labelKey)}</span>}
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
