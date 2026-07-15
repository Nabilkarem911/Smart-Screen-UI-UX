import { useState } from 'react'
import {
  Tags, Sparkles, Image as ImageIcon, Video, FileText,
  Check, RefreshCw, X, Filter, ChevronRight, Zap,
  TrendingUp, Clock, CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface MediaItem {
  id: number
  name: string
  type: 'image' | 'video' | 'text'
  size: string
  status: 'pending' | 'processing' | 'tagged' | 'error'
  tags: string[]
  confidence: number
  date: string
}

const initialMedia: MediaItem[] = [
  { id: 1, name: 'cafe-morning.jpg', type: 'image', size: '2.4 MB', status: 'tagged', tags: ['قهوة', 'صباح', 'كافيه', 'دافئ'], confidence: 94, date: 'اليوم' },
  { id: 2, name: 'promo-summer.mp4', type: 'video', size: '12.8 MB', status: 'tagged', tags: ['صيف', 'ترويج', 'خصم', 'ألوان نابضة'], confidence: 89, date: 'اليوم' },
  { id: 3, name: 'welcome-text.txt', type: 'text', size: '1.2 KB', status: 'tagged', tags: ['ترحيب', 'استقبال', 'نص'], confidence: 96, date: 'اليوم' },
  { id: 4, name: 'restaurant-menu.jpg', type: 'image', size: '3.1 MB', status: 'processing', tags: [], confidence: 0, date: 'اليوم' },
  { id: 5, name: 'product-launch.mp4', type: 'video', size: '18.5 MB', status: 'processing', tags: [], confidence: 0, date: 'اليوم' },
  { id: 6, name: 'office-reception.jpg', type: 'image', size: '4.2 MB', status: 'pending', tags: [], confidence: 0, date: 'أمس' },
  { id: 7, name: 'sale-banner.jpg', type: 'image', size: '1.8 MB', status: 'pending', tags: [], confidence: 0, date: 'أمس' },
  { id: 8, name: 'event-promo.mp4', type: 'video', size: '22.3 MB', status: 'error', tags: [], confidence: 0, date: 'أمس' },
  { id: 9, name: 'company-logo.png', type: 'image', size: '512 KB', status: 'tagged', tags: ['شعار', 'شركة', 'هوية'], confidence: 98, date: 'أمس' },
  { id: 10, name: 'weather-widget.txt', type: 'text', size: '0.8 KB', status: 'tagged', tags: ['طقس', 'ودجت', 'معلومات'], confidence: 91, date: 'أمس' },
]

const statusConfig = {
  pending: { label: 'بانتظار', bg: 'bg-slate-100', text: 'text-slate-500', icon: Clock },
  processing: { label: 'جاري التحليل', bg: 'bg-royal-50', text: 'text-royal-600', icon: Loader2 },
  tagged: { label: 'تم التصنيف', bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle2 },
  error: { label: 'خطأ', bg: 'bg-red-50', text: 'text-red-500', icon: AlertCircle },
}

const typeIcons = {
  image: ImageIcon,
  video: Video,
  text: FileText,
}

const allTags = ['قهوة', 'صباح', 'كافيه', 'دافئ', 'صيف', 'ترويج', 'خصم', 'ترحيب', 'استقبال', 'شعار', 'شركة', 'طقس', 'مطعم', 'منتج', 'ألوان']

export default function AutoTagging() {
  const { toast } = useToast()
  const [media, setMedia] = useState<MediaItem[]>(initialMedia)
  const [filter, setFilter] = useState<string>('all')
  const [scanning, setScanning] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleScanAll = () => {
    setScanning(true)
    const pending = media.filter((m) => m.status === 'pending' || m.status === 'error')
    pending.forEach((item, i) => {
      setTimeout(() => {
        setMedia((prev) => prev.map((m) => {
          if (m.id === item.id) {
            const mockTags = item.type === 'image'
              ? ['مطعم', 'طعام', 'ألوان', 'دافئ']
              : item.type === 'video'
              ? ['منتج', 'إطلاق', 'ترويج', 'ألوان نابضة']
              : ['نص', 'معلومات']
            return { ...m, status: 'tagged', tags: mockTags, confidence: 80 + Math.floor(Math.random() * 18) }
          }
          return m
        }))
        if (i === pending.length - 1) {
          setScanning(false)
          toast('تم تصنيف جميع الوسائط', 'success')
        }
      }, (i + 1) * 1200)
    })
    if (pending.length === 0) {
      setScanning(false)
      toast('لا توجد وسائط بحاجة للتصنيف', 'info')
    }
  }

  const handleRetag = (id: number) => {
    setMedia((prev) => prev.map((m) => m.id === id ? { ...m, status: 'processing' } : m))
    setTimeout(() => {
      setMedia((prev) => prev.map((m) => {
        if (m.id === id) {
          return { ...m, status: 'tagged', confidence: 85 + Math.floor(Math.random() * 13) }
        }
        return m
      }))
      toast('تم إعادة التصنيف', 'success')
    }, 1500)
  }

  const toggleTagFilter = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  const filtered = media.filter((m) => {
    if (filter !== 'all' && m.status !== filter) return false
    if (selectedTags.length > 0 && !selectedTags.some((t) => m.tags.includes(t))) return false
    return true
  })

  const stats = {
    total: media.length,
    tagged: media.filter((m) => m.status === 'tagged').length,
    pending: media.filter((m) => m.status === 'pending').length,
    processing: media.filter((m) => m.status === 'processing').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Tags className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">التصنيف التلقائي للوسائط</h1>
            <p className="text-slate-400 text-sm mt-1">تصنيف ذكي للصور والفيديوهات والنصوص بالـ AI</p>
          </div>
        </div>
        <button
          onClick={handleScanAll}
          disabled={scanning}
          className={cn('btn-primary flex items-center gap-2 text-sm', scanning && 'opacity-60 cursor-not-allowed')}
        >
          {scanning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              جاري التصنيف...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              تصنيف الكل
            </>
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الوسائط', value: stats.total, icon: Tags, color: 'royal' },
          { label: 'تم التصنيف', value: stats.tagged, icon: CheckCircle2, color: 'emerald' },
          { label: 'بانتظار', value: stats.pending, icon: Clock, color: 'gold' },
          { label: 'جاري المعالجة', value: stats.processing, icon: Loader2, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-3">
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', `bg-${stat.color}-50 text-${stat.color}-600`)}>
                <stat.icon className={cn('w-5 h-5', stat.color === 'blue' && 'animate-spin')} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Info Banner */}
      <div className="glass-card p-4 bg-gradient-to-l from-royal-50/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-royal-gradient flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">محرك التصنيف الذكي</p>
            <p className="text-xs text-slate-500">يحلل المحتوى البصري والنصي ويولّد وسوم تلقائية بدقة تصل إلى 96%</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>دقة 94%</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Status Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400" />
          {['all', 'tagged', 'pending', 'processing', 'error'].map((f) => (
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

        {/* Tag Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Tags className="w-4 h-4 text-slate-400" />
          {allTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTagFilter(tag)}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-medium transition-all',
                selectedTags.includes(tag)
                  ? 'bg-royal-50 text-royal-600 border border-royal-200'
                  : 'bg-slate-50 text-slate-400 border border-transparent hover:bg-slate-100'
              )}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const status = statusConfig[item.status]
          const StatusIcon = status.icon
          const TypeIcon = typeIcons[item.type]
          return (
            <div key={item.id} className="glass-card p-4 hover:shadow-md transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <TypeIcon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate" dir="ltr">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.size} • {item.date}</p>
                  </div>
                </div>
                <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md flex-shrink-0', status.bg, status.text)}>
                  <StatusIcon className={cn('w-3 h-3', item.status === 'processing' && 'animate-spin')} />
                  {status.label}
                </span>
              </div>

              {/* Tags */}
              {item.status === 'tagged' ? (
                <>
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-semibold px-2 py-1 rounded-md bg-royal-50 text-royal-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden w-20">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">{item.confidence}%</span>
                    </div>
                    <button
                      onClick={() => handleRetag(item.id)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-royal-600 hover:bg-royal-50 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : item.status === 'processing' ? (
                <div className="space-y-2">
                  <div className="h-6 rounded-lg bg-slate-100 animate-pulse" />
                  <div className="h-6 rounded-lg bg-slate-100 animate-pulse w-3/4" />
                  <div className="flex items-center gap-2 text-xs text-royal-600 font-semibold pt-1">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>الذكاء الاصطناعي يحلل المحتوى...</span>
                  </div>
                </div>
              ) : item.status === 'error' ? (
                <div className="text-center py-3">
                  <AlertCircle className="w-6 h-6 text-red-300 mx-auto mb-1" />
                  <p className="text-xs text-slate-400 mb-2">فشل تحليل الملف</p>
                  <button
                    onClick={() => handleRetag(item.id)}
                    className="text-xs text-royal-600 font-semibold hover:text-royal-700"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              ) : (
                <div className="text-center py-3">
                  <Clock className="w-6 h-6 text-slate-200 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">بانتظار التصنيف</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Tags className="w-10 h-10 text-slate-200 mx-auto mb-2" />
          <p className="text-sm text-slate-400">لا توجد وسائط مطابقة</p>
        </div>
      )}
    </div>
  )
}
