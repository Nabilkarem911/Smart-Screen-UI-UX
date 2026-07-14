import { useState } from 'react'
import {
  Monitor, Tablet, Smartphone, Palette, Check, X, ArrowLeft,
  Sparkles, Zap, BarChart3, Shield, ArrowRight, Rocket,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface OnboardingProps {
  onComplete: () => void
}

const steps = [
  {
    id: 'welcome',
    icon: Rocket,
    title: 'مرحباً بك في SmartScreen!',
    desc: 'دعنا نجهز حسابك في دقائق معدودة',
  },
  {
    id: 'role',
    icon: Shield,
    title: 'ما هو دورك؟',
    desc: 'اختر الدور المناسب لتخصيص التجربة',
  },
  {
    id: 'screens',
    icon: Monitor,
    title: 'ما نوع الشاشات؟',
    desc: 'حدد أنواع الشاشات التي تديرها',
  },
  {
    id: 'theme',
    icon: Palette,
    title: 'اختر مظهر النظام',
    desc: 'حدد الألوان والثيم المفضل لديك',
  },
  {
    id: 'done',
    icon: Sparkles,
    title: 'تم الإعداد بنجاح!',
    desc: 'كل شيء جاهز لتبدأ رحلتك',
  },
]

const roles = [
  { id: 'admin', label: 'مدير النظام', desc: 'تحكم كامل في كل شيء', icon: Shield },
  { id: 'editor', label: 'محرر محتوى', desc: 'إنشاء وتعديل الشاشات', icon: Zap },
  { id: 'viewer', label: 'مشاهد', desc: 'عرض ومتابعة فقط', icon: BarChart3 },
]

const screenTypes = [
  { id: 'landscape', label: 'شاشات أفقية', icon: Monitor, desc: 'TV, شاشات عرض' },
  { id: 'portrait', label: 'شاشات طولية', icon: Smartphone, desc: 'كيوسك, موبايل' },
  { id: 'tablet', label: 'تابلت', icon: Tablet, desc: 'iPad, Android Tablet' },
]

const themes = [
  { id: 'royal', label: 'ملكي', colors: ['#6366F1', '#A855F7'], bg: 'bg-royal-gradient' },
  { id: 'emerald', label: 'زمردي', colors: ['#10B981', '#059669'], bg: 'bg-emerald-400' },
  { id: 'sunset', label: 'غروب', colors: ['#F59E0B', '#EF4444'], bg: 'bg-gradient-to-br from-gold-400 to-red-400' },
  { id: 'ocean', label: 'محيط', colors: ['#0EA5E9', '#06B6D4'], bg: 'bg-gradient-to-br from-blue-400 to-cyan-400' },
]

export default function OnboardingWizard({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedScreens, setSelectedScreens] = useState<string[]>([])
  const [selectedTheme, setSelectedTheme] = useState('royal')

  const toggleScreen = (id: string) => {
    setSelectedScreens((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  const canProceed = () => {
    if (currentStep === 1) return !!selectedRole
    if (currentStep === 2) return selectedScreens.length > 0
    return true
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => onComplete()

  const step = steps[currentStep]
  const StepIcon = step.icon

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header with close */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === currentStep ? 'w-8 bg-royal-gradient' : i < currentStep ? 'w-4 bg-royal-300' : 'w-4 bg-slate-200'
                )}
              />
            ))}
          </div>
          <button
            onClick={handleSkip}
            className="text-xs text-slate-400 hover:text-slate-600 transition-all flex items-center gap-1"
          >
            تخطي
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step Icon + Title */}
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-royal-gradient items-center justify-center mb-4 shadow-glow-purple">
              <StepIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h2>
            <p className="text-sm text-slate-400">{step.desc}</p>
          </div>

          {/* Step Content */}
          {currentStep === 0 && (
            <div className="space-y-3">
              {[
                { icon: Monitor, text: 'إدارة شاشاتك من مكان واحد' },
                { icon: Zap, text: 'جدولة المحتوى بذكاء' },
                { icon: BarChart3, text: 'تحليلات لحظية للأداء' },
                { icon: Sparkles, text: 'ذكاء اصطناعي مدمج' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-royal-600" />
                  </div>
                  <span className="text-sm text-slate-700">{item.text}</span>
                  <Check className="w-4 h-4 text-emerald-500 mr-auto" />
                </div>
              ))}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-right',
                    selectedRole === role.id
                      ? 'bg-royal-50 border-royal-500'
                      : 'bg-slate-50 border-slate-100 hover:border-royal-200'
                  )}
                >
                  <div className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all',
                    selectedRole === role.id ? 'bg-royal-gradient text-white' : 'bg-white text-slate-400'
                  )}>
                    <role.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={cn('text-sm font-semibold', selectedRole === role.id ? 'text-royal-700' : 'text-slate-700')}>
                      {role.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{role.desc}</p>
                  </div>
                  {selectedRole === role.id && (
                    <div className="w-5 h-5 rounded-full bg-royal-500 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-3">
              {screenTypes.map((st) => (
                <button
                  key={st.id}
                  onClick={() => toggleScreen(st.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-right',
                    selectedScreens.includes(st.id)
                      ? 'bg-royal-50 border-royal-500'
                      : 'bg-slate-50 border-slate-100 hover:border-royal-200'
                  )}
                >
                  <div className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all',
                    selectedScreens.includes(st.id) ? 'bg-royal-gradient text-white' : 'bg-white text-slate-400'
                  )}>
                    <st.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={cn('text-sm font-semibold', selectedScreens.includes(st.id) ? 'text-royal-700' : 'text-slate-700')}>
                      {st.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{st.desc}</p>
                  </div>
                  <div className={cn(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    selectedScreens.includes(st.id) ? 'bg-royal-500 border-royal-500' : 'border-slate-200'
                  )}>
                    {selectedScreens.includes(st.id) && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all text-center',
                    selectedTheme === theme.id ? 'border-royal-500 ring-2 ring-royal-500/20' : 'border-slate-100 hover:border-royal-200'
                  )}
                >
                  <div className={cn('w-full h-16 rounded-xl mb-3', theme.bg)} />
                  <p className={cn('text-sm font-semibold', selectedTheme === theme.id ? 'text-royal-700' : 'text-slate-700')}>
                    {theme.label}
                  </p>
                  {selectedTheme === theme.id && (
                    <div className="flex justify-center mt-1">
                      <Check className="w-4 h-4 text-royal-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 flex items-center justify-center">
                <Check className="w-10 h-10 text-emerald-500" />
              </div>
              <div className="space-y-2">
                {[
                  { label: 'الدور', value: roles.find((r) => r.id === selectedRole)?.label || 'مدير النظام' },
                  { label: 'الشاشات', value: selectedScreens.length > 0 ? `${selectedScreens.length} نوع` : 'الكل' },
                  { label: 'المظهر', value: themes.find((t) => t.id === selectedTheme)?.label || 'ملكي' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50">
                    <span className="text-sm text-slate-400">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t border-slate-100 bg-slate-50">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-all"
            >
              <ArrowRight className="w-4 h-4" />
              السابق
            </button>
          ) : (
            <div />
          )}
          <span className="text-xs text-slate-400">
            {currentStep + 1} / {steps.length}
          </span>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              'flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
              canProceed()
                ? 'bg-royal-gradient text-white hover:shadow-glow-purple'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            )}
          >
            {currentStep === steps.length - 1 ? 'ابدأ الآن' : 'التالي'}
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
