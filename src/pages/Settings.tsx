import { useState } from 'react'
import { Twitter, Instagram, Save, Image as ImageIcon, Palette, Shield, Bell, Key, Copy, Eye, EyeOff, Check, Lock, Smartphone, Mail, Monitor, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <button
      onClick={() => setOn(!on)}
      className={cn(
        'relative w-11 h-6 rounded-full transition-all',
        on ? 'bg-royal-500' : 'bg-slate-200'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all',
          on ? 'left-0.5' : 'right-0.5'
        )}
      />
    </button>
  )
}

export default function Settings() {
  const [section, setSection] = useState<'branding' | 'security' | 'notifications' | 'api' | 'twitter' | 'instagram'>('branding')
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  const sections = [
    { key: 'branding' as const, label: 'العلامة التجارية', icon: Palette },
    { key: 'security' as const, label: 'الأمان', icon: Shield },
    { key: 'notifications' as const, label: 'الإشعارات', icon: Bell },
    { key: 'api' as const, label: 'API Keys', icon: Key },
    { key: 'twitter' as const, label: 'تويتر', icon: Twitter },
    { key: 'instagram' as const, label: 'انستقرام', icon: Instagram },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">الإعدادات</h1>
        <p className="text-slate-400 text-sm mt-1">إعدادات الحساب والنظام</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar Tabs */}
        <div className="glass-card p-3 space-y-1 lg:col-span-1">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-right',
                section === s.key
                  ? 'bg-royal-gradient text-white shadow-glow-purple'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              <s.icon className="w-4 h-4 flex-shrink-0" />
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Branding */}
          {section === 'branding' && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">العلامة التجارية</h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-royal-gradient flex items-center justify-center">
                    <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <button className="btn-ghost flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      تغيير الشعار
                    </button>
                    <p className="text-xs text-slate-400 mt-1">PNG, SVG — بحد أقصى 2MB</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="text-sm text-slate-900 font-medium">إظهار الشعار</p>
                    <p className="text-xs text-slate-400 mt-0.5">عرض الشعار على الشاشات</p>
                  </div>
                  <Toggle defaultChecked />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-500 mb-2">اسم الشركة</label>
                    <input type="text" defaultValue="SmartScreen" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-500 mb-2">مدة ظهور الصورة (ثانية)</label>
                    <select className="input-field">
                      {[5, 10, 15, 20, 30, 45, 60].map((s) => (
                        <option key={s} value={s}>{s} ثانية</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-500 mb-2">لون الخلفية</label>
                    <div className="flex items-center gap-3">
                      <input type="color" defaultValue="#0A0A1A" className="w-12 h-12 rounded-lg bg-transparent border border-slate-200 cursor-pointer" />
                      <input type="text" defaultValue="#0A0A1A" className="input-field" dir="ltr" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-500 mb-2">لون النص</label>
                    <div className="flex items-center gap-3">
                      <input type="color" defaultValue="#FFFFFF" className="w-12 h-12 rounded-lg bg-transparent border border-slate-200 cursor-pointer" />
                      <input type="text" defaultValue="#FFFFFF" className="input-field" dir="ltr" />
                    </div>
                  </div>
                </div>

                <button className="btn-primary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  حفظ الإعدادات
                </button>
              </div>
            </div>
          )}

          {/* Security */}
          {section === 'security' && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">الأمان والحماية</h2>
              <div className="space-y-5">
                {/* Change Password */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-royal-600" />
                    تغيير كلمة المرور
                  </h3>
                  <div>
                    <label className="block text-sm text-slate-500 mb-2">كلمة المرور الحالية</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="input-field pl-10" dir="ltr" />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-500 mb-2">كلمة المرور الجديدة</label>
                      <input type="password" placeholder="••••••••" className="input-field" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-500 mb-2">تأكيد كلمة المرور</label>
                      <input type="password" placeholder="••••••••" className="input-field" dir="ltr" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-3">
                  <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-royal-600" />
                    المصادقة الثنائية (2FA)
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                    <div>
                      <p className="text-sm text-slate-900 font-medium">تفعيل المصادقة الثنائية</p>
                      <p className="text-xs text-slate-400 mt-0.5">حماية إضافية عبر رمز من جوالك</p>
                    </div>
                    <Toggle />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-3">
                  <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-royal-600" />
                    الجلسات النشطة
                  </h3>
                  <div className="space-y-2">
                    {[
                      { device: 'Chrome — Windows', location: 'الرياض، السعودية', current: true },
                      { device: 'Safari — iPhone', location: 'جدة، السعودية', current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                        <div className="flex items-center gap-3">
                          <Monitor className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-900 font-medium">{session.device}</p>
                            <p className="text-xs text-slate-400">{session.location}</p>
                          </div>
                        </div>
                        {session.current ? (
                          <span className="text-xs text-emerald-600 font-medium">الجلسة الحالية</span>
                        ) : (
                          <button className="text-xs text-red-500 hover:text-red-600 font-medium">إنهاء</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn-primary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  حفظ التغييرات
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {section === 'notifications' && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">إعدادات الإشعارات</h2>
              <div className="space-y-3">
                {[
                  { icon: Monitor, title: 'شاشة متوقفة', desc: 'تنبيه عند توقف أي شاشة عن العمل', on: true },
                  { icon: Wifi, title: 'جهاز غير متصل', desc: 'تنبيه عند انقطاع اتصال جهاز', on: true },
                  { icon: Mail, title: 'تقارير دورية', desc: 'تقرير أسبوعي بأداء الشاشات', on: false },
                  { icon: Bell, title: 'تحديثات النظام', desc: 'إشعار بالتحديثات والميزات الجديدة', on: true },
                  { icon: Shield, title: 'تنبيهات أمنية', desc: 'تنبيه عند دخول جديد من جهاز غير معروف', on: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-royal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-900 font-medium">{item.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <Toggle defaultChecked={item.on} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Keys */}
          {section === 'api' && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-1">مفاتيح API</h2>
              <p className="text-sm text-slate-400 mb-6">استخدم هذه المفاتيح لربط أنظمة خارجية</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-2">API Key</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600 font-mono" dir="ltr">
                      sk_live_8x4kP9mN2vQ7wR3tY6uI
                    </div>
                    <button
                      onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                      className="p-2.5 rounded-xl bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Webhook URL</label>
                  <input type="text" placeholder="https://your-app.com/webhook" className="input-field" dir="ltr" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="text-sm text-slate-900 font-medium">إعادة توليد المفتاح</p>
                    <p className="text-xs text-slate-400 mt-0.5">سيؤدي لإبطال المفتاح الحالي</p>
                  </div>
                  <button className="text-xs text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg bg-red-50 transition-all">
                    إعادة توليد
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Twitter */}
          {section === 'twitter' && (
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Twitter className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">ربط تويتر</h2>
                  <p className="text-sm text-slate-400">اعرض تغريداتك على الشاشات</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-2">API Key</label>
                  <input type="text" placeholder="أدخل Twitter API Key" className="input-field" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-2">API Secret</label>
                  <input type="password" placeholder="أدخل Twitter API Secret" className="input-field" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Access Token</label>
                  <input type="text" placeholder="أدخل Access Token" className="input-field" dir="ltr" />
                </div>
                <button className="btn-primary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  حفظ وربط الحساب
                </button>
              </div>
            </div>
          )}

          {/* Instagram */}
          {section === 'instagram' && (
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">ربط انستقرام</h2>
                  <p className="text-sm text-slate-400">اعرض منشوراتك على الشاشات</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Client ID</label>
                  <input type="text" placeholder="أدخل Instagram Client ID" className="input-field" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Client Secret</label>
                  <input type="password" placeholder="أدخل Client Secret" className="input-field" dir="ltr" />
                </div>
                <button className="btn-primary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  حفظ وربط الحساب
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
