import { useState } from 'react'
import {
  Layout, Type, Image as ImageIcon, Video, Clock, Calendar,
  QrCode, CloudSun, Rss, Plus, Trash2, Copy, Move, Save,
  Eye, Smartphone, Monitor, Tablet, Undo, Redo, Grid,
  Layers, Palette, ChevronRight, X, Zap, AlignCenter,
  AlignRight, AlignLeft, Bold, Italic,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

type ElementType = 'text' | 'image' | 'video' | 'clock' | 'calendar' | 'qr' | 'weather' | 'rss'
type DeviceType = 'monitor' | 'tablet' | 'mobile'

interface ScreenElement {
  id: number
  type: ElementType
  x: number
  y: number
  w: number
  h: number
  content: string
  selected: boolean
}

const elementTypes: { type: ElementType; label: string; icon: any; color: string }[] = [
  { type: 'text', label: 'نص', icon: Type, color: 'royal' },
  { type: 'image', label: 'صورة', icon: ImageIcon, color: 'emerald' },
  { type: 'video', label: 'فيديو', icon: Video, color: 'blue' },
  { type: 'clock', label: 'ساعة', icon: Clock, color: 'gold' },
  { type: 'calendar', label: 'تقويم', icon: Calendar, color: 'purple' },
  { type: 'qr', label: 'QR Code', icon: QrCode, color: 'slate' },
  { type: 'weather', label: 'طقس', icon: CloudSun, color: 'cyan' },
  { type: 'rss', label: 'RSS', icon: Rss, color: 'orange' },
]

const initialElements: ScreenElement[] = [
  { id: 1, type: 'text', x: 10, y: 10, w: 80, h: 15, content: 'أهلاً بكم', selected: false },
  { id: 2, type: 'image', x: 10, y: 30, w: 50, h: 40, content: 'صورة ترحيبية', selected: false },
  { id: 3, type: 'clock', x: 65, y: 30, w: 25, h: 20, content: 'الساعة', selected: false },
  { id: 4, type: 'text', x: 10, y: 75, w: 80, h: 10, content: 'للاستفسار: 0500000000', selected: false },
]

const deviceSizes = {
  monitor: { w: '100%', aspect: '16/9' },
  tablet: { w: '70%', aspect: '4/3' },
  mobile: { w: '40%', aspect: '9/16' },
}

export default function VisualScreenBuilder() {
  const { toast } = useToast()
  const [elements, setElements] = useState<ScreenElement[]>(initialElements)
  const [device, setDevice] = useState<DeviceType>('monitor')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [history, setHistory] = useState<ScreenElement[][]>([initialElements])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [showGrid, setShowGrid] = useState(true)

  const addElement = (type: ElementType) => {
    const newEl: ScreenElement = {
      id: Date.now(),
      type,
      x: 20, y: 20, w: 30, h: 20,
      content: type === 'text' ? 'نص جديد' : type === 'image' ? 'صورة' : type === 'video' ? 'فيديو' : type === 'clock' ? 'الساعة' : type === 'calendar' ? 'التقويم' : type === 'qr' ? 'QR' : type === 'weather' ? 'الطقس' : 'RSS',
      selected: false,
    }
    const updated = [...elements, newEl]
    setElements(updated)
    setSelectedId(newEl.id)
    pushHistory(updated)
    toast('تم إضافة عنصر', 'success')
  }

  const pushHistory = (els: ScreenElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(els)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setElements(history[historyIndex - 1])
      toast('تراجع', 'info')
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setElements(history[historyIndex + 1])
      toast('إعادة', 'info')
    }
  }

  const deleteElement = (id: number) => {
    const updated = elements.filter((e) => e.id !== id)
    setElements(updated)
    setSelectedId(null)
    pushHistory(updated)
    toast('تم حذف العنصر', 'info')
  }

  const duplicateElement = (id: number) => {
    const el = elements.find((e) => e.id === id)
    if (el) {
      const newEl = { ...el, id: Date.now(), x: el.x + 5, y: el.y + 5 }
      const updated = [...elements, newEl]
      setElements(updated)
      pushHistory(updated)
      toast('تم نسخ العنصر', 'success')
    }
  }

  const updateElement = (id: number, updates: Partial<ScreenElement>) => {
    const updated = elements.map((e) => e.id === id ? { ...e, ...updates } : e)
    setElements(updated)
  }

  const selected = elements.find((e) => e.id === selectedId)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">منشئ الشاشات المرئي</h1>
            <p className="text-slate-400 text-sm mt-1">صمم شاشتك بالسحب والإفلات</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={historyIndex === 0} className={cn('btn-ghost p-2.5', historyIndex === 0 && 'opacity-40 cursor-not-allowed')}>
            <Undo className="w-4 h-4" />
          </button>
          <button onClick={redo} disabled={historyIndex === history.length - 1} className={cn('btn-ghost p-2.5', historyIndex === history.length - 1 && 'opacity-40 cursor-not-allowed')}>
            <Redo className="w-4 h-4" />
          </button>
          <button onClick={() => setShowGrid(!showGrid)} className={cn('btn-ghost p-2.5', showGrid && 'text-royal-600')}>
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={() => toast('تم حفظ الشاشة', 'success')} className="btn-primary flex items-center gap-2 text-sm">
            <Save className="w-4 h-4" />
            حفظ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left: Elements Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-slate-400" />
              إضافة عنصر
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {elementTypes.map((el) => (
                <button
                  key={el.type}
                  onClick={() => addElement(el.type)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-50 hover:bg-royal-50 transition-all group"
                >
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', `bg-${el.color}-50 text-${el.color}-600 group-hover:scale-110 transition-transform`)}>
                    <el.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-600">{el.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Layers */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-400" />
              الطبقات ({elements.length})
            </h3>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {elements.map((el, i) => {
                const type = elementTypes.find((t) => t.type === el.type)!
                return (
                  <button
                    key={el.id}
                    onClick={() => setSelectedId(el.id)}
                    className={cn(
                      'w-full flex items-center gap-2 p-2 rounded-lg text-xs transition-all',
                      selectedId === el.id ? 'bg-royal-50 text-royal-700' : 'text-slate-500 hover:bg-slate-50'
                    )}
                  >
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-100 text-[10px] font-bold">{i + 1}</span>
                    <type.icon className="w-3.5 h-3.5" />
                    <span className="truncate flex-1 text-right">{el.content}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Center: Canvas */}
        <div className="lg:col-span-2">
          <div className="glass-card p-4">
            {/* Device Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {[
                  { id: 'monitor' as DeviceType, icon: Monitor, label: 'شاشة' },
                  { id: 'tablet' as DeviceType, icon: Tablet, label: 'تابلت' },
                  { id: 'mobile' as DeviceType, icon: Smartphone, label: 'موبايل' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDevice(d.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all',
                      device === d.id ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    <d.icon className="w-3.5 h-3.5" />
                    {d.label}
                  </button>
                ))}
              </div>
              <button className="btn-ghost flex items-center gap-2 text-xs">
                <Eye className="w-3.5 h-3.5" />
                معاينة
              </button>
            </div>

            {/* Canvas */}
            <div className="flex justify-center">
              <div
                className={cn('relative bg-slate-900 rounded-xl overflow-hidden border-2', selectedId ? 'border-royal-300' : 'border-slate-200')}
                style={{ width: deviceSizes[device].w, aspectRatio: deviceSizes[device].aspect }}
              >
                {/* Grid */}
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                      {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border border-white/5" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Elements */}
                {elements.map((el) => {
                  const type = elementTypes.find((t) => t.type === el.type)!
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={cn(
                        'absolute rounded-lg flex items-center justify-center cursor-move transition-all',
                        selectedId === el.id ? 'ring-2 ring-royal-400 ring-offset-2 ring-offset-slate-900' : 'hover:ring-1 hover:ring-white/20',
                        el.type === 'text' ? 'bg-white/10' : el.type === 'image' ? 'bg-emerald-500/20' : el.type === 'video' ? 'bg-blue-500/20' : el.type === 'clock' ? 'bg-gold-500/20' : el.type === 'calendar' ? 'bg-purple-500/20' : el.type === 'qr' ? 'bg-slate-500/20' : el.type === 'weather' ? 'bg-cyan-500/20' : 'bg-orange-500/20'
                      )}
                      style={{ left: `${el.x}%`, top: `${el.y}%`, width: `${el.w}%`, height: `${el.h}%` }}
                    >
                      <div className="flex flex-col items-center gap-1 text-white/80">
                        <type.icon className="w-4 h-4" />
                        {el.type === 'text' && <span className="text-xs font-semibold truncate px-1">{el.content}</span>}
                      </div>
                      {selectedId === el.id && (
                        <div className="absolute -top-8 left-0 flex items-center gap-0.5 bg-slate-800 rounded-lg p-1 shadow-lg">
                          <button onClick={(e) => { e.stopPropagation(); duplicateElement(el.id) }} className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10">
                            <Copy className="w-3 h-3" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); deleteElement(el.id) }} className="p-1 rounded text-white/70 hover:text-red-400 hover:bg-red-500/20">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}

                {elements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Layout className="w-12 h-12 text-white/10 mx-auto mb-2" />
                      <p className="text-sm text-white/30">ابدأ بإضافة عناصر من اللوحة الجانبية</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Properties Panel */}
        <div className="lg:col-span-1 space-y-4">
          {selected ? (
            <>
              <div className="glass-card p-4">
                <h3 className="text-sm font-bold text-slate-900 mb-3">خصائص العنصر</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1.5 block">المحتوى</label>
                    <input
                      value={selected.content}
                      onChange={(e) => updateElement(selected.id, { content: e.target.value })}
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 mb-1.5 block">X (%)</label>
                      <input type="number" value={selected.x} onChange={(e) => updateElement(selected.id, { x: Number(e.target.value) })} className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Y (%)</label>
                      <input type="number" value={selected.y} onChange={(e) => updateElement(selected.id, { y: Number(e.target.value) })} className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 mb-1.5 block">عرض (%)</label>
                      <input type="number" value={selected.w} onChange={(e) => updateElement(selected.id, { w: Number(e.target.value) })} className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 mb-1.5 block">ارتفاع (%)</label>
                      <input type="number" value={selected.h} onChange={(e) => updateElement(selected.id, { h: Number(e.target.value) })} className="input-field text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {selected.type === 'text' && (
                <div className="glass-card p-4">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-slate-400" />
                    تنسيق النص
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <button className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"><Bold className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"><Italic className="w-4 h-4" /></button>
                    <div className="w-px h-6 bg-slate-200 mx-1" />
                    <button className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"><AlignRight className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"><AlignCenter className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"><AlignLeft className="w-4 h-4" /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">الحجم</span>
                    <input type="range" min="12" max="72" defaultValue="24" className="flex-1 accent-royal-500" />
                    <span className="text-xs font-bold text-slate-600">24px</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button onClick={() => duplicateElement(selected.id)} className="btn-ghost flex items-center gap-2 text-xs flex-1 justify-center">
                  <Copy className="w-3.5 h-3.5" />
                  نسخ
                </button>
                <button onClick={() => deleteElement(selected.id)} className="btn-ghost flex items-center gap-2 text-xs flex-1 justify-center text-red-500 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" />
                  حذف
                </button>
              </div>
            </>
          ) : (
            <div className="glass-card p-8 text-center">
              <Move className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">اختر عنصراً لتعديل خصائصه</p>
            </div>
          )}

          {/* Quick Info */}
          <div className="glass-card p-4 bg-gradient-to-l from-royal-50/50 to-transparent">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-royal-gradient flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 mb-1">نصيحة</p>
                <p className="text-xs text-slate-600 leading-relaxed">اضغط على أي عنصر في الشاشة لتحديده وتعديل خصائصه وموضعه</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
