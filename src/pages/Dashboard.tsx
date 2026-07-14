import { useState } from 'react'
import {
  Monitor, CheckCircle2, Tablet, Plug, TrendingUp, Activity,
  Clock, Wifi, AlertCircle, ArrowUpRight, Sparkles, Eye, Zap,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts'
import { cn } from '@/lib/utils'

const stats = [
  { label: 'شاشات الباقة', value: 28, icon: Monitor, color: 'royal', desc: 'الحد المسموح' },
  { label: 'شاشات مستخدمة', value: 12, icon: CheckCircle2, color: 'emerald', desc: 'نشطة الآن' },
  { label: 'أجهزة الباقة', value: 28, icon: Tablet, color: 'gold', desc: 'الحد المسموح' },
  { label: 'أجهزة مستخدمة', value: 25, icon: Plug, color: 'blue', desc: 'متصل الآن' },
]

const activityDataWeek = [
  { name: 'السبت', screens: 8, devices: 18, views: 1240 },
  { name: 'الأحد', screens: 10, devices: 20, views: 1580 },
  { name: 'الإثنين', screens: 12, devices: 22, views: 1920 },
  { name: 'الثلاثاء', screens: 11, devices: 24, views: 1750 },
  { name: 'الأربعاء', screens: 12, devices: 25, views: 2100 },
  { name: 'الخميس', screens: 12, devices: 25, views: 2280 },
  { name: 'الجمعة', screens: 10, devices: 23, views: 1850 },
]

const activityDataMonth = [
  { name: 'أسبوع 1', screens: 9, devices: 20, views: 8400 },
  { name: 'أسبوع 2', screens: 11, devices: 22, views: 11200 },
  { name: 'أسبوع 3', screens: 12, devices: 24, views: 13500 },
  { name: 'أسبوع 4', screens: 12, devices: 25, views: 14800 },
]

const activityDataDay = [
  { name: '12ص', screens: 6, devices: 15, views: 320 },
  { name: '6ص', screens: 8, devices: 18, views: 580 },
  { name: '9ص', screens: 12, devices: 24, views: 1240 },
  { name: '12م', screens: 12, devices: 25, views: 1580 },
  { name: '3ع', screens: 11, devices: 24, views: 1420 },
  { name: '6ع', screens: 12, devices: 25, views: 1980 },
  { name: '9م', screens: 10, devices: 22, views: 1650 },
  { name: '12م', screens: 7, devices: 16, views: 480 },
]

const peakHoursData = [
  { hour: '6ص', views: 580 },
  { hour: '9ص', views: 1240 },
  { hour: '12م', views: 1580 },
  { hour: '3ع', views: 1420 },
  { hour: '6ع', views: 1980 },
  { hour: '9م', views: 1650 },
  { hour: '12م', views: 480 },
]

const topScreens = [
  { name: 'شاشة الاستقبال', views: 3420, engagement: 92, status: 'online' },
  { name: 'شاشة الكافيه', views: 2890, engagement: 85, status: 'online' },
  { name: 'شاشة الممر', views: 1870, engagement: 71, status: 'online' },
  { name: 'شاشة الخارج', views: 940, engagement: 45, status: 'offline' },
]

const aiInsights = [
  { icon: TrendingUp, text: 'أعلى تفاعل يوم الخميس بنسبة 92% — يُفضل جدولة المحتوى المهم في هذا اليوم', color: 'emerald' },
  { icon: Clock, text: 'أوقات الذروة من 6م إلى 9م — ضاعف المحتوى الإعلاني في هذه الفترة', color: 'royal' },
  { icon: AlertCircle, text: 'شاشة "الخارج" متوقفة منذ 3 ساعات — تحتاج صيانة عاجلة', color: 'red' },
  { icon: Sparkles, text: 'اقتراح: أضف محتوى تفاعلي في شاشة الاستقبال لزيادة التفاعل 15%', color: 'gold' },
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

const insightColorMap: Record<string, string> = {
  emerald: 'bg-emerald-50 text-emerald-600',
  royal: 'bg-royal-50 text-royal-600',
  red: 'bg-red-50 text-red-500',
  gold: 'bg-gold-50 text-gold-600',
}

type TimeRange = 'day' | 'week' | 'month'

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week')

  const getActivityData = () => {
    if (timeRange === 'day') return activityDataDay
    if (timeRange === 'month') return activityDataMonth
    return activityDataWeek
  }

  const totalViews = getActivityData().reduce((sum, d) => sum + d.views, 0)
  const avgEngagement = Math.round(topScreens.reduce((sum, s) => sum + s.engagement, 0) / topScreens.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">لوحة التحكم</h1>
          <p className="text-slate-400 text-sm mt-1">نظرة عامة على نظام الشاشات الذكية</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {([
              { key: 'day' as TimeRange, label: 'اليوم' },
              { key: 'week' as TimeRange, label: 'الأسبوع' },
              { key: 'month' as TimeRange, label: 'الشهر' },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setTimeRange(tab.key)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  timeRange === tab.key
                    ? 'bg-white text-royal-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span>منذ دقيقتين</span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-card p-4 border-2 border-royal-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-royal-gradient flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">رؤى ذكية</h2>
            <p className="text-xs text-slate-400">تحليلات تلقائية بالذكاء الاصطناعي</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {aiInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', insightColorMap[insight.color])}>
                <insight.icon className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1.5">{insight.text}</p>
            </div>
          ))}
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
              <p className="text-sm text-slate-400">
                {timeRange === 'day' ? 'آخر 24 ساعة' : timeRange === 'week' ? 'آخر 7 أيام' : 'آخر 4 أسابيع'}
              </p>
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
            <AreaChart data={getActivityData()}>
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

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-royal-50 flex items-center justify-center flex-shrink-0">
            <Eye className="w-5 h-5 text-royal-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400">إجمالي المشاهدات</p>
            <p className="text-lg font-bold text-slate-900">{totalViews.toLocaleString()}</p>
          </div>
        </div>
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400">متوسط التفاعل</p>
            <p className="text-lg font-bold text-slate-900">{avgEngagement}%</p>
          </div>
        </div>
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-gold-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400">وقت التشغيل</p>
            <p className="text-lg font-bold text-slate-900">99.2%</p>
          </div>
        </div>
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400">نمو أسبوعي</p>
            <p className="text-lg font-bold text-emerald-600">+12.5%</p>
          </div>
        </div>
      </div>

      {/* Peak Hours + Top Screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">أوقات الذروة</h2>
              <p className="text-sm text-slate-400">المشاهدات حسب الساعة</p>
            </div>
            <Clock className="w-5 h-5 text-royal-600" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={peakHoursData}>
              <defs>
                <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  color: '#1E293B',
                }}
              />
              <Bar dataKey="views" fill="url(#peakGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">أداء الشاشات</h2>
              <p className="text-sm text-slate-400">المشاهدات ونسبة التفاعل</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-3">
            {topScreens.map((screen, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', screen.status === 'online' ? 'bg-emerald-500' : 'bg-red-400')} />
                    <span className="text-sm text-slate-700 font-medium">{screen.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500">{screen.views.toLocaleString()} مشاهدة</span>
                    <span className={cn('font-bold', screen.engagement >= 80 ? 'text-emerald-600' : screen.engagement >= 60 ? 'text-gold-600' : 'text-red-500')}>{screen.engagement}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', screen.engagement >= 80 ? 'bg-emerald-500' : screen.engagement >= 60 ? 'bg-gold-500' : 'bg-red-400')}
                    style={{ width: `${screen.engagement}%` }}
                  />
                </div>
              </div>
            ))}
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
