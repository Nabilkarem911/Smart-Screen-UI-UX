import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowRight, Save, Eye, Plus, Trash2, Clock, Calendar,
  Globe, Monitor, Smartphone, Image, Video, Youtube,
  FileText, Code, GalleryHorizontalEnd, LayoutGrid,
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
  days: boolean[]
  timeStart: string
  timeEnd: string
}

export default function ScreenEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'content' | 'website'>('content')
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [pages, setPages] = useState<PageItem[]>([
    { id: 1, title: 'صفحة ترحيب', duration: 10, template: 1, days: [true, true, true, true, true, true, true], timeStart: '00:00', timeEnd: '23:59' },
    { id: 2, title: 'إعلان العروض', duration: 15, template: 5, days: [false, false, false, false, false, true, true], timeStart: '18:00', timeEnd: '23:59' },
  ])

  const addPage = () => {
    setPages([...pages, {
      id: Date.now(),
      title: `صفحة ${pages.length + 1}`,
      duration: 5,
      template: selectedTemplate,
      days: [true, true, true, true, true, true, true],
      timeStart: '00:00',
      timeEnd: '23:59',
    }])
  }

  const removePage = (pageId: number) => {
    setPages(pages.filter((p) => p.id !== pageId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/screens')}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">محرر محتوى الشاشة</h1>
            <p className="text-slate-400 text-sm mt-1">شاشة رقم #{id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>معاينة</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
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
            'px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px',
            activeTab === 'content'
              ? 'text-royal-600 border-royal-500'
              : 'text-slate-400 border-transparent hover:text-slate-900'
          )}
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            شاشات
          </span>
        </button>
        <button
          onClick={() => setActiveTab('website')}
          className={cn(
            'px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px',
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
        <>
          {/* Screen Settings */}
          <div className="glass-card p-4">
            <h2 className="text-base font-bold text-slate-900 mb-3">إعدادات الشاشة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-slate-500 mb-2">اسم المجموعة</label>
                <input type="text" defaultValue="قناة 1" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">المجموعة</label>
                <select className="input-field">
                  <option>wow bshmel</option>
                  <option>Login Screens</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">اتجاه الشاشة</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-royal-50 border border-royal-500 text-royal-700 text-sm">
                    <Monitor className="w-4 h-4" /> عرضي
                  </button>
                  <button className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-sm">
                    <Smartphone className="w-4 h-4" /> طولي
                  </button>
                </div>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-royal-600" />
              <span className="text-sm text-slate-600">تشغيل الشاشة</span>
            </label>
          </div>

          {/* Template Selection */}
          <div className="glass-card p-4">
            <h2 className="text-base font-bold text-slate-900 mb-1">اختيار التصميم</h2>
            <p className="text-xs text-slate-400 mb-3">22 قالب متاح</p>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-11 lg:grid-cols-11 gap-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={cn(
                    'aspect-video rounded-lg border-2 flex flex-col items-center justify-end transition-all relative group overflow-hidden p-0.5',
                    selectedTemplate === tpl.id
                      ? 'border-royal-500 bg-royal-50 shadow-glow-purple'
                      : 'border-slate-200 bg-slate-50 hover:border-royal-300'
                  )}
                >
                  <div className="w-full flex-1">
                    <TemplateThumbnail layout={tpl.layout} orientation={tpl.orientation} />
                  </div>
                  <span className={cn(
                    'text-[9px] font-bold leading-none mt-0.5',
                    selectedTemplate === tpl.id ? 'text-royal-600' : 'text-slate-400'
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

          {/* Pages List */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-900">الصفحات ({pages.length})</h2>
              <button onClick={addPage} className="btn-gold flex items-center gap-1.5 text-xs px-3 py-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة صفحة</span>
              </button>
            </div>

            <div className="space-y-3">
              {pages.map((page, idx) => (
                <div key={page.id} className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  {/* Page Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-royal-100 text-royal-700 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={page.title}
                        onChange={(e) => setPages(pages.map(p => p.id === page.id ? { ...p, title: e.target.value } : p))}
                        className="bg-transparent text-slate-900 font-semibold text-sm border-b border-transparent hover:border-slate-300 focus:border-royal-500 focus:outline-none transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg">
                        <Clock className="w-3 h-3" />
                        <input
                          type="number"
                          value={page.duration}
                          onChange={(e) => setPages(pages.map(p => p.id === page.id ? { ...p, duration: +e.target.value } : p))}
                          className="w-10 bg-transparent text-center text-slate-900"
                        />
                        <span>ث</span>
                      </div>
                      <button
                        onClick={() => removePage(page.id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Content Type + Template row */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {contentTypes.map((ct) => (
                      <button
                        key={ct.type}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-royal-300 transition-all text-xs"
                      >
                        <ct.icon className="w-3.5 h-3.5" />
                        <span>{ct.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Scheduling */}
                  <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-200">
                    {/* Days */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <div className="flex gap-1">
                        {days.map((day, i) => (
                          <button
                            key={i}
                            onClick={() => setPages(pages.map(p => {
                              if (p.id === page.id) {
                                const newDays = [...p.days]
                                newDays[i] = !newDays[i]
                                return { ...p, days: newDays }
                              }
                              return p
                            }))}
                            className={cn(
                              'w-7 h-7 rounded-md text-xs font-bold transition-all',
                              page.days[i]
                                ? 'bg-royal-gradient text-white'
                                : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                            )}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Range */}
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="time"
                        value={page.timeStart}
                        onChange={(e) => setPages(pages.map(p => p.id === page.id ? { ...p, timeStart: e.target.value } : p))}
                        className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-royal-500"
                      />
                      <span className="text-slate-400 text-xs">→</span>
                      <input
                        type="time"
                        value={page.timeEnd}
                        onChange={(e) => setPages(pages.map(p => p.id === page.id ? { ...p, timeEnd: e.target.value } : p))}
                        className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-royal-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 mb-4">لا توجد صفحات بعد</p>
                <button onClick={addPage} className="btn-primary inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة أول صفحة
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Website Tab */
        <div className="glass-card p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-royal-50 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-royal-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">وضع الموقع الخارجي</h2>
            <p className="text-sm text-slate-400 mb-6">بدلاً من عرض الصفحات، يمكنك عرض موقع إلكتروني مباشر على الشاشة</p>
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
    </div>
  )
}
