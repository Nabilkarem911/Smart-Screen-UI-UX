import { useState } from 'react'
import {
  Calculator, TrendingUp, TrendingDown, DollarSign, Monitor,
  Tablet, Clock, Users, Target, Award, PieChart, BarChart3,
  RefreshCw, Download, ArrowUp, ArrowDown, Info, Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScreenROI {
  id: number
  name: string
  type: 'monitor' | 'tablet'
  cost: number
  views: number
  conversion: number
  revenue: number
  roi: number
  payback: number
}

const initialScreens: ScreenROI[] = [
  { id: 1, name: 'شاشة الاستقبال', type: 'monitor', cost: 3500, views: 12450, conversion: 5.8, revenue: 8900, roi: 154, payback: 2.3 },
  { id: 2, name: 'شاشة الكافيه', type: 'tablet', cost: 2200, views: 8920, conversion: 7.2, revenue: 6400, roi: 191, payback: 1.8 },
  { id: 3, name: 'شاشة الخروج', type: 'monitor', cost: 3000, views: 6780, conversion: 3.1, revenue: 2100, roi: 70, payback: 5.2 },
  { id: 4, name: 'شاشة المطعم', type: 'tablet', cost: 1800, views: 5430, conversion: 8.5, revenue: 4600, roi: 256, payback: 1.4 },
]

export default function ROICalculator() {
  const [screens, setScreens] = useState<ScreenROI[]>(initialScreens)
  const [monthlyCost, setMonthlyCost] = useState(500)
  const [contentCost, setContentCost] = useState(800)
  const [targetRevenue, setTargetRevenue] = useState(10000)

  const totalCost = screens.reduce((s, sc) => s + sc.cost, 0) + monthlyCost + contentCost
  const totalRevenue = screens.reduce((s, sc) => s + sc.revenue, 0)
  const totalROI = ((totalRevenue - totalCost) / totalCost) * 100
  const totalViews = screens.reduce((s, sc) => s + sc.views, 0)
  const avgConversion = screens.reduce((s, sc) => s + sc.conversion, 0) / screens.length
  const costPerView = totalCost / totalViews
  const revenuePerView = totalRevenue / totalViews

  const updateRevenue = (id: number, value: number) => {
    setScreens((prev) => prev.map((s) => {
      if (s.id === id) {
        const roi = ((value - s.cost) / s.cost) * 100
        const payback = s.cost / (value / 30)
        return { ...s, revenue: value, roi, payback }
      }
      return s
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">حاسبة العائد على الاستثمار</h1>
            <p className="text-slate-400 text-sm mt-1">احسب ROI لكل شاشة واكتشف الأكثر ربحية</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" />
            تحديث
          </button>
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            تصدير التقرير
          </button>
        </div>
      </div>

      {/* Top Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الاستثمار', value: `${totalCost.toLocaleString()} ر.س`, icon: DollarSign, color: 'royal', change: null },
          { label: 'إجمالي العائد', value: `${totalRevenue.toLocaleString()} ر.س`, icon: TrendingUp, color: 'emerald', change: '+18%' },
          { label: 'صافي الربح', value: `${(totalRevenue - totalCost).toLocaleString()} ر.س`, icon: Award, color: 'gold', change: '+24%' },
          { label: 'ROI الإجمالي', value: `${totalROI.toFixed(0)}%`, icon: PieChart, color: totalROI > 100 ? 'emerald' : 'gold', change: null },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-3">
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', `bg-${stat.color}-50 text-${stat.color}-600`)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-slate-400">{stat.label}</p>
                  {stat.change && (
                    <span className={cn('text-[10px] font-bold flex items-center gap-0.5', stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500')}>
                      {stat.change.startsWith('+') ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator Inputs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">التكاليف التشغيلية</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">تكلفة شهرية (كهرباء/إنترنت/صيانة)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={monthlyCost}
                    onChange={(e) => setMonthlyCost(Number(e.target.value))}
                    className="input-field text-sm pl-12"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">ر.س</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">تكلفة المحتوى الشهرية</label>
                <div className="relative">
                  <input
                    type="number"
                    value={contentCost}
                    onChange={(e) => setContentCost(Number(e.target.value))}
                    className="input-field text-sm pl-12"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">ر.س</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">هدف العائد الشهري</label>
                <div className="relative">
                  <input
                    type="number"
                    value={targetRevenue}
                    onChange={(e) => setTargetRevenue(Number(e.target.value))}
                    className="input-field text-sm pl-12"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">ر.س</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">مؤشرات الأداء</h3>
            <div className="space-y-3">
              {[
                { label: 'التكلفة لكل مشاهدة', value: `${costPerView.toFixed(2)} ر.س`, icon: Eye, hint: 'إجمالي التكلفة ÷ المشاهدات' },
                { label: 'العائد لكل مشاهدة', value: `${revenuePerView.toFixed(2)} ر.س`, icon: TrendingUp, hint: 'إجمالي العائد ÷ المشاهدات' },
                { label: 'متوسط التحويل', value: `${avgConversion.toFixed(1)}%`, icon: Target, hint: 'متوسط معدل التحويل' },
                { label: 'إجمالي المشاهدات', value: totalViews.toLocaleString(), icon: Users, hint: 'آخر 30 يوم' },
              ].map((metric, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                      <metric.icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{metric.label}</p>
                      <p className="text-sm font-bold text-slate-900">{metric.value}</p>
                    </div>
                  </div>
                  <Info className="w-3.5 h-3.5 text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Insight */}
          <div className="glass-card p-4 bg-gradient-to-l from-emerald-50/50 to-transparent">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 mb-1">أفضل شاشة أداءً</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  شاشة المطعم تحقق ROI 256% — أعلى عائد بأقل تكلفة. استثمر في شاشات مماثلة.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Per-Screen Breakdown */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">تحليل كل شاشة</h3>
            <div className="space-y-3">
              {screens.map((screen) => {
                const DeviceIcon = screen.type === 'monitor' ? Monitor : Tablet
                const isProfit = screen.roi > 100
                return (
                  <div key={screen.id} className="rounded-xl border border-slate-100 p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                          <DeviceIcon className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{screen.name}</p>
                          <p className="text-xs text-slate-400">التكلفة: {screen.cost.toLocaleString()} ر.س</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className={cn(
                          'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold',
                          isProfit ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                        )}>
                          {isProfit ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          ROI {screen.roi.toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { label: 'مشاهدات', value: screen.views.toLocaleString() },
                        { label: 'تحويل', value: `${screen.conversion}%` },
                        { label: 'تكلفة/مشاهدة', value: `${(screen.cost / screen.views).toFixed(2)}` },
                        { label: 'استرداد', value: `${screen.payback.toFixed(1)} شهر` },
                      ].map((m, i) => (
                        <div key={i} className="text-center p-2 rounded-lg bg-slate-50">
                          <p className="text-[10px] text-slate-400">{m.label}</p>
                          <p className="text-xs font-bold text-slate-700">{m.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Revenue Slider */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400">العائد الشهري</span>
                        <span className="font-bold text-slate-700">{screen.revenue.toLocaleString()} ر.س</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="15000"
                        step="100"
                        value={screen.revenue}
                        onChange={(e) => updateRevenue(screen.id, Number(e.target.value))}
                        className="w-full h-2 rounded-full bg-slate-100 appearance-none cursor-pointer accent-royal-500"
                      />
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span>التكلفة</span>
                        <span>العائد</span>
                      </div>
                      <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
                        <div className="bg-slate-300" style={{ width: `${Math.min((screen.cost / (screen.cost + screen.revenue)) * 100, 100)}%` }} />
                        <div className={cn('flex-1', isProfit ? 'bg-emerald-400' : 'bg-gold-400')} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-400" />
              مقارنة ROI بين الشاشات
            </h3>
            <div className="space-y-3">
              {[...screens].sort((a, b) => b.roi - a.roi).map((screen, i) => (
                <div key={screen.id} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-24 truncate">{screen.name}</span>
                  <div className="flex-1 h-7 rounded-lg bg-slate-100 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-lg flex items-center justify-start px-2 transition-all',
                        screen.roi >= 200 ? 'bg-emerald-400' : screen.roi >= 100 ? 'bg-royal-400' : 'bg-gold-400'
                      )}
                      style={{ width: `${Math.min(screen.roi / 3, 100)}%` }}
                    >
                      <span className="text-[10px] font-bold text-white">{screen.roi.toFixed(0)}%</span>
                    </div>
                  </div>
                  {i === 0 && <Award className="w-4 h-4 text-gold-500 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
