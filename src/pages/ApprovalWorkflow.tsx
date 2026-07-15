import { useState } from 'react'
import {
  ClipboardCheck, Check, X, Clock, User, FileText,
  Image as ImageIcon, Video, AlertCircle, CheckCircle2,
  ChevronRight, Filter, Plus, Eye, ArrowRight, ArrowLeft,
  Sparkles, Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

interface ApprovalRequest {
  id: number
  title: string
  type: 'content' | 'image' | 'video' | 'schedule'
  submittedBy: string
  submittedAt: string
  screen: string
  status: 'pending' | 'approved' | 'rejected' | 'changes'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: string
  reviewedBy?: string
  reviewNote?: string
}

const initialRequests: ApprovalRequest[] = [
  { id: 1, title: 'عرض الصباح الجديد', type: 'content', submittedBy: 'أحمد محمد', submittedAt: 'منذ ساعة', screen: 'شاشة الاستقبال', status: 'pending', priority: 'high', description: 'محتوى ترحيبي صباحي مع آية قرآنية واسم الشركة' },
  { id: 2, title: 'صورة المنتج الجديد', type: 'image', submittedBy: 'سارة علي', submittedAt: 'منذ 3 ساعات', screen: 'شاشة الكافيه', status: 'pending', priority: 'medium', description: 'صورة منتج جديد بكافيه الصباح - قهوة مختصة' },
  { id: 3, title: 'فيديو ترويجي للصيف', type: 'video', submittedBy: 'خالد العتيبي', submittedAt: 'منذ 5 ساعات', screen: 'شاشة الخروج', status: 'pending', priority: 'urgent', description: 'فيديو ترويجي لعروض الصيف - 30 ثانية' },
  { id: 4, title: 'جدولة عرض الجمعة', type: 'schedule', submittedBy: 'نورة أحمد', submittedAt: 'أمس', screen: 'شاشة المطعم', status: 'approved', priority: 'medium', description: 'جدولة عرض خاص ليوم الجمعة من 10ص - 10م', reviewedBy: 'admin', reviewNote: 'ممتاز، تمت الموافقة' },
  { id: 5, title: 'تحديث قائمة الطعام', type: 'content', submittedBy: 'فهد السالم', submittedAt: 'أمس', screen: 'شاشة المطعم', status: 'rejected', priority: 'low', description: 'تحديث قائمة الطعام بإضافة 3 أطباق جديدة', reviewedBy: 'admin', reviewNote: 'الصور غير واضحة، يرجى إعادة رفعها' },
  { id: 6, title: 'عرض نهاية الأسبوع', type: 'content', submittedBy: 'أحمد محمد', submittedAt: 'منذ يومين', screen: 'شاشة الاستقبال', status: 'changes', priority: 'medium', description: 'عرض خاص لنهاية الأسبوع - خصم 20%', reviewedBy: 'admin', reviewNote: 'يرجى تعديل السعر وإضافة تاريخ الانتهاء' },
  { id: 7, title: 'فيديو فعالية الشركة', type: 'video', submittedBy: 'سارة علي', submittedAt: 'منذ 3 أيام', screen: 'شاشة قاعة الاجتماعات', status: 'approved', priority: 'high', description: 'فيديو فعاليات الشركة السنوية - 2 دقيقة', reviewedBy: 'admin', reviewNote: 'رائع، تمت الموافقة' },
]

const statusConfig = {
  pending: { label: 'بانتظار', bg: 'bg-gold-50', text: 'text-gold-600', dot: 'bg-gold-500', icon: Clock },
  approved: { label: 'موافق عليه', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500', icon: CheckCircle2 },
  rejected: { label: 'مرفوض', bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-500', icon: X },
  changes: { label: 'تعديلات مطلوبة', bg: 'bg-royal-50', text: 'text-royal-600', dot: 'bg-royal-500', icon: AlertCircle },
}

const priorityConfig = {
  low: { label: 'منخفض', bg: 'bg-slate-100', text: 'text-slate-500' },
  medium: { label: 'متوسط', bg: 'bg-blue-50', text: 'text-blue-600' },
  high: { label: 'عالي', bg: 'bg-gold-50', text: 'text-gold-600' },
  urgent: { label: 'عاجل', bg: 'bg-red-50', text: 'text-red-500' },
}

const typeIcons = { content: FileText, image: ImageIcon, video: Video, schedule: Clock }

export default function ApprovalWorkflow() {
  const { toast } = useToast()
  const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests)
  const [filter, setFilter] = useState('pending')
  const [selected, setSelected] = useState<ApprovalRequest | null>(null)
  const [reviewNote, setReviewNote] = useState('')

  const filtered = requests.filter((r) => filter === 'all' || r.status === filter)

  const handleApprove = (id: number) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'approved', reviewedBy: 'admin', reviewNote: reviewNote || 'تمت الموافقة' } : r))
    toast('تمت الموافقة على الطلب', 'success')
    setSelected(null)
    setReviewNote('')
  }

  const handleReject = (id: number) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'rejected', reviewedBy: 'admin', reviewNote: reviewNote || 'مرفوض' } : r))
    toast('تم رفض الطلب', 'info')
    setSelected(null)
    setReviewNote('')
  }

  const handleRequestChanges = (id: number) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: 'changes', reviewedBy: 'admin', reviewNote: reviewNote || 'يرجى التعديل' } : r))
    toast('تم طلب تعديلات', 'info')
    setSelected(null)
    setReviewNote('')
  }

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-gradient flex items-center justify-center shadow-glow-purple">
            <ClipboardCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">سير عمل الموافقات</h1>
            <p className="text-slate-400 text-sm mt-1">مراجعة والموافقة على المحتوى قبل النشر</p>
          </div>
        </div>
        {stats.pending > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-50 text-gold-600 text-sm font-semibold">
            <Bell className="w-4 h-4 animate-pulse" />
            {stats.pending} طلب بانتظار المراجعة
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الطلبات', value: stats.total, icon: ClipboardCheck, color: 'royal' },
          { label: 'بانتظار', value: stats.pending, icon: Clock, color: 'gold' },
          { label: 'موافق عليه', value: stats.approved, icon: CheckCircle2, color: 'emerald' },
          { label: 'مرفوض', value: stats.rejected, icon: X, color: 'red' },
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
        <Filter className="w-4 h-4 text-slate-400" />
        {['pending', 'approved', 'rejected', 'changes', 'all'].map((f) => (
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

      {/* Requests List */}
      <div className="space-y-3">
        {filtered.map((req) => {
          const status = statusConfig[req.status]
          const priority = priorityConfig[req.priority]
          const TypeIcon = typeIcons[req.type]
          const StatusIcon = status.icon
          return (
            <div key={req.id} className="glass-card p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', status.bg, status.text)}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{req.title}</h3>
                      <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', priority.bg, priority.text)}>
                        {priority.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2 line-clamp-1">{req.description}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {req.submittedBy}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.submittedAt}</span>
                      <span>•</span>
                      <span>{req.screen}</span>
                    </div>
                    {req.reviewNote && (
                      <div className={cn('mt-2 rounded-lg p-2 text-xs', status.bg, status.text)}>
                        <span className="font-semibold">ملاحظة المراجع: </span>
                        {req.reviewNote}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md', status.bg, status.text)}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                  {req.status === 'pending' ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all"
                        title="موافقة"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                        title="رفض"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelected(req)}
                        className="p-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all"
                        title="تفاصيل"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelected(req)}
                      className="text-xs text-royal-600 font-semibold hover:text-royal-700 flex items-center gap-1"
                    >
                      تفاصيل
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <ClipboardCheck className="w-10 h-10 text-slate-200 mx-auto mb-2" />
          <p className="text-sm text-slate-400">لا توجد طلبات في هذه الحالة</p>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setSelected(null); setReviewNote('') }}>
          <div className="glass-card p-6 w-full max-w-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">{selected.title}</h3>
              <button onClick={() => { setSelected(null); setReviewNote('') }} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview */}
            <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-4">
              {(() => {
                const TypeIcon = typeIcons[selected.type]
                return <TypeIcon className="w-12 h-12 text-slate-300" />
              })()}
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-400">مقدم الطلب</p>
                  <p className="text-sm font-semibold text-slate-700">{selected.submittedBy}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-400">التاريخ</p>
                  <p className="text-sm font-semibold text-slate-700">{selected.submittedAt}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-400">الشاشة</p>
                  <p className="text-sm font-semibold text-slate-700">{selected.screen}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-400">الأولوية</p>
                  <p className={cn('text-sm font-semibold', priorityConfig[selected.priority].text)}>{priorityConfig[selected.priority].label}</p>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[10px] text-slate-400 mb-1">الوصف</p>
                <p className="text-sm text-slate-600">{selected.description}</p>
              </div>
            </div>

            {/* Review Note */}
            {selected.status === 'pending' && (
              <>
                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">ملاحظة المراجع (اختياري)</label>
                  <textarea
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    rows={2}
                    className="input-field text-sm resize-none"
                    placeholder="أضف ملاحظة..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleApprove(selected.id)} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                    <Check className="w-4 h-4" />
                    موافقة
                  </button>
                  <button onClick={() => handleRequestChanges(selected.id)} className="btn-ghost flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    طلب تعديلات
                  </button>
                  <button onClick={() => handleReject(selected.id)} className="btn-ghost flex items-center gap-2 text-sm text-red-500 hover:bg-red-50">
                    <X className="w-4 h-4" />
                    رفض
                  </button>
                </div>
              </>
            )}

            {selected.reviewNote && selected.status !== 'pending' && (
              <div className={cn('rounded-lg p-3 text-sm', statusConfig[selected.status].bg, statusConfig[selected.status].text)}>
                <span className="font-semibold">ملاحظة المراجع: </span>
                {selected.reviewNote}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
