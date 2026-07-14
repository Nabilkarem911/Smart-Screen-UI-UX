import { useState } from 'react'
import {
  User, Mail, Phone, MapPin, Calendar, Shield, Bell, Globe,
  Camera, Edit2, Save, X, Monitor, Tablet, Clock, Activity,
  CheckCircle2, AlertCircle, Zap, FileText, Plug, Wifi,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const profileData = {
  name: 'نبيل كريم',
  email: 'nabil@smartscreen.io',
  phone: '+964 770 123 4567',
  location: 'بغداد، العراق',
  role: 'مدير النظام',
  joinDate: 'يناير 2024',
  bio: 'مدير نظام متخصص في إدارة الشاشات الإعلانية والحلول الرقمية',
}

const preferences = [
  { id: 'email_notif', label: 'إشعارات البريد الإلكتروني', desc: 'تلقي تنبيهات عبر البريد', enabled: true },
  { id: 'push_notif', label: 'الإشعارات الفورية', desc: 'تنبيهات في المتصفح', enabled: true },
  { id: 'weekly_report', label: 'التقرير الأسبوعي', desc: 'ملخص أسبوعي للأداء', enabled: true },
  { id: 'maintenance_alert', label: 'تنبيهات الصيانة', desc: 'إشعار عند توقف شاشة', enabled: true },
  { id: 'ai_suggestions', label: 'اقتراحات الذكاء الاصطناعي', desc: 'توصيات ذكية للمحتوى', enabled: false },
]

const recentActivity = [
  { action: 'تم تحديث محتوى شاشة الاستقبال', time: 'منذ 5 دقائق', icon: Monitor, color: 'royal' },
  { action: 'تم ربط جهاز جديد: iPad-Pro', time: 'منذ ساعة', icon: Plug, color: 'blue' },
  { action: 'تم رفع 5 صور جديدة', time: 'منذ 3 ساعات', icon: FileText, color: 'gold' },
  { action: 'تم تغيير كلمة المرور', time: 'منذ يوم', icon: Shield, color: 'emerald' },
  { action: 'تم إنشاء مجموعة جديدة', time: 'منذ يومين', icon: Activity, color: 'royal' },
  { action: 'تمديد الاشتراك 30 يوم', time: 'منذ 3 أيام', icon: CheckCircle2, color: 'gold' },
]

const sessions = [
  { device: 'Chrome - Windows', location: 'بغداد، العراق', current: true, time: 'الآن' },
  { device: 'Safari - iPhone', location: 'بغداد، العراق', current: false, time: 'منذ 2 ساعة' },
  { device: 'Chrome - Android', location: 'أربيل، العراق', current: false, time: 'منذ يوم' },
]

const colorMap: Record<string, string> = {
  royal: 'bg-royal-50 text-royal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  gold: 'bg-gold-50 text-gold-600',
  blue: 'bg-blue-50 text-blue-600',
}

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [prefs, setPrefs] = useState(preferences)
  const [form, setForm] = useState(profileData)

  const togglePref = (id: string) => {
    setPrefs((prev) => prev.map((p) => p.id === id ? { ...p, enabled: !p.enabled } : p))
  }

  const handleSave = () => {
    setEditing(false)
  }

  const handleCancel = () => {
    setForm(profileData)
    setEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">الملف الشخصي</h1>
          <p className="text-slate-400 text-sm mt-1">إدارة معلوماتك الشخصية وتفضيلاتك</p>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="btn-primary flex items-center gap-2 text-sm">
            <Edit2 className="w-4 h-4" />
            تعديل الملف
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={handleCancel} className="btn-ghost flex items-center gap-2 text-sm">
              <X className="w-4 h-4" />
              إلغاء
            </button>
            <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm">
              <Save className="w-4 h-4" />
              حفظ
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="glass-card p-6 text-center">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-3xl bg-royal-gradient flex items-center justify-center text-white text-3xl font-bold shadow-glow-purple">
              {form.name.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -left-1 w-8 h-8 rounded-xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-royal-600 transition-all shadow-sm">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-slate-900">{form.name}</h2>
          <p className="text-sm text-slate-400 mb-3">{form.role}</p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            حساب موثق
          </span>

          {/* Quick Info */}
          <div className="mt-6 space-y-3 text-right">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-slate-600 truncate">{form.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-slate-600">{form.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-slate-600">{form.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-slate-600">انضم في {form.joinDate}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100">
            <div>
              <p className="text-xl font-bold text-slate-900">12</p>
              <p className="text-[10px] text-slate-400">شاشات</p>
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">25</p>
              <p className="text-[10px] text-slate-400">أجهزة</p>
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">48</p>
              <p className="text-[10px] text-slate-400">صفحات</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Form */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">المعلومات الشخصية</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={!editing}
                  className={cn('input-field', !editing && 'bg-slate-50 text-slate-500')}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={!editing}
                  className={cn('input-field', !editing && 'bg-slate-50 text-slate-500')}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  disabled={!editing}
                  className={cn('input-field', !editing && 'bg-slate-50 text-slate-500')}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">الموقع</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  disabled={!editing}
                  className={cn('input-field', !editing && 'bg-slate-50 text-slate-500')}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-slate-500 mb-2">نبذة تعريفية</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  disabled={!editing}
                  rows={3}
                  className={cn('input-field resize-none', !editing && 'bg-slate-50 text-slate-500')}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-royal-600" />
              <h2 className="text-lg font-bold text-slate-900">التفضيلات والإشعارات</h2>
            </div>
            <div className="space-y-3">
              {prefs.map((pref) => (
                <div key={pref.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{pref.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() => togglePref(pref.id)}
                    className={cn(
                      'relative w-11 h-6 rounded-full transition-all flex-shrink-0',
                      pref.enabled ? 'bg-royal-500' : 'bg-slate-200'
                    )}
                  >
                    <span className={cn(
                      'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all',
                      pref.enabled ? 'left-0.5' : 'right-0.5'
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-royal-600" />
              <h2 className="text-lg font-bold text-slate-900">آخر الأنشطة</h2>
            </div>
            <div className="space-y-2">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', colorMap[item.color])}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">{item.action}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Sessions */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-royal-600" />
              <h2 className="text-lg font-bold text-slate-900">الجلسات النشطة</h2>
            </div>
            <div className="space-y-3">
              {sessions.map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', session.current ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400')}>
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{session.device}</p>
                      <p className="text-xs text-slate-400">{session.location} • {session.time}</p>
                    </div>
                  </div>
                  {session.current ? (
                    <span className="text-xs text-emerald-600 font-semibold px-2.5 py-1 rounded-lg bg-emerald-50">الجلسة الحالية</span>
                  ) : (
                    <button className="text-xs text-red-500 hover:text-red-600 font-medium px-2.5 py-1 rounded-lg bg-red-50 transition-all">
                      إنهاء
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
