import { useState } from 'react'
import {
  Lightbulb, TrendingUp, Clock, Users, Target, Sparkles,
  ArrowUp, ArrowDown, Minus, ChevronRight, Check,
  Calendar, Eye, Zap, RefreshCw, Filter, ThumbsUp, X, CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface Recommendation {
  id: number
  type: 'schedule' | 'content' | 'screen' | 'audience'
  title: string
  desc: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  action: string
  icon: any
  color: string
  metric?: { label: string; change: string; direction: 'up' | 'down' | 'neutral' }
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    type: 'schedule',
    title: 'وقت العرض الأمثل لشاشة الاستقبال',
    desc: 'تحليل البيانات يُظهر أن أعلى تفاعل يحدث بين 9ص و 11ص. نوصي بجدولة المحتوى الترويجي في هذه الفترة.',
    impact: 'high',
    confidence: 92,
    action: 'جدولة المحتوى',
    icon: Clock,
    color: 'royal',
    metric: { label: 'المشاهدات المتوقعة', change: '+34%', direction: 'up' },
  },
  {
    id: 2,
    type: 'content',
    title: 'المحتوى المرئي يتفوق على النصي',
    desc: 'الشاشات التي تحتوي على صور وفيديو تحقق تفاعل أعلى بـ 2.5x مقارنة بالمحتوى النصي فقط.',
    impact: 'high',
    confidence: 87,
    action: 'تحويل المحتوى',
    icon: TrendingUp,
    color: 'emerald',
    metric: { label: 'معدل التفاعل', change: '+150%', direction: 'up' },
  },
  {
    id: 3,
    type: 'audience',
    title: 'الجمهور المسائي أكبر من الصباحي',
    desc: '60% من المشاهدات تحدث بعد 4م. نوصي بزيادة المحتوى المسائي وتقليل الصباحي بنسبة 20%.',
    impact: 'medium',
    confidence: 78,
    action: 'إعادة توزيع المحتوى',
    icon: Users,
    color: 'gold',
    metric: { label: 'تغطية الجمهور', change: '+22%', direction: 'up' },
  },
  {
    id: 4,
    type: 'screen',
    title: 'شاشة الكافيه تحتاج تحديث',
    desc: 'المحتوى لم يُحدّث منذ 7 أيام، ومعدل المشاهدات انخفض 18%. نوصي بتحديث المحتوى فوراً.',
    impact: 'high',
    confidence: 95,
    action: 'تحديث المحتوى',
    icon: RefreshCw,
    color: 'red',
    metric: { label: 'المشاهدات', change: '-18%', direction: 'down' },
  },
  {
    id: 5,
    type: 'schedule',
    title: 'فجوة في جدولة المساء',
    desc: 'لا يوجد محتوى مجدول بين 7م و 9م على شاشة الخروج. هذه فترة ذروة تفويتها يخسر مشاهدات.',
    impact: 'medium',
    confidence: 84,
    action: 'ملء الفجوة',
    icon: Calendar,
    color: 'blue',
    metric: { label: 'فرصة مشاهدات', change: '+500', direction: 'up' },
  },
  {
    id: 6,
    type: 'content',
    title: 'ألوان دافئة تزيد التفاعل',
    desc: 'الشاشات بألوان دافئة (برتقالي/أحمر) تحقق تفاعل أعلى بـ 23% من الألوان الباردة في المساء.',
    impact: 'low',
    confidence: 71,
    action: 'تغيير الألوان',
    icon: Sparkles,
    color: 'gold',
    metric: { label: 'التفاعل', change: '+23%', direction: 'up' },
  },
]

const typeLabels = {
  schedule: 'جدولة',
  content: 'محتوى',
  screen: 'شاشة',
  audience: 'جمهور',
}

const impactConfig = {
  high: { bg: 'bg-red-50', text: 'text-red-600', label: 'تأثير عالي' },
  medium: { bg: 'bg-gold-50', text: 'text-gold-600', label: 'تأثير متوسط' },
  low: { bg: 'bg-slate-100', text: 'text-slate-500', label: 'تأثير منخفض' },
}

const colorMap: Record<string, string> = {
  royal: 'bg-royal-50 text-royal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  gold: 'bg-gold-50 text-gold-600',
  red: 'bg-red-50 text-red-600',
  blue: 'bg-blue-50 text-blue-600',
}

