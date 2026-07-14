import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Search, Edit2, Trash2, FileText, CheckSquare,
  RefreshCw, Calendar, Monitor, Smartphone,
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const [selectAll, setSelectAll] = useState(false)
  const [selected, setSelected] = useState<number[]>([])

  const filtered = screensData.filter((s) =>
    s.name.includes(search) || s.group.includes(search)
  )

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

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

      {/* Toolbar */}
      <div className="glass-card p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث عن شاشة..."
            className="input-field pr-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => {
                setSelectAll(e.target.checked)
                setSelected(e.target.checked ? filtered.map((s) => s.id) : [])
              }}
              className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-royal-600"
            />
            <span className="text-sm text-slate-500">تحديد الكل</span>
          </label>
          {selected.length > 0 && (
            <span className="badge-info">{selected.length} محدد</span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-right">
              <th className="p-4 w-12"></th>
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
              <tr key={screen.id} className="table-row">
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
                      screen.orientation === 'landscape'
                        ? 'bg-royal-50 text-royal-600'
                        : 'bg-gold-50 text-gold-600'
                    )}>
                      {screen.orientation === 'landscape'
                        ? <Monitor className="w-5 h-5" />
                        : <Smartphone className="w-5 h-5" />}
                    </div>
                    <span className="text-slate-900 font-medium text-sm">{screen.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="badge-info">{screen.group}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-slate-500">
                    {screen.orientation === 'landscape' ? 'عرضي' : 'طولي'}
                  </span>
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
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
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
                    <button
                      className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/screens/edit/${screen.id}`)}
                      className="p-2 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all"
                      title="الصفحات"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200">
          <span className="text-sm text-slate-400">
            عرض {filtered.length} من {screensData.length} شاشة
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
              السابق
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm bg-royal-gradient text-white">1</button>
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">2</button>
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">3</button>
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
              التالي
            </button>
          </div>
        </div>
      </div>

      {/* Add Screen Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="glass-card p-6 w-full max-w-md animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-slate-900 mb-1">إضافة شاشة جديدة</h2>
            <p className="text-sm text-slate-400 mb-6">أنشئ شاشة جديدة واربطها بمجموعة</p>

            <div className="space-y-4">
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

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-royal-600" />
                <span className="text-sm text-slate-600">مفعلة</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="btn-ghost flex-1">
                  إلغاء
                </button>
                <button onClick={() => setShowAddModal(false)} className="btn-primary flex-1">
                  إرسال
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
