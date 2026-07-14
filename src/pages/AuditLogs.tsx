import { useState } from 'react'
import {
  Shield, Search, Filter, Download, User, Monitor, Tablet,
  Settings, Trash2, Edit2, Plus, LogIn, LogOut, Key, AlertCircle,
  CheckCircle2, Clock, ChevronDown, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogEntry {
  id: number
  user: string
  action: string
  category: 'auth' | 'screen' | 'device' | 'user' | 'settings' | 'security'
  type: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'warning'
  target: string
  ip: string
  time: string
  date: string
}

const logs: LogEntry[] = [
  { id: 1, user: 'نبيل كريم', action: 'تسجيل دخول', category: 'auth', type: 'login', target: 'النظام', ip: '192.168.1.10', time: '09:42 ص', date: 'اليوم' },
  { id: 2, user: 'نبيل كريم', action: 'إنشاء شاشة جديدة', category: 'screen', type: 'create', target: 'شاشة الاستقبال', ip: '192.168.1.10', time: '09:45 ص', date: 'اليوم' },
  { id: 3, user: 'أحمد محمد', action: 'تحديث محتوى', category: 'screen', type: 'update', target: 'شاشة الكافيه', ip: '192.168.1.25', time: '10:12 ص', date: 'اليوم' },
  { id: 4, user: 'نبيل كريم', action: 'ربط جهاز جديد', category: 'device', type: 'create', target: 'iPad-Pro', ip: '192.168.1.10', time: '10:30 ص', date: 'اليوم' },
  { id: 5, user: 'سارة علي', action: 'تغيير الإعدادات', category: 'settings', type: 'update', target: 'إعدادات الأمان', ip: '192.168.1.45', time: '11:15 ص', date: 'اليوم' },
  { id: 6, user: 'نبيل كريم', action: 'إضافة مستخدم', category: 'user', type: 'create', target: 'سارة علي', ip: '192.168.1.10', time: '11:42 ص', date: 'اليوم' },
  { id: 7, user: 'أحمد محمد', action: 'حذف شاشة', category: 'screen', type: 'delete', target: 'شاشة قديمة', ip: '192.168.1.25', time: '12:05 م', date: 'اليوم' },
  { id: 8, user: 'System', action: 'تنبيه أمني', category: 'security', type: 'warning', target: 'محاولة دخول فاشلة', ip: '203.45.12.8', time: '12:20 م', date: 'اليوم' },
  { id: 9, user: 'نبيل كريم', action: 'تغيير كلمة المرور', category: 'security', type: 'update', target: 'حساب نبيل', ip: '192.168.1.10', time: '01:15 م', date: 'اليوم' },
  { id: 10, user: 'سارة علي', action: 'تسجيل خروج', category: 'auth', type: 'logout', target: 'النظام', ip: '192.168.1.45', time: '02:30 م', date: 'اليوم' },
  { id: 11, user: 'نبيل كريم', action: 'تحديث مجموعة', category: 'settings', type: 'update', target: 'wow bshmel', ip: '192.168.1.10', time: '03:00 م', date: 'أمس' },
  { id: 12, user: 'أحمد محمد', action: 'حذف جهاز', category: 'device', type: 'delete', target: 'Galaxy Tab A', ip: '192.168.1.25', time: '04:15 م', date: 'أمس' },
  { id: 13, user: 'System', action: 'نسخة احتياطية', category: 'settings', type: 'create', target: 'النظام', ip: 'localhost', time: '11:00 م', date: 'أمس' },
  { id: 14, user: 'نبيل كريم', action: 'تسجيل دخول', category: 'auth', type: 'login', target: 'النظام', ip: '192.168.1.10', time: '08:30 ص', date: 'أمس' },
  { id: 15, user: 'سارة علي', action: 'تحديث صلاحيات', category: 'user', type: 'update', target: 'أحمد محمد', ip: '192.168.1.45', time: '10:00 ص', date: 'أمس' },
]

const typeConfig = {
  create: { icon: Plus, bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'إنشاء' },
  update: { icon: Edit2, bg: 'bg-blue-50', text: 'text-blue-600', label: 'تحديث' },
  delete: { icon: Trash2, bg: 'bg-red-50', text: 'text-red-500', label: 'حذف' },
  login: { icon: LogIn, bg: 'bg-royal-50', text: 'text-royal-600', label: 'دخول' },
  logout: { icon: LogOut, bg: 'bg-slate-100', text: 'text-slate-500', label: 'خروج' },
  warning: { icon: AlertCircle, bg: 'bg-gold-50', text: 'text-gold-600', label: 'تنبيه' },
}

const categoryLabels = {
  auth: 'المصادقة',
  screen: 'الشاشات',
  device: 'الأجهزة',
  user: 'المستخدمين',
  settings: 'الإعدادات',
  security: 'الأمان',
}

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = logs.filter((log) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (!log.user.toLowerCase().includes(q) && !log.action.toLowerCase().includes(q) && !log.target.toLowerCase().includes(q)) return false
    }
    if (categoryFilter !== 'all' && log.category !== categoryFilter) return false
    if (typeFilter !== 'all' && log.type !== typeFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">سجل العمليات</h1>
          <p className="text-slate-400 text-sm mt-1">تتبع كل العمليات في النظام</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-ghost flex items-center gap-2 text-sm"
          >
            <Filter className="w-4 h-4" />
            فلترة
            <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', showFilters && 'rotate-180')} />
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            تصدير السجل
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي العمليات', value: logs.length, icon: Shield, color: 'royal' },
          { label: 'عمليات اليوم', value: logs.filter((l) => l.date === 'اليوم').length, icon: Clock, color: 'emerald' },
          { label: 'تنبيهات أمنية', value: logs.filter((l) => l.type === 'warning').length, icon: AlertCircle, color: 'gold' },
          { label: 'عمليات حذف', value: logs.filter((l) => l.type === 'delete').length, icon: Trash2, color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-3">
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', `bg-${stat.color}-50 text-${stat.color}-600`)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="glass-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في السجل (مستخدم / عملية / هدف)..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-royal-500/50 transition-all"
          />
        </div>
        {showFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">التصنيف:</span>
            {['all', 'auth', 'screen', 'device', 'user', 'settings', 'security'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  categoryFilter === cat ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                )}
              >
                {cat === 'all' ? 'الكل' : categoryLabels[cat as keyof typeof categoryLabels]}
              </button>
            ))}
            <span className="text-xs text-slate-400 font-medium mr-2">النوع:</span>
            {['all', 'create', 'update', 'delete', 'login', 'logout', 'warning'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  typeFilter === type ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                )}
              >
                {type === 'all' ? 'الكل' : typeConfig[type as keyof typeof typeConfig].label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Logs Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-right">
                <th className="p-4 text-sm font-semibold text-slate-500">المستخدم</th>
                <th className="p-4 text-sm font-semibold text-slate-500">العملية</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الهدف</th>
                <th className="p-4 text-sm font-semibold text-slate-500">التصنيف</th>
                <th className="p-4 text-sm font-semibold text-slate-500">IP</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الوقت</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => {
                const config = typeConfig[log.type]
                const Icon = config.icon
                return (
                  <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-royal-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {log.user === 'System' ? 'S' : log.user.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{log.user}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold', config.bg, config.text)}>
                        <Icon className="w-3 h-3" />
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-600">{log.target}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-slate-500 px-2 py-1 rounded-md bg-slate-100">{categoryLabels[log.category]}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-slate-400 font-mono" dir="ltr">{log.ip}</span>
                    </td>
                    <td className="p-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-600">{log.time}</p>
                        <p className="text-xs text-slate-400">{log.date}</p>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-8 h-8 text-slate-200 mx-auto mb-2" />
            <p className="text-sm text-slate-400">لا توجد نتائج مطابقة</p>
          </div>
        )}
      </div>
    </div>
  )
}
