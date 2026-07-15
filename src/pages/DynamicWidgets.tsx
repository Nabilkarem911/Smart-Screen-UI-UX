import { useState } from 'react'
import {
  CloudSun, Newspaper, DollarSign, TrendingUp, Clock,
  Calendar, QrCode, Rss, Plus, Settings, Trash2, RefreshCw,
  Check, Eye, Zap, Globe, Activity, AlertCircle, Wifi,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface Widget {
  id: number
  type: 'weather' | 'news' | 'prices' | 'stocks' | 'clock' | 'calendar' | 'qr' | 'rss' | 'social' | 'traffic'
  name: string
  enabled: boolean
  screen: string
  refreshRate: string
  config: Record<string, string>
  status: 'active' | 'error' | 'syncing'
  lastUpdate: string
}

const widgetTypes = [
  { type: 'weather' as const, label: 'الطقس', icon: CloudSun, color: 'cyan', desc: 'درجة الحرارة والتوقعات' },
  { type: 'news' as const, label: 'الأخبار', icon: Newspaper, color: 'orange', desc: 'آخر الأخبار من مصادر متعددة' },
  { type: 'prices' as const, label: 'الأسعار', icon: DollarSign, color: 'emerald', desc: 'أسعار العملات والسلع' },
  { type: 'stocks' as const, label: 'الأسهم', icon: TrendingUp, color: 'royal', desc: 'مؤشرات الأسهم المباشرة' },
  { type: 'clock' as const, label: 'الساعة', icon: Clock, color: 'gold', desc: 'ساعة وتاريخ رقمي' },
  { type: 'calendar' as const, label: 'التقويم', icon: Calendar, color: 'purple', desc: 'تقويم بأحداث ومناسبات' },
  { type: 'qr' as const, label: 'QR Code', icon: QrCode, color: 'slate', desc: 'رمز QR ديناميكي' },
  { type: 'rss' as const, label: 'RSS Feed', icon: Rss, color: 'red', desc: 'تغذية RSS مخصصة' },
]

const initialWidgets: Widget[] = [
  { id: 1, type: 'weather', name: 'طقس الرياض', enabled: true, screen: 'شاشة الاستقبال', refreshRate: 'كل 30 دقيقة', config: { city: 'الرياض', unit: 'مئوية' }, status: 'active', lastUpdate: 'منذ 5 دقائق' },
  { id: 2, type: 'news', name: 'أخبار محلية', enabled: true, screen: 'شاشة الاستقبال', refreshRate: 'كل ساعة', config: { source: 'عاجل', category: 'محلي' }, status: 'active', lastUpdate: 'منذ 20 دقيقة' },
  { id: 3, type: 'clock', name: 'ساعة رقمية', enabled: true, screen: 'شاشة الكافيه', refreshRate: 'كل ثانية', config: { format: '12 ساعة', showDate: 'نعم' }, status: 'active', lastUpdate: 'الآن' },
  { id: 4, type: 'prices', name: 'أسعار العملات', enabled: true, screen: 'شاشة الخروج', refreshRate: 'كل 15 دقيقة', config: { currencies: 'USD, EUR, SAR' }, status: 'syncing', lastUpdate: 'جاري التحديث' },
  { id: 5, type: 'qr', name: 'QR عرض الكافيه', enabled: false, screen: 'شاشة الكافيه', refreshRate: 'يدوي', config: { url: 'smartscreen.app/offer' }, status: 'active', lastUpdate: 'منذ يوم' },
  { id: 6, type: 'rss', name: 'RSS تقني', enabled: true, screen: 'شاشة المطعم', refreshRate: 'كل ساعتين', config: { feed: 'tech-news.com/rss' }, status: 'error', lastUpdate: 'فشل التحديث' },
]

const statusConfig = {
  active: { label: 'يعمل', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500', icon: Check },
  syncing: { label: 'يحدّث', bg: 'bg-royal-50', text: 'text-royal-600', dot: 'bg-royal-500 animate-pulse', icon: RefreshCw },
  error: { label: 'خطأ', bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-500', icon: AlertCircle },
}

export default function DynamicWidgets() {
  const { toast } = useToast()
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets)
  const [showAdd, setShowAdd] = useState(false)
  const [configWidget, setConfigWidget] = useState<Widget | null>(null)

  const toggleWidget = (id: number) => {
    setWidgets((prev) => prev.map((w) => w.id === id ? { ...w, enabled: !w.enabled } : w))
    const w = widgets.find((w) => w.id === id)
    toast(w?.enabled ? 'تم إيقاف الودجت' : 'تم تفعيل الودجت', 'success')
  }

  const deleteWidget = (id: number) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id))
    toast('تم حذف الودجت', 'info')
  }

  const refreshWidget = (id: number) => {
    setWidgets((prev) => prev.map((w) => w.id === id ? { ...w, status: 'syncing', lastUpdate: 'جاري التحديث' } : w))
    setTimeout(() => {
      setWidgets((prev) => prev.map((w) => w.id === id ? { ...w, status: 'active', lastUpdate: 'الآن' } : w))
      toast('تم تحديث الودجت', 'success')
    }, 1500)
  }

  const addWidget = (type: string) => {
    const wt = widgetTypes.find((t) => t.type === type)!
    const newWidget: Widget = {
      id: Date.now(),
      type: type as Widget['type'],
      name: `${wt.label} جديد`,
      enabled: true,
      screen: 'شاشة الاستقبال',
      refreshRate: 'كل ساعة',
      config: {},
      status: 'active',
      lastUpdate: 'الآن',
    }
    setWidgets((prev) => [...prev, newWidget])
    setShowAdd(false)
    toast('تم إضافة الودجت', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">الودجت الديناميكية</h1>
            <p className="text-slate-400 text-sm mt-1">محتوى يتحدث تلقائياً: طقس، أخبار، أسعار، وأكثر</p>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          إضافة ودجت
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'ودجت نشطة', value: widgets.filter((w) => w.enabled).length, icon: Zap, color: 'royal' },
          { label: 'ودجت متوقفة', value: widgets.filter((w) => !w.enabled).length, icon: Eye, color: 'slate' },
          { label: 'تعمل بنجاح', value: widgets.filter((w) => w.status === 'active').length, icon: Check, color: 'emerald' },
          { label: 'أخطاء', value: widgets.filter((w) => w.status === 'error').length, icon: AlertCircle, color: 'red' },
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

      {/* Widgets List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((widget) => {
          const wt = widgetTypes.find((t) => t.type === widget.type)!
          const status = statusConfig[widget.status]
          const StatusIcon = status.icon
          return (
            <div key={widget.id} className={cn('glass-card p-5 transition-all', !widget.enabled && 'opacity-60')}>
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', `bg-${wt.color}-50 text-${wt.color}-600`)}>
                    <wt.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{widget.name}</h3>
                    <p className="text-xs text-slate-400">{widget.screen}</p>
                  </div>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className={cn(
                    'relative w-10 h-5 rounded-full transition-all flex-shrink-0',
                    widget.enabled ? 'bg-emerald-500' : 'bg-slate-300'
                  )}
                >
                  <span className={cn(
                    'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all',
                    widget.enabled ? 'left-0.5' : 'right-0.5'
                  )} />
                </button>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mb-3">
                <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-md', status.bg, status.text)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />
                  {status.label}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {widget.lastUpdate}
                </span>
              </div>

              {/* Config Preview */}
              <div className="rounded-lg bg-slate-50 p-3 mb-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">معدل التحديث</span>
                    <span className="font-medium text-slate-600">{widget.refreshRate}</span>
                  </div>
                  {Object.entries(widget.config).slice(0, 2).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{key}</span>
                      <span className="font-medium text-slate-600 truncate max-w-[120px]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => refreshWidget(widget.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-royal-600 hover:bg-royal-50 transition-all"
                  title="تحديث"
                >
                  <RefreshCw className={cn('w-4 h-4', widget.status === 'syncing' && 'animate-spin')} />
                </button>
                <button
                  onClick={() => setConfigWidget(widget)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                  title="إعدادات"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteWidget(widget.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAdd(false)}>
          <div className="glass-card p-6 w-full max-w-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">إضافة ودجت جديد</h3>
              <button onClick={() => setShowAdd(false)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {widgetTypes.map((wt) => (
                <button
                  key={wt.type}
                  onClick={() => addWidget(wt.type)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-royal-50 transition-all text-right group"
                >
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', `bg-${wt.color}-50 text-${wt.color}-600 group-hover:scale-110 transition-transform`)}>
                    <wt.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700">{wt.label}</p>
                    <p className="text-[10px] text-slate-400 truncate">{wt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Config Modal */}
      {configWidget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setConfigWidget(null)}>
          <div className="glass-card p-6 w-full max-w-md animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">إعدادات: {configWidget.name}</h3>
              <button onClick={() => setConfigWidget(null)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">الاسم</label>
                <input className="input-field text-sm" defaultValue={configWidget.name} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">الشاشة</label>
                <select className="input-field text-sm">
                  <option>شاشة الاستقبال</option>
                  <option>شاشة الكافيه</option>
                  <option>شاشة الخروج</option>
                  <option>شاشة المطعم</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">معدل التحديث</label>
                <select className="input-field text-sm" defaultValue={configWidget.refreshRate}>
                  <option>كل ثانية</option>
                  <option>كل 15 دقيقة</option>
                  <option>كل 30 دقيقة</option>
                  <option>كل ساعة</option>
                  <option>كل ساعتين</option>
                  <option>يدوي</option>
                </select>
              </div>
              {Object.entries(configWidget.config).map(([key, val]) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">{key}</label>
                  <input className="input-field text-sm" defaultValue={val} />
                </div>
              ))}
              <button
                onClick={() => { setConfigWidget(null); toast('تم حفظ الإعدادات', 'success') }}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                <Check className="w-4 h-4" />
                حفظ الإعدادات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
