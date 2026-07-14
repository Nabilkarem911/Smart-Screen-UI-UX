import { useState } from 'react'
import {
  HelpCircle, Search, ChevronDown, Mail, Phone, MessageCircle,
  Send, FileText, Video, BookOpen, ExternalLink, Plus, X,
  CheckCircle2, Clock, AlertCircle, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  { q: 'كيف أضيف شاشة جديدة؟', a: 'انتقل إلى صفحة الشاشات، اضغط على "إضافة شاشة"، أدخل الاسم والمجموعة، ثم اضغط حفظ. ستظهر الشاشة فوراً في القائمة.' },
  { q: 'كيف أربط جهاز بشاشة؟', a: 'من صفحة الأجهزة، اضغط "ربط جهاز"، امسح QR code بشاشة الجهاز أو أدخل رمز الاقتران يدوياً.' },
  { q: 'كيف أنشئ جدولة للمحتوى؟', a: 'انتقل إلى صفحة الجدولة، اختر اليوم، اضغط "جدولة جديدة"، حدد الشاشة والوقت ونوع التكرار، ثم احفظ.' },
  { q: 'كيف أغير صلاحيات مستخدم؟', a: 'من صفحة المستخدمين، اضغط على مصفوفة الصلاحيات، حدد الدور، وفعّل أو عطّل الصلاحيات المطلوبة.' },
  { q: 'ما هي أنواع المحتوى المدعومة؟', a: 'يدعم النظام: صور (JPG, PNG, GIF)، فيديوهات (MP4, WebM)، نصوص متحركة، RSS feeds، ومحتوى HTML مخصص.' },
  { q: 'كيف أحصل على تقرير الأداء؟', a: 'انتقل إلى صفحة التحليلات، اختر الفترة الزمنية، واضغط "تصدير PDF" لتحميل التقرير الكامل.' },
  { q: 'كيف أفعّل المصادقة الثنائية؟', a: 'من الإعدادات > الأمان، فعّلtoggle "المصادقة الثنائية"، اختر طريقة الاستلام (بريد/واتساب)، وأدخل رمز التحقق.' },
  { q: 'كيف أجدد اشتراكي؟', a: 'من صفحة الاشتراكات، اضغط "تجديد"، اختر الباقة المناسبة، أدخل بيانات الدفع، وسيتم التجديد فوراً.' },
]

const resources = [
  { icon: BookOpen, title: 'دليل المستخدم', desc: 'دليل شامل لكل ميزات النظام', color: 'royal', link: '#' },
  { icon: Video, title: 'فيديوهات تعليمية', desc: 'شروحات مرئية خطوة بخطوة', color: 'emerald', link: '#' },
  { icon: FileText, title: 'API Documentation', desc: 'توثيق واجهة البرمجة', color: 'gold', link: '#' },
  { icon: Zap, title: 'أفضل الممارسات', desc: 'نصائح لتحسين أداء شاشاتك', color: 'blue', link: '#' },
]

const tickets = [
  { id: 'TK-001', subject: 'مشكلة في عرض الفيديو', status: 'open', priority: 'high', time: 'منذ 2 ساعة' },
  { id: 'TK-002', subject: 'طلب ميزة جدولة متقدمة', status: 'pending', priority: 'medium', time: 'منذ يوم' },
  { id: 'TK-003', subject: 'استفسار عن الباقات', status: 'resolved', priority: 'low', time: 'منذ 3 أيام' },
]

const statusConfig = {
  open: { label: 'مفتوحة', bg: 'bg-red-50', text: 'text-red-600', icon: AlertCircle },
  pending: { label: 'قيد المعالجة', bg: 'bg-gold-50', text: 'text-gold-600', icon: Clock },
  resolved: { label: 'تم الحل', bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle2 },
}

const priorityConfig = {
  high: { label: 'عالية', bg: 'bg-red-50', text: 'text-red-600' },
  medium: { label: 'متوسطة', bg: 'bg-gold-50', text: 'text-gold-600' },
  low: { label: 'منخفضة', bg: 'bg-slate-100', text: 'text-slate-500' },
}

