import { useState } from 'react'
import {
  Flame, Eye, MousePointer, Clock, TrendingUp, Monitor,
  Tablet, Smartphone, Download, RefreshCw, Layers, Target,
  Zap, Users, ArrowUp, ArrowDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeatPoint {
  x: number
  y: number
  intensity: number
  label?: string
}

const screens = [
  { id: 1, name: 'شاشة الاستقبال', device: 'monitor', views: 12450, avgWatch: '8.2ث', engagement: 72 },
  { id: 2, name: 'شاشة الكافيه', device: 'tablet', views: 8920, avgWatch: '12.5ث', engagement: 85 },
  { id: 3, name: 'شاشة الخروج', device: 'monitor', views: 6780, avgWatch: '5.1ث', engagement: 48 },
  { id: 4, name: 'شاشة المطعم', device: 'tablet', views: 5430, avgWatch: '15.8ث', engagement: 91 },
]

const heatPoints: HeatPoint[] = [
  { x: 25, y: 20, intensity: 0.9, label: 'الشعار' },
  { x: 50, y: 35, intensity: 1.0, label: 'العنوان الرئيسي' },
  { x: 50, y: 55, intensity: 0.7, label: 'المحتوى' },
  { x: 75, y: 45, intensity: 0.85, label: 'صورة المنتج' },
  { x: 30, y: 75, intensity: 0.5, label: 'معلومات تواصل' },
  { x: 70, y: 80, intensity: 0.65, label: 'زر الإجراء' },
  { x: 15, y: 50, intensity: 0.3 },
  { x: 85, y: 25, intensity: 0.4 },
  { x: 40, y: 85, intensity: 0.55 },
  { x: 60, y: 15, intensity: 0.35 },
]

const deviceIcons = { monitor: Monitor, tablet: Tablet, smartphone: Smartphone }

const intensityColors = [
  'bg-blue-400/40',
  'bg-cyan-400/50',
  'bg-emerald-400/55',
  'bg-gold-400/60',
  'bg-orange-400/65',
  'bg-red-500/70',
]

const getIntensityColor = (intensity: number) => {
  if (intensity >= 0.9) return 'bg-red-500/70'
  if (intensity >= 0.75) return 'bg-orange-400/65'
  if (intensity >= 0.6) return 'bg-gold-400/60'
  if (intensity >= 0.45) return 'bg-emerald-400/55'
  if (intensity >= 0.3) return 'bg-cyan-400/50'
  return 'bg-blue-400/40'
}

export default function Heatmaps() {
  const [selectedScreen, setSelectedScreen] = useState(1)
  const [viewMode, setViewMode] = useState<'heatmap' | 'clicks' | 'scroll'>('heatmap')

  const current = screens.find((s) => s.id === selectedScreen)!

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">الخرائط الحرارية</h1>
            <p className="text-slate-400 text-sm mt-1">تحليل بصري لمناطق التفاعل على شاشاتك</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" />
            تحديث
          </button>
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            تصدير
          </button>
        </div>
      </div>

      {/* Screen Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {screens.map((screen) => {
          const DeviceIcon = deviceIcons[screen.device as keyof typeof deviceIcons]
          return (
            <button
              key={screen.id}
              onClick={() => setSelectedScreen(screen.id)}
              className={cn(
                'glass-card p-4 text-right transition-all',
                selectedScreen === screen.id ? 'ring-2 ring-royal-500 shadow-md' : 'hover:shadow-md'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center',
                  selectedScreen === screen.id ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-400'
                )}>
                  <DeviceIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700 truncate">{screen.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1"><Eye className="w-3 h-3" /> {screen.views.toLocaleString()}</span>
                <span className={cn(
                  'font-bold flex items-center gap-1',
                  screen.engagement >= 70 ? 'text-emerald-600' : screen.engagement >= 50 ? 'text-gold-600' : 'text-red-500'
                )}>
                  <Zap className="w-3 h-3" />
                  {screen.engagement}%
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Visualization */}
        <div className="lg:col-span-2 space-y-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            {[
              { id: 'heatmap' as const, label: 'خريطة حرارية', icon: Flame },
              { id: 'clicks' as const, label: 'نقرات', icon: MousePointer },
              { id: 'scroll' as const, label: 'تمرير', icon: Layers },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all',
                  viewMode === mode.id ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                )}
              >
                <mode.icon className="w-3.5 h-3.5" />
                {mode.label}
              </button>
            ))}
          </div>

          {/* Heatmap Canvas */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">{current.name}</h3>
              <span className="text-xs text-slate-400">آخر 7 أيام</span>
            </div>
            <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden border border-slate-200">
              {/* Mock screen content */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-8 w-24 rounded-lg bg-white/10" />
                  <div className="h-6 w-16 rounded-lg bg-white/5" />
                </div>
                <div className="h-12 w-3/4 rounded-lg bg-white/10 mb-3" />
                <div className="h-32 w-full rounded-xl bg-white/5 mb-3" />
                <div className="flex gap-2">
                  <div className="h-10 w-32 rounded-lg bg-white/10" />
                  <div className="h-10 w-20 rounded-lg bg-white/5" />
                </div>
              </div>

              {/* Heat overlay */}
              {viewMode === 'heatmap' && heatPoints.map((point, i) => (
                <div
                  key={i}
                  className={cn('absolute rounded-full blur-xl transition-all', getIntensityColor(point.intensity))}
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: `${60 + point.intensity * 80}px`,
                    height: `${60 + point.intensity * 80}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* Click dots */}
              {viewMode === 'clicks' && heatPoints.map((point, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-royal-500/80 ring-2 ring-white/30"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: `${8 + point.intensity * 12}px`,
                    height: `${8 + point.intensity * 12}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* Scroll zones */}
              {viewMode === 'scroll' && (
                <>
                  <div className="absolute inset-x-0 top-0 h-1/4 bg-emerald-500/20 border-b-2 border-emerald-400/40" />
                  <div className="absolute inset-x-0 top-1/4 h-1/4 bg-gold-500/20 border-b-2 border-gold-400/40" />
                  <div className="absolute inset-x-0 top-2/4 h-1/4 bg-orange-500/20 border-b-2 border-orange-400/40" />
                  <div className="absolute inset-x-0 top-3/4 h-1/4 bg-red-500/20" />
                </>
              )}

              {/* Labels */}
              {viewMode === 'heatmap' && heatPoints.filter((p) => p.label).map((point, i) => (
                <div
                  key={`label-${i}`}
                  className="absolute text-[10px] font-semibold text-white bg-slate-900/70 px-2 py-0.5 rounded-md whitespace-nowrap"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y + 8}%`,
                    transform: 'translate(-50%, 0)',
                  }}
                >
                  {point.label}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">أقل تفاعل</span>
                <div className="flex items-center gap-0.5">
                  {intensityColors.map((c, i) => (
                    <div key={i} className={cn('w-6 h-3 rounded-sm', c)} />
                  ))}
                </div>
                <span className="text-xs text-slate-400">أكثر تفاعل</span>
              </div>
              <span className="text-xs text-slate-400">{current.views.toLocaleString()} مشاهدة</span>
            </div>
          </div>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">مؤشرات الأداء</h3>
            <div className="space-y-3">
              {[
                { label: 'متوسط وقت المشاهدة', value: current.avgWatch, icon: Clock, change: '+12%', up: true },
                { label: 'معدل التفاعل', value: `${current.engagement}%`, icon: Zap, change: '+5%', up: true },
                { label: 'المشاهدات اليومية', value: Math.floor(current.views / 7).toLocaleString(), icon: Eye, change: '-3%', up: false },
                { label: 'المشاهدون الفريدون', value: Math.floor(current.views * 0.65).toLocaleString(), icon: Users, change: '+8%', up: true },
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
                  <span className={cn(
                    'text-xs font-bold flex items-center gap-0.5',
                    metric.up ? 'text-emerald-600' : 'text-red-500'
                  )}>
                    {metric.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Zones */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">المناطق الأكثر تفاعلاً</h3>
            <div className="space-y-2">
              {[
                { zone: 'العنوان الرئيسي', clicks: 3420, percent: 28 },
                { zone: 'صورة المنتج', clicks: 2890, percent: 23 },
                { zone: 'الشعار', clicks: 2150, percent: 17 },
                { zone: 'زر الإجراء', clicks: 1780, percent: 14 },
                { zone: 'معلومات تواصل', clicks: 1240, percent: 10 },
              ].map((zone, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-20 truncate">{zone.zone}</span>
                  <div className="flex-1 h-6 rounded-lg bg-slate-100 overflow-hidden">
                    <div
                      className={cn('h-full rounded-lg flex items-center justify-start px-2', getIntensityColor(zone.percent / 28))}
                      style={{ width: `${zone.percent * 3}%` }}
                    >
                      <span className="text-[10px] font-bold text-white">{zone.percent}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 w-12 text-left">{zone.clicks.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insight */}
          <div className="glass-card p-4 bg-gradient-to-l from-royal-50/50 to-transparent">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-royal-gradient flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 mb-1">رؤية ذكية</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  المنطقة العلوية (الشعار + العنوان) تستحوذ على 68% من التفاعل. نوصي بوضع المحتوى الأهم في الثلث العلوي من الشاشة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