export default function SmartRecommendations() {
  const { toast } = useToast()
  const [filter, setFilter] = useState<string>('all')
  const [applied, setApplied] = useState<number[]>([])
  const [dismissed, setDismissed] = useState<number[]>([])

  const filtered = recommendations.filter((r) => {
    if (dismissed.includes(r.id)) return false
    if (filter === 'all') return true
    return r.type === filter
  })

  const handleApply = (id: number) => {
    setApplied((prev) => [...prev, id])
    toast('تم تطبيق التوصية بنجاح', 'success')
  }

  const handleDismiss = (id: number) => {
    setDismissed((prev) => [...prev, id])
    toast('تم تجاهل التوصية', 'info')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">اقتراحات ذكية</h1>
            <p className="text-slate-400 text-sm mt-1">توصيات مبنية على تحليل بيانات النظام بالذكاء الاصطناعي</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-semibold">
          <Target className="w-4 h-4" />
          <span>{filtered.length} توصية نشطة</span>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="glass-card p-5 bg-gradient-to-l from-royal-50/50 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-royal-gradient flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900 mb-1">رؤية شاملة من الذكاء الاصطناعي</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              حللنا بيانات آخر 30 يوم ووجدنا أن نظامك يعمل بكفاءة 72%. تطبيق التوصيات الحالية يمكن أن يرفع الكفاءة إلى 89% ويزيد المشاهدات بنسبة 34%.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Zap className="w-3.5 h-3.5 text-gold-500" />
                <span>آخر تحليل: منذ ساعة</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Eye className="w-3.5 h-3.5 text-royal-500" />
                <span>تم تحليل 12,450 نقطة بيانات</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-slate-400" />
        {['all', 'schedule', 'content', 'screen', 'audience'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              filter === f ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            )}
          >
            {f === 'all' ? 'الكل' : typeLabels[f as keyof typeof typeLabels]}
          </button>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        {filtered.map((rec) => {
          const impact = impactConfig[rec.impact]
          const isApplied = applied.includes(rec.id)
          return (
            <div key={rec.id} className="glass-card p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', colorMap[rec.color])}>
                  <rec.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{rec.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                          {typeLabels[rec.type]}
                        </span>
                        <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-md', impact.bg, impact.text)}>
                          {impact.label}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          ثقة {rec.confidence}%
                        </span>
                      </div>
                    </div>
                    {!isApplied && (
                      <button
                        onClick={() => handleDismiss(rec.id)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{rec.desc}</p>

                  {/* Metric */}
                  {rec.metric && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50">
                        {rec.metric.direction === 'up' && <ArrowUp className="w-3.5 h-3.5 text-emerald-500" />}
                        {rec.metric.direction === 'down' && <ArrowDown className="w-3.5 h-3.5 text-red-500" />}
                        {rec.metric.direction === 'neutral' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
                        <span className={cn(
                          'text-xs font-bold',
                          rec.metric.direction === 'up' && 'text-emerald-600',
                          rec.metric.direction === 'down' && 'text-red-500',
                          rec.metric.direction === 'neutral' && 'text-slate-500'
                        )}>
                          {rec.metric.change}
                        </span>
                        <span className="text-xs text-slate-400">{rec.metric.label}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {isApplied ? (
                    <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
                      <Check className="w-4 h-4" />
                      تم التطبيق
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApply(rec.id)}
                        className="btn-primary flex items-center gap-2 text-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {rec.action}
                      </button>
                      <button
                        onClick={() => handleDismiss(rec.id)}
                        className="btn-ghost flex items-center gap-2 text-xs"
                      >
                        تجاهل
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Check className="w-10 h-10 text-emerald-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">تم تطبيق أو تجاهل كل التوصيات</p>
            <p className="text-xs text-slate-400 mt-1">سيظهر هنا توصيات جديدة عند تحليل البيانات القادمة</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'توصيات مطبقة', value: applied.length, icon: Check, color: 'emerald' },
          { label: 'توصيات نشطة', value: filtered.length, icon: Lightbulb, color: 'royal' },
          { label: 'متوسط الثقة', value: '84%', icon: Target, color: 'gold' },
          { label: 'تأثير متوقع', value: '+34%', icon: TrendingUp, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-3">
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', `bg-${stat.color}-50 text-${stat.color}-600`)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
