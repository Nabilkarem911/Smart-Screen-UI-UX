import {
  Monitor, CheckCircle2, Tablet, Plug, TrendingUp, Activity,
  Clock, Wifi, AlertCircle, ArrowUpRight,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts'

const stats = [
  { label: 'شاشات الباقة', value: 28, icon: Monitor, color: 'royal', desc: 'الحد المسموح' },
  { label: 'شاشات مستخدمة', value: 12, icon: CheckCircle2, color: 'emerald', desc: 'نشطة الآن' },
  { label: 'أجهزة الباقة', value: 28, icon: Tablet, color: 'gold', desc: 'الحد المسموح' },
  { label: 'أجهزة مستخدمة', value: 25, icon: Plug, color: 'blue', desc: 'متصل الآن' },
]

const activityData = [
  { name: 'السبت', screens: 8, devices: 18 },
  { name: 'الأحد', screens: 10, devices: 20 },
  { name: 'الإثنين', screens: 12, devices: 22 },
  { name: 'الثلاثاء', screens: 11, devices: 24 },
  { name: 'الأربعاء', screens: 12, devices: 25 },
  { name: 'الخميس', screens: 12, devices: 25 },
  { name: 'الجمعة', screens: 10, devices: 23 },
]

const statusData = [
  { name: 'أونلاين', value: 10, color: '#10B981' },
  { name: 'أوفلاين', value: 2, color: '#EF4444' },
]

const recentActivity = [
  { action: 'تم تحديث محتوى شاشة رقم 1', time: 'منذ 5 دقائق', type: 'update' },
  { action: 'تم ربط جهاز جديد: خميس', time: 'منذ 15 دقيقة', type: 'device' },
  { action: 'تم رفع 3 صور جديدة', time: 'منذ ساعة', type: 'media' },
  { action: 'تم إنشاء مجموعة: Login Screens', time: 'منذ 3 ساعات', type: 'group' },
  { action: 'تمديد الاشتراك بـ 30 يوم', time: 'منذ يوم', type: 'subscription' },
]

const colorMap: Record<string, string> = {
  royal: 'from-royal-500 to-royal-700 text-royal-600',
  emerald: 'from-emerald-500 to-emerald-700 text-emerald-600',
  gold: 'from-gold-400 to-gold-600 text-gold-600',
  blue: 'from-blue-500 to-blue-700 text-blue-600',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">لوحة التحكم</h1>
          <p className="text-slate-400 text-sm mt-1">نظرة عامة على نظام الشاشات الذكية</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="w-4 h-4" />
          <span>آخر تحديث: منذ دقيقتين</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[stat.color]} flex items-center justify-center bg-opacity-20`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-royal-600 transition-colors" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.desc}</p>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${colorMap[stat.color].split(' ')[0]}-500 ${colorMap[stat.color].split(' ')[1]}-700`}
                style={{ width: `${(stat.value / 28) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">نشاط الشاشات والأجهزة</h2>
              <p className="text-sm text-slate-400">آخر 7 أيام</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-2 text-slate-500">
                <span className="w-3 h-3 rounded-full bg-royal-500" /> الشاشات
              </span>
              <span className="flex items-center gap-2 text-slate-500">
                <span className="w-3 h-3 rounded-full bg-gold-500" /> الأجهزة
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="deviceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#FBBF24" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  color: '#1E293B',
                }}
              />
              <Area type="monotone" dataKey="screens" stroke="#8B5CF6" strokeWidth={2} fill="url(#screenGrad)" />
              <Area type="monotone" dataKey="devices" stroke="#FBBF24" strokeWidth={2} fill="url(#deviceGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">حالة الشاشات</h2>
          <p className="text-sm text-slate-400 mb-4">توزيع الحالة الحالية</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  color: '#1E293B',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-500">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> أونلاين
              </span>
              <span className="text-slate-900 font-semibold">10</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-500">
                <span className="w-3 h-3 rounded-full bg-red-500" /> أوفلاين
              </span>
              <span className="text-slate-900 font-semibold">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">آخر الأنشطة</h2>
            <Activity className="w-5 h-5 text-royal-600" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-royal-50 flex items-center justify-center flex-shrink-0">
                  {item.type === 'update' && <Monitor className="w-5 h-5 text-royal-600" />}
                  {item.type === 'device' && <Plug className="w-5 h-5 text-blue-600" />}
                  {item.type === 'media' && <TrendingUp className="w-5 h-5 text-gold-600" />}
                  {item.type === 'group' && <Wifi className="w-5 h-5 text-emerald-600" />}
                  {item.type === 'subscription' && <AlertCircle className="w-5 h-5 text-gold-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{item.action}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">إحصائيات سريعة</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-sm text-slate-600">شاشات نشطة</span>
              </div>
              <span className="text-xl font-bold text-slate-900">10</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-sm text-slate-600">شاشات متوقفة</span>
              </div>
              <span className="text-xl font-bold text-slate-900">2</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-royal-50 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-royal-600" />
                </div>
                <span className="text-sm text-slate-600">إجمالي الصفحات</span>
              </div>
              <span className="text-xl font-bold text-slate-900">48</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold-600" />
                </div>
                <span className="text-sm text-slate-600">أيام متبقية</span>
              </div>
              <span className="text-xl font-bold text-slate-900">23</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
