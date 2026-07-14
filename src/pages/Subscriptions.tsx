import { CreditCard, Calendar, Check, Zap, Plus } from 'lucide-react'

const plans = [
  {
    name: 'الباقة الأساسية',
    screens: 6,
    price: 1200,
    current: true,
    features: ['6 شاشات', '6 أجهزة', 'دعم فني أساسي', 'مكتبة ميديا غير محدودة'],
  },
  {
    name: 'الباقة المتقدمة',
    screens: 15,
    price: 2800,
    current: false,
    features: ['15 شاشة', '15 جهاز', 'دعم فني متقدم', 'جدولة متقدمة', 'ربط سوشيال ميديا'],
  },
  {
    name: 'الباقة الاحترافية',
    screens: 50,
    price: 7500,
    current: false,
    features: ['50 شاشة', '50 جهاز', 'دعم فني 24/7', 'جميع المزايا', 'API مخصص'],
  },
]

export default function Subscriptions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">الاشتراكات</h1>
        <p className="text-slate-400 text-sm mt-1">إدارة الباقة والتمديد</p>
      </div>

      {/* Current Plan */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">الباقة الأساسية</h2>
              <p className="text-sm text-slate-400">6 شاشات — 1,200 ريال</p>
            </div>
          </div>
          <span className="badge-success">باقة نشطة</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50">
            <p className="text-xs text-slate-400 mb-1">الأيام المتبقية</p>
            <p className="text-2xl font-bold text-slate-900">23 يوم</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50">
            <p className="text-xs text-slate-400 mb-1">الشاشات المستخدمة</p>
            <p className="text-2xl font-bold text-slate-900">12 / 28</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50">
            <p className="text-xs text-slate-400 mb-1">الأجهزة المستخدمة</p>
            <p className="text-2xl font-bold text-slate-900">25 / 28</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 p-4 rounded-xl bg-gold-50 border border-gold-200">
          <Calendar className="w-5 h-5 text-gold-600 flex-shrink-0" />
          <p className="text-sm text-gold-700">ينتهي اشتراكك في 2024-08-06</p>
          <button className="btn-gold mr-auto flex items-center gap-2 text-xs">
            <Plus className="w-4 h-4" />
            تمديد الباقة
          </button>
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">الخطط المتاحة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card-hover p-6 relative ${plan.current ? 'border-royal-400' : ''}`}
            >
              {plan.current && (
                <span className="absolute top-4 left-4 badge-info">الحالية</span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-royal-50 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-royal-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold">{plan.name}</h3>
                  <p className="text-xs text-slate-400">{plan.screens} شاشات</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">
                {plan.price.toLocaleString()}
                <span className="text-sm text-slate-400 font-normal"> ريال</span>
              </p>
              <div className="space-y-2 my-4">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{f}</span>
                  </div>
                ))}
              </div>
              <button
                className={plan.current ? 'btn-ghost w-full' : 'btn-primary w-full'}
                disabled={plan.current}
              >
                {plan.current ? 'الباقة الحالية' : 'ترقية'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
