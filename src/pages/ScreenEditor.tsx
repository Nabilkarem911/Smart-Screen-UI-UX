import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowRight, Save, Eye, Plus, Trash2, Clock, Calendar,
  Globe, Monitor, Smartphone, Image, Video, Youtube,
  FileText, Code, GalleryHorizontalEnd, LayoutGrid,
  X, Sparkles, Wand2, ChevronLeft, ChevronRight,
  Play, Pause, Maximize2, GripVertical,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const days = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']
const contentTypes = [
  { type: 'image', label: 'صورة', icon: Image },
  { type: 'video', label: 'فيديو', icon: Video },
  { type: 'youtube', label: 'يوتيوب', icon: Youtube },
  { type: 'url', label: 'رابط', icon: Globe },
  { type: 'text', label: 'نص', icon: FileText },
  { type: 'code', label: 'كود', icon: Code },
  { type: 'gallery', label: 'معرض صور', icon: GalleryHorizontalEnd },
]

const templates = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  orientation: i < 16 ? 'landscape' : 'portrait',
  layout: (i % 16) + 1,
}))

const templateLayouts: Record<number, { areas: { style: string; className: string }[] }> = {
  1: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }] },
  2: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }, { style: 'flex-1', className: 'bg-gold-200' }] },
  3: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }, { style: 'flex-1', className: 'bg-gold-200' }] },
  4: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }, { style: 'h-1/4', className: 'bg-gold-200' }] },
  5: { areas: [{ style: 'h-1/4', className: 'bg-gold-200' }, { style: 'flex-1', className: 'bg-royal-200' }] },
  6: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }, { style: 'flex-1', className: 'bg-gold-200' }, { style: 'flex-1', className: 'bg-emerald-200' }] },
  7: { areas: [{ style: 'w-1/3', className: 'bg-gold-200' }, { style: 'flex-1', className: 'bg-royal-200' }] },
  8: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }, { style: 'w-1/3', className: 'bg-gold-200' }] },
  9: { areas: [{ style: 'h-1/4', className: 'bg-gold-200' }, { style: 'flex-1', className: 'bg-royal-200' }, { style: 'h-1/4', className: 'bg-emerald-200' }] },
  10: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }, { style: 'flex-1', className: 'bg-gold-200' }] },
  11: { areas: [{ style: 'w-1/4', className: 'bg-gold-200' }, { style: 'flex-1', className: 'bg-royal-200' }] },
  12: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }, { style: 'w-1/4', className: 'bg-gold-200' }] },
  13: { areas: [{ style: 'h-1/3', className: 'bg-gold-200' }, { style: 'flex-1', className: 'bg-royal-200' }, { style: 'flex-1', className: 'bg-emerald-200' }] },
  14: { areas: [{ style: 'w-1/5', className: 'bg-gold-200' }, { style: 'flex-1', className: 'bg-royal-200' }, { style: 'w-1/5', className: 'bg-emerald-200' }] },
  15: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }] },
  16: { areas: [{ style: 'flex-1', className: 'bg-royal-200' }] },
}

