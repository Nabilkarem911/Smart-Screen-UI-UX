import { useState } from 'react'
import { Plus, Edit2, Trash2, FolderTree, KeyRound, Copy } from 'lucide-react'

const groupsData = [
  { id: 1, name: 'Login Screens', code: 'LS-7842', screens: 4 },
  { id: 2, name: 'wow bshmel', code: 'WB-3201', screens: 6 },
]

export default function Groups() {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">المجموعات</h1>
          <p className="text-slate-400 text-sm mt-1">تنظيم الشاشات في مجموعات</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة مجموعة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groupsData.map((group) => (
          <div key={group.id} className="glass-card-hover p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-royal-50 flex items-center justify-center">
                  <FolderTree className="w-6 h-6 text-royal-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold">{group.name}</h3>
                  <p className="text-xs text-slate-400">{group.screens} شاشات</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-gold-600" />
                <span className="text-xs text-slate-400">رمز المجموعة</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-sm text-slate-900 font-mono" dir="ltr">{group.code}</code>
                <button className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-700 transition-all">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card */}
        <button
          onClick={() => setShowAdd(true)}
          className="glass-card p-6 flex flex-col items-center justify-center min-h-[180px] border-2 border-dashed border-slate-200 hover:border-royal-400 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
            <Plus className="w-6 h-6 text-slate-400" />
          </div>
          <span className="text-sm text-slate-500">إضافة مجموعة جديدة</span>
        </button>
      </div>

      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowAdd(false)}
        >
          <div className="glass-card p-6 w-full max-w-md animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-slate-900 mb-1">إضافة مجموعة</h2>
            <p className="text-sm text-slate-400 mb-6">سيتم إنشاء رمز فريد تلقائياً</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">اسم المجموعة</label>
                <input type="text" placeholder="مثال: شاشات الفرع الرئيسي" className="input-field" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAdd(false)} className="btn-ghost flex-1">إلغاء</button>
                <button onClick={() => setShowAdd(false)} className="btn-primary flex-1">إنشاء</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
