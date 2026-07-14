import { useState } from 'react'
import { Search, Edit2, LogOut, Tablet, Monitor, Smartphone, Cpu } from 'lucide-react'

const devicesData = [
  { id: 1, name: 'شاشة رقم 1', screenName: 'شاشة رقم 1', type: 'Raspberry Pi 4', status: 'online', lastSeen: 'الآن' },
  { id: 2, name: 'خميس', screenName: 'خميس', type: 'Android Box', status: 'online', lastSeen: 'منذ 5 دقائق' },
  { id: 3, name: 'شاشه 4', screenName: 'شاشه 4', type: 'Raspberry Pi 3', status: 'offline', lastSeen: 'منذ 3 ساعات' },
  { id: 4, name: 'الشاشة الرئيسية', screenName: 'الشاشة الرئيسية', type: 'Fire TV Stick', status: 'online', lastSeen: 'الآن' },
  { id: 5, name: 'شاشة الاستقبال', screenName: 'شاشة الاستقبال', type: 'Android Box', status: 'online', lastSeen: 'منذ دقيقة' },
  { id: 6, name: 'شاشة رقم 2', screenName: 'شاشة رقم 2', type: 'Raspberry Pi 4', status: 'offline', lastSeen: 'منذ يوم' },
  { id: 7, name: 'شاشة رقم 3', screenName: 'شاشة رقم 3', type: 'Chromecast', status: 'online', lastSeen: 'الآن' },
  { id: 8, name: 'شاشة الكافيه', screenName: 'شاشة الكافيه', type: 'Android Box', status: 'online', lastSeen: 'منذ 10 دقائق' },
]

const deviceIcons: Record<string, any> = {
  'Raspberry Pi 4': Cpu,
  'Raspberry Pi 3': Cpu,
  'Android Box': Tablet,
  'Fire TV Stick': Monitor,
  'Chromecast': Smartphone,
}

export default function Devices() {
  const [search, setSearch] = useState('')

  const filtered = devicesData.filter(
    (d) => d.name.includes(search) || d.type.includes(search)
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">الأجهزة</h1>
        <p className="text-slate-400 text-sm mt-1">إدارة الأجهزة المتصلة بالشاشات</p>
      </div>

      <div className="glass-card p-4">
        <div className="relative max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث عن جهاز..."
            className="input-field pr-10"
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-right">
              <th className="p-4 text-sm font-semibold text-slate-500">اسم الجهاز</th>
              <th className="p-4 text-sm font-semibold text-slate-500">الشاشة المرتبطة</th>
              <th className="p-4 text-sm font-semibold text-slate-500">النوع</th>
              <th className="p-4 text-sm font-semibold text-slate-500">آخر ظهور</th>
              <th className="p-4 text-sm font-semibold text-slate-500">الحالة</th>
              <th className="p-4 text-sm font-semibold text-slate-500">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((device) => {
              const Icon = deviceIcons[device.type] || Tablet
              return (
                <tr key={device.id} className="table-row">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-royal-600" />
                      </div>
                      <span className="text-slate-900 font-medium text-sm">{device.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-slate-500">{device.screenName}</span>
                  </td>
                  <td className="p-4">
                    <span className="badge-info">{device.type}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-slate-400">{device.lastSeen}</span>
                  </td>
                  <td className="p-4">
                    {device.status === 'online' ? (
                      <span className="badge-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                        متصل
                      </span>
                    ) : (
                      <span className="badge-danger">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />
                        غير متصل
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-royal-50 text-royal-600 hover:bg-royal-100 transition-all" title="تعديل">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all" title="تسجيل خروج">
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between p-4 border-t border-slate-200">
          <span className="text-sm text-slate-400">
            عرض {filtered.length} من {devicesData.length} جهاز
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">السابق</button>
            <button className="px-3 py-1.5 rounded-lg text-sm bg-royal-gradient text-white">1</button>
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">2</button>
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">3</button>
            <button className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">التالي</button>
          </div>
        </div>
      </div>
    </div>
  )
}
