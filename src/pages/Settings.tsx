import { useState } from 'react'
import { Twitter, Instagram, Save, Image as ImageIcon, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Settings() {
  const [section, setSection] = useState<'twitter' | 'instagram' | 'branding'>('branding')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">الإعدادات</h1>
        <p className="text-slate-400 text-sm mt-1">إعدادات المزايا والحساب</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setSection('branding')}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
            section === 'branding' ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
          )}
        >
          <Palette className="w-4 h-4" />
          اعدادات حسابك
        </button>
        <button
          onClick={() => setSection('twitter')}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
            section === 'twitter' ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
          )}
        >
          <Twitter className="w-4 h-4" />
          تويتر
        </button>
        <button
          onClick={() => setSection('instagram')}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
            section === 'instagram' ? 'bg-royal-gradient text-white shadow-glow-purple' : 'bg-slate-100 text-slate-500 hover:text-slate-900'
          )}
        >
          <Instagram className="w-4 h-4" />
          انستقرام
        </button>
      </div>

      {/* Branding */}
      {section === 'branding' && (
        <div className="glass-card p-6 max-w-2xl">
          <h2 className="text-lg font-bold text-slate-900 mb-6">اعدادات حسابك</h2>
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

            <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div>
                <p className="text-sm text-slate-900 font-medium">إظهار الشعار</p>
                <p className="text-xs text-slate-400 mt-0.5">عرض الشعار على الشاشات</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-slate-100 border-slate-300 text-royal-600" />
            </label>

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

      {/* Twitter */}
      {section === 'twitter' && (
        <div className="glass-card p-6 max-w-2xl">
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
        <div className="glass-card p-6 max-w-2xl">
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
  )
}
