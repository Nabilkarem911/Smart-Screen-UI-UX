import { useState } from 'react'
import {
  Bell, CheckCircle2, AlertCircle, Info, Monitor, Plug,
  Shield, Calendar, Trash2, Check, X, Filter, CheckCheck,
  Settings as SettingsIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Notification {
  id: number
  title: string
  desc: string
  time: string
  type: 'success' | 'warning' | 'error' | 'info'
  category: 'system' | 'device' | 'security' | 'schedule'
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, title: 'شاشة جديدة متصلة', desc: 'تم ربط شاشة "شاشة الكافيه" بنجاح', time: 'منذ 5 دقائق', type: 'success', category: 'device', read: false },
  { id: 2, title: 'تحديث أمني متاح', desc: 'يتوفر تحديث أمني جديد للنظام، يُفضل تثبيته فوراً', time: 'منذ 15 دقيقة', type: 'warning', category: 'security', read: false },
  { id: 3, title: 'شاشة متوقفة', desc: 'شاشة "الخارج" توقفت عن العمل منذ 3 ساعات', time: 'منذ ساعة', type: 'error', category: 'device', read: false },
  { id: 4, title: 'جدولة جديدة', desc: 'تم إنشاء جدولة جديدة لشاشة الاستقبال يومياً الساعة 8:00 ص', time: 'منذ 2 ساعة', type: 'info', category: 'schedule', read: false },
  { id: 5, title: 'تم تحديث المحتوى', desc: 'تم تحديث 5 صفحات في شاشة الممر', time: 'منذ 3 ساعات', type: 'success', category: 'system', read: true },
  { id: 6, title: 'تسجيل دخول جديد', desc: 'تم تسجيل دخول من جهاز Chrome - Windows في بغداد', time: 'منذ 5 ساعات', type: 'info', category: 'security', read: true },
  { id: 7, title: 'اشتراك ينتهي قريباً', desc: 'اشتراكك ينتهي خلال 23 يوم', time: 'منذ يوم', type: 'warning', category: 'system', read: true },
  { id: 8, title: 'جهاز جديد', desc: 'تم ربط جهاز iPad-Pro بنجاح', time: 'منذ يوم', type: 'success', category: 'device', read: true },
  { id: 9, title: 'نسخة احتياطية', desc: 'تم إنشاء نسخة احتياطية تلقائية للنظام', time: 'منذ يومين', type: 'info', category: 'system', read: true },
  { id: 10, title: 'محتوى مجدول', desc: 'سيتم عرض المحتوى الجديد غداً الساعة 10:00 ص', time: 'منذ يومين', type: 'info', category: 'schedule', read: true },
]

const typeConfig = {
  success: { icon: CheckCircle2, bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  warning: { icon: AlertCircle, bg: 'bg-gold-50', text: 'text-gold-600', border: 'border-gold-200' },
  error: { icon: AlertCircle, bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
  info: { icon: Info, bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
}

const categoryConfig = {
  system: { icon: Monitor, label: 'النظام' },
  device: { icon: Plug, label: 'الأجهزة' },
  security: { icon: Shield, label: 'الأمان' },
  schedule: { icon: Calendar, label: 'الجدولة' },
}

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'system' | 'device' | 'security' | 'schedule'>('all')

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true
    if (filter === 'unread') return !n.read
    return n.category === filter
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const filterTabs = [
    { key: 'all' as const, label: 'الكل', count: notifications.length },
    { key: 'unread' as const, label: 'غير مقروء', count: unreadCount },
    { key: 'system' as const, label: 'النظام', count: notifications.filter((n) => n.category === 'system').length },
    { key: 'device' as const, label: 'الأجهزة', count: notifications.filter((n) => n.category === 'device').length },
    { key: 'security' as const, label: 'الأمان', count: notifications.filter((n) => n.category === 'security').length },
    { key: 'schedule' as const, label: 'الجدولة', count: notifications.filter((n) => n.category === 'schedule').length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">الإشعارات</h1>
          <p className="text-slate-400 text-sm mt-1">
            {unreadCount > 0 ? `لديك ${unreadCount} إشعار غير مقروء` : 'كل الإشعارات مقروءة'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              <CheckCheck className="w-4 h-4" />
              تعليم الكل كمقروء
            </button>
          )}
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <SettingsIcon className="w-4 h-4" />
            إعدادات الإشعارات
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2',
              filter === tab.key
                ? 'bg-royal-gradient text-white shadow-glow-purple'
                : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            )}
          >
            {tab.label}
            <span className={cn(
              'text-[10px] px-1.5 py-0.5 rounded-full font-bold',
              filter === tab.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-slate-200" />
            </div>
            <p className="text-slate-400 text-sm">لا توجد إشعارات</p>
          </div>
        ) : (
          filtered.map((notif) => {
            const config = typeConfig[notif.type]
            const catConfig = categoryConfig[notif.category]
            const Icon = config.icon
            return (
              <div
                key={notif.id}
                className={cn(
                  'glass-card p-4 flex items-start gap-4 transition-all hover:shadow-md',
                  !notif.read && 'border-r-4 border-r-royal-500'
                )}
              >
                {/* Icon */}
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', config.bg, config.text)}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={cn('text-sm font-semibold', notif.read ? 'text-slate-600' : 'text-slate-900')}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-royal-500 flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{notif.desc}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-400">{notif.time}</span>
                    <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md', config.bg, config.text)}>
                      <catConfig.icon className="w-3 h-3" />
                      {catConfig.label}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                      title="تعليم كمقروء"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
