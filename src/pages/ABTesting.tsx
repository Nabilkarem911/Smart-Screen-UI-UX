import { useState } from 'react'
import {
  FlaskConical, Play, Pause, CheckCircle2, XCircle, TrendingUp,
  TrendingDown, Users, Eye, Clock, Target, Plus, ChevronRight,
  BarChart3, Zap, Award, AlertCircle, Copy, Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface ABTest {
  id: number
  name: string
  screen: string
  status: 'running' | 'completed' | 'paused' | 'draft'
  variantA: { name: string; views: number; engagement: number; conversion: number }
  variantB: { name: string; views: number; engagement: number; conversion: number }
  duration: string
  startDate: string
  winner?: 'A' | 'B' | 'tie'
  confidence: number
}

const tests: ABTest[] = [
  {
    id: 1,
    name: 'عرض الصباح - نص vs صورة',
    screen: 'شاشة الاستقبال',
    status: 'running',
    variantA: { name: 'نص فقط', views: 1240, engagement: 12.4, conversion: 3.2 },
    variantB: { name: 'صورة + نص', views: 1180, engagement: 18.7, conversion: 5.8 },
    duration: '7 أيام',
    startDate: 'منذ 3 أيام',
    confidence: 87,
  },
  {
    id: 2,
    name: 'لون الزر - أزرق vs ذهبي',
    screen: 'شاشة الكافيه',
    status: 'completed',
    variantA: { name: 'أزرق', views: 2100, engagement: 14.1, conversion: 4.1 },
    variantB: { name: 'ذهبي', views: 2080, engagement: 21.3, conversion: 7.2 },
    duration: '14 يوم',
    startDate: 'منذ أسبوعين',
    winner: 'B',
    confidence: 95,
  },
  {
    id: 3,
    name: 'موضع الشعار - أعلى vs وسط',
    screen: 'شاشة الخروج',
    status: 'completed',
    variantA: { name: 'أعلى', views: 1850, engagement: 16.2, conversion: 5.5 },
    variantB: { name: 'وسط', views: 1820, engagement: 15.8, conversion: 5.1 },
    duration: '10 أيام',
    startDate: 'منذ 3 أسابيع',
    winner: 'A',
    confidence: 78,
  },
  {
    id: 4,
    name: 'عدد الكلمات - قصير vs طويل',
    screen: 'شاشة الاستقبال',
    status: 'paused',
    variantA: { name: 'قصير (5 كلمات)', views: 890, engagement: 19.2, conversion: 6.1 },
    variantB: { name: 'طويل (15 كلمة)', views: 910, engagement: 11.4, conversion: 3.8 },
    duration: '5 أيام',
    startDate: 'منذ 6 أيام',
    confidence: 72,
  },
  {
    id: 5,
    name: 'خلفية - فاتح vs داكن',
    screen: 'شاشة المطعم',
    status: 'draft',
    variantA: { name: 'فاتح', views: 0, engagement: 0, conversion: 0 },
    variantB: { name: 'داكن', views: 0, engagement: 0, conversion: 0 },
    duration: '7 أيام',
    startDate: 'لم يبدأ',
    confidence: 0,
  },
]

const statusConfig = {
  running: { label: 'جاري', bg: 'bg-emerald-50', text: 'text-emerald-600', icon: Play, dot: 'bg-emerald-500 animate-pulse' },
  completed: { label: 'مكتمل', bg: 'bg-blue-50', text: 'text-blue-600', icon: CheckCircle2, dot: 'bg-blue-500' },
  paused: { label: 'متوقف', bg: 'bg-gold-50', text: 'text-gold-600', icon: Pause, dot: 'bg-gold-500' },
  draft: { label: 'مسودة', bg: 'bg-slate-100', text: 'text-slate-500', icon: Settings, dot: 'bg-slate-400' },
}

export default function ABTesting() {
  const { toast } = useToast()
  const [filter, setFilter] = useState<string>('all')
  const [showCreate, setShowCreate] = useState(false)
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null)

  const filtered = tests.filter((t) => filter === 'all' || t.status === filter)

  const getWinner = (test: ABTest) => {
    if (test.winner) return test.winner
    if (test.variantB.engagement > test.variantA.engagement) return 'B'
    if (test.variantA.engagement > test.variantB.engagement) return 'A'
    return 'tie'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">اختبارات A/B</h1>
            <p className="text-slate-400 text-sm mt-1">قارن نسختين من المحتوى واكتشف الأفضل أداءً</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          اختبار جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الاختبارات', value: tests.length, icon: FlaskConical, color: 'royal' },
          { label: 'جارية الآن', value: tests.filter((t) => t.status === 'running').length, icon: Play, color: 'emerald' },
          { label: 'مكتملة', value: tests.filter((t) => t.status === 'completed').length, icon: CheckCircle2, color: 'blue' },
          { label: 'متوسط التحسن', value: '+23%', icon: TrendingUp, color: 'gold' },
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

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {['all', 'running', 'completed', 'paused', 'draft'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              filter === f ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            )}
          >
            {f === 'all' ? 'الكل' : statusConfig[f as keyof typeof statusConfig].label}
          </button>
        ))}
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        {filtered.map((test) => {
          const status = statusConfig[test.status]
          const StatusIcon = status.icon
          const winner = getWinner(test)
          return (
            <div key={test.id} className="glass-card p-5 hover:shadow-md transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', status.bg, status.text)}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{test.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">{test.screen}</span>
                      <span className="text-slate-200">•</span>
                      <span className="text-xs text-slate-400">{test.duration}</span>
                      <span className="text-slate-200">•</span>
                      <span className="text-xs text-slate-400">{test.startDate}</span>
                    </div>
                  </div>
                </div>
                <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-md flex-shrink-0', status.bg, status.text)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />
                  {status.label}
                </span>
              </div>

              {/* Variants Comparison */}
              <div className="grid grid-cols-2 gap-3">
                {/* Variant A */}
                <div className={cn(
                  'rounded-xl p-4 border-2 transition-all',
                  winner === 'A' ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-100 bg-slate-50/50'
                )}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-royal-gradient flex items-center justify-center text-white text-xs font-bold">A</span>
                      <span className="text-sm font-semibold text-slate-700">{test.variantA.name}</span>
                    </div>
                    {winner === 'A' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <Award className="w-3.5 h-3.5" />
                        الفائز
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1"><Eye className="w-3 h-3" /> مشاهدات</span>
                      <span className="font-bold text-slate-700">{test.variantA.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1"><Zap className="w-3 h-3" /> تفاعل</span>
                      <span className="font-bold text-slate-700">{test.variantA.engagement}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1"><Target className="w-3 h-3" /> تحويل</span>
                      <span className="font-bold text-slate-700">{test.variantA.conversion}%</span>
                    </div>
                  </div>
                </div>

                {/* Variant B */}
                <div className={cn(
                  'rounded-xl p-4 border-2 transition-all',
                  winner === 'B' ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-100 bg-slate-50/50'
                )}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-gold-gradient flex items-center justify-center text-white text-xs font-bold">B</span>
                      <span className="text-sm font-semibold text-slate-700">{test.variantB.name}</span>
                    </div>
                    {winner === 'B' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <Award className="w-3.5 h-3.5" />
                        الفائز
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1"><Eye className="w-3 h-3" /> مشاهدات</span>
                      <span className="font-bold text-slate-700">{test.variantB.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1"><Zap className="w-3 h-3" /> تفاعل</span>
                      <span className="font-bold text-slate-700">{test.variantB.engagement}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1"><Target className="w-3 h-3" /> تحويل</span>
                      <span className="font-bold text-slate-700">{test.variantB.conversion}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              {test.status !== 'draft' && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400">مستوى الثقة</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className={cn('h-full rounded-full', test.confidence >= 90 ? 'bg-emerald-500' : test.confidence >= 75 ? 'bg-gold-500' : 'bg-slate-400')} style={{ width: `${test.confidence}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{test.confidence}%</span>
                      </div>
                    </div>
                    {winner !== 'tie' && test.status === 'completed' && (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        تحسن {Math.abs(test.variantB.engagement - test.variantA.engagement).toFixed(1)}%
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedTest(test)}
                    className="text-xs text-royal-600 font-semibold hover:text-royal-700 flex items-center gap-1"
                  >
                    تفاصيل
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowCreate(false)}>
          <div className="glass-card p-6 w-full max-w-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">إنشاء اختبار A/B جديد</h3>
              <button onClick={() => setShowCreate(false)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">اسم الاختبار</label>
                <input className="input-field text-sm" placeholder="مثال: عرض الصباح - نص vs صورة" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">الشاشة المستهدفة</label>
                <select className="input-field text-sm">
                  <option>شاشة الاستقبال</option>
                  <option>شاشة الكافيه</option>
                  <option>شاشة الخروج</option>
                  <option>شاشة المطعم</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">النسخة A</label>
                  <input className="input-field text-sm" placeholder="وصف النسخة A" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">النسخة B</label>
                  <input className="input-field text-sm" placeholder="وصف النسخة B" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">مدة الاختبار</label>
                <div className="flex gap-2">
                  {['3 أيام', '7 أيام', '14 يوم', '30 يوم'].map((d) => (
                    <button key={d} className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-royal-50 hover:text-royal-600 transition-all">
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { setShowCreate(false); toast('تم إنشاء الاختبار بنجاح', 'success') }}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                <FlaskConical className="w-4 h-4" />
                بدء الاختبار
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedTest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedTest(null)}>
          <div className="glass-card p-6 w-full max-w-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">{selectedTest.name}</h3>
              <button onClick={() => setSelectedTest(null)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Chart placeholder */}
              <div className="h-48 rounded-xl bg-slate-50 flex items-end justify-around p-4 gap-4">
                {[40, 65, 35, 80, 55, 90, 45, 70, 60, 85, 50, 75].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-royal-200 rounded-t-lg" style={{ height: `${h}%` }} />
                    <div className="w-full bg-gold-200 rounded-t-lg" style={{ height: `${h * 0.7}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-royal-300" /> النسخة A</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gold-300" /> النسخة B</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'إجمالي المشاهدات', a: selectedTest.variantA.views, b: selectedTest.variantB.views },
                  { label: 'معدل التفاعل', a: `${selectedTest.variantA.engagement}%`, b: `${selectedTest.variantB.engagement}%` },
                  { label: 'معدل التحويل', a: `${selectedTest.variantA.conversion}%`, b: `${selectedTest.variantB.conversion}%` },
                ].map((metric, i) => (
                  <div key={i} className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-400 mb-2">{metric.label}</p>
                    <p className="text-sm font-bold text-royal-600">{metric.a}</p>
                    <p className="text-[10px] text-slate-300 my-1">vs</p>
                    <p className="text-sm font-bold text-gold-600">{metric.b}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setSelectedTest(null); toast('تم تطبيق النسخة الفائزة', 'success') }}
                  className="btn-primary flex items-center gap-2 text-sm flex-1 justify-center"
                >
                  <Award className="w-4 h-4" />
                  تطبيق النسخة الفائزة
                </button>
                <button
                  onClick={() => { setSelectedTest(null); toast('تم نسخ بيانات الاختبار', 'success') }}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  نسخ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
