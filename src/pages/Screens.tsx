import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Search, Edit2, Trash2, FileText, CheckSquare,
  RefreshCw, Calendar, Monitor, Smartphone, Grid3x3, List,
  X, CheckCircle2, Play, Pause, Copy, Wifi, WifiOff,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const groupColors: Record<string, string> = {
  'wow bshmel': 'bg-royal-50 text-royal-600 border-royal-200',
  'Login Screens': 'bg-gold-50 text-gold-600 border-gold-200',
}

const screensData = [
  { id: 1, name: 'شاشة رقم 1', group: 'wow bshmel', orientation: 'landscape', enabled: true, pages: 5, status: 'online' },
  { id: 2, name: 'خميس', group: 'Login Screens', orientation: 'portrait', enabled: true, pages: 3, status: 'online' },
  { id: 3, name: 'شاشه 4', group: 'wow bshmel', orientation: 'landscape', enabled: false, pages: 2, status: 'offline' },
  { id: 4, name: 'الشاشة الرئيسية', group: 'Login Screens', orientation: 'landscape', enabled: true, pages: 8, status: 'online' },
  { id: 5, name: 'شاشة الاستقبال', group: 'wow bshmel', orientation: 'portrait', enabled: true, pages: 4, status: 'online' },
  { id: 6, name: 'شاشة رقم 2', group: 'wow bshmel', orientation: 'landscape', enabled: false, pages: 1, status: 'offline' },
  { id: 7, name: 'شاشة رقم 3', group: 'Login Screens', orientation: 'landscape', enabled: true, pages: 6, status: 'online' },
  { id: 8, name: 'شاشة الكافيه', group: 'wow bshmel', orientation: 'portrait', enabled: true, pages: 3, status: 'online' },
  { id: 9, name: 'شاشة رقم 5', group: 'Login Screens', orientation: 'landscape', enabled: true, pages: 2, status: 'online' },
  { id: 10, name: 'شاشة رقم 6', group: 'wow bshmel', orientation: 'landscape', enabled: false, pages: 0, status: 'offline' },
]

