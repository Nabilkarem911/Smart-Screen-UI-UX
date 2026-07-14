import { useState } from 'react'
import {
  Monitor, Tablet, Users, Settings, FileText, Plug, Shield,
  Bell, Calendar, CheckCircle2, AlertCircle, Plus, Edit2,
  Trash2, LogIn, LogOut, Key, Download, Filter, Activity,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineEvent {
  id: number
  user: string
  action: string
  type: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'warning' | 'security'
  category: 'screen' | 'device' | 'user' | 'settings' | 'media' | 'auth' | 'security'
  target: string
  time: string
  timestamp: string
}

const timelineEvents: TimelineEvent[] = [
  { id: 1, user: 'نبيل كريم', action: 'تسجيل دخول', type: 'login', category: 'auth', target: 'النظام', time: '09:42 ص', timestamp: 'اليوم' },
  { id: 2, user: 'نبيل كريم', action: 'إنشاء شاشة', type: 'create', category: 'screen', target: 'شاشة الاستقبال', time: '09:45 ص', timestamp: 'اليوم' },
  { id: 3, user: 'نبيل كريم', action: 'رفع وسائط', type: 'create', category: 'media', target: '5 صور جديدة', time: '10:00 ص', timestamp: 'اليوم' },
  { id: 4, user: 'أحمد محمد', action: 'تحديث محتوى', type: 'update', category: 'screen', target: 'شاشة الكافيه', time: '10:12 ص', timestamp: 'اليوم' },
  { id: 5, user: 'نبيل كريم', action: 'ربط جهاز', type: 'create', category: 'device', target: 'iPad-Pro', time: '10:30 ص', timestamp: 'اليوم' },
  { id: 6, user: 'سارة علي', action: 'تغيير إعدادات', type: 'update', category: 'settings', target: 'إعدادات الأمان', time: '11:15 ص', timestamp: 'اليوم' },
  { id: 7, user: 'نبيل كريم', action: 'إضافة مستخدم', type: 'create', category: 'user', target: 'سارة علي', time: '11:42 ص', timestamp: 'اليوم' },
  { id: 8, user: 'System', action: 'تنبيه أمني', type: 'warning', category: 'security', target: 'محاولة دخول فاشلة', time: '12:20 م', timestamp: 'اليوم' },
  { id: 9, user: 'نبيل كريم', action: 'تغيير كلمة المرور', type: 'security', category: 'security', target: 'حساب نبيل', time: '01:15 م', timestamp: 'اليوم' },
  { id: 10, user: 'أحمد محمد', action: 'حذف شاشة', type: 'delete', category: 'screen', target: 'شاشة قديمة', time: '02:05 م', timestamp: 'اليوم' },
  { id: 11, user: 'سارة علي', action: 'تسجيل خروج', type: 'logout', category: 'auth', target: 'النظام', time: '02:30 م', timestamp: 'اليوم' },
  { id: 12, user: 'نبيل كريم', action: 'جدولة محتوى', type: 'create', category: 'screen', target: 'عرض الصباح', time: '03:00 م', timestamp: 'اليوم' },
  { id: 13, user: 'نبيل كريم', action: 'تسجيل دخول', type: 'login', category: 'auth', target: 'النظام', time: '08:30 ص', timestamp: 'أمس' },
  { id: 14, user: 'سارة علي', action: 'تحديث صلاحيات', type: 'update', category: 'user', target: 'أحمد محمد', time: '10:00 ص', timestamp: 'أمس' },
  { id: 15, user: 'System', action: 'نسخة احتياطية', type: 'create', category: 'settings', target: 'النظام', time: '11:00 م', timestamp: 'أمس' },
]

const typeConfig = {
  create: { icon: Plus, bg: 'bg-emerald-500', ring: 'ring-emerald-100', label: 'إنشاء' },
  update: { icon: Edit2, bg: 'bg-blue-500', ring: 'ring-blue-100', label: 'تحديث' },
  delete: { icon: Trash2, bg: 'bg-red-500', ring: 'ring-red-100', label: 'حذف' },
  login: { icon: LogIn, bg: 'bg-royal-500', ring: 'ring-royal-100', label: 'دخول' },
  logout: { icon: LogOut, bg: 'bg-slate-400', ring: 'ring-slate-100', label: 'خروج' },
  warning: { icon: AlertCircle, bg: 'bg-gold-500', ring: 'ring-gold-100', label: 'تنبيه' },
  security: { icon: Key, bg: 'bg-purple-500', ring: 'ring-purple-100', label: 'أمان' },
}

const categoryIcons = {
  screen: Monitor,
  device: Tablet,
  user: Users,
  settings: Settings,
  media: FileText,
  auth: Shield,
  security: Shield,
}

const filters = [
  { key: 'all', label: 'الكل' },
  { key: 'today', label: 'اليوم' },
  { key: 'yesterday', label: 'أمس' },
  { key: 'create', label: 'إنشاء' },
  { key: 'update', label: 'تحديث' },
  { key: 'delete', label: 'حذف' },
  { key: 'security', label: 'أمان' },
]

export default function ActivityTimeline() {
  const [filter, setFilter] = useState<string>('all')

  const filtered = timelineEvents.filter((e) => {
    if (filter === 'all') return true
    if (filter === 'today') return e.timestamp === 'اليوم'
    if (filter === 'yesterday') return e.timestamp === 'أمس'
    return e.type === filter
  })

  // Group by timestamp
  const grouped = filtered.reduce((acc, event) => {
    if (!acc[event.timestamp]) acc[event.timestamp] = []
    acc[event.timestamp].push(event)
    return acc
  }, {} as Record<string, TimelineEvent[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">الجدول الزمني للنشاط</h1>
          <p className="text-slate-400 text-sm mt-1">كل أحداث النظام مرتبة زمنياً</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            تصدير
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'أحداث اليوم', value: timelineEvents.filter((e) => e.timestamp === 'اليوم').length, icon: Activity, color: 'royal' },
          { label: 'عمليات إنشاء', value: timelineEvents.filter((e) => e.type === 'create').length, icon: Plus, color: 'emerald' },
          { label: 'عمليات حذف', value: timelineEvents.filter((e) => e.type === 'delete').length, icon: Trash2, color: 'red' },
          { label: 'تنبيهات أمنية', value: timelineEvents.filter((e) => e.type === 'warning' || e.type === 'security').length, icon: Shield, color: 'gold' },
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

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-slate-400" />
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              filter === f.key ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([timestamp, events]) => (
          <div key={timestamp}>
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-bold text-slate-400 px-3 py-1 rounded-full bg-slate-100">{timestamp}</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Events */}
            <div className="relative space-y-3 pr-6">
              {/* Vertical Line */}
              <div className="absolute right-2.5 top-0 bottom-0 w-px bg-slate-200" />

              {events.map((event) => {
                const config = typeConfig[event.type]
                const Icon = config.icon
                const CatIcon = categoryIcons[event.category]
                return (
                  <div key={event.id} className="relative">
                    {/* Dot */}
                    <div className={cn(
                      'absolute -right-6 top-3 w-5 h-5 rounded-full ring-4 flex items-center justify-center',
                      config.bg, config.ring
                    )}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>

                    {/* Card */}
                    <div className="glass-card p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-royal-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {event.user === 'System' ? 'S' : event.user.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-900">
                              <span className="font-semibold">{event.user}</span>
                              <span className="text-slate-500"> {event.action} </span>
                              <span className="font-medium text-royal-600">{event.target}</span>
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-slate-400">{event.time}</span>
                              <span className="text-xs text-slate-300">•</span>
                              <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md', `bg-${config.bg.replace('bg-', '').replace('500', '50')} text-${config.bg.replace('bg-', '').replace('500', '600')}`)}>
                                <CatIcon className="w-3 h-3" />
                                {config.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Activity className="w-8 h-8 text-slate-200 mx-auto mb-2" />
          <p className="text-sm text-slate-400">لا توجد أحداث مطابقة</p>
        </div>
      )}
    </div>
  )
}
