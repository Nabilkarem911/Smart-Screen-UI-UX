import { useState } from 'react'
import { Search, Edit2, LogOut, Tablet, Monitor, Smartphone, Cpu, Plus, Grid3x3, List, QrCode, Wifi, WifiOff, X, RefreshCw, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

const devicesData = [
  { id: 1, name: 'شاشة رقم 1', screenName: 'شاشة رقم 1', type: 'Raspberry Pi 4', status: 'online', lastSeen: 'الآن', ip: '192.168.1.101', version: 'v2.4.1' },
  { id: 2, name: 'خميس', screenName: 'خميس', type: 'Android Box', status: 'online', lastSeen: 'منذ 5 دقائق', ip: '192.168.1.102', version: 'v2.4.0' },
  { id: 3, name: 'شاشه 4', screenName: 'شاشه 4', type: 'Raspberry Pi 3', status: 'offline', lastSeen: 'منذ 3 ساعات', ip: '192.168.1.103', version: 'v2.3.8' },
  { id: 4, name: 'الشاشة الرئيسية', screenName: 'الشاشة الرئيسية', type: 'Fire TV Stick', status: 'online', lastSeen: 'الآن', ip: '192.168.1.104', version: 'v2.4.1' },
  { id: 5, name: 'شاشة الاستقبال', screenName: 'شاشة الاستقبال', type: 'Android Box', status: 'online', lastSeen: 'منذ دقيقة', ip: '192.168.1.105', version: 'v2.4.1' },
  { id: 6, name: 'شاشة رقم 2', screenName: 'شاشة رقم 2', type: 'Raspberry Pi 4', status: 'offline', lastSeen: 'منذ يوم', ip: '192.168.1.106', version: 'v2.3.5' },
  { id: 7, name: 'شاشة رقم 3', screenName: 'شاشة رقم 3', type: 'Chromecast', status: 'online', lastSeen: 'الآن', ip: '192.168.1.107', version: 'v2.4.0' },
  { id: 8, name: 'شاشة الكافيه', screenName: 'شاشة الكافيه', type: 'Android Box', status: 'online', lastSeen: 'منذ 10 دقائق', ip: '192.168.1.108', version: 'v2.4.1' },
]

const deviceIcons: Record<string, any> = {
  'Raspberry Pi 4': Cpu,
  'Raspberry Pi 3': Cpu,
  'Android Box': Tablet,
  'Fire TV Stick': Monitor,
  'Chromecast': Smartphone,
}

const typeColors: Record<string, string> = {
  'Raspberry Pi 4': 'bg-emerald-50 text-emerald-600',
  'Raspberry Pi 3': 'bg-emerald-50 text-emerald-600',
  'Android Box': 'bg-blue-50 text-blue-600',
  'Fire TV Stick': 'bg-orange-50 text-orange-600',
  'Chromecast': 'bg-pink-50 text-pink-600',
}

export default function Devices() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'table' | 'grid'>('table')
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all')
  const [showPair, setShowPair] = useState(false)

  const filtered = devicesData.filter((d) => {
    const matchSearch = d.name.includes(search) || d.type.includes(search)
    const matchStatus = statusFilter === 'all' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  const onlineCount = devicesData.filter((d) => d.status === 'online').length
  const offlineCount = devicesData.filter((d) => d.status === 'offline').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">الأجهزة</h1>
          <p className="text-slate-400 text-sm mt-1">إدارة الأجهزة المتصلة بالشاشات</p>
        </div>
        <button onClick={() => setShowPair(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إقران جهاز
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-royal-50 flex items-center justify-center">
              <Tablet className="w-5 h-5 text-royal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{devicesData.length}</p>
              <p className="text-xs text-slate-400">إجمالي الأجهزة</p>
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
              <p className="text-xs text-slate-400">متصل الآن</p>
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
              <p className="text-xs text-slate-400">غير متصل</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold-50 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-gold-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">5</p>
              <p className="text-xs text-slate-400">تحديث متاح</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter + Search + View Toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          {([
            { key: 'all' as const, label: 'الكل' },
            { key: 'online' as const, label: 'متصل' },
            { key: 'offline' as const, label: 'غير متصل' },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                statusFilter === f.key ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
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
                <th className="p-4 text-sm font-semibold text-slate-500">اسم الجهاز</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الشاشة المرتبطة</th>
                <th className="p-4 text-sm font-semibold text-slate-500">النوع</th>
                <th className="p-4 text-sm font-semibold text-slate-500">آخر ظهور</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الحالة</th>
                <th className="p-4 text-sm font-semibold text-slate-500">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((device) => {
                const Icon = deviceIcons[device.type] || Tablet
                return (
                  <tr key={device.id} className="table-row">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', typeColors[device.type] || 'bg-slate-100 text-slate-600')}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-slate-900 font-medium text-sm block">{device.name}</span>
                          <span className="text-xs text-slate-400" dir="ltr">{device.ip}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-500">{device.screenName}</span>
                    </td>
                    <td className="p-4">
                      <span className="badge-info">{device.type}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-400">{device.lastSeen}</span>
                    </td>
                    <td className="p-4">
                      {device.status === 'online' ? (
                        <span className="badge-success">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                          متصل
                        </span>
                      ) : (
                        <span className="badge-danger">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />
                          غير متصل
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all" title="تعديل">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all" title="تسجيل خروج">
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((device) => {
            const Icon = deviceIcons[device.type] || Tablet
            return (
              <div key={device.id} className="glass-card-hover p-5 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', typeColors[device.type] || 'bg-slate-100 text-slate-600')}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    {device.status === 'online' ? (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        متصل
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        غير متصل
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-slate-900 font-bold text-sm mb-1">{device.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{device.screenName}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">النوع</span>
                    <span className="text-slate-600 font-medium">{device.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">IP</span>
                    <span className="text-slate-600 font-medium" dir="ltr">{device.ip}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">الإصدار</span>
                    <span className="text-slate-600 font-medium" dir="ltr">{device.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">آخر ظهور</span>
                    <span className="text-slate-600">{device.lastSeen}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                  <button className="flex-1 py-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all text-xs font-medium flex items-center justify-center gap-1.5">
                    <Edit2 className="w-3.5 h-3.5" />
                    تعديل
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all text-xs font-medium flex items-center justify-center gap-1.5">
                    <LogOut className="w-3.5 h-3.5" />
                    خروج
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Tablet className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">لا توجد أجهزة مطابقة</p>
        </div>
      )}

      {/* Pair Device Modal with QR */}
      {showPair && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPair(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">إقران جهاز جديد</h2>
                <p className="text-xs text-slate-400 mt-0.5">امسح الكود من جهازك للإقران</p>
              </div>
              <button
                onClick={() => setShowPair(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-center">
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 mx-auto rounded-2xl bg-slate-900 p-4 mb-4 relative">
                <div className="w-full h-full rounded-xl bg-white grid grid-cols-8 gap-0.5 p-2">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn('rounded-sm', Math.random() > 0.5 ? 'bg-slate-900' : 'bg-white')}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-royal-gradient flex items-center justify-center ring-4 ring-white">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-900 font-semibold mb-1">رمز الإقران</p>
              <p className="text-xs text-slate-400 mb-4">صالح لمدة 5 دقائق</p>
              <div className="bg-slate-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-slate-400 mb-1">أو أدخل رمز الإقران يدوياً</p>
                <p className="text-lg font-bold text-royal-600 tracking-widest" dir="ltr">SS-8X4K-2025</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>سيتم توليد رمز جديد كل 5 دقائق</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
