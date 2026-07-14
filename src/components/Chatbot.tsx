import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, Lightbulb, Monitor, Clock, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'bot'
  text: string
}

const quickQuestions = [
  { icon: Monitor, text: 'كيف أنشئ شاشة جديدة؟' },
  { icon: Clock, text: 'كيف أجدول المحتوى؟' },
  { icon: BarChart3, text: 'كيف أرى تحليلات الأداء؟' },
  { icon: Lightbulb, text: 'اقترح لي محتوى لشاشة كافيه' },
]

const botResponses: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['شاشة', 'إنشاء', 'جديدة', 'اضافة'],
    reply: 'لإنشاء شاشة جديدة:\n\n1. اذهب لصفحة "الشاشات"\n2. اضغط "إضافة شاشة"\n3. أدخل الاسم واختر المجموعة\n4. اضغط "حفظ" ثم ادخل المحرر\n5. اختر القالب وأضف الصفحات\n\nهل تحتاج مساعدة في اختيار القالب؟',
  },
  {
    keywords: ['جدول', 'جدولة', 'وقت', 'ايام', 'موعد'],
    reply: 'لجدولة المحتوى:\n\n1. افتح محرر الشاشة\n2. اختر الصفحة\n3. في قسم "الجدولة" على اليمين\n4. حدد أيام الأسبوع\n5. اختر وقت البداية والنهاية\n\nالصفحة ستظهر تلقائياً في الأوقات المحددة فقط.',
  },
  {
    keywords: ['تحليل', 'أداء', 'احصائيات', 'مشاهدات', 'analytics'],
    reply: 'لعرض تحليلات الأداء:\n\n1. اذهب لصفحة "الرئيسية"\n2. ستجد رسوم بيانية تفاعلية:\n   • مشاهدات اليوم/الأسبوع/الشهر\n   • أكثر الشاشات نشاطاً\n   • أوقات الذروة\n   • معدل التفاعل\n\nالرسوم تتحدث كل ساعة تلقائياً.',
  },
  {
    keywords: ['كافيه', 'قهوة', 'مطعم', 'محتوى', 'اقتراح', 'اقترح'],
    reply: 'إليك اقتراحات محتوى لشاشة كافيه:\n\n☕ صفحة ترحيب: "أهلاً بك في [اسم الكافيه]"\n🛍️ صفحة عروض: "عرض اليوم - اشترِ 2 واحصل على 3"\n🕒 صفحة أوقات: "مفتوح يومياً 8ص - 12م"\n📸 صفحة انستقرام: أحدث منشورات الكافيه\n\nهل تريد أن أولد نصاً إعلانياً جاهزاً بالذكاء الاصطناعي؟',
  },
  {
    keywords: ['ذكاء', 'اصطناعي', 'ai', 'توليد'],
    reply: 'المساعد الذكي متاح في محرر الشاشة!\n\n1. افتح أي شاشة في المحرر\n2. في الجهة اليمنى ستجد "المساعد الذكي"\n3. اكتب وصف المحتوى المطلوب\n4. اضغط "توليد المحتوى"\n5. سيتم إنشاء نص إعلاني احترافي تلقائياً\n\nيمكنك تعديل النتيجة قبل الحفظ.',
  },
  {
    keywords: ['جهاز', 'ربط', 'connect', 'device'],
    reply: 'لربط جهاز بالشاشة:\n\n1. اذهب لصفحة "الأجهزة"\n2. اضغط "إضافة جهاز"\n3. أدخل اسم الجهاز ورقمه التسلسلي\n4. اختر الشاشة المرتبطة\n5. اضغط "حفظ"\n\nالجهاز سيبدأ عرض المحتوى فور اتصاله بالإنترنت.',
  },
  {
    keywords: ['مجموعة', 'group', 'تصنيف'],
    reply: 'المجموعات تساعدك في تنظيم الشاشات:\n\n1. اذهب لصفحة "المجموعات"\n2. اضغط "إضافة مجموعة"\n3. أدخل الاسم والوصف\n4. عند إنشاء شاشة، اختر المجموعة\n\nيمكنك جدولة محتوى لكل مجموعة مرة واحدة.',
  },
  {
    keywords: ['اشتراك', 'باقة', 'plan', 'subscription'],
    reply: 'لإدارة اشتراكك:\n\n1. اذهب لصفحة "الاشتراكات"\n2. راجع باقتك الحالية والاستخدام\n3. اضغط "ترقية" للانتقال لباقة أعلى\n4. الباقة الجديدة تفتح مزايا إضافية\n\nهل تريد معرفة الفرق بين الباقات؟',
  },
]

function getBotReply(userText: string): string {
  const lower = userText.toLowerCase()
  for (const resp of botResponses) {
    if (resp.keywords.some((kw) => lower.includes(kw))) {
      return resp.reply
    }
  }
  return 'أنا هنا لمساعدتك! يمكنك سؤالي عن:\n• إنشاء وإدارة الشاشات\n• جدولة المحتوى\n• ربط الأجهزة\n• التحليلات والأداء\n• توليد محتوى بالذكاء الاصطناعي\n• الاشتراكات والباقات\n\nأو اختر أحد الأسئلة السريعة بالأسفل.'
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'مرحباً! أنا مساعد SmartScreen الذكي 🤖\n\nكيف أساعدك اليوم؟' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { role: 'bot', text: getBotReply(text) }])
    }, 1200)
  }

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-6 z-[200] w-14 h-14 rounded-2xl bg-royal-gradient text-white shadow-glow-purple flex items-center justify-center hover:scale-105 transition-all group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-400 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">AI</span>
          <span className="absolute right-full mr-3 whitespace-nowrap bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            المساعد الذكي
          </span>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 left-6 z-[200] w-[360px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in border border-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-royal-gradient text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">المساعد الذكي</h3>
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  متصل الآن
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn('flex', msg.role === 'user' ? 'justify-start' : 'justify-end')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-line',
                    msg.role === 'user'
                      ? 'bg-royal-gradient text-white rounded-bl-md'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-br-md shadow-sm'
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-end">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 bg-slate-50 border-t border-slate-100 pt-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q.text)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 hover:border-royal-300 hover:text-royal-700 transition-all"
                >
                  <q.icon className="w-3 h-3" />
                  <span>{q.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="اكتب سؤالك..."
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-royal-500 focus:bg-white transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-royal-gradient text-white flex items-center justify-center disabled:opacity-40 hover:shadow-glow-purple transition-all flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
