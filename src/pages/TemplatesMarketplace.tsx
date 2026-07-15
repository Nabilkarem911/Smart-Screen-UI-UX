import { useState } from 'react'
import {
  Store, Search, Star, Download, Eye, Heart, Plus, Filter,
  Monitor, Tablet, Smartphone, Check, Sparkles, TrendingUp,
  Clock, Palette, Layout, Image as ImageIcon, Video, Type,
  ChevronRight, X, Zap, Award,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface Template {
  id: number
  name: string
  category: string
  rating: number
  downloads: number
  premium: boolean
  thumbnail: string
  orientation: 'landscape' | 'portrait' | 'square'
  tags: string[]
  description: string
  author: string
  liked: boolean
}

const categories = [
  { id: 'all', label: 'الكل', icon: Store },
  { id: 'restaurant', label: 'مطاعم', icon: Layout },
  { id: 'cafe', label: 'كافيهات', icon: Palette },
  { id: 'corporate', label: 'شركات', icon: Monitor },
  { id: 'retail', label: 'تجزئة', icon: TrendingUp },
  { id: 'education', label: 'تعليم', icon: Type },
  { id: 'healthcare', label: 'صحة', icon: Heart },
  { id: 'events', label: 'فعاليات', icon: Sparkles },
]

const templates: Template[] = [
  { id: 1, name: 'قائمة طعام أنيقة', category: 'restaurant', rating: 4.9, downloads: 1240, premium: false, thumbnail: '', orientation: 'portrait', tags: ['طعام', 'قائمة', 'أنيق'], description: 'قالب قائمة طعام بتصميم أنيق مع أقسام قابلة للتخصيص', author: 'SmartScreen', liked: false },
  { id: 2, name: 'عرض الكافيه الصباحي', category: 'cafe', rating: 4.8, downloads: 980, premium: true, thumbnail: '', orientation: 'landscape', tags: ['قهوة', 'صباح', 'ترويج'], description: 'قالب عرض صباحي للكافيهات مع صور وأسعار', author: 'DesignPro', liked: true },
  { id: 3, name: 'واجهة شركة احترافية', category: 'corporate', rating: 4.7, downloads: 2100, premium: false, thumbnail: '', orientation: 'landscape', tags: ['شركة', 'استقبال', 'احترافي'], description: 'واجهة استقبال شركة بشعار ومعلومات خدمات', author: 'SmartScreen', liked: false },
  { id: 4, name: 'عرض منتج تجزئة', category: 'retail', rating: 4.6, downloads: 1560, premium: true, thumbnail: '', orientation: 'square', tags: ['منتج', 'ترويج', 'خصم'], description: 'قالب عرض منتج بسعر وخصم وألوان نابضة', author: 'RetailDesign', liked: false },
  { id: 5, name: 'جدول دروس', category: 'education', rating: 4.5, downloads: 720, premium: false, thumbnail: '', orientation: 'portrait', tags: ['تعليم', 'جدول', 'دروس'], description: 'جدول دروس أسبوعي بتصميم واضح ومنظم', author: 'EduTech', liked: false },
  { id: 6, name: 'مواعيد العيادة', category: 'healthcare', rating: 4.8, downloads: 650, premium: true, thumbnail: '', orientation: 'landscape', tags: ['صحة', 'مواعيد', 'عيادة'], description: 'عرض مواعيد العيادة مع معلومات تواصل', author: 'HealthScreen', liked: true },
  { id: 7, name: 'دعوة فعالية', category: 'events', rating: 4.9, downloads: 1820, premium: false, thumbnail: '', orientation: 'landscape', tags: ['فعالية', 'دعوة', 'حدث'], description: 'قالب دعوة فعالية بتاريخ وموقع وتفاصيل', author: 'EventPro', liked: false },
  { id: 8, name: 'عروض نهاية الأسبوع', category: 'retail', rating: 4.7, downloads: 1340, premium: false, thumbnail: '', orientation: 'landscape', tags: ['عروض', 'خصم', 'جمعة'], description: 'قالب عروض نهاية الأسبوع بألوان جذابة', author: 'SmartScreen', liked: false },
  { id: 9, name: 'معلومات الشركة', category: 'corporate', rating: 4.4, downloads: 890, premium: true, thumbnail: '', orientation: 'portrait', tags: ['شركة', 'معلومات', 'عن'], description: 'عرض معلومات الشركة ورؤيتها ورسالتها', author: 'DesignPro', liked: false },
  { id: 10, name: 'عرض حلويات', category: 'restaurant', rating: 4.8, downloads: 1120, premium: false, thumbnail: '', orientation: 'square', tags: ['حلويات', 'طعام', 'عرض'], description: 'قالب عرض حلويات بصور شهية وألوان دافئة', author: 'SweetDesign', liked: true },
  { id: 11, name: 'أخبار وتنبيهات', category: 'corporate', rating: 4.3, downloads: 540, premium: false, thumbnail: '', orientation: 'landscape', tags: ['أخبار', 'تنبيهات', 'إعلان'], description: 'قالب عرض الأخبار والتنبيهات بشريط متحرك', author: 'SmartScreen', liked: false },
  { id: 12, name: 'حجز موعد', category: 'healthcare', rating: 4.6, downloads: 480, premium: true, thumbnail: '', orientation: 'portrait', tags: ['حجز', 'موعد', 'صحة'], description: 'قالب حجز موعد بـ QR code ومعلومات تواصل', author: 'HealthScreen', liked: false },
]

const orientationIcons = { landscape: Monitor, portrait: Tablet, square: Smartphone }

export default function TemplatesMarketplace() {
  const { toast } = useToast()
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [likedOnly, setLikedOnly] = useState(false)
  const [selected, setSelected] = useState<Template | null>(null)
  const [tplList, setTplList] = useState(templates)

  const filtered = tplList.filter((t) => {
    if (category !== 'all' && t.category !== category) return false
    if (likedOnly && !t.liked) return false
    if (search && !t.name.includes(search) && !t.tags.some((tag) => tag.includes(search))) return false
    return true
  })

  const toggleLike = (id: number) => {
    setTplList((prev) => prev.map((t) => t.id === id ? { ...t, liked: !t.liked } : t))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">متجر القوالب</h1>
            <p className="text-slate-400 text-sm mt-1">قوالب جاهزة قابلة للتطبيق بضغطة واحدة</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold-50 text-gold-600 text-xs font-semibold">
          <Award className="w-4 h-4" />
          <span>{tplList.length} قالب متاح</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'قوالب مجانية', value: tplList.filter((t) => !t.premium).length, icon: Download, color: 'emerald' },
          { label: 'قوالب مميزة', value: tplList.filter((t) => t.premium).length, icon: Sparkles, color: 'gold' },
          { label: 'إجمالي التحميلات', value: tplList.reduce((s, t) => s + t.downloads, 0).toLocaleString(), icon: TrendingUp, color: 'royal' },
          { label: 'المفضلة', value: tplList.filter((t) => t.liked).length, icon: Heart, color: 'red' },
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

      {/* Search + Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن قالب..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-royal-500/50 transition-all"
          />
        </div>
        <button
          onClick={() => setLikedOnly(!likedOnly)}
          className={cn(
            'flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
            likedOnly ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
          )}
        >
          <Heart className={cn('w-4 h-4', likedOnly && 'fill-current')} />
          المفضلة
        </button>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-slate-400" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              category === cat.id ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            )}
          >
            <cat.icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((tpl) => {
          const OrientIcon = orientationIcons[tpl.orientation]
          return (
            <div key={tpl.id} className="glass-card overflow-hidden hover:shadow-lg transition-all group">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
                  <Layout className="w-8 h-8 text-white" />
                </div>
                {/* Badges */}
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {tpl.premium && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-gold-gradient text-white">
                      <Sparkles className="w-3 h-3" />
                      مميز
                    </span>
                  )}
                </div>
                <div className="absolute top-2 left-2">
                  <button
                    onClick={() => toggleLike(tpl.id)}
                    className={cn(
                      'p-2 rounded-lg transition-all',
                      tpl.liked ? 'bg-red-50 text-red-500' : 'bg-white/80 text-slate-400 hover:text-red-500'
                    )}
                  >
                    <Heart className={cn('w-4 h-4', tpl.liked && 'fill-current')} />
                  </button>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setSelected(tpl)}
                    className="p-3 rounded-xl bg-white text-slate-900 hover:scale-110 transition-all"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{tpl.name}</h3>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 text-gold-400 fill-current" />
                    <span className="text-xs font-bold text-slate-600">{tpl.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2">{tpl.description}</p>
                <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><OrientIcon className="w-3 h-3" /> {tpl.orientation === 'landscape' ? 'أفقي' : tpl.orientation === 'portrait' ? 'عمودي' : 'مربع'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {tpl.downloads.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => toast(`تم تطبيق قالب "${tpl.name}"`, 'success')}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  تطبيق القالب
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Store className="w-10 h-10 text-slate-200 mx-auto mb-2" />
          <p className="text-sm text-slate-400">لا توجد قوالب مطابقة</p>
        </div>
      )}

      {/* Preview Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="glass-card p-6 w-full max-w-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selected.name}</h3>
                <p className="text-xs text-slate-400">بواسطة {selected.author}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Preview */}
            <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
                <Layout className="w-10 h-10 text-white" />
              </div>
            </div>
            {/* Details */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'التقييم', value: `${selected.rating}★`, icon: Star },
                { label: 'التحميلات', value: selected.downloads.toLocaleString(), icon: Download },
                { label: 'النوع', value: selected.premium ? 'مميز' : 'مجاني', icon: selected.premium ? Sparkles : Check },
              ].map((d, i) => (
                <div key={i} className="rounded-xl bg-slate-50 p-3 text-center">
                  <d.icon className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-slate-900">{d.value}</p>
                  <p className="text-[10px] text-slate-400">{d.label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {selected.tags.map((tag, i) => (
                <span key={i} className="text-xs font-semibold px-2 py-1 rounded-md bg-royal-50 text-royal-600">#{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setSelected(null); toast(`تم تطبيق قالب "${selected.name}"`, 'success') }}
                className="btn-primary flex items-center gap-2 text-sm flex-1 justify-center"
              >
                <Download className="w-4 h-4" />
                تطبيق القالب
              </button>
              <button
                onClick={() => toggleLike(selected.id)}
                className={cn('btn-ghost flex items-center gap-2 text-sm', selected.liked && 'text-red-500')}
              >
                <Heart className={cn('w-4 h-4', selected.liked && 'fill-current')} />
                {selected.liked ? 'في المفضلة' : 'إضافة للمفضلة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
