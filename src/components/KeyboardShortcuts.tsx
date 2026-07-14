import { useState, useEffect } from 'react'
import { X, Command } from 'lucide-react'

const shortcuts = [
  {
    category: 'عام',
    items: [
      { keys: ['Ctrl', 'K'], desc: 'فتح لوحة الأوامر' },
      { keys: ['?'], desc: 'عرض اختصارات لوحة المفاتيح' },
      { keys: ['Esc'], desc: 'إغلاق النوافذ المنبثقة' },
    ],
  },
  {
    category: 'البحث',
    items: [
      { keys: ['Ctrl', '/'], desc: 'تركيز البحث الشامل' },
      { keys: ['↑', '↓'], desc: 'التنقل في نتائج البحث' },
      { keys: ['↵'], desc: 'اختيار نتيجة البحث' },
    ],
  },
  {
    category: 'لوحة الأوامر',
    items: [
      { keys: ['Ctrl', 'K'], desc: 'فتح/إغلاق لوحة الأوامر' },
      { keys: ['↑', '↓'], desc: 'التنقل بين الأوامر' },
      { keys: ['↵'], desc: 'تنفيذ الأمر المحدد' },
    ],
  },
  {
    category: 'التنقل',
    items: [
      { keys: ['G', 'D'], desc: 'لوحة التحكم' },
      { keys: ['G', 'S'], desc: 'الشاشات' },
      { keys: ['G', 'E'], desc: 'الأجهزة' },
      { keys: ['G', 'A'], desc: 'التحليلات' },
      { keys: ['G', 'U'], desc: 'المستخدمين' },
      { keys: ['G', 'N'], desc: 'الإشعارات' },
    ],
  },
]

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          setOpen((prev) => !prev)
        }
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[160] bg-slate-900/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setOpen(false)}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[161] w-full max-w-2xl px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-royal-gradient flex items-center justify-center">
                <Command className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">اختصارات لوحة المفاتيح</h2>
                <p className="text-xs text-slate-400">كل اختصارات النظام في مكان واحد</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {shortcuts.map((section, i) => (
                <div key={i}>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{section.category}</h3>
                  <div className="space-y-2">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <span className="text-sm text-slate-700">{item.desc}</span>
                        <div className="flex items-center gap-1">
                          {item.keys.map((key, k) => (
                            <kbd
                              key={k}
                              className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-sans font-semibold text-slate-600 shadow-sm"
                            >
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
            <span className="text-xs text-slate-400">اضغط <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-sans text-[10px]">?</kbd> لإظهار/إخفاء هذه اللوحة</span>
            <span className="text-xs text-slate-400 font-medium">SmartScreen</span>
          </div>
        </div>
      </div>
    </>
  )
}
