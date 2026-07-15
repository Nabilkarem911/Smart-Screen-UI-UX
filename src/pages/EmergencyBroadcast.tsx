import { useState } from 'react'
import {
  AlertTriangle, Siren, Send, Clock, Check, X, Eye,
  Monitor, Tablet, AlertCircle, Zap, Bell, Activity,
  ChevronRight, Flag, History,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface BroadcastHistory {
  id: number
  message: string
  type: 'fire' | 'medical' | 'security' | 'weather' | 'technical' | 'custom'
  sentBy: string
  sentAt: string
  screens: number
  acknowledged: number
  duration: string
}

const alertTypes = [
  { id: 'fire', label: 'حريق', icon: Flame, color: 'red', priority: 'حرج', defaultMsg: 'تنبيه: حالة حريق - يرجى الإخلاء فوراً عبر المخارج المحددة' },
  { id: 'medical', label: 'طبي', icon: AlertCircle, color: 'red', priority: 'عاجل', defaultMsg: 'تنبيه: حالة طوارئ طبية - يرجى الاتصال بالطاقم الطبي' },
  { id: 'security', label: 'أمني', icon: Flag, color: 'gold', priority: 'عاجل', defaultMsg: 'تنبيه أمني: يرجى الالتزام بإجراءات الأمن والسلامة' },
  { id: 'weather', label: 'طقس', icon: CloudSun, color: 'blue', priority: 'متوسط', defaultMsg: 'تنبيه: تحذير من حالة طقس سيئة - يرجى الحذر' },
  { id: 'technical', label: 'فني', icon: Zap, color: 'royal', priority: 'متوسط', defaultMsg: 'تنبيه: عطل فني مؤقت - يرجى الانتظار' },
  { id: 'custom', label: 'مخصص', icon: Bell, color: 'slate', priority: 'حسب الحالة', defaultMsg: '' },
]

const screens = [
  { id: 1, name: 'شاشة الاستقبال', type: 'monitor', selected: true },
  { id: 2, name: 'شاشة الكافيه', type: 'monitor', selected: true },
  { id: 3, name: 'شاشة الخروج', type: 'monitor', selected: true },
  { id: 4, name: 'شاشة المطعم', type: 'monitor', selected: false },
  { id: 5, name: 'شاشة قاعة الاجتماعات', type: 'monitor', selected: true },
  { id: 6, name: 'تابلت الاستقبال', type: 'tablet', selected: false },
  { id: 7, name: 'شاشة المصعد', type: 'monitor', selected: true },
  { id: 8, name: 'شاشة البوابة', type: 'monitor', selected: false },
]

const history: BroadcastHistory[] = [
  { id: 1, message: 'تنبيه: إخلاء تجريبي شهري', type: 'security', sentBy: 'admin', sentAt: 'اليوم 10:30 ص', screens: 8, acknowledged: 8, duration: '5 دقائق' },
  { id: 2, message: 'عطل فني - شاشة الكافيه', type: 'technical', sentBy: 'أحمد', sentAt: 'أمس 2:15 م', screens: 1, acknowledged: 1, duration: '15 دقيقة' },
  { id: 3, message: 'تحذير من عاصفة ترابية', type: 'weather', sentBy: 'admin', sentAt: 'منذ 3 أيام', screens: 8, acknowledged: 6, duration: '30 دقيقة' },
  { id: 4, message: 'تنبيه: صيانة طارئة للنظام', type: 'technical', sentBy: 'سارة', sentAt: 'منذ أسبوع', screens: 5, acknowledged: 5, duration: '10 دقائق' },
]

function Flame({ className }: { className?: string }) {
  return <AlertTriangle className={className} />
}
function CloudSun({ className }: { className?: string }) {
  return <AlertCircle className={className} />
}

export default function EmergencyBroadcast() {
  const { toast } = useToast()
  const [selectedType, setSelectedType] = useState(alertTypes[0])
  const [message, setMessage] = useState(alertTypes[0].defaultMsg)
  const [duration, setDuration] = useState(5)
  const [screenList, setScreenList] = useState(screens)
  const [showConfirm, setShowConfirm] = useState(false)
  const [broadcasting, setBroadcasting] = useState(false)

  const selectedScreens = screenList.filter((s) => s.selected)

  const toggleScreen = (id: number) => {
    setScreenList((prev) => prev.map((s) => s.id === id ? { ...s, selected: !s.selected } : s))
  }

  const selectAll = () => setScreenList((prev) => prev.map((s) => ({ ...s, selected: true })))
  const deselectAll = () => setScreenList((prev) => prev.map((s) => ({ ...s, selected: false })))

  const selectType = (typeId: string) => {
    const type = alertTypes.find((t) => t.id === typeId)!
    setSelectedType(type)
    setMessage(type.defaultMsg)
  }

  const handleBroadcast = () => {
    if (selectedScreens.length === 0) {
      toast('اختر شاشة واحدة على الأقل', 'warning')
      return
    }
    if (!message.trim()) {
      toast('اكتب رسالة التنبيه', 'warning')
      return
    }
    setShowConfirm(true)
  }

  const confirmBroadcast = () => {
    setShowConfirm(false)
    setBroadcasting(true)
    setTimeout(() => {
      setBroadcasting(false)
      toast(`تم بث التنبيه على ${selectedScreens.length} شاشة`, 'success')
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-gradient flex items-center justify-center shadow-glow-red">
            <Siren className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">بث الطوارئ</h1>
            <p className="text-slate-400 text-sm mt-1">بث رسائل طوارئ فورية على الشاشات</p>
          </div>
        </div>
        {broadcasting && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 text-sm font-semibold animate-pulse">
            <Siren className="w-4 h-4" />
            جاري البث...
          </div>
        )}
      </div>

      {/* Alert Banner */}
      <div className="glass-card p-4 bg-gradient-to-l from-red-50/50 to-transparent border-red-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">نظام بث الطوارئ</p>
            <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
              استخدم هذا النظام فقط في حالات الطوارئ الحقيقية. سيتم بث الرسالة فوراً على جميع الشاشات المحددة مع تجاوز المحتوى الحالي.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Alert Configuration */}
        <div className="lg:col-span-2 space-y-4">
          {/* Alert Type */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">نوع التنبيه</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {alertTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => selectType(type.id)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all',
                    selectedType.id === type.id ? `border-${type.color}-400 bg-${type.color}-50` : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                  )}
                >
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', `bg-${type.color}-100 text-${type.color}-600`)}>
                    <type.icon className="w-5 h-5" />
                  </div>
                  <span className={cn('text-xs font-semibold', selectedType.id === type.id ? `text-${type.color}-700` : 'text-slate-600')}>{type.label}</span>
                  <span className="text-[10px] text-slate-400">{type.priority}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">رسالة التنبيه</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="input-field text-sm resize-none"
              placeholder="اكتب رسالة التنبيه هنا..."
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-400">{message.length} حرف</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">مدة البث:</span>
                <div className="flex items-center gap-1">
                  {[1, 5, 10, 30, 60].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={cn(
                        'px-2 py-1 rounded-md text-xs font-semibold transition-all',
                        duration === d ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-500'
                      )}
                    >
                      {d < 60 ? `${d}د` : '1س'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Screen Selection */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">الشاشات المستهدفة</h3>
              <div className="flex items-center gap-2">
                <button onClick={selectAll} className="text-xs text-royal-600 font-semibold hover:text-royal-700">تحديد الكل</button>
                <span className="text-slate-200">|</span>
                <button onClick={deselectAll} className="text-xs text-slate-400 font-semibold hover:text-slate-600">إلغاء الكل</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {screenList.map((screen) => {
                const Icon = screen.type === 'monitor' ? Monitor : Tablet
                return (
                  <button
                    key={screen.id}
                    onClick={() => toggleScreen(screen.id)}
                    className={cn(
                      'flex items-center gap-2 p-3 rounded-xl border-2 transition-all',
                      screen.selected ? 'border-royal-400 bg-royal-50' : 'border-slate-100 bg-slate-50'
                    )}
                  >
                    <div className={cn(
                      'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0',
                      screen.selected ? 'bg-royal-500 border-royal-500' : 'border-slate-300'
                    )}>
                      {screen.selected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-xs font-medium text-slate-700 truncate">{screen.name}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-slate-400">المحدد:</span>
              <span className="font-bold text-royal-600">{selectedScreens.length}</span>
              <span className="text-slate-400">من</span>
              <span className="font-bold text-slate-600">{screenList.length}</span>
            </div>
          </div>

          {/* Broadcast Button */}
          <button
            onClick={handleBroadcast}
            disabled={broadcasting}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all',
              broadcasting ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-red-gradient text-white hover:scale-[1.02] shadow-glow-red'
            )}
          >
            {broadcasting ? (
              <>
                <Siren className="w-5 h-5 animate-pulse" />
                جاري البث...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                بث التنبيه فوراً
              </>
            )}
          </button>
        </div>

        {/* Right: Preview + History */}
        <div className="lg:col-span-1 space-y-4">
          {/* Preview */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-400" />
              معاينة
            </h3>
            <div className={cn('rounded-xl p-4 border-2', `border-${selectedType.color}-200 bg-${selectedType.color}-50`)}>
              <div className="flex items-center gap-2 mb-2">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', `bg-${selectedType.color}-100 text-${selectedType.color}-600`)}>
                  <selectedType.icon className="w-4 h-4" />
                </div>
                <span className={cn('text-xs font-bold', `text-${selectedType.color}-600`)}>{selectedType.label}</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">{message || 'رسالة التنبيه...'}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                مدة البث: {duration} دقيقة
              </div>
            </div>
          </div>

          {/* History */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              سجل البث
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((h) => {
                const type = alertTypes.find((t) => t.id === h.type)!
                return (
                  <div key={h.id} className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={cn('w-6 h-6 rounded flex items-center justify-center flex-shrink-0', `bg-${type.color}-100 text-${type.color}-600`)}>
                        <type.icon className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs font-semibold text-slate-700 truncate flex-1">{h.message}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>{h.sentBy}</span>
                      <span>•</span>
                      <span>{h.sentAt}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px]">
                      <span className="text-slate-400 flex items-center gap-0.5"><Monitor className="w-3 h-3" /> {h.screens}</span>
                      <span className="text-emerald-500 flex items-center gap-0.5"><Check className="w-3 h-3" /> {h.acknowledged}</span>
                      <span className="text-slate-400 flex items-center gap-0.5"><Clock className="w-3 h-3" /> {h.duration}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowConfirm(false)}>
          <div className="glass-card p-6 w-full max-w-md animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                <Siren className="w-7 h-7 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">تأكيد بث الطوارئ</h3>
                <p className="text-xs text-slate-400">{selectedType.label} • {duration} دقيقة</p>
              </div>
            </div>
            <div className="rounded-xl bg-red-50 p-4 mb-4">
              <p className="text-sm text-slate-700 leading-relaxed">{message}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-red-500 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                سيتم البث على {selectedScreens.length} شاشة فوراً
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={confirmBroadcast}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-gradient text-white font-bold text-sm hover:scale-[1.02] transition-all"
              >
                <Send className="w-4 h-4" />
                تأكيد البث
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-ghost flex items-center gap-2 text-sm"
              >
                <X className="w-4 h-4" />
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
