import { useState } from 'react'
import { Plus, Edit2, Trash2, Search, Shield, User as UserIcon, Users as UsersIcon, UserCheck, UserX, Mail, Clock, X, Check, Eye, Edit, Settings as SettingsIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const usersData = [
  { id: 1, name: 'bshml', email: 'admin@smartscreen.com', role: 'admin', status: 'active', lastLogin: 'الآن', joined: '2025-01-15', logins: 142 },
  { id: 2, name: 'أحمد', email: 'ahmed@smartscreen.com', role: 'editor', status: 'active', lastLogin: 'منذ ساعة', joined: '2025-03-20', logins: 87 },
  { id: 3, name: 'محمد', email: 'mohamed@smartscreen.com', role: 'viewer', status: 'inactive', lastLogin: 'منذ 3 أيام', joined: '2025-05-10', logins: 23 },
  { id: 4, name: 'سارة', email: 'sara@smartscreen.com', role: 'editor', status: 'active', lastLogin: 'منذ 30 دقيقة', joined: '2025-06-01', logins: 54 },
  { id: 5, name: 'خالد', email: 'khaled@smartscreen.com', role: 'viewer', status: 'active', lastLogin: 'منذ يوم', joined: '2025-06-15', logins: 12 },
]

const roleLabels: Record<string, string> = {
  admin: 'مدير النظام',
  editor: 'محرر',
  viewer: 'مشاهد',
}

const roleColors: Record<string, string> = {
  admin: 'bg-royal-50 text-royal-600 border-royal-200',
  editor: 'bg-gold-50 text-gold-600 border-gold-200',
  viewer: 'bg-emerald-50 text-emerald-600 border-emerald-200',
}

const permissions = [
  { name: 'عرض الشاشات', admin: true, editor: true, viewer: true },
  { name: 'إنشاء/تعديل شاشة', admin: true, editor: true, viewer: false },
  { name: 'حذف شاشة', admin: true, editor: false, viewer: false },
  { name: 'إدارة الأجهزة', admin: true, editor: false, viewer: false },
  { name: 'إدارة المستخدمين', admin: true, editor: false, viewer: false },
  { name: 'إدارة المكتبة', admin: true, editor: true, viewer: false },
  { name: 'الإعدادات', admin: true, editor: false, viewer: false },
  { name: 'المشاهدات والتحليلات', admin: true, editor: true, viewer: true },
]

const activityLog = [
  { user: 'bshml', action: 'عدّل شاشة الاستقبال', time: 'منذ 5 د' },
  { user: 'أحمد', action: 'رفع 3 صور جديدة', time: 'منذ ساعة' },
  { user: 'سارة', action: 'أنشأ صفحة جديدة في شاشة الكافيه', time: 'منذ 30 د' },
  { user: 'bshml', action: 'أضاف جهاز "خميس"', time: 'منذ 3 ساعات' },
  { user: 'خالد', action: 'سجل دخول', time: 'منذ يوم' },
]

export default function Users() {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'editor' | 'viewer'>('all')
  const [showPermissions, setShowPermissions] = useState(false)

  const filtered = usersData.filter((u) => {
    const matchSearch = u.name.includes(search) || u.email.includes(search)
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const activeCount = usersData.filter((u) => u.status === 'active').length
  const inactiveCount = usersData.filter((u) => u.status === 'inactive').length
  const adminCount = usersData.filter((u) => u.role === 'admin').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">المستخدمين</h1>
          <p className="text-slate-400 text-sm mt-1">إدارة صلاحيات المستخدمين</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPermissions(true)} className="btn-ghost flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4" />
            <span>الصلاحيات</span>
          </button>
          <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            إضافة مستخدم
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-royal-50 flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-royal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{usersData.length}</p>
              <p className="text-xs text-slate-400">إجمالي المستخدمين</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{activeCount}</p>
              <p className="text-xs text-slate-400">نشط</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
              <UserX className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{inactiveCount}</p>
              <p className="text-xs text-slate-400">غير نشط</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-gold-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{adminCount}</p>
              <p className="text-xs text-slate-400">مدير النظام</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          {([
            { key: 'all' as const, label: 'الكل' },
            { key: 'admin' as const, label: 'مدير' },
            { key: 'editor' as const, label: 'محرر' },
            { key: 'viewer' as const, label: 'مشاهد' },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setRoleFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                roleFilter === f.key ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث عن مستخدم..."
            className="pr-10 pl-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-royal-500/50 transition-all w-48"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Users Table */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-right">
                <th className="p-4 text-sm font-semibold text-slate-500">الاسم</th>
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
                      <div>
                        <span className="text-slate-900 font-medium text-sm block">{user.name}</span>
                        <span className="text-xs text-slate-400" dir="ltr">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border', roleColors[user.role])}>
                      {user.role === 'admin' && <Shield className="w-3 h-3" />}
                      {user.role !== 'admin' && <UserIcon className="w-3 h-3" />}
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="p-4">
                    {user.status === 'active' ? (
                      <span className="badge-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                        نشط
                      </span>
                    ) : (
                      <span className="badge-danger">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />
                        غير نشط
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all" title="تعديل">
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

        {/* Activity Log */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">سجل النشاط</h2>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-3">
            {activityLog.map((log, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-lg bg-royal-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-royal-600">{log.user.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700">
                    <span className="font-semibold">{log.user}</span> {log.action}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAdd && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowAdd(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">إضافة مستخدم جديد</h2>
                <p className="text-xs text-slate-400 mt-0.5">أدخل بيانات المستخدم</p>
              </div>
              <button
                onClick={() => setShowAdd(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">الاسم</label>
                <input type="text" placeholder="اسم المستخدم" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" placeholder="user@example.com" className="input-field pr-10" dir="ltr" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">الدور</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { key: 'viewer', label: 'مشاهد', icon: Eye },
                    { key: 'editor', label: 'محرر', icon: Edit },
                    { key: 'admin', label: 'مدير', icon: Shield },
                  ]).map((r) => (
                    <button
                      key={r.key}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 hover:border-royal-400 hover:bg-royal-50/50 transition-all"
                    >
                      <r.icon className="w-5 h-5 text-slate-400" />
                      <span className="text-xs text-slate-600 font-medium">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAdd(false)} className="btn-ghost flex-1">إلغاء</button>
                <button onClick={() => setShowAdd(false)} className="btn-primary flex-1">إضافة</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Matrix Modal */}
      {showPermissions && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPermissions(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">مصفوفة الصلاحيات</h2>
                <p className="text-xs text-slate-400 mt-0.5">صلاحيات كل دور في النظام</p>
              </div>
              <button
                onClick={() => setShowPermissions(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-right">
                    <th className="p-3 text-xs font-semibold text-slate-500">الصلاحية</th>
                    <th className="p-3 text-xs font-semibold text-royal-600 text-center">مدير</th>
                    <th className="p-3 text-xs font-semibold text-gold-600 text-center">محرر</th>
                    <th className="p-3 text-xs font-semibold text-emerald-600 text-center">مشاهد</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((p, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0">
                      <td className="p-3 text-sm text-slate-700">{p.name}</td>
                      <td className="p-3 text-center">
                        {p.admin ? <Check className="w-4 h-4 text-royal-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                      </td>
                      <td className="p-3 text-center">
                        {p.editor ? <Check className="w-4 h-4 text-gold-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                      </td>
                      <td className="p-3 text-center">
                        {p.viewer ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
