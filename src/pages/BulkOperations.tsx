import { useState } from 'react'
import {
  Layers, Check, X, Monitor, Tablet, Power, RefreshCw,
  Trash2, Download, Upload, Tag, Clock, Eye, EyeOff,
  AlertCircle, CheckCircle2, ChevronRight, Zap, Filter,
  Search, Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface BulkItem {
  id: number
  name: string
  type: 'screen' | 'device'
  status: 'online' | 'offline' | 'maintenance'
  group: string
  selected: boolean
}

const initialItems: BulkItem[] = [
  { id: 1, name: 'شاشة الاستقبال الرئيسية', type: 'screen', status: 'online', group: 'الإدارة', selected: false },
  { id: 2, name: 'شاشة الكافيه - الطابق الأول', type: 'screen', status: 'online', group: 'الكافيه', selected: false },
  { id: 3, name: 'شاشة الكافيه - الطابق الثاني', type: 'screen', status: 'offline', group: 'الكافيه', selected: false },
  { id: 4, name: 'شاشة الخروج', type: 'screen', status: 'online', group: 'الإدارة', selected: false },
  { id: 5, name: 'شاشة المطعم', type: 'screen', status: 'maintenance', group: 'المطعم', selected: false },
  { id: 6, name: 'تابلت الاستقبال', type: 'device', status: 'online', group: 'الإدارة', selected: false },
  { id: 7, name: 'تابلت الكافيه', type: 'device', status: 'online', group: 'الكافيه', selected: false },
  { id: 8, name: 'تابلت المطعم', type: 'device', status: 'offline', group: 'المطعم', selected: false },
  { id: 9, name: 'شاشة قاعة الاجتماعات', type: 'screen', status: 'online', group: 'الإدارة', selected: false },
  { id: 10, name: 'شاشة المصعد', type: 'screen', status: 'online', group: 'عام', selected: false },
  { id: 11, name: 'تابيت الاستقبال الثاني', type: 'device', status: 'online', group: 'الإدارة', selected: false },
  { id: 12, name: 'شاشة البوابة', type: 'screen', status: 'maintenance', group: 'عام', selected: false },
]

const statusConfig = {
  online: { label: 'متصل', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  offline: { label: 'غير متصل', bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-500' },
  maintenance: { label: 'صيانة', bg: 'bg-gold-50', text: 'text-gold-600', dot: 'bg-gold-500' },
}

const bulkActions = [
  { id: 'power-on', label: 'تشغيل', icon: Power, color: 'emerald', desc: 'تشغيل الأجهزة المحددة' },
  { id: 'power-off', label: 'إيقاف', icon: Power, color: 'red', desc: 'إيقاف الأجهزة المحددة' },
  { id: 'restart', label: 'إعادة تشغيل', icon: RefreshCw, color: 'royal', desc: 'إعادة تشغيل الأجهزة' },
  { id: 'update', label: 'تحديث المحتوى', icon: Download, color: 'blue', desc: 'تحديث محتوى الشاشات' },
  { id: 'schedule', label: 'جدولة', icon: Clock, color: 'gold', desc: 'جدولة مواعيد التشغيل' },
  { id: 'tag', label: 'تصنيف', icon: Tag, color: 'purple', desc: 'إضافة وسوم للمجموعة' },
  { id: 'export', label: 'تصدير', icon: Upload, color: 'slate', desc: 'تصدير بيانات المحدد' },
  { id: 'delete', label: 'حذف', icon: Trash2, color: 'red', desc: 'حذف المحدد (لا يمكن التراجع)' },
]

export default function BulkOperations() {
  const { toast } = useToast()
  const [items, setItems] = useState<BulkItem[]>(initialItems)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [confirmAction, setConfirmAction] = useState<string | null>(null)

  const filtered = items.filter((item) => {
    if (filter !== 'all' && item.type !== filter && filter !== item.group) return false
    if (search && !item.name.includes(search)) return false
    return true
  })

  const selectedItems = items.filter((i) => i.selected)
  const allSelected = filtered.length > 0 && filtered.every((i) => i.selected)

  const toggleSelect = (id: number) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, selected: !i.selected } : i))
  }

  const toggleSelectAll = () => {
    const shouldSelect = !allSelected
    setItems((prev) => prev.map((i) => filtered.some((f) => f.id === i.id) ? { ...i, selected: shouldSelect } : i))
  }

  const clearSelection = () => {
    setItems((prev) => prev.map((i) => ({ ...i, selected: false })))
  }

  const executeAction = (actionId: string) => {
    const action = bulkActions.find((a) => a.id === actionId)!
    toast(`تم تنفيذ "${action.label}" على ${selectedItems.length} عنصر`, 'success')
    setConfirmAction(null)
    clearSelection()
  }

  const groups = [...new Set(items.map((i) => i.group))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">العمليات المجمعة</h1>
            <p className="text-slate-400 text-sm mt-1">تحكم في عدة شاشات وأجهزة بضغطة واحدة</p>
          </div>
        </div>
        {selectedItems.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-royal-50 text-royal-600 text-sm font-semibold">
            <Check className="w-4 h-4" />
            {selectedItems.length} محدد
            <button onClick={clearSelection} className="mr-1 p-1 rounded-lg hover:bg-royal-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي العناصر', value: items.length, icon: Layers, color: 'royal' },
          { label: 'متصلة', value: items.filter((i) => i.status === 'online').length, icon: CheckCircle2, color: 'emerald' },
          { label: 'غير متصلة', value: items.filter((i) => i.status === 'offline').length, icon: AlertCircle, color: 'red' },
          { label: 'صيانة', value: items.filter((i) => i.status === 'maintenance').length, icon: Settings, color: 'gold' },
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

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="glass-card p-4 animate-fade-in">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-royal-500" />
              إجراءات مجمعة:
            </span>
            {bulkActions.map((action) => (
              <button
                key={action.id}
                onClick={() => setConfirmAction(action.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all',
                  `bg-${action.color}-50 text-${action.color}-600 hover:scale-105`
                )}
              >
                <action.icon className="w-3.5 h-3.5" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters + Search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بالاسم..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-royal-500/50"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400" />
          <button
            onClick={() => setFilter('all')}
            className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold', filter === 'all' ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500')}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter('screen')}
            className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold', filter === 'screen' ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500')}
          >
            شاشات
          </button>
          <button
            onClick={() => setFilter('device')}
            className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold', filter === 'device' ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500')}
          >
            أجهزة
          </button>
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold', filter === g ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500')}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Items Table */}
      <div className="glass-card overflow-hidden">
        {/* Select All */}
        <div className="flex items-center gap-3 p-3 border-b border-slate-100">
          <button
            onClick={toggleSelectAll}
            className={cn(
              'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
              allSelected ? 'bg-royal-500 border-royal-500' : 'border-slate-300'
            )}
          >
            {allSelected && <Check className="w-3.5 h-3.5 text-white" />}
          </button>
          <span className="text-xs font-semibold text-slate-500">
            تحديد الكل ({filtered.length})
          </span>
        </div>

        {/* Items */}
        <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
          {filtered.map((item) => {
            const status = statusConfig[item.status]
            const Icon = item.type === 'screen' ? Monitor : Tablet
            return (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-3 p-3 transition-all cursor-pointer',
                  item.selected ? 'bg-royal-50/50' : 'hover:bg-slate-50'
                )}
                onClick={() => toggleSelect(item.id)}
              >
                <button
                  className={cn(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0',
                    item.selected ? 'bg-royal-500 border-royal-500' : 'border-slate-300'
                  )}
                >
                  {item.selected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.group} • {item.type === 'screen' ? 'شاشة' : 'جهاز'}</p>
                </div>
                <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md flex-shrink-0', status.bg, status.text)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />
                  {status.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Confirm Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setConfirmAction(null)}>
          <div className="glass-card p-6 w-full max-w-md animate-fade-in" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const action = bulkActions.find((a) => a.id === confirmAction)!
              const isDelete = action.id === 'delete'
              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-${action.color}-50 text-${action.color}-600`)}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{action.label}</h3>
                      <p className="text-xs text-slate-400">{action.desc}</p>
                    </div>
                  </div>
                  <div className={cn('rounded-xl p-4 mb-4', isDelete ? 'bg-red-50' : 'bg-slate-50')}>
                    <p className="text-sm text-slate-600">
                      سيتم تطبيق <span className="font-bold">"{action.label}"</span> على <span className="font-bold text-royal-600">{selectedItems.length}</span> عنصر.
                      {isDelete && <span className="text-red-500 font-semibold block mt-1">⚠ هذا الإجراء لا يمكن التراجع عنه</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => executeAction(confirmAction)}
                      className={cn('flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl transition-all', isDelete ? 'bg-red-500 text-white hover:bg-red-600' : 'btn-primary')}
                    >
                      <Check className="w-4 h-4" />
                      تأكيد
                    </button>
                    <button
                      onClick={() => setConfirmAction(null)}
                      className="btn-ghost flex items-center gap-2 text-sm"
                    >
                      <X className="w-4 h-4" />
                      إلغاء
                    </button>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