export default function Screens() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selected, setSelected] = useState<number[]>([])
  const [view, setView] = useState<'table' | 'grid'>('table')
  const [groupFilter, setGroupFilter] = useState<'all' | 'wow bshmel' | 'Login Screens'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all')

  const filtered = screensData.filter((s) => {
    const matchSearch = s.name.includes(search) || s.group.includes(search)
    const matchGroup = groupFilter === 'all' || s.group === groupFilter
    const matchStatus = statusFilter === 'all' || s.status === statusFilter
    return matchSearch && matchGroup && matchStatus
  })

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  const onlineCount = screensData.filter((s) => s.status === 'online').length
  const offlineCount = screensData.filter((s) => s.status === 'offline').length
  const totalPages = screensData.reduce((sum, s) => sum + s.pages, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">الشاشات</h1>
          <p className="text-slate-400 text-sm mt-1">إدارة محتوى الشاشات الإعلانية</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>تحديث</span>
          </button>
          <button className="btn-ghost flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>جدولة</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة شاشة</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-royal-50 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-royal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{screensData.length}</p>
              <p className="text-xs text-slate-400">إجمالي الشاشات</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{onlineCount}</p>
              <p className="text-xs text-slate-400">أونلاين</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{offlineCount}</p>
              <p className="text-xs text-slate-400">أوفلاين</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{totalPages}</p>
              <p className="text-xs text-slate-400">إجمالي الصفحات</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selected.length > 0 && (
        <div className="glass-card p-3 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-royal-600" />
            <span className="text-sm text-slate-900 font-medium">{selected.length} شاشة محددة</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-100 transition-all flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5" />
              تفعيل
            </button>
            <button className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-100 transition-all flex items-center gap-1.5">
              <Pause className="w-3.5 h-3.5" />
              إيقاف
            </button>
            <button className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-100 transition-all flex items-center gap-1.5">
              <Copy className="w-3.5 h-3.5" />
              تكرار
            </button>
            <button className="text-xs text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg bg-red-50 transition-all flex items-center gap-1.5">
              <Trash2 className="w-3.5 h-3.5" />
              حذف
            </button>
            <button onClick={() => setSelected([])} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Filters + Search + View Toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {([
            { key: 'all' as const, label: 'الكل' },
            { key: 'wow bshmel' as const, label: 'wow bshmel' },
            { key: 'Login Screens' as const, label: 'Login Screens' },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setGroupFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                groupFilter === f.key ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
              )}
            >
              {f.label}
            </button>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-1" />
          {([
            { key: 'all' as const, label: 'كل الحالات' },
            { key: 'online' as const, label: 'متصل' },
            { key: 'offline' as const, label: 'غير متصل' },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                statusFilter === f.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث..."
              className="pr-10 pl-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-royal-500/50 transition-all w-48"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setView('table')}
              className={cn('p-1.5 rounded-lg transition-all', view === 'table' ? 'bg-white text-royal-600 shadow-sm' : 'text-slate-400 hover:text-slate-700')}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('grid')}
              className={cn('p-1.5 rounded-lg transition-all', view === 'grid' ? 'bg-white text-royal-600 shadow-sm' : 'text-slate-400 hover:text-slate-700')}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {view === 'table' ? (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-right">
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={(e) => setSelected(e.target.checked ? filtered.map((s) => s.id) : [])}
                    className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-royal-600"
                  />
                </th>
                <th className="p-4 text-sm font-semibold text-slate-500">اسم الشاشة</th>
                <th className="p-4 text-sm font-semibold text-slate-500">المجموعة</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الاتجاه</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الصفحات</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الحالة</th>
                <th className="p-4 text-sm font-semibold text-slate-500">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((screen) => (
                <tr key={screen.id} className={cn('table-row', selected.includes(screen.id) && 'bg-royal-50/30')}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(screen.id)}
                      onChange={() => toggleSelect(screen.id)}
                      className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-royal-600"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        screen.orientation === 'landscape' ? 'bg-royal-50 text-royal-600' : 'bg-gold-50 text-gold-600'
                      )}>
                        {screen.orientation === 'landscape' ? <Monitor className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-slate-900 font-medium text-sm block">{screen.name}</span>
                        {!screen.enabled && <span className="text-[10px] text-red-400">معطلة</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border', groupColors[screen.group] || 'bg-slate-50 text-slate-600 border-slate-200')}>
                      {screen.group}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-slate-500">{screen.orientation === 'landscape' ? 'عرضي' : 'طولي'}</span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-sm text-slate-600">
                      <FileText className="w-4 h-4 text-slate-400" />
                      {screen.pages}
                    </span>
                  </td>
                  <td className="p-4">
                    {screen.status === 'online' ? (
                      <span className="badge-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                        أونلاين
                      </span>
                    ) : (
                      <span className="badge-danger">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />
                        أوفلاين
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/screens/edit/${screen.id}`)}
                        className="p-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all"
                        title="تعديل"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all" title="حذف">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((screen) => (
            <div
              key={screen.id}
              onClick={() => toggleSelect(screen.id)}
              className={cn('glass-card-hover p-5 group cursor-pointer transition-all', selected.includes(screen.id) && 'ring-2 ring-royal-500')}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  screen.orientation === 'landscape' ? 'bg-royal-50 text-royal-600' : 'bg-gold-50 text-gold-600'
                )}>
                  {screen.orientation === 'landscape' ? <Monitor className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                </div>
                {selected.includes(screen.id) ? (
                  <div className="w-6 h-6 rounded-full bg-royal-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : (
                  <span className={cn('w-2.5 h-2.5 rounded-full', screen.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500')} />
                )}
              </div>
              <h3 className="text-slate-900 font-bold text-sm mb-1">{screen.name}</h3>
              <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border mb-3', groupColors[screen.group] || 'bg-slate-50 text-slate-600 border-slate-200')}>
                {screen.group}
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">الاتجاه</span>
                  <span className="text-slate-600 font-medium">{screen.orientation === 'landscape' ? 'عرضي' : 'طولي'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">الصفحات</span>
                  <span className="text-slate-600 font-medium">{screen.pages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">الحالة</span>
                  <span className={screen.status === 'online' ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium'}>
                    {screen.status === 'online' ? 'أونلاين' : 'أوفلاين'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/screens/edit/${screen.id}`) }}
                  className="flex-1 py-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all text-xs font-medium flex items-center justify-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  تعديل
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all text-xs font-medium flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Monitor className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">لا توجد شاشات مطابقة</p>
        </div>
      )}

      {/* Add Screen Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">إضافة شاشة جديدة</h2>
                <p className="text-xs text-slate-400 mt-0.5">أنشئ شاشة جديدة واربطها بمجموعة</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">اسم الشاشة</label>
                <input type="text" placeholder="مثال: شاشة رقم 7" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">المجموعة</label>
                <select className="input-field">
                  <option>wow bshmel</option>
                  <option>Login Screens</option>
                  <option>+ إنشاء مجموعة جديدة</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">اتجاه الشاشة</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-royal-50 border border-royal-500 text-royal-700">
                    <Monitor className="w-5 h-5" />
                    <span className="text-sm">عرضي</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:border-royal-300 transition-all">
                    <Smartphone className="w-5 h-5" />
                    <span className="text-sm">طولي</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-sm text-slate-600">مفعلة</span>
                <button className="relative w-11 h-6 rounded-full bg-royal-500 transition-all">
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all" />
                </button>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="btn-ghost flex-1">إلغاء</button>
                <button onClick={() => setShowAddModal(false)} className="btn-primary flex-1">إرسال</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