function TemplateThumbnail({ layout, orientation }: { layout: number; orientation: string }) {
  const tpl = templateLayouts[layout] || templateLayouts[1]
  const isHorizontal = (n: number) => [2, 3, 4, 5, 6, 9, 10, 13].includes(n)
  const isVertical = (n: number) => [7, 8, 11, 12, 14].includes(n)
  const isGrid = (n: number) => n === 10

  if (isGrid(layout)) {
    return (
      <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5">
        <div className="bg-royal-200 rounded-sm" />
        <div className="bg-gold-200 rounded-sm" />
        <div className="bg-gold-200 rounded-sm" />
        <div className="bg-royal-200 rounded-sm" />
      </div>
    )
  }

  if (isHorizontal(layout)) {
    return (
      <div className="w-full h-full flex flex-col gap-0.5 p-0.5">
        {tpl.areas.map((area, i) => (
          <div key={i} className={cn(area.className, 'rounded-sm', area.style)} />
        ))}
      </div>
    )
  }

  if (isVertical(layout)) {
    return (
      <div className="w-full h-full flex flex-row gap-0.5 p-0.5">
        {tpl.areas.map((area, i) => (
          <div key={i} className={cn(area.className, 'rounded-sm', area.style)} />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full h-full p-0.5">
      <div className="w-full h-full bg-royal-200 rounded-sm" />
    </div>
  )
}

interface PageItem {
  id: number
  title: string
  duration: number
  template: number
  contentType: string
  days: boolean[]
  timeStart: string
  timeEnd: string
  content: string
}

export default function ScreenEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'content' | 'website'>('content')
  const [showTemplates, setShowTemplates] = useState(false)
  const [activePageId, setActivePageId] = useState(1)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [previewIdx, setPreviewIdx] = useState(0)
  const [previewPlaying, setPreviewPlaying] = useState(true)
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null)
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null)
  const [pages, setPages] = useState<PageItem[]>([
    { id: 1, title: 'صفحة ترحيب', duration: 10, template: 1, contentType: 'image', days: [true, true, true, true, true, true, true], timeStart: '00:00', timeEnd: '23:59', content: '' },
    { id: 2, title: 'إعلان العروض', duration: 15, template: 5, contentType: 'video', days: [false, false, false, false, false, true, true], timeStart: '18:00', timeEnd: '23:59', content: '' },
  ])

  const activePage = pages.find((p) => p.id === activePageId) || pages[0]

  const updatePage = (pageId: number, updates: Partial<PageItem>) => {
    setPages(pages.map((p) => (p.id === pageId ? { ...p, ...updates } : p)))
  }

  const addPage = () => {
    const newId = Date.now()
    setPages([...pages, {
      id: newId,
      title: `صفحة ${pages.length + 1}`,
      duration: 10,
      template: 1,
      contentType: 'image',
      days: [true, true, true, true, true, true, true],
      timeStart: '00:00',
      timeEnd: '23:59',
      content: '',
    }])
    setActivePageId(newId)
  }

  const removePage = (pageId: number) => {
    const remaining = pages.filter((p) => p.id !== pageId)
    setPages(remaining)
    if (activePageId === pageId && remaining.length > 0) {
      setActivePageId(remaining[0].id)
    }
  }

  const handleAiGenerate = () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    setAiResult('')
    setTimeout(() => {
      setAiLoading(false)
      const samples = [
        '☕ ابدأ يومك بفنجان قهوتنا المختصة\n\nعرض خاص: اشترِ واحد واحصل على الثاني مجاناً\n\nصالح حتى نهاية الأسبوع',
        '🛍️ تخفيضات نهاية الموسم\n\nخصم يصل إلى 50% على جميع المنتجات\n\nزورونا اليوم!',
        '🎬 لا تفوت أحدث الأفلام\n\nالعرض الحصري على شاشتنا\n\nكل يوم من 6 مساءً',
      ]
      const result = samples[Math.floor(Math.random() * samples.length)]
      setAiResult(result)
      updatePage(activePage.id, { content: result, contentType: 'text' })
    }, 2000)
  }

  const nextPreviewPage = useCallback(() => {
    setPreviewIdx((prev) => (prev + 1) % pages.length)
  }, [pages.length])

  const prevPreviewPage = () => {
    setPreviewIdx((prev) => (prev - 1 + pages.length) % pages.length)
  }

  useEffect(() => {
    if (!showPreview || !previewPlaying || pages.length === 0) return
    const current = pages[previewIdx]
    const timer = setTimeout(() => {
      nextPreviewPage()
    }, (current?.duration || 5) * 1000)
    return () => clearTimeout(timer)
  }, [showPreview, previewPlaying, previewIdx, pages, nextPreviewPage])

  const handleDragStart = (idx: number) => setDraggedIdx(idx)
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    setDragOverIdx(idx)
  }
  const handleDrop = (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) return
    const newPages = [...pages]
    const [moved] = newPages.splice(draggedIdx, 1)
    newPages.splice(idx, 0, moved)
    setPages(newPages)
    setDraggedIdx(null)
    setDragOverIdx(null)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/screens')}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">محرر الشاشة #{id}</h1>
            <p className="text-slate-400 text-xs mt-0.5">{pages.length} صفحات</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowPreview(true); setPreviewIdx(0); setPreviewPlaying(true) }}
            className="btn-ghost flex items-center gap-2 text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>معاينة</span>
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Save className="w-4 h-4" />
            <span>حفظ</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('content')}
          className={cn(
            'px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px',
            activeTab === 'content'
              ? 'text-royal-600 border-royal-500'
              : 'text-slate-400 border-transparent hover:text-slate-900'
          )}
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            محتوى
          </span>
        </button>
        <button
          onClick={() => setActiveTab('website')}
          className={cn(
            'px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px',
            activeTab === 'website'
              ? 'text-royal-600 border-royal-500'
              : 'text-slate-400 border-transparent hover:text-slate-900'
          )}
        >
          <span className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            موقع
          </span>
        </button>
      </div>

      {activeTab === 'content' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Screen Preview + Pages List */}
          <div className="lg:col-span-7 space-y-4">
            {/* Big Preview */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTemplates(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-royal-50 text-royal-700 text-sm font-medium hover:bg-royal-100 transition-all"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>القالب #{activePage.template}</span>
                  </button>
                  <span className="text-xs text-slate-400">
                    {activePage.contentType === 'image' ? 'صورة' :
                     activePage.contentType === 'video' ? 'فيديو' :
                     activePage.contentType === 'youtube' ? 'يوتيوب' :
                     activePage.contentType === 'text' ? 'نص' :
                     activePage.contentType === 'url' ? 'رابط' :
                     activePage.contentType === 'code' ? 'كود' : 'معرض صور'}
                  </span>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activePage.duration}ث
                </span>
              </div>
              <div className="aspect-video rounded-xl bg-slate-900 border border-slate-200 overflow-hidden p-3 relative">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <TemplateThumbnail layout={activePage.template} orientation="landscape" />
                </div>
                {activePage.content && (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <p className="text-white text-center text-lg font-medium whitespace-pre-line drop-shadow-lg">
                      {activePage.content}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Pages List */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-900">الصفحات ({pages.length})</h2>
                <button onClick={addPage} className="btn-gold flex items-center gap-1.5 text-xs px-3 py-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>صفحة جديدة</span>
                </button>
              </div>
              <div className="space-y-2">
                {pages.map((page, idx) => (
                  <button
                    key={page.id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={() => handleDrop(idx)}
                    onDragEnd={() => { setDraggedIdx(null); setDragOverIdx(null) }}
                    onClick={() => setActivePageId(page.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-right cursor-grab active:cursor-grabbing',
                      activePageId === page.id
                        ? 'border-royal-500 bg-royal-50'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300',
                      dragOverIdx === idx && draggedIdx !== null && 'border-royal-400 border-dashed bg-royal-50/50',
                      draggedIdx === idx && 'opacity-40'
                    )}
                  >
                    <span className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0',
                      activePageId === page.id ? 'bg-royal-gradient text-white' : 'bg-slate-200 text-slate-500'
                    )}>
                      {idx + 1}
                    </span>
                    <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0" />
                    <div className="w-14 aspect-video rounded-md bg-slate-100 border border-slate-200 overflow-hidden p-0.5 flex-shrink-0">
                      <TemplateThumbnail layout={page.template} orientation="landscape" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 text-sm font-medium truncate">{page.title}</p>
                      <p className="text-xs text-slate-400">{page.duration}ث · {page.timeStart} → {page.timeEnd}</p>
                    </div>
                    <span
                      onClick={(e) => { e.stopPropagation(); removePage(page.id) }}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
              {pages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm mb-3">لا توجد صفحات</p>
                  <button onClick={addPage} className="btn-primary inline-flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    إضافة أول صفحة
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Page Details */}
          <div className="lg:col-span-5 space-y-4">
            {/* Page Settings */}
            <div className="glass-card p-4">
              <h2 className="text-sm font-bold text-slate-900 mb-3">إعدادات الصفحة</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">عنوان الصفحة</label>
                  <input
                    type="text"
                    value={activePage.title}
                    onChange={(e) => updatePage(activePage.id, { title: e.target.value })}
                    className="input-field text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">مدة العرض (ثانية)</label>
                    <input
                      type="number"
                      value={activePage.duration}
                      onChange={(e) => updatePage(activePage.id, { duration: +e.target.value })}
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">نوع المحتوى</label>
                    <select
                      value={activePage.contentType}
                      onChange={(e) => updatePage(activePage.id, { contentType: e.target.value })}
                      className="input-field text-sm"
                    >
                      {contentTypes.map((ct) => (
                        <option key={ct.type} value={ct.type}>{ct.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Content Generator */}
            <div className="glass-card p-4 border-2 border-royal-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-royal-gradient flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">المساعد الذكي</h2>
                  <p className="text-xs text-slate-400">توليد محتوى بالذكاء الاصطناعي</p>
                </div>
              </div>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="اكتب وصف المحتوى المطلوب... مثلاً: إعلان عن عرض قهوة خاص"
                rows={2}
                className="input-field text-sm resize-none mb-2"
              />
              <button
                onClick={handleAiGenerate}
                disabled={aiLoading || !aiPrompt.trim()}
                className="w-full btn-primary flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {aiLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>جاري التوليد...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>توليد المحتوى</span>
                  </>
                )}
              </button>
              {aiResult && (
                <div className="mt-3 p-3 rounded-xl bg-royal-50 border border-royal-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-royal-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      النتيجة
                    </span>
                    <button
                      onClick={() => setAiResult('')}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-line">{aiResult}</p>
                </div>
              )}
            </div>

            {/* Content Input */}
            <div className="glass-card p-4">
              <h2 className="text-sm font-bold text-slate-900 mb-3">محتوى الصفحة</h2>
              {activePage.contentType === 'text' || activePage.contentType === 'code' ? (
                <textarea
                  value={activePage.content}
                  onChange={(e) => updatePage(activePage.id, { content: e.target.value })}
                  placeholder={activePage.contentType === 'code' ? 'أدخل كود HTML...' : 'أدخل النص...'}
                  rows={4}
                  className="input-field text-sm resize-none"
                />
              ) : activePage.contentType === 'url' || activePage.contentType === 'youtube' ? (
                <input
                  type="url"
                  value={activePage.content}
                  onChange={(e) => updatePage(activePage.id, { content: e.target.value })}
                  placeholder="https://..."
                  dir="ltr"
                  className="input-field text-sm text-left"
                />
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                  <Image className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">اضغط لرفع ملف من مكتبة الميديا</p>
                  <button className="mt-2 text-xs text-royal-600 font-medium hover:text-royal-700">اختيار ملف</button>
                </div>
              )}
            </div>

            {/* Scheduling */}
            <div className="glass-card p-4">
              <h2 className="text-sm font-bold text-slate-900 mb-3">الجدولة</h2>
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    أيام العرض
                  </label>
                  <div className="flex gap-1.5">
                    {days.map((day, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const newDays = [...activePage.days]
                          newDays[i] = !newDays[i]
                          updatePage(activePage.id, { days: newDays })
                        }}
                        className={cn(
                          'w-8 h-8 rounded-lg text-xs font-bold transition-all',
                          activePage.days[i]
                            ? 'bg-royal-gradient text-white'
                            : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                        )}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">من</label>
                    <input
                      type="time"
                      value={activePage.timeStart}
                      onChange={(e) => updatePage(activePage.id, { timeStart: e.target.value })}
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">إلى</label>
                    <input
                      type="time"
                      value={activePage.timeEnd}
                      onChange={(e) => updatePage(activePage.id, { timeEnd: e.target.value })}
                      className="input-field text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-royal-50 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-royal-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">وضع الموقع الخارجي</h2>
            <p className="text-sm text-slate-400 mb-6">اعرض موقع إلكتروني مباشر على الشاشة</p>
            <div className="text-right">
              <label className="block text-sm text-slate-500 mb-2">رابط الموقع</label>
              <input
                type="url"
                placeholder="https://example.com"
                dir="ltr"
                className="input-field text-left"
              />
            </div>
            <button className="btn-primary mt-6">حفظ الرابط</button>
          </div>
        </div>
      )}

      {/* Template Picker Modal */}
      {showTemplates && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowTemplates(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">اختيار القالب</h2>
                <p className="text-xs text-slate-400 mt-0.5">22 قالب متاح — اضغط للاختيار</p>
              </div>
              <button
                onClick={() => setShowTemplates(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => {
                      updatePage(activePage.id, { template: tpl.id })
                      setShowTemplates(false)
                    }}
                    className={cn(
                      'aspect-video rounded-xl border-2 flex flex-col items-center justify-end transition-all relative group overflow-hidden p-1',
                      activePage.template === tpl.id
                        ? 'border-royal-500 bg-royal-50 shadow-glow-purple'
                        : 'border-slate-200 bg-slate-50 hover:border-royal-300'
                    )}
                  >
                    <div className="w-full flex-1">
                      <TemplateThumbnail layout={tpl.layout} orientation={tpl.orientation} />
                    </div>
                    <span className={cn(
                      'text-[10px] font-bold leading-none mt-1 mb-0.5',
                      activePage.template === tpl.id ? 'text-royal-600' : 'text-slate-400'
                    )}>
                      {tpl.id}
                    </span>
                    <span className={cn(
                      'absolute top-1 right-1 w-1.5 h-1.5 rounded-full',
                      tpl.orientation === 'landscape' ? 'bg-blue-500' : 'bg-gold-500'
                    )} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slideshow Preview Modal */}
      {showPreview && pages.length > 0 && (
        <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col animate-fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm font-medium">معاينة الشاشة #{id}</span>
              <span className="text-xs text-white/50">·</span>
              <span className="text-xs text-white/70">{pages[previewIdx]?.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewPlaying(!previewPlaying)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              >
                {previewPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 flex items-center justify-center p-8 relative">
            {/* Nav buttons */}
            <button
              onClick={prevPreviewPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={nextPreviewPage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Screen */}
            <div
              key={previewIdx}
              className="w-full max-w-4xl aspect-video rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden p-6 relative animate-fade-in"
            >
              <div className="w-full h-full rounded-xl overflow-hidden">
                <TemplateThumbnail layout={pages[previewIdx]?.template || 1} orientation="landscape" />
              </div>
              {pages[previewIdx]?.content && (
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <p className="text-white text-center text-2xl font-medium whitespace-pre-line drop-shadow-2xl">
                    {pages[previewIdx].content}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="p-4 bg-slate-900/80 backdrop-blur-sm space-y-3">
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPreviewIdx(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === previewIdx ? 'w-8 bg-royal-500' : 'w-1.5 bg-white/30 hover:bg-white/50'
                  )}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-white/70 text-xs">
              <span>صفحة {previewIdx + 1} من {pages.length}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {pages[previewIdx]?.duration}ث
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
