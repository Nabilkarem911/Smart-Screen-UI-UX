import { useState } from 'react'
import { Plus, Edit2, Trash2, Search, Shield, User as UserIcon } from 'lucide-react'

const usersData = [
  { id: 1, name: 'bshml', email: 'admin@smartscreen.com', role: 'admin', status: 'active', lastLogin: 'الآن' },
  { id: 2, name: 'أحمد', email: 'ahmed@smartscreen.com', role: 'editor', status: 'active', lastLogin: 'منذ ساعة' },
  { id: 3, name: 'محمد', email: 'mohamed@smartscreen.com', role: 'viewer', status: 'inactive', lastLogin: 'منذ 3 أيام' },
]

const roleLabels: Record<string, string> = {
  admin: 'مدير النظام',
  editor: 'محرر',
  viewer: 'مشاهد',
}

export default function Users() {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = usersData.filter(
    (u) => u.name.includes(search) || u.email.includes(search)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">المستخدمين</h1>
          <p className="text-slate-400 text-sm mt-1">إدارة صلاحيات المستخدمين</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة مستخدم
        </button>
      </div>

      <div className="glass-card p-4">
        <div className="relative max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث عن مستخدم..."
            className="input-field pr-10"
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-right">
              <th className="p-4 text-sm font-semibold text-slate-500">الاسم</th>
              <th className="p-4 text-sm font-semibold text-slate-500">البريد الإلكتروني</th>
              <th className="p-4 text-sm font-semibold text-slate-500">الدور</th>
              <th className="p-4 text-sm font-semibold text-slate-500">آخر دخول</th>
              <th className="p-4 text-sm font-semibold text-slate-500">الحالة</th>
              <th className="p-4 text-sm font-semibold text-slate-500">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="table-row">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-royal-gradient flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-slate-900 font-medium text-sm">{user.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-slate-500" dir="ltr">{user.email}</span>
                </td>
                <td className="p-4">
                  <span className={`badge ${user.role === 'admin' ? 'badge-info' : user.role === 'editor' ? 'badge-warning' : 'badge-success'}`}>
                    {user.role === 'admin' && <Shield className="w-3 h-3 ml-1" />}
                    {user.role !== 'admin' && <UserIcon className="w-3 h-3 ml-1" />}
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-slate-400">{user.lastLogin}</span>
                </td>
                <td className="p-4">
                  {user.status === 'active' ? (
                    <span className="badge-success">نشط</span>
                  ) : (
                    <span className="badge-danger">غير نشط</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowAdd(false)}
        >
          <div className="glass-card p-6 w-full max-w-md animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-slate-900 mb-1">إضافة مستخدم جديد</h2>
            <p className="text-sm text-slate-400 mb-6">أدخل بيانات المستخدم الجديد</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">الاسم</label>
                <input type="text" placeholder="اسم المستخدم" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">البريد الإلكتروني</label>
                <input type="email" placeholder="user@example.com" className="input-field" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">الدور</label>
                <select className="input-field">
                  <option value="viewer">مشاهد</option>
                  <option value="editor">محرر</option>
                  <option value="admin">مدير النظام</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAdd(false)} className="btn-ghost flex-1">إلغاء</button>
                <button onClick={() => setShowAdd(false)} className="btn-primary flex-1">إضافة</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
