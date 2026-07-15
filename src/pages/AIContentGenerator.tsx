import { useState } from 'react'
import {
  Sparkles, Wand2, Image as ImageIcon, Type, Layout, Video,
  RefreshCw, Check, X, Download, Copy, ThumbsUp, ThumbsDown,
  Palette, Calendar, TrendingUp, Zap, ChevronRight, History,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

type ContentType = 'text' | 'image' | 'layout' | 'video'
type Tone = 'professional' | 'casual' | 'promotional' | 'urgent' | 'elegant'

const contentTypes: { id: ContentType; label: string; icon: any; desc: string }[] = [
  { id: 'text', label: 'نصوص', icon: Type, desc: 'عناوين، نصوص، شعارات' },
  { id: 'image', label: 'صور', icon: ImageIcon, desc: 'اقتراح صور وتصاميم' },
  { id: 'layout', label: 'تخطيطات', icon: Layout, desc: 'تخطيط شاشة كامل' },
  { id: 'video', label: 'فيديو', icon: Video, desc: 'سيناريو ومحتوى مرئي' },
]

const tones: { id: Tone; label: string; color: string }[] = [
  { id: 'professional', label: 'احترافي', color: 'royal' },
  { id: 'casual', label: 'ودود', color: 'emerald' },
  { id: 'promotional', label: 'ترويجي', color: 'gold' },
  { id: 'urgent', label: 'عاجل', color: 'red' },
  { id: 'elegant', label: 'أنيق', color: 'blue' },
]

const generatedSamples = {
  text: [
    { title: 'عرض الصباح', content: '☕ ابدأ يومك بطاقة لا تُقاوم!\nخصم 30% على جميع المشروبات\nمن 7ص حتى 11ص فقط', tags: ['صباح', 'كافيه', 'خصم'] },
    { title: 'ترحيب الاستقبال', content: 'أهلاً وسهلاً بكم\nفي تجربة استثنائية\nنتمنى لكم وقتاً ممتعاً', tags: ['ترحيب', 'استقبال'] },
    { title: 'عرض نهاية الأسبوع', content: '🎉 عروض الجمعة!\nاشتري 1 واحصل على 2 مجاناً\nلفترة محدودة فقط', tags: ['عروض', 'جمعة', 'مجاني'] },
  ],
  image: [
    { title: 'خلفية كافيه دافئة', content: 'تصميم بألوان بنية دافئة مع إضاءة ناعمة، مناسب للكافيهات والمطاعم', tags: ['خلفية', 'كافيه', 'دافئ'] },
    { title: 'واجهة شركة احترافية', content: 'تصميم بألوان زرقاء وبيضاء، شعار في المنتصف، مناسب للاستقبال', tags: ['شركة', 'احترافي', 'استقبال'] },
    { title: 'إعلان منتج', content: 'خلفية بيضاء مع منتج بارز وألوان نابضة بالحياة، مناسب للعروض', tags: ['إعلان', 'منتج', 'عروض'] },
  ],
  layout: [
    { title: 'تخطيط مقسم 3 أجزاء', content: 'شعار أعلى | محتوى رئيسي وسط | شريط معلومات أسفل — مثالي للشاشات الكبيرة', tags: ['مقسم', '3 أجزاء', 'كبير'] },
    { title: 'تخطيط عمودي', content: 'محتوى رئيسي | قائمة جانبية — مثالي للشاشات العمودية والأجهزة المحمولة', tags: ['عمودي', 'جانبي'] },
    { title: 'تخطيط شبكي', content: 'شبكة 2×2 من المحتوى — مثالي لعرض منتجات متعددة', tags: ['شبكي', '2×2', 'منتجات'] },
  ],
  video: [
    { title: 'سيناريو ترحيب 30 ثانية', content: '0-5ث: شعار يظهر تدريجياً\n5-15ث: رسالة ترحيب\n15-25ث: عرض الخدمات\n25-30ث: شعار + معلومات تواصل', tags: ['ترحيب', '30ث'] },
    { title: 'إعلان منتج 15 ثانية', content: '0-3ث: المشكلة\n3-8ث: الحل (المنتج)\n8-13ث: المزايا\n13-15ث: دعوة للعمل', tags: ['إعلان', '15ث', 'منتج'] },
    { title: 'جولة افتراضية 60 ثانية', content: '0-10ث: مقدمة\n10-40ث: جولة في المكان\n40-55ث: آراء العملاء\n55-60ث: خاتمة + تواصل', tags: ['جولة', '60ث', 'افتراضي'] },
  ],
}

const history = [
  { id: 1, type: 'text', prompt: 'عرض صباحي للكافيه', time: 'منذ 10 دقائق' },
  { id: 2, type: 'layout', prompt: 'تخطيط شاشة استقبال', time: 'منذ ساعة' },
  { id: 3, type: 'image', prompt: 'خلفية احترافية للشركة', time: 'منذ 3 ساعات' },
]

const colorMap: Record<string, string> = {
  royal: 'bg-royal-50 text-royal-600 border-royal-200',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  gold: 'bg-gold-50 text-gold-600 border-gold-200',
  red: 'bg-red-50 text-red-600 border-red-200',
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
}

export default function AIContentGenerator() {
  const { toast } = useToast()
  const [selectedType, setSelectedType] = useState<ContentType>('text')
  const [selectedTone, setSelectedTone] = useState<Tone>('professional')
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [results, setResults] = useState<typeof generatedSamples[ContentType] | null>(null)
  const [feedback, setFeedback] = useState<Record<number, 'up' | 'down' | null>>({})

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast('اكتب وصف للمحتوى المطلوب', 'warning')
      return
    }
    setGenerating(true)
    setResults(null)
    setTimeout(() => {
      setResults(generatedSamples[selectedType])
      setGenerating(false)
      toast('تم توليد 3 اقتراحات', 'success')
    }, 1800)
  }

  const handleCopy = (content: string) => {
    navigator.clipboard?.writeText(content)
    toast('تم نسخ المحتوى', 'success')
  }

  const handleFeedback = (id: number, type: 'up' | 'down') => {
    setFeedback((prev) => ({ ...prev, [id]: type }))
    toast(type === 'up' ? 'شكراً لتقييمك الإيجابي' : 'سنعمل على تحسين الاقتراحات', 'info')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">مولد المحتوى بالذكاء الاصطناعي</h1>
            <p className="text-slate-400 text-sm mt-1">ولّد محتوى احترافي لشاشاتك في ثوانٍ</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-royal-50 text-royal-600 text-xs font-semibold">
          <Zap className="w-4 h-4" />
          <span>AI Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Configuration Panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* Content Type */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">نوع المحتوى</h3>
            <div className="grid grid-cols-2 gap-2">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center',
                    selectedType === type.id
                      ? 'bg-royal-50 border-royal-500'
                      : 'bg-slate-50 border-slate-100 hover:border-royal-200'
                  )}
                >
                  <type.icon className={cn('w-5 h-5', selectedType === type.id ? 'text-royal-600' : 'text-slate-400')} />
                  <div>
                    <p className={cn('text-xs font-bold', selectedType === type.id ? 'text-royal-700' : 'text-slate-600')}>{type.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{type.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">النبرة والأسلوب</h3>
            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all',
                    selectedTone === tone.id
                      ? colorMap[tone.color]
                      : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200'
                  )}
                >
                  {tone.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">وصف المحتوى المطلوب</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="مثال: محتوى ترحيبي لشاشة استقبال شركة تقنية، يعرض الخدمات الأساسية مع شعار"
              className="input-field resize-none text-sm"
            />
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>كلما كان الوصف مفصلاً، كانت النتائج أفضل</span>
            </div>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className={cn(
                'btn-primary w-full mt-4 flex items-center justify-center gap-2',
                generating && 'opacity-60 cursor-not-allowed'
              )}
            >
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  توليد المحتوى
                </>
              )}
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">أفكار سريعة</h3>
            <div className="space-y-2">
              {[
                'عرض صباحي للكافيه',
                'ترحيب استقبال شركة',
                'إعلان خصم نهاية الأسبوع',
                'معلومات تواصل وموقع',
                'قائمة طعام اليوم',
              ].map((idea, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(idea)}
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 hover:bg-royal-50 text-slate-600 hover:text-royal-700 transition-all text-sm text-right group"
                >
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-royal-400 flex-shrink-0" />
                  <span>{idea}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2 space-y-4">
          {generating ? (
            <div className="glass-card p-12">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 border-3 border-royal-100 rounded-full" />
                  <div className="absolute inset-0 border-3 border-transparent border-t-royal-600 rounded-full animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-royal-400 animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-slate-700">الذكاء الاصطناعي يبدع المحتوى...</p>
                <p className="text-xs text-slate-400 mt-1">تحليل الوصف، اختيار الأسلوب، توليد الاقتراحات</p>
              </div>
              <div className="space-y-3 mt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 rounded-2xl bg-slate-100 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
              </div>
            </div>
          ) : results ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">الاقتراحات المولّدة ({results.length})</h2>
                <button
                  onClick={handleGenerate}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  إعادة التوليد
                </button>
              </div>
              {results.map((sample, i) => (
                <div key={i} className="glass-card p-5 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-royal-gradient flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{sample.title}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleFeedback(i, 'up')}
                        className={cn(
                          'p-2 rounded-lg transition-all',
                          feedback[i] === 'up' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-300 hover:text-emerald-600 hover:bg-emerald-50'
                        )}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(i, 'down')}
                        className={cn(
                          'p-2 rounded-lg transition-all',
                          feedback[i] === 'down' ? 'bg-red-50 text-red-500' : 'text-slate-300 hover:text-red-500 hover:bg-red-50'
                        )}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-3">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{sample.content}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {sample.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-royal-50 text-royal-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(sample.content)}
                      className="btn-ghost flex items-center gap-2 text-xs flex-1 justify-center"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      نسخ
                    </button>
                    <button
                      onClick={() => toast('تم تطبيق المحتوى على الشاشة', 'success')}
                      className="btn-primary flex items-center gap-2 text-xs flex-1 justify-center"
                    >
                      <Check className="w-3.5 h-3.5" />
                      تطبيق على شاشة
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Empty State */}
              <div className="glass-card p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-royal-50 flex items-center justify-center mx-auto mb-4">
                  <Wand2 className="w-8 h-8 text-royal-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">ابدأ بتوليد المحتوى</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  اختر نوع المحتوى، حدد الأسلوب، اكتب وصف ما تريد، واضغط "توليد المحتوى"
                </p>
              </div>

              {/* History */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <History className="w-5 h-5 text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-900">آخر العمليات</h3>
                </div>
                <div className="space-y-2">
                  {history.map((item) => {
                    const type = contentTypes.find((t) => t.id === item.type)
                    return (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all">
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                          {type && <type.icon className="w-4 h-4 text-slate-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 truncate">{item.prompt}</p>
                          <p className="text-xs text-slate-400">{item.time}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedType(item.type as ContentType)
                            setPrompt(item.prompt)
                          }}
                          className="text-xs text-royal-600 font-semibold hover:text-royal-700"
                        >
                          إعادة
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* AI Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'محتوى مولّد', value: '127', icon: Sparkles, color: 'royal' },
                  { label: 'معدل القبول', value: '89%', icon: ThumbsUp, color: 'emerald' },
                  { label: 'وقت التوليد', value: '2.1ث', icon: Zap, color: 'gold' },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-4">
                    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mb-2', `bg-${stat.color}-50 text-${stat.color}-600`)}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
