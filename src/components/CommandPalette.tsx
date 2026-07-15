import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, LayoutDashboard, Monitor, Tablet, Image as ImageIcon,
  Settings, Users as UsersIcon, CreditCard, FolderTree, BookOpen,
  CornerDownLeft, ArrowUp, ArrowDown, X, BarChart3, Calendar, User, Bell, Shield, HelpCircle, Download, Webhook, Activity, Sparkles, Lightbulb, Tags, FlaskConical, Flame, QrCode, Calculator, Store, Layout, Zap, Layers, ClipboardCheck, Siren, Heart,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const commands = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, path: '/' },
  { id: 'screens', label: 'الشاشات', icon: Monitor, path: '/screens' },
  { id: 'devices', label: 'الأجهزة', icon: Tablet, path: '/devices' },
  { id: 'media', label: 'مكتبة الوسائط', icon: ImageIcon, path: '/media' },
  { id: 'analytics', label: 'التحليلات', icon: BarChart3, path: '/analytics' },
  { id: 'ai-generator', label: 'مولد المحتوى AI', icon: Sparkles, path: '/ai-generator' },
  { id: 'ai-recommendations', label: 'اقتراحات ذكية', icon: Lightbulb, path: '/ai-recommendations' },
  { id: 'auto-tagging', label: 'تصنيف تلقائي', icon: Tags, path: '/auto-tagging' },
  { id: 'ab-testing', label: 'اختبارات A/B', icon: FlaskConical, path: '/ab-testing' },
  { id: 'heatmaps', label: 'خرائط حرارية', icon: Flame, path: '/heatmaps' },
  { id: 'qr-analytics', label: 'تحليلات QR', icon: QrCode, path: '/qr-analytics' },
  { id: 'roi-calculator', label: 'حاسبة ROI', icon: Calculator, path: '/roi-calculator' },
  { id: 'templates', label: 'متجر القوالب', icon: Store, path: '/templates' },
  { id: 'screen-builder', label: 'منشئ الشاشات', icon: Layout, path: '/screen-builder' },
  { id: 'multi-zone', label: 'تخطيطات متعددة', icon: Layout, path: '/multi-zone' },
  { id: 'widgets', label: 'ودجت ديناميكية', icon: Zap, path: '/widgets' },
  { id: 'bulk-operations', label: 'عمليات مجمعة', icon: Layers, path: '/bulk-operations' },
  { id: 'approval-workflow', label: 'سير الموافقات', icon: ClipboardCheck, path: '/approval-workflow' },
  { id: 'emergency-broadcast', label: 'بث الطوارئ', icon: Siren, path: '/emergency-broadcast' },
  { id: 'health-monitoring', label: 'مراقبة الصحة', icon: Heart, path: '/health-monitoring' },
  { id: 'calendar', label: 'الجدولة', icon: Calendar, path: '/calendar' },
  { id: 'users', label: 'المستخدمين', icon: UsersIcon, path: '/users' },
  { id: 'notifications', label: 'الإشعارات', icon: Bell, path: '/notifications' },
  { id: 'audit-logs', label: 'سجل العمليات', icon: Shield, path: '/audit-logs' },
  { id: 'timeline', label: 'الجدول الزمني', icon: Activity, path: '/timeline' },
  { id: 'export-import', label: 'تصدير/استيراد', icon: Download, path: '/export-import' },
  { id: 'webhooks', label: 'التكاملات', icon: Webhook, path: '/webhooks' },
  { id: 'profile', label: 'الملف الشخصي', icon: User, path: '/profile' },
  { id: 'settings', label: 'الإعدادات', icon: Settings, path: '/settings' },
  { id: 'subscriptions', label: 'الاشتراكات', icon: CreditCard, path: '/subscriptions' },
  { id: 'groups', label: 'المجموعات', icon: FolderTree, path: '/groups' },
  { id: 'tutorials', label: 'الدروس', icon: BookOpen, path: '/tutorials' },
  { id: 'help', label: 'المساعدة', icon: HelpCircle, path: '/help' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const filtered = commands.filter((c) => c.label.includes(query))

  const handleSelect = useCallback((cmd: typeof commands[0]) => {
    navigate(cmd.path)
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [navigate])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[activeIndex]) handleSelect(filtered[activeIndex])
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[150] bg-slate-900/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[151] w-full max-w-lg px-4">
        <div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ابحث عن صفحة أو إجراء..."
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">لا توجد نتائج</p>
              </div>
            ) : (
              filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-right',
                    activeIndex === i ? 'bg-royal-50' : 'hover:bg-slate-50'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                    activeIndex === i ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500'
                  )}>
                    <cmd.icon className="w-4 h-4" />
                  </div>
                  <span className={cn(
                    'text-sm font-medium flex-1',
                    activeIndex === i ? 'text-royal-700' : 'text-slate-700'
                  )}>
                    {cmd.label}
                  </span>
                  {activeIndex === i && (
                    <CornerDownLeft className="w-4 h-4 text-royal-400" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-sans">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-sans">↓</kbd>
                تنقل
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-sans">↵</kbd>
                اختيار
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-sans">esc</kbd>
                إغلاق
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">SmartScreen</span>
          </div>
        </div>
      </div>
    </>
  )
}
