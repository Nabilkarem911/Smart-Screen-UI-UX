import { useState } from 'react'
import {
  BarChart3, TrendingUp, TrendingDown, Download, Calendar, Eye,
  Clock, Monitor, Smartphone, Users, Zap, Filter, FileText,
  ArrowUpRight, ArrowDownRight, PieChart as PieIcon, Activity,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, RadialBarChart,
  RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { cn } from '@/lib/utils'

const overviewStats = [
  { label: 'إجمالي المشاهدات', value: '48,250', change: '+12.5%', up: true, icon: Eye, color: 'royal' },
  { label: 'متوسط التفاعل', value: '78%', change: '+5.2%', up: true, icon: Zap, color: 'emerald' },
  { label: 'وقت المشاهدة', value: '4.2m', change: '-0.8m', up: false, icon: Clock, color: 'gold' },
  { label: 'زوار فريدون', value: '12,840', change: '+18.3%', up: true, icon: Users, color: 'blue' },
]

const monthlyTrend = [
  { month: 'يناير', views: 32000, engagement: 65, visitors: 8200 },
  { month: 'فبراير', views: 38000, engagement: 68, visitors: 9100 },
  { month: 'مارس', views: 42000, engagement: 72, visitors: 10500 },
  { month: 'أبريل', views: 39000, engagement: 70, visitors: 9800 },
  { month: 'مايو', views: 45000, engagement: 75, visitors: 11200 },
  { month: 'يونيو', views: 48250, engagement: 78, visitors: 12840 },
]

const screenTypeData = [
  { name: 'شاشات أفقية', value: 65, color: '#8B5CF6' },
  { name: 'شاشات طولية', value: 25, color: '#FBBF24' },
  { name: 'تابلت', value: 10, color: '#10B981' },
]

const groupPerformance = [
  { name: 'wow bshmel', views: 18500, engagement: 82, screens: 6 },
  { name: 'Login Screens', views: 12700, engagement: 74, screens: 4 },
  { name: 'Promo Screens', views: 9200, engagement: 68, screens: 3 },
  { name: 'Info Boards', views: 7850, engagement: 61, screens: 2 },
]

const hourlyData = [
  { hour: '12ص', views: 120 },
  { hour: '2ص', views: 80 },
  { hour: '4ص', views: 60 },
  { hour: '6ص', views: 280 },
  { hour: '8ص', views: 890 },
  { hour: '10ص', views: 1450 },
  { hour: '12م', views: 2100 },
  { hour: '2ع', views: 1850 },
  { hour: '4ع', views: 1620 },
  { hour: '6ع', views: 2480 },
  { hour: '8ع', views: 2150 },
  { hour: '10ع', views: 1380 },
  { hour: '12م', views: 520 },
]

const contentPerformance = [
  { name: 'صور', views: 18200, percentage: 38 },
  { name: 'فيديوهات', views: 15600, percentage: 32 },
  { name: 'نصوص متحركة', views: 8400, percentage: 17 },
  { name: 'RSS', views: 3650, percentage: 8 },
  { name: 'أخرى', views: 2400, percentage: 5 },
]

const radialData = [
  { name: 'التفاعل', value: 78, fill: '#8B5CF6' },
]

const colorMap: Record<string, string> = {
  royal: 'bg-royal-50 text-royal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  gold: 'bg-gold-50 text-gold-600',
  blue: 'bg-blue-50 text-blue-600',
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">التحليلات والتقارير</h1>
          <p className="text-slate-400 text-sm mt-1">تحليلات تفصيلية لأداء الشاشات والمحتوى</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {([
              { key: '7d' as const, label: '7 أيام' },
              { key: '30d' as const, label: '30 يوم' },
              { key: '90d' as const, label: '90 يوم' },
              { key: '1y' as const, label: 'سنة' },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setDateRange(tab.key)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  dateRange === tab.key ? 'bg-white text-royal-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" />
            فلترة
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            تصدير PDF
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="stat-card group">
            <div className="flex items-start justify-between mb-3">
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', colorMap[stat.color])}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={cn(
                'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
                stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
              )}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Monthly Trend + Engagement Radial */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">الاتجاه الشهري</h2>
              <p className="text-sm text-slate-400">المشاهدات والتفاعل والزوار</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-3 h-3 rounded-full bg-royal-500" /> المشاهدات
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> التفاعل
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-3 h-3 rounded-full bg-gold-500" /> الزوار
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={2} fill="url(#viewsGrad)" />
              <Area type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} fill="url(#engGrad)" />
              <Line type="monotone" dataKey="visitors" stroke="#FBBF24" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">نسبة التفاعل</h2>
          <p className="text-sm text-slate-400 mb-4">معدل التفاعل الإجمالي</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" cornerRadius={10} fill="#8B5CF6" />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-center -mt-32 mb-16">
            <p className="text-3xl font-bold text-slate-900">78%</p>
            <p className="text-xs text-slate-400">تفاعل إجمالي</p>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">أعلى تفاعل</span>
              <span className="font-semibold text-emerald-600">92%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">أقل تفاعل</span>
              <span className="font-semibold text-red-500">45%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">المتوسط</span>
              <span className="font-semibold text-slate-900">78%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Heatmap + Screen Types */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">المشاهدات حسب الساعة</h2>
              <p className="text-sm text-slate-400">توزيع المشاهدات خلال اليوم</p>
            </div>
            <Activity className="w-5 h-5 text-royal-600" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hourlyData}>
              <defs>
                <linearGradient id="hourGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="hour" stroke="#94A3B8" fontSize={10} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }} />
              <Bar dataKey="views" fill="url(#hourGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">توزيع الشاشات</h2>
          <p className="text-sm text-slate-400 mb-4">حسب النوع</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={screenTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {screenTypeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {screenTypeData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Group Performance Table */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">أداء المجموعات</h2>
            <p className="text-sm text-slate-400">مقارنة بين مجموعات الشاشات</p>
          </div>
          <BarChart3 className="w-5 h-5 text-royal-600" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-right">
                <th className="p-3 text-sm font-semibold text-slate-500">المجموعة</th>
                <th className="p-3 text-sm font-semibold text-slate-500">المشاهدات</th>
                <th className="p-3 text-sm font-semibold text-slate-500">التفاعل</th>
                <th className="p-3 text-sm font-semibold text-slate-500">الشاشات</th>
                <th className="p-3 text-sm font-semibold text-slate-500">الأداء</th>
              </tr>
            </thead>
            <tbody>
              {groupPerformance.map((group, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <span className="text-sm font-medium text-slate-900">{group.name}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm text-slate-600">{group.views.toLocaleString()}</span>
                  </td>
                  <td className="p-3">
                    <span className={cn(
                      'text-sm font-semibold',
                      group.engagement >= 80 ? 'text-emerald-600' : group.engagement >= 65 ? 'text-gold-600' : 'text-red-500'
                    )}>
                      {group.engagement}%
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm text-slate-600">{group.screens}</span>
                  </td>
                  <td className="p-3">
                    <div className="w-32 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          group.engagement >= 80 ? 'bg-emerald-500' : group.engagement >= 65 ? 'bg-gold-500' : 'bg-red-400'
                        )}
                        style={{ width: `${group.engagement}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">أداء المحتوى</h2>
              <p className="text-sm text-slate-400">المشاهدات حسب نوع المحتوى</p>
            </div>
            <FileText className="w-5 h-5 text-royal-600" />
          </div>
          <div className="space-y-3">
            {contentPerformance.map((content, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-700 font-medium">{content.name}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500">{content.views.toLocaleString()}</span>
                    <span className="font-bold text-royal-600">{content.percentage}%</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-royal-gradient transition-all"
                    style={{ width: `${content.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">تقرير سريع</h2>
              <p className="text-sm text-slate-400">ملخص الأداء للفترة المحددة</p>
            </div>
            <Download className="w-5 h-5 text-royal-600" />
          </div>
          <div className="space-y-3">
            {[
              { label: 'أفضل يوم', value: 'الخميس', sub: '6,280 مشاهدة', icon: TrendingUp, color: 'emerald' },
              { label: 'أفضل ساعة', value: '6:00م', sub: '2,480 مشاهدة', icon: Clock, color: 'royal' },
              { label: 'أفضل شاشة', value: 'شاشة الاستقبال', sub: '3,420 مشاهدة', icon: Monitor, color: 'gold' },
              { label: 'أفضل مجموعة', value: 'wow bshmel', sub: '18,500 مشاهدة', icon: BarChart3, color: 'blue' },
              { label: 'أفضل محتوى', value: 'صور', sub: '18,200 مشاهدة', icon: FileText, color: 'emerald' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', colorMap[item.color])}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
                <span className="text-xs text-slate-500">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