const colorMap: Record<string, string> = {
  royal: 'bg-royal-50 text-royal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  gold: 'bg-gold-50 text-gold-600',
  blue: 'bg-blue-50 text-blue-600',
}

export default function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'general', priority: 'medium', desc: '' })

  const filteredFaqs = faqs.filter((f) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">المساعدة والدعم</h1>
          <p className="text-slate-400 text-sm mt-1">كل ما تحتاجه لاستخدام النظام بكفاءة</p>
        </div>
        <button
          onClick={() => setShowTicketModal(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          تذكرة دعم جديدة
        </button>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Mail, title: 'البريد الإلكتروني', value: 'support@smartscreen.io', desc: 'رد خلال 24 ساعة', color: 'royal' },
          { icon: Phone, title: 'الهاتف', value: '+964 770 000 0000', desc: '9ص - 6م، السبت-الخميس', color: 'emerald' },
          { icon: MessageCircle, title: 'واتساب', value: '+964 770 000 0000', desc: 'دعم فوري', color: 'gold' },
        ].map((contact, i) => (
          <div key={i} className="glass-card p-5">
            <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mb-3', colorMap[contact.color])}>
              <contact.icon className="w-5 h-5" />
            </div>
            <p className="text-sm text-slate-400">{contact.title}</p>
            <p className="text-sm font-semibold text-slate-900 mt-1" dir="ltr">{contact.value}</p>
            <p className="text-xs text-slate-400 mt-1">{contact.desc}</p>
          </div>
        ))}
      </div>

      {/* Resources */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">موارد تعليمية</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource, i) => (
            <a
              key={i}
              href={resource.link}
              className="glass-card p-5 group hover:shadow-md transition-all"
            >
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mb-3', colorMap[resource.color])}>
                <resource.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{resource.title}</h3>
              <p className="text-xs text-slate-400">{resource.desc}</p>
              <div className="flex items-center gap-1 text-xs text-royal-600 mt-3 group-hover:gap-2 transition-all">
                <span>عرض</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900">الأسئلة الشائعة</h2>
        </div>
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الأسئلة الشائعة..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-royal-500/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-right"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', openFaq === i ? 'bg-royal-gradient text-white' : 'bg-slate-100 text-slate-400')}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{faq.q}</span>
                </div>
                <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform flex-shrink-0', openFaq === i && 'rotate-180')} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 pr-15 animate-fade-in">
                  <p className="text-sm text-slate-600 leading-relaxed pr-11">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <div className="glass-card p-8 text-center">
              <Search className="w-6 h-6 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">لا توجد نتائج لبحثك</p>
            </div>
          )}
        </div>
      </div>

      {/* Support Tickets */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">تذاكر الدعم</h2>
        <div className="space-y-2">
          {tickets.map((ticket) => {
            const status = statusConfig[ticket.status as keyof typeof statusConfig]
            const priority = priorityConfig[ticket.priority as keyof typeof priorityConfig]
            const StatusIcon = status.icon
            return (
              <div key={ticket.id} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', status.bg, status.text)}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{ticket.subject}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{ticket.id} • {ticket.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-lg', priority.bg, priority.text)}>
                    {priority.label}
                  </span>
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-lg', status.bg, status.text)}>
                    {status.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ticket Modal */}
      {showTicketModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowTicketModal(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">تذكرة دعم جديدة</h2>
              <button
                onClick={() => setShowTicketModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">الموضوع</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  placeholder="مثال: مشكلة في عرض الفيديو"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-500 mb-2">التصنيف</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="general">عام</option>
                    <option value="technical">تقني</option>
                    <option value="billing">فواتير</option>
                    <option value="feature">طلب ميزة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-2">الأولوية</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className="input-field"
                  >
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">عالية</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">الوصف</label>
                <textarea
                  value={ticketForm.desc}
                  onChange={(e) => setTicketForm({ ...ticketForm, desc: e.target.value })}
                  rows={4}
                  placeholder="اشرح المشكلة بالتفصيل..."
                  className="input-field resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowTicketModal(false)} className="btn-ghost flex-1">إلغاء</button>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  إرسال التذكرة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
