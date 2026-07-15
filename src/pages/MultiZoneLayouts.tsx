import { useState } from 'react'
import {
  Layout, Monitor, Tablet, Smartphone, Plus, Check, Eye,
  Grid, Columns, Rows, Square, LayoutPanelTop, LayoutGrid,
  Smartphone as Mobile, Zap, Clock, Calendar, Type,
  Image as ImageIcon, Video, QrCode, CloudSun, Rss,
  TrendingUp, DollarSign, Newspaper, Save, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface LayoutPreset {
  id: number
  name: string
  zones: number
  orientation: 'landscape' | 'portrait'
  icon: any
  description: string
  popular?: boolean
}

const presets: LayoutPreset[] = [
  { id: 1, name: 'منطقة واحدة', zones: 1, orientation: 'landscape', icon: Square, description: 'محتوى واحد بملء الشاشة' },
  { id: 2, name: 'جانبي عمودي', zones: 2, orientation: 'portrait', icon: Columns, description: 'قائمة جانبية + محتوى رئيسي', popular: true },
  { id: 3, name: 'أفقي مقسم', zones: 2, orientation: 'landscape', icon: Rows, description: 'شريط علوي + محتوى أسفل' },
  { id: 4, name: 'ثلاث مناطق', zones: 3, orientation: 'landscape', icon: LayoutPanelTop, description: 'رأس + وسط + تذييل', popular: true },
  { id: 5, name: 'شبكي 2×2', zones: 4, orientation: 'landscape', icon: LayoutGrid, description: '4 مناطق متساوية', popular: true },
  { id: 6, name: 'شبكي 3×2', zones: 6, orientation: 'landscape', icon: Grid, description: '6 مناطق للمنتجات' },
  { id: 7, name: 'قائمة + شبكة', zones: 4, orientation: 'portrait', icon: LayoutPanelTop, description: 'قائمة جانبية + 3 مناطق' },
  { id: 8, name: 'رأس + شبكة', zones: 5, orientation: 'landscape', icon: LayoutGrid, description: 'رأس كبير + 4 مناطق' },
]

const zoneContentTypes = [
  { type: 'text', label: 'نص', icon: Type, color: 'royal' },
  { type: 'image', label: 'صورة', icon: ImageIcon, color: 'emerald' },
  { type: 'video', label: 'فيديو', icon: Video, color: 'blue' },
  { type: 'clock', label: 'ساعة', icon: Clock, color: 'gold' },
  { type: 'calendar', label: 'تقويم', icon: Calendar, color: 'purple' },
  { type: 'qr', label: 'QR', icon: QrCode, color: 'slate' },
  { type: 'weather', label: 'طقس', icon: CloudSun, color: 'cyan' },
  { type: 'news', label: 'أخبار', icon: Newspaper, color: 'orange' },
  { type: 'prices', label: 'أسعار', icon: DollarSign, color: 'emerald' },
  { type: 'stats', label: 'إحصائيات', icon: TrendingUp, color: 'royal' },
]

export default function MultiZoneLayouts() {
  const { toast } = useToast()
  const [selectedPreset, setSelectedPreset] = useState<LayoutPreset>(presets[2])
  const [device, setDevice] = useState<'monitor' | 'tablet' | 'mobile'>('monitor')
  const [zoneContents, setZoneContents] = useState<Record<number, string>>({
    0: 'text', 1: 'image', 2: 'text',
  })

  const renderZones = () => {
    const zones = []
    for (let i = 0; i < selectedPreset.zones; i++) {
      zones.push(i)
    }
    return zones
  }

  const getZoneStyle = (index: number) => {
    const total = selectedPreset.zones
    if (total === 1) return { gridColumn: '1 / -1', gridRow: '1 / -1' }
    if (total === 2 && selectedPreset.orientation === 'portrait') {
      return index === 0 ? { gridColumn: '1', gridRow: '1 / -1' } : { gridColumn: '2', gridRow: '1 / -1' }
    }
    if (total === 2 && selectedPreset.orientation === 'landscape') {
      return index === 0 ? { gridColumn: '1 / -1', gridRow: '1' } : { gridColumn: '1 / -1', gridRow: '2' }
    }
    if (total === 3) {
      if (index === 0) return { gridColumn: '1 / -1', gridRow: '1' }
      if (index === 1) return { gridColumn: '1', gridRow: '2' }
      return { gridColumn: '2', gridRow: '2' }
    }
    if (total === 4 && selectedPreset.name.includes('شبكي 2')) {
      return { gridColumn: `${(index % 2) + 1}`, gridRow: `${Math.floor(index / 2) + 1}` }
    }
    if (total === 4 && selectedPreset.name.includes('قائمة')) {
      if (index === 0) return { gridColumn: '1', gridRow: '1 / -1' }
      return { gridColumn: '2', gridRow: `${index}` }
    }
    if (total === 5) {
      if (index === 0) return { gridColumn: '1 / -1', gridRow: '1' }
      return { gridColumn: `${(index - 1) % 4 + 1}`, gridRow: '2' }
    }
    if (total === 6) {
      return { gridColumn: `${(index % 3) + 1}`, gridRow: `${Math.floor(index / 3) + 1}` }
    }
    return {}
  }

  const setZoneContent = (zoneIndex: number, type: string) => {
    setZoneContents((prev) => ({ ...prev, [zoneIndex]: type }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">تخطيطات متعددة المناطق</h1>
            <p className="text-slate-400 text-sm mt-1">قسّم شاشتك لمناطق متعددة بمحتوى مختلف</p>
          </div>
        </div>
        <button
          onClick={() => toast('تم حفظ التخطيط', 'success')}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Save className="w-4 h-4" />
          حفظ التخطيط
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Presets */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3">اختر تخطيطاً</h3>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  className={cn(
                    'relative p-3 rounded-xl border-2 transition-all text-center',
                    selectedPreset.id === preset.id ? 'border-royal-500 bg-royal-50' : 'border-slate-100 bg-slate-50 hover:border-royal-200'
                  )}
                >
                  {preset.popular && (
                    <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gold-gradient text-white">
                      شائع
                    </span>
                  )}
                  <preset.icon className={cn('w-6 h-6 mx-auto mb-1.5', selectedPreset.id === preset.id ? 'text-royal-600' : 'text-slate-400')} />
                  <p className={cn('text-xs font-semibold', selectedPreset.id === preset.id ? 'text-royal-700' : 'text-slate-600')}>{preset.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{preset.zones} مناطق</p>
                </button>
              ))}
            </div>
          </div>

          {/* Device Toggle */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3">نوع الجهاز</h3>
            <div className="flex items-center gap-2">
              {[
                { id: 'monitor' as const, icon: Monitor, label: 'شاشة' },
                { id: 'tablet' as const, icon: Tablet, label: 'تابلت' },
                { id: 'mobile' as const, icon: Smartphone, label: 'موبايل' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDevice(d.id)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all',
                    device === d.id ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500'
                  )}
                >
                  <d.icon className="w-3.5 h-3.5" />
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{selectedPreset.name}</h3>
                <p className="text-xs text-slate-400">{selectedPreset.description}</p>
              </div>
              <button className="btn-ghost flex items-center gap-2 text-xs">
                <Eye className="w-3.5 h-3.5" />
                معاينة كاملة
              </button>
            </div>

            {/* Layout Preview */}
            <div className="flex justify-center mb-4">
              <div
                className="relative w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-200"
                style={{ aspectRatio: device === 'mobile' ? '9/16' : device === 'tablet' ? '4/3' : '16/9' }}
              >
                <div
                  className="absolute inset-2 grid gap-2"
                  style={{
                    gridTemplateColumns: selectedPreset.zones > 1 && selectedPreset.orientation === 'portrait' ? '1fr 2fr' : `repeat(${selectedPreset.zones > 4 ? 3 : selectedPreset.zones > 2 ? 2 : 1}, 1fr)`,
                    gridTemplateRows: `repeat(${selectedPreset.zones > 4 ? 2 : selectedPreset.zones > 2 ? 2 : 1}, 1fr)`,
                  }}
                >
                  {renderZones().map((zoneIndex) => {
                    const contentType = zoneContents[zoneIndex] || 'text'
                    const type = zoneContentTypes.find((t) => t.type === contentType)!
                    return (
                      <div
                        key={zoneIndex}
                        className="relative rounded-lg flex flex-col items-center justify-center cursor-pointer group overflow-hidden"
                        style={getZoneStyle(zoneIndex)}
                        onClick={() => {
                          const next = zoneContentTypes[(zoneContentTypes.findIndex((t) => t.type === contentType) + 1) % zoneContentTypes.length]
                          setZoneContent(zoneIndex, next.type)
                        }}
                      >
                        <div className={cn('absolute inset-0 opacity-20', `bg-${type.color}-500`)} />
                        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-1', `bg-${type.color}-500/30 text-${type.color}-300`)}>
                          <type.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-white/70 font-medium">{type.label}</span>
                        <span className="text-[10px] text-white/30 mt-0.5">منطقة {zoneIndex + 1}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Zone Content Selector */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500">اضغط على أي منطقة لتغيير محتواها</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {zoneContentTypes.map((t) => (
                  <button
                    key={t.type}
                    onClick={() => toast(`نوع المحتوى: ${t.label}`, 'info')}
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
                      `bg-${t.color}-50 text-${t.color}-600 hover:scale-105`
                    )}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="glass-card p-4 bg-gradient-to-l from-royal-50/50 to-transparent">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-royal-gradient flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 mb-1">ميزة التخطيطات المتعددة</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  يمكنك عرض محتوى مختلف في كل منطقة: قائمة طعام في منطقة، ساعة في أخرى، وأخبار في ثالثة. مثالي للشاشات الكبيرة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
