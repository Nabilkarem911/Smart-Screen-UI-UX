import { useState } from 'react'
import {
  Download, Upload, FileJson, FileSpreadsheet, CheckCircle2,
  AlertCircle, Monitor, Tablet, Users, Settings, Image,
  Database, RefreshCw, X, FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ToastProvider'

const dataTypes = [
  { id: 'screens', label: 'الشاشات', icon: Monitor, count: 12, color: 'royal' },
  { id: 'devices', label: 'الأجهزة', icon: Tablet, count: 25, color: 'emerald' },
  { id: 'users', label: 'المستخدمين', icon: Users, count: 8, color: 'gold' },
  { id: 'media', label: 'الوسائط', icon: Image, count: 145, color: 'blue' },
  { id: 'settings', label: 'الإعدادات', icon: Settings, count: 1, color: 'royal' },
]

const exportHistory = [
  { id: 1, file: 'smartscreen-export-2024-06-14.json', type: 'JSON', size: '2.4 MB', date: 'اليوم 03:45 م', status: 'success' },
  { id: 2, file: 'smartscreen-screens-2024-06-10.csv', type: 'CSV', size: '128 KB', date: '10 يونيو 10:20 ص', status: 'success' },
  { id: 3, file: 'smartscreen-users-2024-06-05.json', type: 'JSON', size: '45 KB', date: '5 يونيو 02:15 م', status: 'success' },
  { id: 4, file: 'smartscreen-export-2024-06-01.json', type: 'JSON', size: '2.1 MB', date: '1 يونيو 09:00 ص', status: 'failed' },
]

const colorMap: Record<string, string> = {
  royal: 'bg-royal-50 text-royal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  gold: 'bg-gold-50 text-gold-600',
  blue: 'bg-blue-50 text-blue-600',
}

export default function ExportImport() {
  const { toast } = useToast()
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['screens', 'devices'])
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json')
  const [showImportModal, setShowImportModal] = useState(false)
  const [importing, setImporting] = useState(false)

  const toggleType = (id: string) => {
    setSelectedTypes((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id])
  }

  const handleExport = () => {
    if (selectedTypes.length === 0) {
      toast('اختر نوع بيانات واحد على الأقل', 'warning')
      return
    }
    toast(`تم تصدير ${selectedTypes.length} نوع بيانات بنجاح`, 'success')
  }

  const handleImport = () => {
    setImporting(true)
    setTimeout(() => {
      setImporting(false)
      setShowImportModal(false)
      toast('تم استيراد البيانات بنجاح', 'success')
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">تصدير واستيراد البيانات</h1>
          <p className="text-slate-400 text-sm mt-1">نسخ احتياطي واستعادة بيانات النظام</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي البيانات', value: '191', icon: Database, color: 'royal' },
          { label: 'عمليات تصدير', value: '4', icon: Download, color: 'emerald' },
          { label: 'آخر نسخة احتياطية', value: 'اليوم', icon: RefreshCw, color: 'gold' },
          { label: 'حجم البيانات', value: '2.4 MB', icon: FileText, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-3">
              <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', colorMap[stat.color])}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-royal-50 flex items-center justify-center">
              <Download className="w-5 h-5 text-royal-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">تصدير البيانات</h2>
              <p className="text-xs text-slate-400">اختر البيانات والصيغة</p>
            </div>
          </div>

          {/* Data Types */}
          <div className="space-y-2 mb-4">
            {dataTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => toggleType(type.id)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-right',
                  selectedTypes.includes(type.id)
                    ? 'bg-royal-50 border-royal-500'
                    : 'bg-slate-50 border-slate-100 hover:border-royal-200'
                )}
              >
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', colorMap[type.color])}>
                  <type.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{type.label}</p>
                  <p className="text-xs text-slate-400">{type.count} عنصر</p>
                </div>
                <div className={cn(
                  'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  selectedTypes.includes(type.id) ? 'bg-royal-500 border-royal-500' : 'border-slate-200'
                )}>
                  {selectedTypes.includes(type.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
            ))}
          </div>

          {/* Format Selection */}
          <div className="mb-4">
            <p className="text-sm text-slate-500 mb-2">صيغة الملف</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setExportFormat('json')}
                className={cn(
                  'flex items-center gap-2 p-3 rounded-xl border-2 transition-all',
                  exportFormat === 'json' ? 'bg-royal-50 border-royal-500 text-royal-700' : 'bg-slate-50 border-slate-100 text-slate-500'
                )}
              >
                <FileJson className="w-4 h-4" />
                <span className="text-sm font-medium">JSON</span>
              </button>
              <button
                onClick={() => setExportFormat('csv')}
                className={cn(
                  'flex items-center gap-2 p-3 rounded-xl border-2 transition-all',
                  exportFormat === 'csv' ? 'bg-royal-50 border-royal-500 text-royal-700' : 'bg-slate-50 border-slate-100 text-slate-500'
                )}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span className="text-sm font-medium">CSV</span>
              </button>
            </div>
          </div>

          <button onClick={handleExport} className="btn-primary w-full flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            تصدير {selectedTypes.length > 0 ? `(${selectedTypes.length})` : ''}
          </button>
        </div>

        {/* Import Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Upload className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">استيراد البيانات</h2>
              <p className="text-xs text-slate-400">رفع ملف للاستيراد</p>
            </div>
          </div>

          {/* Drop Zone */}
          <div
            onClick={() => setShowImportModal(true)}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center cursor-pointer hover:border-royal-300 hover:bg-royal-50/30 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-700">اضغط لاختيار ملف</p>
            <p className="text-xs text-slate-400 mt-1">أو اسحب الملف هنا</p>
            <p className="text-xs text-slate-300 mt-2">JSON, CSV — حد أقصى 10MB</p>
          </div>

          {/* Import Info */}
          <div className="mt-4 p-3 rounded-xl bg-gold-50/50 border border-gold-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                سيتم استبدال البيانات الحالية بالبيانات المستوردة. يُنصح بعمل نسخة احتياطية قبل الاستيراد.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowImportModal(true)}
            className="btn-ghost w-full mt-4 flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            اختيار ملف للاستيراد
          </button>
        </div>
      </div>

      {/* Export History */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">سجل التصدير</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-right">
                <th className="p-4 text-sm font-semibold text-slate-500">الملف</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الصيغة</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الحجم</th>
                <th className="p-4 text-sm font-semibold text-slate-500">التاريخ</th>
                <th className="p-4 text-sm font-semibold text-slate-500">الحالة</th>
                <th className="p-4 text-sm font-semibold text-slate-500">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {exportHistory.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-sm text-slate-700 font-mono" dir="ltr">{item.file}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-600">{item.type}</span>
                  </td>
                  <td className="p-4"><span className="text-sm text-slate-600">{item.size}</span></td>
                  <td className="p-4"><span className="text-sm text-slate-600">{item.date}</span></td>
                  <td className="p-4">
                    {item.status === 'success' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> نجح
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500">
                        <AlertCircle className="w-3.5 h-3.5" /> فشل
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button className="p-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => !importing && setShowImportModal(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">استيراد البيانات</h2>
              {!importing && (
                <button
                  onClick={() => setShowImportModal(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="p-6">
              {importing ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-3 border-royal-200 border-t-royal-600 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-slate-600">جاري استيراد البيانات...</p>
                </div>
              ) : (
                <>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center mb-4">
                    <FileJson className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">اختر ملف JSON أو CSV</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setShowImportModal(false)} className="btn-ghost flex-1">إلغاء</button>
                    <button onClick={handleImport} className="btn-primary flex-1 flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      بدء الاستيراد
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
