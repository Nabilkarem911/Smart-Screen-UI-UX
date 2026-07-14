import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mail, MessageCircle, Lock, User, Eye, EyeOff, ArrowLeft,
  ShieldCheck, Monitor, Zap, BarChart3, Sparkles, CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  { icon: Monitor, title: 'إدارة شاشات لا محدودة', desc: 'تحكم كامل في جميع شاشاتك من مكان واحد' },
  { icon: Zap, title: 'جدولة ذكية للمحتوى', desc: 'عرض المحتوى المناسب في الوقت المناسب' },
  { icon: BarChart3, title: 'تحليلات لحظية', desc: 'متابعة أداء الشاشات والجمهور' },
  { icon: Sparkles, title: 'ذكاء اصطناعي مدمج', desc: 'توليد المحتوى واقتراحات ذكية بالـ AI' },
]

const stats = [
  { value: '500+', label: 'شاشة نشطة' },
  { value: '99.9%', label: 'وقت تشغيل' },
  { value: '24/7', label: 'دعم فني' },
]

export default function Login() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'login' | 'otp'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [otpMethod, setOtpMethod] = useState<'email' | 'whatsapp'>('email')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
    }, 1200)
  }

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1000)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newDigits = [...otpDigits]
    newDigits[index] = value
    setOtpDigits(newDigits)
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, 6).split('')
    const newDigits = [...otpDigits]
    pasted.forEach((char, i) => {
      if (i < 6) newDigits[i] = char
    })
    setOtpDigits(newDigits)
    if (pasted.length < 6) {
      otpRefs.current[pasted.length]?.focus()
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* ===== Left Branding Panel ===== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-royal-gradient">
        {/* Animated mesh background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-royal-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
              <img src="/logo.png" alt="SmartScreen" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">SmartScreen</h1>
              <p className="text-white/60 text-xs">نظام إدارة الشاشات الذكية</p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-4">
                أدر شاشاتك<br />
                <span className="text-gold-300">بذكاء واحترافية</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-md">
                منصة متكاملة لإدارة الشاشات الإعلانية مع ذكاء اصطناعي يساعدك في توليد المحتوى وتحليل الأداء
              </p>
            </div>

            {/* Features Carousel */}
            <div className="space-y-3">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-2xl transition-all duration-500',
                    activeFeature === i
                      ? 'bg-white/15 backdrop-blur-md border border-white/20 scale-100 opacity-100'
                      : 'bg-transparent border border-transparent scale-95 opacity-40'
                  )}
                >
                  <div className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all',
                    activeFeature === i ? 'bg-gold-400 text-royal-900' : 'bg-white/10 text-white'
                  )}>
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{feat.title}</h3>
                    <p className="text-white/60 text-xs mt-0.5">{feat.desc}</p>
                  </div>
                  {activeFeature === i && (
                    <CheckCircle2 className="w-5 h-5 text-gold-300 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 pt-8 border-t border-white/10">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-gold-300">{stat.value}</p>
                <p className="text-white/50 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Right Form Panel ===== */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-slate-50">
        {/* Subtle background effects */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-royal-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gold-200/20 rounded-full blur-[80px]" />

        <div className="relative w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-royal-gradient shadow-glow-purple mb-3">
              <img src="/logo.png" alt="SmartScreen" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">SmartScreen</h1>
            <p className="text-slate-400 text-sm">نظام إدارة الشاشات الذكية</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 animate-fade-in">
            {step === 'login' ? (
              <>
                {/* Login Step */}
                <div className="mb-8">
                  <div className="inline-flex w-12 h-12 rounded-2xl bg-royal-50 items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-royal-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">أهلاً بعودتك 👋</h2>
                  <p className="text-slate-400 text-sm">سجّل دخولك للوصول إلى لوحة التحكم</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">اسم المستخدم</label>
                    <div className="relative group">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-royal-500 transition-colors" />
                      <input
                        type="text"
                        required
                        placeholder="أدخل اسم المستخدم"
                        className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-slate-900 placeholder-slate-300 text-sm transition-all focus:outline-none focus:border-royal-500 focus:bg-white focus:ring-4 focus:ring-royal-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">كلمة المرور</label>
                    <div className="relative group">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-royal-500 transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        className="w-full pr-12 pl-12 py-3.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-slate-900 placeholder-slate-300 text-sm transition-all focus:outline-none focus:border-royal-500 focus:bg-white focus:ring-4 focus:ring-royal-500/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-royal-600 focus:ring-royal-500/20 cursor-pointer" />
                      <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">تذكرني</span>
                    </label>
                    <button type="button" className="text-sm text-royal-600 hover:text-royal-700 font-medium transition-colors">
                      نسيت كلمة المرور؟
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-royal-gradient text-white font-semibold text-sm transition-all hover:shadow-glow-purple hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        جاري التحقق...
                      </>
                    ) : (
                      <>
                        تسجيل الدخول
                        <ArrowLeft className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-100" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-xs text-slate-400">أو</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50 transition-all text-sm font-medium"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50 transition-all text-sm font-medium"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
                        <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                      </svg>
                      LinkedIn
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <span className="text-sm text-slate-400">ليس لديك حساب؟ </span>
                    <button type="button" className="text-sm text-royal-600 hover:text-royal-700 font-semibold transition-colors">
                      إنشاء حساب جديد
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                {/* OTP Step */}
                <button
                  onClick={() => setStep('login')}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-700 text-sm mb-6 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  رجوع
                </button>

                <div className="mb-8">
                  <div className="inline-flex w-12 h-12 rounded-2xl bg-royal-50 items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-royal-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">التحقق الثنائي</h2>
                  <p className="text-slate-400 text-sm">اختر طريقة الاستلام وأدخل رمز التحقق</p>
                </div>

                {/* OTP Method Selection */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setOtpMethod('email')}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                      otpMethod === 'email'
                        ? 'bg-royal-50 border-royal-500 text-royal-700'
                        : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-royal-200'
                    )}
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm font-medium">البريد الإلكتروني</span>
                  </button>
                  <button
                    onClick={() => setOtpMethod('whatsapp')}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                      otpMethod === 'whatsapp'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-emerald-300'
                    )}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">واتساب</span>
                  </button>
                </div>

                {/* Info Banner */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-royal-50/50 border border-royal-100 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-royal-100 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 text-royal-600" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    تم إرسال رمز التحقق إلى {otpMethod === 'email' ? 'بريدك الإلكتروني' : 'رقم واتساب الخاص بك'}
                  </p>
                </div>

                <form onSubmit={handleOtp} className="space-y-6">
                  {/* OTP Inputs */}
                  <div className="flex justify-center gap-2.5" dir="ltr" onPaste={handleOtpPaste}>
                    {otpDigits.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-slate-50 border-2 border-slate-100 text-slate-900 transition-all focus:outline-none focus:border-royal-500 focus:bg-white focus:ring-4 focus:ring-royal-500/10"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-royal-gradient text-white font-semibold text-sm transition-all hover:shadow-glow-purple hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        جاري التحقق...
                      </>
                    ) : (
                      <>
                        تأكيد ودخول
                        <ArrowLeft className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button type="button" className="text-sm text-slate-400 hover:text-royal-600 transition-colors">
                      إعادة إرسال الرمز (00:59)
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-slate-300 text-xs mt-6">
            © 2024 SmartScreen. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  )
}
