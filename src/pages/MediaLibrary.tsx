import { useState } from 'react'
import { Upload, Trash2, Image as ImageIcon, Video, Film, Search, Grid3x3, List, HardDrive, X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const gradientColors = [
  'from-royal-400 to-royal-600',
  'from-gold-400 to-gold-600',
  'from-emerald-400 to-emerald-600',
  'from-blue-400 to-blue-600',
  'from-pink-400 to-pink-600',
  'from-orange-400 to-orange-600',
  'from-teal-400 to-teal-600',
  'from-indigo-400 to-indigo-600',
]

const imagesData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `image-${i + 1}.jpg`,
  size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
  gradient: gradientColors[i % gradientColors.length],
  date: `2025-07-${String(10 + i).padStart(2, '0')}`,
}))

const videosData = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `video-${i + 1}.mp4`,
  size: `${(Math.random() * 20 + 5).toFixed(1)} MB`,
  duration: `${Math.floor(Math.random() * 60 + 10)}s`,
  gradient: gradientColors[(i + 3) % gradientColors.length],
  date: `2025-07-${String(5 + i).padStart(2, '0')}`,
}))

export default function MediaLibrary() {
  const [tab, setTab] = useState<'images' | 'videos'>('images')
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selected, setSelected] = useState<number[]>([])
  const [dragOver, setDragOver] = useState(false)

  const data = tab === 'images' ? imagesData : videosData
  const filtered = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  const totalSize = [...imagesData, ...videosData].reduce((sum, item) => {
    const num = parseFloat(item.size)
    return sum + (isNaN(num) ? 0 : num)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">مكتبة الميديا</h1>
          <p className="text-slate-400 text-sm mt-1">إدارة الصور والفيديوهات</p>
        </div>
        <div className="glass-card p-3 flex items-center gap-3 min-w-[200px]">
          <div className="w-10 h-10 rounded-lg bg-royal-50 flex items-center justify-center flex-shrink-0">
            <HardDrive className="w-5 h-5 text-royal-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500">المساحة المستخدمة</span>
              <span className="text-slate-900 font-semibold">{totalSize.toFixed(0)} MB</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-royal-gradient" style={{ width: '35%' }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">من 500 MB متاح</p>
          </div>
        </div>
      </div>

      {/* Tabs + Search + View Toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => { setTab('images'); setSelected([]) }}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
              tab === 'images' ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            )}
          >
            <ImageIcon className="w-4 h-4" />
            صور ({imagesData.length})
          </button>
          <button
            onClick={() => { setTab('videos'); setSelected([]) }}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
              tab === 'videos' ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
            )}
          >
            <Video className="w-4 h-4" />
            فيديوهات ({videosData.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث..."
              className="pr-10 pl-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-royal-500/50 transition-all w-48"
            />
          </div>
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setView('grid')}
              className={cn('p-1.5 rounded-lg transition-all', view === 'grid' ? 'bg-white text-royal-600 shadow-sm' : 'text-slate-400 hover:text-slate-700')}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn('p-1.5 rounded-lg transition-all', view === 'list' ? 'bg-white text-royal-600 shadow-sm' : 'text-slate-400 hover:text-slate-700')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Selection Bar */}
      {selected.length > 0 && (
        <div className="glass-card p-3 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-royal-600" />
            <span className="text-sm text-slate-900 font-medium">{selected.length} محدد</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-100 transition-all">
              تحميل
            </button>
            <button
              onClick={() => setSelected([])}
              className="text-xs text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg bg-red-50 transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              حذف المحدد
            </button>
            <button
              onClick={() => setSelected([])}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false) }}
        className={cn(
          'glass-card p-6 border-2 border-dashed transition-all cursor-pointer text-center',
          dragOver ? 'border-royal-500 bg-royal-50/50' : 'border-slate-200 hover:border-royal-400'
        )}
      >
        <div className="w-14 h-14 rounded-2xl bg-royal-50 flex items-center justify-center mx-auto mb-3">
          <Upload className="w-7 h-7 text-royal-600" />
        </div>
        <p className="text-slate-900 font-semibold mb-1">اسحب الملفات هنا للرفع</p>
        <p className="text-sm text-slate-400 mb-3">أو اضغط لاختيار ملفات من جهازك</p>
        <button className="btn-primary text-sm">رفع الملفات</button>
        <p className="text-xs text-slate-400 mt-3">
          {tab === 'images' ? 'JPG, PNG, GIF, WEBP — بحد أقصى 10MB' : 'MP4, WEBM, AVI — بحد أقصى 100MB'}
        </p>
      </div>

      {/* Grid View */}
      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleSelect(item.id)}
              className={cn(
                'glass-card-hover group relative overflow-hidden cursor-pointer transition-all',
                selected.includes(item.id) && 'ring-2 ring-royal-500'
              )}
            >
              <div className={cn('aspect-square bg-gradient-to-br flex items-center justify-center relative', (item as any).gradient)}>
                {tab === 'images' ? (
                  <ImageIcon className="w-10 h-10 text-white/40" />
                ) : (
                  <>
                    <Film className="w-10 h-10 text-white/40" />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/60 text-xs text-white">
                      {(item as any).duration}
                    </span>
                  </>
                )}
                {selected.includes(item.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-royal-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-900 font-medium truncate">{item.name}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-slate-400">{item.size}</p>
                  <p className="text-[10px] text-slate-300">{(item as any).date}</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation() }}
                className="absolute top-2 left-2 p-2 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="glass-card p-2 space-y-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleSelect(item.id)}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all',
                selected.includes(item.id) ? 'bg-royal-50' : 'hover:bg-slate-50'
              )}
            >
              <div className={cn('w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0', (item as any).gradient)}>
                {tab === 'images' ? <ImageIcon className="w-5 h-5 text-white/60" /> : <Film className="w-5 h-5 text-white/60" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 font-medium truncate">{item.name}</p>
                <p className="text-xs text-slate-400">{item.size} · {(item as any).date}</p>
              </div>
              {tab === 'videos' && (
                <span className="text-xs text-slate-400 hidden sm:block">{(item as any).duration}</span>
              )}
              <button
                onClick={(e) => { e.stopPropagation() }}
                className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">لا توجد نتائج مطابقة</p>
        </div>
      )}
    </div>
  )
}
